/**
 * Gera as 8 screenshots oficiais em INGLÊS (4 Round + 4 Square)
 * Formato: 360x360 px, PNG
 */
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const sharpPath = pathToFileURL('C:/Users/aprom/AppData/Roaming/npm/node_modules/@zeppos/zeus-cli/node_modules/sharp/lib/index.js').href;
const sharp = (await import(sharpPath)).default;

const outDir = path.resolve('./store_assets/en');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// ==========================================
// 1. ROUND SCREENSHOTS (INGLÊS)
// ==========================================

// Round 1: Dashboard Home
const svgRound1 = `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="cClip1"><circle cx="180" cy="180" r="180" /></clipPath>
    <linearGradient id="gCard" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#162032" /><stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  </defs>
  <g clip-path="url(#cClip1)">
    <rect width="360" height="360" fill="#000000" />
    <text x="180" y="34" fill="#38bdf8" font-size="20" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">ANGLER MAX 🎣</text>
    <text x="180" y="52" fill="#94a3b8" font-size="13" font-family="Arial, sans-serif" text-anchor="middle">Monday, September 14</text>

    <!-- Language and Dark Mode buttons -->
    <rect x="58" y="60" width="116" height="26" rx="8" fill="#1e293b" />
    <text x="116" y="78" fill="#f97316" font-size="11" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">🌐 PT/EN ▾</text>
    <rect x="186" y="60" width="116" height="26" rx="8" fill="#1e293b" />
    <text x="244" y="78" fill="#38bdf8" font-size="11" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">🌙 DARK ▾</text>

    <!-- Card 1: Lunar & Solunar -->
    <rect x="28" y="94" width="304" height="142" rx="14" fill="url(#gCard)" stroke="#1e293b" stroke-width="1.5" />
    <text x="180" y="118" fill="#ffffff" font-size="18" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">WAXING CRESCENT 🌒</text>
    <text x="180" y="138" fill="#f97316" font-size="13" font-family="Arial, sans-serif" text-anchor="middle">Illumination: 23% • Age: 3.7d</text>
    <text x="180" y="160" fill="#10b981" font-size="15" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">FISHING: GOOD ★★★☆</text>
    <text x="180" y="180" fill="#94a3b8" font-size="11.5" font-family="Arial, sans-serif" text-anchor="middle">Feeding activity rising for active fish</text>
    <text x="180" y="200" fill="#38bdf8" font-size="12" font-family="Arial, sans-serif" text-anchor="middle">Major Peak: 01:57 PM - 03:57 PM</text>
    <text x="180" y="218" fill="#64748b" font-size="11" font-family="Arial, sans-serif" text-anchor="middle">Minor Peak: 07:57 PM - 08:57 PM</text>

    <!-- Card 2: Barometer -->
    <rect x="28" y="244" width="304" height="84" rx="14" fill="url(#gCard)" stroke="#10b981" stroke-width="1.5" />
    <text x="44" y="266" fill="#94a3b8" font-size="11.5" font-family="Arial, sans-serif">BAROMETER &amp; PRESSURE</text>
    <text x="44" y="288" fill="#10b981" font-size="14.5" font-family="Arial, sans-serif" font-weight="bold">🧭 High (1018 hPa) • Fair Weather</text>
    <text x="44" y="308" fill="#ffffff" font-size="11.5" font-family="Arial, sans-serif">Excellent! Fish actively feeding near surface.</text>
  </g>
</svg>
`;

