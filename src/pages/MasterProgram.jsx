import { useState, useEffect } from 'react';
import { getItem, setItem } from '../services/storageService';
import { programRkm } from '../data/programRkm';
import { Plus, Edit3, Trash2, Save, X, Search, RotateCcw } from 'lucide-react';
import ConfirmModal from '../components/Modals/ConfirmModal';

const STORAGE_KEY = 'master_program_rkm';

export default function MasterProgram() {
  const [programs, setPrograms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [notif, setNotif] = useState('');
  const [search, setSearch] = useState('');
  const [filterKategori, setFilterKategori] = useState('');

  const emptyForm = {
    kategori: '', nama: '', snp: '', contohKegiatan: [],
    indikatorKeberhasilan: '', penanggungJawab: '', sumberDana: [], tipe: 'strategis'
  };
  const [form, setForm] = useState({ ...emptyForm });

  useEffect(() => {
    const stored = getItem(STORAGE_KEY);
    if (!stored || stored.length === 0) {
      setItem(STORAGE_KEY, programRkm);
      setPrograms(programRkm);
    } else {
      setPrograms(stored);
    }
  }, []);

  const showNotif = (msg) => { setNotif(msg); setTimeout(() => setNotif(''), 3000); };

  const handleEdit = (p) => {
    setForm({ ...p });
    setEditing(p.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.nama.trim()) { showNotif('Nama program wajib diisi'); return; }
    let updated;
    if (editing) {
      updated = programs.map(p => p.id === editing ? { ...form, id: editing } : p);
    } else {
      const newProgram = { ...form, id: Date.now() };
      updated = [...programs, newProgram];
    }
    setItem(STORAGE_KEY, updated);
    setPrograms(updated);
    setShowForm(false);
    setForm({ ...emptyForm });
    setEditing(null);
    showNotif(editing ? 'Program berhasil diperbarui' : 'Program baru berhasil ditambahkan');
  };

  const handleDelete = (id) => {
    setItem(STORAGE_KEY, programs.filter(p => p.id !== id));
    setPrograms(programs.filter(p => p.id !== id));
    setConfirmDelete(null);
    showNotif('Program berhasil dihapus');
  };

  const handleReset = () => {
    setItem(STORAGE_KEY, programRkm);
    setPrograms(programRkm);
    showNotif('Data dikembalikan ke data awal');
  };

  const handleArrayChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value.split('\n').filter(Boolean) }));
  };

  const kategoriList = [...new Set(programs.map(p => p.kategori).filter(Boolean))];

  const filtered = programs.filter(p => {
    const m = !search || p.nama.toLowerCase().includes(search.toLowerCase()) || p.kategori.toLowerCase().includes(search.toLowerCase());
    const k = !filterKategori || p.kategori === filterKategori;
    return m && k;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Master Program RKM</h1>
          <p className="text-gray-500 text-sm">Kelola master program Rencana Kerja Madrasah ({programs.length} program)</p>
        </div>
      </div>

      {notif && <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">{notif}</div>}

      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <button onClick={() => { setForm({ ...emptyForm }); setEditing(null); setShowForm(true); }} className="flex items-center gap-1 px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800">
          <Plus size={16} /> Tambah Program
        </button>
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari program..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <select value={filterKategori} onChange={e => setFilterKategori(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
          <option value="">Semua Kategori</option>
          {kategoriList.map(k => <option key={k} value={k}>{k}</option>)}
        </select>
        <button onClick={handleReset} className="flex items-center gap-1 px-4 py-2 text-sm border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50">
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-4 text-left text-gray-600">Nama Program</th>
                <th className="py-3 px-4 text-left text-gray-600">Kategori/SNP</th>
                <th className="py-3 px-4 text-left text-gray-600">Penanggung Jawab</th>
                <th className="py-3 px-4 text-center text-gray-600 w-20">Tipe</th>
                <th className="py-3 px-4 text-center text-gray-600 w-24">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-800">{p.nama}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{p.indikatorKeberhasilan?.substring(0, 60)}...</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-gray-700">{p.kategori}</div>
                    <div className="text-xs text-gray-400">{p.snp}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{p.penanggungJawab}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.tipe === 'strategis' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                      {p.tipe}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-1">
                      <button onClick={() => handleEdit(p)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit3 size={15} /></button>
                      <button onClick={() => setConfirmDelete(p.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="py-10 text-center text-gray-400">Tidak ada program ditemukan</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold text-gray-800">{editing ? 'Edit Program' : 'Tambah Program Baru'}</h3>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Program <span className="text-red-500">*</span></label>
                <input value={form.nama} onChange={e => setForm(prev => ({ ...prev, nama: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <input value={form.kategori} onChange={e => setForm(prev => ({ ...prev, kategori: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SNP</label>
                  <input value={form.snp} onChange={e => setForm(prev => ({ ...prev, snp: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Penanggung Jawab</label>
                  <input value={form.penanggungJawab} onChange={e => setForm(prev => ({ ...prev, penanggungJawab: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
                  <select value={form.tipe} onChange={e => setForm(prev => ({ ...prev, tipe: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option value="strategis">Strategis</option>
                    <option value="rutin">Rutin</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contoh Kegiatan (satu per baris)</label>
                <textarea value={(form.contohKegiatan || []).join('\n')} onChange={e => handleArrayChange('contohKegiatan', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Indikator Keberhasilan</label>
                <textarea value={form.indikatorKeberhasilan} onChange={e => setForm(prev => ({ ...prev, indikatorKeberhasilan: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sumber Dana (satu per baris)</label>
                <textarea value={(form.sumberDana || []).join('\n')} onChange={e => handleArrayChange('sumberDana', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={2} />
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
          title="Hapus Program"
          message="Yakin hapus program ini? Program yang sudah digunakan madrasah dalam RKJM/RKT mungkin kehilangan referensi."
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
          confirmText="Ya, Hapus"
          danger
        />
      )}
    </div>
  );
}