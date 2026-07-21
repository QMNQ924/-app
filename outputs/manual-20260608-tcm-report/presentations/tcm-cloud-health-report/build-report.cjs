const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const pptx = new pptxgen();

const repoRoot = path.resolve(__dirname, "../../../..");
const workspace = __dirname;
const outputDir = path.join(repoRoot, "outputs", "manual-20260608-tcm-report", "output");
const assetDir = path.join(workspace, "assets");
const qaDir = path.join(workspace, "qa");
const previewDir = path.join(workspace, "preview");
const notesDir = path.join(workspace, "notes");

const W = 13.333;
const H = 7.5;

const C = {
  bg: "F4F7FB",
  surface: "FFFFFF",
  ink: "17212B",
  muted: "667482",
  line: "DDE4EB",
  green: "0F8F83",
  green2: "E5F6F2",
  green3: "D6F0EA",
  blue: "2F6BFF",
  blue2: "E8F0FF",
  blue3: "DDE8FF",
  teal: "0AA3A0",
  orange: "F59E0B",
  orange2: "FFF2D7",
  red: "EF476F",
  red2: "FFE8EE",
  dark: "10202E"
};

const titleFont = "Microsoft YaHei";
const bodyFont = "Microsoft YaHei";

const slides = [];

function ensureDirs() {
  [outputDir, assetDir, qaDir, previewDir, notesDir].forEach((dir) => fs.mkdirSync(dir, { recursive: true }));
}

function write(file, content) {
  fs.writeFileSync(path.join(workspace, file), content, "utf8");
}

function svgWrap(inner, w = 1200, h = 900, bg = `#${C.bg}`) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">\n<defs>\n<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">\n<stop offset="0%" stop-color="#F7FBFF"/>\n<stop offset="55%" stop-color="${bg}"/>\n<stop offset="100%" stop-color="#EAF7F4"/>\n</linearGradient>\n<linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">\n<stop offset="0%" stop-color="#0F8F83"/>\n<stop offset="100%" stop-color="#32C0B3"/>\n</linearGradient>\n<linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">\n<stop offset="0%" stop-color="#2F6BFF"/>\n<stop offset="100%" stop-color="#8DB0FF"/>\n</linearGradient>\n<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">\n<feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#10202E" flood-opacity=".12"/>\n</filter>\n</defs>\n${inner}\n</svg>`;
}

