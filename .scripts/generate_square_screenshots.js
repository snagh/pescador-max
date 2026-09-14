/**
 * Script para gerar screenshots oficiais SQUARE (tela retangular/quadrada como Bip Max)
 * Formato exigido: 360x360 px, PNG
 */
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const sharpPath = pathToFileURL('C:/Users/aprom/AppData/Roaming/npm/node_modules/@zeppos/zeus-cli/node_modules/sharp/lib/index.js').href;
const sharp = (await import(sharpPath)).default;

const outDir = path.resolve('./store_assets');

// 1. Square Screenshot 1: Dashboard
const svgSquare1 = `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cardGradSq" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#162032" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  </defs>

  <!-- Fundo Preto AMOLED -->
  <rect width="360" height="360" rx="16" fill="#000000" />

  <!-- Título -->
  <text x="180" y="32" fill="#38bdf8" font-size="20" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">PESCADOR MAX 🎣</text>
  <text x="180" y="52" fill="#94a3b8" font-size="13" font-family="Arial, sans-serif" text-anchor="middle">Segunda, 14 de Setembro</text>

  <!-- Cartão Lua e Solunar -->
  <rect x="14" y="62" width="332" height="175" rx="14" fill="url(#cardGradSq)" stroke="#1e293b" stroke-width="2" />
  
  <text x="180" y="90" fill="#ffffff" font-size="20" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">LUA CRESCENTE 🌒</text>
  <text x="180" y="112" fill="#fbbf24" font-size="14" font-family="Arial, sans-serif" text-anchor="middle">Iluminação: 23% • Idade: 3.7d</text>
  <text x="180" y="136" fill="#10b981" font-size="16" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">PESCA: BOM ★★★☆</text>
  <text x="180" y="158" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif" text-anchor="middle">Atividade alimentar em crescimento para peixes</text>
  <text x="180" y="180" fill="#38bdf8" font-size="13" font-family="Arial, sans-serif" text-anchor="middle">Pico Maior: 13:57 - 15:57</text>
  <text x="180" y="200" fill="#64748b" font-size="12" font-family="Arial, sans-serif" text-anchor="middle">Pico Menor: 19:57 - 20:57</text>

  <!-- Cartão Barômetro -->
  <rect x="14" y="246" width="332" height="100" rx="14" fill="url(#cardGradSq)" stroke="#10b981" stroke-width="2" />
  <text x="30" y="270" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">BARÔMETRO &amp; PRESSÃO</text>
  <text x="30" y="294" fill="#10b981" font-size="16" font-family="Arial, sans-serif" font-weight="bold">🧭 Alta (1018 hPa) • Tempo Firme</text>
  <text x="30" y="316" fill="#ffffff" font-size="12" font-family="Arial, sans-serif">Excelente! Peixes ativos em meia-água e superfície.</text>
  <text x="30" y="334" fill="#94a3b8" font-size="11" font-family="Arial, sans-serif">Dica: Use iscas de superfície (Zaras/Poppers).</text>
</svg>
`;

