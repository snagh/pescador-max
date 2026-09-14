/**
 * storage.js - Persistência Segura para Zepp OS
 * Gerencia preferências de bacia, lista de pontos e tema (Dark / Light)
 */
import { DEFAULT_SPOTS } from './spots.js';

let zosLocalStorage = null;
try {
  const mod = require('@zos/storage');
  if (mod && mod.localStorage) {
    zosLocalStorage = mod.localStorage;
  }
} catch (e) {}

const memoryStore = {};

export function getItem(key, defaultValue = null) {
  try {
    if (zosLocalStorage) {
      const val = zosLocalStorage.getItem(key, defaultValue);
      return val !== null && val !== undefined ? val : defaultValue;
    }
  } catch (e) {}
  return memoryStore[key] !== undefined ? memoryStore[key] : defaultValue;
}

export function setItem(key, value) {
  try {
    if (zosLocalStorage) {
      zosLocalStorage.setItem(key, value);
      return;
    }
  } catch (e) {}
  memoryStore[key] = value;
}

export function getUserTheme() {
  return getItem('user_theme', 'dark');
}

export function setUserTheme(theme) {
  setItem('user_theme', theme === 'light' ? 'light' : 'dark');
}

export function getSavedSpots() {
  try {
    const raw = getItem('saved_spots', null);
    if (raw) {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {}
  return DEFAULT_SPOTS;
}

export function saveSpots(spots) {
  setItem('saved_spots', JSON.stringify(spots));
}

export function addSpot(spot) {
  const spots = getSavedSpots();
  const newSpot = {
    id: Date.now(),
    ...spot
  };
  const updated = [newSpot, ...spots];
  saveSpots(updated);
  return updated;
}

export function deleteSpot(id) {
  const spots = getSavedSpots();
  const updated = spots.filter(s => s.id !== id);
  saveSpots(updated);
  return updated;
}

export function getSelectedBasin() {
  return getItem('selected_basin', 'parana');
}

export function setSelectedBasin(basinId) {
  setItem('selected_basin', basinId);
}
