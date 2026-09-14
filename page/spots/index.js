/**
 * page/spots/index.js - Locais de Pesca, Waypoints com GPS e Guia de Iscas (Bilingual)
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
    spots: []
  },

  onInit() {
    this.state.spots = getSavedSpots();
  },

  build() {
    this.renderUI();
  },

  renderUI() {
    const lang = getAppLanguage();
    const str = t(lang);
    const theme = getUserTheme();
    const colors = getColors(theme);
    this.state.spots = getSavedSpots();
    const spotTypes = getSpotTypes(lang);
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

    // 1. Topo: Botão Voltar + Título
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

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX + px(120),
      y: curY,
      w: cW - px(120),
      h: px(46),
      color: colors.PRIMARY,
      text_size: px(23),
      align_v: hmUI.align.CENTER_V,
      text: str.spotsTitle
    });

    curY += px(56);

    // 2. Botão de Marcar Ponto com GPS
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: px(58),
      radius: px(14),
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

        this.state.spots = getSavedSpots();
        hmUI.redraw();
      }
    });

    curY += px(68);

    // 3. Seção MEUS PONTOS SALVOS
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(28),
      color: colors.ACCENT_ORANGE,
      text_size: px(21),
      text: `${str.spotsMyWaypoints} (${this.state.spots.length})`
    });

    curY += px(34);
    const spotCardH = px(112);
    const spacing = px(12);

    this.state.spots.forEach((spot) => {
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: mX,
        y: curY,
        w: cW,
        h: spotCardH,
        radius: px(16),
        color: colors.CARD_BG
      });

      hmUI.createWidget(hmUI.widget.STROKE_RECT, {
        x: mX,
        y: curY,
        w: cW,
        h: spotCardH,
        radius: px(16),
        line_width: px(2),
        color: colors.CARD_BORDER
      });

      const btnExcluirW = px(96);
      const textColW = cW - btnExcluirW - px(28);

      // Nome do Ponto
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(10),
        w: textColW,
        h: px(28),
        color: colors.TEXT_MAIN,
        text_size: px(20),
        text: spot.name
      });

      // Horário / Coordenadas
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(38),
        w: textColW,
        h: px(24),
        color: colors.PRIMARY,
        text_size: px(15),
        text: `${spot.time} • ${spot.coords}`
      });

      // Notas
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(64),
        w: textColW,
        h: px(38),
        color: colors.TEXT_MUTED,
        text_size: px(14),
        text_style: hmUI.text_style.WRAP,
        text: spot.notes
      });

      // Botão Excluir
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: mX + cW - btnExcluirW - px(12),
        y: curY + px(32),
        w: btnExcluirW,
        h: px(46),
        radius: px(10),
        normal_color: colors.isLight ? 0xfee2e2 : 0x3f1515,
        press_color: colors.isLight ? 0xfecaca : 0x5c1d1d,
        color: colors.DANGER,
        text_size: px(16),
        text: str.spotsDelete,
        click_func: () => {
          deleteSpot(spot.id);
          this.state.spots = getSavedSpots();
          hmUI.redraw();
        }
      });

      curY += spotCardH + spacing;
    });

    curY += px(10);

    // 4. Seção GUIA DE ISCAS POR AMBIENTE
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(30),
      color: colors.PRIMARY,
      text_size: px(23),
      text: str.spotsGuideTitle
    });

    curY += px(38);
    const guideCardH = px(154);

    spotTypes.forEach((guide) => {
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: mX,
        y: curY,
        w: cW,
        h: guideCardH,
        radius: px(16),
        color: colors.CARD_BG
      });

      if (colors.isLight) {
        hmUI.createWidget(hmUI.widget.STROKE_RECT, {
          x: mX,
          y: curY,
          w: cW,
          h: guideCardH,
          radius: px(16),
          line_width: px(1),
          color: colors.CARD_BORDER
        });
      }

      hmUI.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(10),
        w: cW - px(32),
        h: px(28),
        color: colors.ACCENT_ORANGE,
        text_size: px(20),
        text: `🎣 ${guide.title}`
      });

      hmUI.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(38),
        w: cW - px(32),
        h: px(24),
        color: colors.TEXT_MAIN,
        text_size: px(16),
        text: `${lang === 'en' ? 'Target' : 'Peixes'}: ${guide.species}`
      });

      hmUI.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(64),
        w: cW - px(32),
        h: px(42),
        color: colors.PRIMARY,
        text_size: px(15),
        text_style: hmUI.text_style.WRAP,
        text: `${lang === 'en' ? 'Baits' : 'Iscas'}: ${guide.baits}`
      });

      hmUI.createWidget(hmUI.widget.TEXT, {
        x: mX + px(16),
        y: curY + px(108),
        w: cW - px(32),
        h: px(38),
        color: colors.TEXT_MUTED,
        text_size: px(14),
        text_style: hmUI.text_style.WRAP,
        text: `${lang === 'en' ? 'Tip' : 'Dica'}: ${guide.tips}`
      });

      curY += guideCardH + spacing;
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

    curY += px(68);

    // Espaçador final
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(layout.bottomPadding),
      color: colors.TEXT_DIM,
      text_size: px(15),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: str.spotsFooter
    });
  }
});
