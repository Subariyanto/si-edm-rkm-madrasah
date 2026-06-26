import { getCodeStats } from '../services/activationService';
import { getItem, getStorageUsage, exportAllData } from '../services/storageService';
import StatCard from '../components/Cards/StatCard';
import { BarChart3, Key, CheckCircle, XCircle, Database, HardDrive } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/formatters';
import { useState } from 'react';
import ConfirmModal from '../components/Modals/ConfirmModal';

export default function AdminDashboard() {
  const stats = getCodeStats();
  const storage = getStorageUsage();
  const navigate = useNavigate();
  const [showReset, setShowReset] = useState(false);

  const profiles = getItem('profiles') || [];
  const profilesCount = profiles.length || Object.keys(profiles).length || 0;

  const handleExportAll = () => {
    const data = exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `edm-rkm-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard Admin</h1>
      <p className="text-gray-500 text-sm mb-6">Ringkasan aktivasi dan status sistem</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Kode" value={stats.total} icon={<Key className="text-green-700" size={24} />} />
        <StatCard title="Kode Aktif" value={stats.active} icon={<CheckCircle className="text-blue-600" size={24} />} color="blue" />
        <StatCard title="Kode Digunakan" value={stats.used} icon={<BarChart3 className="text-purple-600" size={24} />} color="purple" />
        <StatCard title="Kode Expired" value={stats.expired} icon={<XCircle className="text-red-600" size={24} />} color="red" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><Database size={18} className="text-green-700" /> Status Penyimpanan</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Madrasah di perangkat ini</span><span className="font-semibold">{profilesCount}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Penggunaan localStorage</span><span className="font-semibold">{storage.formattedUsed} / {storage.formattedTotal}</span></div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{width: `${Math.min(storage.percent, 100)}%`}}></div>
            </div>
            <p className="text-xs text-gray-400 text-right">{storage.percent}% terpakai</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><HardDrive size={18} className="text-green-700" /> Aksi Cepat</h3>
          <div className="space-y-2">
            <button onClick={() => navigate('/admin/activation')} className="w-full py-2 px-4 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800">Kelola Kode Aktivasi</button>
            <button onClick={handleExportAll} className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Backup Semua Data</button>
            <button onClick={() => setShowReset(true)} className="w-full py-2 px-4 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50">Reset Semua Data</button>
          </div>
        </div>
      </div>

      {/* Daftar madrasah terdaftar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Daftar Madrasah Terdaftar</h3>
        {profilesCount === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">Belum ada madrasah yang terdaftar</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left text-gray-600"><th className="py-2">Nama</th><th className="py-2">Jenjang</th><th className="py-2">Kecamatan</th><th className="py-2">Tahun Pelajaran</th></tr></thead>
              <tbody>
                {Array.isArray(profiles) ? profiles.map((p, i) => (
                  <tr key={i} className="border-b"><td className="py-2">{p.nama || '-'}</td><td className="py-2">{p.jenjang || '-'}</td><td className="py-2">{p.kecamatan || '-'}</td><td className="py-2">{p.tahunPelajaran || '-'}</td></tr>
                )) : <tr><td colSpan="4" className="py-4 text-center text-gray-400">Format data tidak dikenal</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showReset && (
        <ConfirmModal
          title="Reset Semua Data"
          message="Anda yakin ingin menghapus SEMUA data termasuk kode aktivasi, data madrasah, dan hasil EDM? Tindakan ini tidak dapat dibatalkan."
          danger
          confirmText="Reset Semua"
          onConfirm={() => { localStorage.clear(); window.location.reload(); }}
          onCancel={() => setShowReset(false)}
        />
      )}
    </div>
  );
}