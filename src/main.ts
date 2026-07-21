import "./styles.css";

type Page =
  | "home"
  | "consult"
  | "health"
  | "chronic"
  | "diet"
  | "constitution"
  | "exercise"
  | "encyclopedia"
  | "lecture"
  | "profile"
  | "settings"
  | "disease";

type User = {
  phone: string;
  name: string;
  password: string;
};

type Metric = {
  glucose: string;
  systolic: string;
  diastolic: string;
  heartRate: string;
  temperature: string;
  sleep: string;
  steps: string;
  weight: string;
  tongue: string;
  date: string;
};

type Disease = {
  id: string;
  name: string;
  fullName: string;
  icon: string;
  summary: string;
  transmission: string[];
  symptoms: string[];
  tcmPatterns: string[];
  management: string[];
  diet: string[];
  exercise: string[];
  warning: string;
  note: string;
};

type ContentItem = {
  id: string;
  title: string;
  category: "百科" | "讲堂";
  minutes: string;
  icon: string;
  summary: string;
  detail: string;
  points: string[];
};

type ConsultInsight = {
  diseaseId: string;
  diseaseName: string;
  urgency: "稳定" | "关注" | "提醒";
  summary: string;
  tcm: string;
  actions: string[];
  warning: string;
};

type ConstitutionResult = {
  type: string;
  score: number;
  summary: string;
  advice: string[];
  focus: string[];
};

type ModalState = {
  title: string;
  body: string;
  points?: string[];
};

const storageKey = "tcm-cloud-mobile-state";
const appRoot = document.querySelector<HTMLDivElement>("#app");

if (!appRoot) {
  throw new Error("App root not found");
}

const app: HTMLDivElement = appRoot;

const pageMeta: Record<Page, { title: string; subtitle: string }> = {
  home: {
    title: "中医云健康",
    subtitle: "传染病健康管理中心"
  },
  consult: {
    title: "AI 问诊",
    subtitle: "输入症状、时长和指标，生成模拟建议"
  },
  health: {
    title: "健康检测",
    subtitle: "体温、血压、血糖、心率和睡眠记录"
  },
  chronic: {
    title: "传染病管理",
    subtitle: "艾滋病、肺结核、病毒性肝炎、流感、手足口病"
  },
  diet: {
    title: "膳食管理",
    subtitle: "恢复期饮食、食疗建议和忌口提醒"
  },
  constitution: {
    title: "体质辨识",
    subtitle: "九种体质问卷与调理建议"
  },
  exercise: {
    title: "运动管理",
    subtitle: "恢复期运动、步数目标和注意事项"
  },
  encyclopedia: {
    title: "中医百科",
    subtitle: "科普、证型、穴位、食疗和误区"
  },
  lecture: {
    title: "健康讲堂",
    subtitle: "课程列表、视频占位和收藏"
  },
  profile: {
    title: "个人档案",
    subtitle: "信息、病史、过敏史和体检记录"
  },
  settings: {
    title: "设置与隐私",
    subtitle: "数据清除、免责声明和本地存储说明"
  },
  disease: {
    title: "疾病详情",
    subtitle: "简介、症状、证型、调理与就医提醒"
  }
};

const constitutionQuestions = [
  {
    type: "平和质",
    prompt: "平时精神、睡眠和饮食是否比较稳定？",
    guidance: "保持规律作息、均衡饮食和持续复诊随访。"
  },
  {
    type: "气虚质",
    prompt: "是否容易乏力、气短、说话声音低？",
    guidance: "重在补气健脾，避免过度劳累和久熬夜。"
  },
  {
    type: "阳虚质",
    prompt: "是否怕冷、四肢发凉、喜欢温热环境？",
    guidance: "注意保暖，饮食宜温和，避免寒凉生冷。"
  },
  {
    type: "阴虚质",
    prompt: "是否口干咽燥、手足心热、容易夜间不适？",
    guidance: "重在养阴润燥，少辛辣烧烤，保证睡眠。"
  },
  {
    type: "痰湿质",
    prompt: "是否身体困重、食欲偏差、容易腹胀？",
    guidance: "饮食清淡少油腻，配合规律运动和控糖。"
  },
  {
    type: "湿热质",
    prompt: "是否口苦口黏、容易上火、面部油腻？",
    guidance: "重在清热化湿，减少酒精、油炸和夜宵。"
  },
  {
    type: "血瘀质",
    prompt: "是否容易刺痛、肤色偏暗、活动后不适明显？",
    guidance: "规律活动、避免久坐，必要时配合活血调理。"
  },
  {
    type: "气郁质",
    prompt: "是否常觉得情绪郁闷、胸胁不舒、叹气多？",
    guidance: "重在疏肝解郁，保持沟通和稳定作息。"
  },
  {
    type: "特禀质",
    prompt: "是否容易过敏、鼻痒、皮肤敏感或哮喘样不适？",
    guidance: "注意环境清洁，回避明确过敏原。"
  }
] as const;

const constitutionAdvice: Record<string, { advice: string[]; focus: string[] }> = {
  "平和质": {
    advice: ["继续维持规律作息和均衡饮食。", "坚持随访，按计划记录指标。"],
    focus: ["规律", "均衡", "复诊"]
  },
  "气虚质": {
    advice: ["适当补气、避免过劳，优先轻量运动。", "保证睡眠，饮食以易消化为主。"],
    focus: ["补气", "休息", "易消化"]
  },
  "阳虚质": {
    advice: ["注意保暖，减少寒凉食物和冷饮。", "运动以温和微汗为度。"],
    focus: ["保暖", "温养", "温和运动"]
  },
  "阴虚质": {
    advice: ["适合养阴润燥，少辛辣油炸。", "保持情绪稳定，避免熬夜。"],
    focus: ["养阴", "润燥", "睡眠"]
  },
  "痰湿质": {
    advice: ["饮食控油控糖，减少夜宵。", "增加步行和核心活动时间。"],
    focus: ["控油", "控糖", "减重"]
  },
  "湿热质": {
    advice: ["避免饮酒和重口味，规律排汗。", "注意皮肤与口腔清洁。"],
    focus: ["清热", "化湿", "清洁"]
  },
  "血瘀质": {
    advice: ["保持活动量，减少久坐久卧。", "关注疼痛、颜色和循环变化。"],
    focus: ["活血", "循环", "活动"]
  },
  "气郁质": {
    advice: ["安排固定放松时间，减少情绪积压。", "适合舒缓运动和稳定社交。"],
    focus: ["疏肝", "放松", "沟通"]
  },
  "特禀质": {
    advice: ["尽量回避已知过敏原和刺激物。", "外出时注意口罩和环境清洁。"],
    focus: ["回避过敏原", "环境清洁", "防护"]
  }
};