// Round 2: Forecast
const svgRound2 = `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <defs><clipPath id="cClip2"><circle cx="180" cy="180" r="180" /></clipPath></defs>
  <g clip-path="url(#cClip2)">
    <rect width="360" height="360" fill="#000000" />
    <rect x="35" y="24" width="75" height="32" rx="10" fill="#1e293b" />
    <text x="72" y="45" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ BACK</text>
    <text x="210" y="46" fill="#38bdf8" font-size="18" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">7-DAY FORECAST</text>

    <!-- Day 1 -->
    <rect x="30" y="68" width="300" height="78" rx="14" fill="#162438" stroke="#38bdf8" stroke-width="2" />
    <text x="45" y="90" fill="#38bdf8" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Mon, Sep 14 [TODAY]</text>
    <text x="45" y="110" fill="#f97316" font-size="13" font-family="Arial, sans-serif">Crescent (23%) • Fishing: GOOD ★★★☆</text>
    <text x="45" y="130" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Major Peak: 01:57 PM - 03:57 PM</text>

    <!-- Day 2 -->
    <rect x="30" y="156" width="300" height="78" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
    <text x="45" y="178" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Tue, Sep 15</text>
    <text x="45" y="198" fill="#f97316" font-size="13" font-family="Arial, sans-serif">Crescent (32%) • Fishing: GOOD ★★★☆</text>
    <text x="45" y="218" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Major Peak: 02:45 PM - 04:45 PM</text>

    <!-- Day 3 -->
    <rect x="30" y="244" width="300" height="78" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
    <text x="45" y="266" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Wed, Sep 16</text>
    <text x="45" y="286" fill="#f97316" font-size="13" font-family="Arial, sans-serif">First Quarter (42%) • Fishing: FAIR ★★☆☆</text>
    <text x="45" y="306" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Major Peak: 03:30 PM - 05:30 PM</text>
  </g>
</svg>
`;

// Round 3: Closed Season
const svgRound3 = `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <defs><clipPath id="cClip3"><circle cx="180" cy="180" r="180" /></clipPath></defs>
  <g clip-path="url(#cClip3)">
    <rect width="360" height="360" fill="#000000" />
    <rect x="35" y="24" width="75" height="32" rx="10" fill="#1e293b" />
    <text x="72" y="45" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ BACK</text>
    <text x="210" y="46" fill="#38bdf8" font-size="18" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">CLOSED SEASONS</text>

    <!-- Region selector -->
    <rect x="30" y="68" width="300" height="42" rx="12" fill="#0284c7" />
    <text x="180" y="94" fill="#ffffff" font-size="14" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">🔄 Paraná / Southeast Basin ▾</text>

    <!-- Status Card -->
    <rect x="30" y="122" width="300" height="95" rx="14" fill="#0f172a" stroke="#10b981" stroke-width="2" />
    <text x="45" y="144" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">CURRENT STATUS</text>
    <text x="45" y="170" fill="#10b981" font-size="18" font-family="Arial, sans-serif" font-weight="bold">[ OPEN: FISHING ALLOWED ]</text>
    <text x="45" y="194" fill="#ffffff" font-size="13" font-family="Arial, sans-serif">Closure Period: Nov 01 to Feb 28</text>

    <!-- Protected Species -->
    <rect x="30" y="226" width="300" height="85" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
    <text x="45" y="248" fill="#f97316" font-size="14" font-family="Arial, sans-serif" font-weight="bold">🐟 PROTECTED SPECIES</text>
    <text x="45" y="272" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Golden Dorado, Sorubim Catfish, Jau, Pacu</text>
    <text x="45" y="292" fill="#38bdf8" font-size="12" font-family="Arial, sans-serif">Catch-and-release open for bass in reservoirs.</text>
  </g>
</svg>
`;

