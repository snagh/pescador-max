/**
 * page/forecast/index.js - Previsão Solunar dos Próximos 7 Dias (Bilingual)
 */
import * as hmUI from '@zos/ui';
import { back } from '@zos/router';
import { px } from '@zos/utils';
import { getForecast } from '../../utils/lunar.js';
import { getAppLanguage, t } from '../../utils/i18n.js';
import { COLORS, getLayoutConfig } from '../../utils/constants.js';

Page({
  build() {
    this.renderUI();
  },

  renderUI() {
    const lang = getAppLanguage();
    const str = t(lang);
    const today = new Date();
    const forecast = getForecast(today, 7, lang);
    const layout = getLayoutConfig();

    const mX = px(layout.marginX);
    const cW = px(layout.cardW);
    let curY = px(layout.topPadding);

    // Botão Voltar no Topo
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: px(110),
      h: px(46),
      radius: px(12),
      normal_color: COLORS.BTN_BG,
      press_color: COLORS.BTN_PRESS,
      color: COLORS.TEXT_MAIN,
      text_size: px(18),
      text: str.btnBack,
      click_func: () => {
        back();
      }
    });

    // Título da Página
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(120),
      y: curY,
      w: cW - px(120),
      h: px(46),
      color: COLORS.PRIMARY,
      text_size: px(23),
      align_v: hmUI.align.CENTER_V,
      text: str.forecastTitle
    });

    curY += px(52);

    // Subtítulo
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(26),
      color: COLORS.TEXT_MUTED,
      text_size: px(18),
      text: str.forecastSub
    });

    curY += px(36);
    const cardH = px(166);
    const spacing = px(14);

    forecast.forEach((f) => {
      const ratingColor = f.rating >= 3.5 ? COLORS.SUCCESS : (f.rating >= 2.5 ? COLORS.PRIMARY : COLORS.WARNING);

      // Fundo do cartão
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: mX,
        y: curY,
        w: cW,
        h: cardH,
        radius: px(16),
        color: f.isToday ? 0x162438 : COLORS.CARD_BG
      });

      // Borda
      hmUI.createWidget(hmUI.widget.STROKE_RECT, {
        x: mX,
        y: curY,
        w: cW,
        h: cardH,
        radius: px(16),
        line_width: px(2),
        color: f.isToday ? COLORS.PRIMARY : COLORS.CARD_BORDER
      });

      // Cabeçalho do dia
      const dayTitle = f.isToday ? `${f.dayString} [${str.todayBadge}]` : f.dayString;
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(12),
        w: cW - px(32),
        h: px(28),
        color: f.isToday ? COLORS.PRIMARY : COLORS.TEXT_MAIN,
        text_size: px(22),
        text: dayTitle
      });

      // Fase da Lua e Iluminação
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(44),
        w: cW - px(32),
        h: px(26),
        color: COLORS.ACCENT_GOLD,
        text_size: px(20),
        text: `${f.phaseName} • ${f.illumination}% ${str.illumination}`
      });

      // Avaliação da Pesca
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(74),
        w: cW - px(32),
        h: px(28),
        color: ratingColor,
        text_size: px(21),
        text: `${str.fishing}: ${f.ratingText.toUpperCase()} ${f.stars}`
      });

      // Horários de Pico Solunar
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(106),
        w: cW - px(32),
        h: px(24),
        color: COLORS.TEXT_MUTED,
        text_size: px(17),
        text: `${str.majorPeak}: ${f.solunarPeriods.major1}`
      });

      hmUI.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(132),
        w: cW - px(32),
        h: px(24),
        color: COLORS.TEXT_DIM,
        text_size: px(16),
        text: `${str.minorPeak}: ${f.solunarPeriods.minor1}`
      });

      curY += cardH + spacing;
    });

    // Botão Voltar no Rodapé
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY + px(10),
      w: cW,
      h: px(58),
      radius: px(14),
      normal_color: COLORS.BTN_ACTION_BG,
      press_color: COLORS.BTN_ACTION_PRESS,
      color: COLORS.TEXT_MAIN,
      text_size: px(22),
      text: str.btnBackHome,
      click_func: () => {
        back();
      }
    });

    // Espaçador final
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY + px(78),
      w: cW,
      h: px(layout.bottomPadding),
      color: COLORS.TEXT_DIM,
      text_size: px(15),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: str.solunarFooter
    });
  }
});
