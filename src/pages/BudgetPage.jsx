import { useState, useEffect } from 'react';
import { getItem, setItem } from '../services/storageService';
import { Plus, Trash2, Save, Edit3, X } from 'lucide-react';

const CATEGORIES = { income: ['BOS/BOP', 'Komite', 'Yayasan', 'Pemda', 'Bantuan Lain', 'Sumber Lain'], expense: ['Program/Kegiatan RKT', 'Rutin', 'Pengembangan', 'Sarana Prasarana', 'Pembelajaran', 'Kegiatan Siswa', 'Lainnya'] };

export default function BudgetPage() {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [notif, setNotif] = useState('');
  const budgetKey = `anggaran_${year}`;

  useEffect(() => {
    const saved = getItem(budgetKey);
    if(saved) { setIncome(saved.income||[]); setExpense(saved.expense||[]); }
    else { setIncome([]); setExpense([]); }
  }, [year]);

  const addRow = (type) => {
    if (type === 'income') setIncome([...income, { id: Date.now().toString(), sumber: '', jumlah: '', keterangan: '' }]);
    else setExpense([...expense, { id: Date.now().toString(), kategori: '', uraian: '', jumlah: '', keterangan: '' }]);
  };

  const updateRow = (type, id, field, value) => {
    const setter = type==='income'?setIncome:setExpense;
    const items = type==='income'?[...income]:[...expense];
    const idx = items.findIndex(i=>i.id===id);
    if(idx!==-1){ items[idx]={...items[idx],[field]:value}; setter(items); }
  };

  const removeRow = (type, id) => {
    if(type==='income') setIncome(income.filter(i=>i.id!==id));
    else setExpense(expense.filter(i=>i.id!==id));
  };

  const save = () => { setItem(budgetKey, { income, expense }); setNotif('Anggaran disimpan!'); setTimeout(()=>setNotif(''),3000); };

  const totalIncome = income.reduce((s,i)=>s+Number(i.jumlah||0),0);
  const totalExpense = expense.reduce((s,i)=>s+Number(i.jumlah||0),0);
  const saldo = totalIncome - totalExpense;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-800">Rencana Anggaran</h1><p className="text-gray-500 text-sm">RKAM Madrasah</p></div>
        <select value={year} onChange={e=>setYear(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
          {[0,1,2,3,4,5].map(i=>{const y=new Date().getFullYear()+i;return <option key={y} value={y}>{y}</option>})}
        </select>
      </div>

      {notif && <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">{notif}</div>}

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4"><p className="text-xs text-blue-600">Total Pemasukan</p><p className="text-xl font-bold text-blue-700">Rp{totalIncome.toLocaleString('id-ID')}</p></div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4"><p className="text-xs text-orange-600">Total Pengeluaran</p><p className="text-xl font-bold text-orange-700">Rp{totalExpense.toLocaleString('id-ID')}</p></div>
        <div className={`border rounded-xl p-4 ${saldo>=0?'bg-green-50 border-green-200':'bg-red-50 border-red-200'}`}><p className={`text-xs ${saldo>=0?'text-green-600':'text-red-600'}`}>Saldo</p><p className={`text-xl font-bold ${saldo>=0?'text-green-700':'text-red-700'}`}>Rp{saldo.toLocaleString('id-ID')}</p></div>
      </div>

      {/* Income */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-gray-800">Pemasukan</h3><button onClick={()=>addRow('income')} className="flex items-center gap-1 px-3 py-1.5 bg-green-700 text-white rounded-lg text-xs hover:bg-green-800"><Plus size={14}/> Tambah</button></div>
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-gray-600"><th className="py-2">Sumber Dana</th><th className="py-2">Jumlah (Rp)</th><th className="py-2">Keterangan</th><th className="py-2 w-10"></th></tr></thead><tbody>
          {income.length===0 ? <tr><td colSpan={4} className="py-4 text-center text-gray-400">Belum ada pemasukan</td></tr>
          : income.map(item=>(<tr key={item.id} className="border-b"><td className="py-2"><select value={item.sumber} onChange={e=>updateRow('income',item.id,'sumber',e.target.value)} className="w-full px-2 py-1 border rounded text-xs"><option value="">Pilih</option>{CATEGORIES.income.map(c=><option key={c} value={c}>{c}</option>)}</select></td><td className="py-2"><input type="number" value={item.jumlah} onChange={e=>updateRow('income',item.id,'jumlah',e.target.value)} className="w-full px-2 py-1 border rounded text-xs"/></td><td className="py-2"><input value={item.keterangan} onChange={e=>updateRow('income',item.id,'keterangan',e.target.value)} className="w-full px-2 py-1 border rounded text-xs"/></td><td className="py-2"><button onClick={()=>removeRow('income',item.id)} className="text-red-500"><Trash2 size={14}/></button></td></tr>))}
        </tbody></table></div>
      </div>

      {/* Expense */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-gray-800">Pengeluaran</h3><button onClick={()=>addRow('expense')} className="flex items-center gap-1 px-3 py-1.5 bg-green-700 text-white rounded-lg text-xs hover:bg-green-800"><Plus size={14}/> Tambah</button></div>
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-gray-600"><th className="py-2">Kategori</th><th className="py-2">Uraian</th><th className="py-2">Jumlah (Rp)</th><th className="py-2">Keterangan</th><th className="py-2 w-10"></th></tr></thead><tbody>
          {expense.length===0 ? <tr><td colSpan={5} className="py-4 text-center text-gray-400">Belum ada pengeluaran</td></tr>
          : expense.map(item=>(<tr key={item.id} className="border-b"><td className="py-2"><select value={item.kategori} onChange={e=>updateRow('expense',item.id,'kategori',e.target.value)} className="w-full px-2 py-1 border rounded text-xs"><option value="">Pilih</option>{CATEGORIES.expense.map(c=><option key={c} value={c}>{c}</option>)}</select></td><td className="py-2"><input value={item.uraian} onChange={e=>updateRow('expense',item.id,'uraian',e.target.value)} className="w-full px-2 py-1 border rounded text-xs"/></td><td className="py-2"><input type="number" value={item.jumlah} onChange={e=>updateRow('expense',item.id,'jumlah',e.target.value)} className="w-full px-2 py-1 border rounded text-xs"/></td><td className="py-2"><input value={item.keterangan} onChange={e=>updateRow('expense',item.id,'keterangan',e.target.value)} className="w-full px-2 py-1 border rounded text-xs"/></td><td className="py-2"><button onClick={()=>removeRow('expense',item.id)} className="text-red-500"><Trash2 size={14}/></button></td></tr>))}
        </tbody></table></div>
      </div>

      <div className="flex justify-end"><button onClick={save} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Save size={16}/> Simpan Anggaran</button></div>
    </div>
  );
}