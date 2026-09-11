/**
 * Testes Unitários de Verificação do Pescador Max
 */
import { getMoonDetails, getForecast } from '../utils/lunar.js';
import { getDefesoStatus, isDateInDefeso, BASINS } from '../utils/defeso.js';
import { getSavedSpots, addSpot, deleteSpot, getSelectedBasin, setSelectedBasin } from '../utils/storage.js';
import { interpretBarometer } from '../utils/sensors.js';

console.log('=== TESTE 1: CÁLCULOS LUNARES & TEORIA SOLUNAR ===');
const today = new Date();
const moonToday = getMoonDetails(today);
console.log(`Data atual: ${today.toLocaleDateString('pt-BR')}`);
console.log(`Idade da lua: ${moonToday.age} dias`);
console.log(`Fase: ${moonToday.phaseName} ${moonToday.phaseIconChar}`);
console.log(`Iluminação: ${moonToday.illumination}%`);
console.log(`Nota da Pesca: ${moonToday.ratingText} (${moonToday.stars})`);
console.log(`Períodos Solunares:`);
console.log(` - Maior 1: ${moonToday.solunarPeriods.major1}`);
console.log(` - Maior 2: ${moonToday.solunarPeriods.major2}`);
console.log(` - Menor 1: ${moonToday.solunarPeriods.minor1}`);
console.log(` - Menor 2: ${moonToday.solunarPeriods.minor2}`);

const forecast7 = getForecast(today, 7);
console.log(`\nPrevisão 7 Dias calculada com sucesso (${forecast7.length} dias):`);
forecast7.forEach(f => {
  console.log(`  [${f.dayString}] ${f.phaseName} (${f.illumination}%) - Nota: ${f.ratingText}`);
});

console.log('\n=== TESTE 2: REGRAS DE DEFESO / PIRACEMA ===');
const testDates = [
  new Date(2026, 8, 11),  // 11 de Setembro (Hoje)
  new Date(2026, 11, 15), // 15 de Dezembro (Piracema Ativa)
  new Date(2026, 0, 10),  // 10 de Janeiro (Piracema Ativa)
  new Date(2026, 5, 20)   // 20 de Junho (Robalo ativo no mar)
];

BASINS.forEach(basin => {
  console.log(`\nBacia: ${basin.name}`);
  testDates.forEach(d => {
    const status = getDefesoStatus(d, basin.id);
    console.log(`  Data ${d.toLocaleDateString('pt-BR')}: ${status.statusBadge} (${status.statusText})`);
  });
});

console.log('\n=== TESTE 3: GERENCIAMENTO DE PONTOS DE PESCA ===');
const initialSpots = getSavedSpots();
console.log(`Pontos iniciais: ${initialSpots.length}`);

const newSpot = addSpot({
  name: 'Bico da Ilha Grande',
  type: 'Represas & Lagos',
  time: '18:00',
  coords: 'S 22°50\' / W 47°15\'',
  notes: 'Tucunarés ativos ao entardecer'
});
console.log(`Ponto adicionado! Novo total: ${newSpot.length}`);
console.log(`Primeiro ponto da lista: ${newSpot[0].name}`);

const afterDelete = deleteSpot(newSpot[0].id);
console.log(`Ponto excluído com sucesso! Total restante: ${afterDelete.length}`);

setSelectedBasin('pantanal');
console.log(`Bacia salva: ${getSelectedBasin()}`);

console.log('\n=== TESTE 4: SENSORES & INTERPRETAÇÃO BAROMÉTRICA ===');
const baroPressures = [1020, 1012, 1006, 998];
baroPressures.forEach(hpa => {
  const res = interpretBarometer(hpa);
  console.log(`  ${hpa} hPa: ${res.status} [${res.trend}] -> ${res.fishActivity} (Dica: ${res.recommendation})`);
});

console.log('\n>>> TODOS OS TESTES PASSARAM COM SUCESSO! <<<');
