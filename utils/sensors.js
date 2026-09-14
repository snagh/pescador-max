/**
 * sensors.js - Integração com Barômetro, GPS e Bússola do Zepp OS
 * Interpretador de pressão atmosférica e tendências de pesca (Bilingual pt-BR / en-US)
 */
import { t } from './i18n.js';

export function interpretBarometer(pressureHpa, lang = 'pt') {
  const strings = t(lang);
  const hpa = Math.round(pressureHpa && pressureHpa > 0 ? pressureHpa : 1013);

  const base = {
    hpa,
    pressure: hpa,
    unit: 'hPa'
  };

  if (hpa >= 1016) {
    return {
      ...base,
      status: `${strings.baroHigh} (${hpa} hPa)`,
      trend: strings.trendHigh,
      fishActivity: strings.descHigh,
      recommendation: strings.tipHigh,
      color: 0x00e676 // Verde Esmeralda Neon
    };
  } else if (hpa >= 1010) {
    return {
      ...base,
      status: `${strings.baroStable} (${hpa} hPa)`,
      trend: strings.trendStable,
      fishActivity: strings.descStable,
      recommendation: strings.tipStable,
      color: 0x00d2ff // Ciano Neon
    };
  } else if (hpa >= 1005) {
    return {
      ...base,
      status: `${strings.baroLow} (${hpa} hPa)`,
      trend: strings.trendLow,
      fishActivity: strings.descLow,
      recommendation: strings.tipLow,
      color: 0xffb300 // Âmbar Atenção
    };
  } else {
    return {
      ...base,
      status: `${strings.baroVeryLow} (${hpa} hPa)`,
      trend: strings.trendVeryLow,
      fishActivity: strings.descVeryLow,
      recommendation: strings.tipVeryLow,
      color: 0xff3b30 // Vermelho
    };
  }
}

export function getBarometerReading(lang = 'pt') {
  try {
    const { Barometer } = require('@zos/sensor');
    if (Barometer) {
      const bar = new Barometer();
      const rawHpa = bar.getAirPressure();
      const altitude = bar.getAltitude();
      if (rawHpa && rawHpa > 300 && rawHpa < 1200) {
        const hpa = Math.round(rawHpa);
        return {
          available: true,
          hpa,
          pressure: hpa,
          altitude: Math.round(altitude || 0),
          ...interpretBarometer(hpa, lang)
        };
      }
    }
  } catch (e) {}

  return {
    available: false,
    hpa: 1013,
    pressure: 1013,
    altitude: 0,
    ...interpretBarometer(1013, lang)
  };
}

export function getCurrentCoordinates(lang = 'pt') {
  const isEn = lang === 'en';
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
    lat: '0.0000',
    lon: '0.0000',
    string: isEn ? 'GPS searching...' : 'GPS buscando sinal...'
  };
}
