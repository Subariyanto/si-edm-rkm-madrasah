import { useState } from 'react';
import { getItem, setItem } from '../services/storageService';

export default function JadwalKegiatan() {
  const [schedule, setSchedule] = useState(getItem('jadwal_kegiatan') || []);
  const [form, setForm] = useState({ kegiatan: '', pelaksana: '', waktu: '', tempat: '', status: 'Rencana' });

  const add = () => { if(!form.kegiatan.trim()) return; setSchedule([...schedule,{...form,id:Date.now().toString()}]); setItem('jadwal_kegiatan',[...schedule,{...form,id:Date.now().toString()}]); setForm({kegiatan:'',pelaksana:'',waktu:'',tempat:'',status:'Rencana'}); };
  const remove = (id) => { const f = schedule.filter(s=>s.id!==id); setSchedule(f); setItem('jadwal_kegiatan',f); };

  const statusColors = { Rencana: 'bg-blue-100 text-blue-700', Berjalan: 'bg-yellow-100 text-yellow-700', Selesai: 'bg-green-100 text-green-700' };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Jadwal Kegiatan</h1>
      <p className="text-gray-500 text-sm mb-6">Penjadwalan kegiatan madrasah tahunan</p>
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Tambah Kegiatan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Nama Kegiatan *</label><input value={form.kegiatan} onChange={e=>setForm({...form,kegiatan:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Pelaksana</label><input value={form.pelaksana} onChange={e=>setForm({...form,pelaksana:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Waktu</label><input type="date" value={form.waktu} onChange={e=>setForm({...form,waktu:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Tempat</label><input value={form.tempat} onChange={e=>setForm({...form,tempat:e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"/></div>
        </div>
        <button onClick={add} className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800">Tambah</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-gray-50 border-b"><tr><th className="py-3 px-4 text-left">No</th><th className="py-3 px-4 text-left">Kegiatan</th><th className="py-3 px-4 text-left">Pelaksana</th><th className="py-3 px-4 text-left">Waktu</th><th className="py-3 px-4 text-left">Tempat</th><th className="py-3 px-4 text-left">Status</th><th className="py-3 px-4"></th></tr></thead><tbody>
        {schedule.length===0 ? <tr><td colSpan={7} className="py-8 text-center text-gray-400">Belum ada jadwal</td></tr> : schedule.map((s,i)=>(<tr key={s.id} className="border-b hover:bg-gray-50"><td className="py-3 px-4">{i+1}</td><td className="py-3 px-4">{s.kegiatan}</td><td className="py-3 px-4">{s.pelaksana}</td><td className="py-3 px-4">{s.waktu}</td><td className="py-3 px-4">{s.tempat}</td><td className="py-3 px-4"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[s.status]}`}>{s.status}</span></td><td className="py-3 px-4"><button onClick={()=>remove(s.id)} className="text-red-500 text-sm hover:underline">Hapus</button></td></tr>))}
      </tbody></table></div></div>
    </div>
  );
}