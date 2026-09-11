/**
 * defeso.js - Calendário e Regras de Defeso (Piracema) no Brasil
 * Fornece status em tempo real por bacia hidrográfica e recomendações
 */

export const BASINS = [
  {
    id: 'parana',
    name: 'Bacia do Rio Paraná / Sudeste / Sul',
    shortName: 'Paraná / Sudeste',
    rivers: 'Rios Paraná, Tietê, Paranapanema, Grande, Pardo, Iguaçu',
    startMonth: 11, // Novembro (1-indexed)
    startDay: 1,
    endMonth: 2,    // Fevereiro
    endDay: 28,
    protectedSpecies: 'Dourado, Pintado, Jaú, Curimbatá, Piapara, Pacu, Piracanjuba',
    exemptions: 'Pesque-e-solte permitido em reservatórios com espécies exóticas/alóctones (Tucunaré, Tilápia, Corvina, Black Bass) com anzol sem fisga.',
    prohibitions: 'Uso de redes, tarrafas, espinhéis, cevas e pesca a menos de 1500m de barragens e corredeiras.'
  },
  {
    id: 'pantanal',
    name: 'Bacia do Rio Paraguai (Pantanal)',
    shortName: 'Paraguai / Pantanal',
    rivers: 'Rios Paraguai, Cuiabá, Taquari, Miranda, Aquidauana',
    startMonth: 11, // 01 de Novembro
    startDay: 1,
    endMonth: 1,    // 31 de Janeiro (com pesque-e-solte regulamentado em fev)
    endDay: 31,
    protectedSpecies: 'Pintado, Cachara, Pacu, Dourado (proibido captura e abate em MS), Piraputanga, Jaú',
    exemptions: 'A partir de 1º de fevereiro geralmente é permitida a modalidade Pesque-e-Solte em determinados trechos navegáveis (Portaria Estadual).',
    prohibitions: 'Fechamento total nos rios pantaneiros. Proibido transporte de peixes nativos.'
  },
  {
    id: 'sao_francisco',
    name: 'Bacia do Rio São Francisco',
    shortName: 'São Francisco',
    rivers: 'Rio São Francisco e afluentes (Velhas, Paracatu, Abaeté)',
    startMonth: 11,
    startDay: 1,
    endMonth: 2,
    endDay: 28,
    protectedSpecies: 'Surubim, Dourado, Matrinxã, Mandi, Curimatá, Pacu',
    exemptions: 'Pesca de subsistência desembarcada e reservatórios autorizados.',
    prohibitions: 'Pesca embarcada e apetrechos predatórios totalmente vedados.'
  },
  {
    id: 'amazonica',
    name: 'Bacia Amazônica / Norte',
    shortName: 'Amazônica / Norte',
    rivers: 'Rios Amazonas, Negro, Solimões, Madeira, Tapajós, Xingu',
    startMonth: 11,
    startDay: 15,
    endMonth: 3,
    endDay: 15,
    protectedSpecies: 'Tambaqui, Pirarucu, Surubim, Caparari, Jaraqui, Matrinxã, Aruanã',
    exemptions: 'Pesca de subsistência e comunidades de manejo sustentável autorizadas pelo IBAMA/ICMBio.',
    prohibitions: 'Comercialização sem declaração de estoque e captura em lagoas marginais.'
  },
  {
    id: 'maritimo',
    name: 'Litoral & Marinho (Espécies Protegidas)',
    shortName: 'Mar & Estuários',
    rivers: 'Manguezais, baías costeiras e mar aberto',
    startMonth: 5,  // Robalo: 15/Mai a 31/Jul (Sudeste/Sul)
    startDay: 15,
    endMonth: 7,
    endDay: 31,
    protectedSpecies: 'Robalo-Flecha e Peva (maio a jul), Camarão-Rosa/Sete-Barbas (jan a abr), Caranguejo-Uçá (período de andada)',
    exemptions: 'Pesca esportiva com devolução imediata do peixe vivo.',
    prohibitions: 'Redes de arrasto costeiras e captura de fêmeas ovadas.'
  }
];

/**
 * Verifica se uma data específica está dentro do período de defeso da bacia
 */
export function isDateInDefeso(date, basin) {
  const month = date.getMonth() + 1; // 1 - 12
  const day = date.getDate();

  const { startMonth, startDay, endMonth, endDay } = basin;

  if (startMonth > endMonth) {
    // Período cruza a virada de ano (ex: Nov a Fev)
    if (month > startMonth || (month === startMonth && day >= startDay)) {
      return true;
    }
    if (month < endMonth || (month === endMonth && day <= endDay)) {
      return true;
    }
    return false;
  } else {
    // Período no mesmo ano (ex: Maio a Julho)
    if (month > startMonth && month < endMonth) return true;
    if (month === startMonth && day >= startDay) return true;
    if (month === endMonth && day <= endDay) return true;
    return false;
  }
}

/**
 * Obtém o status do defeso para a bacia selecionada
 */
export function getDefesoStatus(date = new Date(), basinId = 'parana') {
  const basin = BASINS.find(b => b.id === basinId) || BASINS[0];
  const active = isDateInDefeso(date, basin);

  const formatPeriod = `${basin.startDay < 10 ? '0' : ''}${basin.startDay}/${basin.startMonth < 10 ? '0' : ''}${basin.startMonth} até ${basin.endDay < 10 ? '0' : ''}${basin.endDay}/${basin.endMonth < 10 ? '0' : ''}${basin.endMonth}`;

  return {
    basinId: basin.id,
    basinName: basin.name,
    shortName: basin.shortName,
    rivers: basin.rivers,
    isDefeso: active,
    statusText: active ? 'PERÍODO DE DEFESO ATIVO' : 'PESCA LIBERADA',
    statusBadge: active ? 'DEFESO' : 'LIBERADO',
    periodString: formatPeriod,
    protectedSpecies: basin.protectedSpecies,
    exemptions: basin.exemptions,
    prohibitions: basin.prohibitions
  };
}
