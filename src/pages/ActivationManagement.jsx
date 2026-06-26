import { useState } from 'react';
import { getActivationCodes, saveActivationCode, updateActivationCode, deleteActivationCode, generateCode } from '../services/activationService';
import { Plus, Copy, Trash2, Edit3, Download, Upload, X, CheckCircle, XCircle, Clock } from 'lucide-react';
import ConfirmModal from '../components/Modals/ConfirmModal';

export default function ActivationManagement() {
  const [codes, setCodes] = useState(getActivationCodes());
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [form, setForm] = useState({ nama: '', nsm: '', npsn: '', jenjang: 'MI', kecamatan: '', kabupaten: 'Jember', tahunPelajaran: '', masaBerlaku: '' });
  const [notif, setNotif] = useState('');

  const resetForm = () => setForm({ nama: '', nsm: '', npsn: '', jenjang: 'MI', kecamatan: '', kabupaten: 'Jember', tahunPelajaran: '', masaBerlaku: '' });

  const handleSubmit = () => {
    if (!form.nama.trim()) { setNotif('Nama madrasah wajib diisi'); setTimeout(() => setNotif(''), 3000); return; }
    if (editId) {
      updateActivationCode(editId, form);
    } else {
      const code = generateCode();
      saveActivationCode({ ...form, code, status: 'active' });
    }
    setCodes(getActivationCodes()); setShowForm(false); resetForm(); setEditId(null);
    setNotif(editId ? 'Kode berhasil diperbarui' : 'Kode aktivasi berhasil dibuat');
    setTimeout(() => setNotif(''), 3000);
  };

  const handleEdit = (c) => { setForm({ nama: c.nama, nsm: c.nsm || '', npsn: c.npsn || '', jenjang: c.jenjang || 'MI', kecamatan: c.kecamatan || '', kabupaten: c.kabupaten || 'Jember', tahunPelajaran: c.tahunPelajaran || '', masaBerlaku: c.masaBerlaku || '' }); setEditId(c.id); setShowForm(true); };

  const handleDelete = (id) => { deleteActivationCode(id); setCodes(getActivationCodes()); setConfirmDelete(null); setNotif('Kode berhasil dihapus'); setTimeout(() => setNotif(''), 3000); };

  const handleToggle = (id, newStatus) => { updateActivationCode(id, { status: newStatus }); setCodes(getActivationCodes()); };

  const handleCopy = (code) => { navigator.clipboard.writeText(code); setNotif('Kode disalin!'); setTimeout(() => setNotif(''), 2000); };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(codes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `kode-aktivasi-${new Date().toISOString().slice(0,10)}.json`; a.click();
    URL.revokeObjectURL(url); setNotif('Data berhasil diekspor'); setTimeout(() => setNotif(''), 3000);
  };

  const handleImport = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { try { const data = JSON.parse(ev.target.result); if (Array.isArray(data)) { localStorage.setItem('edmrkm_activation_codes', JSON.stringify(data)); setCodes(data); setNotif(`${data.length} kode berhasil diimpor`); } } catch { setNotif('Format file tidak valid'); } setTimeout(() => setNotif(''), 3000); };
    reader.readAsText(file);
  };

  const statusBadge = (status) => {
    const map = { active: 'bg-green-100 text-green-700', used: 'bg-blue-100 text-blue-700', expired: 'bg-red-100 text-red-700' };
    return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Kode Aktivasi</h1>
          <p className="text-gray-500 text-sm">Generate dan kelola kode aktivasi madrasah</p>
        </div>
      </div>

      {notif && <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">{notif}</div>}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800">
        ⚠️ Mode aktivasi ini berbasis localStorage/offline sederhana. Untuk keamanan dan sinkronisasi lintas perangkat secara penuh, dibutuhkan server/database.
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => { resetForm(); setEditId(null); setShowForm(true); }} className="flex items-center gap-1 px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800"><Plus size={16} /> Generate Kode</button>
        <button onClick={handleExport} className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"><Download size={16} /> Export</button>
        <label className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 cursor-pointer"><Upload size={16} /> Import<input type="file" accept=".json" onChange={handleImport} className="hidden" /></label>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr><th className="py-3 px-4 text-left text-gray-600">Kode</th><th className="py-3 px-4 text-left text-gray-600">Nama Madrasah</th><th className="py-3 px-4 text-left text-gray-600">Jenjang</th><th className="py-3 px-4 text-left text-gray-600">Kecamatan</th><th className="py-3 px-4 text-left text-gray-600">Status</th><th className="py-3 px-4 text-center text-gray-600">Aksi</th></tr></thead>
            <tbody>
              {codes.length === 0 ? <tr><td colSpan={6} className="py-8 text-center text-gray-400">Belum ada kode aktivasi. Klik "Generate Kode" untuk membuat.</td></tr> :
                codes.map(c => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-xs">{c.code}</td>
                    <td className="py-3 px-4">{c.nama}</td>
                    <td className="py-3 px-4">{c.jenjang}</td>
                    <td className="py-3 px-4">{c.kecamatan}</td>
                    <td className="py-3 px-4">{statusBadge(c.status)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => handleCopy(c.code)} className="p-1.5 hover:bg-gray-100 rounded" title="Salin"><Copy size={14} /></button>
                        <button onClick={() => handleEdit(c)} className="p-1.5 hover:bg-gray-100 rounded" title="Edit"><Edit3 size={14} /></button>
                        <button onClick={() => handleToggle(c.id, c.status === 'active' ? 'expired' : 'active')} className={`p-1.5 hover:bg-gray-100 rounded ${c.status === 'active' ? 'text-red-500' : 'text-green-500'}`} title={c.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}>
                          {c.status === 'active' ? <XCircle size={14} /> : <CheckCircle size={14} />}
                        </button>
                        <button onClick={() => setConfirmDelete(c.id)} className="p-1.5 hover:bg-gray-100 rounded text-red-500" title="Hapus"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">{editId ? 'Edit Kode Aktivasi' : 'Generate Kode Aktivasi'}</h3>
              <button onClick={() => { setShowForm(false); setEditId(null); }} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="px-6 py-4 space-y-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Nama Madrasah *</label><input value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">NSM</label><input value={form.nsm} onChange={e => setForm({...form, nsm: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">NPSN</label><input value={form.npsn} onChange={e => setForm({...form, npsn: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Jenjang</label><select value={form.jenjang} onChange={e => setForm({...form, jenjang: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"><option>RA</option><option>MI</option><option>MTs</option><option>MA</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Kabupaten</label><input value={form.kabupaten} onChange={e => setForm({...form, kabupaten: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label><input value={form.kecamatan} onChange={e => setForm({...form, kecamatan: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Tahun Pelajaran</label><input value={form.tahunPelajaran} onChange={e => setForm({...form, tahunPelajaran: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="2026/2027" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Masa Berlaku</label><input value={form.masaBerlaku} onChange={e => setForm({...form, masaBerlaku: e.target.value})} type="date" className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
              {!editId && <p className="text-xs text-gray-400">Kode akan digenerate otomatis dengan format EDMRKM-JBR-TAHUN-XXXX</p>}
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-xl">
              <button onClick={() => { setShowForm(false); setEditId(null); }} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100">Batal</button>
              <button onClick={handleSubmit} className="px-4 py-2 text-sm bg-green-700 text-white rounded-lg hover:bg-green-800">{editId ? 'Simpan' : 'Generate'}</button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <ConfirmModal title="Hapus Kode" message="Kode aktivasi akan dihapus permanen. Lanjutkan?" danger confirmText="Hapus" onConfirm={() => handleDelete(confirmDelete)} onCancel={() => setConfirmDelete(null)} />
      )}
    </div>
  );
}