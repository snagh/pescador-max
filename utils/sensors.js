/**
 * sensors.js - Integração com Barômetro, GPS e Bússola do Zepp OS
 * Interpretador de pressão atmosférica e tendências de pesca (Bilingual pt-BR / en-US)
 */
import { t } from './i18n.js';

export function interpretBarometer(pressureHpa, lang = 'pt') {
  const strings = t(lang);
  const hpa = Math.round(pressureHpa && pressureHpa > 0 ? pressureHpa : 1013);

  if (hpa >= 1016) {
    return {
      hpa,
      status: `${strings.baroHigh} (${hpa} hPa)`,
      trend: strings.trendHigh,
      fishActivity: strings.descHigh,
      recommendation: strings.tipHigh,
      color: 0x10b981
    };
  } else if (hpa >= 1010) {
    return {
      hpa,
      status: `${strings.baroStable} (${hpa} hPa)`,
      trend: strings.trendStable,
      fishActivity: strings.descStable,
      recommendation: strings.tipStable,
      color: 0x38bdf8
    };
  } else if (hpa >= 1005) {
    return {
      hpa,
      status: `${strings.baroLow} (${hpa} hPa)`,
      trend: strings.trendLow,
      fishActivity: strings.descLow,
      recommendation: strings.tipLow,
      color: 0xf59e0b
    };
  } else {
    return {
      hpa,
      status: `${strings.baroVeryLow} (${hpa} hPa)`,
      trend: strings.trendVeryLow,
      fishActivity: strings.descVeryLow,
      recommendation: strings.tipVeryLow,
      color: 0xef4444
    };
  }
}

export function getBarometerReading(lang = 'pt') {
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
          ...interpretBarometer(hpa, lang)
        };
      }
    }
  } catch (e) {}

  return {
    available: false,
    hpa: 1013,
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
    string: isEn ? 'Watch Tagged Location' : 'Marcado no Relógio'
  };
}
