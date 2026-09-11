/**
 * lunar.js - Algoritmo Astronômico de Fases da Lua e Teoria Solunar
 * Autônomo e offline para Zepp OS
 */

// Constantes astronômicas
const SYNODIC_MONTH = 29.53058867; // Duração média do mês sinódico em dias
// Lua Nova de referência: 6 de janeiro de 2000 às 18:14 UTC (JDN = 2451549.26)
const REF_NEW_MOON_JDN = 2451549.26;

/**
 * Converte data para Julian Day Number (JDN)
 */
export function getJulianDate(date = new Date()) {
  const time = date.getTime();
  return time / 86400000.0 + 2440587.5;
}

/**
 * Calcula a idade da lua (em dias, de 0 a 29.53)
 */
export function getMoonAge(date = new Date()) {
  const jdn = getJulianDate(date);
  let daysSinceRef = (jdn - REF_NEW_MOON_JDN) % SYNODIC_MONTH;
  if (daysSinceRef < 0) {
    daysSinceRef += SYNODIC_MONTH;
  }
  return daysSinceRef;
}

/**
 * Calcula a fase da lua e detalhes completos
 */
export function getMoonDetails(date = new Date()) {
  const age = getMoonAge(date);

  // Porcentagem de iluminação (0% a 100%)
  const illumination = Math.round((1 - Math.cos((age / SYNODIC_MONTH) * 2 * Math.PI)) * 50);

  let phaseIndex = 0;
  let phaseName = '';
  let phaseIconChar = '';
  let phaseDescription = '';

  // 8 fases principais
  if (age < 1.84566) {
    phaseIndex = 0;
    phaseName = 'Lua Nova';
    phaseIconChar = '🌑';
    phaseDescription = 'Excelente para peixes de fundo e predadores noturnos.';
  } else if (age < 5.53699) {
    phaseIndex = 1;
    phaseName = 'Crescente Côncava';
    phaseIconChar = '🌒';
    phaseDescription = 'Atividade em aumento. Boa para peixes em transição.';
  } else if (age < 9.22831) {
    phaseIndex = 2;
    phaseName = 'Quarto Crescente';
    phaseIconChar = '🌓';
    phaseDescription = 'Atividade média/boa. Água mais clara e corrente estável.';
  } else if (age < 12.91964) {
    phaseIndex = 3;
    phaseName = 'Crescente Gibosa';
    phaseIconChar = '🌔';
    phaseDescription = 'Muito favorável para peixes de superfície e predadores.';
  } else if (age < 16.61096) {
    phaseIndex = 4;
    phaseName = 'Lua Cheia';
    phaseIconChar = '🌕';
    phaseDescription = 'Pico de atividade alimentar! Maré alta de peixes ativos.';
  } else if (age < 20.30229) {
    phaseIndex = 5;
    phaseName = 'Minguante Gibosa';
    phaseIconChar = '🌖';
    phaseDescription = 'Boa movimentação matinal e no final da tarde.';
  } else if (age < 23.99361) {
    phaseIndex = 6;
    phaseName = 'Quarto Minguante';
    phaseIconChar = '🌗';
    phaseDescription = 'Atividade moderada. Peixes mais manhosos, use iscas menores.';
  } else if (age < 27.68494) {
    phaseIndex = 7;
    phaseName = 'Minguante Côncava';
    phaseIconChar = '🌘';
    phaseDescription = 'Boa para pesca de espera e poços profundos.';
  } else {
    phaseIndex = 0;
    phaseName = 'Lua Nova';
    phaseIconChar = '🌑';
    phaseDescription = 'Excelente para peixes de fundo e predadores noturnos.';
  }

  // Avaliação Solunar da pesca (1 a 4 estrelas)
  let rating = 3;
  let ratingText = 'Bom';
  let stars = '★★★☆';

  if (phaseIndex === 0 || phaseIndex === 4) {
    rating = 4;
    ratingText = 'Excelente';
    stars = '★★★★';
  } else if (phaseIndex === 3 || phaseIndex === 5) {
    rating = 3.5;
    ratingText = 'Muito Bom';
    stars = '★★★★';
  } else if (phaseIndex === 1 || phaseIndex === 7) {
    rating = 2.5;
    ratingText = 'Bom';
    stars = '★★★☆';
  } else {
    rating = 2;
    ratingText = 'Regular';
    stars = '★★☆☆';
  }

  // Horários de pico Solunares
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

/**
 * Previsão dos próximos N dias
 */
export function getForecast(startDate = new Date(), daysCount = 7) {
  const forecast = [];
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  for (let i = 0; i < daysCount; i++) {
    const d = new Date(startDate.getTime() + i * 86400000);
    const details = getMoonDetails(d);
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