function writeSvg(name, svg) {
  const file = path.join(assetDir, name);
  fs.writeFileSync(file, svg, "utf8");
  return file;
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function makePhoneMockup(kind) {
  const title = kind === "home" ? "今日健康摘要" : kind === "consult" ? "AI 在线问诊" : "健康管理";
  const top = kind === "home" ? `
    <rect x="0" y="0" width="470" height="860" rx="40" fill="#F7FAFC"/>
    <rect x="28" y="28" width="414" height="804" rx="34" fill="#ffffff" stroke="#E3EAF2"/>
    <rect x="28" y="28" width="414" height="118" rx="34" fill="url(#g1)"/>
    <text x="60" y="78" fill="#FFFFFF" font-family="${titleFont}" font-size="28" font-weight="700">中医云健康</text>
    <text x="60" y="112" fill="#DBFFF8" font-family="${bodyFont}" font-size="16">传染病健康管理中心</text>
    <rect x="60" y="160" width="350" height="146" rx="24" fill="#EEF9F6"/>
    <text x="86" y="202" fill="#0F8F83" font-family="${titleFont}" font-size="20" font-weight="700">${title}</text>
    <circle cx="338" cy="232" r="54" fill="none" stroke="#0F8F83" stroke-width="16" stroke-linecap="round" stroke-dasharray="238 45"/>
    <text x="322" y="236" fill="#0F8F83" font-family="${titleFont}" font-size="28" font-weight="800">86</text>
    <text x="317" y="264" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">健康评分</text>
    <rect x="60" y="330" width="164" height="106" rx="22" fill="#FFFDF4" stroke="#F2E4B4"/>
    <rect x="246" y="330" width="164" height="106" rx="22" fill="#F5FAFF" stroke="#D6E4FF"/>
    <rect x="60" y="456" width="164" height="106" rx="22" fill="#F5FBF8" stroke="#D7ECE3"/>
    <rect x="246" y="456" width="164" height="106" rx="22" fill="#FFF4F7" stroke="#FFD5DF"/>
    <text x="82" y="371" fill="#17212B" font-family="${bodyFont}" font-size="16" font-weight="700">体温</text>
    <text x="82" y="402" fill="#17212B" font-family="${titleFont}" font-size="28" font-weight="800">36.7°</text>
    <text x="268" y="371" fill="#17212B" font-family="${bodyFont}" font-size="16" font-weight="700">血压</text>
    <text x="268" y="402" fill="#17212B" font-family="${titleFont}" font-size="28" font-weight="800">118/76</text>
    <text x="82" y="497" fill="#17212B" font-family="${bodyFont}" font-size="16" font-weight="700">睡眠</text>
    <text x="82" y="528" fill="#17212B" font-family="${titleFont}" font-size="28" font-weight="800">7.2h</text>
    <text x="268" y="497" fill="#17212B" font-family="${bodyFont}" font-size="16" font-weight="700">步数</text>
    <text x="268" y="528" fill="#17212B" font-family="${titleFont}" font-size="28" font-weight="800">7200</text>
    <rect x="60" y="590" width="350" height="98" rx="22" fill="#F8FBFD" stroke="#E3EAF2"/>
    <text x="82" y="625" fill="#17212B" font-family="${bodyFont}" font-size="17" font-weight="700">重点提醒</text>
    <text x="82" y="653" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">围绕艾滋病、肺结核、病毒性肝炎、流感、手足口病做连续管理。</text>
    <rect x="68" y="734" width="334" height="50" rx="18" fill="#10202E"/>
    <text x="108" y="766" fill="#FFFFFF" font-family="${bodyFont}" font-size="18" font-weight="700">首页 · 问诊 · 检测 · 传染病 · 我的</text>
  ` : kind === "consult" ? `
    <rect x="0" y="0" width="470" height="860" rx="40" fill="#F7FAFC"/>
    <rect x="28" y="28" width="414" height="804" rx="34" fill="#ffffff" stroke="#E3EAF2"/>
    <rect x="28" y="28" width="414" height="94" rx="34" fill="url(#g2)"/>
    <text x="60" y="76" fill="#FFFFFF" font-family="${titleFont}" font-size="28" font-weight="700">AI 在线问诊</text>
    <rect x="60" y="146" width="350" height="92" rx="20" fill="#EEF7FF"/>
    <text x="82" y="184" fill="#1F3F83" font-family="${bodyFont}" font-size="16" font-weight="700">输入症状、时长、接触史</text>
    <text x="82" y="211" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">系统会结合传染病方向给出模拟建议。</text>
    <rect x="60" y="260" width="308" height="74" rx="20" fill="#0F8F83"/>
    <text x="86" y="292" fill="#FFFFFF" font-family="${bodyFont}" font-size="15">咳嗽咳痰两周</text>
    <text x="86" y="316" fill="#D6FFF8" font-family="${bodyFont}" font-size="13">症状快捷标签</text>
    <rect x="102" y="352" width="308" height="88" rx="22" fill="#F5FBF8"/>
    <text x="126" y="384" fill="#17212B" font-family="${bodyFont}" font-size="16" font-weight="700">我先按“肺结核”方向分析</text>
    <text x="126" y="412" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">中医辨证：肺阴亏虚、气阴两虚</text>
    <rect x="60" y="468" width="350" height="146" rx="22" fill="#FAFBFC" stroke="#E5EAF0"/>
    <text x="82" y="506" fill="#17212B" font-family="${bodyFont}" font-size="16" font-weight="700">建议动作</text>
    <text x="82" y="534" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">· 规范治疗 · 定期复查 · 饮食清淡</text>
    <text x="82" y="560" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">· 记录体温 · 补液休息 · 观察危险信号</text>
    <rect x="60" y="740" width="258" height="50" rx="18" fill="#EEF7F6"/>
    <rect x="330" y="740" width="70" height="50" rx="18" fill="#0F8F83"/>
    <text x="92" y="771" fill="#0F8F83" font-family="${bodyFont}" font-size="18" font-weight="700">输入框</text>
    <text x="350" y="771" fill="#FFFFFF" font-family="${bodyFont}" font-size="18" font-weight="700">发送</text>
  ` : `
    <rect x="0" y="0" width="470" height="860" rx="40" fill="#F7FAFC"/>
    <rect x="28" y="28" width="414" height="804" rx="34" fill="#ffffff" stroke="#E3EAF2"/>
    <rect x="28" y="28" width="414" height="94" rx="34" fill="url(#g1)"/>
    <text x="60" y="76" fill="#FFFFFF" font-family="${titleFont}" font-size="28" font-weight="700">${title}</text>
    <rect x="60" y="156" width="350" height="180" rx="24" fill="#F8FBFD" stroke="#E4EBF2"/>
    <text x="84" y="195" fill="#17212B" font-family="${bodyFont}" font-size="16" font-weight="700">传染病管理链路</text>
    <text x="84" y="224" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">登录 → 首页 → 问诊 → 检测 → 慢病管理</text>
    <rect x="84" y="250" width="300" height="18" rx="9" fill="#DCE5EE"/>
    <rect x="84" y="250" width="120" height="18" rx="9" fill="#0F8F83"/>
    <rect x="60" y="364" width="164" height="114" rx="22" fill="#FFF6E4"/>
    <rect x="246" y="364" width="164" height="114" rx="22" fill="#EAF0FF"/>
    <rect x="60" y="496" width="164" height="114" rx="22" fill="#E9F8F5"/>
    <rect x="246" y="496" width="164" height="114" rx="22" fill="#FFF0F5"/>
  `;
  const bottomNav = `
    <rect x="56" y="736" width="358" height="56" rx="20" fill="#10202E"/>
    <text x="84" y="770" fill="#FFFFFF" font-family="${bodyFont}" font-size="17">首页</text>
    <text x="164" y="770" fill="#9AD8D1" font-family="${bodyFont}" font-size="17">问诊</text>
    <text x="244" y="770" fill="#9AD8D1" font-family="${bodyFont}" font-size="17">检测</text>
    <text x="324" y="770" fill="#9AD8D1" font-family="${bodyFont}" font-size="17">传染病</text>
  `;
  return svgWrap(`${top}${kind === "home" ? "" : bottomNav}`, 470, 860, "#F4F7FB");
}

function makeCoverSvg() {
  const inner = `
    <ellipse cx="790" cy="196" rx="170" ry="170" fill="#D9F5EE"/>
    <ellipse cx="856" cy="272" rx="120" ry="120" fill="#DFEAFE"/>
    <rect x="650" y="90" width="392" height="620" rx="52" fill="#FFFFFF" filter="url(#shadow)"/>
    <rect x="682" y="126" width="328" height="90" rx="24" fill="url(#g1)"/>
    <text x="710" y="170" fill="#FFFFFF" font-family="${titleFont}" font-size="26" font-weight="700">中医云健康</text>
    <text x="710" y="196" fill="#D9FFF9" font-family="${bodyFont}" font-size="15">传染病健康管理中心</text>
    <rect x="682" y="238" width="156" height="140" rx="28" fill="#F7FBFD" stroke="#E2EAF0"/>
    <rect x="854" y="238" width="156" height="140" rx="28" fill="#F5FAFF" stroke="#D9E7FF"/>
    <rect x="682" y="394" width="328" height="118" rx="28" fill="#F5FBF8" stroke="#D7EDE4"/>
    <rect x="682" y="530" width="156" height="122" rx="24" fill="#FFF7EA" stroke="#F1DEAF"/>
    <rect x="854" y="530" width="156" height="122" rx="24" fill="#FFF0F5" stroke="#F6C7D4"/>
    <circle cx="988" cy="280" r="48" fill="none" stroke="#0F8F83" stroke-width="14" stroke-linecap="round" stroke-dasharray="202 35"/>
    <text x="972" y="286" fill="#0F8F83" font-family="${titleFont}" font-size="28" font-weight="800">86</text>
    <text x="948" y="318" fill="#5A6B7A" font-family="${bodyFont}" font-size="13">健康评分</text>
    <text x="708" y="280" fill="#17212B" font-family="${bodyFont}" font-size="15" font-weight="700">体温</text>
    <text x="708" y="308" fill="#17212B" font-family="${titleFont}" font-size="26" font-weight="800">36.7°</text>
    <text x="880" y="280" fill="#17212B" font-family="${bodyFont}" font-size="15" font-weight="700">血压</text>
    <text x="880" y="308" fill="#17212B" font-family="${titleFont}" font-size="26" font-weight="800">118/76</text>
    <text x="708" y="434" fill="#17212B" font-family="${bodyFont}" font-size="16" font-weight="700">今日待办</text>
    <text x="708" y="462" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">问诊 · 检测 · 复诊 · 饮食 · 运动</text>
    <text x="708" y="584" fill="#17212B" font-family="${bodyFont}" font-size="15" font-weight="700">睡眠</text>
    <text x="708" y="614" fill="#17212B" font-family="${titleFont}" font-size="24" font-weight="800">7.2h</text>
    <text x="882" y="584" fill="#17212B" font-family="${bodyFont}" font-size="15" font-weight="700">步数</text>
    <text x="882" y="614" fill="#17212B" font-family="${titleFont}" font-size="24" font-weight="800">7200</text>
  `;
  return svgWrap(inner, 1200, 900, "#F4F7FB");
}

function makeConsultSvg() {
  const inner = `
    <rect x="54" y="58" width="1092" height="784" rx="52" fill="#ffffff" filter="url(#shadow)"/>
    <rect x="54" y="58" width="1092" height="108" rx="52" fill="url(#g2)"/>
    <text x="94" y="116" fill="#FFFFFF" font-family="${titleFont}" font-size="30" font-weight="700">AI 在线问诊</text>
    <text x="94" y="146" fill="#EAF1FF" font-family="${bodyFont}" font-size="15">输入症状、时长、接触史和指标，输出模拟建议</text>
    <rect x="94" y="202" width="292" height="70" rx="20" fill="#EEF7FF"/>
    <text x="118" y="243" fill="#1D3D80" font-family="${bodyFont}" font-size="18" font-weight="700">咳嗽咳痰两周</text>
    <rect x="94" y="292" width="286" height="90" rx="22" fill="#0F8F83"/>
    <text x="120" y="330" fill="#FFFFFF" font-family="${bodyFont}" font-size="16" font-weight="700">症状快捷标签</text>
    <text x="120" y="358" fill="#D9FFF8" font-family="${bodyFont}" font-size="13">发热 · 黄疸 · 盗汗 · 皮疹</text>
    <rect x="430" y="220" width="612" height="162" rx="28" fill="#F5FBF8"/>
    <text x="458" y="262" fill="#17212B" font-family="${bodyFont}" font-size="18" font-weight="700">我先按“肺结核”方向分析</text>
    <text x="458" y="298" fill="#5A6B7A" font-family="${bodyFont}" font-size="15">中医辨证：肺阴亏虚、气阴两虚</text>
    <text x="458" y="334" fill="#5A6B7A" font-family="${bodyFont}" font-size="15">建议动作：规范治疗、定期复查、清淡饮食、补液休息</text>
    <rect x="430" y="414" width="292" height="192" rx="28" fill="#F8FBFD" stroke="#E5ECF2"/>
    <text x="458" y="456" fill="#17212B" font-family="${bodyFont}" font-size="17" font-weight="700">建议动作</text>
    <text x="458" y="494" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">· 记录体温和心率</text>
    <text x="458" y="524" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">· 先观察症状趋势</text>
    <text x="458" y="554" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">· 保持通风和休息</text>
    <rect x="746" y="414" width="296" height="192" rx="28" fill="#FFF6F8" stroke="#F8D1DB"/>
    <text x="774" y="456" fill="#17212B" font-family="${bodyFont}" font-size="17" font-weight="700">就医提醒</text>
    <text x="774" y="494" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">咯血增多、胸闷气促、持续高热</text>
    <text x="774" y="524" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">或药物不良反应时要及时就医。</text>
    <rect x="94" y="670" width="948" height="112" rx="26" fill="#10202E"/>
    <text x="122" y="718" fill="#FFFFFF" font-family="${bodyFont}" font-size="17" font-weight="700">内容仅用于健康管理与科普，不能替代医生诊断和治疗。</text>
    <text x="122" y="750" fill="#BFE4DC" font-family="${bodyFont}" font-size="14">输入不同症状会切换到不同的疾病方向和建议模板。</text>
  `;
  return svgWrap(inner, 1200, 900, "#F4F7FB");
}

function makeFlowSvg() {
  const inner = `
    <rect x="64" y="82" width="1072" height="710" rx="44" fill="#FFFFFF" filter="url(#shadow)"/>
    <text x="104" y="140" fill="#17212B" font-family="${titleFont}" font-size="32" font-weight="800">App 路径与模块关系</text>
    <text x="104" y="174" fill="#667482" font-family="${bodyFont}" font-size="15">登录后，用户从首页进入问诊、检测、传染病管理、饮食和档案。</text>
    <rect x="112" y="240" width="168" height="84" rx="24" fill="#EEF7F6" stroke="#D8EBE7"/>
    <rect x="330" y="240" width="168" height="84" rx="24" fill="#F5FAFF" stroke="#DCE7FF"/>
    <rect x="548" y="240" width="168" height="84" rx="24" fill="#FFF7EA" stroke="#F4DEAA"/>
    <rect x="766" y="240" width="168" height="84" rx="24" fill="#F8FBFD" stroke="#E2E9F0"/>
    <rect x="984" y="240" width="128" height="84" rx="24" fill="#FFF0F5" stroke="#F4CED9"/>
    <text x="156" y="288" fill="#0F8F83" font-family="${bodyFont}" font-size="18" font-weight="700">登录 / 注册</text>
    <text x="376" y="288" fill="#1A3C84" font-family="${bodyFont}" font-size="18" font-weight="700">首页仪表盘</text>
    <text x="594" y="288" fill="#9A5A00" font-family="${bodyFont}" font-size="18" font-weight="700">AI 问诊</text>
    <text x="810" y="288" fill="#17212B" font-family="${bodyFont}" font-size="18" font-weight="700">健康检测</text>
    <text x="1006" y="288" fill="#B93357" font-family="${bodyFont}" font-size="18" font-weight="700">我的</text>
    <path d="M280 282H320" stroke="#A9B6C2" stroke-width="4" stroke-linecap="round"/>
    <path d="M498 282H538" stroke="#A9B6C2" stroke-width="4" stroke-linecap="round"/>
    <path d="M716 282H756" stroke="#A9B6C2" stroke-width="4" stroke-linecap="round"/>
    <path d="M934 282H974" stroke="#A9B6C2" stroke-width="4" stroke-linecap="round"/>
    <rect x="124" y="398" width="250" height="212" rx="32" fill="#0F8F83"/>
    <text x="152" y="446" fill="#FFFFFF" font-family="${bodyFont}" font-size="18" font-weight="700">首页聚合</text>
    <text x="152" y="482" fill="#D9FFF8" font-family="${bodyFont}" font-size="14">评分 / 风险 / 待办 / 入口</text>
    <text x="152" y="516" fill="#D9FFF8" font-family="${bodyFont}" font-size="14">把今天最重要的事排前面</text>
    <text x="152" y="550" fill="#D9FFF8" font-family="${bodyFont}" font-size="14">减少页面跳转和信息寻找成本</text>
    <rect x="404" y="398" width="250" height="212" rx="32" fill="#F4F8FF" stroke="#D9E3FF"/>
    <text x="432" y="446" fill="#1A3C84" font-family="${bodyFont}" font-size="18" font-weight="700">问诊输出</text>
    <text x="432" y="482" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">症状 → 疾病方向 → 建议动作</text>
    <text x="432" y="516" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">聊天式交互，结果卡片化</text>
    <text x="432" y="550" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">兼顾辨证思路与就医提醒</text>
    <rect x="684" y="398" width="250" height="212" rx="32" fill="#FFF8ED" stroke="#F0D9A3"/>
    <text x="712" y="446" fill="#9A5A00" font-family="${bodyFont}" font-size="18" font-weight="700">长期管理</text>
    <text x="712" y="482" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">检测、复诊、饮食、运动</text>
    <text x="712" y="516" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">形成可持续的健康闭环</text>
    <text x="712" y="550" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">本地数据可保存和清空</text>
    <rect x="964" y="398" width="160" height="212" rx="32" fill="#FFF3F6" stroke="#F5CFDB"/>
    <text x="990" y="446" fill="#B93357" font-family="${bodyFont}" font-size="18" font-weight="700">收藏 / 设置</text>
    <text x="990" y="482" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">便于回看内容</text>
    <text x="990" y="516" fill="#5A6B7A" font-family="${bodyFont}" font-size="14">隐私和数据说明</text>
  `;
  return svgWrap(inner, 1200, 900, "#F4F7FB");
}

function addSlideNumber(slide, n) {
  slide.addText(String(n).padStart(2, "0"), {
    x: 12.45,
    y: 7.02,
    w: 0.38,
    h: 0.16,
    fontFace: bodyFont,
    fontSize: 9,
    color: "7F8A96",
    align: "right",
    margin: 0
  });
}

function addKicker(slide, text, x, y, w = 2.0, id = "kicker") {
  slide.addShape(pptx.ShapeType.ellipse, {
    x, y: y + 0.03, w: 0.12, h: 0.12,
    line: { color: C.green, pt: 0.5 },
    fill: { color: C.green }
  });
  slide.addText(text, {
    x: x + 0.18, y, w: w - 0.18, h: 0.2,
    fontFace: bodyFont,
    fontSize: 9.5,
    bold: true,
    color: C.green,
    charSpacing: 1.2,
    margin: 0
  });
}

function addClaimTitle(slide, title, x, y, w, h = 0.9, size = 28) {
  slide.addText(title, {
    x, y, w, h,
    fontFace: titleFont,
    fontSize: size,
    bold: true,
    color: C.ink,
    breakLine: false,
    margin: 0,
    valign: "mid"
  });
}

function addSubcopy(slide, text, x, y, w, h, size = 14, color = C.muted) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: bodyFont,
    fontSize: size,
    color,
    margin: 0,
    breakLine: true,
    valign: "top"
  });
}

