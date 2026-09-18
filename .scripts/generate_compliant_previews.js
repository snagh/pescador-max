/**
 * .scripts/generate_compliant_previews.js
 * Gera as screenshots oficiais SQUARE (360x360 PNG Transparente com silhueta do relógio)
 * em total conformidade com a rejeição do Zepp Health Open Platform (Myoung XUE).
 */
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const sharpPath = pathToFileURL('C:/Users/aprom/AppData/Roaming/npm/node_modules/@zeppos/zeus-cli/node_modules/sharp/lib/index.js').href;
const sharp = (await import(sharpPath)).default;

const ptDir = path.resolve('./store_assets');
const enDir = path.resolve('./store_assets/en');

// Frame do relógio:
// Canvas 360x360 px transparente
// Relógio: 276 x 332 px (proporção 432x514), centralizado em X=42, Y=14, rx=46
function wrapWatch(contentSvg) {
  return `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="screenClip">
      <rect x="42" y="14" width="276" height="332" rx="44" ry="44" />
    </clipPath>
  </defs>

  <!-- Fundo transparente externo -->

  <!-- Borda metálica do smartwatch Amazfit Bip Max -->
  <rect x="40" y="12" width="280" height="336" rx="46" ry="46" fill="#18181b" stroke="#3f3f46" stroke-width="2.5" />

  <!-- Tela AMOLED cortada com cantos arredondados do dispositivo -->
  <g clip-path="url(#screenClip)">
    <rect x="42" y="14" width="276" height="332" fill="#000000" />
    ${contentSvg}
  </g>
</svg>
`;
}

// ============================================================
// 1. TELAS EM PORTUGUÊS (PT-BR)
// ============================================================

// PT 1: Dashboard Home
const ptHome = wrapWatch(`
  <!-- Barra de status do relógio -->
  <text x="60" y="32" fill="#94a3b8" font-size="10" font-family="Arial, sans-serif" font-weight="bold">PescaMax</text>
  <text x="300" y="32" fill="#94a3b8" font-size="10" font-family="Arial, sans-serif" font-weight="bold" text-anchor="end">15:31</text>

  <!-- Sub-header -->
  <text x="60" y="48" fill="#64748b" font-size="10" font-family="Arial, sans-serif">Seg, 14 de Setembro</text>
  <rect x="264" y="38" width="36" height="14" rx="7" fill="#27272a" />
  <text x="282" y="49" fill="#f97316" font-size="8.5" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">PT</text>

  <!-- Módulo 1: Lua & Solunar (Design Nova Geração) -->
  <rect x="52" y="56" width="256" height="88" rx="14" fill="#18181b" />
  <text x="64" y="72" fill="#94a3b8" font-size="9" font-family="Arial, sans-serif">LUA HOJE</text>
  <text x="64" y="104" fill="#00d2ff" font-size="30" font-family="Arial, sans-serif" font-weight="bold">17%</text>
  <text x="64" y="122" fill="#94a3b8" font-size="9" font-family="Arial, sans-serif">Iluminação</text>

  <text x="144" y="74" fill="#ffffff" font-size="14" font-family="Arial, sans-serif" font-weight="bold">Crescente Côncava</text>
  <text x="144" y="93" fill="#30d158" font-size="12" font-family="Arial, sans-serif" font-weight="bold">PESCA: BOM (Nota 8.5)</text>
  <text x="144" y="112" fill="#00d2ff" font-size="11" font-family="Arial, sans-serif" font-weight="bold">Melhor: 14:11 às 16:11</text>
  <text x="144" y="128" fill="#64748b" font-size="9" font-family="Arial, sans-serif">(Pico Diurno da Tarde)</text>

  <!-- Módulo 2: Pressão Barométrica -->
  <rect x="52" y="150" width="256" height="88" rx="14" fill="#18181b" />
  <text x="64" y="166" fill="#94a3b8" font-size="9" font-family="Arial, sans-serif">PRESSÃO</text>
  <text x="64" y="198" fill="#ffffff" font-size="30" font-family="Arial, sans-serif" font-weight="bold">1016</text>
  <text x="64" y="216" fill="#94a3b8" font-size="9" font-family="Arial, sans-serif">hPa Estável</text>

  <text x="144" y="168" fill="#30d158" font-size="14" font-family="Arial, sans-serif" font-weight="bold">TEMPO FIRME</text>
  <text x="144" y="187" fill="#ffffff" font-size="11" font-family="Arial, sans-serif">Peixes Ativos e Caçando</text>
  <text x="144" y="206" fill="#94a3b8" font-size="9.5" font-family="Arial, sans-serif">Iscas Superfície e Meia-Água</text>
  <text x="144" y="224" fill="#30d158" font-size="9" font-family="Arial, sans-serif">● Sensor Físico Ativo</text>

  <!-- Módulo 3: Bacia & Defeso -->
  <rect x="52" y="244" width="256" height="66" rx="14" fill="#062816" stroke="#15803d" stroke-width="1" />
  <text x="64" y="263" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold">🌊 BACIA: PARANÁ / SUDESTE</text>
  <rect x="238" y="252" width="60" height="15" rx="7" fill="#15803d" />
  <text x="268" y="263" fill="#ffffff" font-size="9" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">LIBERADO</text>
  <text x="64" y="282" fill="#cbd5e1" font-size="10.5" font-family="Arial, sans-serif">Piracema: 01/11 até 28/02</text>
  <text x="64" y="299" fill="#00d2ff" font-size="9.5" font-family="Arial, sans-serif">👉 Toque para alternar (6 Bacias)</text>

  <!-- Botão Ação -->
  <rect x="52" y="316" width="256" height="26" rx="12" fill="#0066ff" />
  <text x="180" y="333" fill="#ffffff" font-size="11" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">📅 PREVISÃO DOS 7 DIAS &gt;</text>
`);

