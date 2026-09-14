/**
 * page/home/index.js - Dashboard Bento Grid watchOS 10 para o PescaMax
 * Design autêntico de smartwatch:
 * - Superfícies sólidas com contraste nobre (sem bordas wireframe de IA)
 * - Barras de nível segmentadas desenhadas em vetor nativo (sem caracteres unicode quebrados)
 * - Zero caracteres 'quadradinho' (sem setas ou estrelas incompatíveis com a fonte do relógio)
 * - Cores néon vibrantes no AMOLED preto puro
 * - Totalmente calibrado para a tela de 432x514 do Amazfit Bip Max
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

    let curY = layout.topPadding; // 68px - abaixo da barra de status "PescaMax 14:43"

    // 0. Fundo total no Light Mode (Preto AMOLED puro no Dark Mode)
    if (colors.isLight) {
      this.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: layout.screenWidth,
        h: 2200,
        color: colors.BG
      });
    }

    // 1. SUB-HEADER (Data + Botão de Idioma)
    const subHeaderH = px(34);

    this.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: px(220),
      h: subHeaderH,
      color: 0x8e8e93,
      text_size: px(17),
      align_v: hmUI.align.CENTER_V,
      text: dateShort
    });

    const langBtnW = px(76);
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX + cW - langBtnW,
      y: curY,
      w: langBtnW,
      h: subHeaderH,
      radius: px(16),
      normal_color: 0x2c2c2e,
      press_color: 0x3a3a3c,
      color: 0xff6b4a,
      text_size: px(15),
      text: lang === 'pt' ? 'PT' : 'EN',
      click_func: () => {
        const nextLang = lang === 'pt' ? 'en' : 'pt';
        setAppLanguage(nextLang);
        this.clearUI();
        this.renderUI();
      }
    });

    curY += subHeaderH + px(10);

    // 2. BENTO ROW 1: DOIS CARTÕES DE TELEMETRIA (SUPERFÍCIE SÓLIDA watchOS 10)
    const bento1H = px(154);

    // === CARTÃO ESQUERDO: LUA & SOLUNAR ===
    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: colW,
      h: bento1H,
      radius: px(layout.radiusBento),
      color: 0x1c1c1e
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(14),
      y: curY + px(12),
      w: colW - px(28),
      h: px(16),
      color: 0x8e8e93,
      text_size: px(12),
      text: 'LUA & SOLUNAR'
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(14),
      y: curY + px(28),
      w: colW - px(28),
      h: px(24),
      color: 0xffffff,
      text_size: px(18),
      text: moon.phaseName
    });

    // Número GIGANTE da Iluminação em Ciano Néon (40px bold)
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(14),
      y: curY + px(50),
      w: colW - px(28),
      h: px(46),
      color: 0x00d2ff,
      text_size: px(40),
      text: `${moon.illumination}%`
    });

    // Barra de Nível Solunar Segmentada em Vetor (5 cápsulas Apple-style)
    const activeCapsules = Math.max(1, Math.min(5, Math.round(moon.rating)));
    const capW = px(26);
    const capH = px(7);
    const capY = curY + px(102);

    for (let i = 0; i < 5; i++) {
      this.createWidget(hmUI.widget.FILL_RECT, {
        x: mX + px(14) + i * (capW + px(4)),
        y: capY,
        w: capW,
        h: capH,
        radius: px(3),
        color: i < activeCapsules ? 0x30d158 : 0x3a3a3c
      });
    }

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(14),
      y: curY + px(116),
      w: colW - px(28),
      h: px(18),
      color: 0x30d158,
      text_size: px(13),
      text: `QUALIDADE: ${moon.ratingText.toUpperCase()}`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(14),
      y: curY + px(132),
      w: colW - px(28),
      h: px(16),
      color: 0x00d2ff,
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
      color: 0x1c1c1e
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(14),
      y: curY + px(12),
      w: colW - px(28),
      h: px(16),
      color: 0x8e8e93,
      text_size: px(12),
      text: 'PRESSAO / HPA'
    });

    // Número GIGANTE da Pressão (40px bold branco)
    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(14),
      y: curY + px(30),
      w: colW - px(28),
      h: px(46),
      color: 0xffffff,
      text_size: px(40),
      text: `${barometer.pressure}`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(14),
      y: curY + px(76),
      w: colW - px(28),
      h: px(20),
      color: 0x30d158,
      text_size: px(15),
      text: barometer.trend.toUpperCase()
    });

    // Medidor de Atividade dos Peixes (8 barras horizontais Apple Noise-style)
    const activeBars = barometer.pressure >= 1014 ? 7 : (barometer.pressure >= 1009 ? 5 : 3);
    const segW = px(15);
    const segY = curY + px(102);

    for (let i = 0; i < 8; i++) {
      this.createWidget(hmUI.widget.FILL_RECT, {
        x: col2X + px(14) + i * (segW + px(4)),
        y: segY,
        w: segW,
        h: px(7),
        radius: px(3),
        color: i < activeBars ? 0x30d158 : 0x3a3a3c
      });
    }

    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(14),
      y: curY + px(116),
      w: colW - px(28),
      h: px(18),
      color: 0x30d158,
      text_size: px(13),
      text: `PEIXES ATIVOS (${activeBars * 12}%)`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: col2X + px(14),
      y: curY + px(132),
      w: colW - px(28),
      h: px(16),
      color: 0x8e8e93,
      text_size: px(12),
      text: 'Iscas de Superficie'
    });

    curY += bento1H + px(12);

    // 3. BENTO ROW 2: BACIA & DEFESO (SUPERFÍCIE AMBIENTE VERDE ESMERALDA #082915)
    // 3. BENTO ROW 2: BACIA & DEFESO (SUPERFÍCIE AMBIENTE VERDE ESMERALDA #082915)
    const basinH = px(104);
    const ambientBg = defeso.isDefeso ? 0x380a0a : 0x082915;
    const ambientColor = defeso.isDefeso ? 0xff453a : 0x34c759;
    const badgeBg = defeso.isDefeso ? 0xff453a : 0x30d158;

    // 1. Botão de Fundo NATIVO primeiro (Z-index base interativo)
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: basinH,
      radius: px(layout.radiusBento),
      normal_color: ambientBg,
      press_color: defeso.isDefeso ? 0x4d1212 : 0x113d20,
      click_func: () => {
        const nextBasin = getNextBasinId(selectedBasin);
        setSelectedBasin(nextBasin);
        this.clearUI();
        this.renderUI();
      }
    });

    // 2. Textos e Badges visíveis POR CIMA do botão
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(14),
      w: px(220),
      h: px(18),
      color: ambientColor,
      text_size: px(13),
      text: 'BACIA HIDROGRAFICA'
    });

    // Pílula sólida de status [ LIBERADO ]
    const badgeW = px(104);
    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX + cW - badgeW - px(16),
      y: curY + px(12),
      w: badgeW,
      h: px(24),
      radius: px(12),
      color: badgeBg
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + cW - badgeW - px(16),
      y: curY + px(12),
      w: badgeW,
      h: px(24),
      color: 0x000000,
      text_size: px(13),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: defeso.isDefeso ? 'DEFESO' : 'LIBERADO'
    });

    // Nome da Bacia em destaque
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(36),
      w: cW - px(36),
      h: px(30),
      color: 0xffffff,
      text_size: px(23),
      text: defeso.shortName.toUpperCase()
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(68),
      w: cW - px(36),
      h: px(24),
      color: ambientColor,
      text_size: px(13),
      text: `Piracema: ${defeso.periodString}  [Toque p/ trocar 6 Bacias]`
    });

    curY += basinH + px(12);

    // 4. BENTO ROW 3: DOIS CARTÕES DE AÇÃO SÓLIDOS watchOS 10
    const actionH = px(94);

    // === BOTÃO ESQUERDO: PREVISÃO 7 DIAS (AZUL ELÉTRICO #0066FF) ===
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: colW,
      h: actionH,
      radius: px(layout.radiusBento),
      normal_color: 0x0066ff,
      press_color: 0x004ccc,
      color: 0xffffff,
      text_size: px(18),
      text: 'PREVISAO\n7 DIAS\nVer Calendario >',
      click_func: () => {
        push({ url: 'page/forecast/index' });
      }
    });

    // === BOTÃO DIREITO: WAYPOINTS (CORAL PROFUNDO #2C120E) ===
    this.createWidget(hmUI.widget.BUTTON, {
      x: col2X,
      y: curY,
      w: colW,
      h: actionH,
      radius: px(layout.radiusBento),
      normal_color: 0x2c120e,
      press_color: 0x401a14,
      color: 0xffffff,
      text_size: px(18),
      text: `PONTOS\nWAYPOINTS\n${spots.length} Salvos >`,
      click_func: () => {
        push({ url: 'page/spots/index' });
      }
    });

    curY += actionH + px(16);

    // 5. DETALHES COMPLEMENTARES (AO ROLAR A TELA)
    // Horário de Pico Solunar
    const peakH = px(76);
    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: peakH,
      radius: px(layout.radiusBtn),
      color: 0x1c1c1e
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(10),
      w: cW - px(32),
      h: px(20),
      color: 0x00d2ff,
      text_size: px(13),
      text: 'PICO MAIOR DE ALIMENTACAO'
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(34),
      w: cW - px(32),
      h: px(30),
      color: 0xffffff,
      text_size: px(20),
      text: `${moon.solunarPeriods.major1} - ${moon.phaseDescription}`
    });

    curY += peakH + px(12);

    // Botão de Regras Completas do Defeso
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: px(58),
      radius: px(layout.radiusBtn),
      normal_color: 0x1c1c1e,
      press_color: 0x2c2c2e,
      color: 0xffffff,
      text_size: px(18),
      text: 'VER REGRAS COMPLETAS DO DEFESO >',
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
      normal_color: 0x1c1c1e,
      press_color: 0x2c2c2e,
      color: 0x00d2ff,
      text_size: px(17),
      text: 'RECALIBRAR BAROMETRO',
      click_func: () => {
        this.clearUI();
        this.renderUI();
      }
    });

    curY += px(52) + px(16);

    // Dica Rápida
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY,
      w: cW - px(32),
      h: px(32),
      color: 0x8e8e93,
      text_size: px(14),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: barometer.recommendation
    });

    curY += px(42);

    // Rodapé
    this.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(layout.bottomPadding),
      color: 0x64748b,
      text_size: px(14),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: 'PescaMax • watchOS 10 Bento Grid'
    });
  }
});
