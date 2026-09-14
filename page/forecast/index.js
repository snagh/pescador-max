/**
 * page/forecast/index.js - Previsão Solunar dos Próximos 7 Dias (Bilingual + Dark/Light Mode)
 * Layout Apple Watch com tipografia de alta legibilidade e alvos de toque confortáveis
 */
import * as hmUI from '@zos/ui';
import { back } from '@zos/router';
import { px } from '@zos/utils';
import { getForecast } from '../../utils/lunar.js';
import { getAppLanguage, t } from '../../utils/i18n.js';
import { getUserTheme } from '../../utils/storage.js';
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
    const today = new Date();
    const forecast = getForecast(today, 7, lang);
    const layout = getLayoutConfig();

    const mX = layout.marginX;
    const cW = layout.cardW;
    let curY = layout.topPadding;

    if (colors.isLight) {
      this.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: layout.screenWidth,
        h: 2200,
        color: colors.BG
      });
    }

    // Botão Voltar no Topo
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: px(120),
      h: px(48),
      radius: px(24),
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
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(130),
      y: curY,
      w: cW - px(130),
      h: px(48),
      color: colors.PRIMARY,
      text_size: px(24),
      align_v: hmUI.align.CENTER_V,
      text: str.forecastTitle
    });

    curY += px(58);

    // Subtítulo
    this.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(26),
      color: colors.TEXT_MUTED,
      text_size: px(18),
      text: str.forecastSub
    });

    curY += px(36);
    const cardH = px(176);
    const spacing = px(16);

    forecast.forEach((f) => {
      const ratingColor = f.rating >= 3.5 ? colors.SUCCESS : (f.rating >= 2.5 ? colors.PRIMARY : colors.WARNING);

      // Fundo do cartão
      this.createWidget(hmUI.widget.FILL_RECT, {
        x: mX,
        y: curY,
        w: cW,
        h: cardH,
        radius: px(18),
        color: f.isToday ? colors.BADGE_BG : colors.CARD_BG
      });

      // Borda
      this.createWidget(hmUI.widget.STROKE_RECT, {
        x: mX,
        y: curY,
        w: cW,
        h: cardH,
        radius: px(18),
        line_width: px(2),
        color: f.isToday ? colors.PRIMARY : colors.CARD_BORDER
      });

      // Cabeçalho do dia
      const dayTitle = f.isToday ? `${f.dayString} [${str.todayBadge}]` : f.dayString;
      this.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(12),
        w: cW - px(32),
        h: px(30),
        color: f.isToday ? colors.PRIMARY : colors.TEXT_MAIN,
        text_size: px(23),
        text: dayTitle
      });

      // Fase da Lua e Iluminação
      this.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(46),
        w: cW - px(32),
        h: px(28),
        color: colors.ACCENT_ORANGE,
        text_size: px(20),
        text: `${f.phaseName} • ${f.illumination}% ${str.illumination}`
      });

      // Avaliação da Pesca
      this.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(78),
        w: cW - px(32),
        h: px(30),
        color: ratingColor,
        text_size: px(22),
        text: `${str.fishing}: ${f.ratingText.toUpperCase()} ${f.stars}`
      });

      // Horários de Pico Solunar
      this.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(112),
        w: cW - px(32),
        h: px(26),
        color: colors.PRIMARY,
        text_size: px(18),
        text: `🎣 ${str.majorPeak}: ${f.solunarPeriods.major1}`
      });

      this.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(140),
        w: cW - px(32),
        h: px(24),
        color: colors.TEXT_MUTED,
        text_size: px(16),
        text: `🐟 ${str.minorPeak}: ${f.solunarPeriods.minor1}`
      });

      curY += cardH + spacing;
    });

    // Botão Voltar no Rodapé
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY + px(10),
      w: cW,
      h: px(64),
      radius: px(18),
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
    this.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY + px(86),
      w: cW,
      h: px(layout.bottomPadding),
      color: colors.TEXT_DIM,
      text_size: px(16),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: str.solunarFooter
    });
  }
});