// PT 2: Defeso e Piracema
const ptDefeso = wrapWatch(`
  <!-- Topo -->
  <rect x="54" y="24" width="58" height="24" rx="12" fill="#27272a" />
  <text x="83" y="39" fill="#ffffff" font-size="10" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ VOLTAR</text>
  <text x="180" y="40" fill="#30d158" font-size="13" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">DEFESO &amp; PIRACEMA</text>

  <!-- Seletor Bacia -->
  <rect x="52" y="56" width="256" height="34" rx="10" fill="#0284c7" />
  <text x="180" y="77" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">🔄 Bacia do Rio Paraná / Sudeste ▾</text>

  <!-- Status Card -->
  <rect x="52" y="98" width="256" height="78" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="1.5" />
  <text x="64" y="116" fill="#94a3b8" font-size="9.5" font-family="Arial, sans-serif">STATUS ATUAL DA BACIA</text>
  <text x="64" y="137" fill="#10b981" font-size="14" font-family="Arial, sans-serif" font-weight="bold">[ LIBERADO: PESCA PERMITIDA ]</text>
  <text x="64" y="154" fill="#ffffff" font-size="10.5" font-family="Arial, sans-serif">Período de Defeso: 01/11 até 28/02</text>
  <text x="64" y="168" fill="#64748b" font-size="9" font-family="Arial, sans-serif">Rios Paraná, Tietê, Paranapanema, Grande</text>

  <!-- Espécies Card -->
  <rect x="52" y="184" width="256" height="114" rx="12" fill="#0f172a" stroke="#27272a" stroke-width="1.5" />
  <text x="64" y="204" fill="#f97316" font-size="11.5" font-family="Arial, sans-serif" font-weight="bold">🐟 ESPÉCIES NATIVAS PROTEGIDAS</text>
  <text x="64" y="223" fill="#ffffff" font-size="10" font-family="Arial, sans-serif">Dourado, Pintado, Jaú, Curimbatá, Pacu</text>
  <text x="64" y="242" fill="#10b981" font-size="10" font-family="Arial, sans-serif">✔ Pesque-e-solte de tucunaré/tilápia liberado.</text>
  <text x="64" y="261" fill="#ef4444" font-size="9.5" font-family="Arial, sans-serif">✖ Proibido redes, tarrafas e pescaria em barragens.</text>
  <text x="64" y="278" fill="#64748b" font-size="8.5" font-family="Arial, sans-serif">Fiscalizado pela Polícia Ambiental e IBAMA</text>
`);

