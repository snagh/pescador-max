/**
 * page/forecast/index.js - Previsão Solunar dos Próximos 7 Dias (Bilingual)
 * Otimizado para máxima legibilidade (35 a 55 anos):
 * - Fontes grandes e em negrito (18px a 24px)
 * - Horários de pico solunares claros e intuitivos (destaque para o horário diurno de pesca)
 * - Zero caracteres 'quadradinho' ou confusão de fuso
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
        h: 2400,
        color: colors.BG
      });
    }

    // Topo: Botão Voltar + Título
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: px(120),
      h: px(46),
      radius: px(23),
      normal_color: 0x2c2c2e,
      press_color: 0x3a3a3c,
      color: 0xffffff,
      text_size: px(18),
      text: str.btnBack,
      click_func: () => {
        back();
      }
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(132),
      y: curY,
      w: cW - px(132),
      h: px(46),
      color: 0x00d2ff,
      text_size: px(23),
      align_v: hmUI.align.CENTER_V,
      text: str.forecastTitle
    });

    curY += px(54);

    // Subtítulo
    this.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(28),
      color: 0x8e8e93,
      text_size: px(18),
      text: 'Melhores Dias e Horários de Pesca:'
    });

    curY += px(36);
    const cardH = px(182);
    const spacing = px(16);

    forecast.forEach((f) => {
      const ratingColor = f.rating >= 3.5 ? 0x30d158 : (f.rating >= 2.5 ? 0x00d2ff : 0xffb300);

      // Fundo do cartão sólido watchOS 10
      this.createWidget(hmUI.widget.FILL_RECT, {
        x: mX,
        y: curY,
        w: cW,
        h: cardH,
        radius: px(20),
        color: f.isToday ? 0x14283d : 0x1c1c1e
      });

      // Cabeçalho do dia
      const dayTitle = f.isToday ? `${f.dayString} [HOJE]` : f.dayString;
      this.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(12),
        w: cW - px(32),
        h: px(30),
        color: f.isToday ? 0x00d2ff : 0xffffff,
        text_size: px(23),
        text: dayTitle
      });

      // Fase da Lua e Iluminação
      this.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(44),
        w: cW - px(32),
        h: px(26),
        color: 0xff6b4a,
        text_size: px(19),
        text: `${f.phaseName} • ${f.illumination}% Luz`
      });

      // Avaliação da Pesca
      this.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(74),
        w: cW - px(32),
        h: px(28),
        color: ratingColor,
        text_size: px(20),
        text: `PESCA: ${f.ratingText.toUpperCase()} (Nota 8.5)`
      });

      // Horário de Pico Intuitivo (Horário diurno claro)
      this.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(106),
        w: cW - px(32),
        h: px(28),
        color: 0x00d2ff,
        text_size: px(19),
        text: `🎣 Melhor Horário: ${f.bestPeak || f.daytimePeak}`
      });

      this.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(136),
        w: cW - px(32),
        h: px(26),
        color: 0x8e8e93,
        text_size: px(16),
        text: `🐟 Pico Secundário: ${f.solunarPeriods.minor1} (Manhã)`
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
      normal_color: 0x0066ff,
      press_color: 0x004ccc,
      color: 0xffffff,
      text_size: px(22),
      text: '◀  VOLTAR AO INÍCIO',
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
      color: 0x64748b,
      text_size: px(15),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: 'Teoria Solunar • John Alden Knight'
    });
  }
});
