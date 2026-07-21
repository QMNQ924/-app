# Product Intro Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new high-impact product introduction page for the TCM Cloud Health App, independent from the existing PPT-style HTML deck, with smooth animated transitions and verified low-jank performance.

**Architecture:** Create a standalone static site under `outputs/product-intro-tcm-health`. Reuse existing app screenshots and generated hero artwork, but rebuild the layout as a scroll-driven product landing page with section snap, canvas background motion, transform-only cards, and lightweight carousel/state transitions. Avoid heavy render patterns such as large `backdrop-filter`, `transition: all`, and keeping all animated layers active.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, local PNG/SVG assets, Chrome/Puppeteer verification.

---

### Task 1: Prepare Output and Assets

**Files:**
- Create: `outputs/product-intro-tcm-health/index.html`
- Create: `outputs/product-intro-tcm-health/styles.css`
- Create: `outputs/product-intro-tcm-health/app.js`
- Create: `outputs/product-intro-tcm-health/assets/*`

- [ ] Copy existing screenshots and hero assets from `outputs/html-deck-tcm-health/assets`.
- [ ] Keep this introduction page separate from `outputs/html-deck-tcm-health`.
- [ ] Create a short local `README.txt` explaining how to open the page.

### Task 2: Build Product Intro Experience

**Files:**
- Modify: `outputs/product-intro-tcm-health/index.html`
- Modify: `outputs/product-intro-tcm-health/styles.css`
- Modify: `outputs/product-intro-tcm-health/app.js`

- [ ] Hero: dark cinematic intro with animated health-data canvas, strong product claim, and floating phone stack.
- [ ] Value section: three interactive cards for risk, consult, and follow-up.
- [ ] Feature showcase: phone screenshot carousel driven by click, wheel-safe controls, and keyboard.
- [ ] Disease scene: clickable disease chips that update content and visual emphasis.
- [ ] Tech/Delivery section: animated pipeline for local data, Capacitor, APK, and next-stage expansion.
- [ ] End section: compact CTA row for opening the old HTML deck, checking screenshots, and returning to top.

### Task 3: Performance Rules

**Files:**
- Modify: `outputs/product-intro-tcm-health/styles.css`
- Modify: `outputs/product-intro-tcm-health/app.js`

- [ ] Animate only `transform`, `opacity`, and canvas pixels.
- [ ] Use `content-visibility:auto` on off-screen sections.
- [ ] Use `IntersectionObserver` to activate section animations only when visible.
- [ ] Cap canvas particle count and pause canvas updates when the tab is hidden.
- [ ] Support `prefers-reduced-motion`.

### Task 4: Verification

**Files:**
- Create: `outputs/product-intro-tcm-health/qa/*`

- [ ] Start a local static server.
- [ ] Use Puppeteer to verify page load, nav anchors, feature carousel, disease chip switching, keyboard interactions, and mobile viewport.
- [ ] Measure frame intervals during scroll/carousel/chip interactions.
- [ ] Target: p95 frame interval <= 18ms and over-33ms frames close to 0 on the automated desktop run.
- [ ] Export desktop, mobile, and contact-sheet screenshots.