// PT 3: Waypoints e GPS
const ptWaypoints = wrapWatch(`
  <!-- Topo -->
  <rect x="54" y="24" width="58" height="24" rx="12" fill="#27272a" />
  <text x="83" y="39" fill="#ffffff" font-size="10" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ VOLTAR</text>
  <text x="180" y="40" fill="#38bdf8" font-size="13" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">LOCAIS &amp; WAYPOINTS</text>

  <!-- Botão Marcar Ponto GPS -->
  <rect x="52" y="56" width="256" height="34" rx="10" fill="#10b981" />
  <text x="180" y="77" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">📍 + MARCAR PONTO GPS</text>

  <!-- Card Waypoint 1 -->
  <rect x="52" y="98" width="256" height="68" rx="12" fill="#0f172a" stroke="#27272a" stroke-width="1.5" />
  <text x="64" y="118" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold">Ponto do Tronco Caído</text>
  <text x="64" y="135" fill="#38bdf8" font-size="9.5" font-family="Arial, sans-serif">06:30 • Lat -22.4512° / Lon -47.1234°</text>
  <text x="64" y="152" fill="#94a3b8" font-size="9.5" font-family="Arial, sans-serif">Excelente para Tucunaré na superfície</text>
  <rect x="250" y="112" width="50" height="24" rx="6" fill="#3f1515" />
  <text x="275" y="128" fill="#ef4444" font-size="9" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">EXCLUIR</text>

  <!-- Guia de Iscas -->
  <text x="64" y="186" fill="#38bdf8" font-size="11.5" font-family="Arial, sans-serif" font-weight="bold">GUIA DE ISCAS POR LOCAL</text>
  <rect x="52" y="196" width="256" height="96" rx="12" fill="#0f172a" stroke="#27272a" stroke-width="1.5" />
  <text x="64" y="216" fill="#f97316" font-size="11" font-family="Arial, sans-serif" font-weight="bold">🎣 Represas &amp; Lagos</text>
  <text x="64" y="234" fill="#ffffff" font-size="10" font-family="Arial, sans-serif">Peixes: Tucunaré, Tilápia, Traíra, Black Bass</text>
  <text x="64" y="252" fill="#38bdf8" font-size="9.5" font-family="Arial, sans-serif">Iscas: Superfície (Zara/Popper), Meia-água, Softs</text>
  <text x="64" y="270" fill="#94a3b8" font-size="9" font-family="Arial, sans-serif">Dica: Procure troncos submersos e pontas de ilhas.</text>
`);

// PT 4: Previsão 7 Dias
const ptForecast = wrapWatch(`
  <!-- Topo -->
  <rect x="54" y="24" width="58" height="24" rx="12" fill="#27272a" />
  <text x="83" y="39" fill="#ffffff" font-size="10" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ VOLTAR</text>
  <text x="180" y="40" fill="#00d2ff" font-size="13" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">PREVISÃO 7 DIAS</text>

  <!-- Dia 1 (Hoje) -->
  <rect x="52" y="56" width="256" height="74" rx="12" fill="#0c1f38" stroke="#00d2ff" stroke-width="1.5" />
  <text x="64" y="74" fill="#00d2ff" font-size="12" font-family="Arial, sans-serif" font-weight="bold">Segunda, 14/09 [HOJE]</text>
  <text x="64" y="91" fill="#f97316" font-size="10.5" font-family="Arial, sans-serif">Crescente Côncava • 17% Iluminação</text>
  <text x="64" y="108" fill="#30d158" font-size="10.5" font-family="Arial, sans-serif" font-weight="bold">Pesca: BOM ★★★☆ (8.5)</text>
  <text x="64" y="123" fill="#94a3b8" font-size="9.5" font-family="Arial, sans-serif">Melhor: Tarde 14:11 às 16:11</text>

  <!-- Dia 2 -->
  <rect x="52" y="136" width="256" height="74" rx="12" fill="#18181b" />
  <text x="64" y="154" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold">Terça, 15/09</text>
  <text x="64" y="171" fill="#f97316" font-size="10.5" font-family="Arial, sans-serif">Crescente Côncava • 26% Iluminação</text>
  <text x="64" y="188" fill="#30d158" font-size="10.5" font-family="Arial, sans-serif" font-weight="bold">Pesca: BOM ★★★☆</text>
  <text x="64" y="203" fill="#94a3b8" font-size="9.5" font-family="Arial, sans-serif">Melhor: Tarde 14:59 às 16:59</text>

  <!-- Dia 3 -->
  <rect x="52" y="216" width="256" height="74" rx="12" fill="#18181b" />
  <text x="64" y="234" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold">Quarta, 16/09</text>
  <text x="64" y="251" fill="#f97316" font-size="10.5" font-family="Arial, sans-serif">Quarto Crescente • 35% Iluminação</text>
  <text x="64" y="268" fill="#00d2ff" font-size="10.5" font-family="Arial, sans-serif" font-weight="bold">Pesca: REGULAR ★★☆☆</text>
  <text x="64" y="283" fill="#94a3b8" font-size="9.5" font-family="Arial, sans-serif">Melhor: Tarde 15:45 às 17:45</text>
`);

