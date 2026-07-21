(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function a(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=a(o);fetch(o.href,r)}})();const N="tcm-cloud-mobile-state",T=document.querySelector("#app");if(!T)throw new Error("App root not found");const S=T,K={home:{title:"中医云健康",subtitle:"传染病健康管理中心"},consult:{title:"AI 问诊",subtitle:"输入症状、时长和指标，生成模拟建议"},health:{title:"健康检测",subtitle:"体温、血压、血糖、心率和睡眠记录"},chronic:{title:"传染病管理",subtitle:"艾滋病、肺结核、病毒性肝炎、流感、手足口病"},diet:{title:"膳食管理",subtitle:"恢复期饮食、食疗建议和忌口提醒"},constitution:{title:"体质辨识",subtitle:"九种体质问卷与调理建议"},exercise:{title:"运动管理",subtitle:"恢复期运动、步数目标和注意事项"},encyclopedia:{title:"中医百科",subtitle:"科普、证型、穴位、食疗和误区"},lecture:{title:"健康讲堂",subtitle:"课程列表、视频占位和收藏"},profile:{title:"个人档案",subtitle:"信息、病史、过敏史和体检记录"},settings:{title:"设置与隐私",subtitle:"数据清除、免责声明和本地存储说明"},disease:{title:"疾病详情",subtitle:"简介、症状、证型、调理与就医提醒"}},x=[{type:"平和质",prompt:"平时精神、睡眠和饮食是否比较稳定？",guidance:"保持规律作息、均衡饮食和持续复诊随访。"},{type:"气虚质",prompt:"是否容易乏力、气短、说话声音低？",guidance:"重在补气健脾，避免过度劳累和久熬夜。"},{type:"阳虚质",prompt:"是否怕冷、四肢发凉、喜欢温热环境？",guidance:"注意保暖，饮食宜温和，避免寒凉生冷。"},{type:"阴虚质",prompt:"是否口干咽燥、手足心热、容易夜间不适？",guidance:"重在养阴润燥，少辛辣烧烤，保证睡眠。"},{type:"痰湿质",prompt:"是否身体困重、食欲偏差、容易腹胀？",guidance:"饮食清淡少油腻，配合规律运动和控糖。"},{type:"湿热质",prompt:"是否口苦口黏、容易上火、面部油腻？",guidance:"重在清热化湿，减少酒精、油炸和夜宵。"},{type:"血瘀质",prompt:"是否容易刺痛、肤色偏暗、活动后不适明显？",guidance:"规律活动、避免久坐，必要时配合活血调理。"},{type:"气郁质",prompt:"是否常觉得情绪郁闷、胸胁不舒、叹气多？",guidance:"重在疏肝解郁，保持沟通和稳定作息。"},{type:"特禀质",prompt:"是否容易过敏、鼻痒、皮肤敏感或哮喘样不适？",guidance:"注意环境清洁，回避明确过敏原。"}],R={平和质:{advice:["继续维持规律作息和均衡饮食。","坚持随访，按计划记录指标。"],focus:["规律","均衡","复诊"]},气虚质:{advice:["适当补气、避免过劳，优先轻量运动。","保证睡眠，饮食以易消化为主。"],focus:["补气","休息","易消化"]},阳虚质:{advice:["注意保暖，减少寒凉食物和冷饮。","运动以温和微汗为度。"],focus:["保暖","温养","温和运动"]},阴虚质:{advice:["适合养阴润燥，少辛辣油炸。","保持情绪稳定，避免熬夜。"],focus:["养阴","润燥","睡眠"]},痰湿质:{advice:["饮食控油控糖，减少夜宵。","增加步行和核心活动时间。"],focus:["控油","控糖","减重"]},湿热质:{advice:["避免饮酒和重口味，规律排汗。","注意皮肤与口腔清洁。"],focus:["清热","化湿","清洁"]},血瘀质:{advice:["保持活动量，减少久坐久卧。","关注疼痛、颜色和循环变化。"],focus:["活血","循环","活动"]},气郁质:{advice:["安排固定放松时间，减少情绪积压。","适合舒缓运动和稳定社交。"],focus:["疏肝","放松","沟通"]},特禀质:{advice:["尽量回避已知过敏原和刺激物。","外出时注意口罩和环境清洁。"],focus:["回避过敏原","环境清洁","防护"]}},p=[{id:"aids",name:"艾滋病",fullName:"HIV 感染与获得性免疫缺陷综合征",icon:"shield",summary:"长期管理重点是规范抗病毒治疗、机会感染预防、营养支持和心理支持。",transmission:["性接触传播","血液传播","母婴传播","共用针具等高危暴露"],symptoms:["持续低热或盗汗","体重下降","乏力","淋巴结肿大","反复感染"],tcmPatterns:["疫毒伤正","气阴两虚","脾肾亏虚"],management:["抗逆转录病毒治疗是核心，不要自行停药或换药。","定期检测病毒载量、CD4 和机会感染风险。","重视依从性管理、营养支持和情绪支持。"],diet:["优先高蛋白、易消化、洁净饮食。","避免生冷不洁和过度刺激性食物。","恢复期少量多餐，保证补水。"],exercise:["以散步、拉伸和呼吸训练为主。","感染活动期或体力明显下降时减少运动。"],warning:"持续高热、呼吸困难、严重腹泻或快速消瘦时，应及时到感染科就诊。",note:"中医多从扶正固本、益气养阴、健脾和胃等方向辅助调养，但不能替代抗病毒治疗。"},{id:"tuberculosis",name:"肺结核",fullName:"结核分枝杆菌感染",icon:"lung",summary:"重点是早发现、规范抗结核治疗、咳嗽礼仪、通风隔离和复查随访。",transmission:["空气飞沫核传播","与活动性患者密切接触","通风差的拥挤环境","免疫力低下时更易发病"],symptoms:["咳嗽咳痰超过 2 周","午后低热","盗汗","乏力消瘦","咯血或胸痛"],tcmPatterns:["肺阴亏虚","阴虚火旺","气阴两虚"],management:["遵循早期、联合、规律、全程原则，不要擅自停药。","定期痰检、影像复查和肝功能监测。","注意居室通风与咳嗽礼仪。"],diet:["可选百合、银耳、山药、梨等润肺养阴食材。","避免烟酒、辛辣和油炸。","恢复期维持清淡高蛋白饮食。"],exercise:["恢复期选择散步、呼吸训练、八段锦。","咯血、发热或胸闷加重时停止运动。"],warning:"咯血增多、胸闷气促、持续高热或药物后黄疸皮疹，应立即就医。",note:"中医常见肺痨思路，但核心仍是规范抗结核治疗与复查。"},{id:"hepatitis",name:"病毒性肝炎",fullName:"甲型、乙型、丙型、戊型等病毒性肝炎",icon:"dna",summary:"关注肝功能、病毒载量、肝纤维化风险、戒酒和家庭传播预防。",transmission:["甲肝/戊肝以粪口传播为主","乙肝/丙肝以血液、母婴、性接触传播为主","不安全注射或器械消毒不严","日常接触一般不传播乙肝丙肝"],symptoms:["乏力","食欲下降","恶心","右上腹不适","黄疸或尿黄"],tcmPatterns:["肝胆湿热","肝郁脾虚","瘀血阻络"],management:["甲肝戊肝以支持治疗为主，乙肝和丙肝要评估抗病毒指征。","监测肝功能、病毒学指标和纤维化风险。","避免损肝药物和饮酒。"],diet:["饮食清淡规律，避免霉变食物和高油夜宵。","严格戒酒，少吃过甜和过咸食物。","充足饮水，减少暴饮暴食。"],exercise:["症状平稳时可散步和轻度拉伸。","疲乏明显或黄疸加重时先休息。"],warning:"黄疸加深、腹水、黑便、意识异常或肝区持续疼痛需及时就医。",note:"中医多从清利湿热、疏肝健脾、养阴柔肝等方向配合调养。"},{id:"influenza",name:"流行性感冒",fullName:"流感病毒感染",icon:"temperature",summary:"起病急、传染性强，老年人、孕妇、儿童和慢病人群要重点关注。",transmission:["飞沫传播","接触污染物后触摸口鼻眼","密闭空间聚集传播","家庭成员间传播"],symptoms:["高热","全身酸痛","头痛","咽痛咳嗽","乏力明显"],tcmPatterns:["风热犯表","风寒束表","表寒里热"],management:["高风险人群尽早就医评估抗病毒治疗。","补液和休息优先，记录体温变化。","发热期避免上班上学和密集接触。"],diet:["发热期宜温热清淡、少量多次饮水。","避免油腻、辛辣和过甜饮食。","恢复期可补充蛋白质和维生素。"],exercise:["退热后逐步恢复活动，先从散步开始。","不宜马上进行剧烈训练。"],warning:"呼吸困难、胸痛、意识改变、持续高热超过 3 天或基础病加重，需及时就医。",note:"中医常从时行感冒、风热或风寒辨证切入，核心仍是休息、补液和隔离。"},{id:"hfmd",name:"手足口病",fullName:"肠道病毒感染",icon:"child",summary:"儿童常见传染病，重点关注发热、口腔疱疹、皮疹和重症预警。",transmission:["密切接触传播","粪口传播","呼吸道飞沫传播","玩具餐具等污染物传播"],symptoms:["发热","口腔疱疹或疼痛","手足臀皮疹","食欲下降","少数可出现嗜睡惊跳"],tcmPatterns:["湿热疫毒","肺脾湿热","热毒炽盛"],management:["多数为对症支持治疗，注意补液和口腔护理。","隔离至症状消退后再恢复集体活动。","留意精神状态和重症信号。"],diet:["口腔疼痛时选择温凉软食，避免酸辣刺激。","少量多次饮水，减少脱水风险。","恢复期逐步增加蛋白和蔬果。"],exercise:["急性期以休息为主，恢复后再轻度活动。","避免儿童过度奔跑和出汗过多。"],warning:"精神差、嗜睡、惊跳、呼吸急促、持续高热或肢体抖动时需立即就医。",note:"中医多从湿热疫毒辨证，重点在清热解毒和护理隔离。"}],j=[{id:"kb-route",title:"传染病传播途径总览",category:"百科",minutes:"6 分钟",icon:"shield",summary:"把性接触、血液、母婴、飞沫和粪口传播一次讲清。",detail:"围绕本项目的传染病方向，先分清传播途径，再决定隔离、消毒和随访强度。不同疾病的传播逻辑不同，HIV、乙肝、丙肝更关注血液和高危暴露，肺结核更关注空气飞沫核，流感则重视飞沫与密闭空间。",points:["高危暴露要尽快评估","飞沫传播要重视通风与口罩","家庭清洁与个人用品分开使用"]},{id:"kb-tcm",title:"中医常见辨证思路",category:"百科",minutes:"8 分钟",icon:"tcm",summary:"从疫毒、湿热、气阴两虚、脾肾亏虚等角度理解调养方向。",detail:"传染病的中医调养不替代现代医学治疗，但可以帮助理解恢复期的体力、睡眠、胃口和情绪变化。临床常从正虚、邪恋、湿热、阴虚等方向辨证，并结合饮食和作息管理。",points:["恢复期更重视扶正","发热期重在清利","长期管理强调睡眠和营养"]},{id:"kb-isolation",title:"居家隔离与消毒清单",category:"百科",minutes:"5 分钟",icon:"record",summary:"发热、咳嗽或高危暴露后，先做哪些动作。",detail:"先通风、再分区、后清洁。居家隔离期间建议单独使用毛巾、餐具和牙具，频繁接触的门把手、桌面和手机要定时清洁，体温和症状变化要连续记录。",points:["通风优先","个人物品分开","症状连续记录"]},{id:"kb-diet",title:"恢复期食疗建议",category:"百科",minutes:"7 分钟",icon:"diet",summary:"清淡高蛋白、补水、易消化，是大多数恢复期的共同原则。",detail:"恢复期不要盲目进补，也不要为了“清热”而长期过度节食。对多数传染病人群来说，保持足量蛋白、均衡蔬果、稳定饮水和规律进餐更重要。",points:["少量多餐","足量饮水","避免生冷与霉变"]},{id:"kb-myth",title:"传染病常见误区",category:"百科",minutes:"4 分钟",icon:"alert",summary:"把“不会传”和“不能治”分开理解，避免过度焦虑。",detail:"许多传染病并不是日常接触就会传播，也并不是一旦感染就无法管理。科学的检测、随访、药物依从性和家庭防护，往往比单纯的忌口更重要。",points:["不要把所有接触都视为高危","不要擅自停药","不要忽视复查"]},{id:"lc-fever",title:"发热、咳嗽与居家观察",category:"讲堂",minutes:"12 分钟",icon:"temperature",summary:"如何区分普通感冒、流感和需要进一步评估的情况。",detail:"这一节围绕发热曲线、咳嗽类型、精神状态和呼吸情况做判断，同时讲如何记录体温、补液和观察恶化信号。",points:["先看体温和精神状态","记录咳嗽和呼吸变化","红旗症状要及时就医"]},{id:"lc-tb",title:"肺结核规范治疗的四个原则",category:"讲堂",minutes:"10 分钟",icon:"lung",summary:"早期、联合、规律、全程，为什么每一个都不能少。",detail:"从抗结核治疗的原则出发，解释疗程、复查、药物不良反应和家庭防护的重要性，适合患者和家属一起看。",points:["不要漏服和停药","复查不能省","家庭通风要长期坚持"]},{id:"lc-exercise",title:"恢复期运动如何安排",category:"讲堂",minutes:"9 分钟",icon:"exercise",summary:"从散步、八段锦到呼吸训练，如何循序渐进。",detail:"恢复期的运动核心不是拼强度，而是可持续。先观察体温、心率和疲劳，再决定当天是否适合运动以及运动多久。",points:["先低强度后中强度","发热期暂停","出现胸闷先停下"]}],V=[{page:"home",label:"首页",icon:"home"},{page:"consult",label:"问诊",icon:"consult"},{page:"health",label:"检测",icon:"health"},{page:"chronic",label:"传染病",icon:"disease"},{page:"profile",label:"我的",icon:"profile"}],C=[{glucose:"5.6",systolic:"118",diastolic:"76",heartRate:"74",temperature:"36.7",sleep:"7.2",steps:"7200",weight:"62",tongue:"舌淡红，苔薄白",date:new Date().toLocaleDateString("zh-CN")}],t={page:"home",previousPage:"home",user:null,authMode:"login",metrics:[...C],messages:[{role:"ai",text:"您好，我是中医云健康 AI 问诊助手。请描述症状、持续时间、接触史和最近指标，我会结合传染病方向给出模拟建议。"}],favorites:[],selectedDisease:p[1],consultInsight:{diseaseId:p[1].id,diseaseName:p[1].name,urgency:"稳定",summary:"输入症状后，我会结合传染病方向、辨证思路和生活方式给出建议。",tcm:p[1].note,actions:["描述症状与持续时间","补充最近体温和接触史","如果有红旗症状请尽快就医"],warning:p[1].warning},constitutionResult:null,modal:null};function l(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function q(s){return l(s).replace(/\n/g,"<br />")}function n(s,e="ui-icon",a=""){return`<img class="${e}" src="/ui-icons/${s}.svg" alt="${l(a)}" loading="lazy" />`}function f(s,e,a){return Math.min(a,Math.max(e,s))}function w(){return t.metrics[0]??C[0]}function I(s){let e=92;const a=Number(s.temperature),i=Number(s.systolic),o=Number(s.diastolic),r=Number(s.heartRate),u=Number(s.sleep),c=Number(s.steps),h=Number(s.glucose);return a>=37.3&&(e-=16),(i>=140||o>=90)&&(e-=12),r>100&&(e-=8),u<6&&(e-=8),c<4e3&&(e-=6),h>=7.8&&(e-=6),f(e,50,98)}function k(s){return s>=85?"稳定":s>=70?"关注":"提醒"}function M(s){return s>=85?"good":s>=70?"warn":"danger"}function H(s){const e=[];return Number(s.temperature)>=37.3&&e.push("体温偏高，先观察发热持续时间并减少外出。"),(Number(s.systolic)>=140||Number(s.diastolic)>=90)&&e.push("血压偏高，建议连续复测并关注基础病风险。"),Number(s.heartRate)>100&&e.push("心率偏快，结合发热、焦虑或乏力一起判断。"),Number(s.sleep)<6&&e.push("睡眠不足，会影响恢复和免疫状态。"),Number(s.steps)<4e3&&e.push("活动量偏低，可在退热后逐步增加步行。"),Number(s.glucose)>=7.8&&e.push("血糖偏高，饮食和复测都要同步管理。"),e.length?e:["当前指标整体平稳，继续记录并保持规律作息。"]}function O(s){const e=Number(s.temperature),a=Number(s.systolic),i=Number(s.diastolic),o=Number(s.glucose),r=Number(s.sleep),u=Number(s.heartRate),c=Number(s.steps);return[{title:"体温",value:`${s.temperature}°C`,note:e>=37.3?"偏高":"稳定",percent:f(e/39*100,20,100),tone:e>=37.3?"warn":"good"},{title:"血压",value:`${s.systolic}/${s.diastolic}`,note:a>=140||i>=90?"偏高":"正常",percent:f((a+i)/240*100,20,100),tone:a>=140||i>=90?"warn":"good"},{title:"血糖",value:`${s.glucose} mmol/L`,note:o>=7.8?"偏高":"平稳",percent:f(o/11*100,15,100),tone:o>=7.8?"warn":"good"},{title:"睡眠",value:`${s.sleep} 小时`,note:r<6?"不足":"达标",percent:f(r/9*100,15,100),tone:r<6?"warn":"good"},{title:"心率",value:`${s.heartRate} 次/分`,note:u>100?"偏快":"稳定",percent:f(u/120*100,20,100),tone:u>100?"warn":"good"},{title:"步数",value:s.steps,note:c<4e3?"偏少":"正常",percent:f(c/1e4*100,15,100),tone:c<4e3?"warn":"good"}]}function g(s){return p.find(e=>e.id===s)??p[0]}function J(s){return j.find(e=>e.id===s)}function W(s){return s.toLowerCase().includes("hiv")||s.includes("艾滋")||s.includes("高危")?g("aids"):s.includes("结核")||s.includes("咳嗽")||s.includes("盗汗")||s.includes("咯血")?g("tuberculosis"):s.includes("肝炎")||s.includes("黄疸")||s.includes("尿黄")||s.includes("右上腹")?g("hepatitis"):s.includes("流感")||s.includes("发热")||s.includes("头痛")||s.includes("肌肉酸")||s.includes("咽痛")?g("influenza"):s.includes("手足口")||s.includes("疱疹")||s.includes("皮疹")||s.includes("孩子")?g("hfmd"):g("hepatitis")}function _(s,e){const a=s.includes("呼吸困难")||s.includes("意识")||s.includes("咯血")||s.includes("惊跳")?"提醒":s.includes("发热")||s.includes("咳嗽")||s.includes("高危")||s.includes("黄疸")?"关注":"稳定",i=`${s?"你的描述更接近":"当前优先关注"}${e.name}方向，需要先看传播途径、症状持续时间和风险接触史。`;return{diseaseId:e.id,diseaseName:e.name,urgency:a,summary:i,tcm:e.note,actions:[e.management[0],e.management[1],e.diet[0]],warning:e.warning}}function Q(s,e){return[`我先按「${e.name}」方向做模拟分析。`,`中医辨证角度：${e.tcmPatterns.join("、")}。`,`建议先做：${e.management[0]}${e.management[1]?`；${e.management[1]}`:""}`,`生活方式：${e.exercise[0]}，${e.diet[0]}`,`就医提醒：${e.warning}`,"内容仅用于健康管理与科普，不能替代医生诊断和治疗。"].join(`
`)}function G(){const s=localStorage.getItem(N);if(!s){t.consultInsight=_("",t.selectedDisease);return}try{const e=JSON.parse(s);e.user&&(t.user=e.user),(e.authMode==="login"||e.authMode==="register")&&(t.authMode=e.authMode),Array.isArray(e.metrics)&&e.metrics.length&&(t.metrics=e.metrics),Array.isArray(e.messages)&&e.messages.length&&(t.messages=e.messages),Array.isArray(e.favorites)&&(t.favorites=e.favorites),e.selectedDiseaseId&&(t.selectedDisease=g(e.selectedDiseaseId)),e.consultInsight?t.consultInsight=e.consultInsight:t.consultInsight=_("",t.selectedDisease),e.constitutionResult&&(t.constitutionResult=e.constitutionResult)}catch{localStorage.removeItem(N),t.consultInsight=_("",t.selectedDisease)}}function b(){localStorage.setItem(N,JSON.stringify({user:t.user,authMode:t.authMode,metrics:t.metrics,messages:t.messages,favorites:t.favorites,selectedDiseaseId:t.selectedDisease.id,consultInsight:t.consultInsight,constitutionResult:t.constitutionResult}))}function A(s){s!==t.page&&(t.previousPage=t.page,t.page=s),m(),window.scrollTo({top:0,behavior:"smooth"})}function P(s,e,a,i=""){return`<button type="button" class="icon-button ${i}" data-page="${a}" aria-label="${l(s)}">${n(e,"icon-button__icon",s)}</button>`}function d(s,e="neutral"){return`<span class="badge ${e}">${l(s)}</span>`}function v(s,e="neutral"){return`<span class="tag ${e}">${l(s)}</span>`}function U(){const s=t.page==="disease"?{title:t.selectedDisease.name,subtitle:t.selectedDisease.fullName}:K[t.page],e=t.page==="disease"?"疾病档案":"移动端健康 App";return t.page==="home"?`
      <header class="app-header app-header--home">
        <div class="header-copy">
          <div class="eyebrow-row">
            <span class="eyebrow">传染病健康管理</span>
            ${d(k(I(w())),M(I(w())))}
          </div>
          <h1>${s.title}</h1>
          <p>${s.subtitle}</p>
        </div>
        <div class="header-actions">
          ${P("个人中心","profile","profile")}
        </div>
      </header>
    `:`
    <header class="app-header app-header--sub">
      <button type="button" class="back-button" data-action="back" aria-label="返回">←</button>
      <div class="header-copy">
        <span class="eyebrow">${e}</span>
        <h1>${s.title}</h1>
        <p>${s.subtitle}</p>
      </div>
      <div class="header-actions">
        ${P("个人中心","profile","profile")}
      </div>
    </header>
  `}function X(){return`
    <nav class="tabbar" aria-label="主导航">
      ${V.map(s=>`
            <button type="button" class="tabbar__item ${t.page===s.page?"is-active":""}" data-page="${s.page}">
              ${n(s.icon,"tabbar__icon",s.label)}
              <span>${s.label}</span>
            </button>
          `).join("")}
    </nav>
  `}function Y(){return t.modal?`
    <div class="modal is-open" data-action="close-modal">
      <section class="modal__card" data-stop>
        <div class="modal__head">
          <div>
            <span class="eyebrow">内容详情</span>
            <h2>${l(t.modal.title)}</h2>
          </div>
          <button type="button" class="close-button" data-action="close-modal">×</button>
        </div>
        <p class="modal__body">${q(t.modal.body)}</p>
        ${t.modal.points?.length?`<div class="modal__points">${t.modal.points.map(s=>`<div class="point-row">${n("alert","mini-icon","提示")}<span>${l(s)}</span></div>`).join("")}</div>`:""}
        <button type="button" class="primary-button modal__button" data-action="close-modal">知道了</button>
      </section>
    </div>
  `:'<div class="modal" aria-hidden="true"></div>'}function Z(s){return`
    <main class="${t.page==="consult"?"app-shell app-shell--consult":"app-shell"}">
      ${U()}
      <section class="page">
        ${s}
      </section>
      ${X()}
      ${Y()}
    </main>
  `}function ss(){return`
    <main class="auth-screen">
      <section class="auth-shell">
        <div class="auth-hero">
          <div class="auth-brand">
            <div class="brand-mark">${n("app","brand-mark__icon","中医云健康")}</div>
            <div>
              <span class="eyebrow">中医云健康</span>
              <h1>传染病健康管理 App</h1>
              <p>本地 mock 数据、离线记录、移动端优先布局，支持 APK 打包测试。</p>
            </div>
          </div>
          <div class="auth-pills">
            ${v("本地保存","good")}
            ${v("问诊模拟","warn")}
            ${v("APK 可打包","neutral")}
          </div>
        </div>

        <div class="segmented" role="tablist" aria-label="登录注册切换">
          <button type="button" class="${t.authMode==="login"?"is-active":""}" data-auth-mode="login">登录</button>
          <button type="button" class="${t.authMode==="register"?"is-active":""}" data-auth-mode="register">注册</button>
        </div>

        <form class="auth-form" data-form="auth">
          ${t.authMode==="register"?'<label>姓名<input name="name" value="健康用户" required /></label>':""}
          <label>手机号<input name="phone" value="13800000009" required /></label>
          <label>密码<input name="password" type="password" value="123456" required /></label>
          <button type="submit" class="primary-button">${t.authMode==="login"?"进入应用":"注册并进入"}</button>
        </form>

        <section class="auth-features">
          <div class="mini-feature">
            ${n("health","feature-icon","健康评分")}
            <strong>健康评分与风险提示</strong>
            <span>首页直接查看当前指标状态。</span>
          </div>
          <div class="mini-feature">
            ${n("consult","feature-icon","问诊")}
            <strong>聊天式 AI 问诊</strong>
            <span>根据症状生成模拟辨证建议。</span>
          </div>
          <div class="mini-feature">
            ${n("settings","feature-icon","隐私")}
            <strong>本地存储可清除</strong>
            <span>数据只保存在当前设备。</span>
          </div>
        </section>
      </section>
    </main>
  `}function es(){const s=w(),e=I(s),a=M(e),i=t.selectedDisease,o=p.map(c=>`<button type="button" class="chip ${i.id===c.id?"is-active":""}" data-select-disease-id="${c.id}">${c.name}</button>`).join(""),r=H(s),u=[["consult","问诊","症状输入"],["health","检测","指标录入"],["chronic","传染病","重点管理"],["diet","饮食","食疗建议"],["constitution","体质","九种问卷"],["exercise","运动","恢复计划"],["encyclopedia","百科","疾病科普"],["lecture","讲堂","视频课程"]];return`
    <div class="page-stack">
      <section class="hero-card">
        <div class="hero-card__copy">
          <span class="eyebrow">今天的管理重点</span>
          <h2>把问诊、检测、饮食和复查放在一页里</h2>
          <p>围绕艾滋病、肺结核、病毒性肝炎、流感、手足口病做连续管理。</p>
          <div class="hero-card__chips">${o}</div>
        </div>
        <div class="score-ring ${a}">
          <div class="score-ring__inner">
            <strong>${e}</strong>
            <span>健康评分</span>
            ${d(k(e),a)}
          </div>
        </div>
      </section>

      <section class="section-card focus-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">重点疾病风险</span>
            <h3>${i.name}</h3>
          </div>
          ${d("当前关注","warn")}
        </div>
        <div class="focus-card__body">
          ${n(i.icon,"focus-card__icon",i.name)}
          <div>
            <p class="body-text">${l(i.summary)}</p>
            <div class="tag-row">
              ${i.symptoms.slice(0,3).map(c=>v(c,"neutral")).join("")}
            </div>
          </div>
        </div>
        <div class="focus-card__actions">
          <button type="button" class="secondary-button" data-page="consult">去问诊</button>
          <button type="button" class="primary-button" data-disease-id="${i.id}">查看档案</button>
        </div>
      </section>

      <section class="strip-grid">
        <article class="strip-card">
          <div class="strip-card__head">
            <span class="eyebrow">今日提醒</span>
            ${d("实时","good")}
          </div>
          <strong>体温、咳嗽、接触史和睡眠都要连续记录。</strong>
          <span>如果发热或症状变化明显，先做居家观察和复测。</span>
        </article>
        <article class="strip-card">
          <div class="strip-card__head">
            <span class="eyebrow">复诊节奏</span>
            ${d("随访","warn")}
          </div>
          <strong>按病种安排痰检、肝功、病毒载量或复查提醒。</strong>
          <span>不要只看单次结果，趋势更重要。</span>
        </article>
        <article class="strip-card">
          <div class="strip-card__head">
            <span class="eyebrow">管理方向</span>
            ${d("传染病","neutral")}
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
          ${d(`${k(e)} · ${e}`,a)}
        </div>
        <div class="timeline">
          <div class="timeline-item">
            ${n("temperature","timeline-icon","体温")}
            <div>
              <strong>早晨记录体温和睡眠</strong>
              <span>发热或睡眠不足会明显影响恢复状态。</span>
            </div>
          </div>
          <div class="timeline-item">
            ${n("pressure","timeline-icon","血压")}
            <div>
              <strong>午间记录血压、血糖或心率</strong>
              <span>同步观察是否有乏力、气短或心悸。</span>
            </div>
          </div>
          <div class="timeline-item">
            ${n("record","timeline-icon","复查")}
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
          ${u.map(([c,h,D])=>`
                <button type="button" class="service-card" data-page="${c}">
                  ${n(c==="consult"?"consult":c==="health"?"health":c==="chronic"?"disease":c==="diet"?"diet":c==="constitution"?"constitution":c==="exercise"?"exercise":c==="encyclopedia"?"book":"lecture","service-card__icon",h)}
                  <strong>${h}</strong>
                  <span>${D}</span>
                </button>
              `).join("")}
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
          ${O(s).map(c=>`
                <article class="metric-card ${c.tone}">
                  <div class="metric-card__top">
                    <strong>${c.title}</strong>
                    <span>${c.note}</span>
                  </div>
                  <div class="metric-card__value">${c.value}</div>
                  <div class="meter"><i style="width:${c.percent}%"></i></div>
                </article>
              `).join("")}
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
          ${r.map((c,h)=>`
                <div class="alert-row ${h===0?"first":""}">
                  ${n("alert","mini-icon","提醒")}
                  <span>${l(c)}</span>
                </div>
              `).join("")}
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
          ${j.slice(0,4).map(F).join("")}
        </div>
      </section>
    </div>
  `}function F(s){const e=t.favorites.includes(s.id);return`
    <article class="content-card" data-content-id="${s.id}">
      <div class="content-card__head">
        ${n(s.icon,"content-card__icon",s.title)}
        <button type="button" class="favorite-button ${e?"is-active":""}" data-favorite-id="${s.id}" aria-label="${e?"取消收藏":"收藏"}">
          ${n("star","favorite-button__icon","收藏")}
        </button>
      </div>
      <span class="eyebrow">${s.category} · ${s.minutes}</span>
      <h4>${s.title}</h4>
      <p>${s.summary}</p>
      <div class="content-card__footer">
        ${s.points.slice(0,2).map(a=>v(a,"neutral")).join("")}
      </div>
    </article>
  `}function ts(){const s=["咳嗽咳痰两周","发热 38℃","黄疸和尿黄","手足口疱疹","HIV 高危暴露","体重下降和盗汗"];return`
    <div class="page-stack consult-page">
      <section class="section-card consult-banner">
        <div class="section-head">
          <div>
            <span class="eyebrow">AI 问诊服务</span>
            <h3>模拟医生回复</h3>
          </div>
          ${d("传染病方向","warn")}
        </div>
        <p>输入症状、持续时间、近期接触史和体温指标，系统会根据疾病方向给出模拟建议。</p>
        <div class="tag-row">
          ${s.map(e=>`<button type="button" class="chip" data-symptom-chip="${e}">${e}</button>`).join("")}
        </div>
      </section>

      <section class="section-card chat-card">
        <div class="chat-head">
          <div class="chat-head__meta">
            ${n("consult","chat-head__icon","问诊")}
            <div>
              <strong>中医云问诊助手</strong>
              <span>在线模拟 · 传染病辨证 · 生活方式建议</span>
            </div>
          </div>
          ${d(t.consultInsight.urgency,t.consultInsight.urgency==="稳定"?"good":t.consultInsight.urgency==="关注"?"warn":"danger")}
        </div>

        <div class="chat-list">
          ${t.messages.map(e=>`
                <div class="bubble ${e.role}">
                  ${q(e.text)}
                </div>
              `).join("")}
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">AI 结论</span>
            <h3>${t.consultInsight.diseaseName}方向</h3>
          </div>
          ${d(t.consultInsight.urgency,t.consultInsight.urgency==="稳定"?"good":t.consultInsight.urgency==="关注"?"warn":"danger")}
        </div>
        <p class="body-text">${l(t.consultInsight.summary)}</p>
        <div class="insight-list">
          <div class="insight-card">
            <span class="eyebrow">中医辨证</span>
            <strong>${l(t.consultInsight.tcm)}</strong>
          </div>
          <div class="insight-card">
            <span class="eyebrow">建议动作</span>
            <div class="stack-list">
              ${t.consultInsight.actions.map(e=>`<div class="stack-row">${n("record","mini-icon","建议")}<span>${l(e)}</span></div>`).join("")}
            </div>
          </div>
          <div class="insight-card danger">
            <span class="eyebrow">就医提醒</span>
            <strong>${l(t.consultInsight.warning)}</strong>
          </div>
        </div>
      </section>

      <form class="consult-dock" data-form="chat">
        <input id="chatInput" name="chatInput" placeholder="请输入症状、持续时间、接触史或最近指标..." />
        <button type="submit" class="primary-button">发送</button>
      </form>
    </div>
  `}function as(){const s=w(),e=I(s),a=M(e);return`
    <div class="page-stack">
      <section class="hero-card compact">
        <div class="hero-card__copy">
          <span class="eyebrow">当前评估</span>
          <h2>${e} 分 · ${k(e)}</h2>
          <p>围绕体温、血压、血糖、睡眠、心率和步数做综合判断。</p>
        </div>
        <div class="score-ring ${a}">
          <div class="score-ring__inner">
            <strong>${e}</strong>
            <span>综合评分</span>
            ${d(k(e),a)}
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
          ${H(s).map(i=>`<div class="alert-row">${n("alert","mini-icon","提醒")}<span>${l(i)}</span></div>`).join("")}
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">录入指标</span>
            <h3>健康检测</h3>
          </div>
          ${d("本地保存","good")}
        </div>
        <form class="metric-form" data-form="health">
          <label>血糖 (mmol/L)<input name="glucose" value="${s.glucose}" inputmode="decimal" /></label>
          <label>收缩压<input name="systolic" value="${s.systolic}" inputmode="numeric" /></label>
          <label>舒张压<input name="diastolic" value="${s.diastolic}" inputmode="numeric" /></label>
          <label>心率 (次/分)<input name="heartRate" value="${s.heartRate}" inputmode="numeric" /></label>
          <label>体温 (°C)<input name="temperature" value="${s.temperature}" inputmode="decimal" /></label>
          <label>睡眠 (小时)<input name="sleep" value="${s.sleep}" inputmode="decimal" /></label>
          <label>步数<input name="steps" value="${s.steps}" inputmode="numeric" /></label>
          <label>体重 (kg)<input name="weight" value="${s.weight}" inputmode="decimal" /></label>
          <label class="full">舌象<textarea name="tongue">${s.tongue}</textarea></label>
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
          ${O(s).map(i=>`
                <article class="metric-card ${i.tone}">
                  <div class="metric-card__top">
                    <strong>${i.title}</strong>
                    <span>${i.note}</span>
                  </div>
                  <div class="metric-card__value">${i.value}</div>
                  <div class="meter"><i style="width:${i.percent}%"></i></div>
                </article>
              `).join("")}
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
          ${t.metrics.slice(0,5).map(i=>`
                <div class="timeline-item">
                  ${n("chart","timeline-icon","记录")}
                  <div>
                    <strong>${l(i.date)}</strong>
                    <span>${l(i.temperature)}°C · ${l(i.systolic)}/${l(i.diastolic)} · ${l(i.glucose)} mmol/L · ${l(i.steps)} 步</span>
                  </div>
                </div>
              `).join("")}
        </div>
      </section>
    </div>
  `}function is(s){const e=t.favorites.includes(s.id);return`
    <div class="page-stack">
      <section class="hero-card disease-hero compact">
        <div class="hero-card__copy">
          <span class="eyebrow">重点疾病</span>
          <h2>${s.name}</h2>
          <p>${s.summary}</p>
          <div class="hero-card__chips">
            ${s.transmission.slice(0,3).map(a=>v(a,"neutral")).join("")}
          </div>
        </div>
        <button type="button" class="favorite-toggle ${e?"is-active":""}" data-favorite-id="${s.id}">
          ${n("star","favorite-toggle__icon","收藏")}
          <span>${e?"已收藏":"收藏"}</span>
        </button>
      </section>

      ${E(s)}
    </div>
  `}function E(s){return`
    <section class="section-card">
      <div class="section-head">
        <div>
          <span class="eyebrow">简介</span>
          <h3>${s.fullName}</h3>
        </div>
        ${d("传染病方向","warn")}
      </div>
      <p class="body-text">${l(s.note)}</p>
    </section>

    ${y("常见症状",s.symptoms)}
    ${y("中医常见证型",s.tcmPatterns)}
    ${y("日常管理建议",s.management)}
    ${y("饮食建议",s.diet)}
    ${y("运动注意事项",s.exercise)}
    ${y("传播与防护",s.transmission)}

    <section class="section-card danger-card">
      <div class="section-head">
        <div>
          <span class="eyebrow">就医提醒</span>
          <h3>危险信号</h3>
        </div>
        ${d("关注","danger")}
      </div>
      <p class="body-text">${l(s.warning)}</p>
    </section>
  `}function y(s,e){return`
    <section class="section-card">
      <div class="section-head">
        <div>
          <span class="eyebrow">模块</span>
          <h3>${s}</h3>
        </div>
      </div>
      <div class="stack-list">
        ${e.map(a=>`<div class="stack-row">${n("record","mini-icon","条目")}<span>${l(a)}</span></div>`).join("")}
      </div>
    </section>
  `}function ns(){return`
    <div class="page-stack">
      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">重点管理</span>
            <h3>${t.selectedDisease.name}</h3>
          </div>
          ${d("可切换","good")}
        </div>
        <p class="body-text">${l(t.selectedDisease.summary)}</p>
        <div class="tag-row">
          ${p.map(s=>`
                <button type="button" class="chip ${t.selectedDisease.id===s.id?"is-active":""}" data-disease-id="${s.id}">
                  ${s.name}
                </button>
              `).join("")}
        </div>
      </section>

      <section class="content-grid">
        ${p.map(s=>`
              <article class="content-card disease-card" data-disease-id="${s.id}">
                <div class="content-card__head">
                  ${n(s.icon,"content-card__icon",s.name)}
                  ${d(s.id===t.selectedDisease.id?"当前查看":"重点管理",s.id===t.selectedDisease.id?"warn":"neutral")}
                </div>
                <span class="eyebrow">${s.fullName}</span>
                <h4>${s.name}</h4>
                <p>${s.summary}</p>
                <div class="content-card__footer">
                  ${s.symptoms.slice(0,2).map(e=>v(e,"neutral")).join("")}
                </div>
              </article>
            `).join("")}
      </section>

      ${E(t.selectedDisease)}
    </div>
  `}function cs(){return`
    <div class="page-stack">
      <section class="hero-card compact">
        <div class="hero-card__copy">
          <span class="eyebrow">恢复期饮食</span>
          <h2>清淡高蛋白、补水、易消化</h2>
          <p>适合传染病恢复期的饮食原则，兼顾食疗和胃口管理。</p>
        </div>
        <div class="hero-card__art">
          ${n("diet","hero-art__icon","饮食")}
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
          ${os}
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
          ${rs}
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
          <div class="stack-row">${n("record","mini-icon","原则")}<span>恢复期优先补足蛋白质和水分，防止体力下降。</span></div>
          <div class="stack-row">${n("record","mini-icon","原则")}<span>发热、咽痛或胃口差时，先选择温热软食。</span></div>
          <div class="stack-row">${n("record","mini-icon","原则")}<span>不要盲目进补，也不要长期过度节食。</span></div>
        </div>
      </section>
    </div>
  `}const os=["山药","百合","银耳","鸡蛋","鱼肉","冬瓜","青菜","小米"].map(s=>v(s,"good")).join(""),rs=["酒精","霉变食物","生冷食品","重油夜宵","烧烤辛辣","过甜饮料"].map(s=>v(s,"danger")).join("");function ls(){const s=t.constitutionResult;return`
    <div class="page-stack">
      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">九种体质</span>
            <h3>问卷填写</h3>
          </div>
          ${d("提交后出结果","good")}
        </div>
        <form class="constitution-form" data-form="constitution">
          ${x.map((e,a)=>`
                <label class="question-card">
                  <span class="question-card__title">${e.type}</span>
                  <span class="question-card__prompt">${e.prompt}</span>
                  <select name="q${a}">
                    <option value="1">很少</option>
                    <option value="3" selected>有时</option>
                    <option value="5">经常</option>
                  </select>
                </label>
              `).join("")}
          <button type="submit" class="primary-button full">生成体质结果</button>
        </form>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">辨识结果</span>
            <h3>${s?s.type:"等待提交"}</h3>
          </div>
          ${d(s?`得分 ${s.score}`:"未完成",s?"warn":"neutral")}
        </div>
        <p class="body-text">${s?l(s.summary):"提交问卷后，会根据最高分体质给出调理建议。"}</p>
        ${s?`<div class="tag-row">${s.focus.map(e=>v(e,"neutral")).join("")}</div>`:""}
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">调理建议</span>
            <h3>对症方向</h3>
          </div>
        </div>
        <div class="stack-list">
          ${(s?s.advice:["先完成问卷，再查看对应调理建议。","本 App 默认给出保守的日常管理方向。"]).map(e=>`<div class="stack-row">${n("tcm","mini-icon","建议")}<span>${l(e)}</span></div>`).join("")}
        </div>
      </section>
    </div>
  `}function ds(){const s=w(),e=Number(s.temperature)<37.3&&Number(s.heartRate)<100;return`
    <div class="page-stack">
      <section class="hero-card compact">
        <div class="hero-card__copy">
          <span class="eyebrow">今日运动建议</span>
          <h2>${e?"可以做轻量活动":"先休息再运动"}</h2>
          <p>${e?"当前体温和心率相对平稳，适合低到中等强度恢复。":"体温或心率存在波动，先观察和休息更稳妥。"}</p>
        </div>
        <div class="score-ring ${e?"good":"warn"}">
          <div class="score-ring__inner">
            <strong>${e?"可":"缓"}</strong>
            <span>运动建议</span>
            ${d(e?"可活动":"先休息",e?"good":"warn")}
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
            ${n("home","timeline-icon","散步")}
            <div>
              <strong>散步 20-30 分钟</strong>
              <span>优先平路和稳定节奏，避免拼速度。</span>
            </div>
          </div>
          <div class="timeline-item">
            ${n("morning","timeline-icon","八段锦")}
            <div>
              <strong>八段锦或舒缓拉伸 10-15 分钟</strong>
              <span>适合恢复期，动作幅度以舒适为准。</span>
            </div>
          </div>
          <div class="timeline-item">
            ${n("exercise","timeline-icon","呼吸")}
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
          <div class="stack-row">${n("steps","mini-icon","步数")}<span>发热、咯血、明显乏力或腹泻时，先停下运动。</span></div>
          <div class="stack-row">${n("steps","mini-icon","步数")}<span>退热后再逐步恢复，不要一口气回到高强度。</span></div>
          <div class="stack-row">${n("steps","mini-icon","步数")}<span>以“不加重症状”为第一标准，而不是追求卡路里。</span></div>
        </div>
      </section>
    </div>
  `}function L(s){const e=j.filter(i=>i.category===s),a=e[0];return`
    <div class="page-stack">
      <section class="hero-card compact">
        <div class="hero-card__copy">
          <span class="eyebrow">${s}</span>
          <h2>${s==="百科"?"传染病科普与辨证思路":"视频课程与讲堂内容"}</h2>
          <p>${s==="百科"?"围绕传播途径、证型、食疗和误区做分模块内容。":"围绕发热、结核、肝炎和恢复期运动做课程内容。"}</p>
        </div>
        <div class="hero-card__art">
          ${n(s==="百科"?"book":"lecture","hero-art__icon",s)}
        </div>
      </section>

      ${a?us(a):""}

      <section class="content-grid">
        ${e.map(F).join("")}
      </section>
    </div>
  `}function us(s){return`
    <section class="section-card featured-card">
      <div class="section-head">
        <div>
          <span class="eyebrow">推荐阅读</span>
          <h3>${s.title}</h3>
        </div>
        ${d(s.category,"warn")}
      </div>
      <p class="body-text">${l(s.detail)}</p>
      <div class="tag-row">
        ${s.points.map(e=>v(e,"neutral")).join("")}
      </div>
    </section>
  `}function ps(){const s=w();return`
    <div class="page-stack">
      <section class="hero-card compact">
        <div class="hero-card__copy">
          <span class="eyebrow">个人档案</span>
          <h2>${t.user?.name??"健康用户"}</h2>
          <p>${t.user?.phone??"未登录"} · 本地演示账号 · 传染病方向管理</p>
        </div>
        <div class="profile-avatar">
          ${n("profile","profile-avatar__icon","头像")}
        </div>
      </section>

      <section class="section-card">
        <div class="section-head">
          <div>
            <span class="eyebrow">档案信息</span>
            <h3>基础资料</h3>
          </div>
          ${d("本地保存","good")}
        </div>
        <div class="stack-list">
          <div class="stack-row">${n("record","mini-icon","病史")}<span>疾病史：当前重点围绕肺结核、病毒性肝炎和流感管理。</span></div>
          <div class="stack-row">${n("record","mini-icon","过敏")}<span>过敏史：暂未填写，可在后续版本继续扩展。</span></div>
          <div class="stack-row">${n("record","mini-icon","家族史")}<span>家族史：本地演示信息，可配合实际使用场景修改。</span></div>
          <div class="stack-row">${n("record","mini-icon","体检")}<span>最近体检：${s.date} · ${s.temperature}°C · ${s.systolic}/${s.diastolic} · ${s.glucose} mmol/L</span></div>
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
          ${[{label:"收藏内容",value:t.favorites.length.toString(),icon:"star"},{label:"检测记录",value:t.metrics.length.toString(),icon:"chart"},{label:"当前评分",value:I(s).toString(),icon:"health"},{label:"关注方向",value:"传染病",icon:"disease"}].map(e=>`
                <article class="metric-card">
                  <div class="metric-card__top">
                    <strong>${e.label}</strong>
                    ${n(e.icon,"mini-icon",e.label)}
                  </div>
                  <div class="metric-card__value">${e.value}</div>
                  <span class="metric-card__hint">设备本地保存</span>
                </article>
              `).join("")}
        </div>
      </section>
    </div>
  `}function vs(){return`
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
          <div class="stack-row">${n("settings","mini-icon","设置")}<span>内容仅用于健康管理与科普，不能替代医生诊断和治疗。</span></div>
          <div class="stack-row">${n("settings","mini-icon","设置")}<span>如出现危险信号，请前往正规医疗机构就诊。</span></div>
          <div class="stack-row">${n("settings","mini-icon","设置")}<span>清除数据后，当前设备上的账号和记录会一起移除。</span></div>
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
          <div class="stack-row">${n("app","mini-icon","App")}<span>移动端优先的 Web App / PWA + Capacitor Android。</span></div>
          <div class="stack-row">${n("app","mini-icon","App")}<span>支持浏览器预览、构建和 APK 打包测试。</span></div>
        </div>
      </section>
    </div>
  `}function z(){if(!t.user){S.innerHTML=ss();return}const s={home:es(),consult:ts(),health:as(),chronic:ns(),diet:cs(),constitution:ls(),exercise:ds(),encyclopedia:L("百科"),lecture:L("讲堂"),profile:ps(),settings:vs(),disease:is(t.selectedDisease)}[t.page];S.innerHTML=Z(s)}function m(){z()}function ms(s,e,a){t.modal={title:s,body:e,points:a},m()}function hs(){t.modal=null,m()}function gs(s){t.favorites.includes(s)?t.favorites=t.favorites.filter(e=>e!==s):t.favorites=[...t.favorites,s],b(),m()}function bs(){window.confirm("确定清空本地账号、检测、问诊和收藏数据吗？")&&(localStorage.removeItem(N),t.user=null,t.metrics=[...C],t.messages=[{role:"ai",text:"您好，我是中医云健康 AI 问诊助手。请描述症状、持续时间、接触史和最近指标，我会结合传染病方向给出模拟建议。"}],t.favorites=[],t.selectedDisease=p[1],t.consultInsight=_("",t.selectedDisease),t.constitutionResult=null,window.alert("本地数据已清除"),m())}function B(s){const e=s.trim();if(!e)return;const a=W(e);t.selectedDisease=a,t.messages.push({role:"me",text:e}),t.messages.push({role:"ai",text:Q(e,a)}),t.consultInsight=_(e,a),b(),m()}function $s(s){const e=new FormData(s);t.metrics.unshift({glucose:String(e.get("glucose")??""),systolic:String(e.get("systolic")??""),diastolic:String(e.get("diastolic")??""),heartRate:String(e.get("heartRate")??""),temperature:String(e.get("temperature")??""),sleep:String(e.get("sleep")??""),steps:String(e.get("steps")??""),weight:String(e.get("weight")??""),tongue:String(e.get("tongue")??""),date:new Date().toLocaleDateString("zh-CN")}),b(),m()}function fs(s){const e=new FormData(s),i=x.map((r,u)=>({type:r.type,score:Number(e.get(`q${u}`)??1),guidance:r.guidance})).sort((r,u)=>u.score-r.score)[0],o=R[i.type]??R.平和质;t.constitutionResult={type:i.type,score:i.score,summary:i.guidance,advice:o.advice,focus:o.focus},b(),m()}function ys(s){const e=J(s);e&&ms(e.title,`${e.summary}

${e.detail}`,e.points)}function ws(s){t.selectedDisease=g(s),t.previousPage=t.page,t.page="disease",b(),m(),window.scrollTo({top:0,behavior:"smooth"})}function _s(s){t.selectedDisease=g(s),b(),m()}function Is(s){const e=s.target,a=e.closest("[data-page]");if(a){const $=a.dataset.page;A($);return}const i=e.closest("[data-auth-mode]");if(i){t.authMode=i.dataset.authMode==="register"?"register":"login",b(),m();return}const o=e.closest("[data-action]");if(o){const $=o.dataset.action;$==="back"?A(t.previousPage??"home"):$==="close-modal"?hs():$==="clear-data"&&bs();return}const r=e.closest("[data-favorite-id]");if(r){gs(r.dataset.favoriteId??"");return}const u=e.closest("[data-select-disease-id]");if(u){_s(u.dataset.selectDiseaseId??"");return}const c=e.closest("[data-disease-id]");if(c){ws(c.dataset.diseaseId??"");return}const h=e.closest("[data-content-id]");if(h){ys(h.dataset.contentId??"");return}const D=e.closest("[data-symptom-chip]");if(D){const $=D.dataset.symptomChip??"";B($)}}function ks(s){const e=s.target;if(e.dataset.form==="auth"){s.preventDefault();const a=new FormData(e);t.user={name:String(a.get("name")||"健康用户"),phone:String(a.get("phone")||""),password:String(a.get("password")||"")},b(),A("home");return}if(e.dataset.form==="chat"){s.preventDefault();const a=e.querySelector("#chatInput");B(a?.value??""),a&&(a.value="");return}if(e.dataset.form==="health"){s.preventDefault(),$s(e);return}e.dataset.form==="constitution"&&(s.preventDefault(),fs(e))}function Ds(){S.addEventListener("click",Is),S.addEventListener("submit",ks)}G();Ds();z();
