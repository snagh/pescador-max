/**
 * defeso.js - Calendário e Regras de Defeso (Piracema) no Brasil
 * Fornece status em tempo real por bacia hidrográfica (Bilingual pt-BR / en-US)
 */

export const BASINS = [
  {
    id: 'parana',
    name: 'Bacia do Rio Paraná / Sudeste / Sul',
    nameEn: 'Paraná / Southeast Basin (Brazil)',
    shortName: 'Paraná / Sudeste',
    shortNameEn: 'Paraná / Southeast',
    rivers: 'Rios Paraná, Tietê, Paranapanema, Grande, Pardo, Iguaçu',
    riversEn: 'Paraná, Tietê, Paranapanema, Grande, Pardo and Iguaçu rivers',
    startMonth: 11,
    startDay: 1,
    endMonth: 2,
    endDay: 28,
    protectedSpecies: 'Dourado, Pintado, Jaú, Curimbatá, Piapara, Pacu, Piracanjuba',
    protectedSpeciesEn: 'Golden Dorado, Spotted Sorubim, Jau, Curimbata, Piapara, Pacu',
    exemptions: 'Pesque-e-solte permitido em reservatórios com espécies exóticas/alóctones (Tucunaré, Tilápia, Corvina, Black Bass) com anzol sem fisga.',
    exemptionsEn: 'Catch-and-release allowed in man-made reservoirs for non-native species (Peacock Bass, Tilapia, Bass) with barbless hooks.',
    prohibitions: 'Uso de redes, tarrafas, espinhéis, cevas e pesca a menos de 1500m de barragens e corredeiras.',
    prohibitionsEn: 'Nets, cast nets, trotlines and fishing within 1500m of dams and rapids are strictly prohibited.'
  },
  {
    id: 'pantanal',
    name: 'Bacia do Rio Paraguai (Pantanal)',
    nameEn: 'Paraguay River / Pantanal Basin',
    shortName: 'Paraguai / Pantanal',
    shortNameEn: 'Paraguay / Pantanal',
    rivers: 'Rios Paraguai, Cuiabá, Taquari, Miranda, Aquidauana',
    riversEn: 'Paraguay, Cuiabá, Taquari, Miranda and Aquidauana rivers',
    startMonth: 11,
    startDay: 1,
    endMonth: 1,
    endDay: 31,
    protectedSpecies: 'Pintado, Cachara, Pacu, Dourado, Piraputanga, Jaú',
    protectedSpeciesEn: 'Spotted Sorubim, Barred Sorubim, Pacu, Golden Dorado, Piraputanga',
    exemptions: 'A partir de 1º de fevereiro geralmente é permitida a modalidade Pesque-e-Solte em determinados trechos navegáveis (Portaria Estadual).',
    exemptionsEn: 'From Feb 1st, sport catch-and-release is permitted in designated navigable river stretches.',
    prohibitions: 'Fechamento total nos rios pantaneiros. Proibido transporte de peixes nativos.',
    prohibitionsEn: 'Total closure on Pantanal rivers. Native fish harvesting and transport banned.'
  },
  {
    id: 'sao_francisco',
    name: 'Bacia do Rio São Francisco',
    nameEn: 'São Francisco River Basin',
    shortName: 'São Francisco',
    shortNameEn: 'São Francisco',
    rivers: 'Rio São Francisco e afluentes (Velhas, Paracatu, Abaeté)',
    riversEn: 'São Francisco River and main tributaries (Velhas, Paracatu, Abaeté)',
    startMonth: 11,
    startDay: 1,
    endMonth: 2,
    endDay: 28,
    protectedSpecies: 'Surubim, Dourado, Matrinxã, Mandi, Curimatá, Pacu',
    protectedSpeciesEn: 'Surubim Catfish, Dorado, Matrinxa, Mandi, Curimata, Pacu',
    exemptions: 'Pesca de subsistência desembarcada e reservatórios autorizados.',
    exemptionsEn: 'Shoreline subsistence fishing and authorized impoundments.',
    prohibitions: 'Pesca embarcada e apetrechos predatórios totalmente vedados.',
    prohibitionsEn: 'Boat fishing and commercial gear completely prohibited.'
  },
  {
    id: 'amazonica',
    name: 'Bacia Amazônica / Norte',
    nameEn: 'Amazon / Northern Basin',
    shortName: 'Amazônica / Norte',
    shortNameEn: 'Amazon / North',
    rivers: 'Rios Amazonas, Negro, Solimões, Madeira, Tapajós, Xingu',
    riversEn: 'Amazon, Negro, Solimões, Madeira, Tapajós and Xingu rivers',
    startMonth: 11,
    startDay: 15,
    endMonth: 3,
    endDay: 15,
    protectedSpecies: 'Tambaqui, Pirarucu, Surubim, Caparari, Jaraqui, Matrinxã, Aruanã',
    protectedSpeciesEn: 'Tambaqui, Arapaima (Pirarucu), Surubim, Caparari, Jaraqui, Arowana',
    exemptions: 'Pesca de subsistência e comunidades de manejo sustentável autorizadas pelo IBAMA/ICMBio.',
    exemptionsEn: 'Subsistence fishing and approved sustainable reserve quotas.',
    prohibitions: 'Comercialização sem declaração de estoque e captura em lagoas marginais.',
    prohibitionsEn: 'Commercial trade without stock declaration and floodplain harvesting.'
  },
  {
    id: 'tocantins',
    name: 'Bacia do Araguaia-Tocantins',
    nameEn: 'Araguaia-Tocantins Basin',
    shortName: 'Araguaia-Tocantins',
    shortNameEn: 'Araguaia-Tocantins',
    rivers: 'Rios Araguaia, Tocantins, Vermelho, Crixás, Mortes',
    riversEn: 'Araguaia, Tocantins, Vermelho, Crixás and Mortes rivers',
    startMonth: 11,
    startDay: 1,
    endMonth: 2,
    endDay: 28,
    protectedSpecies: 'Piraíba, Pirarara, Filhote, Tucunaré, Aruanã, Fidalgo, Jaú',
    protectedSpeciesEn: 'Gilded Catfish (Piraíba), Redtail Catfish (Pirarara), Peacock Bass',
    exemptions: 'Cota Zero para transporte; Pesque-e-solte permitido com anzol sem fisga.',
    exemptionsEn: 'Zero transport quota; sport catch-and-release allowed with barbless hooks.',
    prohibitions: 'Abate de matrizes e qualquer modalidade predatória.',
    prohibitionsEn: 'Harvesting breeding stock and predatory gear strictly banned.'
  },
  {
    id: 'maritimo',
    name: 'Litoral & Marinho (Espécies Protegidas)',
    nameEn: 'Coastal & Marine Protected Species',
    shortName: 'Mar & Estuários',
    shortNameEn: 'Marine & Estuary',
    rivers: 'Manguezais, baías costeiras e mar aberto',
    riversEn: 'Mangroves, coastal bays and open ocean waters',
    startMonth: 5,
    startDay: 15,
    endMonth: 7,
    endDay: 31,
    protectedSpecies: 'Robalo-Flecha e Peva, Camarão-Rosa/Sete-Barbas, Caranguejo-Uçá',
    protectedSpeciesEn: 'Common Snook, Fat Snook, Pink Shrimp, Mangrove Ghost Crab',
    exemptions: 'Pesca esportiva com devolução imediata do peixe vivo.',
    exemptionsEn: 'Sport catch-and-release with immediate live fish release.',
    prohibitions: 'Redes de arrasto costeiras e captura de fêmeas ovadas.',
    prohibitionsEn: 'Coastal bottom trawling and catching egg-bearing females.'
  }
];

