import { useState, useEffect } from 'react';
import { getItem, setItem } from '../services/storageService';
import { getActiveMadrasah } from '../services/authService';
import { School, Save, Check, MapPin, Hash, Building2, Phone, Mail, Globe } from 'lucide-react';

const STORAGE_KEY = 'profil_madrasah';

export default function ProfilMadrasah() {
  const madrasah = getActiveMadrasah();
  const [form, setForm] = useState({
    nama: '', nsm: '', npsn: '', jenjang: 'MI', status: 'Swasta',
    tahunBerdiri: '', alamat: '', desa: '', kecamatan: '', kabupaten: 'Jember',
    provinsi: 'Jawa Timur', kodePos: '', telepon: '', email: '', website: '',
    namaKepala: '', nipKepala: '', akreditasi: '', skAkreditasi: '',
    namaYayasan: '', skPendirian: '', luasTanah: '', luasBangunan: '',
    jumlahRombel: '', jumlahSiswa: '', jumlahGuru: '', jumlahTendik: ''
  });
  const [saved, setSaved] = useState(false);
  const [notif, setNotif] = useState('');

  useEffect(() => {
    const existing = getItem(STORAGE_KEY);
    if (existing) {
      setForm(prev => ({ ...prev, ...existing }));
    } else if (madrasah) {
      setForm(prev => ({
        ...prev,
        nama: madrasah.nama || '',
        nsm: madrasah.nsm || '',
        npsn: madrasah.npsn || '',
        jenjang: madrasah.jenjang || 'MI',
        kecamatan: madrasah.kecamatan || '',
        kabupaten: madrasah.kabupaten || 'Jember',
      }));
    }
  }, []);

  const showNotif = (msg) => { setNotif(msg); setTimeout(() => setNotif(''), 3000); };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (!form.nama.trim()) { showNotif('Nama madrasah wajib diisi'); return; }
    setItem(STORAGE_KEY, form);
    setSaved(true);
    showNotif('Profil madrasah berhasil disimpan');
  };

  const Input = ({ label, name, type = 'text', placeholder = '', required = false, icon: Icon }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />}
        <input
          type={type} name={name} value={form[name] || ''} onChange={handleChange}
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
          <h1 className="text-2xl font-bold text-gray-800">Profil Madrasah</h1>
          <p className="text-gray-500 text-sm">Data identitas dan profil lengkap madrasah</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 shadow-sm">
          <Save size={16} /> {saved ? 'Simpan Ulang' : 'Simpan Profil'}
        </button>
      </div>

      {notif && <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">{notif}</div>}

      {/* Identitas Madrasah */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <School size={18} className="text-green-700" /> Identitas Madrasah
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input label="Nama Madrasah" name="nama" required icon={School} placeholder="Nama lengkap madrasah" />
          <Input label="NSM" name="nsm" icon={Hash} placeholder="Nomor Statistik Madrasah" />
          <Input label="NPSN" name="npsn" icon={Hash} placeholder="Nomor Pokok Sekolah Nasional" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenjang</label>
            <select name="jenjang" value={form.jenjang} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="MI">MI - Madrasah Ibtidaiyah</option>
              <option value="MTs">MTs - Madrasah Tsanawiyah</option>
              <option value="MA">MA - Madrasah Aliyah</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="Swasta">Swasta</option>
              <option value="Negeri">Negeri</option>
            </select>
          </div>
          <Input label="Tahun Berdiri" name="tahunBerdiri" type="number" placeholder="1990" />
        </div>
      </div>

      {/* Alamat */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <MapPin size={18} className="text-green-700" /> Alamat
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input label="Alamat" name="alamat" icon={MapPin} placeholder="Jl. ..." />
          </div>
          <Input label="Desa/Kelurahan" name="desa" />
          <Input label="Kecamatan" name="kecamatan" />
          <Input label="Kabupaten" name="kabupaten" />
          <Input label="Provinsi" name="provinsi" />
          <Input label="Kode Pos" name="kodePos" />
        </div>
      </div>

      {/* Kontak */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Phone size={18} className="text-green-700" /> Kontak
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Telepon" name="telepon" icon={Phone} placeholder="0331-..." />
          <Input label="Email" name="email" type="email" icon={Mail} placeholder="madrasah@email.com" />
          <Input label="Website" name="website" icon={Globe} placeholder="https://..." />
        </div>
      </div>

      {/* Kepala Madrasah */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Building2 size={18} className="text-green-700" /> Kepala Madrasah & Yayasan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nama Kepala Madrasah" name="namaKepala" />
          <Input label="NIP Kepala" name="nipKepala" />
          <Input label="Nama Yayasan" name="namaYayasan" />
          <Input label="SK Pendirian" name="skPendirian" />
        </div>
      </div>

      {/* Akreditasi & Data */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Check size={18} className="text-green-700" /> Akreditasi & Data Umum
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input label="Akreditasi" name="akreditasi" placeholder="A / B / C" />
          <Input label="SK Akreditasi" name="skAkreditasi" />
          <Input label="Luas Tanah (m²)" name="luasTanah" type="number" />
          <Input label="Luas Bangunan (m²)" name="luasBangunan" type="number" />
          <Input label="Jumlah Rombel" name="jumlahRombel" type="number" />
          <Input label="Jumlah Siswa" name="jumlahSiswa" type="number" />
          <Input label="Jumlah Guru" name="jumlahGuru" type="number" />
          <Input label="Jumlah Tendik" name="jumlahTendik" type="number" />
        </div>
      </div>

      {/* Tombol simpan bawah */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-xl text-sm font-medium hover:bg-green-800 shadow-sm">
          <Save size={16} /> Simpan Profil Madrasah
        </button>
      </div>
    </div>
  );
}