# 设计说明

## 来源

本项目以 `C:/Users/Administrator/Desktop/中医云健康APP/index.html` 为原型。原文件是一个纯静态单页应用，包含内联 HTML、CSS、JavaScript。重构后拆分为：

- `index.html`：Vite 入口
- `src/main.ts`：页面渲染、状态管理和交互逻辑
- `src/styles.css`：移动端 UI 样式
- `capacitor.config.ts`：Android 打包配置

## 设计取向

整体延续原型中的中医云健康主题，但减少单文件中的装饰负担，改成更适合手机测试的摘要式界面：

- 浅灰背景
- 白色卡片
- 绿色医疗主色
- 红色健康评分强调色
- 底部五栏导航
- 点击疾病/文章进入详情或弹窗

2026-06-08 布局升级后，界面更靠近国内健康管理 App：

- 首页从功能清单改为健康仪表盘，包含评分、风险、待办、服务入口和推荐内容。
- 子页面统一为“页面头部 + 核心操作区 + 数据/内容卡片 + 次级信息区”的结构。
- AI 问诊页改为聊天式问诊，带症状快捷标签、模拟回复和结构化建议卡。
- 健康检测页改为指标录入与风险状态并列呈现。
- 传染病管理、百科、讲堂都增加列表、标签、收藏和详情弹窗，减少纯文字堆叠。

## 数据设计

应用不连接真实后端，使用 `localStorage` 保存：

- 用户登录信息
- 健康检测记录
- 问诊聊天记录
- 收藏数据

键名：

```text
tcm-cloud-mobile-state
```

## APK 方案

使用 Capacitor Android。Vite 构建后的 `dist/` 会作为 WebView 内容同步到 Android 工程。

推荐调试流程：

1. `npm run dev` 先在浏览器完成 UI 和交互调试。
2. `npm run build` 检查 TypeScript 和构建。
3. `npx cap add android` 初始化 Android 工程。
4. `npm run cap:sync` 同步 Web 产物。
5. `npm run cap:open` 用 Android Studio 真机或模拟器调试。

## 后续可扩展

- 接真实后端 API。
- 增加真实用户体系。
- 增加推送提醒。
- 增加离线课程资源。
- 增加 Android 图标和启动页定制。
- 将疾病、课程、百科数据迁移到独立 JSON 或后端 CMS。
