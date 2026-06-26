import { useState, useEffect } from 'react';
import { getItem, setItem } from '../services/storageService';
import { Eye, Save, Plus, Trash2 } from 'lucide-react';

const STORAGE_KEY = 'visi_misi';

export default function VisiMisi() {
  const [form, setForm] = useState({
    visi: '',
    misi: [''],
    tujuan: ['']
  });
  const [notif, setNotif] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = getItem(STORAGE_KEY);
    if (existing) {
      setForm({
        visi: existing.visi || '',
        misi: existing.misi?.length ? existing.misi : [''],
        tujuan: existing.tujuan?.length ? existing.tujuan : ['']
      });
    }
  }, []);

  const showNotif = (msg) => { setNotif(msg); setTimeout(() => setNotif(''), 3000); };

  const addMisi = () => setForm(prev => ({ ...prev, misi: [...prev.misi, ''] }));
  const removeMisi = (i) => {
    if (form.misi.length <= 1) return;
    setForm(prev => ({ ...prev, misi: prev.misi.filter((_, idx) => idx !== i) }));
  };
  const updateMisi = (i, val) => {
    setForm(prev => {
      const m = [...prev.misi];
      m[i] = val;
      return { ...prev, misi: m };
    });
  };

  const addTujuan = () => setForm(prev => ({ ...prev, tujuan: [...prev.tujuan, ''] }));
  const removeTujuan = (i) => {
    if (form.tujuan.length <= 1) return;
    setForm(prev => ({ ...prev, tujuan: prev.tujuan.filter((_, idx) => idx !== i) }));
  };
  const updateTujuan = (i, val) => {
    setForm(prev => {
      const t = [...prev.tujuan];
      t[i] = val;
      return { ...prev, tujuan: t };
    });
  };

  const handleSave = () => {
    if (!form.visi.trim()) { showNotif('Visi wajib diisi'); return; }
    const clean = {
      visi: form.visi,
      misi: form.misi.filter(m => m.trim()),
      tujuan: form.tujuan.filter(t => t.trim())
    };
    if (clean.misi.length === 0) { showNotif('Minimal satu misi harus diisi'); return; }
    setItem(STORAGE_KEY, clean);
    setSaved(true);
    showNotif('Visi, Misi, Tujuan berhasil disimpan');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Visi, Misi, dan Tujuan</h1>
          <p className="text-gray-500 text-sm">Rumusan visi, misi, dan tujuan madrasah</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 shadow-sm">
          <Save size={16} /> {saved ? 'Simpan Ulang' : 'Simpan'}
        </button>
      </div>

      {notif && <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">{notif}</div>}

      {/* Visi */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Eye size={18} className="text-green-700" /> Visi Madrasah
        </h3>
        <p className="text-xs text-gray-400 mb-2">Rumusan cita-cita jangka panjang madrasah yang ingin diwujudkan</p>
        <textarea
          value={form.visi}
          onChange={e => setForm(prev => ({ ...prev, visi: e.target.value }))}
          placeholder="Tulis visi madrasah..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
          rows={4}
        />
        <p className="text-xs text-gray-400 mt-1">{form.visi.length} karakter</p>
      </div>

      {/* Misi */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Eye size={18} className="text-green-700" /> Misi Madrasah
          </h3>
          <button onClick={addMisi} className="flex items-center gap-1 text-sm text-green-700 hover:text-green-800">
            <Plus size={16} /> Tambah Misi
          </button>
        </div>
        <p className="text-xs text-gray-400 mb-3">Langkah-langkah strategis untuk mencapai visi madrasah</p>
        <div className="space-y-3">
          {form.misi.map((m, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">{i + 1}</span>
              <textarea
                value={m}
                onChange={e => updateMisi(i, e.target.value)}
                placeholder={`Misi ${i + 1}...`}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                rows={2}
              />
              <button onClick={() => removeMisi(i)} className="text-red-400 hover:text-red-600 mt-1 flex-shrink-0" title="Hapus">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tujuan */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Eye size={18} className="text-green-700" /> Tujuan Madrasah
          </h3>
          <button onClick={addTujuan} className="flex items-center gap-1 text-sm text-green-700 hover:text-green-800">
            <Plus size={16} /> Tambah Tujuan
          </button>
        </div>
        <p className="text-xs text-gray-400 mb-3">Hasil yang ingin dicapai berdasarkan visi dan misi, bersifat terukur</p>
        <div className="space-y-3">
          {form.tujuan.map((t, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">{i + 1}</span>
              <textarea
                value={t}
                onChange={e => updateTujuan(i, e.target.value)}
                placeholder={`Tujuan ${i + 1}...`}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                rows={2}
              />
              <button onClick={() => removeTujuan(i)} className="text-red-400 hover:text-red-600 mt-1 flex-shrink-0" title="Hapus">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-xl text-sm font-medium hover:bg-green-800 shadow-sm">
          <Save size={16} /> Simpan Visi, Misi, Tujuan
        </button>
      </div>
    </div>
  );
}