// 2. Square Screenshot 2: Defeso
const svgSquare2 = `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <rect width="360" height="360" rx="16" fill="#000000" />

  <!-- Topo -->
  <rect x="16" y="14" width="85" height="30" rx="8" fill="#1e293b" />
  <text x="58" y="34" fill="#ffffff" font-size="11" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ VOLTAR</text>
  <text x="215" y="35" fill="#38bdf8" font-size="18" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">DEFESO &amp; PIRACEMA</text>

  <!-- Botão Bacia -->
  <rect x="14" y="52" width="332" height="42" rx="10" fill="#0284c7" />
  <text x="180" y="78" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">🔄 Bacia do Rio Paraná / Sudeste ▾</text>

  <!-- Cartão de Status -->
  <rect x="14" y="102" width="332" height="100" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="2" />
  <text x="28" y="124" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">STATUS ATUAL DA BACIA</text>
  <text x="28" y="150" fill="#10b981" font-size="18" font-family="Arial, sans-serif" font-weight="bold">[ LIBERADO: PESCA PERMITIDA ]</text>
  <text x="28" y="172" fill="#ffffff" font-size="13" font-family="Arial, sans-serif">Período de Defeso: 01/11 até 28/02</text>
  <text x="28" y="190" fill="#64748b" font-size="11" font-family="Arial, sans-serif">Rios Paraná, Tietê, Paranapanema, Grande, Pardo</text>

  <!-- Cartão Espécies Protegidas -->
  <rect x="14" y="210" width="332" height="135" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
  <text x="28" y="234" fill="#fbbf24" font-size="14" font-family="Arial, sans-serif" font-weight="bold">🐟 ESPÉCIES NATIVAS PROTEGIDAS</text>
  <text x="28" y="258" fill="#ffffff" font-size="12" font-family="Arial, sans-serif">Dourado, Pintado, Jaú, Curimbatá, Piapara, Pacu</text>
  <text x="28" y="282" fill="#10b981" font-size="12" font-family="Arial, sans-serif">✔ Pesque-e-solte de tucunaré/tilápia liberado em represas.</text>
  <text x="28" y="304" fill="#ef4444" font-size="11" font-family="Arial, sans-serif">✖ Proibido redes, tarrafas e pescaria a 1500m de barragens.</text>
  <text x="28" y="324" fill="#64748b" font-size="10" font-family="Arial, sans-serif">Fiscalizado pela Polícia Ambiental e IBAMA</text>
</svg>
`;

// 3. Square Screenshot 3: Waypoints & Iscas
const svgSquare3 = `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <rect width="360" height="360" rx="16" fill="#000000" />

  <!-- Topo -->
  <rect x="16" y="14" width="85" height="30" rx="8" fill="#1e293b" />
  <text x="58" y="34" fill="#ffffff" font-size="11" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ VOLTAR</text>
  <text x="215" y="35" fill="#38bdf8" font-size="18" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">LOCAIS &amp; WAYPOINTS</text>

  <!-- Botão Marcar Ponto GPS -->
  <rect x="14" y="52" width="332" height="42" rx="10" fill="#10b981" />
  <text x="180" y="78" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">📍 + MARCAR PONTO GPS</text>

  <!-- Waypoint 1 -->
  <rect x="14" y="102" width="332" height="88" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
  <text x="28" y="126" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Ponto do Tronco Caído</text>
  <text x="28" y="148" fill="#38bdf8" font-size="12" font-family="Arial, sans-serif">06:30 • Lat -22.4512° / Lon -47.1234°</text>
  <text x="28" y="168" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Excelente para Tucunaré na superfície</text>
  
  <rect x="260" y="120" width="70" height="34" rx="8" fill="#3f1515" />
  <text x="295" y="142" fill="#ef4444" font-size="11" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">EXCLUIR</text>

  <!-- Guia de Iscas -->
  <text x="28" y="214" fill="#38bdf8" font-size="15" font-family="Arial, sans-serif" font-weight="bold">GUIA DE ISCAS POR LOCAL</text>
  
  <rect x="14" y="226" width="332" height="118" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
  <text x="28" y="250" fill="#fbbf24" font-size="14" font-family="Arial, sans-serif" font-weight="bold">🎣 Represas &amp; Lagos</text>
  <text x="28" y="272" fill="#ffffff" font-size="12" font-family="Arial, sans-serif">Peixes: Tucunaré, Tilápia, Traíra, Black Bass</text>
  <text x="28" y="294" fill="#38bdf8" font-size="12" font-family="Arial, sans-serif">Iscas: Superfície (Zara/Popper), Meia-água, Softs</text>
  <text x="28" y="316" fill="#94a3b8" font-size="11" font-family="Arial, sans-serif">Dica: Procure troncos submersos e pontas de ilhas.</text>
</svg>
`;

async function generateSquare() {
  const screens = [
    { name: 'square_screenshot_1_home.png', svg: svgSquare1 },
    { name: 'square_screenshot_2_defeso.png', svg: svgSquare2 },
    { name: 'square_screenshot_3_waypoints.png', svg: svgSquare3 },
  ];

  for (const s of screens) {
    const dest = path.join(outDir, s.name);
    await sharp(Buffer.from(s.svg))
      .resize(360, 360)
      .png()
      .toFile(dest);
    console.log('Gerado Square com sucesso:', dest);
  }
}

generateSquare().catch(console.error);
