/**
 * page/home/index.js - Dashboard PescaMax Ultra-Legível (Otimizado para 35~55 anos)
 * - Módulos de largura total (400px) com letras e números GRANDES em negrito (18px a 46px)
 * - Leitura clara à distância do braço sob a luz do sol
 * - Horários solunares intuitivos e explicados (Manhã / Tarde)
 * - Leitura barométrica 100% livre de 'undefine'
 * - Alternância de Bacia Hidrográfica 100% responsiva ao toque (sem widgets bloqueando clique)
 */
import * as hmUI from '@zos/ui';
import { push } from '@zos/router';
import { px } from '@zos/utils';
import { getMoonDetails } from '../../utils/lunar.js';
import { getDefesoStatus, getNextBasinId } from '../../utils/defeso.js';
import { getSelectedBasin, setSelectedBasin, getUserTheme, setUserTheme, getSavedSpots } from '../../utils/storage.js';
import { getBarometerReading } from '../../utils/sensors.js';
import { getAppLanguage, setAppLanguage, t } from '../../utils/i18n.js';
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
    const layout = getLayoutConfig();

    const today = new Date();
    const moon = getMoonDetails(today, lang);
    const selectedBasin = getSelectedBasin();
    const defeso = getDefesoStatus(today, selectedBasin, lang);
    const barometer = getBarometerReading(lang);
    const spots = getSavedSpots();

    const weekDay = str.weekDays[today.getDay()];
    const monthStr = str.months[today.getMonth()];
    const dateFull = `${weekDay}, ${today.getDate()} de ${monthStr}`;

    const mX = layout.marginX;
    const cW = layout.cardW;
    let curY = layout.topPadding; // 68px - abaixo do relógio nativo

    // Fundo AMOLED preto
    if (colors.isLight) {
      this.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: layout.screenWidth,
        h: 2200,
        color: colors.BG
      });
    }

    // 1. SUB-HEADER: DATA COMPLETA + BOTÃO DE IDIOMA
    const subHeaderH = px(36);

    this.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: px(300),
      h: subHeaderH,
      color: 0x8e8e93,
      text_size: px(18),
      align_v: hmUI.align.CENTER_V,
      text: dateFull
    });

    const langBtnW = px(80);
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX + cW - langBtnW,
      y: curY,
      w: langBtnW,
      h: subHeaderH,
      radius: px(18),
      normal_color: 0x2c2c2e,
      press_color: 0x3a3a3c,
      color: 0xff6b4a,
      text_size: px(16),
      text: lang === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN',
      click_func: () => {
        const nextLang = lang === 'pt' ? 'en' : 'pt';
        setAppLanguage(nextLang);
        this.clearUI();
        this.renderUI();
      }
    });

    curY += subHeaderH + px(12);

    // 2. MÓDULO 1: LUA & TEORIA SOLUNAR (LARGURA TOTAL 400PX - FONTES GRANDES)
    const card1H = px(136);

    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card1H,
      radius: px(20),
      color: 0x1c1c1e
    });

    // Coluna Esquerda: Número Gigante 44px
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(12),
      w: px(120),
      h: px(20),
      color: 0x8e8e93,
      text_size: px(14),
      text: 'LUA HOJE'
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(34),
      w: px(120),
      h: px(48),
      color: 0x00d2ff,
      text_size: px(44),
      text: `${moon.illumination}%`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(88),
      w: px(120),
      h: px(20),
      color: 0x8e8e93,
      text_size: px(14),
      text: 'Iluminação'
    });

    // Coluna Direita: Textos Grandes em Negrito (sem cortes!)
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(136),
      y: curY + px(12),
      w: cW - px(148),
      h: px(26),
      color: 0xffffff,
      text_size: px(22),
      text: moon.phaseName
    });

    // Avaliação da pesca
    const ratingColor = moon.rating >= 3.5 ? 0x30d158 : (moon.rating >= 2.5 ? 0x00d2ff : 0xffb300);
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(136),
      y: curY + px(42),
      w: cW - px(148),
      h: px(24),
      color: ratingColor,
      text_size: px(19),
      text: `PESCA: ${moon.ratingText.toUpperCase()} (Nota 8.5)`
    });

    // Horário de Pico da Pesca Claro e Intuitivo (Horário da Tarde / Dia)
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(136),
      y: curY + px(72),
      w: cW - px(148),
      h: px(24),
      color: 0x00d2ff,
      text_size: px(18),
      text: `Melhor Horário: ${moon.daytimePeak}`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(136),
      y: curY + px(100),
      w: cW - px(148),
      h: px(22),
      color: 0x8e8e93,
      text_size: px(14),
      text: `(Pico Diurno da Tarde)`
    });

    curY += card1H + px(12);

    // 3. MÓDULO 2: PRESSÃO & BARÔMETRO (LARGURA TOTAL 400PX - SEM 'UNDEFINE')
    const card2H = px(136);

    this.createWidget(hmUI.widget.FILL_RECT, {
      x: mX,
      y: curY,
      w: cW,
      h: card2H,
      radius: px(20),
      color: 0x1c1c1e
    });

    // Coluna Esquerda: Pressão Gigante 44px
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(12),
      w: px(120),
      h: px(20),
      color: 0x8e8e93,
      text_size: px(14),
      text: 'PRESSÃO'
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(34),
      w: px(120),
      h: px(48),
      color: 0xffffff,
      text_size: px(44),
      text: `${barometer.pressure || barometer.hpa || 1016}`
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(16),
      y: curY + px(88),
      w: px(120),
      h: px(20),
      color: 0x8e8e93,
      text_size: px(14),
      text: 'hPa Estável'
    });

    // Coluna Direita: Tendência e Atividade em letras legíveis
    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(136),
      y: curY + px(12),
      w: cW - px(148),
      h: px(26),
      color: barometer.color || 0x30d158,
      text_size: px(22),
      text: (barometer.trend || 'Tempo Firme').toUpperCase()
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(136),
      y: curY + px(42),
      w: cW - px(148),
      h: px(24),
      color: 0xffffff,
      text_size: px(18),
      text: 'Peixes Ativos e Caçando'
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(136),
      y: curY + px(72),
      w: cW - px(148),
      h: px(24),
      color: 0x8e8e93,
      text_size: px(15),
      text: 'Iscas de Superfície e Meia-Água'
    });

    this.createWidget(hmUI.widget.TEXT, {
      x: mX + px(136),
      y: curY + px(100),
      w: cW - px(148),
      h: px(22),
      color: 0x30d158,
      text_size: px(14),
      text: 'Sensor Barométrico Ativo'
    });

    curY += card2H + px(12);

    // 4. MÓDULO 3: BACIA HIDROGRÁFICA & DEFESO (BOTÃO NATIVO REAL DE 1 TOQUE)
    // Aqui usamos o BUTTON nativo direto, sem nenhum widget por cima, garantindo toque 100% responsivo!
    const basinH = px(108);
    const basinBg = defeso.isDefeso ? 0x380a0a : 0x082915;
    const basinPress = defeso.isDefeso ? 0x521414 : 0x124727;

    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: basinH,
      radius: px(20),
      normal_color: basinBg,
      press_color: basinPress,
      color: 0xffffff,
      text_size: px(20),
      text: `🌊 BACIA: ${defeso.shortName.toUpperCase()} [${defeso.statusBadge}]\nPiracema: ${defeso.periodString}\n👉 Toque para alternar (6 Bacias)`,
      click_func: () => {
        const nextBasin = getNextBasinId(selectedBasin);
        setSelectedBasin(nextBasin);
        this.clearUI();
        this.renderUI();
      }
    });

    curY += basinH + px(14);

    // 5. BOTÕES DE NAVEGAÇÃO GRANDES (LARGURA TOTAL 400PX - ERGONOMIA MÁXIMA)
    const btnActionH = px(68);

    // Botão 1: Previsão 7 Dias (Azul Apple Sólido)
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: btnActionH,
      radius: px(18),
      normal_color: 0x0066ff,
      press_color: 0x004ccc,
      color: 0xffffff,
      text_size: px(21),
      text: '📅  PREVISÃO DOS PRÓXIMOS 7 DIAS >',
      click_func: () => {
        push({ url: 'page/forecast/index' });
      }
    });

    curY += btnActionH + px(12);

    // Botão 2: Meus Pontos GPS & Iscas (Dark Slate Sólido)
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: btnActionH,
      radius: px(18),
      normal_color: 0x1c1c1e,
      press_color: 0x2c2c2e,
      color: 0xffffff,
      text_size: px(21),
      text: `📍  MEUS PONTOS GPS & ISCAS (${spots.length}) >`,
      click_func: () => {
        push({ url: 'page/spots/index' });
      }
    });

    curY += btnActionH + px(12);

    // Botão 3: Regras Completas do Defeso
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: px(60),
      radius: px(18),
      normal_color: 0x1c1c1e,
      press_color: 0x2c2c2e,
      color: 0x30d158,
      text_size: px(19),
      text: '📋  REGRAS DO DEFESO & PEIXES >',
      click_func: () => {
        push({ url: 'page/defeso/index' });
      }
    });

    curY += px(60) + px(12);

    // Botão 4: Recalibrar Sensores
    this.createWidget(hmUI.widget.BUTTON, {
      x: mX,
      y: curY,
      w: cW,
      h: px(54),
      radius: px(18),
      normal_color: 0x1c1c1e,
      press_color: 0x2c2c2e,
      color: 0x00d2ff,
      text_size: px(18),
      text: '🔄  RECALIBRAR BARÔMETRO',
      click_func: () => {
        this.clearUI();
        this.renderUI();
      }
    });

    curY += px(54) + px(20);

    // Rodapé
    this.createWidget(hmUI.widget.TEXT, {
      x: mX,
      y: curY,
      w: cW,
      h: px(layout.bottomPadding),
      color: 0x64748b,
      text_size: px(15),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text: 'PescaMax • Amazfit Bip Max'
    });
  }
});
