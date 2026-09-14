/**
 * page/defeso/index.js - Períodos de Defeso e Regulamentação da Piracema
 * Suporte a todas as 6 grandes bacias do Brasil (Paraná, Pantanal, São Francisco, Amazônica, Tocantins, Marítimo)
 * Atualização instantânea em tempo real com Apple Watch UI
 */
import * as hmUI from '@zos/ui';
import { back } from '@zos/router';
import { px } from '@zos/utils';
import { BASINS, getDefesoStatus, getNextBasinId } from '../../utils/defeso.js';
import { getSelectedBasin, setSelectedBasin, getUserTheme } from '../../utils/storage.js';
import { getAppLanguage, t } from '../../utils/i18n.js';
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
    const selectedBasin = getSelectedBasin();
    const defeso = getDefesoStatus(today, selectedBasin, lang);
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
      text: str.defesoTitle
    });

    curY += px(58);

    // 2. SELETOR DE BACIA HIDROGRÁFICA (BOTÃO NATIVO 1 TOQUE)
    const basinCardH = px(90);
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: basinCardH,
      radius: px(18),
      normal_color: colors.CARD_BG,
      press_color: colors.BTN_PRESS,
      color: colors.PRIMARY,
      text_size: px(19),
      text: `🌊 ${defeso.basinName}\n${str.regionTapChange} ▾`,
      click_func: () => {
        const nextId = getNextBasinId(selectedBasin);
        setSelectedBasin(nextId);
        this.clearUI();
        this.renderUI();
      }
    });

    this.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: basinCardH,
      radius: px(18),
      line_width: px(2),
      color: colors.PRIMARY
    });

    curY += basinCardH + px(16);

    // 3. Cartão de Status do Defeso
    const cardColor = defeso.isDefeso ? colors.DANGER : colors.SUCCESS;
    const card1H = px(182);

    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card1H,
      radius: px(18),
      color: colors.CARD_BG
    });

    this.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card1H,
      radius: px(18),
      line_width: px(2),
      color: cardColor
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(14),
      w: cW - px(36),
      h: px(26),
      color: colors.TEXT_MUTED,
      text_size: px(18),
      text: str.defesoCurrentStatus
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(46),
      w: cW - px(36),
      h: px(36),
      color: cardColor,
      text_size: px(24),
      text: `[ ${defeso.statusBadge}: ${defeso.statusText} ]`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(86),
      w: cW - px(36),
      h: px(28),
      color: colors.TEXT_MAIN,
      text_size: px(20),
      text: `${str.defesoPeriod}: ${defeso.periodString}`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(118),
      w: cW - px(36),
      h: px(52),
      color: colors.TEXT_DIM,
      text_size: px(17),
      text_style: hmUI.text_style.WRAP,
      text: defeso.rivers
    });

    curY += card1H + px(16);

    // 4. Cartão Espécies Protegidas
    const card2H = px(144);

    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card2H,
      radius: px(18),
      color: colors.CARD_BG
    });

    this.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card2H,
      radius: px(18),
      line_width: px(1),
      color: colors.CARD_BORDER
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(14),
      w: cW - px(36),
      h: px(28),
      color: colors.ACCENT_ORANGE,
      text_size: px(20),
      text: str.defesoProtected
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(48),
      w: cW - px(36),
      h: px(84),
      color: colors.TEXT_MAIN,
      text_size: px(18),
      text_style: hmUI.text_style.WRAP,
      text: defeso.protectedSpecies
    });

    curY += card2H + px(16);

    // 5. Cartão O que é Permitido
    const card3H = px(150);

    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card3H,
      radius: px(18),
      color: colors.CARD_BG
    });

    this.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card3H,
      radius: px(18),
      line_width: px(1),
      color: colors.CARD_BORDER
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(14),
      w: cW - px(36),
      h: px(28),
      color: colors.SUCCESS,
      text_size: px(20),
      text: str.defesoAllowed
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(48),
      w: cW - px(36),
      h: px(92),
      color: colors.TEXT_MAIN,
      text_size: px(18),
      text_style: hmUI.text_style.WRAP,
      text: defeso.exemptions
    });

    curY += card3H + px(16);

    // 6. Cartão O que é Proibido
    const card4H = px(150);

    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card4H,
      radius: px(18),
      color: colors.CARD_BG
    });

    this.createWidget(hmUI.widget.STROKE_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card4H,
      radius: px(18),
      line_width: px(1),
      color: colors.CARD_BORDER
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(14),
      w: cW - px(36),
      h: px(28),
      color: colors.DANGER,
      text_size: px(20),
      text: str.defesoProhibited
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(18),
      y: curY + px(48),
      w: cW - px(36),
      h: px(92),
      color: colors.TEXT_MAIN,
      text_size: px(18),
      text_style: hmUI.text_style.WRAP,
      text: defeso.prohibitions
    });

    curY += card4H + px(20);

    // Botão Voltar no Rodapé (Apple Style 64px)
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: px(64),
      radius: px(18),
      normal_color: colors.BTN_BG,
      press_color: colors.BTN_PRESS,
      color: colors.BTN_TEXT,
      text_size: px(22),
      text: str.btnBackHome,
      click_func: () => {
        back();
      }
    });

    curY += px(74);

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
      text: str.defesoFooter
    });
  }
});