// ============================================================
// 2. TELAS EM INGLÊS (EN-US)
// ============================================================

// EN 1: Forecast
const enForecast = wrapWatch(`
  <rect x="54" y="24" width="58" height="24" rx="12" fill="#27272a" />
  <text x="83" y="39" fill="#ffffff" font-size="10" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ BACK</text>
  <text x="180" y="40" fill="#00d2ff" font-size="13" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">7-DAY FORECAST</text>

  <rect x="52" y="56" width="256" height="74" rx="12" fill="#0c1f38" stroke="#00d2ff" stroke-width="1.5" />
  <text x="64" y="74" fill="#00d2ff" font-size="12" font-family="Arial, sans-serif" font-weight="bold">Monday, Sep 14 [TODAY]</text>
  <text x="64" y="91" fill="#f97316" font-size="10.5" font-family="Arial, sans-serif">Waxing Crescent • 17% Illumination</text>
  <text x="64" y="108" fill="#30d158" font-size="10.5" font-family="Arial, sans-serif" font-weight="bold">Fishing: GOOD ★★★☆ (8.5)</text>
  <text x="64" y="123" fill="#94a3b8" font-size="9.5" font-family="Arial, sans-serif">Best Peak: Afternoon 02:11 PM - 04:11 PM</text>

  <rect x="52" y="136" width="256" height="74" rx="12" fill="#18181b" />
  <text x="64" y="154" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold">Tuesday, Sep 15</text>
  <text x="64" y="171" fill="#f97316" font-size="10.5" font-family="Arial, sans-serif">Waxing Crescent • 26% Illumination</text>
  <text x="64" y="188" fill="#30d158" font-size="10.5" font-family="Arial, sans-serif" font-weight="bold">Fishing: GOOD ★★★☆</text>
  <text x="64" y="203" fill="#94a3b8" font-size="9.5" font-family="Arial, sans-serif">Best Peak: Afternoon 02:59 PM - 04:59 PM</text>

  <rect x="52" y="216" width="256" height="74" rx="12" fill="#18181b" />
  <text x="64" y="234" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold">Wednesday, Sep 16</text>
  <text x="64" y="251" fill="#f97316" font-size="10.5" font-family="Arial, sans-serif">First Quarter • 35% Illumination</text>
  <text x="64" y="268" fill="#00d2ff" font-size="10.5" font-family="Arial, sans-serif" font-weight="bold">Fishing: FAIR ★★☆☆</text>
  <text x="64" y="283" fill="#94a3b8" font-size="9.5" font-family="Arial, sans-serif">Best Peak: Afternoon 03:45 PM - 05:45 PM</text>
`);

