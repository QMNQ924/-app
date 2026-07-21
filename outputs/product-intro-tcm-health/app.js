const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
const lowPowerDevice = (navigator.hardwareConcurrency || 8) <= 4;

const featureData = [
  {
    title: "首页像健康指挥舱，而不是菜单页。",
    text: "评分、风险、待办、入口和检测摘要在首屏完成优先级排序，打开后马上知道今天要做什么。",
    image: "./assets/home.png",
    alt: "首页健康仪表盘截图"
  },
  {
    title: "问诊流程像一次连续对话。",
    text: "症状标签、聊天气泡和建议卡片组合在一起，让 AI 回复更像真实健康服务流程。",
    image: "./assets/consult.png",
    alt: "AI 在线问诊截图"
  },
  {
    title: "检测记录直接反馈风险状态。",
    text: "血压、血糖、心率、体重、睡眠和运动数据录入后，界面用状态色提示是否需要关注。",
    image: "./assets/health.png",
    alt: "健康检测页面截图"
  },
  {
    title: "传染病档案沉淀长期管理动作。",
    text: "围绕肺结核、病毒性肝炎、艾滋病等场景，把用药、复诊、症状和生活建议放入同一条管理链路。",
    image: "./assets/chronic.png",
    alt: "传染病慢病管理截图"
  },
  {
    title: "讲堂内容不只是列表，而是康复路径的一部分。",
    text: "课程、百科和收藏状态帮助用户把知识沉淀为长期可执行的健康管理计划。",
    image: "./assets/lecture.png",
    alt: "健康讲堂截图"
  }
];

const diseaseData = [
  {
    title: "肺结核",
    text: "重点是早发现、规范抗结核治疗、咳嗽礼仪、通风隔离和复查随访。",
    points: ["持续咳嗽、低热或盗汗时及时检测", "记录服药、复诊和体重变化", "出现咯血、胸痛或明显气促时立即就医"]
  },
  {
    title: "病毒性肝炎",
    text: "重点是肝功能监测、规范抗病毒治疗、避免饮酒和管理家庭传播风险。",
    points: ["定期记录转氨酶、病毒载量和腹部检查", "饮食清淡，避免酒精和不明保健品", "黄疸、腹胀或乏力明显加重时就医"]
  },
  {
    title: "艾滋病",
    text: "重点是坚持抗病毒治疗、免疫指标随访、机会感染预警和心理支持。",
    points: ["记录服药连续性和 CD4/病毒载量复查", "出现持续发热、腹泻或体重下降要及时评估", "做好伴侣沟通、检测和防护管理"]
  },
  {
    title: "流感",
    text: "重点是发热监测、隔离休息、补液、疫苗预防和高危人群快速就医。",
    points: ["记录体温、咳嗽和乏力变化", "老年人、孕妇和慢病人群不要硬扛", "高热不退、气促或意识改变时立即就医"]
  },
  {
    title: "手足口病",
    text: "重点是儿童症状观察、口腔护理、家庭消毒和重症信号识别。",
    points: ["观察皮疹、口腔疼痛和进食饮水情况", "玩具、餐具和手部清洁要同步管理", "嗜睡、抽搐、呼吸急促或精神差时立即就医"]
  }
];

const canvas = document.getElementById("healthCanvas");
const ctx = canvas?.getContext("2d", { alpha: true });
let particles = [];
let animationId = 0;
let lastFrameTime = 0;
let canvasWidth = 0;
let canvasHeight = 0;
let canvasScale = 1;
let scrollTicking = false;

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function createParticles() {
  if (!canvas || !ctx || prefersReducedMotion) {
    particles = [];
    return;
  }

  const area = window.innerWidth * window.innerHeight;
  const densityCount = Math.round(area / (isTouchDevice ? 135000 : 110000));
  const cap = lowPowerDevice ? 16 : isTouchDevice ? 18 : 24;
  const count = Math.max(12, Math.min(cap, densityCount));

  particles = Array.from({ length: count }, (_, index) => ({
    x: randomBetween(0, canvasWidth),
    y: randomBetween(0, canvasHeight),
    vx: randomBetween(-0.12, 0.12),
    vy: randomBetween(-0.1, 0.1),
    radius: randomBetween(1.2, 2.8),
    alpha: randomBetween(0.24, 0.58),
    hue: index % 3
  }));
  window.__canvasParticleCount = particles.length;
}

function resizeCanvas() {
  if (!canvas || !ctx) return;
  canvasScale = Math.min(window.devicePixelRatio || 1, lowPowerDevice || isTouchDevice ? 1.1 : 1.25);
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = Math.round(canvasWidth * canvasScale);
  canvas.height = Math.round(canvasHeight * canvasScale);
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  ctx.setTransform(canvasScale, 0, 0, canvasScale, 0, 0);
  createParticles();
}

