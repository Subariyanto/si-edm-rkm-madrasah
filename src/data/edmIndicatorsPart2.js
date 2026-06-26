export const edmIndicatorsPart2 = [
  {
    kode: 'D.1', aspek: 'D. Materi dan Sarana Pembelajaran',
    pernyataan: 'Ketersediaan buku teks dan sumber belajar',
    snp: 'Standar Sarana Prasarana', bobot: 4,
    penciri: [
      { level: 1, text: 'Ketersediaan buku teks < 50% dari jumlah siswa, rasio buku:siswa sangat rendah, tidak ada sumber belajar lain selain buku paket, buku yang tersedia sudah usang/rusak.' },
      { level: 2, text: 'Ketersediaan buku teks 50-70% dari jumlah siswa, rasio buku:siswa masih rendah (1 buku untuk 2-3 siswa), mulai ada sumber belajar tambahan (LKS), kondisi buku cukup terawat.' },
      { level: 3, text: 'Ketersediaan buku teks 70-90% dari jumlah siswa, rasio buku:siswa cukup baik, tersedia berbagai sumber belajar (buku referensi, LKS, modul), kondisi buku terawat, ada program perawatan buku.' },
      { level: 4, text: 'Ketersediaan buku teks 90-100% dari jumlah siswa (rasio 1:1), sumber belajar sangat beragam (buku teks, referensi, digital, multimedia), sistem peminjaman dan perawatan buku berjalan baik, ada program pengadaan buku tahunan.' }
    ],
    contohBukti: ['Daftar inventaris buku', 'Kartu peminjaman buku', 'Daftar buku teks per mapel', 'Program pengadaan buku'],
    templateRekomendasi: ['Mengadakan pengadaan buku teks secara bertahap', 'Mengoptimalkan penggunaan buku elektronik', 'Membuat sistem peminjaman buku yang efektif'],
    active: true
  },
  {
    kode: 'D.2', aspek: 'D. Materi dan Sarana Pembelajaran',
    pernyataan: 'Penggunaan media dan alat peraga pembelajaran',
    snp: 'Standar Sarana Prasarana', bobot: 3,
    penciri: [
      { level: 1, text: 'Tidak tersedia media dan alat peraga pembelajaran, guru tidak menggunakan media dalam pembelajaran, tidak ada pengadaan alat peraga, pembelajaran sepenuhnya mengandalkan ceramah dan papan tulis.' },
      { level: 2, text: 'Tersedia media/alat peraga terbatas (peta, globe, torso) tapi jarang digunakan, pengadaan alat peraga tidak terprogram, sebagian guru kadang menggunakan media sederhana buatan sendiri.' },
      { level: 3, text: 'Tersedia media/alat peraga yang cukup untuk mata pelajaran utama, guru menggunakan media secara rutin dalam pembelajaran, pengadaan alat peraga terprogram dalam RKAM, guru mampu membuat media pembelajaran sederhana.' },
      { level: 4, text: 'Tersedia media dan alat peraga lengkap untuk semua mata pelajaran termasuk multimedia, semua guru terampil menggunakan berbagai media, pengadaan terencana dan berkelanjutan, guru secara kreatif mengembangkan media pembelajaran inovatif.' }
    ],
    contohBukti: ['Daftar inventaris media/alat peraga', 'Dokumentasi penggunaan media', 'Media pembelajaran buatan guru', 'Rencana pengadaan media'],
    templateRekomendasi: ['Mengadakan alat peraga untuk semua mata pelajaran utama', 'Melatih guru membuat media pembelajaran', 'Mengalokasikan dana pengadaan media dalam RKAM'],
    active: true
  },
  {
    kode: 'D.3', aspek: 'D. Materi dan Sarana Pembelajaran',
    pernyataan: 'Ketersediaan dan pemanfaatan perpustakaan madrasah',
    snp: 'Standar Sarana Prasarana', bobot: 3,
    penciri: [
      { level: 1, text: 'Tidak memiliki ruang perpustakaan yang memadai, koleksi buku sangat terbatas, tidak ada petugas perpustakaan, perpustakaan tidak berfungsi, siswa jarang/tidak pernah mengunjungi perpustakaan.' },
      { level: 2, text: 'Memiliki ruang perpustakaan sederhana, koleksi buku terbatas, petugas perpustakaan dirangkap guru, jam buka terbatas, tingkat kunjungan siswa rendah, sistem katalog masih manual.' },
      { level: 3, text: 'Ruang perpustakaan memadai dan nyaman, koleksi buku cukup beragam, ada petugas perpustakaan khusus, jam buka sesuai kebutuhan, tingkat kunjungan siswa cukup tinggi, ada program literasi madrasah.' },
      { level: 4, text: 'Perpustakaan representatif dengan koleksi lengkap (buku, digital, audio-visual), dikelola petugas profesional, sistem katalog digital, jam buka fleksibel, tingkat kunjungan sangat tinggi, perpustakaan menjadi pusat literasi dan pembelajaran, ada program inovasi perpustakaan.' }
    ],
    contohBukti: ['Data pengunjung perpustakaan', 'Daftar koleksi buku', 'Program literasi madrasah', 'Foto ruang perpustakaan'],
    templateRekomendasi: ['Menambah koleksi buku perpustakaan', 'Menunjuk petugas perpustakaan khusus', 'Mengadakan program literasi dan wajib kunjung perpustakaan'],
    active: true
  },
  {
    kode: 'D.4', aspek: 'D. Materi dan Sarana Pembelajaran',
    pernyataan: 'Ketersediaan dan pemanfaatan laboratorium/ruang praktik',
    snp: 'Standar Sarana Prasarana', bobot: 4,
    penciri: [
      { level: 1, text: 'Tidak memiliki laboratorium (IPA/Komputer/Bahasa), praktik pembelajaran dilakukan di kelas biasa, tidak ada peralatan praktik, pembelajaran hanya bersifat teoritis.' },
      { level: 2, text: 'Memiliki laboratorium sederhana tapi peralatan terbatas, praktik dilakukan seadanya, frekuensi penggunaan laboratorium rendah, perawatan alat tidak rutin, jadwal penggunaan belum teratur.' },
      { level: 3, text: 'Memiliki laboratorium yang cukup lengkap (IPA/Komputer), peralatan praktik tersedia untuk kelompok kecil, praktik dilakukan sesuai jadwal, ada petugas laboran, perawatan alat dilakukan rutin.' },
      { level: 4, text: 'Laboratorium lengkap dan modern (IPA, Komputer, Bahasa), peralatan praktik memadai untuk individu, penggunaan laboratorium optimal dan terjadwal, dikelola laboran profesional, keselamatan kerja terjamin, laboratorium mendukung inovasi dan penelitian siswa.' }
    ],
    contohBukti: ['Daftar peralatan laboratorium', 'Jadwal penggunaan laboratorium', 'Laporan praktikum', 'SOP K3 laboratorium'],
    templateRekomendasi: ['Melengkapi peralatan laboratorium secara bertahap', 'Menunjuk dan melatih laboran', 'Menyusun jadwal penggunaan lab yang optimal'],
    active: true
  },
  {
    kode: 'D.5', aspek: 'D. Materi dan Sarana Pembelajaran',
    pernyataan: 'Pemanfaatan TIK dalam proses pembelajaran',
    snp: 'Standar Sarana Prasarana', bobot: 3,
    penciri: [
      { level: 1, text: 'Tidak tersedia perangkat TIK untuk pembelajaran (komputer, proyektor, internet), guru tidak menggunakan TIK dalam pembelajaran, tidak ada program pemanfaatan TIK.' },
      { level: 2, text: 'Tersedia perangkat TIK terbatas (1-2 proyektor, beberapa komputer), penggunaan TIK dalam pembelajaran masih jarang, hanya beberapa guru yang mampu menggunakan TIK, akses internet terbatas.' },
      { level: 3, text: 'Tersedia perangkat TIK cukup memadai (proyektor di beberapa kelas, lab komputer), penggunaan TIK dalam pembelajaran cukup rutin oleh sebagian besar guru, akses internet tersedia, guru mampu menggunakan aplikasi pembelajaran.' },
      { level: 4, text: 'Perangkat TIK lengkap dan modern (proyektor setiap kelas, lab komputer, smart board, tablet), semua guru terampil menggunakan TIK, pembelajaran berbasis digital (e-learning, LMS), akses internet cepat dan stabil, TIK terintegrasi dalam semua aspek pembelajaran dan manajemen madrasah.' }
    ],
    contohBukti: ['Daftar perangkat TIK', 'Jadwal penggunaan lab komputer', 'Platform e-learning madrasah', 'Dokumentasi pembelajaran berbasis TIK'],
    templateRekomendasi: ['Mengadakan perangkat TIK secara bertahap', 'Melatih guru dalam pemanfaatan TIK', 'Membangun platform e-learning madrasah'],
    active: true
  },
  // ASPEK E
  {
    kode: 'E.1', aspek: 'E. Pembiayaan',
    pernyataan: 'Perencanaan anggaran berbasis kinerja dan program',
    snp: 'Standar Pembiayaan', bobot: 4,
    penciri: [
      { level: 1, text: 'Tidak ada perencanaan anggaran berbasis kinerja, anggaran disusun tanpa analisis kebutuhan, tidak ada keterkaitan antara anggaran dan program/kegiatan madrasah, RKAM tidak disusun atau sangat sederhana.' },
      { level: 2, text: 'RKAM disusun tapi belum sepenuhnya berbasis program dan kinerja, perencanaan anggaran masih didominasi pos-pos rutin, keterkaitan anggaran dengan program madrasah belum jelas, analisis kebutuhan belum mendalam.' },
      { level: 3, text: 'RKAM disusun berbasis program dan kinerja, anggaran disusun berdasarkan prioritas program, ada analisis kebutuhan yang cukup baik, keterkaitan antara anggaran dan program jelas, RKAM direview secara berkala.' },
      { level: 4, text: 'Perencanaan anggaran sepenuhnya berbasis kinerja dan program, RKAM disusun partisipatif dengan analisis kebutuhan mendalam, setiap program memiliki indikator kinerja dan anggaran terukur, ada sistem monitoring dan evaluasi anggaran yang berjalan efektif.' }
    ],
    contohBukti: ['Dokumen RKAM', 'Analisis kebutuhan', 'Indikator kinerja program', 'Laporan Monev anggaran'],
    templateRekomendasi: ['Menyusun RKAM berbasis program dan kinerja', 'Melakukan analisis kebutuhan secara partisipatif', 'Menerapkan sistem monev anggaran'],
    active: true
  },
  {
    kode: 'E.2', aspek: 'E. Pembiayaan',
    pernyataan: 'Transparansi dan akuntabilitas pengelolaan keuangan',
    snp: 'Standar Pembiayaan', bobot: 3,
    penciri: [
      { level: 1, text: 'Pengelolaan keuangan tidak transparan, tidak ada laporan keuangan, tidak ada papan informasi anggaran, masyarakat dan stakeholder tidak tahu penggunaan dana madrasah, pertanggungjawaban keuangan tidak dilakukan.' },
      { level: 2, text: 'Pengelolaan keuangan mulai transparan terbatas (laporan ke komite), laporan keuangan sederhana, papan informasi ada tapi jarang diperbarui, pertanggungjawaban dilakukan tapi belum lengkap (hanya BOS).' },
      { level: 3, text: 'Pengelolaan keuangan transparan (papan informasi diperbarui rutin, laporan ke stakeholder), laporan keuangan lengkap dan tepat waktu, pertanggungjawaban semua sumber dana dilakukan, audit internal dilakukan.' },
      { level: 4, text: 'Pengelolaan keuangan sangat transparan dan akuntabel, informasi keuangan dapat diakses publik (online/offline), laporan keuangan terstandar dan diaudit independen, partisipasi stakeholder dalam perencanaan dan pengawasan keuangan, budaya transparansi menjadi nilai madrasah.' }
    ],
    contohBukti: ['Papan informasi anggaran', 'Laporan keuangan bulanan/tahunan', 'Laporan pertanggungjawaban BOS', 'Hasil audit'],
    templateRekomendasi: ['Memasang dan memperbarui papan informasi keuangan', 'Menyusun laporan keuangan secara rutin dan lengkap', 'Melibatkan komite dalam pengawasan keuangan'],
    active: true
  },
  {
    kode: 'E.3', aspek: 'E. Pembiayaan',
    pernyataan: 'Efisiensi dan efektivitas penggunaan anggaran',
    snp: 'Standar Pembiayaan', bobot: 3,
    penciri: [
      { level: 1, text: 'Penggunaan anggaran tidak efisien, banyak pemborosan, tidak ada analisis cost-benefit, pembelanjaan tidak sesuai perencanaan, realisasi anggaran menyimpang jauh dari rencana.' },
      { level: 2, text: 'Efisiensi mulai diperhatikan tapi belum sistematis, masih ada beberapa pembelanjaan yang tidak sesuai prioritas, realisasi anggaran cukup sesuai rencana (deviasi 20-30%), evaluasi efisiensi belum rutin.' },
      { level: 3, text: 'Penggunaan anggaran cukup efisien dan efektif, belanja sesuai prioritas program, realisasi sesuai rencana (deviasi < 20%), ada evaluasi efisiensi secara berkala, penghematan mulai dilakukan.' },
      { level: 4, text: 'Penggunaan anggaran sangat efisien dan efektif, setiap pengeluaran terukur dampaknya terhadap mutu, realisasi sesuai rencana (deviasi < 10%), sistem pengadaan dan pembelanjaan transparan dan kompetitif, budaya efisiensi dan efektivitas menjadi kebiasaan dalam setiap pengambilan keputusan keuangan.' }
    ],
    contohBukti: ['Laporan realisasi anggaran', 'Analisis cost-benefit program', 'Laporan evaluasi efisiensi', 'Dokumentasi pengadaan'],
    templateRekomendasi: ['Melakukan analisis cost-benefit setiap program', 'Mengevaluasi realisasi anggaran secara berkala', 'Menerapkan sistem pengadaan yang kompetitif'],
    active: true
  }
];

export default edmIndicatorsPart2;