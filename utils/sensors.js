/**
 * sensors.js - Integração com Barômetro, GPS e Bússola do Zepp OS
 * Interpretador de pressão atmosférica e tendências de pesca
 */

/**
 * Interpreta o valor barométrico (em hPa) para a pesca
 */
export function interpretBarometer(pressureHpa) {
  if (!pressureHpa || pressureHpa <= 0) {
    return {
      hpa: 1013,
      status: 'Normal (1013 hPa)',
      trend: 'Estável',
      fishActivity: 'Atividade normal dos peixes',
      recommendation: 'Pesca em meia-água e fundo.',
      color: 0x38bdf8
    };
  }

  const hpa = Math.round(pressureHpa);

  if (hpa >= 1016) {
    return {
      hpa,
      status: `Alta (${hpa} hPa)`,
      trend: 'Tempo Firme',
      fishActivity: 'Excelente! Peixes ativos e caçando.',
      recommendation: 'Use iscas de superfície e meia-água.',
      color: 0x10b981
    };
  } else if (hpa >= 1010) {
    return {
      hpa,
      status: `Estável (${hpa} hPa)`,
      trend: 'Pressão Normal',
      fishActivity: 'Boa atividade alimentar dos peixes.',
      recommendation: 'Iscas de meia-água e fundo.',
      color: 0x38bdf8
    };
  } else if (hpa >= 1005) {
    return {
      hpa,
      status: `Baixa (${hpa} hPa)`,
      trend: 'Queda de Pressão',
      fishActivity: 'Atenção: Frente fria ou chuva.',
      recommendation: 'Peixes atacam antes da chuva; diminua a isca.',
      color: 0xf59e0b
    };
  } else {
    return {
      hpa,
      status: `Muito Baixa (${hpa} hPa)`,
      trend: 'Frente Fria / Tempestade',
      fishActivity: 'Peixes inativos no fundo das represas/rios.',
      recommendation: 'Pesca de espera com isca viva ou massa no fundo.',
      color: 0xef4444
    };
  }
}

/**
 * Lê o sensor de Barômetro com segurança
 */
export function getBarometerReading() {
  try {
    const { Barometer } = require('@zos/sensor');
    if (Barometer) {
      const bar = new Barometer();
      const hpa = bar.getAirPressure();
      const altitude = bar.getAltitude();
      if (hpa && hpa > 300 && hpa < 1200) {
        return {
          available: true,
          hpa: Math.round(hpa),
          altitude: Math.round(altitude || 0),
          ...interpretBarometer(hpa)
        };
      }
    }
  } catch (e) {}

  return {
    available: false,
    hpa: 1013,
    altitude: 0,
    ...interpretBarometer(1013)
  };
}

/**
 * Obtém coordenadas GPS atuais para waypoints
 */
export function getCurrentCoordinates() {
  try {
    const { Geolocation } = require('@zos/sensor');
    if (Geolocation) {
      const geo = new Geolocation();
      geo.start();
      const status = geo.getStatus();
      if (status === 'A') {
        const lat = geo.getLatitude({ format: 'DD' });
        const lon = geo.getLongitude({ format: 'DD' });
        geo.stop();
        if (typeof lat === 'number' && typeof lon === 'number') {
          return {
            available: true,
            lat: lat.toFixed(4),
            lon: lon.toFixed(4),
            string: `Lat ${lat.toFixed(4)}° / Lon ${lon.toFixed(4)}°`
          };
        }
      }
      geo.stop();
    }
  } catch (e) {}

  return {
    available: false,
    string: 'Marcado no Relógio'
  };
}