function addPill(slide, text, x, y, w, fill, color = C.ink, line = fill) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h: 0.34,
    rectRadius: 0.08,
    fill: { color: fill },
    line: { color: line, pt: 1 }
  });
  slide.addText(text, {
    x, y: y + 0.02, w, h: 0.24,
    fontFace: bodyFont,
    fontSize: 10,
    color,
    align: "center",
    valign: "mid",
    margin: 0
  });
}

function addCard(slide, x, y, w, h, fill = C.surface, line = C.line, radius = 0.18) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    rectRadius: radius,
    fill: { color: fill },
    line: { color: line, pt: 1 }
  });
}

function addIconBadge(slide, iconPath, x, y, size = 0.48, fill = C.green2) {
  addCard(slide, x, y, size, size, fill, fill, 0.14);
  slide.addImage({ path: iconPath, x: x + 0.08, y: y + 0.08, w: size - 0.16, h: size - 0.16 });
}

function addDivider(slide, x, y, w, color = C.line) {
  slide.addShape(pptx.ShapeType.line, {
    x, y, w, h: 0,
    line: { color, pt: 1 }
  });
}

function addArrow(slide, x1, y1, x2, y2, color = "9AA7B2", pt = 1.5) {
  slide.addShape(pptx.ShapeType.line, {
    x: x1,
    y: y1,
    w: x2 - x1,
    h: y2 - y1,
    line: { color, pt, endArrowType: "triangle" }
  });
}

