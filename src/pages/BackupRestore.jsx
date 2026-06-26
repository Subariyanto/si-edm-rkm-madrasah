import { useState, useRef } from 'react';
import { getItem, setItem, getStorageUsage, exportAllData, importAllData } from '../services/storageService';
import { Download, Upload, Save, HardDrive, AlertTriangle, CheckCircle, Database } from 'lucide-react';

export default function BackupRestore() {
  const [notif, setNotif] = useState('');
  const [showRestore, setShowRestore] = useState(false);
  const fileRef = useRef(null);
  const storage = getStorageUsage();

  const handleBackup = () => {
    const data = exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `si-edm-rkm-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setNotif('Backup berhasil diunduh'); setTimeout(()=>setNotif(''),3000);
  };

  const handleRestore = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        importAllData(data);
        setNotif('Data berhasil dipulihkan! Refresh halaman...');
        setTimeout(()=>window.location.reload(),2000);
      } catch { setNotif('Format file tidak valid'); setTimeout(()=>setNotif(''),3000); }
    };
    reader.readAsText(file);
  };

  const handleWipe = () => {
    if(window.confirm('HAPUS SEMUA DATA? Data tidak bisa dikembalikan.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Backup & Restore</h1>
      <p className="text-gray-500 text-sm mb-6">Cadangkan dan pulihkan data EDM & RKM</p>

      {notif && <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">{notif}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Backup */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-green-50 rounded-lg"><Download className="text-green-700" size={24}/></div><div><h3 className="font-semibold text-gray-800">Backup Data</h3><p className="text-xs text-gray-500">Unduh semua data ke file JSON</p></div></div>
          <p className="text-sm text-gray-600 mb-4">File backup mencakup semua data: profil, EDM, RKJM, RKT, anggaran, dokumen, dan pengaturan.</p>
          <button onClick={handleBackup} className="w-full py-2.5 bg-green-700 text-white rounded-lg hover:bg-green-800 flex items-center justify-center gap-2"><Download size={16}/> Unduh Backup</button>
        </div>

        {/* Restore */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-blue-50 rounded-lg"><Upload className="text-blue-700" size={24}/></div><div><h3 className="font-semibold text-gray-800">Restore Data</h3><p className="text-xs text-gray-500">Pulihkan data dari file backup</p></div></div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-xs text-amber-800 flex items-start gap-2"><AlertTriangle size={14} className="flex-shrink-0 mt-0.5"/> <span>Restore akan <strong>menimpa semua data</strong> yang ada. Pastikan Anda telah membackup data terbaru.</span></div>
          <label className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer"><Upload size={16}/> Pilih File Restore<input ref={fileRef} type="file" accept=".json" onChange={handleRestore} className="hidden"/></label>
        </div>
      </div>

      {/* Info */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Database size={18} className="text-green-700"/> Informasi Penyimpanan</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-600">Penyimpanan digunakan</span><span>{storage.formattedUsed} / {storage.formattedTotal}</span></div>
          <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-600 h-2 rounded-full" style={{width:`${Math.min(storage.percent,100)}%`}}></div></div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-red-700 font-semibold mb-2 flex items-center gap-2"><AlertTriangle size={18}/> Zona Berbahaya</h3>
        <p className="text-red-600 text-sm mb-4">Menghapus semua data termasuk profil madrasah, hasil EDM, RKJM, RKT, dan anggaran. Tindakan ini TIDAK DAPAT dibatalkan.</p>
        <button onClick={handleWipe} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">Hapus Semua Data</button>
      </div>
    </div>
  );
}