// Round 4: Waypoints
const svgRound4 = `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <defs><clipPath id="cClip4"><circle cx="180" cy="180" r="180" /></clipPath></defs>
  <g clip-path="url(#cClip4)">
    <rect width="360" height="360" fill="#000000" />
    <rect x="35" y="24" width="75" height="32" rx="10" fill="#1e293b" />
    <text x="72" y="45" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ BACK</text>
    <text x="210" y="46" fill="#38bdf8" font-size="18" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">SPOTS &amp; WAYPOINTS</text>

    <rect x="30" y="68" width="300" height="44" rx="12" fill="#10b981" />
    <text x="180" y="95" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">📍 + MARK GPS SPOT</text>

    <!-- Waypoint 1 -->
    <rect x="30" y="124" width="300" height="85" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
    <text x="45" y="146" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Fallen Tree Point</text>
    <text x="45" y="168" fill="#38bdf8" font-size="12" font-family="Arial, sans-serif">06:30 AM • Lat -22.4512° / Lon -47.1234°</text>
    <text x="45" y="188" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Topwater bass feeding active</text>
    <rect x="250" y="140" width="65" height="32" rx="8" fill="#3f1515" />
    <text x="282" y="161" fill="#ef4444" font-size="12" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">DELETE</text>

    <!-- Waypoint 2 -->
    <rect x="30" y="220" width="300" height="85" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
    <text x="45" y="242" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Deep Rapids Pool</text>
    <text x="45" y="264" fill="#38bdf8" font-size="12" font-family="Arial, sans-serif">05:45 PM • Lat -21.1820° / Lon -48.0510°</text>
    <text x="45" y="284" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Big catfish holding on drop-off</text>
    <rect x="250" y="236" width="65" height="32" rx="8" fill="#3f1515" />
    <text x="282" y="257" fill="#ef4444" font-size="12" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">DELETE</text>
  </g>
</svg>
`;

// ==========================================
// 2. SQUARE SCREENSHOTS (INGLÊS)
// ==========================================

// Square 1: Home Dashboard
const svgSquare1 = `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <rect width="360" height="360" rx="16" fill="#000000" />
  <text x="180" y="30" fill="#38bdf8" font-size="20" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">ANGLER MAX 🎣</text>
  <text x="180" y="48" fill="#94a3b8" font-size="12.5" font-family="Arial, sans-serif" text-anchor="middle">Monday, September 14</text>

  <!-- Language and Dark Mode buttons -->
  <rect x="52" y="56" width="122" height="26" rx="8" fill="#1e293b" />
  <text x="113" y="74" fill="#f97316" font-size="11" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">🌐 PT/EN ▾</text>
  <rect x="186" y="56" width="122" height="26" rx="8" fill="#1e293b" />
  <text x="247" y="74" fill="#38bdf8" font-size="11" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">🌙 DARK ▾</text>

  <!-- Lunar Card -->
  <rect x="14" y="90" width="332" height="152" rx="14" fill="#162032" stroke="#1e293b" stroke-width="1.5" />
  <text x="180" y="116" fill="#ffffff" font-size="19" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">WAXING CRESCENT 🌒</text>
  <text x="180" y="136" fill="#f97316" font-size="13" font-family="Arial, sans-serif" text-anchor="middle">Illumination: 23% • Age: 3.7d</text>
  <text x="180" y="158" fill="#10b981" font-size="15" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">FISHING: GOOD ★★★☆</text>
  <text x="180" y="178" fill="#94a3b8" font-size="11.5" font-family="Arial, sans-serif" text-anchor="middle">Feeding activity rising for active game fish</text>
  <text x="180" y="198" fill="#38bdf8" font-size="12.5" font-family="Arial, sans-serif" text-anchor="middle">Major Peak: 01:57 PM - 03:57 PM</text>
  <text x="180" y="216" fill="#64748b" font-size="11.5" font-family="Arial, sans-serif" text-anchor="middle">Minor Peak: 07:57 PM - 08:57 PM</text>

  <!-- Barometer Card -->
  <rect x="14" y="250" width="332" height="96" rx="14" fill="#162032" stroke="#10b981" stroke-width="1.5" />
  <text x="28" y="272" fill="#94a3b8" font-size="11.5" font-family="Arial, sans-serif">BAROMETER &amp; PRESSURE</text>
  <text x="28" y="294" fill="#10b981" font-size="15" font-family="Arial, sans-serif" font-weight="bold">🧭 High (1018 hPa) • Fair Weather</text>
  <text x="28" y="314" fill="#ffffff" font-size="11.5" font-family="Arial, sans-serif">Excellent! Fish actively feeding near surface and mid-water.</text>
  <text x="28" y="332" fill="#94a3b8" font-size="11" font-family="Arial, sans-serif">Tip: Great for topwater lures, poppers and jerkbaits.</text>
</svg>
`;