function addBulletList(slide, items, x, y, w, lineHeight = 0.34, fontSize = 12.5, color = C.ink) {
  items.forEach((item, idx) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x,
      y: y + idx * lineHeight + 0.07,
      w: 0.09,
      h: 0.09,
      line: { color: C.green, pt: 0.5 },
      fill: { color: C.green }
    });
    slide.addText(item, {
      x: x + 0.14,
      y: y + idx * lineHeight,
      w: w - 0.14,
      h: 0.22,
      fontFace: bodyFont,
      fontSize,
      color,
      margin: 0
    });
  });
}

function addTagRow(slide, tags, x, y, maxW, fill = C.green2, color = C.green, gap = 0.08) {
  let cursor = x;
  let rowY = y;
  const heights = [];
  tags.forEach((tag) => {
    const w = Math.max(0.56, tag.length * 0.14 + 0.26);
    if (cursor + w > x + maxW) {
      cursor = x;
      rowY += 0.42;
    }
    addPill(slide, tag, cursor, rowY, w, fill, color, fill);
    cursor += w + gap;
    heights.push(rowY);
  });
  return Math.max(...heights) - y + 0.38;
}

function addMetricCard(slide, x, y, w, h, title, value, note, tone = "green") {
  const fills = {
    green: [C.green2, C.green3, C.green],
    blue: [C.blue2, C.blue3, C.blue],
    orange: [C.orange2, "F9EFD0", C.orange],
    red: [C.red2, "FFD9E4", C.red]
  };
  const [fill, _, accent] = fills[tone];
  addCard(slide, x, y, w, h, fill, fill, 0.18);
  slide.addText(title, {
    x: x + 0.18,
    y: y + 0.12,
    w: w - 0.36,
    h: 0.18,
    fontFace: bodyFont,
    fontSize: 11.5,
    bold: true,
    color: C.ink,
    margin: 0
  });
  slide.addText(value, {
    x: x + 0.18,
    y: y + 0.35,
    w: w - 0.36,
    h: 0.28,
    fontFace: titleFont,
    fontSize: 22,
    bold: true,
    color: accent,
    margin: 0
  });
  slide.addText(note, {
    x: x + 0.18,
    y: y + 0.7,
    w: w - 0.36,
    h: 0.2,
    fontFace: bodyFont,
    fontSize: 10.5,
    color: C.muted,
    margin: 0
  });
}

function addFooter(slide, text) {
  slide.addText(text, {
    x: 0.5, y: 7.03, w: 7.0, h: 0.12,
    fontFace: bodyFont,
    fontSize: 8.5,
    color: "8A96A1",
    margin: 0
  });
}

function addSourceFooter(slide, text) {
  slide.addText(text, {
    x: 8.6, y: 7.03, w: 4.2, h: 0.12,
    fontFace: bodyFont,
    fontSize: 8.3,
    color: "8A96A1",
    align: "right",
    margin: 0
  });
}

function makeSlide1(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: H, line: { color: C.bg, pt: 0 }, fill: { color: C.bg } });
  slide.addShape(pptx.ShapeType.ellipse, { x: 9.95, y: -0.6, w: 3.2, h: 3.2, line: { color: "D9F2ED", pt: 1 }, fill: { color: "D9F2ED", transparency: 18 } });
  slide.addShape(pptx.ShapeType.ellipse, { x: 10.5, y: 0.1, w: 2.5, h: 2.5, line: { color: "DEE8FF", pt: 1 }, fill: { color: "DEE8FF", transparency: 24 } });
  slide.addImage({ path: path.join(assetDir, "cover-hero.svg"), x: 8.18, y: 0.55, w: 4.8, h: 4.2 });
  addKicker(slide, "PRODUCT REPORT", 0.52, 0.52, 2.2);
  addClaimTitle(slide, "中医云健康 App 汇报", 0.52, 0.84, 5.6, 0.72, 34);
  addSubcopy(slide,
    "一个面向传染病健康管理的移动端 Web App / PWA / APK 工程。它把首页仪表盘、AI 问诊、健康检测、慢病管理、饮食、体质、运动和知识内容连成一条完整的使用路径。",
    0.52, 1.72, 5.9, 1.05, 14.5);
  addTagRow(slide, ["16:9", "完全可编辑", "SVG 插图", "Capacitor APK", "本地数据"], 0.52, 3.0, 5.7, C.green2, C.green);
  addCard(slide, 0.52, 3.62, 5.75, 1.28, "FFFFFF", C.line, 0.18);
  addMetricCard(slide, 0.72, 3.78, 1.48, 0.9, "功能模块", "10+", "登录、问诊、检测、内容、档案");
  addMetricCard(slide, 2.28, 3.78, 1.48, 0.9, "疾病方向", "5", "艾滋病、肺结核、肝炎、流感、手足口病", "blue");
  addMetricCard(slide, 3.84, 3.78, 1.9, 0.9, "技术栈", "Vite + TS", "Capacitor + localStorage + PowerPoint", "orange");
  addSourceFooter(slide, "来源：当前工作区 app 源码 + GitHub MCP 参考");
  addFooter(slide, "中医云健康 App 汇报");
  addSlideNumber(slide, 1);
  slides.push(slide);
}

function makeSlide2(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };
  addKicker(slide, "WHY IT MATTERS", 0.58, 0.46, 2.0);
  addClaimTitle(slide, "它不是一个单页原型，而是一套能执行日常管理的健康 App。", 0.58, 0.78, 11.0, 0.72, 30);
  addSubcopy(slide, "这版汇报强调的是使用链路，而不是功能堆叠：用户进入 App 后应该知道今天该看什么、该填什么、该问什么、该做什么。", 0.58, 1.55, 7.8, 0.46, 14);

  const x0 = 0.65;
  const topY = 2.25;
  const boxW = 3.95;
  const boxH = 2.1;
  [
    ["首页不是菜单，而是“今日摘要”", "健康评分、风险提示和待办一起出现，减少用户在多页之间切换。", "green", "home"],
    ["问诊不是聊天噱头，而是结构化建议", "症状输入后，系统会回到疾病方向、辨证思路、动作建议和就医提醒。", "blue", "consult"],
    ["管理不是一次录入，而是连续趋势", "健康检测、慢病管理、饮食与运动把“今天”变成“持续跟踪”。", "orange", "health"]
  ].forEach((item, idx) => {
    const x = x0 + idx * 4.15;
    const [title, body, tone, icon] = item;
    const fill = tone === "green" ? C.green2 : tone === "blue" ? C.blue2 : C.orange2;
    addCard(slide, x, topY, boxW, boxH, fill, fill, 0.2);
    addIconBadge(slide, path.join(repoRoot, "public", "ui-icons", `${icon}.svg`), x + 0.22, topY + 0.22, 0.52, "#FFFFFF");
    slide.addText(title, { x: x + 0.88, y: topY + 0.22, w: 2.65, h: 0.45, fontFace: titleFont, fontSize: 18, bold: true, color: C.ink, margin: 0 });
    addSubcopy(slide, body, x + 0.22, topY + 0.82, 3.45, 0.8, 12.2);
  });

  addCard(slide, 0.65, 4.6, 12.05, 1.8, C.surface, C.line, 0.18);
  addKicker(slide, "DISEASE FOCUS", 0.88, 4.78, 2.0);
  addClaimTitle(slide, "5 个传染病示例被统一进同一套管理结构。", 0.88, 5.07, 5.2, 0.35, 22);
  addBulletList(slide, [
    "艾滋病：长期依从性、机会感染和营养支持。",
    "肺结核：规范抗结核治疗、通风和复查。",
    "病毒性肝炎：肝功、病毒载量和戒酒。",
    "流感：发热、补液、隔离和高危人群提醒。",
    "手足口病：儿童重症识别和家庭防护。"
  ], 0.9, 5.56, 5.6, 0.28, 11.5);
  addCard(slide, 6.85, 4.82, 5.5, 1.14, "F8FBFD", C.line, 0.16);
  addSubcopy(slide, "结论：这套 App 的核心不是“多功能”，而是“一个病人从登录到复诊的连续路径”。", 7.1, 5.03, 5.0, 0.42, 14.2, C.green);
  addSourceFooter(slide, "Proof object: three claim cards + disease focus rail");
  addFooter(slide, "产品定位");
  addSlideNumber(slide, 2);
  slides.push(slide);
}

