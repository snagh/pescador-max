/**
 * page/home/index.js - Dashboard Principal do Pescador Max
 * Fases da Lua, Teoria Solunar, Barômetro em Tempo Real e Defeso
 * Totalmente bilíngue (PT/EN), responsivo (Square/Round) e com Dark/Light Mode
 */
import * as hmUI from '@zos/ui';
import { push } from '@zos/router';
import { px } from '@zos/utils';
import { getMoonDetails } from '../../utils/lunar.js';
import { getDefesoStatus } from '../../utils/defeso.js';
import { getSelectedBasin, getUserTheme, setUserTheme } from '../../utils/storage.js';
import { getBarometerReading } from '../../utils/sensors.js';
import { getAppLanguage, setAppLanguage, t } from '../../utils/i18n.js';
import { getColors, getLayoutConfig } from '../../utils/constants.js';

Page({
  build() {
    this.renderUI();
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

    const mX = px(layout.marginX);
    const cW = px(layout.cardW);
    let curY = px(layout.topPadding);

    // 0. Fundo total para Light Mode (em Dark Mode o fundo AMOLED padrão é preto)
    if (colors.isLight) {
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: px(0),
        y: px(0),
        w: px(480),
        h: px(1200),
        color: colors.BG
      });
    }

    // 1. TÍTULO PRINCIPAL
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(38),
      color: colors.PRIMARY,
      text_size: px(28),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: str.appTitle
    });

    curY += px(38);

    // Subtítulo: Data atual
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(28),
      color: colors.TEXT_MUTED,
      text_size: px(19),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: dateStr
    });

    curY += px(34);

    // Linha de Controles Rápidos: [ Idioma ] e [ Tema Dark / Light ]
    const halfBtnW = (cW - px(12)) / 2;

    // Botão 1: Idioma
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: halfBtnW,
      h: px(38),
      radius: px(10),
      normal_color: colors.BTN_BG,
      press_color: colors.BTN_PRESS,
      color: colors.ACCENT_ORANGE,
      text_size: px(16),
      text: str.langToggle,
      click_func: () => {
        const nextLang = lang === 'pt' ? 'en' : 'pt';
        setAppLanguage(nextLang);
        hmUI.redraw();
      }
    });

    // Botão 2: Tema (Dark / Light)
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mX + halfBtnW + px(12),
      y: curY,
      w: halfBtnW,
      h: px(38),
      radius: px(10),
      normal_color: colors.BTN_BG,
      press_color: colors.BTN_PRESS,
      color: colors.PRIMARY,
      text_size: px(16),
      text: colors.isLight ? str.themeLight : str.themeDark,
      click_func: () => {
        const nextTheme = colors.isLight ? 'dark' : 'light';
        setUserTheme(nextTheme);
        hmUI.redraw();
      }
    });

    curY += px(48);

    // 2. CARTÃO LUNAR & SOLUNAR
    const card1H = px(226);

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card1H,
      radius: px(18),
      color: colors.CARD_BG
    });

    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card1H,
      radius: px(18),
      line_width: px(2),
      color: colors.CARD_BORDER
    });

    // Nome da Fase da Lua
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(10),
      y: curY + px(16),
      w: cW - px(20),
      h: px(36),
      color: colors.TEXT_MAIN,
      text_size: px(26),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: `${moon.phaseName.toUpperCase()}`
    });

    // Iluminação & Idade (com o Laranja Coral do peixe)
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(10),
      y: curY + px(54),
      w: cW - px(20),
      h: px(28),
      color: colors.ACCENT_ORANGE,
      text_size: px(20),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: `${str.illumination}: ${moon.illumination}%  •  ${str.age}: ${moon.age}d`
    });

    // Nota da Pescaria (Avaliação Solunar)
    const ratingColor = moon.rating >= 3.5 ? colors.SUCCESS : (moon.rating >= 2.5 ? colors.PRIMARY : colors.WARNING);
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(10),
      y: curY + px(90),
      w: cW - px(20),
      h: px(32),
      color: ratingColor,
      text_size: px(23),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: `${str.fishing}: ${moon.ratingText.toUpperCase()} ${moon.stars}`
    });

    // Dica da Fase
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(126),
      w: cW - px(32),
      h: px(44),
      color: colors.TEXT_MUTED,
      text_size: px(17),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.WRAP,
      text: moon.phaseDescription
    });

    // Linha de Picos Solunares
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(10),
      y: curY + px(180),
      w: cW - px(20),
      h: px(28),
      color: colors.PRIMARY,
      text_size: px(18),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: `${str.majorPeak}: ${moon.solunarPeriods.major1}`
    });

    curY += card1H + px(14);

    // 3. CARTÃO DE BARÔMETRO / PRESSÃO ATMOSFÉRICA
    const cardBaroH = px(136);

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: cardBaroH,
      radius: px(18),
      color: colors.CARD_BG
    });

    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: cardBaroH,
      radius: px(18),
      line_width: px(2),
      color: barometer.color
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(12),
      w: cW - px(32),
      h: px(24),
      color: colors.TEXT_MUTED,
      text_size: px(17),
      text: str.baroTitle
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(38),
      w: cW - px(32),
      h: px(30),
      color: barometer.color,
      text_size: px(21),
      text: `🧭 ${barometer.status} • ${barometer.trend}`
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(70),
      w: cW - px(32),
      h: px(28),
      color: colors.TEXT_MAIN,
      text_size: px(17),
      text: barometer.fishActivity
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(98),
      w: cW - px(32),
      h: px(30),
      color: colors.TEXT_MUTED,
      text_size: px(15),
      text: barometer.recommendation
    });

    curY += cardBaroH + px(14);

    // 4. CARTÃO DE STATUS DO DEFESO
    const card2H = px(116);
    const defesoColor = defeso.isDefeso ? colors.DANGER : colors.SUCCESS;

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card2H,
      radius: px(18),
      color: colors.CARD_BG
    });

    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card2H,
      radius: px(18),
      line_width: px(2),
      color: defesoColor
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(14),
      w: cW - px(32),
      h: px(24),
      color: colors.TEXT_MUTED,
      text_size: px(17),
      text: str.defesoTitle
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(42),
      w: cW - px(32),
      h: px(32),
      color: defesoColor,
      text_size: px(23),
      text: `[ ${defeso.statusBadge}: ${defeso.statusText} ]`
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(78),
      w: cW - px(32),
      h: px(24),
      color: colors.TEXT_DIM,
      text_size: px(17),
      text: `${defeso.shortName} ${str.defesoTapDetails}`
    });

    curY += card2H + px(14);

    // 5. BOTÕES DE NAVEGAÇÃO
    const btnH = px(62);
    const btnRadius = px(14);

    // Botão 1: Previsão 7 Dias
    hmUI.createWidget(hmUI.widget.BUTTON, {
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

    curY += btnH + px(12);

    // Botão 2: Defeso
    hmUI.createWidget(hmUI.widget.BUTTON, {
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

    curY += btnH + px(12);

    // Botão 3: Pontos
    hmUI.createWidget(hmUI.widget.BUTTON, {
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

    curY += btnH + px(12);

    // Botão 4: Atualizar Sensores
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: px(54),
      radius: btnRadius,
      normal_color: colors.BTN_BG,
      press_color: colors.BTN_PRESS,
      color: colors.PRIMARY,
      text_size: px(19),
      text: str.btnRefresh,
      click_func: () => {
        hmUI.redraw();
      }
    });

    curY += px(66);

    // Espaçador inferior
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(layout.bottomPadding),
      color: colors.TEXT_DIM,
      text_size: px(15),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: 'Angler Max / Pescador Max • Zepp OS'
    });
  }
});
