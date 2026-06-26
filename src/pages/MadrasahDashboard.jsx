import { useState, useEffect } from 'react';
import { getItem, setItem } from '../services/storageService';
import { getActiveMadrasah } from '../services/authService';
import { getScores, calculateScores } from '../services/scoringService';
import { getEdmAnswers } from '../services/scoringService';
import { getSKPMColor, getSKPMBgColor, formatPercent } from '../utils/formatters';
import {
  LayoutDashboard, School, BarChart3, TrendingUp, CheckCircle,
  AlertCircle, ArrowRight, Calendar, Edit3, Percent
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function MadrasahDashboard() {
  const navigate = useNavigate();
  const madrasah = getActiveMadrasah();
  const [scores, setScores] = useState(null);
  const [answers, setAnswers] = useState({});
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const calculated = calculateScores();
    setScores(calculated);
    setAnswers(getEdmAnswers());
    setProfiles(getItem('profil_madrasah'));
  }, []);

  const edmProgress = scores ? Object.keys(answers).length : 0;
  const totalIndicators = 26;
  const edmPercent = Math.round((edmProgress / totalIndicators) * 100);

  // Chart data
  const chartData = scores ? Object.entries(scores.aspects).map(([key, val]) => ({
    name: `Aspek ${key}`,
    SKPM: Math.round(val.skpm),
    full: key
  })) : [];

  const radarData = scores ? Object.entries(scores.aspects).map(([key, val]) => ({
    aspek: `Aspek ${key}`,
    skpm: Math.round(val.skpm),
    max: 100
  })) : [];

  const aspectNames = {
    A: 'Budaya Kedisiplinan Warga Madrasah',
    B: 'Budaya Pengembangan Diri GTK',
    C: 'Proses Pembelajaran',
    D: 'Materi dan Sarana Pembelajaran',
    E: 'Pembiayaan'
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Madrasah</h1>
          <p className="text-gray-500 text-sm">Selamat datang, {madrasah?.nama || 'Madrasah'}</p>
        </div>
        {madrasah && (
          <div className="text-right text-sm text-gray-500">
            <p>NSM: {madrasah.nsm || '-'}</p>
            <p>{madrasah.jenjang || ''} • {madrasah.kecamatan || ''}</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg"><School size={20} className="text-green-700" /></div>
            <div>
              <p className="text-xs text-gray-500">Profil</p>
              <p className="font-semibold text-gray-800">{profiles ? '✓ Lengkap' : 'Belum'}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg"><Edit3 size={20} className="text-blue-700" /></div>
            <div>
              <p className="text-xs text-gray-500">EDM Terisi</p>
              <p className="font-semibold text-gray-800">{edmProgress}/{totalIndicators} ({edmPercent}%)</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gold-50 rounded-lg"><BarChart3 size={20} className="text-amber-700" /></div>
            <div>
              <p className="text-xs text-gray-500">SKPM</p>
              <p className={`font-bold text-lg ${getSKPMColor(scores?.totalSKPM || 0)}`}>
                {scores ? Math.round(scores.totalSKPM) : '-'}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg"><TrendingUp size={20} className="text-purple-700" /></div>
            <div>
              <p className="text-xs text-gray-500">Kategori</p>
              <p className="font-semibold text-gray-800">{scores?.category || '-'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SKPM Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">SKPM per Aspek</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis domain={[0, 100]} fontSize={12} />
                <Tooltip formatter={(value) => [`${value}%`, 'SKPM']} />
                <Bar dataKey="SKPM" fill="#166534" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-400">Belum ada data EDM</div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Ringkasan Aspek</h3>
          <div className="space-y-3">
            {scores && Object.entries(scores.aspects).map(([key, val]) => (
              <div key={key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/madrasah/skor-edm')}>
                <div className={`w-2 h-10 rounded-full ${getSKPMBgColor(val.skpm)}`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">Aspek {key}: {aspectNames[key] || ''}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${getSKPMBgColor(val.skpm)}`} style={{ width: `${Math.min(val.skpm, 100)}%` }}></div>
                    </div>
                    <span className="text-xs font-semibold text-gray-600 w-10 text-right">{Math.round(val.skpm)}%</span>
                  </div>
                </div>
                <ArrowRight size={14} className="text-gray-300 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Akses Cepat</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: 'Profil', path: '/madrasah/profil', icon: School },
            { label: 'Isi EDM', path: '/madrasah/edm', icon: Edit3 },
            { label: 'Skor EDM', path: '/madrasah/skor-edm', icon: BarChart3 },
            { label: 'Rekomendasi', path: '/madrasah/rekomendasi', icon: AlertCircle },
            { label: 'Analisis', path: '/madrasah/analisis', icon: TrendingUp },
            { label: 'RKJM', path: '/madrasah/rkjm', icon: Calendar },
            { label: 'RKT', path: '/madrasah/rkt', icon: CheckCircle },
          ].map(item => (
            <button key={item.path} onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-green-50 hover:border-green-200 border border-transparent transition-all text-center">
              <item.icon size={24} className="text-green-700" />
              <span className="text-xs font-medium text-gray-700">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Summary Text */}
      {scores && (
        <div className="bg-gradient-to-r from-green-700 to-green-800 text-white rounded-xl p-6">
          <h3 className="font-semibold mb-2">Ringkasan EDM</h3>
          <p className="text-green-100 text-sm">
            SKPM madrasah saat ini <strong className="text-white">{Math.round(scores.totalSKPM)}%</strong> dengan kategori <strong className="text-white">{scores.category}</strong>.
            {edmProgress < totalIndicators && (
              <span> Masih ada <strong className="text-amber-300">{totalIndicators - edmProgress} indikator</strong> yang perlu diisi.</span>
            )}
            {edmProgress === totalIndicators && ' Semua indikator telah diisi. '}
            {scores.totalSKPM <= 60 && ' Perlu penyusunan program perbaikan prioritas dalam RKM.'}
          </p>
        </div>
      )}
    </div>
  );
}