const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();
const repoRoot = path.resolve(__dirname, "../../../..");
const workspace = __dirname;
const outputDir = path.join(repoRoot, "outputs", "manual-20260608-ppt-redesign", "output");
const assetDir = path.join(workspace, "assets");
const qaDir = path.join(workspace, "qa");
const screenDir = path.join(workspace, "screens");
const notesDir = path.join(workspace, "notes");
const generatedHeroPath = "C:\\Users\\Administrator\\.codex\\generated_images\\019ea136-cd93-7c22-b759-564b7114264b\\ig_0b79a4be00b26045016a267e6b70388191a806fc844c736b56.png";

const W = 13.333;
const H = 7.5;

const C = {
  bg: "F5F8F4",
  ink: "13201D",
  muted: "63716E",
  soft: "EAF4EF",
  line: "DDE8E2",
  green: "0D7A6A",
  greenDark: "09594F",
  mint: "CFECE4",
  blue: "3E6DFF",
  blueSoft: "E7EDFF",
  yellow: "F5C85B",
  yellowSoft: "FFF2CF",
  pink: "F05D83",
  pinkSoft: "FFE6EE",
  white: "FFFFFF",
  dark: "102421"
};

const font = "Microsoft YaHei";
const titleFont = "Microsoft YaHei UI";

function ensureDirs() {
  [outputDir, assetDir, qaDir, notesDir].forEach((dir) => fs.mkdirSync(dir, { recursive: true }));
}

function write(file, content) {
  fs.writeFileSync(path.join(workspace, file), content, "utf8");
}

