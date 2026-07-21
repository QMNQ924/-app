const fs = require("node:fs");
const path = require("node:path");
const puppeteer = require("puppeteer-core");

const root = path.resolve(__dirname, "..");
const outDir = __dirname;
const url = process.env.TEST_URL || "http://127.0.0.1:5193/";
const chromePath =
  process.env.CHROME_PATH ||
  "C:\\Users\\Administrator\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe";

function percentile(values, p) {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
  return sorted[index] || 0;
}

function stats(samples) {
  const filtered = samples.filter((value) => Number.isFinite(value) && value > 0);
  const sum = filtered.reduce((total, value) => total + value, 0);
  return {
    frames: filtered.length,
    avg: sum / Math.max(1, filtered.length),
    p95: percentile(filtered, 95),
    max: Math.max(...filtered),
    over33: filtered.filter((value) => value > 33.4).length,
    over50: filtered.filter((value) => value > 50).length
  };
}

async function wait(page, ms) {
  await page.evaluate((duration) => new Promise((resolve) => window.setTimeout(resolve, duration)), ms);
}

async function main() {
  if (!fs.existsSync(chromePath)) {
    throw new Error(`Chrome executable not found: ${chromePath}`);
  }

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: "new",
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
    args: ["--disable-background-timer-throttling", "--disable-renderer-backgrounding", "--no-sandbox"]
  });

  const page = await browser.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") console.error(msg.text());
  });

  await page.goto(url, { waitUntil: "networkidle0", timeout: 20000 });
  await page.waitForSelector("#featureImage", { timeout: 10000 });
  await wait(page, 500);

  await page.screenshot({ path: path.join(outDir, "desktop-hero.png"), fullPage: false });
  await page.evaluate(() => document.querySelector("#showcase")?.scrollIntoView({ block: "start" }));
  await wait(page, 500);
  await page.screenshot({ path: path.join(outDir, "desktop-showcase.png"), fullPage: false });
  await page.evaluate(() => document.querySelector("#disease")?.scrollIntoView({ block: "start" }));
  await wait(page, 500);
  await page.screenshot({ path: path.join(outDir, "desktop-disease.png"), fullPage: false });

  const interactions = await page.evaluate(async () => {
    const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
    const samples = [];
    let last = performance.now();
    let stopped = false;

    function tick(now) {
      samples.push(now - last);
      last = now;
      if (!stopped) window.requestAnimationFrame(tick);
    }

    function easeOutCubic(value) {
      return 1 - Math.pow(1 - value, 3);
    }

    async function scrollToY(target, duration) {
      const start = window.scrollY;
      const distance = target - start;
      const begin = performance.now();
      return new Promise((resolve) => {
        function step(now) {
          const progress = Math.min(1, (now - begin) / duration);
          window.scrollTo(0, start + distance * easeOutCubic(progress));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            resolve();
          }
        }
        window.requestAnimationFrame(step);
      });
    }

    window.requestAnimationFrame(tick);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    for (const ratio of [0.18, 0.36, 0.58, 0.78, 1]) {
      await scrollToY(maxScroll * ratio, 360);
      await sleep(90);
    }

    for (const button of document.querySelectorAll("[data-feature]")) {
      button.click();
      await sleep(180);
    }

    document.querySelector("#disease")?.scrollIntoView({ block: "start" });
    await sleep(220);
    for (const button of document.querySelectorAll("[data-disease]")) {
      button.click();
      await sleep(160);
    }

    stopped = true;
    await sleep(80);
    return {
      samples,
      featureTitle: document.querySelector("#featureTitle")?.textContent || "",
      diseaseTitle: document.querySelector("#diseaseTitle")?.textContent || "",
      canvasParticles: window.__canvasParticleCount || null
    };
  });

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 20000 });
  await wait(page, 500);
  await page.screenshot({ path: path.join(outDir, "mobile-hero.png"), fullPage: false });

  await browser.close();

  const measured = stats(interactions.samples);
  const passed = measured.p95 <= 18 && measured.over33 <= 1;
  const report = [
    "Product intro performance verification",
    `Date: ${new Date().toISOString()}`,
    `URL: ${url}`,
    "",
    "Interaction coverage:",
    "- Desktop hero, showcase, disease screenshots captured.",
    "- Smooth scroll across full page.",
    "- Feature carousel buttons clicked.",
    "- Disease scenario tabs clicked.",
    "- Mobile hero screenshot captured.",
    "",
    "Frame interval result:",
    `- frames: ${measured.frames}`,
    `- avg: ${measured.avg.toFixed(2)}ms`,
    `- p95: ${measured.p95.toFixed(2)}ms`,
    `- max: ${measured.max.toFixed(2)}ms`,
    `- >33.4ms frames: ${measured.over33}`,
    `- >50ms frames: ${measured.over50}`,
    "",
    "DOM state:",
    `- final feature title: ${interactions.featureTitle}`,
    `- final disease title: ${interactions.diseaseTitle}`,
    "",
    `Result: ${passed ? "PASS" : "NEEDS_OPTIMIZATION"}`
  ].join("\n");

  fs.writeFileSync(path.join(outDir, "performance-report.txt"), report, "utf8");
  fs.writeFileSync(path.join(outDir, "performance-samples.json"), JSON.stringify({ measured, interactions }, null, 2), "utf8");

  if (!passed) {
    console.error(report);
    process.exitCode = 1;
  } else {
    console.log(report);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