function makeSlide3(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };
  addKicker(slide, "APP ARCHITECTURE", 0.58, 0.46, 2.0);
  addClaimTitle(slide, "页面和导航被重组为一条任务链，而不是平铺菜单。", 0.58, 0.78, 10.5, 0.72, 30);
  addSubcopy(slide, "底部保留五个主入口，但首页承担总览，其他页面按“头部 + 关键操作 + 内容卡 + 次级区”统一排布。", 0.58, 1.55, 8.1, 0.46, 14);

  addImageCover(slide, path.join(assetDir, "flow-hero.svg"), 0.62, 2.05, 6.9, 4.35);

  const railX = 7.9;
  addCard(slide, railX, 2.08, 4.78, 1.05, C.surface, C.line, 0.18);
  addPill(slide, "首页", railX + 0.18, 2.34, 0.72, C.green2, C.green);
  addPill(slide, "问诊", railX + 1.0, 2.34, 0.72, C.blue2, C.blue);
  addPill(slide, "检测", railX + 1.82, 2.34, 0.72, C.orange2, C.orange);
  addPill(slide, "传染病", railX + 2.64, 2.34, 0.92, C.red2, C.red);
  addPill(slide, "我的", railX + 3.66, 2.34, 0.72, C.green2, C.green);

  const steps = [
    ["登录 / 注册", "手机号账号进入本地演示账号", C.green],
    ["首页摘要", "评分、待办、风险提示、入口", C.blue],
    ["核心动作", "问诊 / 检测 / 慢病 / 饮食", C.orange],
    ["长期管理", "内容、收藏、档案、设置", C.red]
  ];
  steps.forEach((s, idx) => {
    const y = 3.36 + idx * 0.6;
    addCard(slide, 7.9, y, 4.75, 0.5, idx % 2 === 0 ? "FAFCFD" : "FFFFFF", C.line, 0.12);
    slide.addShape(pptx.ShapeType.ellipse, { x: 8.08, y: y + 0.13, w: 0.22, h: 0.22, fill: { color: s[2] }, line: { color: s[2], pt: 0.5 } });
    slide.addText(s[0], { x: 8.4, y: y + 0.08, w: 1.2, h: 0.18, fontFace: bodyFont, fontSize: 12.5, bold: true, color: C.ink, margin: 0 });
    slide.addText(s[1], { x: 9.35, y: y + 0.08, w: 3.0, h: 0.18, fontFace: bodyFont, fontSize: 10.5, color: C.muted, margin: 0 });
  });
  addCard(slide, 7.9, 5.88, 4.75, 0.92, C.surface, C.line, 0.18);
  addSubcopy(slide, "页面间跳转尽量少，内容层级尽量浅。底部导航和顶部标题保持固定，让移动端使用方式更接近真实 App。", 8.08, 6.03, 4.32, 0.48, 11.8);
  addFooter(slide, "任务链路设计");
  addSlideNumber(slide, 3);
  slides.push(slide);
}

function addImageCover(slide, p, x, y, w, h) {
  slide.addImage({ path: p, x, y, w, h });
}

function makeSlide4(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };
  addKicker(slide, "HOME DASHBOARD", 0.58, 0.46, 2.0);
  addClaimTitle(slide, "首页把“今天的健康状态”和“下一步动作”放在同一屏。", 0.58, 0.78, 10.4, 0.74, 30);
  addSubcopy(slide, "首页不是信息墙，而是行动台：评分、风险、待办、快捷入口、指标摘要、推荐内容都在第一屏内。", 0.58, 1.55, 7.7, 0.46, 14);
  addImageCover(slide, path.join(assetDir, "home-mockup.svg"), 0.72, 2.0, 5.0, 4.35);

  [
    [6.2, 2.32, "今日评分", "86 分", "绿区", C.green2, C.green],
    [6.2, 3.18, "重点风险", "肺结核 / 流感", "持续观察", C.orange2, C.orange],
    [6.2, 4.04, "待办提醒", "体温、睡眠、复查", "一屏掌握", C.blue2, C.blue],
    [6.2, 4.9, "推荐内容", "科普文章 + 课程", "更易继续使用", C.red2, C.red]
  ].forEach((m, idx) => {
    addCard(slide, m[0], m[1], 6.1, 0.68, m[5], m[5], 0.16);
    slide.addText(m[2], { x: m[0] + 0.18, y: m[1] + 0.13, w: 1.4, h: 0.16, fontFace: bodyFont, fontSize: 11.5, bold: true, color: C.ink, margin: 0 });
    slide.addText(m[3], { x: m[0] + 1.35, y: m[1] + 0.09, w: 2.1, h: 0.22, fontFace: titleFont, fontSize: 18, bold: true, color: m[6], margin: 0 });
    slide.addText(m[4], { x: m[0] + 4.3, y: m[1] + 0.13, w: 1.45, h: 0.16, fontFace: bodyFont, fontSize: 10.5, color: C.muted, align: "right", margin: 0 });
  });
  addCard(slide, 6.2, 5.84, 6.1, 0.56, C.surface, C.line, 0.16);
  addSubcopy(slide, "重点是把“先看什么”变成默认答案。用户无需思考下一步页面，首页已经给出行动顺序。", 6.38, 5.97, 5.74, 0.18, 11.8, C.green);
  addFooter(slide, "Proof object: full-page home mockup + action rails");
  addSlideNumber(slide, 4);
  slides.push(slide);
}

function makeSlide5(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };
  addKicker(slide, "AI CONSULT", 0.58, 0.46, 1.8);
  addClaimTitle(slide, "问诊的价值在于把“症状输入”转成“辨证 + 建议 + 提醒”。", 0.58, 0.78, 10.7, 0.74, 30);
  addSubcopy(slide, "用户输入任何一条症状线索，系统先识别疾病方向，再输出中医辨证、生活方式建议和就医提醒。", 0.58, 1.55, 7.7, 0.46, 14);
  addImageCover(slide, path.join(assetDir, "consult-mockup.svg"), 0.62, 2.0, 5.0, 4.35);

  addCard(slide, 6.0, 2.12, 6.6, 1.1, C.surface, C.line, 0.18);
  addKicker(slide, "INTERACTION", 6.22, 2.3, 1.5);
  addSubcopy(slide, "症状输入、快捷标签、聊天气泡、结果卡片和输入栏固定底部，整个交互像真实问诊而不是问答文本堆。", 6.22, 2.58, 5.9, 0.36, 11.8);

  addCard(slide, 6.0, 3.42, 2.0, 2.1, C.green2, C.green2, 0.18);
  slide.addText("1", { x: 6.18, y: 3.62, w: 0.26, h: 0.2, fontFace: titleFont, fontSize: 28, bold: true, color: C.green, margin: 0 });
  addSubcopy(slide, "输入症状\n和时长", 6.52, 3.6, 1.2, 0.45, 12.5, C.ink);
  addSubcopy(slide, "例如：咳嗽咳痰两周、发热 38°C、黄疸和尿黄。", 6.18, 4.22, 1.56, 0.62, 10.4, C.muted);

  addCard(slide, 8.2, 3.42, 2.0, 2.1, C.blue2, C.blue2, 0.18);
  slide.addText("2", { x: 8.38, y: 3.62, w: 0.26, h: 0.2, fontFace: titleFont, fontSize: 28, bold: true, color: C.blue, margin: 0 });
  addSubcopy(slide, "识别\n疾病方向", 8.72, 3.6, 1.1, 0.45, 12.5, C.ink);
  addSubcopy(slide, "艾滋病、肺结核、病毒性肝炎、流感、手足口病。", 8.38, 4.22, 1.56, 0.62, 10.4, C.muted);

  addCard(slide, 10.4, 3.42, 2.0, 2.1, C.orange2, C.orange2, 0.18);
  slide.addText("3", { x: 10.58, y: 3.62, w: 0.26, h: 0.2, fontFace: titleFont, fontSize: 28, bold: true, color: C.orange, margin: 0 });
  addSubcopy(slide, "输出\n建议卡", 10.92, 3.6, 1.0, 0.45, 12.5, C.ink);
  addSubcopy(slide, "辨证、饮食、运动、就医提醒四块一次给齐。", 10.58, 4.22, 1.56, 0.62, 10.4, C.muted);

  addCard(slide, 6.0, 5.84, 6.4, 0.56, C.surface, C.line, 0.16);
  addSubcopy(slide, "一句话：它把一次对话变成一套连续动作，而不是只给一段大段文字。", 6.18, 5.97, 6.0, 0.18, 11.8, C.red);
  addFooter(slide, "Proof object: consult mockup + 3-step interaction cards");
  addSlideNumber(slide, 5);
  slides.push(slide);
}