// EN 2: Home Dashboard
const enHome = wrapWatch(`
  <text x="60" y="32" fill="#94a3b8" font-size="10" font-family="Arial, sans-serif" font-weight="bold">AnglerMax</text>
  <text x="300" y="32" fill="#94a3b8" font-size="10" font-family="Arial, sans-serif" font-weight="bold" text-anchor="end">15:31</text>

  <text x="60" y="48" fill="#64748b" font-size="10" font-family="Arial, sans-serif">Monday, September 14</text>
  <rect x="264" y="38" width="36" height="14" rx="7" fill="#27272a" />
  <text x="282" y="49" fill="#00d2ff" font-size="8.5" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">EN</text>

  <rect x="52" y="56" width="256" height="88" rx="14" fill="#18181b" />
  <text x="64" y="72" fill="#94a3b8" font-size="9" font-family="Arial, sans-serif">MOON TODAY</text>
  <text x="64" y="104" fill="#00d2ff" font-size="30" font-family="Arial, sans-serif" font-weight="bold">17%</text>
  <text x="64" y="122" fill="#94a3b8" font-size="9" font-family="Arial, sans-serif">Illumination</text>

  <text x="144" y="74" fill="#ffffff" font-size="14" font-family="Arial, sans-serif" font-weight="bold">Waxing Crescent</text>
  <text x="144" y="93" fill="#30d158" font-size="12" font-family="Arial, sans-serif" font-weight="bold">FISHING: GOOD (8.5/10)</text>
  <text x="144" y="112" fill="#00d2ff" font-size="11" font-family="Arial, sans-serif" font-weight="bold">Best: 02:11 PM - 04:11 PM</text>
  <text x="144" y="128" fill="#64748b" font-size="9" font-family="Arial, sans-serif">(Afternoon Solunar Peak)</text>

  <rect x="52" y="150" width="256" height="88" rx="14" fill="#18181b" />
  <text x="64" y="166" fill="#94a3b8" font-size="9" font-family="Arial, sans-serif">PRESSURE</text>
  <text x="64" y="198" fill="#ffffff" font-size="30" font-family="Arial, sans-serif" font-weight="bold">1016</text>
  <text x="64" y="216" fill="#94a3b8" font-size="9" font-family="Arial, sans-serif">hPa Steady</text>

  <text x="144" y="168" fill="#30d158" font-size="14" font-family="Arial, sans-serif" font-weight="bold">FAIR WEATHER</text>
  <text x="144" y="187" fill="#ffffff" font-size="11" font-family="Arial, sans-serif">Active Feeding Behavior</text>
  <text x="144" y="206" fill="#94a3b8" font-size="9.5" font-family="Arial, sans-serif">Topwater &amp; Midwater Lures</text>
  <text x="144" y="224" fill="#30d158" font-size="9" font-family="Arial, sans-serif">● Active Hardware Barometer</text>

  <rect x="52" y="244" width="256" height="66" rx="14" fill="#062816" stroke="#15803d" stroke-width="1" />
  <text x="64" y="263" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold">🌊 BASIN: PARANÁ / SOUTH</text>
  <rect x="246" y="252" width="52" height="15" rx="7" fill="#15803d" />
  <text x="272" y="263" fill="#ffffff" font-size="9" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">OPEN</text>
  <text x="64" y="282" fill="#cbd5e1" font-size="10.5" font-family="Arial, sans-serif">Spawning Season: Nov 01 - Feb 28</text>
  <text x="64" y="299" fill="#00d2ff" font-size="9.5" font-family="Arial, sans-serif">👉 Tap to switch (6 River Basins)</text>
`);

// EN 3: Spots & Waypoints
const enSpots = wrapWatch(`
  <rect x="54" y="24" width="58" height="24" rx="12" fill="#27272a" />
  <text x="83" y="39" fill="#ffffff" font-size="10" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ BACK</text>
  <text x="180" y="40" fill="#38bdf8" font-size="13" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">SPOTS &amp; WAYPOINTS</text>

  <rect x="52" y="56" width="256" height="34" rx="10" fill="#10b981" />
  <text x="180" y="77" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">📍 + MARK GPS SPOT</text>

  <rect x="52" y="98" width="256" height="68" rx="12" fill="#0f172a" stroke="#27272a" stroke-width="1.5" />
  <text x="64" y="118" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold">Fallen Tree Point</text>
  <text x="64" y="135" fill="#38bdf8" font-size="9.5" font-family="Arial, sans-serif">06:30 AM • Lat -22.4512° / Lon -47.1234°</text>
  <text x="64" y="152" fill="#94a3b8" font-size="9.5" font-family="Arial, sans-serif">Excellent for Peacock Bass on topwater</text>
  <rect x="250" y="112" width="50" height="24" rx="6" fill="#3f1515" />
  <text x="275" y="128" fill="#ef4444" font-size="9" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">DELETE</text>

  <text x="64" y="186" fill="#38bdf8" font-size="11.5" font-family="Arial, sans-serif" font-weight="bold">BAIT GUIDE BY SPOT</text>
  <rect x="52" y="196" width="256" height="96" rx="12" fill="#0f172a" stroke="#27272a" stroke-width="1.5" />
  <text x="64" y="216" fill="#f97316" font-size="11" font-family="Arial, sans-serif" font-weight="bold">🎣 Lakes &amp; Reservoirs</text>
  <text x="64" y="234" fill="#ffffff" font-size="10" font-family="Arial, sans-serif">Target: Bass, Peacock Bass, Tilapia, Pike</text>
  <text x="64" y="252" fill="#38bdf8" font-size="9.5" font-family="Arial, sans-serif">Baits: Topwater (Zara/Popper), Soft Plastics</text>
  <text x="64" y="270" fill="#94a3b8" font-size="9" font-family="Arial, sans-serif">Tip: Cast near submerged timber and drop-offs.</text>
`);

