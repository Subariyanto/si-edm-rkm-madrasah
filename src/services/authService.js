import { getItem, setItem, removeItem } from './storageService';

const AUTH_KEY = 'auth';
const ROLE_KEY = 'role';
const ACTIVE_MADRASAH_KEY = 'active_madrasah';

// Admin credentials
const ADMIN_USER = { username: 'admin', password: 'admin123' };

export function login(username, password) {
  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    setItem(AUTH_KEY, { username, role: 'admin' });
    setItem(ROLE_KEY, 'admin');
    return { success: true, role: 'admin' };
  }
  return { success: false, error: 'Username atau password salah' };
}

export function loginMadrasah(activationCode) {
  const codes = getItem('activation_codes') || [];
  const found = codes.find(c => c.code === activationCode);
  if (!found) {
    return { success: false, error: 'Kode aktivasi tidak ditemukan' };
  }
  if (found.status === 'used') {
    return { success: false, error: 'Kode aktivasi sudah digunakan' };
  }
  if (found.status === 'expired') {
    return { success: false, error: 'Kode aktivasi sudah kadaluarsa' };
  }
  // Activate
  found.status = 'used';
  found.activatedAt = new Date().toISOString();
  setItem('activation_codes', codes);
  setItem(AUTH_KEY, { code: activationCode, role: 'madrasah', ...found });
  setItem(ROLE_KEY, 'madrasah');
  setItem(ACTIVE_MADRASAH_KEY, found);
  return { success: true, role: 'madrasah', data: found };
}

export function logout() {
  removeItem(AUTH_KEY);
  removeItem(ROLE_KEY);
  removeItem(ACTIVE_MADRASAH_KEY);
}

export function getCurrentUser() {
  return getItem(AUTH_KEY);
}

export function getCurrentRole() {
  return getItem(ROLE_KEY);
}

export function getActiveMadrasah() {
  return getItem(ACTIVE_MADRASAH_KEY);
}

export function isAuthenticated() {
  return !!getItem(AUTH_KEY);
}

export default { login, loginMadrasah, logout, getCurrentUser, getCurrentRole, getActiveMadrasah, isAuthenticated };