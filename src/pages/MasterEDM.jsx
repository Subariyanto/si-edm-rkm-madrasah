import { useState, useEffect } from 'react';
import { getItem, setItem } from '../services/storageService';
import { edmIndicators } from '../data/edmIndicators';
import { edmIndicatorsPart2 } from '../data/edmIndicatorsPart2';
import { Plus, Edit3, Trash2, Save, X, Eye, EyeOff, Search } from 'lucide-react';
import ConfirmModal from '../components/Modals/ConfirmModal';

const STORAGE_KEY = 'edm_master';

export default function MasterEDM() {
  const [indicators, setIndicators] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [notif, setNotif] = useState('');
  const [search, setSearch] = useState('');
  const [filterAspek, setFilterAspek] = useState('');

  const [form, setForm] = useState({
    kode: '', aspek: '', pernyataan: '', snp: '', bobot: 3,
    penciri: [{ level: 1, text: '' }, { level: 2, text: '' }, { level: 3, text: '' }, { level: 4, text: '' }],
    contohBukti: [], templateRekomendasi: [], active: true
  });

  useEffect(() => {
    const stored = getItem(STORAGE_KEY);
    if (!stored || stored.length === 0) {
      const all = [...edmIndicators, ...edmIndicatorsPart2];
      setItem(STORAGE_KEY, all);
      setIndicators(all);
    } else {
      setIndicators(stored);
    }
  }, []);

  const showNotif = (msg) => { setNotif(msg); setTimeout(() => setNotif(''), 3000); };

  const resetForm = () => setForm({
    kode: '', aspek: '', pernyataan: '', snp: '', bobot: 3,
    penciri: [{ level: 1, text: '' }, { level: 2, text: '' }, { level: 3, text: '' }, { level: 4, text: '' }],
    contohBukti: [], templateRekomendasi: [], active: true
  });

  const handleEdit = (ind) => {
    setForm({
      kode: ind.kode, aspek: ind.aspek, pernyataan: ind.pernyataan, snp: ind.snp, bobot: ind.bobot || 3,
      penciri: ind.penciri || [{ level: 1, text: '' }, { level: 2, text: '' }, { level: 3, text: '' }, { level: 4, text: '' }],
      contohBukti: ind.contohBukti || [], templateRekomendasi: ind.templateRekomendasi || [], active: ind.active !== false
    });
    setEditing(ind.kode);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.kode.trim() || !form.pernyataan.trim()) { showNotif('Kode dan pernyataan wajib diisi'); return; }
    let updated;
    if (editing) {
      updated = indicators.map(i => i.kode === editing ? { ...form, kode: editing, penciri: form.penciri } : i);
    } else {
      if (indicators.find(i => i.kode === form.kode)) { showNotif('Kode sudah ada'); return; }
      updated = [...indicators, { ...form, penciri: form.penciri }];
    }
    setItem(STORAGE_KEY, updated);
    setIndicators(updated);
    setShowForm(false);
    resetForm();
    setEditing(null);
    showNotif(editing ? 'Indikator berhasil diperbarui' : 'Indikator baru berhasil ditambahkan');
  };

  const handleDelete = (kode) => {
    const updated = indicators.filter(i => i.kode !== kode);
    setItem(STORAGE_KEY, updated);
    setIndicators(updated);
    setConfirmDelete(null);
    showNotif('Indikator berhasil dihapus');
  };

  const handleToggleActive = (kode) => {
    const updated = indicators.map(i => i.kode === kode ? { ...i, active: !i.active } : i);
    setItem(STORAGE_KEY, updated);
    setIndicators(updated);
  };

  const handlePenciriChange = (level, value) => {
    setForm(prev => ({
      ...prev,
      penciri: prev.penciri.map(p => p.level === level ? { ...p, text: value } : p)
    }));
  };

  const handleArrayInput = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value.split('\n').filter(Boolean) }));
  };

  const handleSeedReset = () => {
    const all = [...edmIndicators, ...edmIndicatorsPart2];
    setItem(STORAGE_KEY, all);
    setIndicators(all);
    showNotif('Data dikembalikan ke data awal (seed)');
  };

  const aspekList = [...new Set(indicators.map(i => i.aspek).filter(Boolean))];

  const filtered = indicators.filter(i => {
    const matchSearch = !search || i.kode.toLowerCase().includes(search.toLowerCase()) ||
      i.pernyataan.toLowerCase().includes(search.toLowerCase()) ||
      i.aspek.toLowerCase().includes(search.toLowerCase());
    const matchAspek = !filterAspek || i.aspek === filterAspek;
    return matchSearch && matchAspek;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Master Indikator EDM</h1>
          <p className="text-gray-500 text-sm">Kelola seluruh indikator Evaluasi Diri Madrasah ({indicators.length} indikator)</p>
        </div>
      </div>

      {notif && <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">{notif}</div>}

      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <button onClick={() => { resetForm(); setEditing(null); setShowForm(true); }} className="flex items-center gap-1 px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800">
          <Plus size={16} /> Tambah Indikator
        </button>
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari indikator..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <select value={filterAspek} onChange={e => setFilterAspek(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
          <option value="">Semua Aspek</option>
          {aspekList.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <button onClick={handleSeedReset} className="px-4 py-2 text-sm border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50">Reset ke Data Awal</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-4 text-left text-gray-600 w-16">Kode</th>
                <th className="py-3 px-4 text-left text-gray-600">Aspek</th>
                <th className="py-3 px-4 text-left text-gray-600">Pernyataan</th>
                <th className="py-3 px-4 text-left text-gray-600 w-20">Bobot</th>
                <th className="py-3 px-4 text-center text-gray-600 w-20">Aktif</th>
                <th className="py-3 px-4 text-center text-gray-600 w-24">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(ind => (
                <tr key={ind.kode} className={`border-b hover:bg-gray-50 ${ind.active === false ? 'opacity-50 bg-gray-50' : ''}`}>
                  <td className="py-3 px-4 font-mono font-semibold text-green-700">{ind.kode}</td>
                  <td className="py-3 px-4 text-gray-600 max-w-[200px] truncate" title={ind.aspek}>{ind.aspek}</td>
                  <td className="py-3 px-4 max-w-[300px] truncate" title={ind.pernyataan}>{ind.pernyataan}</td>
                  <td className="py-3 px-4 text-center">{ind.bobot || 3}</td>
                  <td className="py-3 px-4 text-center">
                    <button onClick={() => handleToggleActive(ind.kode)} className={`p-1 rounded ${ind.active !== false ? 'text-green-600' : 'text-gray-400'}`}>
                      {ind.active !== false ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-1">
                      <button onClick={() => handleEdit(ind)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit3 size={15} /></button>
                      <button onClick={() => setConfirmDelete(ind.kode)} className="p-1.5 text-red-500 hover:bg-red-50 rounded"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="py-10 text-center text-gray-400">Tidak ada indikator ditemukan</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold text-gray-800">{editing ? 'Edit Indikator' : 'Tambah Indikator Baru'}</h3>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kode <span className="text-red-500">*</span></label>
                  <input value={form.kode} onChange={e => setForm(prev => ({ ...prev, kode: e.target.value }))} disabled={!!editing} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="A.1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bobot</label>
                  <input type="number" min={1} max={5} value={form.bobot} onChange={e => setForm(prev => ({ ...prev, bobot: parseInt(e.target.value) || 3 }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aspek</label>
                  <input value={form.aspek} onChange={e => setForm(prev => ({ ...prev, aspek: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="A. Budaya Kedisiplinan Warga Madrasah" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pernyataan <span className="text-red-500">*</span></label>
                  <input value={form.pernyataan} onChange={e => setForm(prev => ({ ...prev, pernyataan: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">SNP</label>
                  <input value={form.snp} onChange={e => setForm(prev => ({ ...prev, snp: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Standar Kompetensi Lulusan" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Penciri Level</label>
                {form.penciri.map(p => (
                  <div key={p.level} className="mb-2">
                    <span className="text-xs font-semibold text-gray-500">Level {p.level}</span>
                    <textarea value={p.text} onChange={e => handlePenciriChange(p.level, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={2} />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contoh Bukti (satu per baris)</label>
                <textarea value={(form.contohBukti || []).join('\n')} onChange={e => handleArrayInput('contohBukti', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={3} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Rekomendasi (satu per baris)</label>
                <textarea value={(form.templateRekomendasi || []).join('\n')} onChange={e => handleArrayInput('templateRekomendasi', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={3} />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="activeCb" checked={form.active} onChange={e => setForm(prev => ({ ...prev, active: e.target.checked }))} className="rounded" />
                <label htmlFor="activeCb" className="text-sm text-gray-700">Indikator Aktif</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-lg sticky bottom-0">
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100">Batal</button>
              <button onClick={handleSave} className="flex items-center gap-1 px-4 py-2 text-sm text-white bg-green-700 rounded hover:bg-green-800"><Save size={16} /> Simpan</button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <ConfirmModal
          title="Hapus Indikator"
          message={`Yakin hapus indikator ${confirmDelete}? Data yang sudah diisi madrasah untuk indikator ini akan kehilangan referensi.`}
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
          confirmText="Ya, Hapus"
          danger
        />
      )}
    </div>
  );
}