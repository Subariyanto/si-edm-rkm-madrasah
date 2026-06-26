const STORAGE_PREFIX = 'edmrkm_';

export function getItem(key) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Storage set error:', e);
    return false;
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
    return true;
  } catch {
    return false;
  }
}

export function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(STORAGE_PREFIX)) {
      keys.push(k.replace(STORAGE_PREFIX, ''));
    }
  }
  return keys;
}

export function getStorageUsage() {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(STORAGE_PREFIX)) {
      total += (localStorage.getItem(k) || '').length;
    }
  }
  const maxSize = 5 * 1024 * 1024; // ~5MB typical localStorage limit
  return {
    used: total,
    total: maxSize,
    percent: Math.round((total / maxSize) * 100),
    formattedUsed: formatBytes(total),
    formattedTotal: formatBytes(maxSize),
  };
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

export function exportAllData() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(STORAGE_PREFIX)) {
      try {
        data[k] = JSON.parse(localStorage.getItem(k));
      } catch {
        data[k] = localStorage.getItem(k);
      }
    }
  }
  return data;
}

export function importAllData(data) {
  for (const [key, value] of Object.entries(data)) {
    if (key.startsWith(STORAGE_PREFIX)) {
      if (typeof value === 'string') {
        try {
          const parsed = JSON.parse(value);
          localStorage.setItem(key, JSON.stringify(parsed));
        } catch {
          localStorage.setItem(key, value);
        }
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
  }
  return true;
}

export default { getItem, setItem, removeItem, getAllKeys, getStorageUsage, exportAllData, importAllData };