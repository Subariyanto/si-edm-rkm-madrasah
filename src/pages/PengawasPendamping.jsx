import { useState, useEffect } from 'react';
import { getItem, setItem } from '../services/storageService';
import { getActiveMadrasah } from '../services/authService';
import { UserCheck, Save, Phone, Briefcase } from 'lucide-react';

const STORAGE_KEY = 'pengawas_pendamping';

export default function PengawasPendamping() {
  const madrasah = getActiveMadrasah();
  const [form, setForm] = useState({
    nama: '',
    nip: '',
    pangkat: '',
    noHP: '',
  });
  const [saved, setSaved] = useState(false);
  const [notif, setNotif] = useState('');

  useEffect(() => {
    const existing = getItem(STORAGE_KEY);
    if (existing) {
      setForm(existing);
    }
  }, []);

  const showNotif = (msg) => { setNotif(msg); setTimeout(() => setNotif(''), 3000); };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (!form.nama.trim()) { showNotif('Nama pengawas wajib diisi'); return; }
    setItem(STORAGE_KEY, form);
    setSaved(true);
    showNotif('Data Pengawas Pendamping berhasil disimpan');
  };

  const Input = ({ label, name, placeholder = '', icon: Icon }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />}
        <input
          type="text" name={name} value={form[name] || ''} onChange={handleChange}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500`}
        />
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pengawas Pendamping</h1>
          <p className="text-gray-500 text-sm">Data pengawas pembina madrasah {madrasah?.nama || ''}</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 shadow-sm">
          <Save size={16} /> {saved ? 'Simpan Ulang' : 'Simpan'}
        </button>
      </div>

      {notif && <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">{notif}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <UserCheck size={18} className="text-green-700" /> Identitas Pengawas Pendamping
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nama Lengkap" name="nama" icon={UserCheck} placeholder="Nama pengawas pendamping" />
          <Input label="NIP" name="nip" placeholder="19700101 200501 1 001" />
          <Input label="Pangkat/Golongan" name="pangkat" icon={Briefcase} placeholder="Pembina / IV.a" />
          <Input label="No. HP" name="noHP" icon={Phone} placeholder="0812-..." />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 max-w-2xl text-sm text-blue-700">
        <strong>ℹ️ Catatan:</strong> Data pengawas ini akan otomatis tampil di lembar pengesahan Dokumen EDM dan Dokumen RKM.
      </div>
    </div>
  );
}