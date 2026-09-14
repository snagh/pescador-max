/**
 * lunar.js - Algoritmo Astronômico de Fases da Lua e Teoria Solunar
 * Autônomo e offline para Zepp OS com suporte a pt-BR e en-US
 */

const SYNODIC_MONTH = 29.53058867; // Duração média do mês sinódico em dias
const REF_NEW_MOON_JDN = 2451549.26; // 6 de janeiro de 2000 às 18:14 UTC

export function getJulianDate(date = new Date()) {
  const time = date.getTime();
  return time / 86400000.0 + 2440587.5;
}

export function getMoonAge(date = new Date()) {
  const jdn = getJulianDate(date);
  let daysSinceRef = (jdn - REF_NEW_MOON_JDN) % SYNODIC_MONTH;
  if (daysSinceRef < 0) {
    daysSinceRef += SYNODIC_MONTH;
  }
  return daysSinceRef;
}

const PHASE_NAMES = {
  pt: [
    'Lua Nova', 'Crescente Côncava', 'Quarto Crescente', 'Crescente Gibosa',
    'Lua Cheia', 'Minguante Gibosa', 'Quarto Minguante', 'Minguante Côncava'
  ],
  en: [
    'New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
    'Full Moon', 'Waning Gibbous', 'Third Quarter', 'Waning Crescent'
  ]
};

const PHASE_DESCRIPTIONS = {
  pt: [
    'Excelente para peixes de fundo e predadores noturnos.',
    'Atividade em aumento. Boa para peixes em transição.',
    'Atividade média/boa. Água mais clara e corrente estável.',
    'Muito favorável para peixes de superfície e predadores.',
    'Pico de atividade alimentar! Maré alta de peixes ativos.',
    'Boa movimentação matinal e no final da tarde.',
    'Atividade moderada. Peixes mais manhosos, use iscas menores.',
    'Boa para pesca de espera e poços profundos.'
  ],
  en: [
    'Excellent for bottom feeding and night predators.',
    'Feeding activity rising. Good for active fish.',
    'Moderate feeding. Clearer water and stable currents.',
    'Very favorable for topwater and predatory fish.',
    'Peak feeding activity! High solunar period.',
    'Good movement in early morning and late afternoon.',
    'Moderate activity. Picky fish, downsize presentations.',
    'Good for still fishing and deep structures.'
  ]
};

const ICONS = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

export function getMoonDetails(date = new Date(), lang = 'pt') {
  const age = getMoonAge(date);
  const illumination = Math.round((1 - Math.cos((age / SYNODIC_MONTH) * 2 * Math.PI)) * 50);
  const isEn = lang === 'en';

  let phaseIndex = 0;
  if (age < 1.84566) phaseIndex = 0;
  else if (age < 5.53699) phaseIndex = 1;
  else if (age < 9.22831) phaseIndex = 2;
  else if (age < 12.91964) phaseIndex = 3;
  else if (age < 16.61096) phaseIndex = 4;
  else if (age < 20.30229) phaseIndex = 5;
  else if (age < 23.99361) phaseIndex = 6;
  else if (age < 27.68494) phaseIndex = 7;
  else phaseIndex = 0;

  const names = isEn ? PHASE_NAMES.en : PHASE_NAMES.pt;
  const descs = isEn ? PHASE_DESCRIPTIONS.en : PHASE_DESCRIPTIONS.pt;

  const phaseName = names[phaseIndex];
  const phaseIconChar = ICONS[phaseIndex];
  const phaseDescription = descs[phaseIndex];

  let rating = 3;
  let ratingText = isEn ? 'Good' : 'Bom';
  let stars = '★★★☆';

  if (phaseIndex === 0 || phaseIndex === 4) {
    rating = 4;
    ratingText = isEn ? 'Excellent' : 'Excelente';
    stars = '★★★★';
  } else if (phaseIndex === 3 || phaseIndex === 5) {
    rating = 3.5;
    ratingText = isEn ? 'Very Good' : 'Muito Bom';
    stars = '★★★★';
  } else if (phaseIndex === 1 || phaseIndex === 7) {
    rating = 2.5;
    ratingText = isEn ? 'Good' : 'Bom';
    stars = '★★★☆';
  } else {
    rating = 2;
    ratingText = isEn ? 'Fair' : 'Regular';
    stars = '★★☆☆';
  }

  const moonTransitHours = (age * (24 / SYNODIC_MONTH)) % 24;
  
  const major1Start = (moonTransitHours + 24 - 1) % 24;
  const major1End = (moonTransitHours + 1) % 24;
  const major2Start = (major1Start + 12) % 24;
  const major2End = (major1End + 12) % 24;

  const minor1Start = (major1Start + 6) % 24;
  const minor1End = (major1Start + 7) % 24;
  const minor2Start = (major1Start + 18) % 24;
  const minor2End = (major1Start + 19) % 24;

  const formatHour = (h) => {
    const hours = Math.floor(h);
    const mins = Math.floor((h - hours) * 60);
    return `${hours < 10 ? '0' : ''}${hours}:${mins < 10 ? '0' : ''}${mins}`;
  };

  return {
    age: Math.round(age * 10) / 10,
    illumination,
    phaseIndex,
    phaseName,
    phaseIconChar,
    phaseDescription,
    rating,
    ratingText,
    stars,
    solunarPeriods: {
      major1: `${formatHour(major1Start)} - ${formatHour(major1End)}`,
      major2: `${formatHour(major2Start)} - ${formatHour(major2End)}`,
      minor1: `${formatHour(minor1Start)} - ${formatHour(minor1End)}`,
      minor2: `${formatHour(minor2Start)} - ${formatHour(minor2End)}`
    }
  };
}

export function getForecast(startDate = new Date(), daysCount = 7, lang = 'pt') {
  const forecast = [];
  const isEn = lang === 'en';
  const weekDays = isEn 
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  for (let i = 0; i < daysCount; i++) {
    const d = new Date(startDate.getTime() + i * 86400000);
    const details = getMoonDetails(d, lang);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const weekDay = weekDays[d.getDay()];

    forecast.push({
      date: d,
      dayString: `${weekDay}, ${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}`,
      isToday: i === 0,
      ...details
    });
  }

  return forecast;
}
