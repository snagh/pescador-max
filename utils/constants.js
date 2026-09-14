/**
 * constants.js - Paleta de Cores e Estilos Apple Watch / Bento Grid para o PescaMax
 * Inspirado em watchOS 10: Fundo AMOLED preto puro, cartões Bento com cantos arredondados,
 * tipografia com números grandes em negrito e cores néon vibrantes de alto contraste.
 */

export function getColors(theme = 'dark') {
  const isLight = theme === 'light';

  return {
    isLight,
    BG: isLight ? 0xf1f5f9 : 0x000000,
    CARD_BG: isLight ? 0xffffff : 0x161e2e,
    CARD_BORDER: isLight ? 0xcfd8dc : 0x26354d,
    
    // Cores vibrantes estilo Apple Watch (watchOS 10):
    PRIMARY: isLight ? 0x0284c7 : 0x00d2ff,        // Ciano Elétrico / Neon Blue
    PRIMARY_DARK: 0x0284c7,
    ACCENT_ORANGE: isLight ? 0xea580c : 0xff6b4a,  // Laranja Coral Neon
    ACCENT_GOLD: isLight ? 0xd97706 : 0xffd600,    // Dourado Solunar
    SUCCESS: isLight ? 0x059669 : 0x00e676,        // Verde Esmeralda Neon
    WARNING: isLight ? 0xd97706 : 0xffb300,        // Ambar Alerta
    DANGER: isLight ? 0xdc2626 : 0xff3b30,         // Vermelho Apple
    PURPLE: isLight ? 0x7c3aed : 0xa855f7,         // Roxo Neon
    
    TEXT_MAIN: isLight ? 0x0f172a : 0xffffff,      // Preto azulado no claro / Branco puro no escuro
    TEXT_MUTED: isLight ? 0x475569 : 0x94a3b8,
    TEXT_DIM: isLight ? 0x64748b : 0x64748b,
    
    BTN_BG: isLight ? 0xe2e8f0 : 0x1c2433,
    BTN_PRESS: isLight ? 0xcbd5e1 : 0x2d3a4f,
    BTN_TEXT: isLight ? 0x0f172a : 0xffffff,
    
    BTN_ACTION_BG: 0x0077ed,
    BTN_ACTION_PRESS: 0x0055b3,
    BTN_ACTION_TEXT: 0xffffff,
    
    BADGE_BG: isLight ? 0xe0f2fe : 0x1e2e42,
    BADGE_SUCCESS: isLight ? 0xdcfce7 : 0x052e16,
    BADGE_DANGER: isLight ? 0xfee2e2 : 0x450a0a
  };
}

export const COLORS = getColors('dark');

/**
 * Retorna configurações de layout adaptadas para Amazfit Bip Max (432x514)
 * Otimizado para iniciar abaixo da barra de status nativa do Zepp OS (y >= 68)
 */
export function getLayoutConfig() {
  let isRound = false;
  let screenWidth = 432;
  let screenHeight = 514;
  try {
    const { getDeviceInfo, SCREEN_SHAPE_ROUND } = require('@zos/device');
    const info = getDeviceInfo();
    if (info) {
      if (info.width) screenWidth = info.width;
      if (info.height) screenHeight = info.height;
      isRound = info.screenShape === SCREEN_SHAPE_ROUND;
    }
  } catch (e) {}

  const marginX = isRound ? Math.round(screenWidth * 0.08) : 16;
  const cardW = screenWidth - (marginX * 2);
  const colGap = 12;
  const colW = Math.floor((cardW - colGap) / 2); // Exatamente 194px no Bip Max

  return {
    isRound,
    screenWidth,
    screenHeight,
    marginX,
    cardW,
    colGap,
    colW,
    topPadding: isRound ? 72 : 68, // Crucial: deixa espaço para o relógio nativo "PescaMax 14:43"
    bottomPadding: isRound ? 64 : 36,
    radiusBento: 20,
    radiusBtn: 18,
    radiusPill: 24
  };
}
