import { useState, useEffect } from 'react';
import { getItem, setItem } from '../services/storageService';
import { Users, Save, Plus, Trash2, UserPlus, ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'tpm_team';

export default function TPMPage() {
  const [form, setForm] = useState({
    skPenetapan: '',
    tanggalSk: '',
    ketua: { nama: '', nip: '', jabatan: '', tandaTangan: '' },
    sekretaris: { nama: '', nip: '', jabatan: '', tandaTangan: '' },
    anggota: []
  });
  const [notif, setNotif] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = getItem(STORAGE_KEY);
    if (existing) setForm(prev => ({ ...prev, ...existing }));
  }, []);

  const showNotif = (msg) => { setNotif(msg); setTimeout(() => setNotif(''), 3000); };

  const handleSave = () => {
    if (!form.ketua.nama.trim()) { showNotif('Nama ketua TPM wajib diisi'); return; }
    setItem(STORAGE_KEY, form);
    setSaved(true);
    showNotif('Data TPM berhasil disimpan');
  };

  const addMember = () => {
    setForm(prev => ({ ...prev, anggota: [...prev.anggota, { nama: '', nip: '', jabatan: '' }] }));
  };

  const removeMember = (i) => {
    setForm(prev => ({ ...prev, anggota: prev.anggota.filter((_, idx) => idx !== i) }));
  };

  const updateMember = (i, field, value) => {
    setForm(prev => {
      const m = [...prev.anggota];
      m[i] = { ...m[i], [field]: value };
      return { ...prev, anggota: m };
    });
  };

  const MemberInput = ({ label, value, onChange, placeholder = '' }) => (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tim Penjaminan Mutu (TPM)</h1>
          <p className="text-gray-500 text-sm">Data Tim Penjaminan Mutu Madrasah</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 shadow-sm">
          <Save size={16} /> {saved ? 'Simpan Ulang' : 'Simpan TPM'}
        </button>
      </div>

      {notif && <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">{notif}</div>}

      {/* SK Penetapan */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <ShieldCheck size={18} className="text-green-700" /> SK Penetapan TPM
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor SK</label>
            <input value={form.skPenetapan} onChange={e => setForm(prev => ({ ...prev, skPenetapan: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="No: .../SK/..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal SK</label>
            <input type="date" value={form.tanggalSk} onChange={e => setForm(prev => ({ ...prev, tanggalSk: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
      </div>

      {/* Ketua */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <UserPlus size={18} className="text-green-700" /> Ketua TPM
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama <span className="text-red-500">*</span></label>
            <input value={form.ketua.nama} onChange={e => setForm(prev => ({ ...prev, ketua: { ...prev.ketua, nama: e.target.value } }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Nama lengkap" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NIP</label>
            <input value={form.ketua.nip} onChange={e => setForm(prev => ({ ...prev, ketua: { ...prev.ketua, nip: e.target.value } }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
            <input value={form.ketua.jabatan} onChange={e => setForm(prev => ({ ...prev, ketua: { ...prev.ketua, jabatan: e.target.value } }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Kepala Madrasah" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanda Tangan (nama)</label>
            <input value={form.ketua.tandaTangan} onChange={e => setForm(prev => ({ ...prev, ketua: { ...prev.ketua, tandaTangan: e.target.value } }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
      </div>

      {/* Sekretaris */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <UserPlus size={18} className="text-blue-700" /> Sekretaris TPM
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <input value={form.sekretaris.nama} onChange={e => setForm(prev => ({ ...prev, sekretaris: { ...prev.sekretaris, nama: e.target.value } }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Nama lengkap" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NIP</label>
            <input value={form.sekretaris.nip} onChange={e => setForm(prev => ({ ...prev, sekretaris: { ...prev.sekretaris, nip: e.target.value } }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
            <input value={form.sekretaris.jabatan} onChange={e => setForm(prev => ({ ...prev, sekretaris: { ...prev.sekretaris, jabatan: e.target.value } }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanda Tangan (nama)</label>
            <input value={form.sekretaris.tandaTangan} onChange={e => setForm(prev => ({ ...prev, sekretaris: { ...prev.sekretaris, tandaTangan: e.target.value } }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
      </div>

      {/* Anggota */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Users size={18} className="text-green-700" /> Anggota TPM ({form.anggota.length})
          </h3>
          <button onClick={addMember} className="flex items-center gap-1 text-sm text-green-700 hover:text-green-800">
            <Plus size={16} /> Tambah Anggota
          </button>
        </div>

        {form.anggota.length === 0 ? (
          <p className="text-gray-400 text-sm py-4 text-center">Belum ada anggota. Klik "Tambah Anggota" untuk menambahkan.</p>
        ) : (
          <div className="space-y-3">
            {form.anggota.map((m, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">{i + 1}</span>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input value={m.nama} onChange={e => updateMember(i, 'nama', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Nama" />
                  <input value={m.nip} onChange={e => updateMember(i, 'nip', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="NIP" />
                  <input value={m.jabatan} onChange={e => updateMember(i, 'jabatan', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Jabatan" />
                </div>
                <button onClick={() => removeMember(i)} className="text-red-400 hover:text-red-600 mt-1 flex-shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-xl text-sm font-medium hover:bg-green-800 shadow-sm">
          <Save size={16} /> Simpan Data TPM
        </button>
      </div>
    </div>
  );
}