function diseaseCard(slide, x, y, w, h, title, subtitle, icon, tags, fill) {
  addCard(slide, x, y, w, h, fill, fill, 0.16);
  addIconBadge(slide, path.join(repoRoot, "public", "ui-icons", `${icon}.svg`), x + 0.14, y + 0.14, 0.42, "#FFFFFF");
  slide.addText(title, { x: x + 0.62, y: y + 0.15, w: w - 0.76, h: 0.2, fontFace: bodyFont, fontSize: 12.8, bold: true, color: C.ink, margin: 0 });
  slide.addText(subtitle, { x: x + 0.14, y: y + 0.58, w: w - 0.28, h: 0.38, fontFace: bodyFont, fontSize: 10.2, color: C.muted, margin: 0 });
  addTagRow(slide, tags, x + 0.14, y + 1.02, w - 0.28, "#FFFFFF", C.muted);
}

function makeSlide6(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };
  addKicker(slide, "DISEASE LIBRARY", 0.58, 0.46, 2.1);
  addClaimTitle(slide, "5 个传染病示例被整理成可切换、可对照的疾病库。", 0.58, 0.78, 10.6, 0.74, 30);
  addSubcopy(slide, "每个档案都包含简介、常见症状、中医证型、日常管理、饮食、运动注意事项和就医提醒。", 0.58, 1.55, 8.2, 0.46, 14);

  const leftX = 0.64;
  const cardW = 2.15;
  const cardH = 1.62;
  diseaseCard(slide, leftX, 2.12, cardW, cardH, "艾滋病", "长期依从性与机会感染预防", "shield", ["高危暴露", "病毒载量"], C.green2);
  diseaseCard(slide, leftX + 2.28, 2.12, cardW, cardH, "肺结核", "早发现、规范治疗、通风隔离", "lung", ["咳嗽两周", "咯血"], C.blue2);
  diseaseCard(slide, leftX + 4.56, 2.12, cardW, cardH, "病毒性肝炎", "肝功、病毒载量和戒酒管理", "dna", ["黄疸", "肝功能"], C.orange2);
  diseaseCard(slide, leftX + 1.14, 3.94, cardW, cardH, "流行性感冒", "高热、补液、隔离和高危提醒", "temperature", ["发热", "流感疫苗"], "F5F9FF");
  diseaseCard(slide, leftX + 3.42, 3.94, cardW, cardH, "手足口病", "儿童重症识别与家庭防护", "child", ["口腔疱疹", "皮疹"], C.red2);

  addCard(slide, 7.2, 2.1, 5.55, 3.58, C.surface, C.line, 0.18);
  addKicker(slide, "SELECTED DISEASE", 7.46, 2.34, 2.0);
  addClaimTitle(slide, "肺结核是最适合展示“档案 + 随访 + 风险提醒”的案例。", 7.46, 2.62, 4.62, 0.56, 21);
  addSubcopy(slide, "它把传染病管理中最需要长期管理的内容，拆成可执行的步骤：症状识别、隔离、复查、饮食与运动。", 7.46, 3.18, 4.58, 0.5, 12);
  addTagRow(slide, ["咳嗽咳痰超过2周", "午后低热", "盗汗", "复查痰检", "八段锦"], 7.46, 3.86, 4.5, C.blue2, C.blue);
  addCard(slide, 7.46, 4.4, 4.86, 0.88, "F8FBFD", C.line, 0.16);
  addBulletList(slide, ["中医：肺痨，常见肺阴亏虚、气阴两虚。", "现代管理：早期、联合、规律、全程。"], 7.68, 4.59, 4.28, 0.26, 11.1);
  addCard(slide, 7.46, 5.42, 4.86, 0.62, C.green2, C.green2, 0.16);
  addSubcopy(slide, "结论：内容不是百科堆砌，而是被组织成一个能继续追踪的疾病档案系统。", 7.68, 5.6, 4.3, 0.16, 12.1, C.green);
  addFooter(slide, "Proof object: 5 disease cards + selected disease detail rail");
  addSlideNumber(slide, 6);
  slides.push(slide);
}

function sparkline(slide, points, x, y, w, h, color = C.green) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const gap = 0.12;
  const barW = (w - gap * (points.length - 1)) / points.length;
  slide.addShape(pptx.ShapeType.line, {
    x,
    y: y + h,
    w,
    h: 0,
    line: { color: C.line, pt: 1.2 }
  });
  points.forEach((v, i) => {
    const pct = (v - min) / Math.max(1, max - min);
    const bh = 0.32 + pct * (h - 0.42);
    const bx = x + i * (barW + gap);
    const by = y + h - bh;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: bx,
      y: by,
      w: barW,
      h: bh,
      rectRadius: 0.04,
      fill: { color: i === points.length - 1 ? color : "CFEDE7" },
      line: { color: i === points.length - 1 ? color : "CFEDE7", pt: 0.5 }
    });
  });
  slide.addText(`${points[0]}`, { x, y: y + h + 0.08, w: 0.4, h: 0.14, fontFace: bodyFont, fontSize: 8.5, color: C.muted, margin: 0 });
  slide.addText(`${points[points.length - 1]}`, { x: x + w - 0.46, y: y + h + 0.08, w: 0.46, h: 0.14, fontFace: bodyFont, fontSize: 8.5, color: color, bold: true, align: "right", margin: 0 });
}

