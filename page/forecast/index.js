/**
 * page/forecast/index.js - Previsão Solunar dos Próximos 7 Dias
 */
import * as hmUI from '@zos/ui';
import { back } from '@zos/router';
import { px } from '@zos/utils';
import { getForecast } from '../../utils/lunar.js';
import { COLORS } from '../../utils/constants.js';

Page({
  build() {
    this.renderUI();
  },

  renderUI() {
    const today = new Date();
    const forecast = getForecast(today, 7);

    // Botão Voltar no Topo
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(16),
      y: px(16),
      w: px(120),
      h: px(46),
      radius: px(12),
      normal_color: COLORS.BTN_BG,
      press_color: COLORS.BTN_PRESS,
      color: COLORS.TEXT_MAIN,
      text_size: px(19),
      text: '◀ VOLTAR',
      click_func: () => {
        back();
      }
    });

    // Título da Página
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(146),
      y: px(16),
      w: px(270),
      h: px(46),
      color: COLORS.PRIMARY,
      text_size: px(25),
      align_v: hmUI.align.CENTER_V,
      text: 'PREVISÃO 7 DIAS'
    });

    // Subtítulo
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(16),
      y: px(68),
      w: px(400),
      h: px(26),
      color: COLORS.TEXT_MUTED,
      text_size: px(18),
      text: 'Melhores dias e horários de pesca:'
    });

    let currentY = px(104);
    const cardH = px(166);
    const spacing = px(14);

    forecast.forEach((f, idx) => {
      // Cor do cartão
      const ratingColor = f.rating >= 3.5 ? COLORS.SUCCESS : (f.rating >= 2.5 ? COLORS.PRIMARY : COLORS.WARNING);

      // Fundo do cartão
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: px(16),
        y: currentY,
        w: px(400),
        h: cardH,
        radius: px(16),
        color: f.isToday ? 0x162438 : COLORS.CARD_BG
      });

      // Borda
      hmUI.createWidget(hmUI.widget.STROKE_RECT, {
        x: px(16),
        y: currentY,
        w: px(400),
        h: cardH,
        radius: px(16),
        line_width: px(2),
        color: f.isToday ? COLORS.PRIMARY : COLORS.CARD_BORDER
      });

      // Cabeçalho do dia
      const dayTitle = f.isToday ? `${f.dayString} [HOJE]` : f.dayString;
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(30),
        y: currentY + px(12),
        w: px(372),
        h: px(28),
        color: f.isToday ? COLORS.PRIMARY : COLORS.TEXT_MAIN,
        text_size: px(22),
        text: dayTitle
      });

      // Fase da Lua e Iluminação
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(30),
        y: currentY + px(44),
        w: px(372),
        h: px(26),
        color: COLORS.ACCENT_GOLD,
        text_size: px(20),
        text: `${f.phaseName} • ${f.illumination}% Ilum.`
      });

      // Avaliação da Pesca
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(30),
        y: currentY + px(74),
        w: px(372),
        h: px(28),
        color: ratingColor,
        text_size: px(21),
        text: `Pesca: ${f.ratingText.toUpperCase()} ${f.stars}`
      });

      // Horários de Pico Solunar
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(30),
        y: currentY + px(106),
        w: px(372),
        h: px(24),
        color: COLORS.TEXT_MUTED,
        text_size: px(17),
        text: `Pico Maior: ${f.solunarPeriods.major1}`
      });

      hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(30),
        y: currentY + px(132),
        w: px(372),
        h: px(24),
        color: COLORS.TEXT_DIM,
        text_size: px(16),
        text: `Pico Menor: ${f.solunarPeriods.minor1}`
      });

      currentY += cardH + spacing;
    });

    // Botão Voltar no Rodapé
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(16),
      y: currentY + px(10),
      w: px(400),
      h: px(58),
      radius: px(14),
      normal_color: COLORS.BTN_ACTION_BG,
      press_color: COLORS.BTN_ACTION_PRESS,
      color: COLORS.TEXT_MAIN,
      text_size: px(22),
      text: '◀ VOLTAR AO INÍCIO',
      click_func: () => {
        back();
      }
    });

    // Espaçador final
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(16),
      y: currentY + px(80),
      w: px(400),
      h: px(40),
      color: COLORS.TEXT_DIM,
      text_size: px(15),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: 'Teoria Solunar • John Alden Knight'
    });
  }
});
