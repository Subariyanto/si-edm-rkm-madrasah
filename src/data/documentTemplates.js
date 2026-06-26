export const documentTemplates = [
  {
    id: 't1',
    name: 'Template Dokumen EDM',
    type: 'edm',
    description: 'Template standar untuk Dokumen Evaluasi Diri Madrasah',
    structure: [
      { section: 'Cover', order: 1 },
      { section: 'Lembar Pengesahan', order: 2 },
      { section: 'Kata Pengantar', order: 3 },
      { section: 'Daftar Isi', order: 4 },
      { section: 'BAB I - Pendahuluan', order: 5, content: 'A. Latar Belakang\nB. Tujuan\nC. Landasan Hukum\nD. Ruang Lingkup' },
      { section: 'BAB II - Profil Madrasah', order: 6, content: 'A. Identitas Madrasah\nB. Visi, Misi, dan Tujuan\nC. Data Pendidik dan Tenaga Kependidikan\nD. Data Peserta Didik\nE. Sarana dan Prasarana' },
      { section: 'BAB III - Hasil Evaluasi Diri', order: 7, content: 'A. Aspek Budaya Kedisiplinan\nB. Aspek Pengembangan Diri GTK\nC. Aspek Proses Pembelajaran\nD. Aspek Materi dan Sarana Pembelajaran\nE. Aspek Pembiayaan' },
      { section: 'BAB IV - Analisis dan Rekomendasi', order: 8, content: 'A. Analisis Hasil EDM\nB. Rekomendasi Perbaikan\nC. Prioritas Program' },
      { section: 'BAB V - Penutup', order: 9, content: 'A. Kesimpulan\nB. Saran' },
      { section: 'Lampiran', order: 10, content: 'Instrumen EDM, Foto Kegiatan, Dokumen Pendukung' }
    ]
  },
  {
    id: 't2',
    name: 'Template Dokumen RKM',
    type: 'rkm',
    description: 'Template standar untuk Dokumen Rencana Kerja Madrasah',
    structure: [
      { section: 'Cover', order: 1 },
      { section: 'Lembar Pengesahan', order: 2 },
      { section: 'Kata Pengantar', order: 3 },
      { section: 'Daftar Isi', order: 4 },
      { section: 'BAB I - Pendahuluan', order: 5, content: 'A. Latar Belakang\nB. Landasan Hukum\nC. Tujuan\nD. Sasaran' },
      { section: 'BAB II - Profil dan Analisis Kondisi', order: 6, content: 'A. Profil Madrasah\nB. Analisis Kondisi Saat Ini\nC. Analisis SWOT' },
      { section: 'BAB III - Rencana Kerja Jangka Menengah (RKJM)', order: 7, content: 'A. Arah Kebijakan\nB. Program Strategis\nC. Matriks RKJM 4 Tahun' },
      { section: 'BAB IV - Rencana Kerja Tahunan (RKT)', order: 8, content: 'A. Sasaran Tahunan\nB. Program dan Kegiatan\nC. Matriks RKT' },
      { section: 'BAB V - Rencana Anggaran', order: 9, content: 'A. Rencana Pendapatan\nB. Rencana Belanja\nC. Alokasi Anggaran per Program' },
      { section: 'BAB VI - Jadwal Kegiatan', order: 10, content: 'A. Kalender Akademik\nB. Jadwal Pelaksanaan Program\nC. Timeline Kegiatan' },
      { section: 'BAB VII - Penutup', order: 11, content: 'A. Kesimpulan\nB. Rekomendasi' },
      { section: 'Lampiran', order: 12, content: 'SK TPM, Matriks Rinci, Dokumen Pendukung' }
    ]
  },
  {
    id: 't3',
    name: 'Template Laporan EDM',
    type: 'edm_report',
    description: 'Template laporan hasil Evaluasi Diri Madrasah untuk pelaporan',
    structure: [
      { section: 'Cover', order: 1 },
      { section: 'Lembar Pengesahan', order: 2 },
      { section: 'Ringkasan Eksekutif', order: 3 },
      { section: 'Hasil EDM per Aspek', order: 4 },
      { section: 'Grafik SKPM', order: 5 },
      { section: 'Rekomendasi', order: 6 },
      { section: 'Rencana Tindak Lanjut', order: 7 }
    ]
  }
];

export default documentTemplates;