const diseases: Disease[] = [
  {
    id: "aids",
    name: "艾滋病",
    fullName: "HIV 感染与获得性免疫缺陷综合征",
    icon: "shield",
    summary: "长期管理重点是规范抗病毒治疗、机会感染预防、营养支持和心理支持。",
    transmission: ["性接触传播", "血液传播", "母婴传播", "共用针具等高危暴露"],
    symptoms: ["持续低热或盗汗", "体重下降", "乏力", "淋巴结肿大", "反复感染"],
    tcmPatterns: ["疫毒伤正", "气阴两虚", "脾肾亏虚"],
    management: [
      "抗逆转录病毒治疗是核心，不要自行停药或换药。",
      "定期检测病毒载量、CD4 和机会感染风险。",
      "重视依从性管理、营养支持和情绪支持。"
    ],
    diet: [
      "优先高蛋白、易消化、洁净饮食。",
      "避免生冷不洁和过度刺激性食物。",
      "恢复期少量多餐，保证补水。"
    ],
    exercise: [
      "以散步、拉伸和呼吸训练为主。",
      "感染活动期或体力明显下降时减少运动。"
    ],
    warning: "持续高热、呼吸困难、严重腹泻或快速消瘦时，应及时到感染科就诊。",
    note: "中医多从扶正固本、益气养阴、健脾和胃等方向辅助调养，但不能替代抗病毒治疗。"
  },
  {
    id: "tuberculosis",
    name: "肺结核",
    fullName: "结核分枝杆菌感染",
    icon: "lung",
    summary: "重点是早发现、规范抗结核治疗、咳嗽礼仪、通风隔离和复查随访。",
    transmission: ["空气飞沫核传播", "与活动性患者密切接触", "通风差的拥挤环境", "免疫力低下时更易发病"],
    symptoms: ["咳嗽咳痰超过 2 周", "午后低热", "盗汗", "乏力消瘦", "咯血或胸痛"],
    tcmPatterns: ["肺阴亏虚", "阴虚火旺", "气阴两虚"],
    management: [
      "遵循早期、联合、规律、全程原则，不要擅自停药。",
      "定期痰检、影像复查和肝功能监测。",
      "注意居室通风与咳嗽礼仪。"
    ],
    diet: [
      "可选百合、银耳、山药、梨等润肺养阴食材。",
      "避免烟酒、辛辣和油炸。",
      "恢复期维持清淡高蛋白饮食。"
    ],
    exercise: [
      "恢复期选择散步、呼吸训练、八段锦。",
      "咯血、发热或胸闷加重时停止运动。"
    ],
    warning: "咯血增多、胸闷气促、持续高热或药物后黄疸皮疹，应立即就医。",
    note: "中医常见肺痨思路，但核心仍是规范抗结核治疗与复查。"
  },
  {
    id: "hepatitis",
    name: "病毒性肝炎",
    fullName: "甲型、乙型、丙型、戊型等病毒性肝炎",
    icon: "dna",
    summary: "关注肝功能、病毒载量、肝纤维化风险、戒酒和家庭传播预防。",
    transmission: ["甲肝/戊肝以粪口传播为主", "乙肝/丙肝以血液、母婴、性接触传播为主", "不安全注射或器械消毒不严", "日常接触一般不传播乙肝丙肝"],
    symptoms: ["乏力", "食欲下降", "恶心", "右上腹不适", "黄疸或尿黄"],
    tcmPatterns: ["肝胆湿热", "肝郁脾虚", "瘀血阻络"],
    management: [
      "甲肝戊肝以支持治疗为主，乙肝和丙肝要评估抗病毒指征。",
      "监测肝功能、病毒学指标和纤维化风险。",
      "避免损肝药物和饮酒。"
    ],
    diet: [
      "饮食清淡规律，避免霉变食物和高油夜宵。",
      "严格戒酒，少吃过甜和过咸食物。",
      "充足饮水，减少暴饮暴食。"
    ],
    exercise: [
      "症状平稳时可散步和轻度拉伸。",
      "疲乏明显或黄疸加重时先休息。"
    ],
    warning: "黄疸加深、腹水、黑便、意识异常或肝区持续疼痛需及时就医。",
    note: "中医多从清利湿热、疏肝健脾、养阴柔肝等方向配合调养。"
  },
  {
    id: "influenza",
    name: "流行性感冒",
    fullName: "流感病毒感染",
    icon: "temperature",
    summary: "起病急、传染性强，老年人、孕妇、儿童和慢病人群要重点关注。",
    transmission: ["飞沫传播", "接触污染物后触摸口鼻眼", "密闭空间聚集传播", "家庭成员间传播"],
    symptoms: ["高热", "全身酸痛", "头痛", "咽痛咳嗽", "乏力明显"],
    tcmPatterns: ["风热犯表", "风寒束表", "表寒里热"],
    management: [
      "高风险人群尽早就医评估抗病毒治疗。",
      "补液和休息优先，记录体温变化。",
      "发热期避免上班上学和密集接触。"
    ],
    diet: [
      "发热期宜温热清淡、少量多次饮水。",
      "避免油腻、辛辣和过甜饮食。",
      "恢复期可补充蛋白质和维生素。"
    ],
    exercise: [
      "退热后逐步恢复活动，先从散步开始。",
      "不宜马上进行剧烈训练。"
    ],
    warning: "呼吸困难、胸痛、意识改变、持续高热超过 3 天或基础病加重，需及时就医。",
    note: "中医常从时行感冒、风热或风寒辨证切入，核心仍是休息、补液和隔离。"
  },
  {
    id: "hfmd",
    name: "手足口病",
    fullName: "肠道病毒感染",
    icon: "child",
    summary: "儿童常见传染病，重点关注发热、口腔疱疹、皮疹和重症预警。",
    transmission: ["密切接触传播", "粪口传播", "呼吸道飞沫传播", "玩具餐具等污染物传播"],
    symptoms: ["发热", "口腔疱疹或疼痛", "手足臀皮疹", "食欲下降", "少数可出现嗜睡惊跳"],
    tcmPatterns: ["湿热疫毒", "肺脾湿热", "热毒炽盛"],
    management: [
      "多数为对症支持治疗，注意补液和口腔护理。",
      "隔离至症状消退后再恢复集体活动。",
      "留意精神状态和重症信号。"
    ],
    diet: [
      "口腔疼痛时选择温凉软食，避免酸辣刺激。",
      "少量多次饮水，减少脱水风险。",
      "恢复期逐步增加蛋白和蔬果。"
    ],
    exercise: [
      "急性期以休息为主，恢复后再轻度活动。",
      "避免儿童过度奔跑和出汗过多。"
    ],
    warning: "精神差、嗜睡、惊跳、呼吸急促、持续高热或肢体抖动时需立即就医。",
    note: "中医多从湿热疫毒辨证，重点在清热解毒和护理隔离。"
  }
];

const contentItems: ContentItem[] = [
  {
    id: "kb-route",
    title: "传染病传播途径总览",
    category: "百科",
    minutes: "6 分钟",
    icon: "shield",
    summary: "把性接触、血液、母婴、飞沫和粪口传播一次讲清。",
    detail: "围绕本项目的传染病方向，先分清传播途径，再决定隔离、消毒和随访强度。不同疾病的传播逻辑不同，HIV、乙肝、丙肝更关注血液和高危暴露，肺结核更关注空气飞沫核，流感则重视飞沫与密闭空间。",
    points: ["高危暴露要尽快评估", "飞沫传播要重视通风与口罩", "家庭清洁与个人用品分开使用"]
  },
  {
    id: "kb-tcm",
    title: "中医常见辨证思路",
    category: "百科",
    minutes: "8 分钟",
    icon: "tcm",
    summary: "从疫毒、湿热、气阴两虚、脾肾亏虚等角度理解调养方向。",
    detail: "传染病的中医调养不替代现代医学治疗，但可以帮助理解恢复期的体力、睡眠、胃口和情绪变化。临床常从正虚、邪恋、湿热、阴虚等方向辨证，并结合饮食和作息管理。",
    points: ["恢复期更重视扶正", "发热期重在清利", "长期管理强调睡眠和营养"]
  },
  {
    id: "kb-isolation",
    title: "居家隔离与消毒清单",
    category: "百科",
    minutes: "5 分钟",
    icon: "record",
    summary: "发热、咳嗽或高危暴露后，先做哪些动作。",
    detail: "先通风、再分区、后清洁。居家隔离期间建议单独使用毛巾、餐具和牙具，频繁接触的门把手、桌面和手机要定时清洁，体温和症状变化要连续记录。",
    points: ["通风优先", "个人物品分开", "症状连续记录"]
  },
  {
    id: "kb-diet",
    title: "恢复期食疗建议",
    category: "百科",
    minutes: "7 分钟",
    icon: "diet",
    summary: "清淡高蛋白、补水、易消化，是大多数恢复期的共同原则。",
    detail: "恢复期不要盲目进补，也不要为了“清热”而长期过度节食。对多数传染病人群来说，保持足量蛋白、均衡蔬果、稳定饮水和规律进餐更重要。",
    points: ["少量多餐", "足量饮水", "避免生冷与霉变"]
  },
  {
    id: "kb-myth",
    title: "传染病常见误区",
    category: "百科",
    minutes: "4 分钟",
    icon: "alert",
    summary: "把“不会传”和“不能治”分开理解，避免过度焦虑。",
    detail: "许多传染病并不是日常接触就会传播，也并不是一旦感染就无法管理。科学的检测、随访、药物依从性和家庭防护，往往比单纯的忌口更重要。",
    points: ["不要把所有接触都视为高危", "不要擅自停药", "不要忽视复查"]
  },
  {
    id: "lc-fever",
    title: "发热、咳嗽与居家观察",
    category: "讲堂",
    minutes: "12 分钟",
    icon: "temperature",
    summary: "如何区分普通感冒、流感和需要进一步评估的情况。",
    detail: "这一节围绕发热曲线、咳嗽类型、精神状态和呼吸情况做判断，同时讲如何记录体温、补液和观察恶化信号。",
    points: ["先看体温和精神状态", "记录咳嗽和呼吸变化", "红旗症状要及时就医"]
  },
  {
    id: "lc-tb",
    title: "肺结核规范治疗的四个原则",
    category: "讲堂",
    minutes: "10 分钟",
    icon: "lung",
    summary: "早期、联合、规律、全程，为什么每一个都不能少。",
    detail: "从抗结核治疗的原则出发，解释疗程、复查、药物不良反应和家庭防护的重要性，适合患者和家属一起看。",
    points: ["不要漏服和停药", "复查不能省", "家庭通风要长期坚持"]
  },
  {
    id: "lc-exercise",
    title: "恢复期运动如何安排",
    category: "讲堂",
    minutes: "9 分钟",
    icon: "exercise",
    summary: "从散步、八段锦到呼吸训练，如何循序渐进。",
    detail: "恢复期的运动核心不是拼强度，而是可持续。先观察体温、心率和疲劳，再决定当天是否适合运动以及运动多久。",
    points: ["先低强度后中强度", "发热期暂停", "出现胸闷先停下"]
  }
];

