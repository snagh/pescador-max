/**
 * page/spots/index.js - Locais de Pesca, Waypoints e Guia de Iscas
 */
import * as hmUI from '@zos/ui';
import { back } from '@zos/router';
import { px } from '@zos/utils';
import { SPOT_TYPES } from '../../utils/spots.js';
import { getSavedSpots, addSpot, deleteSpot } from '../../utils/storage.js';
import { COLORS } from '../../utils/constants.js';

Page({
  state: {
    spots: []
  },

  onInit() {
    this.state.spots = getSavedSpots();
  },

  build() {
    this.renderUI();
  },

  renderUI() {
    this.state.spots = getSavedSpots();

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
      text: 'LOCAIS & PONTOS'
    });

    // 2. Botão de Marcar Ponto Atual
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(16),
      y: px(76),
      w: px(400),
      h: px(58),
      radius: px(14),
      normal_color: COLORS.SUCCESS,
      press_color: 0x059669,
      color: COLORS.TEXT_MAIN,
      text_size: px(22),
      text: '📍 + MARCAR PONTO AQUI',
      click_func: () => {
        const now = new Date();
        const timeStr = `${now.getHours() < 10 ? '0' : ''}${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
        const count = this.state.spots.length + 1;
        
        addSpot({
          name: `Ponto Marcado #${count}`,
          type: 'Local Salvo',
          time: `Salvo às ${timeStr}`,
          coords: 'Marcado no Relógio',
          notes: 'Ponto registrado com sucesso'
        });

        this.state.spots = getSavedSpots();
        hmUI.redraw();
      }
    });

    // 3. Seção MEUS PONTOS SALVOS
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(16),
      y: px(146),
      w: px(400),
      h: px(28),
      color: COLORS.ACCENT_GOLD,
      text_size: px(21),
      text: `MEUS WAYPOINTS (${this.state.spots.length})`
    });

    let currentY = px(180);
    const spotCardH = px(110);
    const spacing = px(12);

    this.state.spots.forEach((spot) => {
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: px(16),
        y: currentY,
        w: px(400),
        h: spotCardH,
        radius: px(16),
        color: COLORS.CARD_BG
      });

      hmUI.createWidget(hmUI.widget.STROKE_RECT, {
        x: px(16),
        y: currentY,
        w: px(400),
        h: spotCardH,
        radius: px(16),
        line_width: px(2),
        color: COLORS.CARD_BORDER
      });

      // Nome do Ponto
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(28),
        y: currentY + px(10),
        w: px(260),
        h: px(28),
        color: COLORS.TEXT_MAIN,
        text_size: px(21),
        text: spot.name
      });

      // Horário / Coordenadas
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(28),
        y: currentY + px(38),
        w: px(260),
        h: px(24),
        color: COLORS.PRIMARY,
        text_size: px(17),
        text: `${spot.time} • ${spot.coords}`
      });

      // Notas
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(28),
        y: currentY + px(64),
        w: px(260),
        h: px(38),
        color: COLORS.TEXT_MUTED,
        text_size: px(16),
        text_style: hmUI.text_style.WRAP,
        text: spot.notes
      });

      // Botão Excluir
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: px(296),
        y: currentY + px(30),
        w: px(106),
        h: px(48),
        radius: px(10),
        normal_color: 0x3f1515,
        press_color: 0x5c1d1d,
        color: COLORS.DANGER,
        text_size: px(17),
        text: 'EXCLUIR',
        click_func: () => {
          deleteSpot(spot.id);
          this.state.spots = getSavedSpots();
          hmUI.redraw();
        }
      });

      currentY += spotCardH + spacing;
    });

    // 4. Seção GUIA DE ISCAS POR AMBIENTE
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(16),
      y: currentY + px(16),
      w: px(400),
      h: px(30),
      color: COLORS.PRIMARY,
      text_size: px(23),
      text: 'GUIA DE ISCAS POR LOCAL'
    });

    currentY += px(56);
    const guideCardH = px(154);

    SPOT_TYPES.forEach((guide) => {
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: px(16),
        y: currentY,
        w: px(400),
        h: guideCardH,
        radius: px(16),
        color: COLORS.CARD_BG
      });

      hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(28),
        y: currentY + px(10),
        w: px(376),
        h: px(28),
        color: COLORS.ACCENT_GOLD,
        text_size: px(21),
        text: `🎣 ${guide.title}`
      });

      hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(28),
        y: currentY + px(38),
        w: px(376),
        h: px(24),
        color: COLORS.TEXT_MAIN,
        text_size: px(17),
        text: `Peixes: ${guide.species}`
      });

      hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(28),
        y: currentY + px(64),
        w: px(376),
        h: px(42),
        color: COLORS.PRIMARY,
        text_size: px(16),
        text_style: hmUI.text_style.WRAP,
        text: `Iscas: ${guide.baits}`
      });

      hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(28),
        y: currentY + px(108),
        w: px(376),
        h: px(38),
        color: COLORS.TEXT_MUTED,
        text_size: px(15),
        text_style: hmUI.text_style.WRAP,
        text: `Dica: ${guide.tips}`
      });

      currentY += guideCardH + spacing;
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
      text: 'Boas Pescarias! • Pescador Max'
    });
  }
});
