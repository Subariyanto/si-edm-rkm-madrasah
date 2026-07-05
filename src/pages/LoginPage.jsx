import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, loginMadrasah } from '../services/authService';
import { getItem } from '../services/storageService';

export default function LoginPage() {
  const [mode, setMode] = useState('choose'); // choose | admin | madrasah
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getItem('auth');
    if (auth) {
      if (auth.role === 'admin') navigate('/admin', { replace: true });
      else navigate('/madrasah', { replace: true });
    }
  }, [navigate]);

  const handleAdminLogin = (e) => {
    e.preventDefault(); setError('');
    if (!username.trim() || !password.trim()) { setError('Username dan password wajib diisi'); return; }
    setLoading(true);
    const result = login(username, password);
    if (result.success) navigate('/admin', { replace: true });
    else setError(result.error);
    setLoading(false);
  };

  const handleMadrasahLogin = (e) => {
    e.preventDefault(); setError('');
    if (!code.trim()) { setError('Kode aktivasi wajib diisi'); return; }
    setLoading(true);
    const result = loginMadrasah(code.trim().toUpperCase());
    if (result.success) navigate('/madrasah', { replace: true });
    else setError(result.error);
    setLoading(false);
  };

  if (mode === 'choose') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🕌</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Si-EDM RKM</h1>
            <h2 className="text-xl text-white/80">Madrasah</h2>
            <p className="text-white/60 mt-2 text-sm">Evaluasi Diri & Rencana Kerja Madrasah</p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => setMode('admin')}
              className="w-full py-3 px-6 bg-white text-green-800 font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg"
            >
              Masuk sebagai Admin
            </button>
            <button
              onClick={() => setMode('madrasah')}
              className="w-full py-3 px-6 bg-green-900/50 text-white font-semibold rounded-lg hover:bg-green-900/70 transition border border-white/20"
            >
              Masuk sebagai Madrasah
            </button>
          </div>
          <p className="text-center text-white/50 text-xs mt-8">Kementerian Agama RI | EDM Versi 2.0</p>
        </div>
      </div>
    );
  }

  if (mode === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="text-center mb-6">
              <span className="text-3xl">👤</span>
              <h2 className="text-2xl font-bold text-gray-800 mt-2">Login Admin</h2>
              <p className="text-gray-500 text-sm">Masuk dengan username dan password</p>
            </div>
            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>}
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="admin" autoFocus />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Masukkan password" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-2.5 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition disabled:opacity-50">
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>
            <button onClick={() => setMode('choose')} className="w-full mt-3 py-2 text-gray-500 hover:text-gray-700 text-sm">← Kembali</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <span className="text-3xl">🏫</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">Aktivasi Madrasah</h2>
            <p className="text-gray-500 text-sm">Masukkan kode aktivasi dari Admin</p>
          </div>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>}
          <form onSubmit={handleMadrasahLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kode Aktivasi</label>
              <input type="text" value={code} onChange={e => setCode(e.target.value.toUpperCase())} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-center tracking-widest" placeholder="EDMRKM-JBR-2026-XXXX" autoFocus maxLength={22} />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition disabled:opacity-50">
              {loading ? 'Memvalidasi...' : 'Aktivasi'}
            </button>
          </form>
          <button onClick={() => setMode('choose')} className="w-full mt-3 py-2 text-gray-500 hover:text-gray-700 text-sm">← Kembali</button>
        </div>
      </div>
    </div>
  );
}