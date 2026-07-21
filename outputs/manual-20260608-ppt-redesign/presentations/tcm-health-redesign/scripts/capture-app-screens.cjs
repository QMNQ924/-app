const path = require("path");
const puppeteer = require("puppeteer-core");

const root = path.resolve(__dirname, "../../../../..");
const outDir = path.join(root, "outputs", "manual-20260608-ppt-redesign", "presentations", "tcm-health-redesign", "screens");
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const appUrl = "http://127.0.0.1:5173/";

const storageState = {
  user: { phone: "13800000009", name: "汇报用户", password: "123456" },
  authMode: "login",
  selectedDiseaseId: "tuberculosis",
  favorites: ["kb-tb", "lc-tb"],
  metrics: [
    {
      glucose: "5.6",
      systolic: "118",
      diastolic: "76",
      heartRate: "74",
      temperature: "36.7",
      sleep: "7.2",
      steps: "7200",
      weight: "62",
      tongue: "舌淡红，苔薄白",
      date: "2026/6/8"
    }
  ],
  messages: [
    {
      role: "ai",
      text: "您好，我是中医云健康 AI 问诊助手。请描述症状、持续时间、接触史和最近指标。"
    },
    {
      role: "me",
      text: "咳嗽咳痰两周，午后低热，最近有盗汗。"
    },
    {
      role: "ai",
      text: "我先按肺结核方向分析：建议记录体温与咳嗽变化，关注痰检和复查，同时保持通风与规律休息。"
    }
  ],
  consultInsight: {
    diseaseId: "tuberculosis",
    diseaseName: "肺结核",
    urgency: "关注",
    summary: "症状组合提示需要关注肺结核方向，重点看持续咳嗽、低热、盗汗、体重变化和接触史。",
    tcm: "常见辨证方向包括肺阴亏虚、阴虚火旺和气阴两虚，调理不能替代规范抗结核治疗。",
    actions: ["记录体温、咳嗽和睡眠", "按计划复查痰检和影像", "饮食清淡高蛋白，避免烟酒辛辣"],
    warning: "咯血增多、胸闷气促、持续高热或药物后黄疸皮疹，应立即就医。"
  },
  constitutionResult: {
    type: "气阴两虚倾向",
    score: 88,
    summary: "恢复期更需要规律休息、补足水分和轻量运动。",
    advice: ["先稳定睡眠和饮食", "运动以散步和八段锦为主", "不适时及时复诊"],
    focus: ["补气", "养阴", "规律"]
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function openPage(page, name, selector) {
  if (selector) {
    await page.click(selector);
    await sleep(500);
  }
  await page.screenshot({ path: path.join(outDir, `${name}.png`), fullPage: false });
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: "new",
    defaultViewport: { width: 390, height: 844, deviceScaleFactor: 2 },
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"]
  });
  const page = await browser.newPage();
  await page.goto(appUrl, { waitUntil: "networkidle0" });
  await page.screenshot({ path: path.join(outDir, "auth.png"), fullPage: false });
  await page.evaluate((state) => {
    localStorage.setItem("tcm-cloud-mobile-state", JSON.stringify(state));
  }, storageState);
  await page.reload({ waitUntil: "networkidle0" });
  await sleep(500);
  await openPage(page, "home");
  await openPage(page, "consult", '[data-page="consult"]');
  await openPage(page, "health", '[data-page="health"]');
  await openPage(page, "chronic", '[data-page="chronic"]');
  await openPage(page, "profile", '[data-page="profile"]');
  await openPage(page, "home-again", '[data-page="home"]');
  await openPage(page, "lecture", '[data-page="lecture"]');
  await browser.close();
})();
