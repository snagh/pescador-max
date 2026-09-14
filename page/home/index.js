/**
 * page/home/index.js - Dashboard Principal do PescaMax
 * Fases da Lua, Teoria Solunar, Barômetro em Tempo Real e Defeso
 * Totalmente bilíngue (PT/EN), responsivo (Square/Round) e com Dark/Light Mode
 * Atualização instantânea em tempo real (sem precisar reiniciar o app)
 */
import * as hmUI from '@zos/ui';
import { push } from '@zos/router';
import { px } from '@zos/utils';
import { getMoonDetails } from '../../utils/lunar.js';
import { getDefesoStatus, getNextBasinId } from '../../utils/defeso.js';
import { getSelectedBasin, setSelectedBasin, getUserTheme, setUserTheme } from '../../utils/storage.js';
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

    const weekDay = str.weekDays[today.getDay()];
    const monthStr = str.months[today.getMonth()];
    const dateStr = lang === 'en' 
      ? `${weekDay}, ${monthStr} ${today.getDate()}`
      : `${weekDay}, ${today.getDate()} de ${monthStr}`;

    const mX = layout.marginX;
    const cW = layout.cardW;
    let curY = layout.topPadding;

    // 0. Fundo total para Light Mode (em Dark Mode o fundo AMOLED padrão é preto)
    if (colors.isLight) {
      this.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: layout.screenWidth,
        h: 2200,
        color: colors.BG
      });
    }

    // 1. TÍTULO PRINCIPAL & CABEÇALHO
    this.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(44),
      color: colors.PRIMARY,
      text_size: px(30),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: str.appTitle
    });

    curY += px(44);

    // Subtítulo: Data atual
    this.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(28),
      color: colors.TEXT_MUTED,
      text_size: px(20),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: dateStr
    });

    curY += px(36);

    // Linha de Controles Rápidos: [ Idioma ] e [ Tema Dark / Light ]
    const halfBtnW = Math.floor((cW - px(12)) / 2);

    // Botão 1: Idioma (Atualização Instantânea)
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: halfBtnW,
      h: px(48),
      radius: px(24),
      normal_color: colors.BTN_BG,
      press_color: colors.BTN_PRESS,
      color: colors.ACCENT_ORANGE,
      text_size: px(18),
      text: str.langToggle,
      click_func: () => {
        const nextLang = lang === 'pt' ? 'en' : 'pt';
        setAppLanguage(nextLang);
        this.clearUI();
        this.renderUI();
      }
    });

    // Botão 2: Tema Dark / Light (Atualização Instantânea)
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX + halfBtnW + px(12),
      y: curY,
      w: halfBtnW,
      h: px(48),
      radius: px(24),
      normal_color: colors.BTN_BG,
      press_color: colors.BTN_PRESS,
      color: colors.PRIMARY,
      text_size: px(18),
      text: colors.isLight ? str.themeLight : str.themeDark,
      click_func: () => {
        const nextTheme = colors.isLight ? 'dark' : 'light';
        setUserTheme(nextTheme);
        this.clearUI();
        this.renderUI();
      }
    });

    curY += px(58);

    // 2. SELETOR RÁPIDO DE BACIA HIDROGRÁFICA (CARD INTERATIVO DE 1 TOQUE)
    const basinCardH = px(82);
    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: basinCardH,
      radius: px(18),
      color: colors.CARD_BG
    });

    this.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: basinCardH,
      radius: px(18),
      line_width: px(2),
      color: colors.PRIMARY
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(8),
      w: cW - px(32),
      h: px(22),
      color: colors.PRIMARY,
      text_size: px(16),
      text: `🌊 ${str.regionLabel.toUpperCase()} ▾`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(30),
      w: cW - px(32),
      h: px(28),
      color: colors.TEXT_MAIN,
      text_size: px(22),
      text: defeso.shortName
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(58),
      w: cW - px(32),
      h: px(18),
      color: colors.TEXT_MUTED,
      text_size: px(15),
      text: str.regionTapChange
    });

    // Botão transparente sobre o card para clique de 1 toque
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: basinCardH,
      radius: px(18),
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

    curY += basinCardH + px(16);

    // 3. CARTÃO LUNAR & SOLUNAR (DESIGN APPLE WATCH)
    const card1H = px(248);

    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card1H,
      radius: px(18),
      color: colors.CARD_BG
    });

    this.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card1H,
      radius: px(18),
      line_width: px(2),
      color: colors.CARD_BORDER
    });

    // Nome da Fase da Lua (Fonte grande e destacada)
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(12),
      y: curY + px(14),
      w: cW - px(24),
      h: px(38),
      color: colors.TEXT_MAIN,
      text_size: px(28),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: moon.phaseName.toUpperCase()
    });

    // Iluminação & Idade da Lua
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(12),
      y: curY + px(54),
      w: cW - px(24),
      h: px(30),
      color: colors.ACCENT_ORANGE,
      text_size: px(21),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: `${str.illumination}: ${moon.illumination}%  •  ${str.age}: ${moon.age}d`
    });

    // Nota da Pescaria (Avaliação Solunar)
    const ratingColor = moon.rating >= 3.5 ? colors.SUCCESS : (moon.rating >= 2.5 ? colors.PRIMARY : colors.WARNING);
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(12),
      y: curY + px(90),
      w: cW - px(24),
      h: px(34),
      color: ratingColor,
      text_size: px(24),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: `${str.fishing}: ${moon.ratingText.toUpperCase()} ${moon.stars}`
    });

    // Dica da Fase (Explicação com Wrap)
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(130),
      w: cW - px(32),
      h: px(52),
      color: colors.TEXT_MUTED,
      text_size: px(18),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.WRAP,
      text: moon.phaseDescription
    });

    // Destaque de Pico Solunar em Pílula
    const peakPillH = px(44);
    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX + px(14),
      y: curY + px(190),
      w: cW - px(28),
      h: peakPillH,
      radius: px(12),
      color: colors.BADGE_BG
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(190),
      w: cW - px(32),
      h: peakPillH,
      color: colors.PRIMARY,
      text_size: px(19),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: `🎣 ${str.majorPeak}: ${moon.solunarPeriods.major1}`
    });

    curY += card1H + px(16);

    // 4. CARTÃO DE BARÔMETRO / PRESSÃO ATMOSFÉRICA
    const cardBaroH = px(152);

    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: cardBaroH,
      radius: px(18),
      color: colors.CARD_BG
    });

    this.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: cardBaroH,
      radius: px(18),
      line_width: px(2),
      color: barometer.color
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(14),
      w: cW - px(36),
      h: px(24),
      color: colors.TEXT_MUTED,
      text_size: px(17),
      text: str.baroTitle
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(42),
      w: cW - px(36),
      h: px(32),
      color: barometer.color,
      text_size: px(23),
      text: `🧭 ${barometer.status} • ${barometer.trend}`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(78),
      w: cW - px(36),
      h: px(28),
      color: colors.TEXT_MAIN,
      text_size: px(18),
      text: barometer.fishActivity
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(110),
      w: cW - px(36),
      h: px(30),
      color: colors.TEXT_MUTED,
      text_size: px(16),
      text: barometer.recommendation
    });

    curY += cardBaroH + px(16);

    // 5. CARTÃO DE STATUS DO DEFESO (COM TOQUE DIRETO PARA DETALHES)
    const cardDefH = px(132);
    const defesoColor = defeso.isDefeso ? colors.DANGER : colors.SUCCESS;

    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: cardDefH,
      radius: px(18),
      color: colors.CARD_BG
    });

    this.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: cardDefH,
      radius: px(18),
      line_width: px(2),
      color: defesoColor
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(14),
      w: cW - px(36),
      h: px(24),
      color: colors.TEXT_MUTED,
      text_size: px(17),
      text: `${str.defesoTitle} • ${defeso.shortName}`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(44),
      w: cW - px(36),
      h: px(34),
      color: defesoColor,
      text_size: px(24),
      text: `[ ${defeso.statusBadge}: ${defeso.statusText} ]`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(84),
      w: cW - px(36),
      h: px(24),
      color: colors.PRIMARY,
      text_size: px(18),
      text: `${str.defesoPeriod}: ${defeso.periodString}  ➔`
    });

    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: cardDefH,
      radius: px(18),
      normal_color: 0x000000,
      press_color: colors.BTN_PRESS,
      opacity: 0,
      click_func: () => {
        push({ url: 'page/defeso/index' });
      }
    });

    curY += cardDefH + px(20);

    // 6. BOTÕES DE AÇÃO APPLE-STYLE (TOUCH TARGETS GENEROSOS DE 64PX)
    const btnH = px(64);
    const btnRadius = px(18);

    // Botão 1: Previsão 7 Dias (Destaque Azul Ocean)
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: btnH,
      radius: btnRadius,
      normal_color: colors.BTN_ACTION_BG,
      press_color: colors.BTN_ACTION_PRESS,
      color: colors.BTN_ACTION_TEXT,
      text_size: px(22),
      text: str.btnForecast,
      click_func: () => {
        push({ url: 'page/forecast/index' });
      }
    });

    curY += btnH + px(14);

    // Botão 2: Defeso Completo
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: btnH,
      radius: btnRadius,
      normal_color: colors.BTN_BG,
      press_color: colors.BTN_PRESS,
      color: colors.BTN_TEXT,
      text_size: px(22),
      text: str.btnDefeso,
      click_func: () => {
        push({ url: 'page/defeso/index' });
      }
    });

    curY += btnH + px(14);

    // Botão 3: Pontos & GPS
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: btnH,
      radius: btnRadius,
      normal_color: colors.BTN_BG,
      press_color: colors.BTN_PRESS,
      color: colors.BTN_TEXT,
      text_size: px(22),
      text: str.btnSpots,
      click_func: () => {
        push({ url: 'page/spots/index' });
      }
    });

    curY += btnH + px(14);

    // Botão 4: Atualizar Sensores
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: px(54),
      radius: btnRadius,
      normal_color: colors.BTN_BG,
      press_color: colors.BTN_PRESS,
      color: colors.PRIMARY,
      text_size: px(20),
      text: str.btnRefresh,
      click_func: () => {
        this.clearUI();
        this.renderUI();
      }
    });

    curY += px(68);

    // Rodapé
    this.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(layout.bottomPadding),
      color: colors.TEXT_DIM,
      text_size: px(16),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: 'PescaMax • Zepp OS'
    });
  }
});
