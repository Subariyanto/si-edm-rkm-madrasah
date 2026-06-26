import { getItem, setItem } from './storageService';

const CODES_KEY = 'activation_codes';

export function getActivationCodes() {
  return getItem(CODES_KEY) || [];
}

export function saveActivationCode(codeData) {
  const codes = getActivationCodes();
  codes.push({
    ...codeData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: 'active',
  });
  setItem(CODES_KEY, codes);
  return codes;
}

export function updateActivationCode(id, updates) {
  const codes = getActivationCodes();
  const idx = codes.findIndex(c => c.id === id);
  if (idx !== -1) {
    codes[idx] = { ...codes[idx], ...updates };
    setItem(CODES_KEY, codes);
    return codes;
  }
  return null;
}

export function deleteActivationCode(id) {
  const codes = getActivationCodes();
  const filtered = codes.filter(c => c.id !== id);
  setItem(CODES_KEY, filtered);
  return filtered;
}

export function generateCode() {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 4; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `EDMRKM-JBR-${year}-${suffix}`;
}

export function getCodeStats() {
  const codes = getActivationCodes();
  return {
    total: codes.length,
    active: codes.filter(c => c.status === 'active').length,
    used: codes.filter(c => c.status === 'used').length,
    expired: codes.filter(c => c.status === 'expired').length,
  };
}

export default { getActivationCodes, saveActivationCode, updateActivationCode, deleteActivationCode, generateCode, getCodeStats };