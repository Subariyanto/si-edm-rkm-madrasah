import { useState, useEffect } from 'react';
import { getItem, setItem } from '../services/storageService';
import { calculateScores, getRecommendation } from '../services/scoringService';
import { Plus, Trash2, Save, Download, Edit3, X, Check } from 'lucide-react';

const DEFAULT_ITEM = { nomor: '', sumber: '', aspek: '', sasaran: '', program: '', kegiatan: '', indikator: '', penanggungJawab: '', tahun1: false, tahun2: false, tahun3: false, tahun4: false, biayaPerTahun: '', totalBiaya: '', sumberDana: '', keterangan: '' };

export default function RKJMPage() {
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({...DEFAULT_ITEM});
  const [showForm, setShowForm] = useState(false);
  const [notif, setNotif] = useState('');

  useEffect(() => {
    const saved = getItem('rkjm');
    if (saved && Array.isArray(saved)) setItems(saved);
    else {
      const scores = calculateScores();
      const initial = [];
      Object.entries(scores.aspects).forEach(([key, val]) => {
        val.indicators.filter(i=>i.answered&&i.tingkat<=3).forEach(ind => {
          initial.push({...DEFAULT_ITEM, id: Date.now()+Math.random().toString(), sumber: `EDM ${ind.kode}`, aspek: key, sasaran: ind.pernyataan, program: `Peningkatan ${key==='A'?'Kedisiplinan':key==='B'?'Pengembangan GTK':key==='C'?'Pembelajaran':key==='D'?'Sarana':'Pembiayaan'}`, prioritas: ind.tingkat<=2?'Tinggi':'Sedang'});
        });
      });
      setItems(initial);
    }
  }, []);

  const addItem = () => {
    if (!form.sasaran.trim()) return;
    const newItem = { ...form, id: editId || Date.now().toString(), totalBiaya: form.totalBiaya || (Number(form.biayaPerTahun||0) * [form.tahun1,form.tahun2,form.tahun3,form.tahun4].filter(Boolean).length).toString() };
    if (editId) { setItems(items.map(i => i.id===editId ? newItem : i)); setEditId(null); }
    else setItems([...items, newItem]);
    setForm({...DEFAULT_ITEM}); setShowForm(false); setNotif(editId?'Item diperbarui':'Item ditambahkan');
    setTimeout(()=>setNotif(''),3000);
  };

  const removeItem = (id) => { setItems(items.filter(i=>i.id!==id)); setNotif('Item dihapus'); setTimeout(()=>setNotif(''),3000); };
  const editItem = (item) => { setForm(item); setEditId(item.id); setShowForm(true); };
  const save = () => { setItem('rkjm', items); setNotif('RKJM disimpan!'); setTimeout(()=>setNotif(''),3000); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold text-gray-800">RKJM 4 Tahun</h1><div className="flex gap-2"><button onClick={()=>{setForm({...DEFAULT_ITEM});setEditId(null);setShowForm(true)}} className="flex items-center gap-1 px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800"><Plus size={16}/> Tambah</button><button onClick={save} className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"><Save size={16}/> Simpan</button></div></div>
      {notif && <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">{notif}</div>}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-xs"><thead className="bg-gray-50 border-b"><tr><th className="py-3 px-2 text-left">No</th><th className="py-3 px-2 text-left">Sumber</th><th className="py-3 px-2 text-left">Aspek</th><th className="py-3 px-2 text-left w-32">Sasaran</th><th className="py-3 px-2 text-left w-32">Program</th><th className="py-3 px-2 text-left w-32">Kegiatan</th><th className="py-3 px-2 text-left w-24">Indikator</th><th className="py-3 px-2 text-left">PJ</th><th className="py-3 px-1 text-center">Th1</th><th className="py-3 px-1 text-center">Th2</th><th className="py-3 px-1 text-center">Th3</th><th className="py-3 px-1 text-center">Th4</th><th className="py-3 px-2">Biaya/Thn</th><th className="py-3 px-2">Total</th><th className="py-3 px-2">Dana</th><th className="py-3 px-2"></th></tr></thead><tbody>
        {items.length===0 ? <tr><td colSpan={16} className="py-8 text-center text-gray-400">Belum ada program RKJM</td></tr> : items.map((item,i) => (
          <tr key={item.id} className="border-b hover:bg-gray-50">
            <td className="py-2 px-2">{i+1}</td><td className="py-2 px-2 text-xs">{item.sumber}</td><td className="py-2 px-2">{item.aspek}</td><td className="py-2 px-2">{item.sasaran}</td><td className="py-2 px-2">{item.program}</td><td className="py-2 px-2">{item.kegiatan}</td><td className="py-2 px-2">{item.indikator}</td><td className="py-2 px-2">{item.penanggungJawab}</td>
            <td className="py-2 px-1 text-center">{item.tahun1 && <Check size={14} className="text-green-600 mx-auto"/>}</td><td className="py-2 px-1 text-center">{item.tahun2 && <Check size={14} className="text-green-600 mx-auto"/>}</td><td className="py-2 px-1 text-center">{item.tahun3 && <Check size={14} className="text-green-600 mx-auto"/>}</td><td className="py-2 px-1 text-center">{item.tahun4 && <Check size={14} className="text-green-600 mx-auto"/>}</td>
            <td className="py-2 px-2">{item.biayaPerTahun ? `Rp${Number(item.biayaPerTahun).toLocaleString('id-ID')}`:'-'}</td><td className="py-2 px-2">{item.totalBiaya ? `Rp${Number(item.totalBiaya).toLocaleString('id-ID')}`:'-'}</td><td className="py-2 px-2">{item.sumberDana||'-'}</td>
            <td className="py-2 px-2"><div className="flex gap-1"><button onClick={()=>editItem(item)} className="p-1 hover:bg-gray-100 rounded"><Edit3 size={12}/></button><button onClick={()=>removeItem(item.id)} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={12}/></button></div></td>
          </tr>
        ))}</tbody></table></div></div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b"><h3 className="text-lg font-semibold">{editId?'Edit':'Tambah'} Program RKJM</h3><button onClick={()=>{setShowForm(false);setEditId(null)}} className="text-gray-400 hover:text-gray-600"><X size={20}/></button></div>
            <div className="px-6 py-4 space-y-3">
              <div className="grid grid-cols-3 gap-3"><div><label className="block text-xs font-medium text-gray-600 mb-1">Sumber</label><input value={form.sumber} onChange={e=>setForm({...form,sumber:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div><div><label className="block text-xs font-medium text-gray-600 mb-1">Aspek</label><select value={form.aspek} onChange={e=>setForm({...form,aspek:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"><option value="">-</option><option>A</option><option>B</option><option>C</option><option>D</option><option>E</option></select></div><div><label className="block text-xs font-medium text-gray-600 mb-1">Penanggung Jawab</label><input value={form.penanggungJawab} onChange={e=>setForm({...form,penanggungJawab:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Sasaran *</label><textarea value={form.sasaran} onChange={e=>setForm({...form,sasaran:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" rows={2}/></div>
              <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-medium text-gray-600 mb-1">Program</label><input value={form.program} onChange={e=>setForm({...form,program:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div><div><label className="block text-xs font-medium text-gray-600 mb-1">Kegiatan</label><input value={form.kegiatan} onChange={e=>setForm({...form,kegiatan:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Indikator Keberhasilan</label><input value={form.indikator} onChange={e=>setForm({...form,indikator:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Tahun Pelaksanaan</label>
                <div className="flex gap-4">
                  {[1,2,3,4].map(t => <label key={t} className="flex items-center gap-1 text-sm"><input type="checkbox" checked={form[`tahun${t}`]} onChange={e=>setForm({...form,[`tahun${t}`]:e.target.checked})}/> Tahun {t}</label>)}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3"><div><label className="block text-xs font-medium text-gray-600 mb-1">Biaya/Tahun (Rp)</label><input type="number" value={form.biayaPerTahun} onChange={e=>setForm({...form,biayaPerTahun:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div><div><label className="block text-xs font-medium text-gray-600 mb-1">Sumber Dana</label><input value={form.sumberDana} onChange={e=>setForm({...form,sumberDana:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="BOS"/></div><div><label className="block text-xs font-medium text-gray-600 mb-1">Keterangan</label><input value={form.keterangan} onChange={e=>setForm({...form,keterangan:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div></div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-xl"><button onClick={()=>{setShowForm(false);setEditId(null)}} className="px-4 py-2 border rounded-lg text-sm">Batal</button><button onClick={addItem} className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800">{editId?'Update':'Tambah'}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}