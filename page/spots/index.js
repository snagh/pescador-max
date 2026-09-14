/**
 * page/spots/index.js - Locais de Pesca, Waypoints com GPS e Guia de Iscas
 * Atualização instantânea em tempo real e interface Apple Watch
 */
import * as hmUI from '@zos/ui';
import { back } from '@zos/router';
import { px } from '@zos/utils';
import { getSpotTypes } from '../../utils/spots.js';
import { getSavedSpots, addSpot, deleteSpot, getUserTheme } from '../../utils/storage.js';
import { getCurrentCoordinates } from '../../utils/sensors.js';
import { getAppLanguage, t } from '../../utils/i18n.js';
import { getColors, getLayoutConfig } from '../../utils/constants.js';

Page({
  state: {
    widgets: [],
    spots: []
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
    this.state.spots = getSavedSpots();
    const spotTypes = getSpotTypes(lang);
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

    // 1. Topo: Botão Voltar + Título
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

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(130),
      y: curY,
      w: cW - px(130),
      h: px(48),
      color: colors.PRIMARY,
      text_size: px(24),
      align_v: hmUI.align.CENTER_V,
      text: str.spotsTitle
    });

    curY += px(62);

    // 2. Botão de Marcar Ponto com GPS (Alvo de toque amplo)
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: px(64),
      radius: px(18),
      normal_color: colors.SUCCESS,
      press_color: 0x059669,
      color: 0xffffff,
      text_size: px(22),
      text: str.spotsMarkBtn,
      click_func: () => {
        const now = new Date();
        const timeStr = `${now.getHours() < 10 ? '0' : ''}${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
        const count = this.state.spots.length + 1;
        const coords = getCurrentCoordinates(lang);

        addSpot({
          name: lang === 'en' ? `Marked Spot #${count}` : `Ponto Marcado #${count}`,
          type: lang === 'en' ? 'Saved Waypoint' : 'Waypoint Salvo',
          time: lang === 'en' ? `Saved at ${timeStr}` : `Salvo às ${timeStr}`,
          coords: coords.string,
          notes: coords.available 
            ? (lang === 'en' ? 'GPS coordinates locked' : 'Coordenadas GPS registradas')
            : (lang === 'en' ? 'Saved with time tag' : 'Ponto salvo com timestamp')
        });

        this.clearUI();
        this.renderUI();
      }
    });

    curY += px(76);

    // 3. Seção MEUS PONTOS SALVOS
    this.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(30),
      color: colors.ACCENT_ORANGE,
      text_size: px(22),
      text: `📍 ${str.spotsMyWaypoints} (${this.state.spots.length})`
    });

    curY += px(38);
    const spotCardH = px(126);
    const spacing = px(14);

    this.state.spots.forEach((spot) => {
      this.createWidget(hmUI.widget.FILL_RECT, {
        x: mX,
        y: curY,
        w: cW,
        h: spotCardH,
        radius: px(18),
        color: colors.CARD_BG
      });

      this.createWidget(hmUI.widget.STROKE_RECT, {
        x: mX,
        y: curY,
        w: cW,
        h: spotCardH,
        radius: px(18),
        line_width: px(1),
        color: colors.CARD_BORDER
      });

      const btnExcluirW = px(100);
      const textColW = cW - btnExcluirW - px(24);

      // Nome do ponto
      this.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(12),
        w: textColW,
        h: px(28),
        color: colors.PRIMARY,
        text_size: px(20),
        text: spot.name
      });

      // Horário e GPS
      this.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(42),
        w: textColW,
        h: px(24),
        color: colors.TEXT_MAIN,
        text_size: px(16),
        text: `${spot.time} • ${spot.coords}`
      });

      // Notas
      this.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(70),
        w: textColW,
        h: px(46),
        color: colors.TEXT_MUTED,
        text_size: px(15),
        text_style: hmUI.text_style.WRAP,
        text: spot.notes
      });

      // Botão Excluir
      this.createWidget(hmUI.widget.BUTTON, {
        x: mX + cW - btnExcluirW - px(14),
        y: curY + px(36),
        w: btnExcluirW,
        h: px(52),
        radius: px(14),
        normal_color: colors.isLight ? 0xfee2e2 : 0x3f1515,
        press_color: colors.isLight ? 0xfecaca : 0x5c1d1d,
        color: colors.DANGER,
        text_size: px(17),
        text: str.spotsDelete,
        click_func: () => {
          deleteSpot(spot.id);
          this.clearUI();
          this.renderUI();
        }
      });

      curY += spotCardH + spacing;
    });

    curY += px(16);

    // 4. Seção GUIA DE ISCAS POR AMBIENTE
    this.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(32),
      color: colors.PRIMARY,
      text_size: px(24),
      text: str.spotsGuideTitle
    });

    curY += px(42);
    const guideCardH = px(164);

    spotTypes.forEach((guide) => {
      this.createWidget(hmUI.widget.FILL_RECT, {
        x: mX,
        y: curY,
        w: cW,
        h: guideCardH,
        radius: px(18),
        color: colors.CARD_BG
      });

      this.createWidget(hmUI.widget.STROKE_RECT, {
        x: mX,
        y: curY,
        w: cW,
        h: guideCardH,
        radius: px(18),
        line_width: px(1),
        color: colors.CARD_BORDER
      });

      this.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(12),
        w: cW - px(32),
        h: px(30),
        color: colors.ACCENT_ORANGE,
        text_size: px(21),
        text: `🎣 ${guide.title}`
      });

      this.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(44),
        w: cW - px(32),
        h: px(26),
        color: colors.TEXT_MAIN,
        text_size: px(18),
        text: `${lang === 'en' ? 'Target' : 'Peixes'}: ${guide.species}`
      });

      this.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(72),
        w: cW - px(32),
        h: px(44),
        color: colors.PRIMARY,
        text_size: px(16),
        text_style: hmUI.text_style.WRAP,
        text: `${lang === 'en' ? 'Baits' : 'Iscas'}: ${guide.baits}`
      });

      this.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(118),
        w: cW - px(32),
        h: px(38),
        color: colors.TEXT_MUTED,
        text_size: px(15),
        text_style: hmUI.text_style.WRAP,
        text: `${lang === 'en' ? 'Tip' : 'Dica'}: ${guide.tips}`
      });

      curY += guideCardH + spacing;
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

    curY += px(76);

    // Espaçador final
    this.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(layout.bottomPadding),
      color: colors.TEXT_DIM,
      text_size: px(16),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: str.spotsFooter
    });
  }
});
