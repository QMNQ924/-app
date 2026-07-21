import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "public", "ui-icons");
mkdirSync(outDir, { recursive: true });

const palettes = {
  teal: ["#0f8f83", "#42d3c5"],
  rose: ["#ef476f", "#ff8fab"],
  blue: ["#3772ff", "#7aa7ff"],
  amber: ["#f59e0b", "#ffd166"],
  green: ["#22a06b", "#8be0b2"],
  purple: ["#7c3aed", "#b49cff"],
  cyan: ["#0891b2", "#67e8f9"],
  slate: ["#475569", "#94a3b8"]
};

const icons = {
  app: {
    palette: "teal",
    body: `<path d="M32 13v38M13 32h38" stroke="white" stroke-width="7" stroke-linecap="round"/><path d="M20 18c3-4 7-6 12-6s9 2 12 6" stroke="white" stroke-width="4" stroke-linecap="round" opacity=".75"/>`
  },
  home: {
    palette: "teal",
    body: `<path d="M15 31 32 16l17 15" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 29v18h22V29" stroke="white" stroke-width="5" stroke-linejoin="round"/><path d="M29 47V35h6v12" stroke="white" stroke-width="4" stroke-linejoin="round"/>`
  },
  consult: {
    palette: "blue",
    body: `<path d="M17 20h30v25H28l-9 7v-7h-2z" fill="none" stroke="white" stroke-width="5" stroke-linejoin="round"/><path d="M25 29h14M25 37h9" stroke="white" stroke-width="4" stroke-linecap="round"/>`
  },
  health: {
    palette: "rose",
    body: `<path d="M32 50S15 40 15 26c0-7 9-11 17-3 8-8 17-4 17 3 0 14-17 24-17 24z" fill="white"/><path d="M20 33h7l4-8 5 14 3-6h5" stroke="#ef476f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  disease: {
    palette: "purple",
    body: `<circle cx="32" cy="32" r="13" fill="none" stroke="white" stroke-width="5"/><path d="M32 12v8M32 44v8M12 32h8M44 32h8M18 18l6 6M40 40l6 6M46 18l-6 6M24 40l-6 6" stroke="white" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="32" r="4" fill="white"/>`
  },
  profile: {
    palette: "slate",
    body: `<circle cx="32" cy="25" r="9" fill="white"/><path d="M17 50c3-10 11-15 15-15s12 5 15 15" fill="white"/>`
  },
  temperature: {
    palette: "rose",
    body: `<path d="M28 34V17a7 7 0 0 1 14 0v17a13 13 0 1 1-14 0z" fill="none" stroke="white" stroke-width="5" stroke-linejoin="round"/><path d="M35 20v23" stroke="white" stroke-width="5" stroke-linecap="round"/>`
  },
  pressure: {
    palette: "blue",
    body: `<circle cx="32" cy="32" r="18" fill="none" stroke="white" stroke-width="5"/><path d="M32 32l10-10M22 42h20" stroke="white" stroke-width="5" stroke-linecap="round"/><path d="M21 28a12 12 0 0 1 22 0" stroke="white" stroke-width="4" stroke-linecap="round" opacity=".75"/>`
  },
  sleep: {
    palette: "purple",
    body: `<path d="M43 43A20 20 0 0 1 24 16a20 20 0 1 0 24 24c-2 2-3 3-5 3z" fill="white"/><path d="M39 18h10l-10 10h10" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  steps: {
    palette: "green",
    body: `<path d="M23 18c6 0 8 5 6 10l-3 7c-2 5-11 2-9-4l2-6c1-4-2-7 4-7zM40 28c5 0 7 4 5 9l-2 6c-2 5-10 3-9-3l2-5c1-4-1-7 4-7z" fill="white"/>`
  },
  alert: {
    palette: "amber",
    body: `<path d="M32 13 52 48H12z" fill="white"/><path d="M32 25v11" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/><circle cx="32" cy="43" r="3" fill="#f59e0b"/>`
  },
  record: {
    palette: "cyan",
    body: `<path d="M18 16h28v35H18z" fill="none" stroke="white" stroke-width="5" stroke-linejoin="round"/><path d="M24 26h16M24 34h16M24 42h10" stroke="white" stroke-width="4" stroke-linecap="round"/>`
  },
  chart: {
    palette: "blue",
    body: `<path d="M17 47h31" stroke="white" stroke-width="5" stroke-linecap="round"/><rect x="20" y="31" width="7" height="16" rx="3" fill="white"/><rect x="30" y="22" width="7" height="25" rx="3" fill="white"/><rect x="40" y="15" width="7" height="32" rx="3" fill="white"/>`
  },
  diet: {
    palette: "green",
    body: `<path d="M20 25c0-8 5-13 12-13s12 5 12 13c0 11-7 24-12 24S20 36 20 25z" fill="white"/><path d="M32 13c3 5 8 7 14 7" stroke="#22a06b" stroke-width="4" stroke-linecap="round"/><path d="M32 13c-2 5-6 7-12 7" stroke="#22a06b" stroke-width="4" stroke-linecap="round"/>`
  },
  constitution: {
    palette: "teal",
    body: `<circle cx="32" cy="32" r="19" fill="none" stroke="white" stroke-width="5"/><path d="M32 13a19 19 0 0 1 0 38 9.5 9.5 0 0 0 0-19 9.5 9.5 0 0 1 0-19z" fill="white"/><circle cx="32" cy="23" r="3" fill="#0f8f83"/><circle cx="32" cy="41" r="3" fill="white"/>`
  },
  exercise: {
    palette: "amber",
    body: `<circle cx="32" cy="16" r="6" fill="white"/><path d="M31 25l-7 9 8 5 7 11M32 25l9 8M25 50l7-11M23 34l-8 2M41 33l8-5" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  book: {
    palette: "blue",
    body: `<path d="M17 17h17c4 0 7 3 7 7v25H24c-4 0-7-3-7-7z" fill="none" stroke="white" stroke-width="5" stroke-linejoin="round"/><path d="M41 19h6v30h-6M24 27h10M24 35h10" stroke="white" stroke-width="4" stroke-linecap="round"/>`
  },
  lecture: {
    palette: "rose",
    body: `<rect x="15" y="19" width="34" height="25" rx="7" fill="none" stroke="white" stroke-width="5"/><path d="M29 27v10l10-5z" fill="white"/><path d="M22 51h20" stroke="white" stroke-width="5" stroke-linecap="round"/>`
  },
  shield: {
    palette: "teal",
    body: `<path d="M32 12c8 7 18 8 18 8v13c0 12-7 21-18 25-11-4-18-13-18-25V20s10-1 18-8z" fill="white"/><path d="M25 33l5 5 10-12" stroke="#0f8f83" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  lung: {
    palette: "cyan",
    body: `<path d="M32 15v34M31 29c-6-8-14-9-17 0-2 7 0 17 8 19 7 2 9-8 9-19zM33 29c6-8 14-9 17 0 2 7 0 17-8 19-7 2-9-8-9-19z" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  dna: {
    palette: "purple",
    body: `<path d="M21 15c22 8 22 26 0 34M43 15c-22 8-22 26 0 34M24 23h16M23 32h18M24 41h16" stroke="white" stroke-width="5" stroke-linecap="round"/>`
  },
  child: {
    palette: "amber",
    body: `<circle cx="32" cy="23" r="10" fill="white"/><path d="M18 51c3-12 10-18 14-18s11 6 14 18" fill="white"/><path d="M25 24h.1M39 24h.1M28 30c2 2 6 2 8 0" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>`
  },
  morning: {
    palette: "amber",
    body: `<circle cx="32" cy="27" r="12" fill="white"/><path d="M14 45h36M32 10v6M18 18l4 4M46 18l-4 4" stroke="white" stroke-width="5" stroke-linecap="round"/>`
  },
  tcm: {
    palette: "teal",
    body: `<path d="M32 12c8 9 16 18 16 27a16 16 0 0 1-32 0c0-9 8-18 16-27z" fill="white"/><path d="M24 39c5 4 11 4 16 0" stroke="#0f8f83" stroke-width="4" stroke-linecap="round"/>`
  },
  star: {
    palette: "amber",
    body: `<path d="m32 12 6 13 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2z" fill="white"/>`
  },
  settings: {
    palette: "slate",
    body: `<path d="M32 22a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" fill="none" stroke="white" stroke-width="5"/><path d="M32 12v7M32 45v7M12 32h7M45 32h7M18 18l5 5M41 41l5 5M46 18l-5 5M23 41l-5 5" stroke="white" stroke-width="4" stroke-linecap="round"/>`
  }
};

for (const [name, icon] of Object.entries(icons)) {
  const [a, b] = palettes[icon.palette];
  const svg = `<svg width="96" height="96" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="g" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse"><stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient><filter id="s" x="0" y="0" width="64" height="64" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="${a}" flood-opacity=".22"/></filter></defs>
<rect x="6" y="6" width="52" height="52" rx="18" fill="url(#g)" filter="url(#s)"/>
${icon.body}
</svg>`;
  writeFileSync(join(outDir, `${name}.svg`), svg, "utf8");
}

console.log(`Generated ${Object.keys(icons).length} UI icons in ${outDir}`);
