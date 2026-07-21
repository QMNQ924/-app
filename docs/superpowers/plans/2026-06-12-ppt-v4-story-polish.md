# PPT v4 Story Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current PPT from a functional checklist into a smoother product-report story.

**Architecture:** Keep the existing `build-redesign.cjs` pipeline and v3 layout fixes. Update narrative copy, replace slides 9 and 10 with product completion and roadmap pages, and output v4 files without overwriting v3.

**Tech Stack:** Node.js, pptxgenjs, PowerPoint COM export, local PNG preview QA.

---

### Task 1: Refine Story Copy

**Files:**
- Modify: `outputs/manual-20260608-ppt-redesign/presentations/tcm-health-redesign/build-redesign.cjs`

- [ ] Replace rigid checklist-style titles with user-journey/product-report wording.
- [ ] Keep the existing safe layout coordinates from v3.
- [ ] Update the claim spine note so the deck reads as a continuous report.

### Task 2: Replace Closing Slides

**Files:**
- Modify: `outputs/manual-20260608-ppt-redesign/presentations/tcm-health-redesign/build-redesign.cjs`

- [ ] Change slide 9 from PPT-design QA to product completion.
- [ ] Change slide 10 from delivery checklist to next-step roadmap.
- [ ] Point output names to `v4`.

### Task 3: Verify

**Files:**
- Output: `outputs/manual-20260608-ppt-redesign/output/中医云健康App汇报-新版-v4.pptx`
- Output: `outputs/manual-20260608-ppt-redesign/presentations/tcm-health-redesign/preview-v4`
- Output: `outputs/manual-20260608-ppt-redesign/presentations/tcm-health-redesign/qa/redesign-contact-sheet-v4.png`

- [ ] Generate the deck.
- [ ] Export PowerPoint previews at 1920x1080.
- [ ] Inspect key full-size slides and the contact sheet.
- [ ] Run file-level checks for slide count, 16:9 size, media, and preview count.
