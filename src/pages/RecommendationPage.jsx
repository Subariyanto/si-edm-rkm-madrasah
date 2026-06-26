import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getScores, calculateScores, getRecommendation } from '../services/scoringService';
import { getItem, setItem } from '../services/storageService';
import { getSKPMColor } from '../utils/formatters';
import { Lightbulb, CheckCircle2, AlertTriangle, ArrowUpRight, Save } from 'lucide-react';
import ConfirmModal from '../components/Modals/ConfirmModal';

export default function RecommendationPage() {
  const navigate = useNavigate();
  const [scores, setScores] = useState(null);
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = calculateScores();
    setScores(s);
    const recommendations = [];
    Object.entries(s.aspects).forEach(([key, val]) => {
      val.indicators.forEach(ind => {
        if (ind.answered) {
          const rec = getRecommendation(ind.tingkat);
          recommendations.push({ kode: ind.kode, aspek: key, pernyataan: ind.pernyataan, tingkat: ind.tingkat, recommendation: rec, priority: ind.tingkat <= 2 ? 'high' : ind.tingkat === 3 ? 'medium' : 'low' });
        }
      });
    });
    recommendations.sort((a, b) => a.tingkat - b.tingkat);
    setRecs(recommendations);
    setLoading(false);
  }, []);

  if (loading) return <div className="text-center py-12 text-gray-400">Memproses rekomendasi...</div>;

  const priorityColors = { high: 'bg-red-50 border-red-200', medium: 'bg-yellow-50 border-yellow-200', low: 'bg-green-50 border-green-200' };
  const priorityLabels = { high: 'Prioritas Utama', medium: 'Perlu Ditingkatkan', low: 'Dipertahankan' };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Rekomendasi</h1>
      <p className="text-gray-500 text-sm mb-6">Rekomendasi berdasarkan hasil EDM</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4"><p className="text-sm font-semibold text-red-700">{recs.filter(r=>r.priority==='high').length}</p><p className="text-xs text-red-600">Prioritas Utama</p></div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4"><p className="text-sm font-semibold text-yellow-700">{recs.filter(r=>r.priority==='medium').length}</p><p className="text-xs text-yellow-600">Perlu Ditingkatkan</p></div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4"><p className="text-sm font-semibold text-green-700">{recs.filter(r=>r.priority==='low').length}</p><p className="text-xs text-green-600">Dipertahankan</p></div>
      </div>

      <div className="space-y-3">
        {recs.map((rec, idx) => (
          <div key={rec.kode} className={`rounded-xl border p-4 ${priorityColors[rec.priority]}`}>
            <div className="flex items-start gap-3">
              {rec.priority === 'high' ? <AlertTriangle size={20} className="text-red-500 mt-1 flex-shrink-0" /> : rec.priority === 'medium' ? <ArrowUpRight size={20} className="text-yellow-500 mt-1 flex-shrink-0" /> : <CheckCircle2 size={20} className="text-green-500 mt-1 flex-shrink-0" />}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1"><span className="text-xs font-mono text-gray-500">{rec.kode}</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${rec.priority==='high'?'bg-red-100 text-red-700':rec.priority==='medium'?'bg-yellow-100 text-yellow-700':'bg-green-100 text-green-700'}`}>{priorityLabels[rec.priority]}</span></div>
                <p className="text-sm font-medium text-gray-800">{rec.pernyataan}</p>
                <p className="text-xs text-gray-500 mt-1">Tingkat tercapai: {rec.tingkat} dari 4</p>
                <p className="text-xs text-gray-600 mt-2 italic">{rec.recommendation.text}</p>
              </div>
            </div>
          </div>
        ))}
        {recs.length === 0 && <p className="text-center py-8 text-gray-400">Belum ada data EDM. Silakan isi EDM terlebih dahulu.</p>}
      </div>
    </div>
  );
}