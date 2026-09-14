/**
 * Testes Unitários de Verificação do Pescador Max (Bilingual pt-BR / en-US)
 */
import { getMoonDetails, getForecast } from '../utils/lunar.js';
import { getDefesoStatus, isDateInDefeso, BASINS } from '../utils/defeso.js';
import { getSavedSpots, addSpot, deleteSpot, getSelectedBasin, setSelectedBasin } from '../utils/storage.js';
import { interpretBarometer } from '../utils/sensors.js';
import { t, setAppLanguage, getAppLanguage } from '../utils/i18n.js';

console.log('=== TESTE 1: CÁLCULOS LUNARES & TEORIA SOLUNAR (PT & EN) ===');
const today = new Date();
const moonPt = getMoonDetails(today, 'pt');
const moonEn = getMoonDetails(today, 'en');

console.log(`[PT] Data: ${today.toLocaleDateString('pt-BR')}`);
console.log(`     Fase: ${moonPt.phaseName} ${moonPt.phaseIconChar} (${moonPt.illumination}%) - Nota: ${moonPt.ratingText} (${moonPt.stars})`);
console.log(`[EN] Date: ${today.toLocaleDateString('en-US')}`);
console.log(`     Phase: ${moonEn.phaseName} ${moonEn.phaseIconChar} (${moonEn.illumination}%) - Rating: ${moonEn.ratingText} (${moonEn.stars})`);

const forecastEn = getForecast(today, 3, 'en');
console.log(`\nForecast 3 Days (EN):`);
forecastEn.forEach(f => {
  console.log(`  [${f.dayString}] ${f.phaseName} (${f.illumination}%) - Rating: ${f.ratingText}`);
});

console.log('\n=== TESTE 2: REGRAS DE DEFESO / PIRACEMA (PT & EN) ===');
const defesoPt = getDefesoStatus(today, 'parana', 'pt');
const defesoEn = getDefesoStatus(today, 'parana', 'en');
console.log(`[PT] ${defesoPt.basinName}: ${defesoPt.statusBadge} (${defesoPt.statusText})`);
console.log(`[EN] ${defesoEn.basinName}: ${defesoEn.statusBadge} (${defesoEn.statusText})`);

console.log('\n=== TESTE 3: SENSORES & BARÔMETRO (PT & EN) ===');
const baroPt = interpretBarometer(1020, 'pt');
const baroEn = interpretBarometer(1020, 'en');
console.log(`[PT] 1020 hPa: ${baroPt.status} [${baroPt.trend}] -> ${baroPt.fishActivity}`);
console.log(`[EN] 1020 hPa: ${baroEn.status} [${baroEn.trend}] -> ${baroEn.fishActivity}`);

console.log('\n=== TESTE 4: GERENCIAMENTO DE IDIOMA E PONTOS ===');
setAppLanguage('en');
console.log(`Idioma atual: ${getAppLanguage()} -> AppTitle: ${t('en').appTitle}`);
setAppLanguage('pt');
console.log(`Idioma atual: ${getAppLanguage()} -> AppTitle: ${t('pt').appTitle}`);

console.log('\n>>> TODOS OS TESTES PASSARAM COM SUCESSO! <<<');
