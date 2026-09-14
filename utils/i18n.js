/**
 * i18n.js - Sistema Internacionalização Bilíngue (Português / English)
 * Suporte a detecção automática e alternância manual pelo usuário
 */
import { getItem, setItem } from './storage.js';

export function getAppLanguage() {
  const saved = getItem('user_language', null);
  if (saved) return saved;

  try {
    const { getLanguage } = require('@zos/settings');
    const sysLang = getLanguage();
    // No Zepp OS, 0 ou códigos com pt representam Português
    if (typeof sysLang === 'string' && sysLang.toLowerCase().startsWith('en')) {
      return 'en';
    }
  } catch (e) {}

  return 'pt'; // Padrão
}

export function setAppLanguage(lang) {
  setItem('user_language', lang === 'en' ? 'en' : 'pt');
}

export const STRINGS = {
  pt: {
    appTitle: 'PESCAMAX 🎣',
    langToggle: '🇧🇷 PT ▾',
    themeDark: '🌙 ESCURO ▾',
    themeLight: '☀️ CLARO ▾',
    weekDays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    illumination: 'Iluminação',
    age: 'Idade',
    fishing: 'PESCA',
    majorPeak: 'Pico Maior',
    minorPeak: 'Pico Menor',
    todayBadge: 'HOJE',
    
    // Barômetro
    baroTitle: 'BARÔMETRO & PRESSÃO',
    baroHigh: 'Alta',
    baroStable: 'Estável',
    baroLow: 'Baixa',
    baroVeryLow: 'Muito Baixa',
    trendHigh: 'Tempo Firme',
    trendStable: 'Pressão Normal',
    trendLow: 'Queda de Pressão',
    trendVeryLow: 'Frente Fria / Chuva',
    descHigh: 'Excelente! Peixes ativos e caçando.',
    descStable: 'Boa atividade alimentar dos peixes.',
    descLow: 'Atenção: Frente fria ou chuva.',
    descVeryLow: 'Peixes inativos no fundo das represas/rios.',
    tipHigh: 'Dica: Use iscas de superfície e meia-água.',
    tipStable: 'Dica: Iscas de meia-água e fundo.',
    tipLow: 'Dica: Peixes atacam antes da chuva; diminua a isca.',
    tipVeryLow: 'Dica: Pesca de espera com isca viva ou massa no fundo.',

    // Defeso
    defesoTitle: 'DEFESO & PIRACEMA',
    defesoBadgeOpen: 'LIBERADO',
    defesoBadgeClosed: 'DEFESO',
    defesoTextOpen: 'PESCA LIBERADA',
    defesoTextClosed: 'PERÍODO DE DEFESO ATIVO',
    defesoTapDetails: '(Toque p/ detalhes)',
    defesoTapChange: 'Toque para trocar de região / bacia:',
    defesoCurrentStatus: 'STATUS ATUAL',
    defesoPeriod: 'Período',
    defesoProtected: '🐟 ESPÉCIES PROTEGIDAS',
    defesoAllowed: 'O QUE É PERMITIDO:',
    defesoProhibited: 'O QUE É PROIBIDO:',
    defesoFooter: 'Pesca Consciente • Preserve Nossos Rios',
    regionLabel: 'Bacia Hidrográfica',
    regionTapChange: 'Toque p/ alternar (6 Bacias)',

    // Pontos & Iscas
    spotsTitle: 'LOCAIS & PONTOS',
    spotsMarkBtn: '📍 + MARCAR PONTO GPS',
    spotsMyWaypoints: 'MEUS WAYPOINTS',
    spotsDelete: 'EXCLUIR',
    spotsGuideTitle: 'GUIA DE ISCAS POR LOCAL',
    spotsFooter: 'Boas Pescarias! • Pescador Max',

    // Botões de Navegação
    btnForecast: '🌙  PREVISÃO 7 DIAS',
    btnDefeso: '🚫  DEFESO & REGRAS',
    btnSpots: '📍  PONTOS & ISCAS',
    btnRefresh: '🔄  ATUALIZAR SENSORES',
    btnBack: '◀ VOLTAR',
    btnBackHome: '◀ VOLTAR AO INÍCIO',

    // Previsão
    forecastTitle: 'PREVISÃO 7 DIAS',
    forecastSub: 'Melhores dias e horários:',
    solunarFooter: 'Teoria Solunar • John Alden Knight'
  },
  en: {
    appTitle: 'PESCAMAX 🎣',
    langToggle: '🇺🇸 EN ▾',
    themeDark: '🌙 DARK ▾',
    themeLight: '☀️ LIGHT ▾',
    weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    illumination: 'Illumination',
    age: 'Age',
    fishing: 'FISHING',
    majorPeak: 'Major Peak',
    minorPeak: 'Minor Peak',
    todayBadge: 'TODAY',

    // Barometer
    baroTitle: 'BAROMETER & PRESSURE',
    baroHigh: 'High',
    baroStable: 'Stable',
    baroLow: 'Low',
    baroVeryLow: 'Very Low',
    trendHigh: 'Fair Weather',
    trendStable: 'Normal Pressure',
    trendLow: 'Pressure Drop',
    trendVeryLow: 'Cold Front / Storm',
    descHigh: 'Excellent! Fish actively feeding.',
    descStable: 'Good and consistent feeding activity.',
    descLow: 'Warning: Approaching front or rain.',
    descVeryLow: 'Fish sluggish on deep structures.',
    tipHigh: 'Tip: Use topwater and shallow lures.',
    tipStable: 'Tip: Mid-depth crankbaits and jigs.',
    tipLow: 'Tip: Bite spikes before rain, then slows.',
    tipVeryLow: 'Tip: Slow presentations on the bottom.',

    // Closed Seasons
    defesoTitle: 'CLOSED SEASONS',
    defesoBadgeOpen: 'OPEN',
    defesoBadgeClosed: 'CLOSED',
    defesoTextOpen: 'FISHING ALLOWED',
    defesoTextClosed: 'CLOSED SEASON ACTIVE',
    defesoTapDetails: '(Tap for regulations)',
    defesoTapChange: 'Tap to switch region / basin:',
    defesoCurrentStatus: 'CURRENT STATUS',
    defesoPeriod: 'Period',
    defesoProtected: '🐟 PROTECTED SPECIES',
    defesoAllowed: '✔ WHAT IS ALLOWED',
    defesoProhibited: '✖ WHAT IS PROHIBITED',
    defesoFooter: 'Preserve aquatic ecosystems',
    regionLabel: 'River Basin Region',
    regionTapChange: 'Tap to switch (6 Basins)',

    // Spots & Baits
    spotsTitle: 'SPOTS & BAITS',
    spotsMarkBtn: '📍 + MARK GPS SPOT',
    spotsMyWaypoints: 'MY WAYPOINTS',
    spotsDelete: 'DELETE',
    spotsGuideTitle: 'BAIT GUIDE BY SPOT',
    spotsFooter: 'Tight Lines! • Angler Max',

    // Navigation Buttons
    btnForecast: '🌙  7-DAY FORECAST',
    btnDefeso: '🚫  CLOSED SEASONS',
    btnSpots: '📍  SPOTS & BAITS',
    btnRefresh: '🔄  REFRESH SENSORS',
    btnBack: '◀ BACK',
    btnBackHome: '◀ BACK TO HOME',

    // Forecast
    forecastTitle: '7-DAY FORECAST',
    forecastSub: 'Best fishing days and times:',
    solunarFooter: 'Solunar Theory • John Alden Knight'
  }
};

export function t(lang = null) {
  const currentLang = lang || getAppLanguage();
  return STRINGS[currentLang] || STRINGS.pt;
}
