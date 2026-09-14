/**
 * page/home/index.js - Dashboard Bento Grid Ultra-Premium para o PescaMax
 * Inspirado na linguagem visual do Apple Watch (watchOS 10):
 * - Grid Bento 2x2 e cartões assimétricos com cantos arredondados (raio 22px)
 * - Números gigantes em negrito de alta legibilidade (36px)
 * - Cores néon vibrantes (Ciano Elétrico, Laranja Coral, Verde Esmeralda)
 * - Informações de pesca glanceáveis na PRIMEIRA tela sem precisar rolar
 * - Reatividade instantânea em tempo real (zero delay / sem restart)
 */
import * as hmUI from '@zos/ui';
import { push } from '@zos/router';
import { px } from '@zos/utils';
import { getMoonDetails } from '../../utils/lunar.js';
import { getDefesoStatus, getNextBasinId } from '../../utils/defeso.js';
import { getSelectedBasin, setSelectedBasin, getUserTheme, setUserTheme, getSavedSpots } from '../../utils/storage.js';
import { getBarometerReading } from '../../utils/sensors.js';
import { getAppLanguage, setAppLanguage, t } from '../../utils/i18n.js';
import { getColors, getLayoutConfig } from '../../utils/constants.js';

Page({
  state: {
    widgets: []
  },

  build() {
    this.renderUI();
  },

  createWidget(type, props) {
    const w = hmUI.createWidget(type, props);
    this.state.widgets.push(w);
    return w;
  },

  clearUI() {
    if (this.state.widgets && this.state.widgets.length > 0) {
      this.state.widgets.forEach((w) => {
        try {
          hmUI.deleteWidget(w);
        } catch (e) {}
      });
      this.state.widgets = [];
    }
  },

  renderUI() {
    const lang = getAppLanguage();
    const str = t(lang);
    const theme = getUserTheme();
    const colors = getColors(theme);
    const layout = getLayoutConfig();

    const today = new Date();
    const moon = getMoonDetails(today, lang);
    const selectedBasin = getSelectedBasin();
    const defeso = getDefesoStatus(today, selectedBasin, lang);
    const barometer = getBarometerReading(lang);
    const spots = getSavedSpots();

    const mX = layout.marginX;
    const cW = layout.cardW;
    const colW = layout.colW;
    const colGap = layout.colGap;
    let curY = layout.topPadding;

    // 0. Fundo total para Light Mode (AMOLED preto puro no Dark Mode)
    if (colors.isLight) {
      this.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: layout.screenWidth,
        h: 2200,
        color: colors.BG
      });
    }

    // 1. TOP BAR COMPACTA ESTILO APPLE WATCH (Título + Toggles Rápidos)
    const topBarH = px(38);

    // Título / Logo
    this.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: px(160),
      h: topBarH,
      color: colors.PRIMARY,
      text_size: px(22),
      align_v: hmUI.align.CENTER_V,
      text: 'PESCAMAX 🎣'
    });

    // Toggle Idioma (Pílula)
    const langBtnW = px(82);
    const themeBtnW = px(56);
    const togglesX = mX + cW - langBtnW - themeBtnW - px(8);

    this.createWidget(hmUI.widget.BUTTON, {
      x: togglesX,
      y: curY,
      w: langBtnW,
      h: topBarH,
      radius: px(19),
      normal_color: colors.BTN_BG,
      press_color: colors.BTN_PRESS,
      color: colors.ACCENT_ORANGE,
      text_size: px(16),
      text: str.langToggle,
      click_func: () => {
        const nextLang = lang === 'pt' ? 'en' : 'pt';
        setAppLanguage(nextLang);
        this.clearUI();
        this.renderUI();
      }
    });

    // Toggle Tema Dark/Light (Pílula)
    this.createWidget(hmUI.widget.BUTTON, {
      x: togglesX + langBtnW + px(8),
      y: curY,
      w: themeBtnW,
      h: topBarH,
      radius: px(19),
      normal_color: colors.BTN_BG,
      press_color: colors.BTN_PRESS,
      color: colors.PRIMARY,
      text_size: px(16),
      text: colors.isLight ? '☀️' : '🌙',
      click_func: () => {
        const nextTheme = colors.isLight ? 'dark' : 'light';
        setUserTheme(nextTheme);
        this.clearUI();
        this.renderUI();
      }
    });

    curY += topBarH + px(12);

    // 2. BENTO ROW 1: DOIS CARTÕES DE TELEMETRIA LADO A LADO (LUA & BARÔMETRO)
    const bento1H = px(152);
    const col2X = mX + colW + colGap;

    // === CARTÃO ESQUERDO: LUA & SOLUNAR ===
    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: colW,
      h: bento1H,
      radius: px(layout.radiusBento),
      color: colors.CARD_BG
    });

    this.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: colW,
      h: bento1H,
      radius: px(layout.radiusBento),
      line_width: px(2),
      color: colors.CARD_BORDER
    });

    // Micro label
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(14),
      y: curY + px(10),
      w: colW - px(28),
      h: px(18),
      color: colors.TEXT_MUTED,
      text_size: px(13),
      text: '🌒 LUA & SOLUNAR'
    });

    // Nome da Fase (curto)
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(14),
      y: curY + px(28),
      w: colW - px(28),
      h: px(24),
      color: colors.TEXT_MAIN,
      text_size: px(17),
      text: moon.phaseName
    });

    // Número GIGANTE da Iluminação (36px bold neon!)
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(14),
      y: curY + px(54),
      w: colW - px(28),
      h: px(46),
      color: colors.PRIMARY,
      text_size: px(38),
      text: `${moon.illumination}%`
    });

    // Nota de pesca (estrelas + texto verde)
    const ratingColor = moon.rating >= 3.5 ? colors.SUCCESS : (moon.rating >= 2.5 ? colors.PRIMARY : colors.WARNING);
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(14),
      y: curY + px(102),
      w: colW - px(28),
      h: px(24),
      color: ratingColor,
      text_size: px(16),
      text: `${moon.stars} ${moon.ratingText}`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(14),
      y: curY + px(126),
      w: colW - px(28),
      h: px(18),
      color: colors.TEXT_DIM,
      text_size: px(13),
      text: `Pico: ${moon.solunarPeriods.major1.split('-')[0]}`
    });

    // Toque no cartão da Lua abre a previsão detalhada de 7 dias
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: colW,
      h: bento1H,
      radius: px(layout.radiusBento),
      normal_color: 0x000000,
      press_color: colors.BTN_PRESS,
      opacity: 0,
      click_func: () => {
        push({ url: 'page/forecast/index' });
      }
    });

    // === CARTÃO DIREITO: BARÔMETRO & PRESSÃO ATMOSFÉRICA ===
    this.createWidget(hmUI.widget.FILL_RECT, {
      x: col2X,
      y: curY,
      w: colW,
      h: bento1H,
      radius: px(layout.radiusBento),
      color: colors.CARD_BG
    });

    this.createWidget(hmUI.widget.STROKE_RECT, {
      x: col2X,
      y: curY,
      w: colW,
      h: bento1H,
      radius: px(layout.radiusBento),
      line_width: px(2),
      color: barometer.color
    });

    // Micro label
    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(14),
      y: curY + px(10),
      w: colW - px(28),
      h: px(18),
      color: colors.TEXT_MUTED,
      text_size: px(13),
      text: '🧭 BARÔMETRO'
    });

    // Número GIGANTE da Pressão (ex: 1016 hPa)
    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(14),
      y: curY + px(34),
      w: colW - px(28),
      h: px(46),
      color: colors.TEXT_MAIN,
      text_size: px(34),
      text: `${barometer.pressure}`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(14),
      y: curY + px(80),
      w: colW - px(28),
      h: px(22),
      color: barometer.color,
      text_size: px(16),
      text: `hPa • ${barometer.trend}`
    });

    // Atividade do peixe
    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(14),
      y: curY + px(104),
      w: colW - px(28),
      h: px(22),
      color: colors.SUCCESS,
      text_size: px(15),
      text: `🐟 ${barometer.fishActivity.split('!')[0]}`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(14),
      y: curY + px(126),
      w: colW - px(28),
      h: px(18),
      color: colors.TEXT_DIM,
      text_size: px(13),
      text: 'Toque p/ calibrar 🔄'
    });

    // Toque no Barômetro recalibra os sensores
    this.createWidget(hmUI.widget.BUTTON, {
      x: col2X,
      y: curY,
      w: colW,
      h: bento1H,
      radius: px(layout.radiusBento),
      normal_color: 0x000000,
      press_color: colors.BTN_PRESS,
      opacity: 0,
      click_func: () => {
        this.clearUI();
        this.renderUI();
      }
    });

    curY += bento1H + px(12);

    // 3. BENTO ROW 2: BACIA HIDROGRÁFICA & STATUS DE DEFESO (CARTÃO LARGO DE 1 TOQUE)
    const bento2H = px(112);
    const defesoBorderColor = defeso.isDefeso ? colors.DANGER : colors.SUCCESS;

    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: bento2H,
      radius: px(layout.radiusBento),
      color: colors.CARD_BG
    });

    this.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: bento2H,
      radius: px(layout.radiusBento),
      line_width: px(2),
      color: defesoBorderColor
    });

    // Linha superior: Label Bacia + Badge Defeso
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(10),
      w: px(220),
      h: px(20),
      color: colors.PRIMARY,
      text_size: px(14),
      text: `🌊 ${str.regionLabel.toUpperCase()} ▾`
    });

    // Badge de status colorido à direita
    const badgeW = px(120);
    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX + cW - badgeW - px(14),
      y: curY + px(8),
      w: badgeW,
      h: px(26),
      radius: px(13),
      color: defeso.isDefeso ? colors.BADGE_DANGER : colors.BADGE_SUCCESS
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + cW - badgeW - px(14),
      y: curY + px(8),
      w: badgeW,
      h: px(26),
      color: defesoBorderColor,
      text_size: px(14),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: defeso.isDefeso ? '🔴 DEFESO' : '🟢 LIBERADO'
    });

    // Nome da Bacia em fonte GRANDE branca
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(36),
      w: cW - px(32),
      h: px(32),
      color: colors.TEXT_MAIN,
      text_size: px(24),
      text: defeso.shortName
    });

    // Período e instrução de toque
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(72),
      w: cW - px(32),
      h: px(28),
      color: colors.TEXT_MUTED,
      text_size: px(15),
      text: `${defeso.periodString}  •  ${str.regionTapChange} 🔄`
    });

    // Toque em toda a extensão alterna a Bacia Hidrográfica instantaneamente
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: bento2H,
      radius: px(layout.radiusBento),
      normal_color: 0x000000,
      press_color: colors.BTN_PRESS,
      opacity: 0,
      click_func: () => {
        const nextBasin = getNextBasinId(selectedBasin);
        setSelectedBasin(nextBasin);
        this.clearUI();
        this.renderUI();
      }
    });

    curY += bento2H + px(12);

    // 4. BENTO ROW 3: DOIS BOTÕES DE AÇÃO RICA LADO A LADO (PREVISÃO 7 DIAS & GPS)
    const bento3H = px(112);

    // === BOTÃO ESQUERDO: PREVISÃO 7 DIAS ===
    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: colW,
      h: bento3H,
      radius: px(layout.radiusBento),
      color: colors.BTN_ACTION_BG
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(14),
      y: curY + px(12),
      w: colW - px(28),
      h: px(20),
      color: 0xbfdbfe,
      text_size: px(14),
      text: '📅 PREVISÃO'
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(14),
      y: curY + px(36),
      w: colW - px(28),
      h: px(34),
      color: 0xffffff,
      text_size: px(26),
      text: '7 Dias'
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(14),
      y: curY + px(76),
      w: colW - px(28),
      h: px(22),
      color: 0xe0e7ff,
      text_size: px(14),
      text: 'Melhores Picos ➔'
    });

    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: colW,
      h: bento3H,
      radius: px(layout.radiusBento),
      normal_color: 0x000000,
      press_color: 0x0033aa,
      opacity: 0,
      click_func: () => {
        push({ url: 'page/forecast/index' });
      }
    });

    // === BOTÃO DIREITO: GPS & WAYPOINTS ===
    this.createWidget(hmUI.widget.FILL_RECT, {
      x: col2X,
      y: curY,
      w: colW,
      h: bento3H,
      radius: px(layout.radiusBento),
      color: colors.CARD_BG
    });

    this.createWidget(hmUI.widget.STROKE_RECT, {
      x: col2X,
      y: curY,
      w: colW,
      h: bento3H,
      radius: px(layout.radiusBento),
      line_width: px(2),
      color: colors.ACCENT_ORANGE
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(14),
      y: curY + px(12),
      w: colW - px(28),
      h: px(20),
      color: colors.ACCENT_ORANGE,
      text_size: px(14),
      text: '📍 WAYPOINTS'
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(14),
      y: curY + px(36),
      w: colW - px(28),
      h: px(34),
      color: colors.TEXT_MAIN,
      text_size: px(24),
      text: 'GPS & Iscas'
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(14),
      y: curY + px(76),
      w: colW - px(28),
      h: px(22),
      color: colors.TEXT_MUTED,
      text_size: px(14),
      text: `${spots.length} Marcados ➔`
    });

    this.createWidget(hmUI.widget.BUTTON, {
      x: col2X,
      y: curY,
      w: colW,
      h: bento3H,
      radius: px(layout.radiusBento),
      normal_color: 0x000000,
      press_color: colors.BTN_PRESS,
      opacity: 0,
      click_func: () => {
        push({ url: 'page/spots/index' });
      }
    });

    curY += bento3H + px(16);

    // 5. DETALHES COMPLEMENTARES (AO ROLAR A TELA)
    // Destaque de Horário de Pico Solunar
    const peakCardH = px(78);
    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: peakCardH,
      radius: px(layout.radiusBtn),
      color: colors.BADGE_BG
    });

    this.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: peakCardH,
      radius: px(layout.radiusBtn),
      line_width: px(1),
      color: colors.PRIMARY
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(10),
      w: cW - px(32),
      h: px(22),
      color: colors.PRIMARY,
      text_size: px(15),
      text: `🎣 ${str.majorPeak.toUpperCase()} (ALIMENTAÇÃO)`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(36),
      w: cW - px(32),
      h: px(30),
      color: colors.TEXT_MAIN,
      text_size: px(22),
      text: `${moon.solunarPeriods.major1}  •  ${moon.phaseDescription}`
    });

    curY += peakCardH + px(12);

    // Botão de Regras Completas do Defeso
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: px(58),
      radius: px(layout.radiusBtn),
      normal_color: colors.BTN_BG,
      press_color: colors.BTN_PRESS,
      color: colors.BTN_TEXT,
      text_size: px(19),
      text: '📋  VER ESPÉCIES & PROIBIÇÕES ➔',
      click_func: () => {
        push({ url: 'page/defeso/index' });
      }
    });

    curY += px(58) + px(12);

    // Dica Rápida de Isca
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY,
      w: cW - px(32),
      h: px(34),
      color: colors.TEXT_MUTED,
      text_size: px(15),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: `💡 ${barometer.recommendation}`
    });

    curY += px(42);

    // Rodapé
    this.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(layout.bottomPadding),
      color: colors.TEXT_DIM,
      text_size: px(15),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: 'PescaMax • watchOS 10 Bento Grid'
    });
  }
});
