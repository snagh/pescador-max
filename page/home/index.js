/**
 * page/home/index.js - Dashboard Principal do Pescador Max
 * Fases da Lua, Teoria Solunar, Barômetro em Tempo Real e Defeso
 * Totalmente bilíngue (Português / English) e responsivo (Square / Round)
 */
import * as hmUI from '@zos/ui';
import { push } from '@zos/router';
import { px } from '@zos/utils';
import { getMoonDetails } from '../../utils/lunar.js';
import { getDefesoStatus } from '../../utils/defeso.js';
import { getSelectedBasin } from '../../utils/storage.js';
import { getBarometerReading } from '../../utils/sensors.js';
import { getAppLanguage, setAppLanguage, t } from '../../utils/i18n.js';
import { COLORS, getLayoutConfig } from '../../utils/constants.js';

Page({
  build() {
    this.renderUI();
  },

  renderUI() {
    const lang = getAppLanguage();
    const str = t(lang);
    const today = new Date();
    const moon = getMoonDetails(today, lang);
    const selectedBasin = getSelectedBasin();
    const defeso = getDefesoStatus(today, selectedBasin, lang);
    const barometer = getBarometerReading(lang);
    const layout = getLayoutConfig();

    const weekDay = str.weekDays[today.getDay()];
    const monthStr = str.months[today.getMonth()];
    const dateStr = lang === 'en' 
      ? `${weekDay}, ${monthStr} ${today.getDate()}`
      : `${weekDay}, ${today.getDate()} de ${monthStr}`;

    const mX = px(layout.marginX);
    const cW = px(layout.cardW);
    let curY = px(layout.topPadding);

    // 1. TÍTULO PRINCIPAL & BOTÃO DE IDIOMA
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(38),
      color: COLORS.PRIMARY,
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
      color: COLORS.TEXT_MUTED,
      text_size: px(19),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: dateStr
    });

    curY += px(34);

    // Seletor Rápido de Idioma [ 🇧🇷 PT / 🇺🇸 EN ]
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mX + px(layout.isRound ? 50 : 70),
      y: curY,
      w: cW - px(layout.isRound ? 100 : 140),
      h: px(36),
      radius: px(10),
      normal_color: 0x1e293b,
      press_color: 0x334155,
      color: COLORS.ACCENT_GOLD,
      text_size: px(16),
      text: str.langToggle,
      click_func: () => {
        const nextLang = lang === 'pt' ? 'en' : 'pt';
        setAppLanguage(nextLang);
        hmUI.redraw();
      }
    });

    curY += px(46);

    // 2. CARTÃO LUNAR & SOLUNAR
    const card1H = px(226);

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card1H,
      radius: px(18),
      color: COLORS.CARD_BG
    });

    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card1H,
      radius: px(18),
      line_width: px(2),
      color: COLORS.CARD_BORDER
    });

    // Nome da Fase da Lua
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(10),
      y: curY + px(16),
      w: cW - px(20),
      h: px(36),
      color: COLORS.TEXT_MAIN,
      text_size: px(27),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: `${moon.phaseName.toUpperCase()}`
    });

    // Iluminação & Idade
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(10),
      y: curY + px(54),
      w: cW - px(20),
      h: px(28),
      color: COLORS.ACCENT_GOLD,
      text_size: px(20),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: `${str.illumination}: ${moon.illumination}%  •  ${str.age}: ${moon.age}d`
    });

    // Nota da Pescaria (Avaliação Solunar)
    const ratingColor = moon.rating >= 3.5 ? COLORS.SUCCESS : (moon.rating >= 2.5 ? COLORS.PRIMARY : COLORS.WARNING);
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
      color: COLORS.TEXT_MUTED,
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
      color: COLORS.PRIMARY,
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
      color: COLORS.CARD_BG
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
      color: COLORS.TEXT_MUTED,
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
      color: COLORS.TEXT_MAIN,
      text_size: px(17),
      text: barometer.fishActivity
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(98),
      w: cW - px(32),
      h: px(30),
      color: COLORS.TEXT_MUTED,
      text_size: px(15),
      text: barometer.recommendation
    });

    curY += cardBaroH + px(14);

    // 4. CARTÃO DE STATUS DO DEFESO
    const card2H = px(116);
    const defesoColor = defeso.isDefeso ? COLORS.DANGER : COLORS.SUCCESS;

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card2H,
      radius: px(18),
      color: COLORS.CARD_BG
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
      color: COLORS.TEXT_MUTED,
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
      color: COLORS.TEXT_DIM,
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
      normal_color: COLORS.BTN_ACTION_BG,
      press_color: COLORS.BTN_ACTION_PRESS,
      color: COLORS.TEXT_MAIN,
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
      normal_color: COLORS.BTN_BG,
      press_color: COLORS.BTN_PRESS,
      color: COLORS.TEXT_MAIN,
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
      normal_color: COLORS.BTN_BG,
      press_color: COLORS.BTN_PRESS,
      color: COLORS.TEXT_MAIN,
      text_size: px(22),
      text: str.btnSpots,
      click_func: () => {
        push({ url: 'page/spots/index' });
      }
    });

    curY += btnH + px(12);

    // Botão 4: Atualizar
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: px(54),
      radius: btnRadius,
      normal_color: 0x162438,
      press_color: 0x223654,
      color: COLORS.PRIMARY,
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
      color: COLORS.TEXT_DIM,
      text_size: px(15),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: 'Angler Max / Pescador Max • Zepp OS'
    });
  }
});