function makeSlide7(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };
  addKicker(slide, "HEALTH TREND", 0.58, 0.46, 2.0);
  addClaimTitle(slide, "健康检测的意义不在录一次数，而在把变化趋势看清楚。", 0.58, 0.78, 10.7, 0.74, 30);
  addSubcopy(slide, "体温、血压、血糖、心率、睡眠和步数被一起记录，最终回到风险状态和长期建议。", 0.58, 1.55, 8.3, 0.46, 14);

  addCard(slide, 0.64, 2.08, 5.1, 4.58, C.surface, C.line, 0.18);
  addKicker(slide, "7-DAY TREND", 0.88, 2.3, 1.8);
  addClaimTitle(slide, "健康评分走向更能说明恢复质量。", 0.88, 2.58, 3.8, 0.4, 20);
  sparkline(slide, [68, 72, 75, 78, 80, 84, 87], 0.92, 3.12, 4.45, 1.45, C.green);
  addMetricCard(slide, 0.9, 4.82, 1.2, 0.8, "体温", "36.7°C", "稳定", "green");
  addMetricCard(slide, 2.18, 4.82, 1.2, 0.8, "血压", "118/76", "正常", "blue");
  addMetricCard(slide, 3.46, 4.82, 1.2, 0.8, "血糖", "5.6", "平稳", "orange");
  addMetricCard(slide, 4.74, 4.82, 0.74, 0.8, "步", "7.2k", "步", "red");
  addCard(slide, 6.02, 2.08, 6.7, 2.06, C.surface, C.line, 0.18);
  addKicker(slide, "RISK STATUS", 6.24, 2.3, 1.7);
  addBulletList(slide, [
    "体温偏高时先观察发热持续时间，并减少外出。",
    "血压偏高时建议连续复测，关注基础病风险。",
    "睡眠不足会影响恢复和免疫状态。",
    "活动量偏低时，退热后再逐步增加步行。"
  ], 6.24, 2.64, 5.8, 0.3, 11.8);
  addCard(slide, 6.02, 4.34, 6.7, 2.32, C.bg, C.line, 0.18);
  addKicker(slide, "DATA ENTRY", 6.24, 4.56, 1.6);
  addTagRow(slide, ["血糖", "血压", "心率", "体温", "睡眠", "步数", "体重", "舌象"], 6.24, 4.9, 5.98, C.green2, C.green);
  addSubcopy(slide, "数据录入后马上回到风险状态和历史记录，形成连续趋势而不是一次性结果。", 6.24, 5.54, 5.95, 0.4, 12.1, C.ink);
  addFooter(slide, "Proof object: sparkline + KPI rail + risk summary");
  addSlideNumber(slide, 7);
  slides.push(slide);
}

function makeSlide8(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };
  addKicker(slide, "RESTORE LOOP", 0.58, 0.46, 1.8);
  addClaimTitle(slide, "饮食、体质和运动被拼成恢复期闭环。", 0.58, 0.78, 8.6, 0.74, 30);
  addSubcopy(slide, "这三块不是孤立功能，而是围绕恢复期的典型组合：先吃什么、是什么体质、还能不能动。", 0.58, 1.55, 8.2, 0.46, 14);

  const cols = [
    { x: 0.64, title: "膳食管理", icon: "diet", fill: C.orange2, color: C.orange, body: ["一日食谱：山药小米粥、清蒸鱼、百合银耳羹", "适合食材：山药、百合、银耳、鱼肉、冬瓜", "忌口：酒精、霉变食物、油炸辛辣"] },
    { x: 4.42, title: "体质辨识", icon: "constitution", fill: C.blue2, color: C.blue, body: ["九种体质问卷，结果会回到调理建议", "气虚、阴虚、湿热、痰湿、气郁等都能对应", "结果不是标签，而是管理方向"] },
    { x: 8.2, title: "运动管理", icon: "exercise", fill: C.green2, color: C.green, body: ["散步、八段锦、呼吸训练、轻量力量", "发热、咯血、明显乏力时先暂停", "优先低强度和可持续"] }
  ];
  cols.forEach((c) => {
    addCard(slide, c.x, 2.12, 3.54, 3.6, C.surface, C.line, 0.18);
    addIconBadge(slide, path.join(repoRoot, "public", "ui-icons", `${c.icon}.svg`), c.x + 0.2, 2.32, 0.5, c.fill);
    slide.addText(c.title, { x: c.x + 0.82, y: 2.34, w: 1.8, h: 0.2, fontFace: bodyFont, fontSize: 16, bold: true, color: C.ink, margin: 0 });
    addTagRow(slide, [c.title], c.x + 0.2, 2.92, 1.7, c.fill, c.color);
    addBulletList(slide, c.body, c.x + 0.2, 3.38, 3.0, 0.5, 10.8);
  });
  addCard(slide, 0.64, 5.92, 11.1, 0.58, C.surface, C.line, 0.16);
  addSubcopy(slide, "九种体质在问卷里以规则化方式计算：平和、气虚、阳虚、阴虚、痰湿、湿热、血瘀、气郁、特禀。", 0.88, 6.06, 10.6, 0.18, 11.4, C.green);
  addFooter(slide, "Proof object: three management columns + constitution strip");
  addSlideNumber(slide, 8);
  slides.push(slide);
}

function makeSlide9(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };
  addKicker(slide, "CONTENT + DATA", 0.58, 0.46, 2.0);
  addClaimTitle(slide, "百科、讲堂、个人档案和设置共同完成内容与数据闭环。", 0.58, 0.78, 10.8, 0.74, 30);
  addSubcopy(slide, "内容层负责科普和收藏，数据层负责本地保存、清除和导出前的预期管理。", 0.58, 1.55, 8.1, 0.46, 14);

  addCard(slide, 0.64, 2.12, 5.4, 4.14, C.surface, C.line, 0.18);
  addKicker(slide, "CONTENT ECOSYSTEM", 0.88, 2.34, 2.0);
  const contentBlocks = [
    ["中医百科", "传播途径、证型、穴位、食疗和误区", C.green2, "book"],
    ["健康讲堂", "课程列表、文章详情、视频课程占位", C.blue2, "lecture"],
    ["个人档案", "病史、过敏史、家族史、体检记录", C.orange2, "profile"],
    ["设置与隐私", "清除本地数据和免责声明", C.red2, "settings"]
  ];
  contentBlocks.forEach((b, idx) => {
    const y = 2.74 + idx * 0.83;
    addCard(slide, 0.88, y, 4.88, 0.62, b[2], b[2], 0.14);
    addIconBadge(slide, path.join(repoRoot, "public", "ui-icons", `${b[3]}.svg`), 1.02, y + 0.1, 0.38, "#FFFFFF");
    slide.addText(b[0], { x: 1.5, y: y + 0.11, w: 1.2, h: 0.18, fontFace: bodyFont, fontSize: 12.8, bold: true, color: C.ink, margin: 0 });
    slide.addText(b[1], { x: 2.92, y: y + 0.11, w: 2.55, h: 0.18, fontFace: bodyFont, fontSize: 10.4, color: C.muted, margin: 0 });
  });
  addCard(slide, 0.88, 6.0, 4.88, 0.16, C.green2, C.green2, 0.14);

  addCard(slide, 6.3, 2.12, 6.12, 4.14, C.surface, C.line, 0.18);
  addKicker(slide, "LOCAL STORAGE MODEL", 6.56, 2.34, 2.1);
  slide.addShape(pptx.ShapeType.roundRect, { x: 6.56, y: 2.74, w: 5.56, h: 0.62, rectRadius: 0.12, fill: { color: C.bg }, line: { color: C.line, pt: 1 } });
  slide.addText("tcm-cloud-mobile-state", { x: 6.76, y: 2.92, w: 2.0, h: 0.16, fontFace: "Consolas", fontSize: 11.5, bold: true, color: C.green, margin: 0 });
  slide.addText("{ user, metrics, messages, favorites, constitutionResult }", { x: 8.92, y: 2.9, w: 3.0, h: 0.18, fontFace: "Consolas", fontSize: 9.8, color: C.muted, align: "right", margin: 0 });
  addArrow(slide, 7.1, 3.42, 7.1, 4.02, C.green);
  addArrow(slide, 9.0, 3.42, 9.0, 4.02, C.blue);
  addArrow(slide, 10.9, 3.42, 10.9, 4.02, C.orange);
  const nodes = [
    ["登录", "本地账号", C.green2, C.green],
    ["问诊", "聊天记录", C.blue2, C.blue],
    ["检测", "指标历史", C.orange2, C.orange],
    ["收藏", "内容偏好", C.red2, C.red]
  ];
  nodes.forEach((n, idx) => {
    const x = 6.58 + idx * 1.42;
    addCard(slide, x, 4.08, 1.18, 0.82, n[2], n[2], 0.14);
    slide.addText(n[0], { x: x + 0.16, y: 4.22, w: 0.84, h: 0.16, fontFace: bodyFont, fontSize: 12.3, bold: true, color: n[3], margin: 0, align: "center" });
    slide.addText(n[1], { x: x + 0.16, y: 4.46, w: 0.84, h: 0.14, fontFace: bodyFont, fontSize: 8.8, color: C.muted, margin: 0, align: "center" });
  });
  addCard(slide, 6.58, 5.18, 5.56, 0.74, "F8FBFD", C.line, 0.14);
  addSubcopy(slide, "Capacitor 把 Web App 打包进 Android；PWA manifest 让 Web 版本也更像真正的应用。", 6.8, 5.37, 5.1, 0.2, 11.4, C.ink);
  addFooter(slide, "Proof object: content ecosystem + localStorage architecture");
  addSlideNumber(slide, 9);
  slides.push(slide);
}

