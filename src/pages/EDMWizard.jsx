import { useState, useEffect } from 'react';
import { getEdmMaster } from '../services/scoringService';
import { getEdmAnswers, saveEdmAnswer } from '../services/scoringService';
import { getItem, setItem } from '../services/storageService';
import { edmIndicators } from '../data/edmIndicators';
import { edmIndicatorsPart2 } from '../data/edmIndicatorsPart2';
import {
  ChevronLeft, ChevronRight, Save, CheckCircle, AlertCircle,
  HelpCircle, FileText, Eye
} from 'lucide-react';

const ASPECK_ORDER = ['A', 'B', 'C', 'D', 'E'];

export default function EDMWizard() {
  const [master, setMaster] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notif, setNotif] = useState('');
  const [showPenciri, setShowPenciri] = useState(false);
  const [showBukti, setShowBukti] = useState(false);

  useEffect(() => {
    const stored = getEdmMaster().filter(i => i.active !== false);
    let data;
    if (stored.length === 0) {
      data = [...edmIndicators, ...edmIndicatorsPart2].filter(i => i.active !== false);
    } else {
      data = stored;
    }
    setMaster(data);
    setAnswers(getEdmAnswers());

    // Set initial index to first unanswered
    const ans = getEdmAnswers();
    const firstUnanswered = data.findIndex(ind => !ans[ind.kode]);
    if (firstUnanswered !== -1) setCurrentIndex(firstUnanswered);
  }, []);

  const showNotif = (msg) => { setNotif(msg); setTimeout(() => setNotif(''), 3000); };

  const indicator = master[currentIndex];

  if (!indicator) {
    return (
      <div className="text-center py-20">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Semua Indikator Selesai!</h2>
        <p className="text-gray-500">Anda telah mengisi semua 26 indikator EDM.</p>
      </div>
    );
  }

  const currentAnswer = answers[indicator.kode];
  const answeredCount = master.filter(ind => answers[ind.kode]).length;

  const handleAnswer = (tingkat) => {
    saveEdmAnswer(indicator.kode, { tingkat });
    setAnswers(prev => ({ ...prev, [indicator.kode]: { tingkat } }));
    showNotif(`Indikator ${indicator.kode} diisi: Level ${tingkat}`);

    // Auto-advance to next after brief delay
    if (currentIndex < master.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
    }
  };

  const next = () => { if (currentIndex < master.length - 1) setCurrentIndex(prev => prev + 1); };
  const prev = () => { if (currentIndex > 0) setCurrentIndex(prev => prev - 1); };

  // Group indicators by aspek for the sidebar
  const grouped = ASPECK_ORDER.map(aspek => ({
    aspek: `${aspek}. ${master.find(i => i.aspek?.charAt(0) === aspek)?.aspek || ''}`,
    letter: aspek,
    indicators: master.filter(i => i.aspek?.charAt(0) === aspek)
  }));

  const levelColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  const levelLabels = ['Level 1 - Sangat Kurang', 'Level 2 - Kurang', 'Level 3 - Baik', 'Level 4 - Sangat Baik'];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pengisian EDM</h1>
          <p className="text-gray-500 text-sm">Isi Evaluasi Diri Madrasah per indikator ({answeredCount}/{master.length})</p>
        </div>
      </div>

      {notif && <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">{notif}</div>}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar indicator list */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-4 max-h-[80vh] overflow-y-auto">
            <h4 className="font-semibold text-gray-700 text-sm mb-3">Daftar Indikator</h4>
            {grouped.map(group => (
              <div key={group.letter} className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{group.letter}</p>
                <div className="space-y-0.5">
                  {group.indicators.map((ind, idx) => {
                    const indIdx = master.findIndex(m => m.kode === ind.kode);
                    const answered = !!answers[ind.kode];
                    const isActive = indIdx === currentIndex;
                    return (
                      <button
                        key={ind.kode}
                        onClick={() => setCurrentIndex(indIdx)}
                        className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center gap-2 transition-colors ${
                          isActive ? 'bg-green-100 text-green-800 font-medium' :
                          answered ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${answered ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        <span className="truncate">{ind.kode}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Indicator header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
            <div className="flex items-start gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${currentAnswer ? 'bg-green-600' : 'bg-gray-400'}`}>
                {indicator.kode}
              </span>
              <div className="flex-1">
                <p className="text-xs text-gray-400 uppercase">{indicator.aspek}</p>
                <h2 className="text-lg font-semibold text-gray-800 mt-0.5">{indicator.pernyataan}</h2>
                <div className="flex gap-3 mt-2 text-xs text-gray-500">
                  <span>SNP: {indicator.snp}</span>
                  <span>Bobot: {indicator.bobot || 3}</span>
                </div>
              </div>
            </div>

            {/* Current selection indicator */}
            {currentAnswer && (
              <div className={`p-3 rounded-lg mb-4 ${levelColors[currentAnswer.tingkat - 1]} bg-opacity-10 border ${levelColors[currentAnswer.tingkat - 1].replace('bg-', 'border-')} border-opacity-30`}>
                <p className="text-sm font-medium">Terpilih: <strong>{levelLabels[currentAnswer.tingkat - 1]}</strong></p>
              </div>
            )}

            {/* Level Selection */}
            <div className="grid grid-cols-1 gap-3 mb-4">
              {indicator.penciri?.map((p, idx) => (
                <button
                  key={p.level}
                  onClick={() => handleAnswer(p.level)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${
                    currentAnswer?.tingkat === p.level
                      ? 'border-green-500 bg-green-50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${levelColors[idx]}`}>
                      {p.level}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 mb-1">{levelLabels[idx]}</p>
                      <p className="text-sm text-gray-600">{p.text}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Info toggles */}
            <div className="flex gap-2 mb-0">
              <button onClick={() => setShowBukti(!showBukti)} className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                <FileText size={14} /> Contoh Bukti
              </button>
              <button onClick={() => setShowPenciri(!showPenciri)} className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                <HelpCircle size={14} /> Template Rekomendasi
              </button>
            </div>

            {showBukti && indicator.contohBukti && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs font-semibold text-blue-700 mb-2">Contoh Bukti:</p>
                <ul className="list-disc list-inside text-xs text-blue-800 space-y-1">
                  {indicator.contohBukti.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            )}

            {showPenciri && indicator.templateRekomendasi && (
              <div className="mt-3 p-3 bg-amber-50 rounded-lg">
                <p className="text-xs font-semibold text-amber-700 mb-2">Template Rekomendasi:</p>
                <ul className="list-disc list-inside text-xs text-amber-800 space-y-1">
                  {indicator.templateRekomendasi.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <button onClick={prev} disabled={currentIndex === 0}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm ${currentIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}>
              <ChevronLeft size={18} /> Sebelumnya
            </button>

            <div className="text-sm text-gray-500">
              {currentIndex + 1} / {master.length}
            </div>

            <button onClick={next} disabled={currentIndex === master.length - 1}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm ${
                currentIndex === master.length - 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'bg-green-700 text-white hover:bg-green-800'
              }`}>
              Selanjutnya <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}