function svg(name, inner, w = 1600, h = 900) {
  const full = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
<defs>
  <linearGradient id="mint" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#EAF8F4"/>
    <stop offset="1" stop-color="#D7E7FF"/>
  </linearGradient>
  <linearGradient id="green" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#0D7A6A"/>
    <stop offset="1" stop-color="#2DBFA9"/>
  </linearGradient>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="22" stdDeviation="28" flood-color="#102421" flood-opacity="0.18"/>
  </filter>
</defs>
${inner}
</svg>`;
  const p = path.join(assetDir, name);
  fs.writeFileSync(p, full, "utf8");
  return p;
}

function buildAssets() {
  const copiedHero = path.join(assetDir, "image2-health-hero.png");
  if (fs.existsSync(generatedHeroPath)) {
    fs.copyFileSync(generatedHeroPath, copiedHero);
  }

  const hero = svg(
    "redesign-hero.svg",
    `
<rect width="1600" height="900" fill="#F5F8F4"/>
<circle cx="1160" cy="250" r="250" fill="#DFF3EE"/>
<circle cx="1320" cy="430" r="180" fill="#E3EAFF"/>
<path d="M1010 180 C1140 120 1300 130 1420 220" stroke="#0D7A6A" stroke-width="8" stroke-linecap="round" opacity=".35"/>
<path d="M960 520 C1080 420 1260 420 1450 560" stroke="#3E6DFF" stroke-width="7" stroke-linecap="round" opacity=".22"/>
<rect x="1015" y="128" width="348" height="642" rx="54" fill="#FFFFFF" filter="url(#shadow)"/>
<rect x="1042" y="166" width="294" height="568" rx="34" fill="#F8FBFA"/>
<rect x="1072" y="202" width="234" height="82" rx="22" fill="url(#green)"/>
<circle cx="1190" cy="372" r="86" fill="#EAF7F4"/>
<path d="M1190 308v128M1126 372h128" stroke="#0D7A6A" stroke-width="22" stroke-linecap="round"/>
<rect x="1072" y="502" width="112" height="92" rx="20" fill="#EAF4EF"/>
<rect x="1206" y="502" width="112" height="92" rx="20" fill="#E7EDFF"/>
<rect x="1072" y="618" width="248" height="58" rx="20" fill="#102421"/>
<path d="M838 680 C980 592 1128 590 1292 648" stroke="#0D7A6A" stroke-width="5" opacity=".28"/>
<path d="M852 260 C970 328 1060 318 1156 260" stroke="#F5C85B" stroke-width="5" opacity=".52"/>
<circle cx="930" cy="212" r="18" fill="#0D7A6A" opacity=".28"/>
<circle cx="1450" cy="640" r="24" fill="#3E6DFF" opacity=".18"/>
`
  );

  const abstract = svg(
    "redesign-abstract-care.svg",
    `
<rect width="1600" height="900" rx="0" fill="#F5F8F4"/>
<rect x="120" y="120" width="1260" height="620" rx="80" fill="#FFFFFF" filter="url(#shadow)"/>
<path d="M250 540 C430 340 650 320 820 450 S1190 640 1300 390" stroke="#0D7A6A" stroke-width="16" stroke-linecap="round" opacity=".32"/>
<path d="M250 360 C460 210 620 210 780 330 S1070 500 1300 230" stroke="#3E6DFF" stroke-width="10" stroke-linecap="round" opacity=".20"/>
<circle cx="430" cy="360" r="90" fill="#EAF4EF"/>
<circle cx="790" cy="450" r="116" fill="#E7EDFF"/>
<circle cx="1120" cy="320" r="100" fill="#FFF2CF"/>
<path d="M430 300v120M370 360h120" stroke="#0D7A6A" stroke-width="20" stroke-linecap="round"/>
<path d="M742 450h116M800 392v116" stroke="#3E6DFF" stroke-width="14" stroke-linecap="round"/>
<path d="M1086 360c52-94 144-94 196-5" stroke="#F5C85B" stroke-width="16" stroke-linecap="round"/>
<rect x="310" y="610" width="258" height="42" rx="21" fill="#DFF3EE"/>
<rect x="680" y="610" width="310" height="42" rx="21" fill="#E7EDFF"/>
<rect x="1080" y="610" width="220" height="42" rx="21" fill="#FFF2CF"/>
`
  );

  const flow = svg(
    "redesign-flow.svg",
    `
<rect width="1600" height="900" fill="#F5F8F4"/>
<path d="M240 460 C430 250 610 254 788 454 S1160 696 1360 408" stroke="#DDE8E2" stroke-width="34" stroke-linecap="round"/>
<circle cx="278" cy="452" r="92" fill="#0D7A6A"/>
<circle cx="596" cy="330" r="92" fill="#E7EDFF"/>
<circle cx="872" cy="508" r="92" fill="#FFF2CF"/>
<circle cx="1198" cy="590" r="92" fill="#EAF4EF"/>
<path d="M278 398v108M224 452h108" stroke="#FFFFFF" stroke-width="18" stroke-linecap="round"/>
<path d="M552 330h88M596 286v88" stroke="#3E6DFF" stroke-width="14" stroke-linecap="round"/>
<path d="M834 536l38-76 42 76" stroke="#D99900" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1152 590h96M1200 542v96" stroke="#0D7A6A" stroke-width="14" stroke-linecap="round"/>
`
  );
  return { hero, abstract, flow, copiedHero };
}

function addBg(slide, color = C.bg) {
  slide.background = { color };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color }, line: { color } });
}

function addPage(slide, section, pageNo) {
  slide.addText(section.toUpperCase(), {
    x: 0.55,
    y: 0.28,
    w: 3.8,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 8.5,
    bold: true,
    charSpace: 2.1,
    color: C.green
  });
  slide.addText(String(pageNo).padStart(2, "0"), {
    x: 12.25,
    y: 7.04,
    w: 0.65,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 9,
    color: "9BA8A4",
    align: "right",
    margin: 0
  });
}

function addTitle(slide, title, subtitle, opts = {}) {
  slide.addText(title, {
    x: opts.x ?? 0.55,
    y: opts.y ?? 0.62,
    w: opts.w ?? 7.3,
    h: opts.h ?? 1.05,
    fontFace: titleFont,
    fontSize: opts.size ?? 32,
    bold: true,
    color: opts.color ?? C.ink,
    margin: 0,
    breakLine: false,
    fit: "shrink",
    valign: "mid"
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: opts.x ?? 0.58,
      y: (opts.y ?? 0.62) + (opts.subY ?? 1.17),
      w: opts.subW ?? 6.9,
      h: opts.subH ?? 0.58,
      fontFace: font,
      fontSize: opts.subSize ?? 13.5,
      color: opts.subColor ?? C.muted,
      breakLine: false,
      fit: "shrink",
      margin: 0.02,
      valign: "mid"
    });
  }
}

function pill(slide, text, x, y, w, color = C.green, fill = C.soft) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.34,
    rectRadius: 0.12,
    fill: { color: fill },
    line: { color: fill }
  });
  slide.addText(text, {
    x,
    y: y + 0.075,
    w,
    h: 0.13,
    fontFace: font,
    fontSize: 8.5,
    color,
    bold: true,
    align: "center",
    margin: 0
  });
}

function card(slide, x, y, w, h, opts = {}) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: opts.radius ?? 0.14,
    fill: { color: opts.fill ?? C.white, transparency: opts.transparency ?? 0 },
    line: { color: opts.line ?? C.line, transparency: opts.lineTrans ?? 0, width: opts.lineWidth ?? 0.8 },
    shadow: opts.shadow === false ? undefined : { type: "outer", color: "102421", opacity: 0.08, blur: 1.2, angle: 45, distance: 1.2 }
  });
}

function phone(slide, imagePath, x, y, h, label, opts = {}) {
  const w = h * 390 / 844;
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.22,
    fill: { color: opts.dark ? C.dark : C.white },
    line: { color: opts.dark ? C.dark : C.line, width: 1 },
    shadow: { type: "outer", color: "102421", opacity: 0.18, blur: 1.6, angle: 45, distance: 1.4 }
  });
  slide.addImage({ path: imagePath, x: x + 0.065, y: y + 0.065, w: w - 0.13, h: h - 0.13 });
  if (label) {
    slide.addText(label, {
      x,
      y: y + h + 0.14,
      w,
      h: 0.2,
      fontFace: font,
      fontSize: 8.5,
      color: C.muted,
      align: "center",
      margin: 0
    });
  }
  return { w, h };
}

function metric(slide, label, value, x, y, w, color) {
  card(slide, x, y, w, 0.82, { fill: "FFFFFF" });
  slide.addText(label, { x: x + 0.16, y: y + 0.14, w: w - 0.3, h: 0.16, fontFace: font, fontSize: 8.8, color: C.muted, margin: 0 });
  slide.addText(value, { x: x + 0.16, y: y + 0.38, w: w - 0.3, h: 0.22, fontFace: "Aptos Display", fontSize: 18, bold: true, color, margin: 0 });
}

function bullet(slide, text, x, y, w, color = C.ink) {
  slide.addShape(pptx.ShapeType.ellipse, { x, y: y + 0.08, w: 0.09, h: 0.09, fill: { color: C.green }, line: { color: C.green } });
  slide.addText(text, {
    x: x + 0.18,
    y,
    w,
    h: 0.34,
    fontFace: font,
    fontSize: 12,
    color,
    margin: 0,
    breakLine: false,
    fit: "shrink"
  });
}

function line(slide, x1, y1, x2, y2, color = C.line, width = 1.6) {
  slide.addShape(pptx.ShapeType.line, { x: x1, y: y1, w: x2 - x1, h: y2 - y1, line: { color, width } });
}

function pathOf(file) {
  return path.join(screenDir, file);
}

function slide1(assets) {
  const s = pptx.addSlide();
  addBg(s, "EEF4F0");
  if (assets.copiedHero && fs.existsSync(assets.copiedHero)) {
    s.addImage({ path: assets.copiedHero, x: 0, y: 0, w: W, h: H });
  } else {
    s.addImage({ path: assets.hero, x: 7.2, y: 0.0, w: 6.1, h: 7.5 });
  }
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: "F4F8F5", transparency: 22 }, line: { color: "F4F8F5", transparency: 100 } });
  card(s, 0.66, 0.72, 5.55, 5.55, { fill: "FFFFFF", transparency: 8, line: "E5ECE7", lineWidth: 0.9 });
  addPage(s, "Product Report", 1);
  addTitle(
    s,
    "把传染病健康管理\n装进手机",
    "中医云健康 App 围绕传染病方向，把风险提示、问诊建议、检测记录、疾病档案和康复管理串成一条日常使用路径。",
    { x: 0.96, y: 1.1, w: 4.95, h: 1.58, size: 34, subY: 1.88, subW: 4.8, subH: 0.94, subSize: 13.2 }
  );
  pill(s, "传染病方向", 0.95, 4.42, 1.12, C.green, "DFF3EE");
  pill(s, "可运行 App", 2.22, 4.42, 1.02, C.blue, "E7EDFF");
  pill(s, "APK 实测", 3.39, 4.42, 0.98, "8C6200", "FFF2CF");
  s.addText("这份汇报重点看产品如何被使用，而不只是列出做了哪些页面。", {
    x: 0.98, y: 5.0, w: 4.58, h: 0.36, fontFace: font, fontSize: 11.5, color: C.muted, margin: 0, fit: "shrink"
  });
  s.addText("汇报结构", { x: 0.98, y: 5.46, w: 0.9, h: 0.16, fontFace: font, fontSize: 8.8, color: C.greenDark, bold: true, margin: 0 });
  s.addText("用户进入 → 看今日风险 → 问诊/检测 → 建档随访 → 饮食运动内容闭环", {
    x: 0.98, y: 5.66, w: 4.62, h: 0.52, fontFace: font, fontSize: 12.1, color: C.ink, margin: 0, fit: "shrink"
  });
}

function slide2() {
  const s = pptx.addSlide();
  addBg(s);
  addPage(s, "Narrative", 2);
  addTitle(s, "用户每天打开 App，是为了解决三个问题。", "先判断今天有没有风险，再决定要做什么，最后把记录沉淀到档案里。", { w: 10.2, size: 29, subW: 8.4 });
  const items = [
    ["01", "今天安全吗", "首页把评分、肺结核等重点风险、待办和指标摘要放在第一屏。", C.green, "EAF4EF"],
    ["02", "下一步做什么", "问诊、检测和疾病档案把模糊症状转成可执行动作。", C.blue, "E7EDFF"],
    ["03", "怎样坚持管理", "膳食、运动、讲堂和个人档案承接恢复期的日常管理。", "A36A00", "FFF2CF"]
  ];
  items.forEach(([no, t, d, color, fill], i) => {
    const x = 0.72 + i * 4.08;
    card(s, x, 2.58, 3.55, 3.0, { fill });
    s.addText(no, { x: x + 0.22, y: 2.82, w: 0.7, h: 0.44, fontFace: "Aptos Display", fontSize: 30, bold: true, color, margin: 0 });
    s.addText(t, { x: x + 0.24, y: 3.48, w: 2.65, h: 0.34, fontFace: titleFont, fontSize: 18, bold: true, color: C.ink, margin: 0 });
    s.addText(d, { x: x + 0.24, y: 4.08, w: 2.86, h: 0.78, fontFace: font, fontSize: 12, color: C.muted, fit: "shrink", margin: 0.02 });
  });
  s.addShape(pptx.ShapeType.line, { x: 1.1, y: 6.2, w: 11.0, h: 0, line: { color: C.green, width: 1.2, transparency: 45 } });
  s.addText("汇报主线：看见风险 → 获得建议 → 记录数据 → 持续随访", {
    x: 1.08, y: 6.43, w: 9.9, h: 0.24, fontFace: font, fontSize: 13, color: C.greenDark, bold: true, margin: 0
  });
}

function slide3() {
  const s = pptx.addSlide();
  addBg(s, "F7F9F5");
  addPage(s, "Home", 3);
  addTitle(s, "首页先给答案：今天最该关注什么", "第一屏不是入口堆叠，而是把健康评分、重点疾病、待办和服务入口排出优先级。", { w: 7.1, size: 28, subW: 6.8 });
  phone(s, pathOf("home.png"), 8.62, 0.78, 5.85, "首页健康仪表盘");
  metric(s, "健康评分", "92", 0.75, 2.45, 1.65, C.green);
  metric(s, "重点疾病", "肺结核", 2.62, 2.45, 1.85, C.blue);
  metric(s, "核心入口", "8 个", 4.75, 2.45, 1.62, "A36A00");
  bullet(s, "对传染病管理来说，风险提示比功能入口更重要。", 0.78, 3.72, 5.9);
  bullet(s, "底部导航保留主路径，首页只放当天最常用的动作。", 0.78, 4.28, 5.9);
  bullet(s, "首屏形成健康状态、疾病风险和下一步行动的组合。", 0.78, 4.84, 5.9);
  card(s, 0.75, 5.8, 6.48, 0.62, { fill: "102421", line: "102421" });
  s.addText("首页承担“今日健康简报”的角色，让用户不用先学习菜单。", {
    x: 1.0, y: 6.01, w: 5.95, h: 0.2, fontFace: font, fontSize: 11.2, color: "FFFFFF", margin: 0
  });
}

function slide4() {
  const s = pptx.addSlide();
  addBg(s);
  addPage(s, "AI Consult", 4);
  addTitle(s, "问诊不是聊天展示，而是把症状整理成行动", "用户输入咳嗽、低热、出汗等症状后，页面给出方向判断、辨证思路和就医提醒。", { w: 9.05, size: 26, subY: 0.92, subW: 8.0, subH: 0.35 });
  phone(s, pathOf("consult.png"), 0.92, 2.05, 4.45, "AI 在线问诊");
  const steps = [
    ["输入", "症状 + 时长 + 接触史"],
    ["识别", "疾病风险"],
    ["输出", "管理建议"]
  ];
  steps.forEach(([t, d], i) => {
    const x = 4.36 + i * 2.56;
    card(s, x, 2.05, 2.08, 1.74, { fill: i === 0 ? "EAF4EF" : i === 1 ? "E7EDFF" : "FFF2CF" });
    s.addText(String(i + 1), { x: x + 0.2, y: 2.23, w: 0.45, h: 0.36, fontFace: "Aptos Display", fontSize: 26, bold: true, color: i === 1 ? C.blue : C.green, margin: 0 });
    s.addText(t, { x: x + 0.72, y: 2.28, w: 0.9, h: 0.26, fontFace: titleFont, fontSize: 17, bold: true, color: C.ink, margin: 0 });
    s.addText(d, { x: x + 0.23, y: 3.0, w: 1.55, h: 0.32, fontFace: font, fontSize: 11.5, color: C.muted, fit: "shrink", margin: 0 });
  });
  card(s, 4.36, 4.58, 7.75, 1.3, { fill: "FFFFFF" });
  s.addText("这一页讲清楚 AI 的价值", { x: 4.65, y: 4.82, w: 2.55, h: 0.22, fontFace: titleFont, fontSize: 15, bold: true, color: C.ink, margin: 0 });
  s.addText("重点不是回答得像医生，而是把用户说不清的症状拆成结构化信息，帮助他决定是否检测、复诊或调整生活方式。", {
    x: 4.65, y: 5.22, w: 6.8, h: 0.34, fontFace: font, fontSize: 12.5, color: C.muted, fit: "shrink", margin: 0
  });
}

function slide5() {
  const s = pptx.addSlide();
  addBg(s, "F7F9F5");
  addPage(s, "Health Data", 5);
  addTitle(s, "健康检测把一串数字变成风险提示", "体温、血压、血糖、心率、睡眠和步数不只是录入项，而是后续问诊和随访的依据。", { w: 7.2, size: 28, subW: 6.8 });
  phone(s, pathOf("health.png"), 8.7, 0.85, 5.75, "健康检测页面");
  const bars = [0.36, 0.48, 0.54, 0.62, 0.72, 0.78, 0.88];
  card(s, 0.74, 2.35, 6.8, 2.45, { fill: "FFFFFF" });
  s.addText("7 日趋势示意", { x: 1.05, y: 2.66, w: 2.5, h: 0.24, fontFace: titleFont, fontSize: 15, bold: true, color: C.ink, margin: 0 });
  bars.forEach((b, i) => {
    const x = 1.16 + i * 0.76;
    const h = b * 1.2;
    s.addShape(pptx.ShapeType.roundRect, {
      x,
      y: 4.08 - h,
      w: 0.34,
      h,
      rectRadius: 0.06,
      fill: { color: i > 4 ? C.green : "BBDDD5" },
      line: { color: i > 4 ? C.green : "BBDDD5" }
    });
  });
  line(s, 1.02, 4.12, 6.5, 4.12, "DDE8E2", 1);
  metric(s, "体温", "36.7°C", 0.78, 5.28, 1.62, C.green);
  metric(s, "血压", "118/76", 2.62, 5.28, 1.66, C.blue);
  metric(s, "血糖", "5.6", 4.48, 5.28, 1.45, "A36A00");
  metric(s, "睡眠", "7.2h", 6.12, 5.28, 1.45, C.green);
}

function slide6() {
  const s = pptx.addSlide();
  addBg(s);
  addPage(s, "Disease Management", 6);
  addTitle(s, "疾病档案让传染病管理有依据", "艾滋病、肺结核、病毒性肝炎、流感、手足口病都有独立管理信息，方便切换重点和持续跟踪。", {
    x: 4.42,
    y: 0.62,
    w: 7.65,
    h: 0.62,
    size: 26,
    subY: 0.82,
    subW: 7.15,
    subH: 0.44,
    subSize: 12.2
  });
  phone(s, pathOf("chronic.png"), 0.82, 1.48, 5.35, "传染病管理页面");
  const diseases = [
    ["艾滋病", "依从性 / 机会感染"],
    ["肺结核", "规范治疗 / 通风隔离"],
    ["病毒性肝炎", "肝功 / 病毒载量"],
    ["流感", "体温 / 呼吸道症状"],
    ["手足口病", "皮疹 / 儿童观察"]
  ];
  diseases.forEach(([n, d], i) => {
    const y = 2.02 + i * 0.72;
    card(s, 4.42, y, 7.2, 0.54, { fill: i === 1 ? "EAF4EF" : "FFFFFF", shadow: false });
    s.addText(n, { x: 4.66, y: y + 0.14, w: 1.52, h: 0.18, fontFace: titleFont, fontSize: 12.2, bold: true, color: i === 1 ? C.greenDark : C.ink, margin: 0 });
    s.addText(d, { x: 6.36, y: y + 0.15, w: 3.0, h: 0.18, fontFace: font, fontSize: 10.6, color: C.muted, margin: 0 });
    pill(s, i === 1 ? "当前重点" : "可切换", 10.05, y + 0.1, 0.88, i === 1 ? C.green : C.muted, i === 1 ? "DFF3EE" : "EEF1F0");
  });
  card(s, 4.42, 5.92, 7.2, 0.68, { fill: "102421", line: "102421" });
  s.addText("这里承接的是“长期可管”的能力：疾病、症状、提醒和档案形成基础数据层。", {
    x: 4.72, y: 6.15, w: 6.5, h: 0.18, fontFace: font, fontSize: 11.2, color: "FFFFFF", fit: "shrink", margin: 0
  });
}

function slide7(assets) {
  const s = pptx.addSlide();
  addBg(s, "F7F9F5");
  addPage(s, "Closed Loop", 7);
  addTitle(s, "康复管理落到吃、动、学、记", "问诊和检测之后，用户需要的是可执行的生活安排：怎么吃、何时运动、看什么内容、如何沉淀记录。", {
    w: 10.35,
    h: 0.58,
    size: 25.5,
    subY: 0.78,
    subW: 7.95,
    subH: 0.42,
    subSize: 12.2
  });
  s.addImage({ path: assets.flow, x: 7.42, y: 2.03, w: 4.5, h: 2.45 });
  const blocks = [
    ["膳食", "按恢复期给出清淡高蛋白和忌口"],
    ["体质", "用九种体质结果解释调理方向"],
    ["运动", "发热期暂停，恢复期轻量活动"],
    ["内容", "讲堂和百科承接科普、收藏、复查"]
  ];
  blocks.forEach(([t, d], i) => {
    const x = 0.78 + (i % 2) * 3.12;
    const y = 2.34 + Math.floor(i / 2) * 1.34;
    card(s, x, y, 2.72, 0.98, { fill: i === 0 ? "EAF4EF" : i === 1 ? "E7EDFF" : i === 2 ? "FFF2CF" : "FFFFFF" });
    s.addText(t, { x: x + 0.18, y: y + 0.18, w: 0.9, h: 0.22, fontFace: titleFont, fontSize: 15, bold: true, color: C.ink, margin: 0 });
    s.addText(d, { x: x + 0.18, y: y + 0.54, w: 2.2, h: 0.28, fontFace: font, fontSize: 10.4, color: C.muted, fit: "shrink", margin: 0 });
  });
  phone(s, pathOf("lecture.png"), 8.05, 4.58, 2.18, "讲堂内容页面");
  phone(s, pathOf("profile.png"), 10.18, 4.58, 2.18, "个人档案页面");
}

function slide8(assets) {
  const s = pptx.addSlide();
  addBg(s);
  addPage(s, "Engineering", 8);
  addTitle(s, "技术实现保持轻量，方便手机实测。", "本地 mock 和 localStorage 支撑完整流程，Capacitor 负责同步到 Android 项目并生成 APK。", { w: 8.1, size: 29, subW: 7.5 });
  s.addImage({ path: assets.abstract, x: 7.55, y: 1.05, w: 4.5, h: 2.55 });
  const nodes = [
    ["Vite", "页面构建"],
    ["TypeScript", "交互逻辑"],
    ["localStorage", "本地数据"],
    ["Capacitor", "Android WebView"],
    ["APK", "手机测试"]
  ];
  nodes.forEach(([a, b], i) => {
    const x = 0.78 + i * 2.38;
    card(s, x, 3.05, 1.75, 1.08, { fill: i === 4 ? "102421" : "FFFFFF", line: i === 4 ? "102421" : C.line });
    s.addText(a, { x: x + 0.16, y: 3.25, w: 1.4, h: 0.18, fontFace: "Aptos Display", fontSize: 13, bold: true, color: i === 4 ? "FFFFFF" : C.ink, margin: 0 });
    s.addText(b, { x: x + 0.16, y: 3.64, w: 1.4, h: 0.16, fontFace: font, fontSize: 9.5, color: i === 4 ? "D7EFE8" : C.muted, margin: 0 });
    if (i < nodes.length - 1) line(s, x + 1.78, 3.59, x + 2.28, 3.59, C.green, 1.5);
  });
  card(s, 0.78, 5.22, 5.6, 0.9, { fill: "EAF4EF" });
  s.addText("MVP 取舍", { x: 1.02, y: 5.45, w: 1.5, h: 0.18, fontFace: titleFont, fontSize: 13, bold: true, color: C.greenDark, margin: 0 });
  s.addText("先保证登录、问诊、检测、档案和收藏流程跑通；后端同步和真实模型可作为下一阶段接入。", {
    x: 2.35, y: 5.42, w: 3.8, h: 0.28, fontFace: font, fontSize: 10.6, color: C.muted, fit: "shrink", margin: 0
  });
}

function slide9() {
  const s = pptx.addSlide();
  addBg(s, "F7F9F5");
  addPage(s, "Completion", 9);
  addTitle(s, "核心能力已经形成可演示闭环", "这版不是静态原型，关键交互都能在本地数据里产生状态变化，适合放到手机上走完整演示。", {
    w: 10.2,
    h: 0.6,
    size: 26.5,
    subY: 0.82,
    subW: 7.4,
    subH: 0.4,
    subSize: 12.5
  });
  phone(s, pathOf("auth.png"), 0.9, 2.28, 3.95, "登录页");
  phone(s, pathOf("home.png"), 3.04, 2.28, 3.95, "首页");
  const rules = [
    ["账号进入", "登录/注册后进入首页，并保存用户状态。"],
    ["数据记录", "健康检测提交后更新最近记录和风险状态。"],
    ["问诊反馈", "输入不同症状，生成差异化的模拟 AI 建议。"],
    ["内容收藏", "讲堂收藏能切换，设置页可清除本地数据。"]
  ];
  rules.forEach(([t, d], i) => {
    const y = 2.12 + i * 0.98;
    card(s, 6.1, y, 5.75, 0.68, { fill: i % 2 === 0 ? "FFFFFF" : "EAF4EF", shadow: false });
    s.addText(t, { x: 6.25, y: y + 0.2, w: 0.8, h: 0.18, fontFace: titleFont, fontSize: 13, bold: true, color: C.greenDark, margin: 0 });
    s.addText(d, { x: 7.22, y: y + 0.18, w: 4.28, h: 0.22, fontFace: font, fontSize: 10.6, color: C.muted, fit: "shrink", margin: 0 });
  });
}

function slide10() {
  const s = pptx.addSlide();
  addBg(s);
  addPage(s, "Roadmap", 10);
  addTitle(s, "下一步：从演示版走向真实服务", "当前版本已经满足手机测试和课程汇报；继续扩展时，重点是数据同步、医护协作和真实模型能力。", { w: 9.0, size: 29, subW: 8.0 });
  const checks = [
    ["后端同步", "用户档案、检测记录和收藏跨设备保存"],
    ["医护端", "随访任务、复诊提醒、异常指标查看"],
    ["模型接入", "把模拟回复替换成真实大模型服务"],
    ["推送提醒", "用药、复诊、检测和课程学习提醒"],
    ["数据合规", "权限、隐私说明和医学内容审核"]
  ];
  checks.forEach(([a, b], i) => {
    const x = 0.78 + (i % 3) * 3.95;
    const y = 2.35 + Math.floor(i / 3) * 1.38;
    card(s, x, y, 3.35, 0.95, { fill: i === 0 ? "EAF4EF" : i === 1 ? "E7EDFF" : i === 2 ? "FFF2CF" : "FFFFFF" });
    s.addText(a, { x: x + 0.2, y: y + 0.2, w: 0.9, h: 0.2, fontFace: "Aptos Display", fontSize: 15, bold: true, color: C.green, margin: 0 });
    s.addText(b, { x: x + 1.15, y: y + 0.23, w: 1.88, h: 0.2, fontFace: font, fontSize: 10.8, color: C.muted, fit: "shrink", margin: 0 });
  });
  card(s, 0.78, 5.58, 11.42, 0.72, { fill: "102421", line: "102421" });
  s.addText("汇报结尾：这是一个可运行的移动健康管理 App，后续升级方向清晰。", {
    x: 1.08, y: 5.82, w: 10.3, h: 0.18, fontFace: font, fontSize: 12, color: "FFFFFF", margin: 0
  });
}

async function main() {
  ensureDirs();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Codex";
  pptx.company = "中医云健康";
  pptx.subject = "中医云健康 App 汇报新版";
  pptx.title = "中医云健康App汇报-新版";
  pptx.lang = "zh-CN";
  pptx.theme = {
    headFontFace: titleFont,
    bodyFontFace: font,
    lang: "zh-CN"
  };
  pptx.defineLayout({ name: "CUSTOM_WIDE", width: W, height: H });
  pptx.layout = "CUSTOM_WIDE";

  const assets = buildAssets();
  write("notes/new-flow.txt", [
    "Selected MCP reference: ykuwai/ppt-mcp",
    "Reason: real-time PowerPoint control through COM automation, SVG icon insertion, template and animation support.",
    "Backup reference: trsdn/mcp-server-ppt",
    "Production workflow:",
    "1. Capture real app pages with Chrome/Puppeteer.",
    "2. Generate supplementary visual assets.",
    "3. Build a 16:9 editable PPTX with pptxgenjs text/shapes plus image assets.",
    "4. Post-process with PowerPoint COM for transitions and animations.",
    "5. Export 1920x1080 previews and inspect contact sheet.",
    "6. Record element/proportion QA results."
  ].join("\n"));
  write("notes/claim-spine.txt", [
    "1. 中医云健康把传染病健康管理装进手机，重点不是页面数量，而是用户每天如何使用。",
    "2. 用户打开 App 先看风险，再获得建议，最后把数据沉淀成连续随访记录。",
    "3. 首页承担今日健康简报角色，让用户先看到评分、重点疾病和下一步行动。",
    "4. AI 问诊把模糊症状整理为疾病风险、辨证思路和管理建议。",
    "5. 健康检测把体征数据变成后续问诊和随访的依据。",
    "6. 疾病档案支撑艾滋病、肺结核、病毒性肝炎、流感、手足口病的持续管理。",
    "7. 饮食、体质、运动、讲堂和档案把康复管理落到日常。",
    "8. 当前版本已形成可演示闭环，下一步可扩展后端同步、医护端和真实模型能力。"
  ].join("\n"));

  [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5,
    slide6,
    slide7,
    slide8,
    slide9,
    slide10
  ].forEach((fn) => fn(assets));

  const finalPath = path.join(outputDir, "中医云健康App汇报-新版-v4.pptx");
  const aliasPath = path.join(outputDir, "tcm-cloud-health-redesign-v4.pptx");
  await pptx.writeFile({ fileName: finalPath });
  fs.copyFileSync(finalPath, aliasPath);
  write("notes/build-result.txt", `Deck written: ${finalPath}\nSlides: 10\nAlias: ${aliasPath}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
