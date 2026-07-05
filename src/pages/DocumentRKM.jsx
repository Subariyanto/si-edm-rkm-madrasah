import { useEffect, useState } from 'react';
import { getActiveMadrasah } from '../services/authService';
import { getScores, calculateScores } from '../services/scoringService';
import { getItem } from '../services/storageService';
import { getTahunAjaran, formatRupiah } from '../utils/formatters';
import { Printer } from 'lucide-react';

export default function DocumentRKM() {
  const madrasah = getActiveMadrasah();
  const [scores, setScores] = useState(null);
  const profile = getItem('profil_madrasah');
  const pengawas = getItem('pengawas_pendamping');
  const rkjm = getItem('rkjm') || [];
  const rkt = getItem(`rkt_${new Date().getFullYear()}`) || [];

  useEffect(() => { setScores(calculateScores()); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 no-print">
        <h1 className="text-2xl font-bold text-gray-800">Dokumen RKM</h1>
        <button onClick={()=>window.print()} className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"><Printer size={16} /> Cetak</button>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border print-container" style={{maxWidth:'210mm',margin:'0 auto'}}>
        {/* COVER */}
        <div className="text-center mb-8 page-break-after">
          <div className="border-4 border-green-800 p-8 mb-6">
            <p className="text-xs mb-2">KEMENTERIAN AGAMA REPUBLIK INDONESIA</p>
            <h2 className="text-lg font-bold mb-6">RENCANA KERJA MADRASAH (RKM)</h2>
            <p className="text-xl font-bold mb-2">{madrasah?.nama || '[NAMA MADRASAH]'}</p>
            <p className="text-sm">NSM: {madrasah?.nsm || '...'} | NPSN: {madrasah?.npsn || '...'}</p>
            <p className="text-sm mb-2">{profile?.alamat || ''}</p>
            <p className="text-sm mb-2">Jenjang: {madrasah?.jenjang || '...'}</p>
            <p className="text-sm">Tahun Pelajaran {madrasah?.tahunPelajaran || getTahunAjaran()}</p>
          </div>
        </div>

        {/* PENGESAHAN */}
        <div className="page-break-after">
          <h3 className="text-center font-bold mb-4">LEMBAR PENGESAHAN</h3>
          <p className="text-sm text-justify mb-4">Rencana Kerja Madrasah (RKM) {madrasah?.nama || 'Madrasah'} ini disusun berdasarkan hasil Evaluasi Diri Madrasah (EDM) dan mengacu pada pedoman penyusunan RKM Kementerian Agama RI. Dokumen ini mencakup RKJM 4 tahun dan RKT tahunan.</p>
          <div className="grid grid-cols-3 gap-4 mt-16">
            <div className="text-center"><p className="text-xs mb-10">Ketua Komite,</p><p className="text-xs font-bold underline">[Nama Ketua Komite]</p></div>
            <div className="text-center"><p className="text-xs mb-10">Ketua TPM,</p><p className="text-xs font-bold underline">[Nama Ketua TPM]</p></div>
            <div className="text-center"><p className="text-xs mb-10">Kepala Madrasah,</p><p className="text-xs font-bold underline">{profile?.kepalaMadrasah || '...'}</p><p className="text-xs">NIP. {profile?.nipKepala || '...'}</p></div>
          </div>
          <p className="text-xs text-center mt-12">Mengetahui,<br/>Pengawas Madrasah</p>
          <p className="text-xs text-center mt-10 font-bold underline">{pengawas?.nama || '[Nama Pengawas]'}</p>
          <p className="text-xs text-center">NIP. {pengawas?.nip || '...'}</p>
        </div>

        {/* BAB I: PENDAHULUAN */}
        <div className="page-break-before">
          <h3 className="font-bold mb-4">BAB I: PENDAHULUAN</h3>
          <h4 className="font-semibold mb-2">A. Latar Belakang</h4>
          <p className="text-sm text-justify mb-3">Rencana Kerja Madrasah (RKM) merupakan dokumen perencanaan strategis madrasah yang disusun berdasarkan hasil Evaluasi Diri Madrasah (EDM). RKM menjadi acuan dalam pengembangan madrasah selama 4 tahun (RKJM) dan pelaksanaan program tahunan (RKT).</p>
          <h4 className="font-semibold mb-2">B. Landasan Hukum</h4>
          <ol className="list-decimal list-inside text-xs space-y-0.5"><li>UU No. 20 Tahun 2003 tentang Sisdiknas</li><li>PP No. 57 Tahun 2021 tentang SNP</li><li>KMA No. 347 Tahun 2022</li></ol>
          <h4 className="font-semibold mb-2 mt-3">C. Visi, Misi, dan Tujuan</h4>
          <p className="text-sm font-semibold">Visi:</p>
          <p className="text-sm text-justify mb-2">{getItem('visi_misi')?.visi || '[Visi madrasah]'}</p>
          <p className="text-sm font-semibold">Misi:</p>
          <p className="text-sm text-justify mb-2 whitespace-pre-line">{getItem('visi_misi')?.misi || '[Misi madrasah]'}</p>
        </div>

        {/* BAB II: HASIL EDM */}
        <div className="page-break-before">
          <h3 className="font-bold mb-4">BAB II: HASIL EVALUASI DIRI MADRASAH</h3>
          <p className="text-sm mb-3">SKPM Madrasah: <strong>{scores?Math.round(scores.totalSKPM):'...'}%</strong> — Kategori: <strong>{scores?.category||'...'}</strong></p>
          {scores && <table className="w-full text-xs border mb-4"><thead><tr className="bg-gray-100"><th className="border p-1">Aspek</th><th className="border p-1">SPT</th><th className="border p-1">STM</th><th className="border p-1">SKPM (%)</th></tr></thead><tbody>
            {Object.entries(scores.aspects).map(([k,v])=>(<tr key={k}><td className="border p-1">Aspek {k}</td><td className="border p-1 text-center">{Math.round(v.totalSPT)}</td><td className="border p-1 text-center">{Math.round(v.totalSTM)}</td><td className="border p-1 text-center font-bold">{Math.round(v.skpm)}%</td></tr>))}
          </tbody></table>}
        </div>

        {/* BAB III: RKJM */}
        <div className="page-break-before">
          <h3 className="font-bold mb-4">BAB III: RENCANA KERJA JANGKA MENENGAH (RKJM)</h3>
          <p className="text-sm mb-3">RKJM disusun untuk jangka waktu 4 tahun dengan fokus pada pencapaian target mutu madrasah.</p>
          {rkjm.length===0 ? <p className="text-sm text-gray-400 italic">Belum ada data RKJM.</p> : (
            <table className="w-full text-xs border"><thead><tr className="bg-gray-100"><th className="border p-1">No</th><th className="border p-1">Sasaran/Program</th><th className="border p-1">Kegiatan</th><th className="border p-1">Th1</th><th className="border p-1">Th2</th><th className="border p-1">Th3</th><th className="border p-1">Th4</th></tr></thead><tbody>
              {rkjm.map((item,i)=>(<tr key={item.id||i}><td className="border p-1 text-center">{i+1}</td><td className="border p-1">{item.sasaran||item.program}</td><td className="border p-1">{item.kegiatan}</td><td className="border p-1 text-center">{item.tahun1?'✓':''}</td><td className="border p-1 text-center">{item.tahun2?'✓':''}</td><td className="border p-1 text-center">{item.tahun3?'✓':''}</td><td className="border p-1 text-center">{item.tahun4?'✓':''}</td></tr>))}
            </tbody></table>
          )}
        </div>

        {/* BAB IV: RKT */}
        <div className="page-break-before">
          <h3 className="font-bold mb-4">BAB IV: RENCANA KERJA TAHUNAN (RKT)</h3>
          <p className="text-sm mb-3">RKT tahun {new Date().getFullYear()} berdasarkan prioritas dari RKJM.</p>
          {rkt.length===0 ? <p className="text-sm text-gray-400 italic">Belum ada data RKT.</p> : (
            <table className="w-full text-xs border"><thead><tr className="bg-gray-100"><th className="border p-1">No</th><th className="border p-1">Program/Kegiatan</th><th className="border p-1">PJ</th><th className="border p-1">Jadwal</th><th className="border p-1">Anggaran</th></tr></thead><tbody>
              {rkt.map((item,i)=>(<tr key={item.id||i}><td className="border p-1 text-center">{i+1}</td><td className="border p-1">{item.kegiatan||item.program}</td><td className="border p-1">{item.penanggungJawab}</td><td className="border p-1 text-center">{item.jadwalAwal||'-'} s/d {item.jadwalAkhir||'-'}</td><td className="border p-1">{item.anggaran?formatRupiah(Number(item.anggaran)):'-'}</td></tr>))}
            </tbody></table>
          )}
        </div>

        {/* BAB V: ANGGARAN */}
        <div className="page-break-before">
          <h3 className="font-bold mb-4">BAB V: RENCANA ANGGARAN</h3>
          <p className="text-sm mb-3">Anggaran madrasah bersumber dari BOS/BOP, Komite, dan sumber lain yang sah.</p>
          <div className="grid grid-cols-2 gap-4">
            {(()=>{const budget=getItem(`anggaran_${new Date().getFullYear()}`);const ti=(budget?.income||[]).reduce((s,i)=>s+Number(i.jumlah||0),0);const te=(budget?.expense||[]).reduce((s,i)=>s+Number(i.jumlah||0),0);return(<><div><h4 className="text-xs font-semibold mb-1">Pemasukan</h4><table className="w-full text-xs border mb-3"><tbody>{(budget?.income||[]).map((item,i)=>(<tr key={i}><td className="border p-1">{item.sumber}</td><td className="border p-1 text-right">{formatRupiah(Number(item.jumlah||0))}</td></tr>))}<tr className="bg-gray-100 font-bold"><td className="border p-1">Total</td><td className="border p-1 text-right">{formatRupiah(ti)}</td></tr></tbody></table></div><div><h4 className="text-xs font-semibold mb-1">Pengeluaran</h4><table className="w-full text-xs border mb-3"><tbody>{(budget?.expense||[]).map((item,i)=>(<tr key={i}><td className="border p-1">{item.kategori}</td><td className="border p-1 text-right">{formatRupiah(Number(item.jumlah||0))}</td></tr>))}<tr className="bg-gray-100 font-bold"><td className="border p-1">Total</td><td className="border p-1 text-right">{formatRupiah(te)}</td></tr></tbody></table></div></>);})()}
          </div>
        </div>

        {/* BAB VI: PENUTUP */}
        <div className="page-break-before">
          <h3 className="font-bold mb-4">BAB VI: PENUTUP</h3>
          <p className="text-sm text-justify mb-3">RKM ini merupakan dokumen perencanaan yang hidup dan dapat disesuaikan dengan perkembangan dan kebutuhan madrasah. Evaluasi dan revisi RKM dilakukan secara berkala melalui mekanisme EDM tahunan.</p>
          <p className="text-sm text-justify mb-3">Semoga dokumen ini menjadi panduan yang bermanfaat bagi seluruh warga madrasah dalam mewujudkan pendidikan yang bermutu dan berkarakter.</p>
          <div className="mt-16 text-right"><p className="text-sm">Jember, {new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})}</p><p className="text-sm mt-12 font-bold underline">{profile?.kepalaMadrasah||'...'}</p><p className="text-xs">NIP. {profile?.nipKepala||'...'}</p></div>
        </div>
      </div>
    </div>
  );
}