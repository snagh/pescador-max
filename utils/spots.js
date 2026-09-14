/**
 * spots.js - Gerenciador de Locais de Pesca, Dicas de Iscas e Waypoints (Bilingual)
 */

export function getSpotTypes(lang = 'pt') {
  if (lang === 'en') {
    return [
      {
        id: 'represa',
        title: 'Lakes & Reservoirs',
        species: 'Bass, Peacock Bass, Tilapia, Pike',
        baits: 'Topwater (Zara, Popper), Jerkbaits, Soft Plastics, Corn.',
        tips: 'Target submerged wood, island points, weed edges and drop-offs.'
      },
      {
        id: 'rio',
        title: 'Rivers & Streams',
        species: 'Catfish, Golden Dorado, Trout, Carp',
        baits: 'Live baitfish, Nightcrawlers, Spinners, Weighted bottom bait.',
        tips: 'Focus on deep pools below rapids, eddies and tributary mouths.'
      },
      {
        id: 'pesqueiro',
        title: 'Ponds & Pay Lakes',
        species: 'Pacu, Carp, Catfish, Tambaqui',
        baits: 'Flavored pellets, Hot dog, Dough bait, Surface bread, Cheese.',
        tips: 'Use lighter fluorocarbon leaders on cold days and chum moderately.'
      },
      {
        id: 'mar',
        title: 'Sea, Beach & Coast',
        species: 'Snook, Grouper, Sea Bass, Redfish',
        baits: 'Live shrimp, Cut sardines, Squid, Jumping jigs, Paddletails.',
        tips: 'Check tide tables: 2 hours before and after high tide are best.'
      }
    ];
  }

  return [
    {
      id: 'represa',
      title: 'Represas & Lagos',
      species: 'Tucunaré, Tilápia, Traíra, Black Bass',
      baits: 'Superfície (Zara, Popper), Meia-água, Camarão Soft, Milho, Massinha.',
      tips: 'Procure troncos submersos, pontas de ilhas e margens com capim.'
    },
    {
      id: 'rio',
      title: 'Rios & Córregos',
      species: 'Dourado, Pintado, Piapara, Mandi, Curimbatá',
      baits: 'Tuvira viva, Minhocuçu, Colher giratória, Isca viva de fundo.',
      tips: 'Foque nos poços após corredeiras, remansos e bocas de afluentes.'
    },
    {
      id: 'pesqueiro',
      title: 'Pesqueiros & Tanques',
      species: 'Tambaqui, Pacu, Pirarara, Carpa Cabeçuda',
      baits: 'Ração na pinga, Salsicha, Massa doce/peixe, Bóia cevadeira, Pão.',
      tips: 'Use chicote longo em dias frios e ceve com moderação no meio do tanque.'
    },
    {
      id: 'mar',
      title: 'Mar, Praia & Costão',
      species: 'Robalo, Garoupa, Corvina, Pescada, Xaréu',
      baits: 'Camarão vivo, Corrupto, Sardinha fresca, Jumping Jig, Shads.',
      tips: 'Acompanhe a tábua de marés: 2h antes e 2h após a maré cheia são os melhores horários.'
    }
  ];
}

export const DEFAULT_SPOTS = [
  {
    id: 1,
    name: 'Ponto do Tronco Caído',
    type: 'Represas & Lagos',
    time: '06:30',
    coords: 'S 22°45\' / W 47°12\'',
    notes: 'Excelente para Tucunaré na superfície'
  },
  {
    id: 2,
    name: 'Poço da Corredeira',
    type: 'Rios & Córregos',
    time: '17:45',
    coords: 'S 21°18\' / W 48°05\'',
    notes: 'Pintados e Piaparas no fundo'
  },
  {
    id: 3,
    name: 'Lago dos Tambas',
    type: 'Pesqueiros',
    time: '14:00',
    coords: 'Pesqueiro Central',
    notes: 'Bóia cevadeira a 30m da margem'
  }
];
