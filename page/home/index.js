/**
 * page/home/index.js - Dashboard Principal do Pescador Max
 * Fases da Lua, Teoria Solunar, Barômetro em Tempo Real e Defeso
 */
import * as hmUI from '@zos/ui';
import { push } from '@zos/router';
import { px } from '@zos/utils';
import { getMoonDetails } from '../../utils/lunar.js';
import { getDefesoStatus } from '../../utils/defeso.js';
import { getSelectedBasin } from '../../utils/storage.js';
import { getBarometerReading } from '../../utils/sensors.js';
import { COLORS } from '../../utils/constants.js';

Page({
  build() {
    this.renderUI();
  },

  renderUI() {
    const today = new Date();
    const moon = getMoonDetails(today);
    const selectedBasin = getSelectedBasin();
    const defeso = getDefesoStatus(today, selectedBasin);
    const barometer = getBarometerReading();

    const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const dateStr = `${weekDays[today.getDay()]}, ${today.getDate()} de ${months[today.getMonth()]}`;

    // 1. TÍTULO PRINCIPAL
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(16),
      y: px(24),
      w: px(400),
      h: px(38),
      color: COLORS.PRIMARY,
      text_size: px(30),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: 'PESCADOR MAX 🎣'
    });

    // Subtítulo: Data atual
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(16),
      y: px(64),
      w: px(400),
      h: px(30),
      color: COLORS.TEXT_MUTED,
      text_size: px(21),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: dateStr
    });

    // 2. CARTÃO LUNAR & SOLUNAR
    const card1Y = px(104);
    const card1H = px(226);

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: px(16),
      y: card1Y,
      w: px(400),
      h: card1H,
      radius: px(18),
      color: COLORS.CARD_BG
    });

    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: px(16),
      y: card1Y,
      w: px(400),
      h: card1H,
      radius: px(18),
      line_width: px(2),
      color: COLORS.CARD_BORDER
    });

    // Nome da Fase da Lua
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(24),
      y: card1Y + px(16),
      w: px(384),
      h: px(36),
      color: COLORS.TEXT_MAIN,
      text_size: px(28),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: `${moon.phaseName.toUpperCase()}`
    });

    // Iluminação & Idade
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(24),
      y: card1Y + px(54),
      w: px(384),
      h: px(28),
      color: COLORS.ACCENT_GOLD,
      text_size: px(21),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: `Iluminação: ${moon.illumination}%  •  Idade: ${moon.age}d`
    });

    // Nota da Pescaria (Avaliação Solunar)
    const ratingColor = moon.rating >= 3.5 ? COLORS.SUCCESS : (moon.rating >= 2.5 ? COLORS.PRIMARY : COLORS.WARNING);
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(24),
      y: card1Y + px(90),
      w: px(384),
      h: px(32),
      color: ratingColor,
      text_size: px(24),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: `PESCA: ${moon.ratingText.toUpperCase()} ${moon.stars}`
    });

    // Dica da Fase
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(30),
      y: card1Y + px(126),
      w: px(372),
      h: px(44),
      color: COLORS.TEXT_MUTED,
      text_size: px(18),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.WRAP,
      text: moon.phaseDescription
    });

    // Linha de Picos Solunares
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(24),
      y: card1Y + px(180),
      w: px(384),
      h: px(28),
      color: COLORS.PRIMARY,
      text_size: px(19),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: `Pico Maior: ${moon.solunarPeriods.major1}`
    });

    // 3. CARTÃO DE BARÔMETRO / PRESSÃO ATMOSFÉRICA
    const cardBaroY = px(344);
    const cardBaroH = px(136);

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: px(16),
      y: cardBaroY,
      w: px(400),
      h: cardBaroH,
      radius: px(18),
      color: COLORS.CARD_BG
    });

    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: px(16),
      y: cardBaroY,
      w: px(400),
      h: cardBaroH,
      radius: px(18),
      line_width: px(2),
      color: barometer.color
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(32),
      y: cardBaroY + px(12),
      w: px(368),
      h: px(24),
      color: COLORS.TEXT_MUTED,
      text_size: px(18),
      text: 'BARÔMETRO & PRESSÃO'
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(32),
      y: cardBaroY + px(38),
      w: px(368),
      h: px(30),
      color: barometer.color,
      text_size: px(23),
      text: `🧭 ${barometer.status} • ${barometer.trend}`
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(32),
      y: cardBaroY + px(70),
      w: px(368),
      h: px(28),
      color: COLORS.TEXT_MAIN,
      text_size: px(18),
      text: barometer.fishActivity
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(32),
      y: cardBaroY + px(98),
      w: px(368),
      h: px(30),
      color: COLORS.TEXT_MUTED,
      text_size: px(16),
      text: `Dica: ${barometer.recommendation}`
    });

    // 4. CARTÃO DE STATUS DO DEFESO / PIRACEMA
    const card2Y = px(494);
    const card2H = px(116);
    const defesoColor = defeso.isDefeso ? COLORS.DANGER : COLORS.SUCCESS;

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: px(16),
      y: card2Y,
      w: px(400),
      h: card2H,
      radius: px(18),
      color: COLORS.CARD_BG
    });

    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: px(16),
      y: card2Y,
      w: px(400),
      h: card2H,
      radius: px(18),
      line_width: px(2),
      color: defesoColor
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(32),
      y: card2Y + px(14),
      w: px(368),
      h: px(24),
      color: COLORS.TEXT_MUTED,
      text_size: px(18),
      text: 'DEFESO & PIRACEMA'
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(32),
      y: card2Y + px(42),
      w: px(368),
      h: px(32),
      color: defesoColor,
      text_size: px(24),
      text: `[ ${defeso.statusBadge}: ${defeso.statusText} ]`
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(32),
      y: card2Y + px(78),
      w: px(368),
      h: px(24),
      color: COLORS.TEXT_DIM,
      text_size: px(18),
      text: `${defeso.shortName} (Toque p/ detalhes)`
    });

    // 5. BOTÕES DE NAVEGAÇÃO
    const btnW = px(400);
    const btnH = px(62);
    const btnRadius = px(14);

    // Botão 1: Previsão 7 Dias
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(16),
      y: px(624),
      w: btnW,
      h: btnH,
      radius: btnRadius,
      normal_color: COLORS.BTN_ACTION_BG,
      press_color: COLORS.BTN_ACTION_PRESS,
      color: COLORS.TEXT_MAIN,
      text_size: px(23),
      text: '🌙  PREVISÃO 7 DIAS',
      click_func: () => {
        push({ url: 'page/forecast/index' });
      }
    });

    // Botão 2: Defeso & Piracema
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(16),
      y: px(698),
      w: btnW,
      h: btnH,
      radius: btnRadius,
      normal_color: COLORS.BTN_BG,
      press_color: COLORS.BTN_PRESS,
      color: COLORS.TEXT_MAIN,
      text_size: px(23),
      text: '🚫  DEFESO & REGRAS',
      click_func: () => {
        push({ url: 'page/defeso/index' });
      }
    });

    // Botão 3: Pontos & Iscas
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(16),
      y: px(772),
      w: btnW,
      h: btnH,
      radius: btnRadius,
      normal_color: COLORS.BTN_BG,
      press_color: COLORS.BTN_PRESS,
      color: COLORS.TEXT_MAIN,
      text_size: px(23),
      text: '📍  PONTOS & ISCAS',
      click_func: () => {
        push({ url: 'page/spots/index' });
      }
    });

    // Botão 4: Atualizar
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: px(16),
      y: px(846),
      w: btnW,
      h: px(54),
      radius: btnRadius,
      normal_color: 0x162438,
      press_color: 0x223654,
      color: COLORS.PRIMARY,
      text_size: px(20),
      text: '🔄  ATUALIZAR SENSORES',
      click_func: () => {
        hmUI.redraw();
      }
    });

    // Espaçador inferior para rolagem agradável
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(16),
      y: px(920),
      w: px(400),
      h: px(40),
      color: COLORS.TEXT_DIM,
      text_size: px(16),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: 'Pescador Max • Amazfit Bip Max'
    });
  }
});