// Square 2: Forecast
const svgSquare2 = `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <rect width="360" height="360" rx="16" fill="#000000" />
  <rect x="16" y="14" width="75" height="30" rx="8" fill="#1e293b" />
  <text x="53" y="34" fill="#ffffff" font-size="11" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ BACK</text>
  <text x="215" y="35" fill="#38bdf8" font-size="18" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">7-DAY FORECAST</text>

  <!-- Day 1 -->
  <rect x="14" y="52" width="332" height="90" rx="12" fill="#162438" stroke="#38bdf8" stroke-width="2" />
  <text x="28" y="74" fill="#38bdf8" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Monday, Sep 14 [TODAY]</text>
  <text x="28" y="96" fill="#f97316" font-size="13" font-family="Arial, sans-serif">Waxing Crescent • 23% Illumination</text>
  <text x="28" y="116" fill="#10b981" font-size="13" font-family="Arial, sans-serif" font-weight="bold">Fishing: GOOD ★★★☆</text>
  <text x="28" y="134" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Major: 01:57 PM - 03:57 PM | Minor: 07:57 PM - 08:57 PM</text>

  <!-- Day 2 -->
  <rect x="14" y="152" width="332" height="90" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
  <text x="28" y="174" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Tuesday, Sep 15</text>
  <text x="28" y="196" fill="#f97316" font-size="13" font-family="Arial, sans-serif">Waxing Crescent • 32% Illumination</text>
  <text x="28" y="216" fill="#10b981" font-size="13" font-family="Arial, sans-serif" font-weight="bold">Fishing: GOOD ★★★☆</text>
  <text x="28" y="234" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Major: 02:45 PM - 04:45 PM | Minor: 08:45 PM - 09:45 PM</text>

  <!-- Day 3 -->
  <rect x="14" y="252" width="332" height="90" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
  <text x="28" y="274" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Wednesday, Sep 16</text>
  <text x="28" y="296" fill="#f97316" font-size="13" font-family="Arial, sans-serif">First Quarter • 42% Illumination</text>
  <text x="28" y="316" fill="#f59e0b" font-size="13" font-family="Arial, sans-serif" font-weight="bold">Fishing: FAIR ★★☆☆</text>
  <text x="28" y="334" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Major: 03:30 PM - 05:30 PM | Minor: 09:30 PM - 10:30 PM</text>
</svg>
`;

// Square 3: Closed Seasons
const svgSquare3 = `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <rect width="360" height="360" rx="16" fill="#000000" />
  <rect x="16" y="14" width="75" height="30" rx="8" fill="#1e293b" />
  <text x="53" y="34" fill="#ffffff" font-size="11" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ BACK</text>
  <text x="215" y="35" fill="#38bdf8" font-size="18" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">CLOSED SEASONS</text>

  <rect x="14" y="52" width="332" height="42" rx="10" fill="#0284c7" />
  <text x="180" y="78" fill="#ffffff" font-size="14" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">🔄 Paraná / Southeast Basin ▾</text>

  <rect x="14" y="102" width="332" height="100" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="2" />
  <text x="28" y="124" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">CURRENT BASIN STATUS</text>
  <text x="28" y="150" fill="#10b981" font-size="18" font-family="Arial, sans-serif" font-weight="bold">[ OPEN: FISHING SEASON OPEN ]</text>
  <text x="28" y="172" fill="#ffffff" font-size="13" font-family="Arial, sans-serif">Closed Season Window: Nov 01 to Feb 28</text>
  <text x="28" y="190" fill="#64748b" font-size="11" font-family="Arial, sans-serif">Paraná, Tietê, Paranapanema and Grande rivers</text>

  <rect x="14" y="210" width="332" height="135" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
  <text x="28" y="234" fill="#f97316" font-size="14" font-family="Arial, sans-serif" font-weight="bold">🐟 PROTECTED NATIVE SPECIES</text>
  <text x="28" y="258" fill="#ffffff" font-size="12" font-family="Arial, sans-serif">Golden Dorado, Sorubim Catfish, Jau, Curimbata, Pacu</text>
  <text x="28" y="282" fill="#10b981" font-size="12" font-family="Arial, sans-serif">✔ Sport catch-and-release allowed for bass in reservoirs.</text>
  <text x="28" y="304" fill="#ef4444" font-size="11" font-family="Arial, sans-serif">✖ Commercial nets, trotlines and dam fishing strictly prohibited.</text>
  <text x="28" y="324" fill="#64748b" font-size="10" font-family="Arial, sans-serif">Regulated by Environmental Police &amp; IBAMA</text>
</svg>
`;

