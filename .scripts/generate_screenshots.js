/**
 * Script para gerar screenshots oficiais 360x360 px para o portal Zepp
 */
import fs from 'fs';
import path from 'path';

import { pathToFileURL } from 'url';

const sharpPath = pathToFileURL('C:/Users/aprom/AppData/Roaming/npm/node_modules/@zeppos/zeus-cli/node_modules/sharp/lib/index.js').href;
const sharp = (await import(sharpPath)).default;

const outDir = path.resolve('./store_assets');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Screenshot 1: Tela Principal (Dashboard Lunar & Solunar)
const svgScreen1 = `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="circleClip">
      <circle cx="180" cy="180" r="180" />
    </clipPath>
    <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#162032" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="moonGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>
  </defs>

  <g clip-path="url(#circleClip)">
    <!-- Fundo Preto AMOLED -->
    <rect width="360" height="360" fill="#000000" />

    <!-- Título -->
    <text x="180" y="44" fill="#38bdf8" font-size="22" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">PESCADOR MAX 🎣</text>
    <text x="180" y="66" fill="#94a3b8" font-size="14" font-family="Arial, sans-serif" text-anchor="middle">Segunda, 14 de Setembro</text>

    <!-- Cartão Lua e Solunar -->
    <rect x="30" y="80" width="300" height="150" rx="16" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="2" />
    
    <text x="180" y="110" fill="#ffffff" font-size="20" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">LUA CRESCENTE 🌒</text>
    <text x="180" y="132" fill="#fbbf24" font-size="14" font-family="Arial, sans-serif" text-anchor="middle">Iluminação: 23% • Idade: 3.7d</text>
    <text x="180" y="156" fill="#10b981" font-size="16" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">PESCA: BOM ★★★☆</text>
    <text x="180" y="178" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif" text-anchor="middle">Atividade alimentar em crescimento</text>
    <text x="180" y="202" fill="#38bdf8" font-size="13" font-family="Arial, sans-serif" text-anchor="middle">Pico Maior: 13:57 - 15:57</text>

    <!-- Cartão Barômetro -->
    <rect x="30" y="240" width="300" height="85" rx="16" fill="url(#cardGrad)" stroke="#10b981" stroke-width="2" />
    <text x="50" y="264" fill="#94a3b8" font-size="13" font-family="Arial, sans-serif">BARÔMETRO &amp; PRESSÃO</text>
    <text x="50" y="288" fill="#10b981" font-size="16" font-family="Arial, sans-serif" font-weight="bold">🧭 Alta (1018 hPa) • Tempo Firme</text>
    <text x="50" y="308" fill="#ffffff" font-size="12" font-family="Arial, sans-serif">Excelente! Peixes ativos em meia-água.</text>
  </g>
</svg>
`;

// 2. Screenshot 2: Previsão 7 Dias
const svgScreen2 = `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="circleClip2">
      <circle cx="180" cy="180" r="180" />
    </clipPath>
  </defs>

  <g clip-path="url(#circleClip2)">
    <rect width="360" height="360" fill="#000000" />

    <!-- Topo -->
    <rect x="35" y="24" width="80" height="32" rx="10" fill="#1e293b" />
    <text x="75" y="45" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ VOLTAR</text>
    <text x="210" y="46" fill="#38bdf8" font-size="18" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">PREVISÃO 7 DIAS</text>

    <!-- Dia 1: Hoje -->
    <rect x="30" y="68" width="300" height="78" rx="14" fill="#162438" stroke="#38bdf8" stroke-width="2" />
    <text x="45" y="90" fill="#38bdf8" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Seg, 14/09 [HOJE]</text>
    <text x="45" y="110" fill="#fbbf24" font-size="13" font-family="Arial, sans-serif">Crescente (23%) • Pesca: BOM ★★★☆</text>
    <text x="45" y="130" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Pico Maior: 13:57 - 15:57</text>

    <!-- Dia 2 -->
    <rect x="30" y="156" width="300" height="78" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
    <text x="45" y="178" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Ter, 15/09</text>
    <text x="45" y="198" fill="#fbbf24" font-size="13" font-family="Arial, sans-serif">Crescente (32%) • Pesca: BOM ★★★☆</text>
    <text x="45" y="218" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Pico Maior: 14:45 - 16:45</text>

    <!-- Dia 3 -->
    <rect x="30" y="244" width="300" height="78" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
    <text x="45" y="266" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Qua, 16/09</text>
    <text x="45" y="286" fill="#fbbf24" font-size="13" font-family="Arial, sans-serif">Quarto Crescente (42%) • Pesca: REGULAR</text>
    <text x="45" y="306" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Pico Maior: 15:30 - 17:30</text>
  </g>
</svg>
`;