const navItems: Array<{ page: Page; label: string; icon: string }> = [
  { page: "home", label: "首页", icon: "home" },
  { page: "consult", label: "问诊", icon: "consult" },
  { page: "health", label: "检测", icon: "health" },
  { page: "chronic", label: "传染病", icon: "disease" },
  { page: "profile", label: "我的", icon: "profile" }
];

const defaultMetrics: Metric[] = [
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
    date: new Date().toLocaleDateString("zh-CN")
  }
];

const state = {
  page: "home" as Page,
  previousPage: "home" as Page,
  user: null as User | null,
  authMode: "login" as "login" | "register",
  metrics: [...defaultMetrics],
  messages: [
    {
      role: "ai" as const,
      text: "您好，我是中医云健康 AI 问诊助手。请描述症状、持续时间、接触史和最近指标，我会结合传染病方向给出模拟建议。"
    }
  ] as Array<{ role: "ai" | "me"; text: string }>,
  favorites: [] as string[],
  selectedDisease: diseases[1],
  consultInsight: {
    diseaseId: diseases[1].id,
    diseaseName: diseases[1].name,
    urgency: "稳定" as const,
    summary: "输入症状后，我会结合传染病方向、辨证思路和生活方式给出建议。",
    tcm: diseases[1].note,
    actions: ["描述症状与持续时间", "补充最近体温和接触史", "如果有红旗症状请尽快就医"],
    warning: diseases[1].warning
  } as ConsultInsight,
  constitutionResult: null as ConstitutionResult | null,
  modal: null as ModalState | null
};

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function preserveLineBreaks(text: string) {
  return escapeHtml(text).replace(/\n/g, "<br />");
}

function iconImg(name: string, className = "ui-icon", alt = "") {
  return `<img class="${className}" src="/ui-icons/${name}.svg" alt="${escapeHtml(alt)}" loading="lazy" />`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function latestMetric() {
  return state.metrics[0] ?? defaultMetrics[0];
}

function scoreFor(metric: Metric) {
  let score = 92;
  const temperature = Number(metric.temperature);
  const systolic = Number(metric.systolic);
  const diastolic = Number(metric.diastolic);
  const heartRate = Number(metric.heartRate);
  const sleep = Number(metric.sleep);
  const steps = Number(metric.steps);
  const glucose = Number(metric.glucose);

  if (temperature >= 37.3) score -= 16;
  if (systolic >= 140 || diastolic >= 90) score -= 12;
  if (heartRate > 100) score -= 8;
  if (sleep < 6) score -= 8;
  if (steps < 4000) score -= 6;
  if (glucose >= 7.8) score -= 6;

  return clamp(score, 50, 98);
}

function scoreLabel(score: number) {
  if (score >= 85) return "稳定";
  if (score >= 70) return "关注";
  return "提醒";
}

function scoreTone(score: number) {
  if (score >= 85) return "good";
  if (score >= 70) return "warn";
  return "danger";
}

function metricRiskItems(metric: Metric) {
  const items: string[] = [];
  if (Number(metric.temperature) >= 37.3) items.push("体温偏高，先观察发热持续时间并减少外出。");
  if (Number(metric.systolic) >= 140 || Number(metric.diastolic) >= 90) items.push("血压偏高，建议连续复测并关注基础病风险。");
  if (Number(metric.heartRate) > 100) items.push("心率偏快，结合发热、焦虑或乏力一起判断。");
  if (Number(metric.sleep) < 6) items.push("睡眠不足，会影响恢复和免疫状态。");
  if (Number(metric.steps) < 4000) items.push("活动量偏低，可在退热后逐步增加步行。");
  if (Number(metric.glucose) >= 7.8) items.push("血糖偏高，饮食和复测都要同步管理。");
  return items.length ? items : ["当前指标整体平稳，继续记录并保持规律作息。"];
}

function metricCards(metric: Metric) {
  const temp = Number(metric.temperature);
  const sys = Number(metric.systolic);
  const dia = Number(metric.diastolic);
  const glucose = Number(metric.glucose);
  const sleep = Number(metric.sleep);
  const heartRate = Number(metric.heartRate);
  const steps = Number(metric.steps);

  return [
    {
      title: "体温",
      value: `${metric.temperature}°C`,
      note: temp >= 37.3 ? "偏高" : "稳定",
      percent: clamp((temp / 39) * 100, 20, 100),
      tone: temp >= 37.3 ? "warn" : "good"
    },
    {
      title: "血压",
      value: `${metric.systolic}/${metric.diastolic}`,
      note: sys >= 140 || dia >= 90 ? "偏高" : "正常",
      percent: clamp(((sys + dia) / 240) * 100, 20, 100),
      tone: sys >= 140 || dia >= 90 ? "warn" : "good"
    },
    {
      title: "血糖",
      value: `${metric.glucose} mmol/L`,
      note: glucose >= 7.8 ? "偏高" : "平稳",
      percent: clamp((glucose / 11) * 100, 15, 100),
      tone: glucose >= 7.8 ? "warn" : "good"
    },
    {
      title: "睡眠",
      value: `${metric.sleep} 小时`,
      note: sleep < 6 ? "不足" : "达标",
      percent: clamp((sleep / 9) * 100, 15, 100),
      tone: sleep < 6 ? "warn" : "good"
    },
    {
      title: "心率",
      value: `${metric.heartRate} 次/分`,
      note: heartRate > 100 ? "偏快" : "稳定",
      percent: clamp((heartRate / 120) * 100, 20, 100),
      tone: heartRate > 100 ? "warn" : "good"
    },
    {
      title: "步数",
      value: metric.steps,
      note: steps < 4000 ? "偏少" : "正常",
      percent: clamp((steps / 10000) * 100, 15, 100),
      tone: steps < 4000 ? "warn" : "good"
    }
  ];
}

function diseaseById(id: string | undefined) {
  return diseases.find((d) => d.id === id) ?? diseases[0];
}

function contentById(id: string | undefined) {
  return contentItems.find((item) => item.id === id);
}

function diseaseMatches(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes("hiv") || text.includes("艾滋") || text.includes("高危")) return diseaseById("aids");
  if (text.includes("结核") || text.includes("咳嗽") || text.includes("盗汗") || text.includes("咯血")) return diseaseById("tuberculosis");
  if (text.includes("肝炎") || text.includes("黄疸") || text.includes("尿黄") || text.includes("右上腹")) return diseaseById("hepatitis");
  if (text.includes("流感") || text.includes("发热") || text.includes("头痛") || text.includes("肌肉酸") || text.includes("咽痛")) return diseaseById("influenza");
  if (text.includes("手足口") || text.includes("疱疹") || text.includes("皮疹") || text.includes("孩子")) return diseaseById("hfmd");
  return diseaseById("hepatitis");
}

function buildConsultInsight(message: string, disease: Disease): ConsultInsight {
  const urgency =
    message.includes("呼吸困难") || message.includes("意识") || message.includes("咯血") || message.includes("惊跳")
      ? "提醒"
      : message.includes("发热") || message.includes("咳嗽") || message.includes("高危") || message.includes("黄疸")
        ? "关注"
        : "稳定";

  const summary = `${message ? "你的描述更接近" : "当前优先关注"}${disease.name}方向，需要先看传播途径、症状持续时间和风险接触史。`;

  return {
    diseaseId: disease.id,
    diseaseName: disease.name,
    urgency,
    summary,
    tcm: disease.note,
    actions: [
      disease.management[0],
      disease.management[1],
      disease.diet[0]
    ],
    warning: disease.warning
  };
}

