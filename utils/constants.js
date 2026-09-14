/**
 * constants.js - Paleta de Cores e Estilos para o Pescador Max
 * Inspirado nas cores do ícone oficial: Azul Oceano, Laranja Coral e Prata Metálico
 * Suporte completo a Dark Mode (AMOLED) e Light / White Mode (Alta Visibilidade Diurna)
 */

export function getColors(theme = 'dark') {
  const isLight = theme === 'light';

  return {
    isLight,
    BG: isLight ? 0xf1f5f9 : 0x000000,
    CARD_BG: isLight ? 0xffffff : 0x0f172a,
    CARD_BORDER: isLight ? 0xcfd8dc : 0x1e293b,
    // Cores oficiais do peixe e água:
    PRIMARY: isLight ? 0x0284c7 : 0x38bdf8,        // Azul Oceano / Ciano
    PRIMARY_DARK: 0x0284c7,
    ACCENT_ORANGE: isLight ? 0xea580c : 0xf97316,  // Laranja Coral do peixe do ícone!
    ACCENT_GOLD: isLight ? 0xea580c : 0xf97316,    // Destaque de cabeçalho
    SUCCESS: isLight ? 0x059669 : 0x10b981,        // Verde
    WARNING: isLight ? 0xd97706 : 0xf59e0b,        // Laranja Atenção
    DANGER: isLight ? 0xdc2626 : 0xef4444,         // Vermelho
    TEXT_MAIN: isLight ? 0x0f172a : 0xffffff,      // Preto azulado no claro / Branco no escuro
    TEXT_MUTED: isLight ? 0x475569 : 0x94a3b8,
    TEXT_DIM: isLight ? 0x64748b : 0x64748b,
    BTN_BG: isLight ? 0xe2e8f0 : 0x1e293b,
    BTN_PRESS: isLight ? 0xcbd5e1 : 0x334155,
    BTN_TEXT: isLight ? 0x0f172a : 0xffffff,
    BTN_ACTION_BG: 0x0284c7,
    BTN_ACTION_PRESS: 0x0369a1,
    BTN_ACTION_TEXT: 0xffffff,
    BADGE_BG: isLight ? 0xe0f2fe : 0x162438
  };
}

// Mantido para compatibilidade com import direto de COLORS
export const COLORS = getColors('dark');

/**
 * Retorna configurações de layout adaptadas para relógios redondos e retangulares
 */
export function getLayoutConfig() {
  let isRound = false;
  try {
    const { getDeviceInfo, SCREEN_SHAPE_ROUND } = require('@zos/device');
    const info = getDeviceInfo();
    isRound = info && info.screenShape === SCREEN_SHAPE_ROUND;
  } catch (e) {}

  return {
    isRound,
    marginX: isRound ? 36 : 16,
    cardW: isRound ? 360 : 400,
    topPadding: isRound ? 46 : 24,
    bottomPadding: isRound ? 70 : 40
  };
}
