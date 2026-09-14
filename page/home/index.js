/**
 * page/home/index.js - Dashboard Bento Grid Ultra-Premium para o PescaMax
 * Inspirado no Apple Watch (watchOS 10):
 * - Grid Bento moderno com cantos arredondados (raio 20px)
 * - Números gigantescos em negrito de 36px em ciano néon e branco
 * - Inicia exatamente abaixo da barra de status nativa (y >= 68px)
 * - Widgets e dados 100% visíveis, sem botões invisíveis ou caixas pretas cobrindo texto
 * - Fundo AMOLED preto puro de alto contraste e luxo
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

    const weekDay = str.weekDays[today.getDay()];
    const monthStr = str.months[today.getMonth()];
    const dateShort = `${weekDay.slice(0, 3)}, ${today.getDate()} ${monthStr}`;

    const mX = layout.marginX;
    const cW = layout.cardW;
    const colW = layout.colW;
    const colGap = layout.colGap;
    const col2X = mX + colW + colGap;

    // Começa exatamente abaixo da barra de status nativa do Zepp OS ("PescaMax 14:43")
    let curY = layout.topPadding;

    // Fundo completo apenas se for Light Mode (no Dark Mode o AMOLED padrão é preto)
    if (colors.isLight) {
      this.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: layout.screenWidth,
        h: 2200,
        color: colors.BG
      });
    }

    // 1. SUB-HEADER ELEGANTE (Data + Pílula de Idioma)
    const subHeaderH = px(36);

    // Data Atual à esquerda
    this.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: px(220),
      h: subHeaderH,
      color: colors.TEXT_MUTED,
      text_size: px(18),
      align_v: hmUI.align.CENTER_V,
      text: `📅 ${dateShort}`
    });

    // Pílula de Idioma à direita
    const langBtnW = px(84);
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX + cW - langBtnW,
      y: curY,
      w: langBtnW,
      h: subHeaderH,
      radius: px(18),
      normal_color: colors.BTN_BG,
      press_color: colors.BTN_PRESS,
      color: colors.ACCENT_ORANGE,
      text_size: px(15),
      text: str.langToggle,
      click_func: () => {
        const nextLang = lang === 'pt' ? 'en' : 'pt';
        setAppLanguage(nextLang);
        this.clearUI();
        this.renderUI();
      }
    });

    curY += subHeaderH + px(10);

    // 2. BENTO ROW 1: DOIS CARTÕES DE TELEMETRIA LADO A LADO (100% VISÍVEIS)
    const bento1H = px(150);

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
      color: colors.PRIMARY
    });

    // Label do topo
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(12),
      y: curY + px(10),
      w: colW - px(24),
      h: px(18),
      color: colors.TEXT_MUTED,
      text_size: px(13),
      text: '🌒 LUA'
    });

    // Nome da Fase da Lua
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(12),
      y: curY + px(28),
      w: colW - px(24),
      h: px(22),
      color: colors.TEXT_MAIN,
      text_size: px(16),
      text: moon.phaseName
    });

    // Iluminação em NÚMERO GIGANTE Ciano (36px bold)
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(12),
      y: curY + px(52),
      w: colW - px(24),
      h: px(44),
      color: colors.PRIMARY,
      text_size: px(36),
      text: `${moon.illumination}%`
    });

    // Avaliação Solunar (Verde Esmeralda)
    const ratingColor = moon.rating >= 3.5 ? colors.SUCCESS : (moon.rating >= 2.5 ? colors.PRIMARY : colors.WARNING);
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(12),
      y: curY + px(98),
      w: colW - px(24),
      h: px(22),
      color: ratingColor,
      text_size: px(15),
      text: `${moon.stars} ${moon.ratingText}`
    });

    // Horário de Pico
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(12),
      y: curY + px(122),
      w: colW - px(24),
      h: px(18),
      color: colors.TEXT_DIM,
      text_size: px(12),
      text: `Pico: ${moon.solunarPeriods.major1.split('-')[0]}`
    });

    // === CARTÃO DIREITO: BARÔMETRO & PRESSÃO ===
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

    // Label do topo
    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(12),
      y: curY + px(10),
      w: colW - px(24),
      h: px(18),
      color: colors.TEXT_MUTED,
      text_size: px(13),
      text: '🧭 PRESSÃO'
    });

    // Número GIGANTE da Pressão (34px bold branco)
    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(12),
      y: curY + px(32),
      w: colW - px(24),
      h: px(44),
      color: colors.TEXT_MAIN,
      text_size: px(34),
      text: `${barometer.pressure}`
    });

    // Tendência / Tempo
    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(12),
      y: curY + px(78),
      w: colW - px(24),
      h: px(20),
      color: barometer.color,
      text_size: px(15),
      text: `hPa • ${barometer.trend}`
    });

    // Atividade do Peixe
    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(12),
      y: curY + px(100),
      w: colW - px(24),
      h: px(20),
      color: colors.SUCCESS,
      text_size: px(14),
      text: `🐟 ${barometer.status}`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(12),
      y: curY + px(122),
      w: colW - px(24),
      h: px(18),
      color: colors.TEXT_DIM,
      text_size: px(12),
      text: 'Sensor Ativo 🟢'
    });

    curY += bento1H + px(12);

    // 3. BENTO ROW 2: BOTÃO INTERATIVO DA BACIA & STATUS DO DEFESO
    const basinBtnH = px(94);
    const defesoBorder = defeso.isDefeso ? colors.DANGER : colors.SUCCESS;

    // Fundo da Bacia como Botão Nativo Real
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: basinBtnH,
      radius: px(layout.radiusBento),
      normal_color: colors.CARD_BG,
      press_color: colors.BTN_PRESS,
      color: colors.TEXT_MAIN,
      text_size: px(19),
      text: `🌊 ${defeso.shortName} • [ ${defeso.statusBadge} ]\n${defeso.periodString}  (Toque p/ alternar 🔄)`,
      click_func: () => {
        const nextBasin = getNextBasinId(selectedBasin);
        setSelectedBasin(nextBasin);
        this.clearUI();
        this.renderUI();
      }
    });

    // Borda indicadora colorida (Verde se Liberado, Vermelho se Defeso)
    this.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: basinBtnH,
      radius: px(layout.radiusBento),
      line_width: px(2),
      color: defesoBorder
    });

    curY += basinBtnH + px(12);

    // 4. BENTO ROW 3: DOIS BOTÕES DE AÇÃO NATIVOS ESTILO APPLE WATCH
    const actionBtnH = px(96);

    // Botão 1: Previsão 7 Dias (Azul Apple Watch)
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: colW,
      h: actionBtnH,
      radius: px(layout.radiusBento),
      normal_color: colors.BTN_ACTION_BG,
      press_color: colors.BTN_ACTION_PRESS,
      color: 0xffffff,
      text_size: px(19),
      text: '📅 PREVISÃO\n7 Dias ➔',
      click_func: () => {
        push({ url: 'page/forecast/index' });
      }
    });

    // Botão 2: Waypoints & GPS (Dark Navy com borda Coral)
    this.createWidget(hmUI.widget.BUTTON, {
      x: col2X,
      y: curY,
      w: colW,
      h: actionBtnH,
      radius: px(layout.radiusBento),
      normal_color: colors.CARD_BG,
      press_color: colors.BTN_PRESS,
      color: colors.ACCENT_ORANGE,
      text_size: px(19),
      text: `📍 PONTOS GPS\n${spots.length} Salvos ➔`,
      click_func: () => {
        push({ url: 'page/spots/index' });
      }
    });

    this.createWidget(hmUI.widget.STROKE_RECT, {
      x: col2X,
      y: curY,
      w: colW,
      h: actionBtnH,
      radius: px(layout.radiusBento),
      line_width: px(2),
      color: colors.ACCENT_ORANGE
    });

    curY += actionBtnH + px(16);

    // 5. DETALHES COMPLEMENTARES (AO ROLAR A TELA)
    // Cartão de Horário de Pico de Alimentação
    const peakH = px(74);
    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: peakH,
      radius: px(layout.radiusBtn),
      color: colors.BADGE_BG
    });

    this.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: peakH,
      radius: px(layout.radiusBtn),
      line_width: px(1),
      color: colors.PRIMARY
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(8),
      w: cW - px(32),
      h: px(22),
      color: colors.PRIMARY,
      text_size: px(15),
      text: `🎣 ${str.majorPeak.toUpperCase()} (ALIMENTAÇÃO)`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(34),
      w: cW - px(32),
      h: px(28),
      color: colors.TEXT_MAIN,
      text_size: px(21),
      text: `${moon.solunarPeriods.major1} • ${moon.phaseDescription}`
    });

    curY += peakH + px(12);

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
      text: '📋  REGRAS DO DEFESO & PEIXES ➔',
      click_func: () => {
        push({ url: 'page/defeso/index' });
      }
    });

    curY += px(58) + px(12);

    // Botão Recalibrar Sensores
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: px(52),
      radius: px(layout.radiusBtn),
      normal_color: colors.BTN_BG,
      press_color: colors.BTN_PRESS,
      color: colors.PRIMARY,
      text_size: px(18),
      text: '🔄  RECALIBRAR SENSORES',
      click_func: () => {
        this.clearUI();
        this.renderUI();
      }
    });

    curY += px(52) + px(16);

    // Dica Rápida de Isca
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY,
      w: cW - px(32),
      h: px(32),
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