function buildConsultReply(message: string, disease: Disease) {
  return [
    `我先按「${disease.name}」方向做模拟分析。`,
    `中医辨证角度：${disease.tcmPatterns.join("、")}。`,
    `建议先做：${disease.management[0]}${disease.management[1] ? `；${disease.management[1]}` : ""}`,
    `生活方式：${disease.exercise[0]}，${disease.diet[0]}`,
    `就医提醒：${disease.warning}`,
    "内容仅用于健康管理与科普，不能替代医生诊断和治疗。"
  ].join("\n");
}

function loadState() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    state.consultInsight = buildConsultInsight("", state.selectedDisease);
    return;
  }

  try {
    const saved = JSON.parse(raw);
    if (saved.user) state.user = saved.user;
    if (saved.authMode === "login" || saved.authMode === "register") state.authMode = saved.authMode;
    if (Array.isArray(saved.metrics) && saved.metrics.length) state.metrics = saved.metrics;
    if (Array.isArray(saved.messages) && saved.messages.length) state.messages = saved.messages;
    if (Array.isArray(saved.favorites)) state.favorites = saved.favorites;
    if (saved.selectedDiseaseId) state.selectedDisease = diseaseById(saved.selectedDiseaseId);
    if (saved.consultInsight) state.consultInsight = saved.consultInsight;
    else state.consultInsight = buildConsultInsight("", state.selectedDisease);
    if (saved.constitutionResult) state.constitutionResult = saved.constitutionResult;
  } catch {
    localStorage.removeItem(storageKey);
    state.consultInsight = buildConsultInsight("", state.selectedDisease);
  }
}

function persist() {
  localStorage.setItem(
    storageKey,
    JSON.stringify({
      user: state.user,
      authMode: state.authMode,
      metrics: state.metrics,
      messages: state.messages,
      favorites: state.favorites,
      selectedDiseaseId: state.selectedDisease.id,
      consultInsight: state.consultInsight,
      constitutionResult: state.constitutionResult
    })
  );
}

