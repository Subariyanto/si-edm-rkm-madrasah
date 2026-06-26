import { useState } from 'react';
import { Download, Upload, Trash2, HardDrive, Clock, FileJson, AlertTriangle } from 'lucide-react';
import { exportAllData, importAllData, getStorageUsage, getAllKeys } from '../services/storageService';
import ConfirmModal from '../components/Modals/ConfirmModal';

export default function AdminBackupRestore() {
  const [notif, setNotif] = useState('');
  const [showClear, setShowClear] = useState(false);
  const storage = getStorageUsage();
  const keys = getAllKeys();

  const showNotif = (msg, type = 'success') => {
    setNotif(msg);
    setTimeout(() => setNotif(''), 3000);
  };

  const handleExport = () => {
    try {
      const data = exportAllData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `si-edm-rkm-backup-full-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showNotif('Backup berhasil diekspor');
    } catch (e) {
      showNotif('Gagal ekspor backup: ' + e.message);
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!window.confirm('Import akan MENIMPA data yang ada. Lanjutkan?')) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        importAllData(data);
        showNotif('Data berhasil diimpor. Silakan refresh halaman.');
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        showNotif('Format file tidak valid: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleClearAll = () => {
    const prefix = 'edmrkm_';
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) {
        localStorage.removeItem(k);
      }
    }
    setShowClear(false);
    showNotif('Semua data telah dihapus. Halaman akan direfresh.');
    setTimeout(() => window.location.reload(), 1500);
  };

  const keysByCategory = keys.reduce((acc, k) => {
    const cat = k.includes('_') ? k.split('_')[0] : 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(k);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Backup & Restore</h1>
          <p className="text-gray-500 text-sm">Kelola backup dan restore data sistem</p>
        </div>
      </div>

      {notif && (
        <div className={`mb-4 px-4 py-2 rounded-lg text-sm ${notif.includes('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {notif}
        </div>
      )}

      {/* Storage Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-50 rounded-lg"><HardDrive size={20} className="text-green-700" /></div>
            <div>
              <p className="text-sm text-gray-500">Penyimpanan</p>
              <p className="font-semibold text-gray-800">{storage.formattedUsed} / {storage.formattedTotal}</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${Math.min(storage.percent, 100)}%` }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">{storage.percent}% terpakai</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg"><FileJson size={20} className="text-blue-700" /></div>
            <div>
              <p className="text-sm text-gray-500">Total Keys</p>
              <p className="font-semibold text-gray-800">{keys.length} item</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-50 rounded-lg"><Clock size={20} className="text-amber-700" /></div>
            <div>
              <p className="text-sm text-gray-500">Backup Terakhir</p>
              <p className="font-semibold text-gray-800">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={handleExport} className="flex items-center gap-2 px-5 py-3 bg-green-700 text-white rounded-xl text-sm font-medium hover:bg-green-800 shadow-sm">
          <Download size={18} /> Export Semua Data (Backup)
        </button>
        <label className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 shadow-sm cursor-pointer">
          <Upload size={18} /> Import Data (Restore)
          <input type="file" accept=".json" onChange={handleImport} className="hidden" />
        </label>
        <button onClick={() => setShowClear(true)} className="flex items-center gap-2 px-5 py-3 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 shadow-sm">
          <Trash2 size={18} /> Hapus Semua Data
        </button>
      </div>

      {/* Data Keys Detail */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800">Rincian Data Tersimpan</h3>
        </div>
        <div className="p-6">
          {Object.keys(keysByCategory).length === 0 ? (
            <p className="text-gray-400 text-sm">Belum ada data tersimpan.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(keysByCategory).map(([cat, catKeys]) => (
                <div key={cat}>
                  <h4 className="text-sm font-semibold text-gray-700 uppercase mb-2">{cat} ({catKeys.length})</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {catKeys.map(k => (
                      <span key={k} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-mono">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Warning */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 flex items-start gap-3">
        <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium mb-1">Perhatian</p>
          <p>Backup hanya mencakup data yang disimpan di localStorage browser ini. Untuk keamanan penuh dan sinkronisasi lintas perangkat, dibutuhkan server database. Selalu simpan file backup di tempat yang aman.</p>
        </div>
      </div>

      {showClear && (
        <ConfirmModal
          title="Hapus Semua Data"
          message="PERINGATAN: Ini akan menghapus SEMUA data tersimpan termasuk kode aktivasi, data madrasah, EDM, RKM, dan semua dokumen. Tindakan ini TIDAK DAPAT dibatalkan. Pastikan Anda sudah melakukan backup terlebih dahulu."
          onConfirm={handleClearAll}
          onCancel={() => setShowClear(false)}
          confirmText="Ya, Hapus Semua"
          danger
        />
      )}
    </div>
  );
}