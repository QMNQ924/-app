# HTML Deck Product Presentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the v4 PPT report into a more visually impactful HTML presentation with slide-like click, wheel, keyboard, and touch navigation.

**Architecture:** Build a static HTML deck under `outputs/html-deck-tcm-health`. Use native HTML/CSS/JS rather than embedding slide screenshots as the primary content; reuse app screenshots and generated hero artwork as product proof objects. Keep the deck standalone and easy to preview through a simple local static server.

**Tech Stack:** HTML, CSS, vanilla JavaScript, existing PNG/SVG assets, local Node static server for verification.

---

### Task 1: Prepare Assets

**Files:**
- Create: `outputs/html-deck-tcm-health/assets/*`

- [ ] Copy app screenshots from `outputs/manual-20260608-ppt-redesign/presentations/tcm-health-redesign/screens`.
- [ ] Copy `image2-health-hero.png` and generated SVG artwork from `outputs/manual-20260608-ppt-redesign/presentations/tcm-health-redesign/assets`.
- [ ] Keep filenames stable so HTML references remain simple.

### Task 2: Build Static Deck

**Files:**
- Create: `outputs/html-deck-tcm-health/index.html`
- Create: `outputs/html-deck-tcm-health/styles.css`
- Create: `outputs/html-deck-tcm-health/deck.js`

- [ ] Create 10 full-screen slides matching the v4 narrative.
- [ ] Use stronger product-design treatment: large type, dark hero bands, layered glass cards, product screenshots, progress navigation, and motion.
- [ ] Implement click, wheel, keyboard, and touch slide switching.
- [ ] Include a compact page indicator and progress rail.

### Task 3: Verify

**Files:**
- Output: `outputs/html-deck-tcm-health/qa/*.png`

- [ ] Start a local static server.
- [ ] Use browser automation to load the deck.
- [ ] Verify initial slide, click next, wheel next, keyboard navigation, and touch-equivalent behavior through DOM state.
- [ ] Capture desktop and mobile screenshots to confirm visual layout.
