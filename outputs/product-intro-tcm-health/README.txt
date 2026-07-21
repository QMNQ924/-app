中医云健康 App 产品介绍页

用途：
- 这是一个独立的 HTML 产品介绍页，用来替代 PPT 风格演示。
- 页面围绕传染病健康管理 App 展开，包含产品价值、功能展示、疾病场景、交付链路和结尾行动区。

运行方式：
1. 可直接双击 index.html 预览。
2. 推荐使用本地静态服务预览，以确保图片和脚本加载行为与线上一致。

文件：
- index.html：页面结构
- styles.css：视觉系统、响应式布局和动效
- app.js：canvas 动画、滚动进度、功能截图切换、疾病场景切换
- assets/：App 截图和视觉资产

性能策略：
- canvas 动画限制粒子数量和 DPR，低性能设备自动降低负载。
- 页面隐藏时暂停动画。
- 滚动状态更新统一放入 requestAnimationFrame。
- 主要动效只使用 transform 和 opacity。
- 支持 prefers-reduced-motion。