// Square 4: Waypoints & Baits
const svgSquare4 = `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <rect width="360" height="360" rx="16" fill="#000000" />
  <rect x="16" y="14" width="75" height="30" rx="8" fill="#1e293b" />
  <text x="53" y="34" fill="#ffffff" font-size="11" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ BACK</text>
  <text x="215" y="35" fill="#38bdf8" font-size="18" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">SPOTS &amp; WAYPOINTS</text>

  <rect x="14" y="52" width="332" height="42" rx="10" fill="#10b981" />
  <text x="180" y="78" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">📍 + MARK GPS SPOT</text>

  <!-- Waypoint 1 -->
  <rect x="14" y="102" width="332" height="88" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
  <text x="28" y="126" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Fallen Tree Point</text>
  <text x="28" y="148" fill="#38bdf8" font-size="12" font-family="Arial, sans-serif">06:30 AM • Lat -22.4512° / Lon -47.1234°</text>
  <text x="28" y="168" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Excellent for Peacock Bass on topwater</text>
  <rect x="260" y="120" width="70" height="34" rx="8" fill="#3f1515" />
  <text x="295" y="142" fill="#ef4444" font-size="11" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">DELETE</text>

  <!-- Bait Guide -->
  <text x="28" y="214" fill="#38bdf8" font-size="15" font-family="Arial, sans-serif" font-weight="bold">BAIT GUIDE BY SPOT</text>
  
  <rect x="14" y="226" width="332" height="118" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
  <text x="28" y="250" fill="#f97316" font-size="14" font-family="Arial, sans-serif" font-weight="bold">🎣 Lakes &amp; Reservoirs</text>
  <text x="28" y="272" fill="#ffffff" font-size="12" font-family="Arial, sans-serif">Target: Bass, Peacock Bass, Tilapia, Pike</text>
  <text x="28" y="294" fill="#38bdf8" font-size="12" font-family="Arial, sans-serif">Baits: Topwater (Zara/Popper), Jerkbaits, Soft Plastics</text>
  <text x="28" y="316" fill="#94a3b8" font-size="11" font-family="Arial, sans-serif">Tip: Cast near sunken timber, weed lines and drop-offs.</text>
</svg>
`;

async function generateAllEn() {
  const images = [
    // 4 Round EN
    { name: 'round_screenshot_1_home_en.png', svg: svgRound1 },
    { name: 'round_screenshot_2_forecast_en.png', svg: svgRound2 },
    { name: 'round_screenshot_3_defeso_en.png', svg: svgRound3 },
    { name: 'round_screenshot_4_waypoints_en.png', svg: svgRound4 },
    // 4 Square EN
    { name: 'square_screenshot_1_home_en.png', svg: svgSquare1 },
    { name: 'square_screenshot_2_forecast_en.png', svg: svgSquare2 },
    { name: 'square_screenshot_3_defeso_en.png', svg: svgSquare3 },
    { name: 'square_screenshot_4_waypoints_en.png', svg: svgSquare4 }
  ];

  for (const item of images) {
    const dest = path.join(outDir, item.name);
    await sharp(Buffer.from(item.svg))
      .resize(360, 360)
      .png()
      .toFile(dest);
    console.log('Gerado em inglês:', item.name);
  }
}

generateAllEn().catch(console.error);