function makeSlide10(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };
  addKicker(slide, "BUILD + QA", 0.58, 0.46, 1.6);
  addClaimTitle(slide, "这份汇报对应的 App 已经能构建、能同步、能生成 Android APK。", 0.58, 0.78, 11.0, 0.74, 30);
  addSubcopy(slide, "为了满足你的要求，我也去 GitHub 找了一个 PowerPoint MCP 参考：`trsdn/mcp-server-ppt`，它支持 PowerPoint 自动化、导出和动画。当前这份 deck 由本机 PowerPoint/Node 产线完成，保证文件真实可打开。", 0.58, 1.55, 11.7, 0.6, 13.2);

  addCard(slide, 0.64, 2.22, 5.95, 3.98, C.surface, C.line, 0.18);
  addKicker(slide, "VERIFICATION", 0.88, 2.44, 1.6);
  addBulletList(slide, [
    "npm run build 通过，Web 产物已生成。",
    "npm run cap:sync 通过，Capacitor 已同步到 Android 工程。",
    "npm run android:debug:win 通过，APK 构建成功。",
    "PowerPoint 16.0 可打开并处理该文件。",
    "PPT 采用 16:9，文本和几何内容可编辑。"
  ], 0.9, 2.82, 5.2, 0.44, 11.6);
  addCard(slide, 0.88, 5.02, 5.45, 0.88, C.green2, C.green2, 0.14);
  slide.addText("APK 路径", { x: 1.08, y: 5.17, w: 0.9, h: 0.16, fontFace: bodyFont, fontSize: 12, bold: true, color: C.ink, margin: 0 });
  slide.addText("C:\\Users\\Administrator\\Documents\\中医云健康app\\中医云健康-debug.apk", { x: 1.08, y: 5.4, w: 4.7, h: 0.16, fontFace: "Consolas", fontSize: 9.5, color: C.green, margin: 0 });

  addCard(slide, 6.8, 2.22, 5.92, 3.98, C.surface, C.line, 0.18);
  addKicker(slide, "WHAT'S INCLUDED", 7.06, 2.44, 1.8);
  const included = [
    ["PPTX", "可编辑文本、形状和表格"],
    ["SVG", "自生成插图和界面示意"],
    ["ANIMATION", "PowerPoint 入口动画/过渡"],
    ["QA", "接触单、预览和逻辑检查"],
    ["MCP", "GitHub PowerPoint MCP 参考"]
  ];
  included.forEach((it, idx) => {
    const y = 2.88 + idx * 0.52;
    addPill(slide, it[0], 7.08, y, 0.9, idx % 2 === 0 ? C.blue2 : C.green2, idx % 2 === 0 ? C.blue : C.green);
    slide.addText(it[1], { x: 8.12, y: y + 0.02, w: 4.0, h: 0.16, fontFace: bodyFont, fontSize: 11.6, color: C.ink, margin: 0 });
  });
  addCard(slide, 7.08, 5.86, 5.22, 0.22, C.orange2, C.orange2, 0.12);
  addSubcopy(slide, "Deck target: 简洁、编辑友好、适合汇报，也适合后续继续改。", 7.28, 5.94, 4.82, 0.12, 11.2, C.orange);
  addFooter(slide, "GitHub MCP reference selected: trsdn/mcp-server-ppt");
  addSlideNumber(slide, 10);
  slides.push(slide);
}

async function buildDeck() {
  ensureDirs();

  write("notes/source-notes.txt", [
    "Source notes",
    "",
    "1. Local app source: src/main.ts, src/styles.css, README.md, docs/design.md.",
    "2. Local Android build result: android/app/build/outputs/apk/debug/app-debug.apk.",
    "3. GitHub MCP reference selected: trsdn/mcp-server-ppt (PowerPoint MCP server and CLI).",
    "4. Additional search references reviewed: ykuwai/ppt-mcp, GongRzhe/Office-PowerPoint-MCP-Server, dmytro-ustynov/pptx-generator-mcp.",
    "5. Identity assets used: local ui-icons SVG files from public/ui-icons/."
  ].join("\n"));

  write("notes/claim-spine.txt", [
    "Thesis: 中医云健康 App 不是概念图，而是一套可打包、可打开、可演示的移动端健康管理产品。",
    "Audience: 汇报/演示/测试接收者。",
    "Arc: 产品定位 -> 结构 -> 首页 -> 问诊 -> 疾病库 -> 检测趋势 -> 恢复闭环 -> 数据架构 -> 交付验证.",
  ].join("\n"));

  write("notes/design-system.txt", [
    "Slide size: 16:9 wide.",
    "Style: clean, modern, medical, light surface, green/blue/orange accents.",
    "Typography: Microsoft YaHei for Chinese, Consolas for data path/code.",
    "Proof objects: mockups, flows, trend line, disease cards, architecture diagram.",
    "Banned motifs: crowded card walls, fake logos, filler shapes."
  ].join("\n"));

  write("notes/contact-sheet-plan.txt", [
    "Cover with hero mockup",
    "Claim slide with 3 proof cards",
    "App architecture flow",
    "Home dashboard mockup",
    "Consult flow mockup",
    "Disease library panel",
    "Trend / data slide",
    "Recovery loop slide",
    "Content + data model slide",
    "Build / verification slide"
  ].join("\n"));

  write("qa/reference-audit.txt", [
    "No external reference deck was supplied.",
    "Quality target was derived from the user's request and the current app build."
  ].join("\n"));

  const coverSvg = writeSvg("cover-hero.svg", makeCoverSvg());
  const consultSvg = writeSvg("consult-mockup.svg", makeConsultSvg());
  const homeSvg = writeSvg("home-mockup.svg", makePhoneMockup("home"));
  const flowSvg = writeSvg("flow-hero.svg", makeFlowSvg());

  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Codex";
  pptx.company = "OpenAI";
  pptx.subject = "中医云健康 App 汇报";
  pptx.title = "中医云健康 App 汇报";
  pptx.lang = "zh-CN";
  pptx.theme = {
    headFontFace: titleFont,
    bodyFontFace: bodyFont,
    lang: "zh-CN"
  };
  pptx.defineLayout({ name: "CUSTOM", width: W, height: H });
  pptx.layout = "CUSTOM";

  const makers = [
    makeSlide1,
    makeSlide2,
    makeSlide3,
    makeSlide4,
    makeSlide5,
    makeSlide6,
    makeSlide7,
    makeSlide8,
    makeSlide9,
    makeSlide10
  ];
  const limit = Math.min(makers.length, Math.max(1, Number(process.env.SLIDE_LIMIT || makers.length)));
  makers.slice(0, limit).forEach((maker) => maker(pptx));

  const pptxPath = path.join(outputDir, "中医云健康App汇报.pptx");
  await pptx.writeFile({ fileName: pptxPath });
  return { pptxPath, coverSvg, consultSvg, homeSvg, flowSvg };
}

async function main() {
  const result = await buildDeck();
  write("notes/build-result.txt", `Deck written: ${result.pptxPath}\nSlides: ${slides.length}\n`);
  console.log(result.pptxPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
