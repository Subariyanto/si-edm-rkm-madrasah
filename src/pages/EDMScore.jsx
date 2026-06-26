import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getScores, calculateScores, getEdmAnswers, getRecommendation } from '../services/scoringService';
import { getSKPMColor, getSKPMBgColor, formatPercent } from '../utils/formatters';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const aspectNames = { A: 'Budaya Kedisiplinan Warga Madrasah', B: 'Budaya Pengembangan Diri GTK', C: 'Proses Pembelajaran', D: 'Materi dan Sarana Pembelajaran', E: 'Pembiayaan' };

export default function EDMScore() {
  const navigate = useNavigate();
  const [scores, setScores] = useState(null);
  useEffect(() => setScores(calculateScores()), []);

  if (!scores) return <div className="text-center py-12 text-gray-400">Menghitung skor...</div>;

  const chartData = Object.entries(scores.aspects).map(([key, val]) => ({ name: `Aspek ${key}`, SKPM: Math.round(val.skpm), STM: Math.round(val.totalSTM), SPT: Math.round(val.totalSPT) }));
  const radarData = Object.entries(scores.aspects).map(([key, val]) => ({ aspek: `Aspek ${key}`, skpm: Math.round(val.skpm), max: 100 }));
  const totalJawaban = Object.keys(getEdmAnswers()).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Skor EDM</h1>
      <p className="text-gray-500 text-sm mb-6">Hasil Evaluasi Diri Madrasah</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Terjawab</p><p className="text-xl font-bold text-green-700">{totalJawaban}/26</p></div>
        <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Total STM</p><p className="text-xl font-bold text-blue-700">{Math.round(Object.values(scores.aspects).reduce((a,b)=>a+b.totalSTM,0))}</p></div>
        <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">Total SPT</p><p className="text-xl font-bold text-amber-700">{Math.round(Object.values(scores.aspects).reduce((a,b)=>a+b.totalSPT,0))}</p></div>
        <div className="bg-white rounded-xl shadow-sm border p-4"><p className="text-xs text-gray-500">SKPM Madrasah</p><p className={`text-xl font-bold ${getSKPMColor(scores.totalSKPM)}`}>{Math.round(scores.totalSKPM)}%</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-semibold text-gray-800 mb-4">SKPM per Aspek</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} barSize={50}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" fontSize={12} /><YAxis domain={[0, 100]} fontSize={12} /><Tooltip formatter={v => [`${v}%`, 'SKPM']} /><Bar dataKey="SKPM" fill="#166534" radius={[4,4,0,0]} /></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Detail per Aspek</h3>
          <div className="space-y-4">
            {Object.entries(scores.aspects).map(([key, val]) => (
              <div key={key} className="cursor-pointer" onClick={() => { const el = document.getElementById(`aspek-${key}`); el?.scrollIntoView({behavior:'smooth'}); }}>
                <div className="flex items-center justify-between mb-1"><span className="text-sm font-medium">Aspek {key}</span><span className={`text-sm font-bold ${getSKPMColor(val.skpm)}`}>{Math.round(val.skpm)}%</span></div>
                <div className="w-full bg-gray-200 rounded-full h-3"><div className={`h-3 rounded-full ${getSKPMBgColor(val.skpm)}`} style={{width:`${Math.min(val.skpm,100)}%`}}></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {Object.entries(scores.aspects).map(([key, val]) => (
        <div key={key} id={`aspek-${key}`} className="bg-white rounded-xl shadow-sm border p-6 mb-4">
          <h3 className="font-semibold text-gray-800 mb-3">Aspek {key}: {aspectNames[key]}</h3>
          <div className="flex items-center gap-4 mb-4 text-sm"><span>SPT: {Math.round(val.totalSPT)}</span><span>STM: {Math.round(val.totalSTM)}</span><span className={`font-bold ${getSKPMColor(val.skpm)}`}>SKPM: {Math.round(val.skpm)}%</span></div>
          <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-gray-600"><th className="py-2">Kode</th><th className="py-2">Pernyataan</th><th className="py-2">Bobot</th><th className="py-2">Tingkat</th><th className="py-2">SPT</th><th className="py-2">STM</th><th className="py-2">Rekomendasi</th></tr></thead><tbody>
            {val.indicators.map(ind => { const rec = getRecommendation(ind.tingkat); return (
              <tr key={ind.kode} className="border-b hover:bg-gray-50"><td className="py-2 font-mono text-xs">{ind.kode}</td><td className="py-2">{ind.pernyataan}</td><td className="py-2 text-center">{ind.bobot}</td><td className="py-2 text-center"><span className={`px-2 py-0.5 rounded text-xs font-medium ${ind.tingkat>=4?'bg-green-100 text-green-700':ind.tingkat>=3?'bg-yellow-100 text-yellow-700':ind.answered?'bg-red-100 text-red-700':'bg-gray-100 text-gray-400'}`}>{ind.answered ? ind.tingkat : '-'}</span></td><td className="py-2 text-center">{ind.spt}</td><td className="py-2 text-center">{ind.stm}</td><td className="py-2"><span className={`text-xs px-2 py-0.5 rounded ${rec.color==='red'?'bg-red-50 text-red-700':rec.color==='yellow'?'bg-yellow-50 text-yellow-700':'bg-green-50 text-green-700'}`}>{rec.text}</span></td></tr>
            );})}
          </tbody></table></div>
        </div>
      ))}

      <div className="bg-gradient-to-r from-green-700 to-green-800 text-white rounded-xl p-6 mt-6">
        <h3 className="font-semibold mb-2">Kesimpulan</h3>
        <p>SKPM Madrasah: <strong>{Math.round(scores.totalSKPM)}%</strong> — Kategori: <strong>{scores.category}</strong></p>
        <p className="text-green-100 text-sm mt-1">SKPM = (Total SPT / Total STM) × 100, di mana SPT = tingkat × bobot dan STM = 4 × bobot</p>
      </div>
    </div>
  );
}