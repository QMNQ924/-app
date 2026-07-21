# 中医云健康 App

面向传染病方向的移动端健康管理演示项目，适合在浏览器预览，也可以通过 Capacitor 打包为 Android APK 在手机或模拟器中测试。

## 技术栈

- Vite
- TypeScript
- 原生 HTML/CSS/TS 渲染
- Capacitor Android
- localStorage 本地 mock 数据
- Web App Manifest / PWA 基础配置

## 页面与功能

- 登录 / 注册：手机号或账号本地登录。
- 首页健康仪表盘：健康评分、传染病重点风险、今日待办、服务入口、健康指标摘要。
- AI 在线问诊：聊天式交互，按症状模拟生成传染病方向建议。
- 健康检测：录入血糖、血压、心率、体温、睡眠、步数、体重和舌象。
- 传染病管理：内置艾滋病、肺结核、病毒性肝炎、流感、手足口病 5 个疾病档案。
- 膳食管理：恢复期食疗、一日食谱、适合与忌口食材。
- 体质辨识：九种中医体质问卷与结果建议。
- 运动管理：恢复期运动计划、步数和强度注意事项。
- 中医百科：传播途径、证型、隔离、食疗和误区科普。
- 健康讲堂：课程列表、视频课程占位和收藏。
- 个人档案：用户信息、病史、过敏史、家族史、体检记录。
- 设置与隐私：本地数据清除、隐私说明和免责声明。

## 运行

```bash
npm install
npm run dev
```

默认访问：

```text
http://localhost:5173/
```

## 构建

```bash
npm run build
```

构建产物位于：

```text
dist/
```

## Android / APK

同步 Web 产物到 Android 工程：

```bash
npm run cap:sync
```

构建 debug APK：

```bash
npm run android:debug
```

Windows 当前环境可优先使用：

```bash
npm run android:debug:win
```

APK 通常位于：

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 数据说明

本项目不连接真实后端。登录、检测记录、问诊记录、收藏和体质结果均保存在当前设备的 `localStorage` 中，键名为：

```text
tcm-cloud-mobile-state
```

## 医疗提示

应用内容仅用于健康管理与科普演示，不能替代医生诊断和治疗。如出现危险信号或病情变化，请及时到正规医疗机构就诊。