export function getNextBasinId(currentId) {
  const idx = BASINS.findIndex(b => b.id === currentId);
  const nextIdx = (idx + 1) % BASINS.length;
  return BASINS[nextIdx].id;
}

export function isDateInDefeso(date, basin) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const { startMonth, startDay, endMonth, endDay } = basin;

  if (startMonth > endMonth) {
    if (month > startMonth || (month === startMonth && day >= startDay)) return true;
    if (month < endMonth || (month === endMonth && day <= endDay)) return true;
    return false;
  } else {
    if (month > startMonth && month < endMonth) return true;
    if (month === startMonth && day >= startDay) return true;
    if (month === endMonth && day <= endDay) return true;
    return false;
  }
}

export function getDefesoStatus(date = new Date(), basinId = 'parana', lang = 'pt') {
  const isEn = lang === 'en';
  const basin = BASINS.find(b => b.id === basinId) || BASINS[0];
  const active = isDateInDefeso(date, basin);

  const startStr = `${basin.startDay < 10 ? '0' : ''}${basin.startDay}/${basin.startMonth < 10 ? '0' : ''}${basin.startMonth}`;
  const endStr = `${basin.endDay < 10 ? '0' : ''}${basin.endDay}/${basin.endMonth < 10 ? '0' : ''}${basin.endMonth}`;
  const formatPeriod = isEn ? `${startStr} to ${endStr}` : `${startStr} até ${endStr}`;

  return {
    basinId: basin.id,
    basinName: isEn ? basin.nameEn : basin.name,
    shortName: isEn ? basin.shortNameEn : basin.shortName,
    rivers: isEn ? basin.riversEn : basin.rivers,
    isDefeso: active,
    statusText: active ? (isEn ? 'CLOSED SEASON ACTIVE' : 'PERÍODO DE DEFESO ATIVO') : (isEn ? 'FISHING SEASON OPEN' : 'PESCA LIBERADA'),
    statusBadge: active ? (isEn ? 'CLOSED' : 'DEFESO') : (isEn ? 'OPEN' : 'LIBERADO'),
    periodString: formatPeriod,
    protectedSpecies: isEn ? basin.protectedSpeciesEn : basin.protectedSpecies,
    exemptions: isEn ? basin.exemptionsEn : basin.exemptions,
    prohibitions: isEn ? basin.prohibitionsEn : basin.prohibitions
  };
}
