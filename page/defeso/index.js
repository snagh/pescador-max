/**
 * page/defeso/index.js - Períodos de Defeso e Regulamentação da Piracema
 * Totalmente responsivo para telas Retangulares e Redondas
 */
import * as hmUI from '@zos/ui';
import { back } from '@zos/router';
import { px } from '@zos/utils';
import { BASINS, getDefesoStatus } from '../../utils/defeso.js';
import { getSelectedBasin, setSelectedBasin } from '../../utils/storage.js';
import { COLORS, getLayoutConfig } from '../../utils/constants.js';

Page({
  state: {
    basinIndex: 0
  },

  onInit() {
    const saved = getSelectedBasin();
    const idx = BASINS.findIndex(b => b.id === saved);
    this.state.basinIndex = idx >= 0 ? idx : 0;
  },

  build() {
    this.renderUI();
  },

  renderUI() {
    const today = new Date();
    const basin = BASINS[this.state.basinIndex];
    const defeso = getDefesoStatus(today, basin.id);
    const layout = getLayoutConfig();

    const mX = px(layout.marginX);
    const cW = px(layout.cardW);
    let curY = px(layout.topPadding);

    // 1. Topo: Botão Voltar + Título
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
      text: '◀ VOLTAR',
      click_func: () => {
        back();
      }
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(120),
      y: curY,
      w: cW - px(120),
      h: px(46),
      color: COLORS.PRIMARY,
      text_size: px(23),
      align_v: hmUI.align.CENTER_V,
      text: 'DEFESO & REGRAS'
    });

    curY += px(52);

    // 2. Seletor de Bacia (Botão Interativo)
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(24),
      color: COLORS.TEXT_MUTED,
      text_size: px(17),
      text: 'Toque para trocar de região / bacia:'
    });

    curY += px(28);

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: px(56),
      radius: px(14),
      normal_color: COLORS.BTN_ACTION_BG,
      press_color: COLORS.BTN_ACTION_PRESS,
      color: COLORS.TEXT_MAIN,
      text_size: px(20),
      text: `🔄 ${basin.shortName} ▾`,
      click_func: () => {
        this.state.basinIndex = (this.state.basinIndex + 1) % BASINS.length;
        setSelectedBasin(BASINS[this.state.basinIndex].id);
        hmUI.redraw();
      }
    });

    curY += px(68);

    // 3. Cartão de Status do Defeso
    const cardColor = defeso.isDefeso ? COLORS.DANGER : COLORS.SUCCESS;
    const card1H = px(170);

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card1H,
      radius: px(16),
      color: COLORS.CARD_BG
    });

    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card1H,
      radius: px(16),
      line_width: px(2),
      color: cardColor
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(14),
      w: cW - px(32),
      h: px(26),
      color: COLORS.TEXT_MUTED,
      text_size: px(18),
      text: 'STATUS ATUAL'
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(44),
      w: cW - px(32),
      h: px(34),
      color: cardColor,
      text_size: px(24),
      text: `[ ${defeso.statusBadge}: ${defeso.statusText} ]`
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(82),
      w: cW - px(32),
      h: px(26),
      color: COLORS.TEXT_MAIN,
      text_size: px(19),
      text: `Período: ${defeso.periodString}`
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(112),
      w: cW - px(32),
      h: px(46),
      color: COLORS.TEXT_DIM,
      text_size: px(16),
      text_style: hmUI.text_style.WRAP,
      text: defeso.rivers
    });

    curY += card1H + px(14);

    // 4. Cartão Espécies Protegidas
    const card2H = px(130);

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card2H,
      radius: px(16),
      color: COLORS.CARD_BG
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(12),
      w: cW - px(32),
      h: px(26),
      color: COLORS.ACCENT_GOLD,
      text_size: px(20),
      text: '🐟 ESPÉCIES PROTEGIDAS'
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(44),
      w: cW - px(32),
      h: px(76),
      color: COLORS.TEXT_MUTED,
      text_size: px(16),
      text_style: hmUI.text_style.WRAP,
      text: defeso.protectedSpecies
    });

    curY += card2H + px(14);

    // 5. Cartão O que é Permitido
    const card3H = px(136);

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card3H,
      radius: px(16),
      color: COLORS.CARD_BG
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(12),
      w: cW - px(32),
      h: px(26),
      color: COLORS.SUCCESS,
      text_size: px(20),
      text: '✔ O QUE É PERMITIDO'
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(44),
      w: cW - px(32),
      h: px(82),
      color: COLORS.TEXT_MUTED,
      text_size: px(16),
      text_style: hmUI.text_style.WRAP,
      text: defeso.exemptions
    });

    curY += card3H + px(14);

    // 6. Cartão O que é Proibido
    const card4H = px(136);

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card4H,
      radius: px(16),
      color: COLORS.CARD_BG
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(12),
      w: cW - px(32),
      h: px(26),
      color: COLORS.DANGER,
      text_size: px(20),
      text: '✖ O QUE É PROIBIDO'
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(44),
      w: cW - px(32),
      h: px(82),
      color: COLORS.TEXT_MUTED,
      text_size: px(16),
      text_style: hmUI.text_style.WRAP,
      text: defeso.prohibitions
    });

    curY += card4H + px(14);

    // Botão Voltar no Rodapé
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: px(58),
      radius: px(14),
      normal_color: COLORS.BTN_BG,
      press_color: COLORS.BTN_PRESS,
      color: COLORS.TEXT_MAIN,
      text_size: px(22),
      text: '◀ VOLTAR AO INÍCIO',
      click_func: () => {
        back();
      }
    });

    curY += px(68);

    // Espaçador final
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(layout.bottomPadding),
      color: COLORS.TEXT_DIM,
      text_size: px(15),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: 'Preserve a fauna aquática • IBAMA'
    });
  }
});