function setPage(page: Page) {
  if (page !== state.page) {
    state.previousPage = state.page;
    state.page = page;
  }
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderIconButton(label: string, icon: string, page: Page, className = "") {
  return `<button type="button" class="icon-button ${className}" data-page="${page}" aria-label="${escapeHtml(label)}">${iconImg(icon, "icon-button__icon", label)}</button>`;
}

function renderBadge(text: string, tone: "good" | "warn" | "danger" | "neutral" = "neutral") {
  return `<span class="badge ${tone}">${escapeHtml(text)}</span>`;
}

function renderTag(text: string, tone: "good" | "warn" | "danger" | "neutral" = "neutral") {
  return `<span class="tag ${tone}">${escapeHtml(text)}</span>`;
}

function renderHeader() {
  const meta =
    state.page === "disease"
      ? { title: state.selectedDisease.name, subtitle: state.selectedDisease.fullName }
      : pageMeta[state.page];
  const eyebrow = state.page === "disease" ? "疾病档案" : "移动端健康 App";

  if (state.page === "home") {
    return `
      <header class="app-header app-header--home">
        <div class="header-copy">
          <div class="eyebrow-row">
            <span class="eyebrow">传染病健康管理</span>
            ${renderBadge(scoreLabel(scoreFor(latestMetric())), scoreTone(scoreFor(latestMetric())))}
          </div>
          <h1>${meta.title}</h1>
          <p>${meta.subtitle}</p>
        </div>
        <div class="header-actions">
          ${renderIconButton("个人中心", "profile", "profile")}
        </div>
      </header>
    `;
  }

  return `
    <header class="app-header app-header--sub">
      <button type="button" class="back-button" data-action="back" aria-label="返回">←</button>
      <div class="header-copy">
        <span class="eyebrow">${eyebrow}</span>
        <h1>${meta.title}</h1>
        <p>${meta.subtitle}</p>
      </div>
      <div class="header-actions">
        ${renderIconButton("个人中心", "profile", "profile")}
      </div>
    </header>
  `;
}

function renderTabbar() {
  return `
    <nav class="tabbar" aria-label="主导航">
      ${navItems
        .map(
          (item) => `
            <button type="button" class="tabbar__item ${state.page === item.page ? "is-active" : ""}" data-page="${item.page}">
              ${iconImg(item.icon, "tabbar__icon", item.label)}
              <span>${item.label}</span>
            </button>
          `
        )
        .join("")}
    </nav>
  `;
}

function renderModal() {
  if (!state.modal) return `<div class="modal" aria-hidden="true"></div>`;
  return `
    <div class="modal is-open" data-action="close-modal">
      <section class="modal__card" data-stop>
        <div class="modal__head">
          <div>
            <span class="eyebrow">内容详情</span>
            <h2>${escapeHtml(state.modal.title)}</h2>
          </div>
          <button type="button" class="close-button" data-action="close-modal">×</button>
        </div>
        <p class="modal__body">${preserveLineBreaks(state.modal.body)}</p>
        ${
          state.modal.points?.length
            ? `<div class="modal__points">${state.modal.points.map((point) => `<div class="point-row">${iconImg("alert", "mini-icon", "提示")}<span>${escapeHtml(point)}</span></div>`).join("")}</div>`
            : ""
        }
        <button type="button" class="primary-button modal__button" data-action="close-modal">知道了</button>
      </section>
    </div>
  `;
}

function renderApp(content: string) {
  const shellClass = state.page === "consult" ? "app-shell app-shell--consult" : "app-shell";

  return `
    <main class="${shellClass}">
      ${renderHeader()}
      <section class="page">
        ${content}
      </section>
      ${renderTabbar()}
      ${renderModal()}
    </main>
  `;
}

function renderAuth() {
  return `
    <main class="auth-screen">
      <section class="auth-shell">
        <div class="auth-hero">
          <div class="auth-brand">
            <div class="brand-mark">${iconImg("app", "brand-mark__icon", "中医云健康")}</div>
            <div>
              <span class="eyebrow">中医云健康</span>
              <h1>传染病健康管理 App</h1>
              <p>本地 mock 数据、离线记录、移动端优先布局，支持 APK 打包测试。</p>
            </div>
          </div>
          <div class="auth-pills">
            ${renderTag("本地保存", "good")}
            ${renderTag("问诊模拟", "warn")}
            ${renderTag("APK 可打包", "neutral")}
          </div>
        </div>

        <div class="segmented" role="tablist" aria-label="登录注册切换">
          <button type="button" class="${state.authMode === "login" ? "is-active" : ""}" data-auth-mode="login">登录</button>
          <button type="button" class="${state.authMode === "register" ? "is-active" : ""}" data-auth-mode="register">注册</button>
        </div>

        <form class="auth-form" data-form="auth">
          ${state.authMode === "register" ? `<label>姓名<input name="name" value="健康用户" required /></label>` : ""}
          <label>手机号<input name="phone" value="13800000009" required /></label>
          <label>密码<input name="password" type="password" value="123456" required /></label>
          <button type="submit" class="primary-button">${state.authMode === "login" ? "进入应用" : "注册并进入"}</button>
        </form>

        <section class="auth-features">
          <div class="mini-feature">
            ${iconImg("health", "feature-icon", "健康评分")}
            <strong>健康评分与风险提示</strong>
            <span>首页直接查看当前指标状态。</span>
          </div>
          <div class="mini-feature">
            ${iconImg("consult", "feature-icon", "问诊")}
            <strong>聊天式 AI 问诊</strong>
            <span>根据症状生成模拟辨证建议。</span>
          </div>
          <div class="mini-feature">
            ${iconImg("settings", "feature-icon", "隐私")}
            <strong>本地存储可清除</strong>
            <span>数据只保存在当前设备。</span>
          </div>
        </section>
      </section>
    </main>
  `;
}

function renderHome() {
  const metric = latestMetric();
  const score = scoreFor(metric);
  const tone = scoreTone(score);
  const focusedDisease = state.selectedDisease;
  const diseaseChips = diseases.map((d) => `<button type="button" class="chip ${focusedDisease.id === d.id ? "is-active" : ""}" data-select-disease-id="${d.id}">${d.name}</button>`).join("");
  const riskItems = metricRiskItems(metric);
  const services = [
    ["consult", "问诊", "症状输入"],
    ["health", "检测", "指标录入"],
    ["chronic", "传染病", "重点管理"],
    ["diet", "饮食", "食疗建议"],
    ["constitution", "体质", "九种问卷"],
    ["exercise", "运动", "恢复计划"],
    ["encyclopedia", "百科", "疾病科普"],
    ["lecture", "讲堂", "视频课程"]
  ] as const;

  return `
    <div class="page-stack">
      <section class="hero-card">
        <div class="hero-card__copy">
          <span class="eyebrow">今天的管理重点</span>
          <h2>把问诊、检测、饮食和复查放在一页里</h2>
          <p>围绕艾滋病、肺结核、病毒性肝炎、流感、手足口病做连续管理。</p>
          <div class="hero-card__chips">${diseaseChips}</div>
        </div>
        <div class="score-ring ${tone}">
          <div class="score-ring__inner">
            <strong>${score}</strong>
            <span>健康评分</span>
            ${renderBadge(scoreLabel(score), tone)}
          </div>
        </div>
      </section>

      <section class="section-card focus-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">重点疾病风险</span>
            <h3>${focusedDisease.name}</h3>
          </div>
          ${renderBadge("当前关注", "warn")}
        </div>
        <div class="focus-card__body">
          ${iconImg(focusedDisease.icon, "focus-card__icon", focusedDisease.name)}
          <div>
            <p class="body-text">${escapeHtml(focusedDisease.summary)}</p>
            <div class="tag-row">
              ${focusedDisease.symptoms.slice(0, 3).map((item) => renderTag(item, "neutral")).join("")}
            </div>
          </div>
        </div>
        <div class="focus-card__actions">
          <button type="button" class="secondary-button" data-page="consult">去问诊</button>
          <button type="button" class="primary-button" data-disease-id="${focusedDisease.id}">查看档案</button>
        </div>
      </section>

      <section class="strip-grid">
        <article class="strip-card">
          <div class="strip-card__head">
            <span class="eyebrow">今日提醒</span>
            ${renderBadge("实时", "good")}
          </div>
          <strong>体温、咳嗽、接触史和睡眠都要连续记录。</strong>
          <span>如果发热或症状变化明显，先做居家观察和复测。</span>
        </article>
        <article class="strip-card">
          <div class="strip-card__head">
            <span class="eyebrow">复诊节奏</span>
            ${renderBadge("随访", "warn")}
          </div>
          <strong>按病种安排痰检、肝功、病毒载量或复查提醒。</strong>
          <span>不要只看单次结果，趋势更重要。</span>
        </article>
        <article class="strip-card">
          <div class="strip-card__head">
            <span class="eyebrow">管理方向</span>
            ${renderBadge("传染病", "neutral")}
          </div>
          <strong>先看传播途径，再看症状，再看恢复期生活方式。</strong>
          <span>这是本 App 的核心信息链路。</span>
        </article>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">今日待办</span>
            <h3>健康管理任务</h3>
          </div>
          ${renderBadge(`${scoreLabel(score)} · ${score}`, tone)}
        </div>
        <div class="timeline">
          <div class="timeline-item">
            ${iconImg("temperature", "timeline-icon", "体温")}
            <div>
              <strong>早晨记录体温和睡眠</strong>
              <span>发热或睡眠不足会明显影响恢复状态。</span>
            </div>
          </div>
          <div class="timeline-item">
            ${iconImg("pressure", "timeline-icon", "血压")}
            <div>
              <strong>午间记录血压、血糖或心率</strong>
              <span>同步观察是否有乏力、气短或心悸。</span>
            </div>
          </div>
          <div class="timeline-item">
            ${iconImg("record", "timeline-icon", "复查")}
            <div>
              <strong>晚间复盘症状与随访提醒</strong>
              <span>围绕传播途径、隔离要求和就医提醒检查一次。</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">核心入口</span>
            <h3>常用功能</h3>
          </div>
        </div>
        <div class="service-grid">
          ${services
            .map(
              ([page, label, note]) => `
                <button type="button" class="service-card" data-page="${page}">
                  ${iconImg(page === "consult" ? "consult" : page === "health" ? "health" : page === "chronic" ? "disease" : page === "diet" ? "diet" : page === "constitution" ? "constitution" : page === "exercise" ? "exercise" : page === "encyclopedia" ? "book" : "lecture", "service-card__icon", label)}
                  <strong>${label}</strong>
                  <span>${note}</span>
                </button>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">近期指标</span>
            <h3>健康数据摘要</h3>
          </div>
        </div>
        <div class="metric-grid">
          ${metricCards(metric)
            .map(
              (item) => `
                <article class="metric-card ${item.tone}">
                  <div class="metric-card__top">
                    <strong>${item.title}</strong>
                    <span>${item.note}</span>
                  </div>
                  <div class="metric-card__value">${item.value}</div>
                  <div class="meter"><i style="width:${item.percent}%"></i></div>
                </article>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">重点风险</span>
            <h3>当前提醒</h3>
          </div>
        </div>
        <div class="alert-list">
          ${riskItems
            .map(
              (item, index) => `
                <div class="alert-row ${index === 0 ? "first" : ""}">
                  ${iconImg("alert", "mini-icon", "提醒")}
                  <span>${escapeHtml(item)}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">推荐内容</span>
            <h3>最近在看</h3>
          </div>
        </div>
        <div class="content-grid">
          ${contentItems.slice(0, 4).map(renderContentCard).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderContentCard(item: ContentItem) {
  const favored = state.favorites.includes(item.id);
  return `
    <article class="content-card" data-content-id="${item.id}">
      <div class="content-card__head">
        ${iconImg(item.icon, "content-card__icon", item.title)}
        <button type="button" class="favorite-button ${favored ? "is-active" : ""}" data-favorite-id="${item.id}" aria-label="${favored ? "取消收藏" : "收藏"}">
          ${iconImg("star", "favorite-button__icon", "收藏")}
        </button>
      </div>
      <span class="eyebrow">${item.category} · ${item.minutes}</span>
      <h4>${item.title}</h4>
      <p>${item.summary}</p>
      <div class="content-card__footer">
        ${item.points.slice(0, 2).map((point) => renderTag(point, "neutral")).join("")}
      </div>
    </article>
  `;
}

function renderConsult() {
  const quickTags = [
    "咳嗽咳痰两周",
    "发热 38℃",
    "黄疸和尿黄",
    "手足口疱疹",
    "HIV 高危暴露",
    "体重下降和盗汗"
  ];

  return `
    <div class="page-stack consult-page">
      <section class="section-card consult-banner">
        <div class="section-head">
          <div>
            <span class="eyebrow">AI 问诊服务</span>
            <h3>模拟医生回复</h3>
          </div>
          ${renderBadge("传染病方向", "warn")}
        </div>
        <p>输入症状、持续时间、近期接触史和体温指标，系统会根据疾病方向给出模拟建议。</p>
        <div class="tag-row">
          ${quickTags.map((tag) => `<button type="button" class="chip" data-symptom-chip="${tag}">${tag}</button>`).join("")}
        </div>
      </section>

      <section class="section-card chat-card">
        <div class="chat-head">
          <div class="chat-head__meta">
            ${iconImg("consult", "chat-head__icon", "问诊")}
            <div>
              <strong>中医云问诊助手</strong>
              <span>在线模拟 · 传染病辨证 · 生活方式建议</span>
            </div>
          </div>
          ${renderBadge(state.consultInsight.urgency, state.consultInsight.urgency === "稳定" ? "good" : state.consultInsight.urgency === "关注" ? "warn" : "danger")}
        </div>

        <div class="chat-list">
          ${state.messages
            .map(
              (message) => `
                <div class="bubble ${message.role}">
                  ${preserveLineBreaks(message.text)}
                </div>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">AI 结论</span>
            <h3>${state.consultInsight.diseaseName}方向</h3>
          </div>
          ${renderBadge(state.consultInsight.urgency, state.consultInsight.urgency === "稳定" ? "good" : state.consultInsight.urgency === "关注" ? "warn" : "danger")}
        </div>
        <p class="body-text">${escapeHtml(state.consultInsight.summary)}</p>
        <div class="insight-list">
          <div class="insight-card">
            <span class="eyebrow">中医辨证</span>
            <strong>${escapeHtml(state.consultInsight.tcm)}</strong>
          </div>
          <div class="insight-card">
            <span class="eyebrow">建议动作</span>
            <div class="stack-list">
              ${state.consultInsight.actions.map((item) => `<div class="stack-row">${iconImg("record", "mini-icon", "建议")}<span>${escapeHtml(item)}</span></div>`).join("")}
            </div>
          </div>
          <div class="insight-card danger">
            <span class="eyebrow">就医提醒</span>
            <strong>${escapeHtml(state.consultInsight.warning)}</strong>
          </div>
        </div>
      </section>

      <form class="consult-dock" data-form="chat">
        <input id="chatInput" name="chatInput" placeholder="请输入症状、持续时间、接触史或最近指标..." />
        <button type="submit" class="primary-button">发送</button>
      </form>
    </div>
  `;
}

function renderHealth() {
  const metric = latestMetric();
  const score = scoreFor(metric);
  const tone = scoreTone(score);

  return `
    <div class="page-stack">
      <section class="hero-card compact">
        <div class="hero-card__copy">
          <span class="eyebrow">当前评估</span>
          <h2>${score} 分 · ${scoreLabel(score)}</h2>
          <p>围绕体温、血压、血糖、睡眠、心率和步数做综合判断。</p>
        </div>
        <div class="score-ring ${tone}">
          <div class="score-ring__inner">
            <strong>${score}</strong>
            <span>综合评分</span>
            ${renderBadge(scoreLabel(score), tone)}
          </div>
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">风险状态</span>
            <h3>当前提示</h3>
          </div>
        </div>
        <div class="alert-list">
          ${metricRiskItems(metric)
            .map((item) => `<div class="alert-row">${iconImg("alert", "mini-icon", "提醒")}<span>${escapeHtml(item)}</span></div>`)
            .join("")}
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">录入指标</span>
            <h3>健康检测</h3>
          </div>
          ${renderBadge("本地保存", "good")}
        </div>
        <form class="metric-form" data-form="health">
          <label>血糖 (mmol/L)<input name="glucose" value="${metric.glucose}" inputmode="decimal" /></label>
          <label>收缩压<input name="systolic" value="${metric.systolic}" inputmode="numeric" /></label>
          <label>舒张压<input name="diastolic" value="${metric.diastolic}" inputmode="numeric" /></label>
          <label>心率 (次/分)<input name="heartRate" value="${metric.heartRate}" inputmode="numeric" /></label>
          <label>体温 (°C)<input name="temperature" value="${metric.temperature}" inputmode="decimal" /></label>
          <label>睡眠 (小时)<input name="sleep" value="${metric.sleep}" inputmode="decimal" /></label>
          <label>步数<input name="steps" value="${metric.steps}" inputmode="numeric" /></label>
          <label>体重 (kg)<input name="weight" value="${metric.weight}" inputmode="decimal" /></label>
          <label class="full">舌象<textarea name="tongue">${metric.tongue}</textarea></label>
          <button type="submit" class="primary-button full">保存检测记录</button>
        </form>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">指标摘要</span>
            <h3>当前数据</h3>
          </div>
        </div>
        <div class="metric-grid">
          ${metricCards(metric)
            .map(
              (item) => `
                <article class="metric-card ${item.tone}">
                  <div class="metric-card__top">
                    <strong>${item.title}</strong>
                    <span>${item.note}</span>
                  </div>
                  <div class="metric-card__value">${item.value}</div>
                  <div class="meter"><i style="width:${item.percent}%"></i></div>
                </article>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">历史记录</span>
            <h3>最近检测</h3>
          </div>
        </div>
        <div class="list-stack">
          ${state.metrics
            .slice(0, 5)
            .map(
              (item) => `
                <div class="timeline-item">
                  ${iconImg("chart", "timeline-icon", "记录")}
                  <div>
                    <strong>${escapeHtml(item.date)}</strong>
                    <span>${escapeHtml(item.temperature)}°C · ${escapeHtml(item.systolic)}/${escapeHtml(item.diastolic)} · ${escapeHtml(item.glucose)} mmol/L · ${escapeHtml(item.steps)} 步</span>
                  </div>
                </div>
              `
            )
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function renderDiseaseDetail(disease: Disease) {
  const favored = state.favorites.includes(disease.id);
  return `
    <div class="page-stack">
      <section class="hero-card disease-hero compact">
        <div class="hero-card__copy">
          <span class="eyebrow">重点疾病</span>
          <h2>${disease.name}</h2>
          <p>${disease.summary}</p>
          <div class="hero-card__chips">
            ${disease.transmission.slice(0, 3).map((item) => renderTag(item, "neutral")).join("")}
          </div>
        </div>
        <button type="button" class="favorite-toggle ${favored ? "is-active" : ""}" data-favorite-id="${disease.id}">
          ${iconImg("star", "favorite-toggle__icon", "收藏")}
          <span>${favored ? "已收藏" : "收藏"}</span>
        </button>
      </section>

      ${renderDiseaseSections(disease)}
    </div>
  `;
}

function renderDiseaseSections(disease: Disease) {
  return `
    <section class="section-card">
      <div class="section-head">
        <div>
          <span class="eyebrow">简介</span>
          <h3>${disease.fullName}</h3>
        </div>
        ${renderBadge("传染病方向", "warn")}
      </div>
      <p class="body-text">${escapeHtml(disease.note)}</p>
    </section>

    ${renderListSection("常见症状", disease.symptoms)}
    ${renderListSection("中医常见证型", disease.tcmPatterns)}
    ${renderListSection("日常管理建议", disease.management)}
    ${renderListSection("饮食建议", disease.diet)}
    ${renderListSection("运动注意事项", disease.exercise)}
    ${renderListSection("传播与防护", disease.transmission)}

    <section class="section-card danger-card">
      <div class="section-head">
        <div>
          <span class="eyebrow">就医提醒</span>
          <h3>危险信号</h3>
        </div>
        ${renderBadge("关注", "danger")}
      </div>
      <p class="body-text">${escapeHtml(disease.warning)}</p>
    </section>
  `;
}

function renderListSection(title: string, items: string[]) {
  return `
    <section class="section-card">
      <div class="section-head">
        <div>
          <span class="eyebrow">模块</span>
          <h3>${title}</h3>
        </div>
      </div>
      <div class="stack-list">
        ${items.map((item) => `<div class="stack-row">${iconImg("record", "mini-icon", "条目")}<span>${escapeHtml(item)}</span></div>`).join("")}
      </div>
    </section>
  `;
}

function renderChronic() {
  return `
    <div class="page-stack">
      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">重点管理</span>
            <h3>${state.selectedDisease.name}</h3>
          </div>
          ${renderBadge("可切换", "good")}
        </div>
        <p class="body-text">${escapeHtml(state.selectedDisease.summary)}</p>
        <div class="tag-row">
          ${diseases
            .map(
              (disease) => `
                <button type="button" class="chip ${state.selectedDisease.id === disease.id ? "is-active" : ""}" data-disease-id="${disease.id}">
                  ${disease.name}
                </button>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="content-grid">
        ${diseases
          .map(
            (disease) => `
              <article class="content-card disease-card" data-disease-id="${disease.id}">
                <div class="content-card__head">
                  ${iconImg(disease.icon, "content-card__icon", disease.name)}
                  ${renderBadge(disease.id === state.selectedDisease.id ? "当前查看" : "重点管理", disease.id === state.selectedDisease.id ? "warn" : "neutral")}
                </div>
                <span class="eyebrow">${disease.fullName}</span>
                <h4>${disease.name}</h4>
                <p>${disease.summary}</p>
                <div class="content-card__footer">
                  ${disease.symptoms.slice(0, 2).map((item) => renderTag(item, "neutral")).join("")}
                </div>
              </article>
            `
          )
          .join("")}
      </section>

      ${renderDiseaseSections(state.selectedDisease)}
    </div>
  `;
}

function renderDiet() {
  return `
    <div class="page-stack">
      <section class="hero-card compact">
        <div class="hero-card__copy">
          <span class="eyebrow">恢复期饮食</span>
          <h2>清淡高蛋白、补水、易消化</h2>
          <p>适合传染病恢复期的饮食原则，兼顾食疗和胃口管理。</p>
        </div>
        <div class="hero-card__art">
          ${iconImg("diet", "hero-art__icon", "饮食")}
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">一日食谱</span>
            <h3>今天这样吃</h3>
          </div>
        </div>
        <div class="meal-grid">
          <article class="meal-card">
            <span class="eyebrow">早餐</span>
            <strong>山药小米粥 + 鸡蛋 + 温拌青菜</strong>
            <p>适合胃口一般、体力恢复期的人群。</p>
          </article>
          <article class="meal-card">
            <span class="eyebrow">午餐</span>
            <strong>清蒸鱼 + 杂粮饭 + 冬瓜汤</strong>
            <p>优先补充蛋白和足量水分。</p>
          </article>
          <article class="meal-card">
            <span class="eyebrow">晚餐</span>
            <strong>百合银耳羹 + 豆腐青菜 + 少量主食</strong>
            <p>轻负担、易消化，适合晚间恢复。</p>
          </article>
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">适合食材</span>
            <h3>建议多吃</h3>
          </div>
        </div>
        <div class="tag-row">
          ${foodTags}
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">忌口提醒</span>
            <h3>少吃或避免</h3>
          </div>
        </div>
        <div class="tag-row">
          ${avoidTags}
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">饮食原则</span>
            <h3>为什么这样安排</h3>
          </div>
        </div>
        <div class="stack-list">
          <div class="stack-row">${iconImg("record", "mini-icon", "原则")}<span>恢复期优先补足蛋白质和水分，防止体力下降。</span></div>
          <div class="stack-row">${iconImg("record", "mini-icon", "原则")}<span>发热、咽痛或胃口差时，先选择温热软食。</span></div>
          <div class="stack-row">${iconImg("record", "mini-icon", "原则")}<span>不要盲目进补，也不要长期过度节食。</span></div>
        </div>
      </section>
    </div>
  `;
}

const foodTags = [
  "山药",
  "百合",
  "银耳",
  "鸡蛋",
  "鱼肉",
  "冬瓜",
  "青菜",
  "小米"
]
  .map((item) => renderTag(item, "good"))
  .join("");

const avoidTags = [
  "酒精",
  "霉变食物",
  "生冷食品",
  "重油夜宵",
  "烧烤辛辣",
  "过甜饮料"
]
  .map((item) => renderTag(item, "danger"))
  .join("");

function renderConstitution() {
  const result = state.constitutionResult;

  return `
    <div class="page-stack">
      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">九种体质</span>
            <h3>问卷填写</h3>
          </div>
          ${renderBadge("提交后出结果", "good")}
        </div>
        <form class="constitution-form" data-form="constitution">
          ${constitutionQuestions
            .map(
              (question, index) => `
                <label class="question-card">
                  <span class="question-card__title">${question.type}</span>
                  <span class="question-card__prompt">${question.prompt}</span>
                  <select name="q${index}">
                    <option value="1">很少</option>
                    <option value="3" selected>有时</option>
                    <option value="5">经常</option>
                  </select>
                </label>
              `
            )
            .join("")}
          <button type="submit" class="primary-button full">生成体质结果</button>
        </form>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">辨识结果</span>
            <h3>${result ? result.type : "等待提交"}</h3>
          </div>
          ${renderBadge(result ? `得分 ${result.score}` : "未完成", result ? "warn" : "neutral")}
        </div>
        <p class="body-text">${result ? escapeHtml(result.summary) : "提交问卷后，会根据最高分体质给出调理建议。"}</p>
        ${result ? `<div class="tag-row">${result.focus.map((item) => renderTag(item, "neutral")).join("")}</div>` : ""}
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">调理建议</span>
            <h3>对症方向</h3>
          </div>
        </div>
        <div class="stack-list">
          ${(result ? result.advice : ["先完成问卷，再查看对应调理建议。", "本 App 默认给出保守的日常管理方向。"])
            .map((item) => `<div class="stack-row">${iconImg("tcm", "mini-icon", "建议")}<span>${escapeHtml(item)}</span></div>`)
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function renderExercise() {
  const metric = latestMetric();
  const canMove = Number(metric.temperature) < 37.3 && Number(metric.heartRate) < 100;

  return `
    <div class="page-stack">
      <section class="hero-card compact">
        <div class="hero-card__copy">
          <span class="eyebrow">今日运动建议</span>
          <h2>${canMove ? "可以做轻量活动" : "先休息再运动"}</h2>
          <p>${canMove ? "当前体温和心率相对平稳，适合低到中等强度恢复。": "体温或心率存在波动，先观察和休息更稳妥。"}</p>
        </div>
        <div class="score-ring ${canMove ? "good" : "warn"}">
          <div class="score-ring__inner">
            <strong>${canMove ? "可" : "缓"}</strong>
            <span>运动建议</span>
            ${renderBadge(canMove ? "可活动" : "先休息", canMove ? "good" : "warn")}
          </div>
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">恢复计划</span>
            <h3>推荐动作</h3>
          </div>
        </div>
        <div class="timeline">
          <div class="timeline-item">
            ${iconImg("home", "timeline-icon", "散步")}
            <div>
              <strong>散步 20-30 分钟</strong>
              <span>优先平路和稳定节奏，避免拼速度。</span>
            </div>
          </div>
          <div class="timeline-item">
            ${iconImg("morning", "timeline-icon", "八段锦")}
            <div>
              <strong>八段锦或舒缓拉伸 10-15 分钟</strong>
              <span>适合恢复期，动作幅度以舒适为准。</span>
            </div>
          </div>
          <div class="timeline-item">
            ${iconImg("exercise", "timeline-icon", "呼吸")}
            <div>
              <strong>呼吸训练和轻量力量训练</strong>
              <span>胸闷、咳嗽或气短时先暂停。</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">强度建议</span>
            <h3>按病情调整</h3>
          </div>
        </div>
        <div class="stack-list">
          <div class="stack-row">${iconImg("steps", "mini-icon", "步数")}<span>发热、咯血、明显乏力或腹泻时，先停下运动。</span></div>
          <div class="stack-row">${iconImg("steps", "mini-icon", "步数")}<span>退热后再逐步恢复，不要一口气回到高强度。</span></div>
          <div class="stack-row">${iconImg("steps", "mini-icon", "步数")}<span>以“不加重症状”为第一标准，而不是追求卡路里。</span></div>
        </div>
      </section>
    </div>
  `;
}

function renderContentPage(category: "百科" | "讲堂") {
  const items = contentItems.filter((item) => item.category === category);
  const featured = items[0];

  return `
    <div class="page-stack">
      <section class="hero-card compact">
        <div class="hero-card__copy">
          <span class="eyebrow">${category}</span>
          <h2>${category === "百科" ? "传染病科普与辨证思路" : "视频课程与讲堂内容"}</h2>
          <p>${category === "百科" ? "围绕传播途径、证型、食疗和误区做分模块内容。" : "围绕发热、结核、肝炎和恢复期运动做课程内容。"}</p>
        </div>
        <div class="hero-card__art">
          ${iconImg(category === "百科" ? "book" : "lecture", "hero-art__icon", category)}
        </div>
      </section>

      ${featured ? renderFeaturedContent(featured) : ""}

      <section class="content-grid">
        ${items.map(renderContentCard).join("")}
      </section>
    </div>
  `;
}

function renderFeaturedContent(item: ContentItem) {
  return `
    <section class="section-card featured-card">
      <div class="section-head">
        <div>
          <span class="eyebrow">推荐阅读</span>
          <h3>${item.title}</h3>
        </div>
        ${renderBadge(item.category, "warn")}
      </div>
      <p class="body-text">${escapeHtml(item.detail)}</p>
      <div class="tag-row">
        ${item.points.map((point) => renderTag(point, "neutral")).join("")}
      </div>
    </section>
  `;
}

function renderProfile() {
  const metric = latestMetric();
  return `
    <div class="page-stack">
      <section class="hero-card compact">
        <div class="hero-card__copy">
          <span class="eyebrow">个人档案</span>
          <h2>${state.user?.name ?? "健康用户"}</h2>
          <p>${state.user?.phone ?? "未登录"} · 本地演示账号 · 传染病方向管理</p>
        </div>
        <div class="profile-avatar">
          ${iconImg("profile", "profile-avatar__icon", "头像")}
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">档案信息</span>
            <h3>基础资料</h3>
          </div>
          ${renderBadge("本地保存", "good")}
        </div>
        <div class="stack-list">
          <div class="stack-row">${iconImg("record", "mini-icon", "病史")}<span>疾病史：当前重点围绕肺结核、病毒性肝炎和流感管理。</span></div>
          <div class="stack-row">${iconImg("record", "mini-icon", "过敏")}<span>过敏史：暂未填写，可在后续版本继续扩展。</span></div>
          <div class="stack-row">${iconImg("record", "mini-icon", "家族史")}<span>家族史：本地演示信息，可配合实际使用场景修改。</span></div>
          <div class="stack-row">${iconImg("record", "mini-icon", "体检")}<span>最近体检：${metric.date} · ${metric.temperature}°C · ${metric.systolic}/${metric.diastolic} · ${metric.glucose} mmol/L</span></div>
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">收藏与入口</span>
            <h3>常用功能</h3>
          </div>
        </div>
        <div class="metric-grid compact">
          ${[
            { label: "收藏内容", value: state.favorites.length.toString(), icon: "star" },
            { label: "检测记录", value: state.metrics.length.toString(), icon: "chart" },
            { label: "当前评分", value: scoreFor(metric).toString(), icon: "health" },
            { label: "关注方向", value: "传染病", icon: "disease" }
          ]
            .map(
              (item) => `
                <article class="metric-card">
                  <div class="metric-card__top">
                    <strong>${item.label}</strong>
                    ${iconImg(item.icon, "mini-icon", item.label)}
                  </div>
                  <div class="metric-card__value">${item.value}</div>
                  <span class="metric-card__hint">设备本地保存</span>
                </article>
              `
            )
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function renderSettings() {
  return `
    <div class="page-stack">
      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">本地数据</span>
            <h3>存储说明</h3>
          </div>
        </div>
        <p class="body-text">本项目的登录、检测、问诊和收藏都保存在当前设备的 localStorage 中，不连接真实后端。</p>
        <button type="button" class="secondary-button" data-action="clear-data">清除本地数据</button>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">隐私与提示</span>
            <h3>说明</h3>
          </div>
        </div>
        <div class="stack-list">
          <div class="stack-row">${iconImg("settings", "mini-icon", "设置")}<span>内容仅用于健康管理与科普，不能替代医生诊断和治疗。</span></div>
          <div class="stack-row">${iconImg("settings", "mini-icon", "设置")}<span>如出现危险信号，请前往正规医疗机构就诊。</span></div>
          <div class="stack-row">${iconImg("settings", "mini-icon", "设置")}<span>清除数据后，当前设备上的账号和记录会一起移除。</span></div>
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">应用信息</span>
            <h3>中医云健康</h3>
          </div>
        </div>
        <div class="stack-list">
          <div class="stack-row">${iconImg("app", "mini-icon", "App")}<span>移动端优先的 Web App / PWA + Capacitor Android。</span></div>
          <div class="stack-row">${iconImg("app", "mini-icon", "App")}<span>支持浏览器预览、构建和 APK 打包测试。</span></div>
        </div>
      </section>
    </div>
  `;
}

function renderPage() {
  if (!state.user) {
    app.innerHTML = renderAuth();
    return;
  }

  const pageContent = {
    home: renderHome(),
    consult: renderConsult(),
    health: renderHealth(),
    chronic: renderChronic(),
    diet: renderDiet(),
    constitution: renderConstitution(),
    exercise: renderExercise(),
    encyclopedia: renderContentPage("百科"),
    lecture: renderContentPage("讲堂"),
    profile: renderProfile(),
    settings: renderSettings(),
    disease: renderDiseaseDetail(state.selectedDisease)
  }[state.page];

  app.innerHTML = renderApp(pageContent);
}

function render() {
  renderPage();
}

function openModal(title: string, body: string, points?: string[]) {
  state.modal = { title, body, points };
  render();
}

function closeModal() {
  state.modal = null;
  render();
}

function toggleFavorite(id: string) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter((item) => item !== id);
  } else {
    state.favorites = [...state.favorites, id];
  }
  persist();
  render();
}

function clearLocalData() {
  const confirmed = window.confirm("确定清空本地账号、检测、问诊和收藏数据吗？");
  if (!confirmed) return;

  localStorage.removeItem(storageKey);
  state.user = null;
  state.metrics = [...defaultMetrics];
  state.messages = [
    {
      role: "ai",
      text: "您好，我是中医云健康 AI 问诊助手。请描述症状、持续时间、接触史和最近指标，我会结合传染病方向给出模拟建议。"
    }
  ];
  state.favorites = [];
  state.selectedDisease = diseases[1];
  state.consultInsight = buildConsultInsight("", state.selectedDisease);
  state.constitutionResult = null;
  window.alert("本地数据已清除");
  render();
}

function sendChat(message: string) {
  const trimmed = message.trim();
  if (!trimmed) return;

  const matched = diseaseMatches(trimmed);
  state.selectedDisease = matched;
  state.messages.push({ role: "me", text: trimmed });
  state.messages.push({ role: "ai", text: buildConsultReply(trimmed, matched) });
  state.consultInsight = buildConsultInsight(trimmed, matched);
  persist();
  render();
}

function saveMetric(form: HTMLFormElement) {
  const data = new FormData(form);
  state.metrics.unshift({
    glucose: String(data.get("glucose") ?? ""),
    systolic: String(data.get("systolic") ?? ""),
    diastolic: String(data.get("diastolic") ?? ""),
    heartRate: String(data.get("heartRate") ?? ""),
    temperature: String(data.get("temperature") ?? ""),
    sleep: String(data.get("sleep") ?? ""),
    steps: String(data.get("steps") ?? ""),
    weight: String(data.get("weight") ?? ""),
    tongue: String(data.get("tongue") ?? ""),
    date: new Date().toLocaleDateString("zh-CN")
  });
  persist();
  render();
}

function saveConstitution(form: HTMLFormElement) {
  const data = new FormData(form);
  const scores = constitutionQuestions.map((question, index) => ({
    type: question.type,
    score: Number(data.get(`q${index}`) ?? 1),
    guidance: question.guidance
  }));
  const winner = scores.sort((a, b) => b.score - a.score)[0];
  const extra = constitutionAdvice[winner.type] ?? constitutionAdvice["平和质"];

  state.constitutionResult = {
    type: winner.type,
    score: winner.score,
    summary: winner.guidance,
    advice: extra.advice,
    focus: extra.focus
  };
  persist();
  render();
}

function openContentDetail(id: string) {
  const item = contentById(id);
  if (!item) return;
  openModal(item.title, `${item.summary}\n\n${item.detail}`, item.points);
}

function openDisease(id: string) {
  state.selectedDisease = diseaseById(id);
  state.previousPage = state.page;
  state.page = "disease";
  persist();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function selectDisease(id: string) {
  state.selectedDisease = diseaseById(id);
  persist();
  render();
}

function handleAppClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const pageTarget = target.closest<HTMLElement>("[data-page]");
  if (pageTarget) {
    const page = pageTarget.dataset.page as Page;
    setPage(page);
    return;
  }

  const authModeTarget = target.closest<HTMLElement>("[data-auth-mode]");
  if (authModeTarget) {
    state.authMode = authModeTarget.dataset.authMode === "register" ? "register" : "login";
    persist();
    render();
    return;
  }

  const actionTarget = target.closest<HTMLElement>("[data-action]");
  if (actionTarget) {
    const action = actionTarget.dataset.action;
    if (action === "back") {
      setPage(state.previousPage ?? "home");
    } else if (action === "close-modal") {
      closeModal();
    } else if (action === "clear-data") {
      clearLocalData();
    }
    return;
  }

  const favoriteTarget = target.closest<HTMLElement>("[data-favorite-id]");
  if (favoriteTarget) {
    toggleFavorite(favoriteTarget.dataset.favoriteId ?? "");
    return;
  }

  const selectDiseaseTarget = target.closest<HTMLElement>("[data-select-disease-id]");
  if (selectDiseaseTarget) {
    selectDisease(selectDiseaseTarget.dataset.selectDiseaseId ?? "");
    return;
  }

  const diseaseTarget = target.closest<HTMLElement>("[data-disease-id]");
  if (diseaseTarget) {
    openDisease(diseaseTarget.dataset.diseaseId ?? "");
    return;
  }

  const contentTarget = target.closest<HTMLElement>("[data-content-id]");
  if (contentTarget) {
    openContentDetail(contentTarget.dataset.contentId ?? "");
    return;
  }

  const symptomTarget = target.closest<HTMLElement>("[data-symptom-chip]");
  if (symptomTarget) {
    const chip = symptomTarget.dataset.symptomChip ?? "";
    sendChat(chip);
  }
}

function handleAppSubmit(event: SubmitEvent) {
  const form = event.target as HTMLFormElement;
  if (form.dataset.form === "auth") {
    event.preventDefault();
    const data = new FormData(form);
    state.user = {
      name: String(data.get("name") || "健康用户"),
      phone: String(data.get("phone") || ""),
      password: String(data.get("password") || "")
    };
    persist();
    setPage("home");
    return;
  }

  if (form.dataset.form === "chat") {
    event.preventDefault();
    const input = form.querySelector<HTMLInputElement>("#chatInput");
    sendChat(input?.value ?? "");
    if (input) input.value = "";
    return;
  }

  if (form.dataset.form === "health") {
    event.preventDefault();
    saveMetric(form);
    return;
  }

  if (form.dataset.form === "constitution") {
    event.preventDefault();
    saveConstitution(form);
  }
}

function attachEvents() {
  app.addEventListener("click", handleAppClick);
  app.addEventListener("submit", handleAppSubmit);
}

loadState();
attachEvents();
renderPage();
