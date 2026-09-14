/**
 * Adiciona a screenshot square do Forecast (Previsão 7 Dias)
 */
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const sharpPath = pathToFileURL('C:/Users/aprom/AppData/Roaming/npm/node_modules/@zeppos/zeus-cli/node_modules/sharp/lib/index.js').href;
const sharp = (await import(sharpPath)).default;

const outDir = path.resolve('./store_assets');

const svgSquareForecast = `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <rect width="360" height="360" rx="16" fill="#000000" />

  <!-- Topo -->
  <rect x="16" y="14" width="85" height="30" rx="8" fill="#1e293b" />
  <text x="58" y="34" fill="#ffffff" font-size="11" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">◀ VOLTAR</text>
  <text x="215" y="35" fill="#38bdf8" font-size="18" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">PREVISÃO 7 DIAS</text>

  <!-- Dia 1: Hoje -->
  <rect x="14" y="52" width="332" height="90" rx="12" fill="#162438" stroke="#38bdf8" stroke-width="2" />
  <text x="28" y="74" fill="#38bdf8" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Segunda, 14/09 [HOJE]</text>
  <text x="28" y="96" fill="#f97316" font-size="13" font-family="Arial, sans-serif">Crescente Côncava • 23% Iluminação</text>
  <text x="28" y="116" fill="#10b981" font-size="13" font-family="Arial, sans-serif" font-weight="bold">Pesca: BOM ★★★☆</text>
  <text x="28" y="134" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Pico Maior: 13:57 - 15:57 | Menor: 19:57 - 20:57</text>

  <!-- Dia 2: Amanhã -->
  <rect x="14" y="152" width="332" height="90" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
  <text x="28" y="174" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Terça, 15/09</text>
  <text x="28" y="196" fill="#f97316" font-size="13" font-family="Arial, sans-serif">Crescente Côncava • 32% Iluminação</text>
  <text x="28" y="216" fill="#10b981" font-size="13" font-family="Arial, sans-serif" font-weight="bold">Pesca: BOM ★★★☆</text>
  <text x="28" y="234" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Pico Maior: 14:45 - 16:45 | Menor: 20:45 - 21:45</text>

  <!-- Dia 3 -->
  <rect x="14" y="252" width="332" height="90" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
  <text x="28" y="274" fill="#ffffff" font-size="15" font-family="Arial, sans-serif" font-weight="bold">Quarta, 16/09</text>
  <text x="28" y="296" fill="#f97316" font-size="13" font-family="Arial, sans-serif">Quarto Crescente • 42% Iluminação</text>
  <text x="28" y="316" fill="#f59e0b" font-size="13" font-family="Arial, sans-serif" font-weight="bold">Pesca: REGULAR ★★☆☆</text>
  <text x="28" y="334" fill="#94a3b8" font-size="12" font-family="Arial, sans-serif">Pico Maior: 15:30 - 17:30 | Menor: 21:30 - 22:30</text>
</svg>
`;

async function run() {
  const dest1 = path.join(outDir, 'square_screenshot_4_forecast.png');
  const dest2 = path.join(outDir, 'square_screenshot_2_forecast.png');
  const buf = await sharp(Buffer.from(svgSquareForecast)).resize(360, 360).png().toBuffer();
  fs.writeFileSync(dest1, buf);
  fs.writeFileSync(dest2, buf);
  console.log('Gerado com sucesso:', dest1, dest2);
}

run().catch(console.error);
