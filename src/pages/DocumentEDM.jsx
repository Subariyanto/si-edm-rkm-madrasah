import { useEffect, useState } from 'react';
import { getActiveMadrasah } from '../services/authService';
import { getScores, calculateScores } from '../services/scoringService';
import { getItem } from '../services/storageService';
import { formatDate, getTahunAjaran } from '../utils/formatters';
import { Printer } from 'lucide-react';

export default function DocumentEDM() {
  const madrasah = getActiveMadrasah();
  const [scores, setScores] = useState(null);
  const profile = getItem('profil_madrasah');
  const vision = getItem('visi_misi');

  useEffect(() => { setScores(calculateScores()); }, []);

  const handlePrint = () => window.print();

  return (
    <div>
      <div className="flex items-center justify-between mb-6 no-print">
        <h1 className="text-2xl font-bold text-gray-800">Dokumen EDM</h1>
        <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"><Printer size={16} /> Cetak</button>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border print-container" style={{maxWidth: '210mm', margin: '0 auto'}}>
        {/* COVER */}
        <div className="text-center mb-8 page-break-after">
          <div className="border-4 border-green-800 p-8 mb-6">
            <p className="text-sm mb-2">KEMENTERIAN AGAMA REPUBLIK INDONESIA</p>
            <p className="text-xs mb-6">{madrasah?.kabupaten ? `KANTOR KEMENTERIAN AGAMA KABUPATEN ${madrasah.kabupaten.toUpperCase()}` : 'KANTOR KEMENTERIAN AGAMA'}</p>
            <h2 className="text-xl font-bold mb-4">LAPORAN EVALUASI DIRI MADRASAH (EDM)</h2>
            <p className="text-lg font-bold mb-2">{madrasah?.nama || '[NAMA MADRASAH]'}</p>
            <p className="text-sm mb-1">NSM: {madrasah?.nsm || '...'} | NPSN: {madrasah?.npsn || '...'}</p>
            <p className="text-sm mb-1">{profile?.alamat || ''}</p>
            <p className="text-sm">Tahun Pelajaran {madrasah?.tahunPelajaran || getTahunAjaran()}</p>
          </div>
        </div>

        {/* LEMBAR PENGESAHAN */}
        <div className="page-break-after">
          <h3 className="text-center font-bold mb-6">LEMBAR PENGESAHAN</h3>
          <p className="text-sm text-justify mb-4">Laporan Evaluasi Diri Madrasah (EDM) ini telah disusun oleh Tim Penjaminan Mutu (TPM) {madrasah?.nama || 'Madrasah'} sebagai bahan penyusunan Rencana Kerja Madrasah (RKM) tahun pelajaran {madrasah?.tahunPelajaran || getTahunAjaran()}.</p>
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div className="text-center"><p className="text-sm mb-8">Ketua TPM,</p><p className="text-sm font-bold underline">[Nama Ketua TPM]</p></div>
            <div className="text-center"><p className="text-sm mb-8">Kepala Madrasah,</p><p className="text-sm font-bold underline">{profile?.kepalaMadrasah || '...'}</p><p className="text-xs">NIP. {profile?.nipKepala || '...'}</p></div>
          </div>
        </div>

        {/* BAB I: PENDAHULUAN */}
        <div className="page-break-before">
          <h3 className="font-bold mb-4">BAB I: PENDAHULUAN</h3>
          <h4 className="font-semibold mb-2">A. Latar Belakang</h4>
          <p className="text-sm text-justify mb-3">Evaluasi Diri Madrasah (EDM) merupakan proses penilaian mandiri yang dilakukan oleh madrasah untuk mengidentifikasi kekuatan dan kelemahan pada aspek-aspek kunci pengelolaan madrasah. EDM dilaksanakan berdasarkan 5 aspek budaya mutu sesuai Pedoman EDM Versi 2.0 yang ditetapkan oleh Kementerian Agama RI.</p>
          <h4 className="font-semibold mb-2">B. Tujuan</h4>
          <ul className="list-disc list-inside text-sm text-justify space-y-1 mb-3"><li>Mengidentifikasi tingkat pencapaian budaya mutu di madrasah</li><li>Menyusun rekomendasi perbaikan berkelanjutan</li><li>Menyediakan dasar penyusunan Rencana Kerja Madrasah (RKM)</li></ul>
          <h4 className="font-semibold mb-2">C. Dasar Hukum</h4>
          <ol className="list-decimal list-inside text-xs text-justify space-y-0.5"><li>PP No. 57 Tahun 2021 tentang Standar Nasional Pendidikan</li><li>KMA No. 347 Tahun 2022 tentang Pedoman Implementasi Kurikulum Merdeka</li><li>Pedoman Pelaksanaan EDM Versi 2.0 Kemenag RI</li></ol>
        </div>

        {/* BAB II: HASIL EDM */}
        <div className="page-break-before">
          <h3 className="font-bold mb-4">BAB II: HASIL EVALUASI DIRI MADRASAH</h3>
          <h4 className="font-semibold mb-2">A. Profil Madrasah</h4>
          <table className="w-full text-xs mb-4"><tbody>
            <tr><td className="py-1 w-40">Nama Madrasah</td><td className="py-1">: {madrasah?.nama || '...'}</td></tr>
            <tr><td className="py-1">NSM / NPSN</td><td className="py-1">: {madrasah?.nsm || '...'} / {madrasah?.npsn || '...'}</td></tr>
            <tr><td className="py-1">Jenjang</td><td className="py-1">: {madrasah?.jenjang || '...'}</td></tr>
            <tr><td className="py-1">Kecamatan</td><td className="py-1">: {madrasah?.kecamatan || '...'}</td></tr>
            <tr><td className="py-1">Kabupaten</td><td className="py-1">: {madrasah?.kabupaten || 'Jember'}</td></tr>
            <tr><td className="py-1">Tahun Pelajaran</td><td className="py-1">: {madrasah?.tahunPelajaran || getTahunAjaran()}</td></tr>
          </tbody></table>

          <h4 className="font-semibold mb-2">B. Hasil Penilaian per Aspek</h4>
          {scores && (
            <table className="w-full text-xs mb-4 border"><thead><tr className="bg-gray-100"><th className="border p-1 text-left">Aspek</th><th className="border p-1">SPT</th><th className="border p-1">STM</th><th className="border p-1">SKPM</th></tr></thead><tbody>
              {Object.entries(scores.aspects).map(([k,v])=>(<tr key={k}><td className="border p-1">Aspek {k}</td><td className="border p-1 text-center">{Math.round(v.totalSPT)}</td><td className="border p-1 text-center">{Math.round(v.totalSTM)}</td><td className="border p-1 text-center font-bold">{Math.round(v.skpm)}%</td></tr>))}
            </tbody></table>
          )}
          <p className="text-sm font-bold mb-4">SKPM Madrasah: {scores ? Math.round(scores.totalSKPM) : '...'}% - Kategori: {scores?.category || '...'}</p>

          <h4 className="font-semibold mb-2">C. Detail Indikator</h4>
          {scores && Object.entries(scores.aspects).map(([k,v])=>(
            <div key={k} className="mb-3">
              <h5 className="text-xs font-bold mb-1">Aspek {k}</h5>
              <table className="w-full text-xs border"><thead><tr className="bg-gray-100"><th className="border p-1">Kode</th><th className="border p-1">Pernyataan</th><th className="border p-1">Tingkat</th></tr></thead><tbody>
                {v.indicators.map(ind=>(<tr key={ind.kode}><td className="border p-1 font-mono">{ind.kode}</td><td className="border p-1">{ind.pernyataan}</td><td className="border p-1 text-center">{ind.answered?ind.tingkat:'-'}</td></tr>))}
              </tbody></table>
            </div>
          ))}
        </div>

        {/* BAB III: ANALISIS DAN REKOMENDASI */}
        <div className="page-break-before">
          <h3 className="font-bold mb-4">BAB III: ANALISIS DAN REKOMENDASI</h3>
          <p className="text-sm text-justify mb-3">Berdasarkan hasil EDM, indikator dengan tingkat pencapaian 1-2 menjadi prioritas utama perbaikan, tingkat 3 perlu ditingkatkan, dan tingkat 4 dipertahankan. Rekomendasi detail tersedia di halaman Rekomendasi aplikasi.</p>
          <h4 className="font-semibold mb-2">A. Kekuatan Madrasah</h4>
          <p className="text-sm text-justify text-gray-600 italic">(Kekuatan diidentifikasi dari indikator dengan tingkat 4)</p>
          <h4 className="font-semibold mb-2 mt-4">B. Kelemahan dan Tindak Lanjut</h4>
          <p className="text-sm text-justify text-gray-600 italic">(Kelemahan diidentifikasi dari indikator tingkat 1-3, dengan rencana perbaikan di RKJM/RKT)</p>
        </div>

        {/* BAB IV: PENUTUP */}
        <div className="page-break-before">
          <h3 className="font-bold mb-4">BAB IV: PENUTUP</h3>
          <p className="text-sm font-semibold mb-2">A. Kesimpulan</p>
          <p className="text-sm text-justify mb-3">Pelaksanaan EDM di {madrasah?.nama || 'Madrasah'} telah menghasilkan SKPM sebesar <strong>{scores ? Math.round(scores.totalSKPM) : '...'}%</strong> dengan kategori <strong>{scores?.category || '...'}</strong>. Hasil ini menjadi dasar penyusunan Rencana Kerja Madrasah (RKM) untuk peningkatan mutu berkelanjutan.</p>
          <p className="text-sm font-semibold mb-2">B. Saran</p>
          <ol className="list-decimal list-inside text-sm text-justify space-y-1"><li>Rekomendasi EDM ditindaklanjuti dalam program RKJM dan RKT</li><li>EDM dilaksanakan secara berkala setiap tahun</li><li>Seluruh warga madrasah berpartisipasi dalam budaya mutu</li></ol>
          <div className="mt-12 text-right"><p className="text-sm">Jember, {new Date().toLocaleDateString('id-ID', {day:'numeric',month:'long',year:'numeric'})}</p><p className="text-sm mt-12 font-bold underline">{profile?.kepalaMadrasah || '...'}</p><p className="text-xs">NIP. {profile?.nipKepala || '...'}</p></div>
        </div>
      </div>
    </div>
  );
}