// EN 4: Closed Seasons
const enDefeso = wrapWatch(`
  <rect x="54" y="24" width="58" height="24" rx="12" fill="#27272a" />
  <text x="83" y="39" fill="#ffffff" font-size="10" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ BACK</text>
  <text x="180" y="40" fill="#30d158" font-size="13" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">CLOSED SEASONS</text>

  <rect x="52" y="56" width="256" height="34" rx="10" fill="#0284c7" />
  <text x="180" y="77" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">🔄 Paraná / Southeast Basin ▾</text>

  <rect x="52" y="98" width="256" height="78" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="1.5" />
  <text x="64" y="116" fill="#94a3b8" font-size="9.5" font-family="Arial, sans-serif">CURRENT BASIN STATUS</text>
  <text x="64" y="137" fill="#10b981" font-size="14" font-family="Arial, sans-serif" font-weight="bold">[ OPEN: FISHING SEASON OPEN ]</text>
  <text x="64" y="154" fill="#ffffff" font-size="10.5" font-family="Arial, sans-serif">Closed Season Window: Nov 01 to Feb 28</text>
  <text x="64" y="168" fill="#64748b" font-size="9" font-family="Arial, sans-serif">Paraná, Tietê, Paranapanema and Grande rivers</text>

  <rect x="52" y="184" width="256" height="114" rx="12" fill="#0f172a" stroke="#27272a" stroke-width="1.5" />
  <text x="64" y="204" fill="#f97316" font-size="11.5" font-family="Arial, sans-serif" font-weight="bold">🐟 PROTECTED NATIVE SPECIES</text>
  <text x="64" y="223" fill="#ffffff" font-size="10" font-family="Arial, sans-serif">Golden Dorado, Sorubim Catfish, Jau, Pacu</text>
  <text x="64" y="242" fill="#10b981" font-size="10" font-family="Arial, sans-serif">✔ Sport catch-and-release allowed for bass in reservoirs.</text>
  <text x="64" y="261" fill="#ef4444" font-size="9.5" font-family="Arial, sans-serif">✖ Commercial nets and dam fishing strictly prohibited.</text>
  <text x="64" y="278" fill="#64748b" font-size="8.5" font-family="Arial, sans-serif">Regulated by Environmental Police &amp; IBAMA</text>
`);

async function generateAll() {
  const list = [
    // Português (padrão)
    { dir: ptDir, name: 'square_screenshot_1_home.png', svg: ptHome },
    { dir: ptDir, name: 'square_screenshot_2_defeso.png', svg: ptDefeso },
    { dir: ptDir, name: 'square_screenshot_3_waypoints.png', svg: ptWaypoints },
    { dir: ptDir, name: 'square_screenshot_4_forecast.png', svg: ptForecast },

    // Inglês (Store Global)
    { dir: enDir, name: 'square_screenshot_1_home_en.png', svg: enHome },
    { dir: enDir, name: 'square_screenshot_2_forecast_en.png', svg: enForecast },
    { dir: enDir, name: 'square_screenshot_3_defeso_en.png', svg: enDefeso },
    { dir: enDir, name: 'square_screenshot_4_waypoints_en.png', svg: enSpots },
  ];

  for (const item of list) {
    const dest = path.join(item.dir, item.name);
    await sharp(Buffer.from(item.svg))
      .resize(360, 360)
      .png()
      .toFile(dest);
    console.log('✔ Gerada screenshot em conformidade:', item.name);
  }
}

generateAll().catch(console.error);
