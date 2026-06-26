import { useState, useEffect } from 'react';
import { getItem, setItem } from '../services/storageService';
import { Plus, Trash2, Save, Edit3, X, Check } from 'lucide-react';

const DEFAULT_ITEM = { kategori: 'Strategis', sasaran: '', program: '', kegiatan: '', indikator: '', penanggungJawab: '', jadwalAwal: '', jadwalAkhir: '', anggaran: '', sumberDana: '' };

export default function RKTPage() {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({...DEFAULT_ITEM});
  const [showForm, setShowForm] = useState(false);
  const [notif, setNotif] = useState('');

  const storageKey = `rkt_${year}`;

  useEffect(() => { const s = getItem(storageKey); if(s&&Array.isArray(s)) setItems(s); else setItems([]); }, [year]);

  const addItem = () => {
    if(!form.kegiatan.trim()) return;
    const newItem = {...form, id: editId || Date.now().toString()};
    let updated;
    if(editId) { updated = items.map(i=>i.id===editId?newItem:i); setEditId(null); }
    else updated = [...items, newItem];
    setItems(updated); setItem(storageKey, updated);
    setForm({...DEFAULT_ITEM}); setShowForm(false); setNotif(editId?'Item diperbarui':'Item ditambahkan');
    setTimeout(()=>setNotif(''),3000);
  };

  const removeItem = (id) => { const f = items.filter(i=>i.id!==id); setItems(f); setItem(storageKey, f); };
  const editItem = (i) => { setForm(i); setEditId(i.id); setShowForm(true); };

  // Auto-pull from RKJM
  const pullFromRKJM = () => {
    const rkjm = getItem('rkjm') || [];
    const yearNum = parseInt(year) % 10;
    const yearKey = `tahun${yearNum < 1 || yearNum > 4 ? 1 : yearNum}`;
    const newItems = rkjm.filter(r=>r[yearKey]).map(r=>({...DEFAULT_ITEM, id: Date.now()+Math.random().toString(), kategori:'Strategis',sasaran:r.sasaran,program:r.program,kegiatan:r.kegiatan,indikator:r.indikator,penanggungJawab:r.penanggungJawab,anggaran:r.biayaPerTahun,sumberDana:r.sumberDana}));
    const merged = [...items, ...newItems];
    setItems(merged); setItem(storageKey, merged);
    setNotif(`${newItems.length} item ditarik dari RKJM`);
    setTimeout(()=>setNotif(''),3000);
  };

  const totalAnggaran = items.reduce((s,i)=>s+Number(i.anggaran||0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-800">RKT Tahunan</h1><p className="text-gray-500 text-sm">Rencana Kerja Tahunan Madrasah</p></div>
        <div className="flex items-center gap-2">
          <select value={year} onChange={e=>setYear(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            {[0,1,2,3,4,5].map(i=>{const y=new Date().getFullYear()+i;return <option key={y} value={y}>{y}</option>})}
          </select>
        </div>
      </div>

      {notif && <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">{notif}</div>}

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={()=>{setForm({...DEFAULT_ITEM});setEditId(null);setShowForm(true)}} className="flex items-center gap-1 px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800"><Plus size={16}/> Tambah</button>
        <button onClick={pullFromRKJM} className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">Tarik dari RKJM</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
        <div className="flex justify-between text-sm"><span className="text-gray-600">Total Item: {items.length}</span><span className="font-semibold text-green-700">Total Anggaran: Rp{totalAnggaran.toLocaleString('id-ID')}</span></div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-xs"><thead className="bg-gray-50 border-b"><tr><th className="py-3 px-2 text-left">No</th><th className="py-3 px-2 text-left">Kategori</th><th className="py-3 px-2 text-left w-24">Sasaran</th><th className="py-3 px-2 text-left w-24">Program</th><th className="py-3 px-2 text-left w-28">Kegiatan</th><th className="py-3 px-2 text-left w-20">Indikator</th><th className="py-3 px-2 text-left">PJ</th><th className="py-3 px-2">Jadwal</th><th className="py-3 px-2">Anggaran</th><th className="py-3 px-2">Sumber</th><th className="py-3 px-2"></th></tr></thead><tbody>
        {items.length===0 ? <tr><td colSpan={11} className="py-8 text-center text-gray-400">Belum ada item RKT</td></tr> : items.map((item,i)=>(
          <tr key={item.id} className="border-b hover:bg-gray-50">
            <td className="py-2 px-2">{i+1}</td><td className="py-2 px-2"><span className={`px-2 py-0.5 rounded text-xs ${item.kategori==='Strategis'?'bg-purple-100 text-purple-700':'bg-gray-100 text-gray-700'}`}>{item.kategori}</span></td><td className="py-2 px-2">{item.sasaran}</td><td className="py-2 px-2">{item.program}</td><td className="py-2 px-2">{item.kegiatan}</td><td className="py-2 px-2">{item.indikator}</td><td className="py-2 px-2">{item.penanggungJawab}</td>
            <td className="py-2 px-2 text-xs">{item.jadwalAwal&&item.jadwalAkhir?`${item.jadwalAwal} - ${item.jadwalAkhir}`:item.jadwalAwal||'-'}</td>
            <td className="py-2 px-2">{item.anggaran?`Rp${Number(item.anggaran).toLocaleString('id-ID')}`:'-'}</td><td className="py-2 px-2">{item.sumberDana||'-'}</td>
            <td className="py-2 px-2"><div className="flex gap-1"><button onClick={()=>editItem(item)} className="p-1 hover:bg-gray-100 rounded"><Edit3 size={12}/></button><button onClick={()=>removeItem(item.id)} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={12}/></button></div></td>
          </tr>
        ))}</tbody></table></div></div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b"><h3 className="text-lg font-semibold">{editId?'Edit':'Tambah'} Item RKT</h3><button onClick={()=>{setShowForm(false);setEditId(null)}} className="text-gray-400 hover:text-gray-600"><X size={20}/></button></div>
            <div className="px-6 py-4 space-y-3">
              <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-medium text-gray-600 mb-1">Kategori</label><select value={form.kategori} onChange={e=>setForm({...form,kategori:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"><option>Strategis</option><option>Rutin</option></select></div><div><label className="block text-xs font-medium text-gray-600 mb-1">Penanggung Jawab</label><input value={form.penanggungJawab} onChange={e=>setForm({...form,penanggungJawab:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Sasaran</label><textarea value={form.sasaran} onChange={e=>setForm({...form,sasaran:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" rows={2}/></div>
              <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-medium text-gray-600 mb-1">Program</label><input value={form.program} onChange={e=>setForm({...form,program:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div><div><label className="block text-xs font-medium text-gray-600 mb-1">Kegiatan *</label><input value={form.kegiatan} onChange={e=>setForm({...form,kegiatan:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Indikator Keberhasilan</label><input value={form.indikator} onChange={e=>setForm({...form,indikator:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div>
              <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-medium text-gray-600 mb-1">Jadwal Mulai</label><input type="date" value={form.jadwalAwal} onChange={e=>setForm({...form,jadwalAwal:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div><div><label className="block text-xs font-medium text-gray-600 mb-1">Jadwal Akhir</label><input type="date" value={form.jadwalAkhir} onChange={e=>setForm({...form,jadwalAkhir:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div></div>
              <div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-medium text-gray-600 mb-1">Anggaran (Rp)</label><input type="number" value={form.anggaran} onChange={e=>setForm({...form,anggaran:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div><div><label className="block text-xs font-medium text-gray-600 mb-1">Sumber Dana</label><input value={form.sumberDana} onChange={e=>setForm({...form,sumberDana:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="BOS/Komite/Bantuan"/></div></div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-xl"><button onClick={()=>{setShowForm(false);setEditId(null)}} className="px-4 py-2 border rounded-lg text-sm">Batal</button><button onClick={addItem} className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800">{editId?'Update':'Tambah'}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}