// 3. Screenshot 3: Defeso & Piracema
const svgScreen3 = `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="circleClip3">
      <circle cx="180" cy="180" r="180" />
    </clipPath>
  </defs>

  <g clip-path="url(#circleClip3)">
    <rect width="360" height="360" fill="#000000" />

    <!-- Topo -->
    <rect x="35" y="24" width="80" height="32" rx="10" fill="#1e293b" />
    <text x="75" y="45" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ VOLTAR</text>
    <text x="210" y="46" fill="#38bdf8" font-size="18" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">DEFESO &amp; PIRACEMA</text>

    <!-- Botão Seletor de Bacia -->
    <rect x="30" y="68" width="300" height="42" rx="12" fill="#0284c7" />
    <text x="180" y="94" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">🔄 Paraná / Sudeste ▾</text>

    <!-- Cartão de Status -->
    <rect x="30" y="122" width="300" height="95" rx="14" fill="#0f172a" stroke="#10b981" stroke-width="2" />
    <text x="45" y="144" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">STATUS ATUAL</text>
    <text x="45" y="170" fill="#10b981" font-size="18" font-family="Arial, sans-serif" font-weight="bold">[ LIBERADO: PESCA LIBERADA ]</text>
    <text x="45" y="194" fill="#ffffff" font-size="13" font-family="Arial, sans-serif">Período de Defeso: 01/11 até 28/02</text>

    <!-- Cartão Espécies Protegidas -->
    <rect x="30" y="226" width="300" height="85" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
    <text x="45" y="248" fill="#fbbf24" font-size="14" font-family="Arial, sans-serif" font-weight="bold">🐟 ESPÉCIES PROTEGIDAS</text>
    <text x="45" y="272" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Dourado, Pintado, Jaú, Curimbatá, Piapara, Pacu</text>
    <text x="45" y="292" fill="#38bdf8" font-size="12" font-family="Arial, sans-serif">Pesque-e-solte de tucunaré liberado em represas.</text>
  </g>
</svg>
`;

// 4. Screenshot 4: Pontos de Pesca & Waypoints GPS
const svgScreen4 = `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="circleClip4">
      <circle cx="180" cy="180" r="180" />
    </clipPath>
  </defs>

  <g clip-path="url(#circleClip4)">
    <rect width="360" height="360" fill="#000000" />

    <!-- Topo -->
    <rect x="35" y="24" width="80" height="32" rx="10" fill="#1e293b" />
    <text x="75" y="45" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ VOLTAR</text>
    <text x="210" y="46" fill="#38bdf8" font-size="18" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">LOCAIS &amp; WAYPOINTS</text>

    <!-- Botão Marcar Ponto GPS -->
    <rect x="30" y="68" width="300" height="44" rx="12" fill="#10b981" />
    <text x="180" y="95" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">📍 + MARCAR PONTO GPS</text>

    <!-- Waypoint 1 -->
    <rect x="30" y="124" width="300" height="85" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
    <text x="45" y="146" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Ponto do Tronco Caído</text>
    <text x="45" y="168" fill="#38bdf8" font-size="12" font-family="Arial, sans-serif">06:30 • Lat -22.4512° / Lon -47.1234°</text>
    <text x="45" y="188" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Excelente para Tucunaré na superfície</text>

    <rect x="250" y="140" width="65" height="32" rx="8" fill="#3f1515" />
    <text x="282" y="161" fill="#ef4444" font-size="12" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">EXCLUIR</text>

    <!-- Waypoint 2 -->
    <rect x="30" y="220" width="300" height="85" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
    <text x="45" y="242" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Poço da Corredeira</text>
    <text x="45" y="264" fill="#38bdf8" font-size="12" font-family="Arial, sans-serif">17:45 • Lat -21.1820° / Lon -48.0510°</text>
    <text x="45" y="284" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Pintados e Piaparas no fundo</text>

    <rect x="250" y="236" width="65" height="32" rx="8" fill="#3f1515" />
    <text x="282" y="257" fill="#ef4444" font-size="12" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">EXCLUIR</text>
  </g>
</svg>
`;

async function generate() {
  const screens = [
    { name: 'screenshot_1_home.png', svg: svgScreen1 },
    { name: 'screenshot_2_forecast.png', svg: svgScreen2 },
    { name: 'screenshot_3_defeso.png', svg: svgScreen3 },
    { name: 'screenshot_4_waypoints.png', svg: svgScreen4 },
  ];

  for (const s of screens) {
    const dest = path.join(outDir, s.name);
    await sharp(Buffer.from(s.svg))
      .resize(360, 360)
      .png()
      .toFile(dest);
    console.log('Gerado com sucesso:', dest);
  }
}

generate().catch(console.error);
