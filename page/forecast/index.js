/**
 * page/forecast/index.js - Previsão Solunar dos Próximos 7 Dias (Bilingual + Dark/Light Mode)
 */
import * as hmUI from '@zos/ui';
import { back } from '@zos/router';
import { px } from '@zos/utils';
import { getForecast } from '../../utils/lunar.js';
import { getAppLanguage, t } from '../../utils/i18n.js';
import { getUserTheme } from '../../utils/storage.js';
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
    const today = new Date();
    const forecast = getForecast(today, 7, lang);
    const layout = getLayoutConfig();

    const mX = px(layout.marginX);
    const cW = px(layout.cardW);
    let curY = px(layout.topPadding);

    if (colors.isLight) {
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: px(0),
        y: px(0),
        w: px(480),
        h: px(1600),
        color: colors.BG
      });
    }

    // Botão Voltar no Topo
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: px(110),
      h: px(46),
      radius: px(12),
      normal_color: colors.BTN_BG,
      press_color: colors.BTN_PRESS,
      color: colors.BTN_TEXT,
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
      color: colors.PRIMARY,
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
      color: colors.TEXT_MUTED,
      text_size: px(18),
      text: str.forecastSub
    });

    curY += px(36);
    const cardH = px(166);
    const spacing = px(14);

    forecast.forEach((f) => {
      const ratingColor = f.rating >= 3.5 ? colors.SUCCESS : (f.rating >= 2.5 ? colors.PRIMARY : colors.WARNING);

      // Fundo do cartão
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: mX,
        y: curY,
        w: cW,
        h: cardH,
        radius: px(16),
        color: f.isToday ? colors.BADGE_BG : colors.CARD_BG
      });

      // Borda
      hmUI.createWidget(hmUI.widget.STROKE_RECT, {
        x: mX,
        y: curY,
        w: cW,
        h: cardH,
        radius: px(16),
        line_width: px(2),
        color: f.isToday ? colors.PRIMARY : colors.CARD_BORDER
      });

      // Cabeçalho do dia
      const dayTitle = f.isToday ? `${f.dayString} [${str.todayBadge}]` : f.dayString;
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(12),
        w: cW - px(32),
        h: px(28),
        color: f.isToday ? colors.PRIMARY : colors.TEXT_MAIN,
        text_size: px(22),
        text: dayTitle
      });

      // Fase da Lua e Iluminação (com o Laranja Coral do peixe)
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(44),
        w: cW - px(32),
        h: px(26),
        color: colors.ACCENT_ORANGE,
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
        color: colors.TEXT_MUTED,
        text_size: px(17),
        text: `${str.majorPeak}: ${f.solunarPeriods.major1}`
      });

      hmUI.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(132),
        w: cW - px(32),
        h: px(24),
        color: colors.TEXT_DIM,
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
      normal_color: colors.BTN_ACTION_BG,
      press_color: colors.BTN_ACTION_PRESS,
      color: colors.BTN_ACTION_TEXT,
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
      color: colors.TEXT_DIM,
      text_size: px(15),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: str.solunarFooter
    });
  }
});
