/**
 * page/defeso/index.js - Períodos de Defeso e Regulamentação da Piracema
 */
import * as hmUI from '@zos/ui';
import { back } from '@zos/router';
import { px } from '@zos/utils';
import { BASINS, getDefesoStatus } from '../../utils/defeso.js';
import { getSelectedBasin, setSelectedBasin } from '../../utils/storage.js';
import { COLORS } from '../../utils/constants.js';

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

    // 1. Topo: Botão Voltar + Título
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

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(146),
      y: px(16),
      w: px(270),
      h: px(46),
      color: COLORS.PRIMARY,
      text_size: px(25),
      align_v: hmUI.align.CENTER_V,
      text: 'DEFESO & REGRAS'
    });

    // 2. Seletor de Bacia (Botão Interativo)
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(16),
      y: px(68),
      w: px(400),
      h: px(24),
      color: COLORS.TEXT_MUTED,
      text_size: px(17),
      text: 'Toque para trocar de região / bacia:'
    });

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(16),
      y: px(96),
      w: px(400),
      h: px(56),
      radius: px(14),
      normal_color: COLORS.BTN_ACTION_BG,
      press_color: COLORS.BTN_ACTION_PRESS,
      color: COLORS.TEXT_MAIN,
      text_size: px(21),
      text: `🔄 ${basin.shortName} ▾`,
      click_func: () => {
        this.state.basinIndex = (this.state.basinIndex + 1) % BASINS.length;
        setSelectedBasin(BASINS[this.state.basinIndex].id);
        hmUI.redraw();
      }
    });

    // 3. Cartão de Status do Defeso
    const cardColor = defeso.isDefeso ? COLORS.DANGER : COLORS.SUCCESS;
    const card1Y = px(166);
    const card1H = px(170);

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: px(16),
      y: card1Y,
      w: px(400),
      h: card1H,
      radius: px(16),
      color: COLORS.CARD_BG
    });

    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: px(16),
      y: card1Y,
      w: px(400),
      h: card1H,
      radius: px(16),
      line_width: px(2),
      color: cardColor
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(28),
      y: card1Y + px(14),
      w: px(376),
      h: px(26),
      color: COLORS.TEXT_MUTED,
      text_size: px(18),
      text: 'STATUS ATUAL'
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(28),
      y: card1Y + px(44),
      w: px(376),
      h: px(34),
      color: cardColor,
      text_size: px(26),
      text: `[ ${defeso.statusBadge}: ${defeso.statusText} ]`
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(28),
      y: card1Y + px(82),
      w: px(376),
      h: px(26),
      color: COLORS.TEXT_MAIN,
      text_size: px(20),
      text: `Período: ${defeso.periodString}`
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(28),
      y: card1Y + px(112),
      w: px(376),
      h: px(46),
      color: COLORS.TEXT_DIM,
      text_size: px(16),
      text_style: hmUI.text_style.WRAP,
      text: defeso.rivers
    });

    // 4. Cartão Espécies Protegidas
    const card2Y = px(350);
    const card2H = px(130);

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: px(16),
      y: card2Y,
      w: px(400),
      h: card2H,
      radius: px(16),
      color: COLORS.CARD_BG
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(28),
      y: card2Y + px(12),
      w: px(376),
      h: px(26),
      color: COLORS.ACCENT_GOLD,
      text_size: px(20),
      text: '🐟 ESPÉCIES PROTEGIDAS'
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(28),
      y: card2Y + px(44),
      w: px(376),
      h: px(76),
      color: COLORS.TEXT_MUTED,
      text_size: px(17),
      text_style: hmUI.text_style.WRAP,
      text: defeso.protectedSpecies
    });

    // 5. Cartão O que é Permitido
    const card3Y = px(494);
    const card3H = px(136);

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: px(16),
      y: card3Y,
      w: px(400),
      h: card3H,
      radius: px(16),
      color: COLORS.CARD_BG
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(28),
      y: card3Y + px(12),
      w: px(376),
      h: px(26),
      color: COLORS.SUCCESS,
      text_size: px(20),
      text: '✔ O QUE É PERMITIDO'
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(28),
      y: card3Y + px(44),
      w: px(376),
      h: px(82),
      color: COLORS.TEXT_MUTED,
      text_size: px(17),
      text_style: hmUI.text_style.WRAP,
      text: defeso.exemptions
    });

    // 6. Cartão O que é Proibido
    const card4Y = px(644);
    const card4H = px(136);

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: px(16),
      y: card4Y,
      w: px(400),
      h: card4H,
      radius: px(16),
      color: COLORS.CARD_BG
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(28),
      y: card4Y + px(12),
      w: px(376),
      h: px(26),
      color: COLORS.DANGER,
      text_size: px(20),
      text: '✖ O QUE É PROIBIDO'
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(28),
      y: card4Y + px(44),
      w: px(376),
      h: px(82),
      color: COLORS.TEXT_MUTED,
      text_size: px(17),
      text_style: hmUI.text_style.WRAP,
      text: defeso.prohibitions
    });

    // Botão Voltar no Rodapé
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(16),
      y: px(794),
      w: px(400),
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

    // Espaçador final
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(16),
      y: px(864),
      w: px(400),
      h: px(40),
      color: COLORS.TEXT_DIM,
      text_size: px(15),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: 'Preserve a fauna aquática • IBAMA'
    });
  }
});