function drawParticles(time) {
  if (!ctx || !canvas || document.hidden || prefersReducedMotion) return;

  const delta = Math.min(32, time - lastFrameTime || 16.7);
  lastFrameTime = time;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (const particle of particles) {
    particle.x += particle.vx * delta;
    particle.y += particle.vy * delta;

    if (particle.x < -20) particle.x = canvasWidth + 20;
    if (particle.x > canvasWidth + 20) particle.x = -20;
    if (particle.y < -20) particle.y = canvasHeight + 20;
    if (particle.y > canvasHeight + 20) particle.y = -20;

    const color =
      particle.hue === 0
        ? `rgba(53, 245, 203, ${particle.alpha})`
        : particle.hue === 1
          ? `rgba(77, 112, 255, ${particle.alpha * 0.72})`
          : `rgba(255, 209, 102, ${particle.alpha * 0.58})`;

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const linkDistance = isTouchDevice ? 108 : 132;
  const linkDistanceSq = linkDistance * linkDistance;
  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distanceSq = dx * dx + dy * dy;
      if (distanceSq > linkDistanceSq) continue;
      const distance = Math.sqrt(distanceSq);
      ctx.globalAlpha = (1 - distance / linkDistance) * 0.16;
      ctx.strokeStyle = "#35f5cb";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;

  animationId = window.requestAnimationFrame(drawParticles);
}

function startCanvas() {
  if (!canvas || !ctx || prefersReducedMotion) return;
  window.cancelAnimationFrame(animationId);
  lastFrameTime = performance.now();
  animationId = window.requestAnimationFrame(drawParticles);
}

function updateScrollProgress() {
  scrollTicking = false;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
  const progressBar = document.querySelector(".side-progress span");
  if (progressBar) {
    progressBar.style.transform = `scaleY(${progress.toFixed(3)})`;
  }
}

function requestScrollProgress() {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(updateScrollProgress);
}

function setupRevealObservers() {
  const sections = Array.from(document.querySelectorAll(".section"));
  const revealItems = Array.from(document.querySelectorAll(".reveal"));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle("is-active", entry.isIntersecting);
      }
    },
    { threshold: 0.34 }
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
  revealItems.forEach((item) => revealObserver.observe(item));
}

function setupFeatureSwitcher() {
  const buttons = Array.from(document.querySelectorAll("[data-feature]"));
  const title = document.getElementById("featureTitle");
  const text = document.getElementById("featureText");
  const image = document.getElementById("featureImage");
  const phone = document.querySelector(".feature-phone");
  if (!buttons.length || !title || !text || !image) return;

  let activeIndex = 0;

  function setFeature(index) {
    if (index === activeIndex || !featureData[index]) return;
    activeIndex = index;
    buttons.forEach((button, buttonIndex) => {
      button.classList.toggle("active", buttonIndex === index);
      button.setAttribute("aria-selected", String(buttonIndex === index));
    });

    const next = featureData[index];
    phone?.classList.remove("switching");
    void phone?.offsetWidth;
    title.textContent = next.title;
    text.textContent = next.text;
    image.src = next.image;
    image.alt = next.alt;
    phone?.classList.add("switching");
  }

  buttons.forEach((button, index) => {
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(index === activeIndex));
    button.addEventListener("click", () => setFeature(index));
  });

  window.addEventListener("keydown", (event) => {
    const showcase = document.getElementById("showcase");
    if (!showcase?.classList.contains("is-active")) return;
    if (event.key === "ArrowRight") setFeature((activeIndex + 1) % featureData.length);
    if (event.key === "ArrowLeft") setFeature((activeIndex + featureData.length - 1) % featureData.length);
  });
}

function setupDiseaseSwitcher() {
  const buttons = Array.from(document.querySelectorAll("[data-disease]"));
  const title = document.getElementById("diseaseTitle");
  const text = document.getElementById("diseaseText");
  const list = document.getElementById("diseaseList");
  if (!buttons.length || !title || !text || !list) return;

  function setDisease(index) {
    const next = diseaseData[index];
    if (!next) return;
    buttons.forEach((button, buttonIndex) => {
      button.classList.toggle("active", buttonIndex === index);
      button.setAttribute("aria-selected", String(buttonIndex === index));
    });
    title.textContent = next.title;
    text.textContent = next.text;
    list.replaceChildren(
      ...next.points.map((point) => {
        const item = document.createElement("li");
        item.textContent = point;
        return item;
      })
    );
  }

  buttons.forEach((button, index) => {
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(index === 0));
    button.addEventListener("click", () => setDisease(index));
  });
}

function setupValueCards() {
  const cards = Array.from(document.querySelectorAll(".value-card"));
  cards.forEach((card) => {
    card.addEventListener("pointerenter", () => {
      cards.forEach((item) => item.classList.toggle("active", item === card));
    });
    card.addEventListener("click", () => {
      cards.forEach((item) => item.classList.toggle("active", item === card));
    });
  });
}

function setupScrollButtons() {
  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scrollTarget || "");
      target?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    });
  });
}

function setupImages() {
  featureData.forEach((item) => {
    const preloaded = new Image();
    preloaded.decoding = "async";
    preloaded.src = item.image;
    if (typeof preloaded.decode === "function") {
      preloaded.decode().catch(() => {});
    }
  });

  document.querySelectorAll("img").forEach((image) => {
    image.decoding = "async";
    image.draggable = false;
    if ("loading" in image && !image.closest(".hero-section")) {
      image.loading = "lazy";
    }
    if (typeof image.decode === "function") {
      image.decode().catch(() => {});
    }
  });
}

let resizeTimer = 0;
window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    resizeCanvas();
    requestScrollProgress();
  }, 120);
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    window.cancelAnimationFrame(animationId);
  } else {
    startCanvas();
  }
});

window.addEventListener("scroll", requestScrollProgress, { passive: true });

resizeCanvas();
startCanvas();
setupRevealObservers();
setupFeatureSwitcher();
setupDiseaseSwitcher();
setupValueCards();
setupScrollButtons();
setupImages();
requestScrollProgress();
