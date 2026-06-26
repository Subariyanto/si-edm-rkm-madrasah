import { useState, useEffect } from 'react';
import { getItem, setItem } from '../services/storageService';
import { calculateScores, getRecommendation } from '../services/scoringService';
import { Plus, Trash2, Save, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProblemAnalysis() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ sumber: '', aspek: '', masalah: '', akarMasalah: '', dampak: '', prioritas: 'Tinggi' });

  useEffect(() => {
    const saved = getItem('analisis_masalah');
    if (saved && Array.isArray(saved)) setData(saved);
    else {
      const scores = calculateScores();
      const initial = [];
      Object.entries(scores.aspects).forEach(([key, val]) => {
        val.indicators.forEach(ind => {
          if (ind.answered && ind.tingkat <= 3) {
            initial.push({ id: Date.now()+Math.random(), sumber: `EDM ${ind.kode}`, aspek: key, masalah: ind.pernyataan, akarMasalah: `Tingkat pencapaian ${ind.tingkat}/4 - perlu analisis lebih lanjut`, dampak: 'Mempengaruhi mutu pembelajaran', prioritas: ind.tingkat <= 2 ? 'Tinggi' : 'Sedang' });
          }
        });
      });
      setData(initial);
    }
  }, []);

  const addAnalysis = () => {
    if (!form.masalah.trim()) return;
    setData([...data, { ...form, id: Date.now().toString() }]);
    setForm({ sumber: '', aspek: '', masalah: '', akarMasalah: '', dampak: '', prioritas: 'Tinggi' });
  };

  const removeAnalysis = (id) => setData(data.filter(d => d.id !== id));

  const saveAnalysis = () => { setItem('analisis_masalah', data); alert('Analisis masalah disimpan!'); };

  const priorities = { Tinggi: 'bg-red-100 text-red-700', Sedang: 'bg-yellow-100 text-yellow-700', Rendah: 'bg-green-100 text-green-700' };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Analisis Masalah</h1>
      <p className="text-gray-500 text-sm mb-6">Identifikasi akar masalah dan prioritas perbaikan</p>

      {/* Add Form */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Tambah Analisis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Sumber</label><input value={form.sumber} onChange={e=>setForm({...form,sumber:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="EDM A.1 / Lainnya" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Aspek</label><select value={form.aspek} onChange={e=>setForm({...form,aspek:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"><option value="">Pilih</option><option value="A">A - Kedisiplinan</option><option value="B">B - Pengembangan GTK</option><option value="C">C - Pembelajaran</option><option value="D">D - Sarana</option><option value="E">E - Pembiayaan</option></select></div>
        </div>
        <div className="mb-3"><label className="block text-xs font-medium text-gray-600 mb-1">Masalah</label><input value={form.masalah} onChange={e=>setForm({...form,masalah:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Akar Masalah</label><input value={form.akarMasalah} onChange={e=>setForm({...form,akarMasalah:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Dampak</label><input value={form.dampak} onChange={e=>setForm({...form,dampak:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
        </div>
        <div className="flex items-center gap-3">
          <select value={form.prioritas} onChange={e=>setForm({...form,prioritas:e.target.value})} className="px-3 py-2 border rounded-lg text-sm"><option>Tinggi</option><option>Sedang</option><option>Rendah</option></select>
          <button onClick={addAnalysis} className="flex items-center gap-1 px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800"><Plus size={16} /> Tambah</button>
          <button onClick={saveAnalysis} className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"><Save size={16} /> Simpan Semua</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr><th className="py-3 px-4 text-left">No</th><th className="py-3 px-4 text-left">Sumber</th><th className="py-3 px-4 text-left">Aspek</th><th className="py-3 px-4 text-left">Masalah</th><th className="py-3 px-4 text-left">Akar Masalah</th><th className="py-3 px-4 text-left">Dampak</th><th className="py-3 px-4 text-left">Prioritas</th><th className="py-3 px-4"></th></tr></thead>
            <tbody>
              {data.length === 0 ? <tr><td colSpan={8} className="py-8 text-center text-gray-400">Belum ada analisis masalah</td></tr>
              : data.map((d, i) => (
                <tr key={d.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{i+1}</td><td className="py-3 px-4">{d.sumber}</td><td className="py-3 px-4">{d.aspek}</td><td className="py-3 px-4">{d.masalah}</td><td className="py-3 px-4">{d.akarMasalah}</td><td className="py-3 px-4">{d.dampak}</td>
                  <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorities[d.prioritas] || ''}`}>{d.prioritas}</span></td>
                  <td className="py-3 px-4"><button onClick={()=>removeAnalysis(d.id)} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}