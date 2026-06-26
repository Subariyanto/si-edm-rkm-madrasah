export const edmIndicators = [
  {
    kode: 'A.1', aspek: 'A. Budaya Kedisiplinan Warga Madrasah',
    pernyataan: 'Tingkat kehadiran siswa di madrasah',
    snp: 'Standar Kompetensi Lulusan', bobot: 4,
    penciri: [
      { level: 1, text: 'Tingkat kehadiran siswa ≤ 70% dari total hari efektif, tidak ada sistem pemantauan terstruktur, banyak siswa datang terlambat dan pulang sebelum waktunya, tidak ada tindak lanjut terhadap siswa yang tidak hadir.' },
      { level: 2, text: 'Tingkat kehadiran siswa 71-80% dari total hari efektif, sudah ada sistem pemantauan kehadiran (manual/buku absen) tapi belum konsisten, sebagian siswa masih terlambat, tindak lanjut ketidakhadiran masih terbatas pada teguran lisan.' },
      { level: 3, text: 'Tingkat kehadiran siswa 81-90% dari total hari efektif, sistem pemantauan kehadiran berjalan baik (buku absen harian diperiksa rutin), tindak lanjut ketidakhadiran dilakukan (surat pemberitahuan orang tua, kunjungan rumah untuk kasus khusus), keterlambatan siswa minimal.' },
      { level: 4, text: 'Tingkat kehadiran siswa 91-100% dari total hari efektif, sistem pemantauan terintegrasi digital (fingerprint/aplikasi), tindak lanjut cepat dan efektif (notifikasi real-time ke orang tua), keterlambatan hampir tidak ada, budaya hadir tepat waktu sudah membudaya di kalangan siswa.' }
    ],
    contohBukti: ['Buku absen harian siswa', 'Rekap kehadiran bulanan', 'Laporan tindak lanjut siswa tidak hadir', 'Surat pemberitahuan orang tua', 'Sistem fingerprint/digital'],
    templateRekomendasi: ['Membuat sistem pemantauan kehadiran siswa yang terstruktur', 'Menetapkan SOP penanganan siswa tidak hadir', 'Melibatkan orang tua dalam pemantauan kehadiran', 'Memberikan reward bagi siswa dengan kehadiran terbaik'],
    active: true
  },
  {
    kode: 'A.2', aspek: 'A. Budaya Kedisiplinan Warga Madrasah',
    pernyataan: 'Tingkat kehadiran guru di madrasah',
    snp: 'Standar Pendidik dan Tenaga Kependidikan', bobot: 3,
    penciri: [
      { level: 1, text: 'Tingkat kehadiran guru ≤ 70% dari total hari efektif, banyak guru datang terlambat dan pulang lebih awal, tidak ada sistem absensi guru yang terstruktur, pengganti guru yang tidak hadir tidak diatur.' },
      { level: 2, text: 'Tingkat kehadiran guru 71-80% dari total hari efektif, sudah ada sistem absensi guru (buku hadir) tapi pengawasan longgar, beberapa guru masih sering terlambat, guru pengganti kadang disiapkan tapi tidak selalu.' },
      { level: 3, text: 'Tingkat kehadiran guru 81-90% dari total hari efektif, sistem absensi guru berjalan baik (fingerprint/sidik jari), guru pengganti selalu disiapkan jika ada yang berhalangan, keterlambatan guru sudah jarang terjadi.' },
      { level: 4, text: 'Tingkat kehadiran guru 91-100% dari total hari efektif, sistem absensi digital terintegrasi, monitoring real-time oleh kepala madrasah, budaya disiplin tinggi di kalangan guru, guru pengganti dan mekanisme penggantian berjalan otomatis.' }
    ],
    contohBukti: ['Daftar hadir guru', 'Rekap kehadiran bulanan', 'Laporan fingerprint guru', 'Jadwal piket guru'],
    templateRekomendasi: ['Menerapkan sistem absensi digital untuk guru', 'Menetapkan aturan tegas tentang jam kerja guru', 'Menyusun mekanisme penggantian guru yang berhalangan'],
    active: true
  },
  {
    kode: 'A.3', aspek: 'A. Budaya Kedisiplinan Warga Madrasah',
    pernyataan: 'Tingkat kehadiran tenaga kependidikan di madrasah',
    snp: 'Standar Pendidik dan Tenaga Kependidikan', bobot: 3,
    penciri: [
      { level: 1, text: 'Tingkat kehadiran tenaga kependidikan ≤ 70%, tidak ada sistem absensi khusus untuk tenaga kependidikan, sering datang terlambat dan pulang sebelum jam kerja berakhir, layanan administrasi sering terhambat karena ketidakhadiran.' },
      { level: 2, text: 'Tingkat kehadiran tenaga kependidikan 71-80%, sudah ada sistem absensi tapi belum konsisten, beberapa tenaga kependidikan masih terlambat, layanan administrasi kadang terhambat.' },
      { level: 3, text: 'Tingkat kehadiran tenaga kependidikan 81-90%, sistem absensi berjalan baik, tenaga kependidikan hadir sesuai jam kerja, layanan administrasi berjalan lancar meski terkadang ada keterlambatan kecil.' },
      { level: 4, text: 'Tingkat kehadiran tenaga kependidikan 91-100%, sistem absensi digital terintegrasi, seluruh tenaga kependidikan hadir tepat waktu, layanan administrasi prima dan selalu tersedia selama jam kerja.' }
    ],
    contohBukti: ['Daftar hadir tenaga kependidikan', 'Rekap kehadiran bulanan', 'Jadwal piket TU', 'Laporan kinerja TU'],
    templateRekomendasi: ['Menerapkan sistem absensi untuk tenaga kependidikan', 'Mengatur jadwal piket TU dengan jelas', 'Memberikan reward/punishment terkait kehadiran'],
    active: true
  },
  {
    kode: 'A.4', aspek: 'A. Budaya Kedisiplinan Warga Madrasah',
    pernyataan: 'Ketepatan waktu kegiatan belajar mengajar',
    snp: 'Standar Proses', bobot: 3,
    penciri: [
      { level: 1, text: 'Kegiatan belajar mengajar sering dimulai terlambat > 15 menit dan berakhir tidak sesuai jadwal, tidak ada bel/tanda waktu yang jelas, transisi antar jam pelajaran tidak teratur, banyak jam pelajaran hilang.' },
      { level: 2, text: 'Kegiatan belajar mengajar kadang terlambat 5-10 menit, sudah ada bel/tanda waktu tapi tidak selalu diikuti, transisi antar jam pelajaran masih kurang teratur, beberapa jam pelajaran tidak efektif.' },
      { level: 3, text: 'Kegiatan belajar mengajar dimulai dan berakhir sesuai jadwal, bel/tanda waktu berfungsi dan dipatuhi, transisi antar jam pelajaran teratur, jam pelajaran efektif digunakan untuk pembelajaran.' },
      { level: 4, text: 'Kegiatan belajar mengajar berjalan tepat waktu setiap hari, bel otomatis terprogram, transisi antar jam pelajaran sangat efisien, tidak ada waktu belajar yang hilang, budaya tepat waktu menjadi kebiasaan seluruh warga madrasah.' }
    ],
    contohBukti: ['Jadwal bel/tanda waktu', 'Jadwal pelajaran', 'Laporan pengawasan KBM', 'Catatan keterlambatan KBM'],
    templateRekomendasi: ['Memasang bel otomatis untuk mengatur waktu KBM', 'Mengadakan pengawasan rutin ketepatan waktu KBM', 'Sosialisasi pentingnya ketepatan waktu kepada guru dan siswa'],
    active: true
  },
  {
    kode: 'A.5', aspek: 'A. Budaya Kedisiplinan Warga Madrasah',
    pernyataan: 'Kepatuhan terhadap tata tertib madrasah',
    snp: 'Standar Pengelolaan', bobot: 3,
    penciri: [
      { level: 1, text: 'Tata tertib madrasah tidak tersedia secara tertulis atau sudah usang, pelanggaran tata tertib sering terjadi tanpa sanksi, tidak ada monitoring kepatuhan, warga madrasah tidak memahami tata tertib.' },
      { level: 2, text: 'Tata tertib madrasah tersedia secara tertulis tapi belum disosialisasikan dengan baik, masih ada pelanggaran yang tidak ditindaklanjuti, monitoring kepatuhan belum rutin, sebagian warga madrasah belum memahami tata tertib.' },
      { level: 3, text: 'Tata tertib madrasah tersedia, disosialisasikan, dan diterapkan dengan baik, pelanggaran ditindaklanjuti sesuai aturan, monitoring kepatuhan dilakukan rutin, sebagian besar warga madrasah mematuhi tata tertib.' },
      { level: 4, text: 'Tata tertib madrasah komprehensif, disosialisasikan secara berkala, ditaati seluruh warga madrasah, sistem reward and punishment berjalan efektif, budaya kepatuhan terhadap tata tertib sudah menjadi karakter warga madrasah.' }
    ],
    contohBukti: ['Dokumen tata tertib madrasah', 'Buku pelanggaran dan sanksi', 'Laporan monitoring kepatuhan', 'Dokumentasi sosialisasi tata tertib'],
    templateRekomendasi: ['Menyusun atau memperbarui tata tertib madrasah', 'Melakukan sosialisasi tata tertib secara berkala', 'Membentuk tim monitoring kepatuhan tata tertib'],
    active: true
  },
  {
    kode: 'A.6', aspek: 'A. Budaya Kedisiplinan Warga Madrasah',
    pernyataan: 'Budaya bersih, rapi, dan sehat warga madrasah',
    snp: 'Standar Sarana Prasarana', bobot: 3,
    penciri: [
      { level: 1, text: 'Lingkungan madrasah kotor dan tidak terawat, tidak ada jadwal piket kebersihan yang teratur, sampah berserakan, toilet kotor dan tidak terawat, tidak ada program kesehatan madrasah (UKS tidak berfungsi).' },
      { level: 2, text: 'Lingkungan madrasah cukup bersih, ada jadwal piket tapi pelaksanaannya tidak konsisten, masih ada sampah di beberapa area, toilet cukup terawat, UKS ada tapi belum berfungsi optimal.' },
      { level: 3, text: 'Lingkungan madrasah bersih dan rapi, jadwal piket berjalan rutin, sistem pembuangan sampah terkelola dengan baik, toilet bersih dan terawat, UKS berfungsi dengan baik, ada program kesehatan berkala.' },
      { level: 4, text: 'Lingkungan madrasah sangat bersih, rapi, dan asri, program kebersihan terintegrasi dengan pembelajaran (adiwiyata), toilet standar tinggi, UKS prima, program kesehatan preventif berjalan rutin, budaya bersih dan sehat membudaya pada seluruh warga madrasah.' }
    ],
    contohBukti: ['Jadwal piket kebersihan', 'Dokumentasi lingkungan madrasah', 'Laporan kegiatan UKS', 'Program adiwiyata'],
    templateRekomendasi: ['Mengaktifkan jadwal piket kebersihan rutin', 'Mengadakan program Jumat Bersih', 'Mengoptimalkan fungsi UKS', 'Menerapkan program pengelolaan sampah'],
    active: true
  },
  {
    kode: 'A.7', aspek: 'A. Budaya Kedisiplinan Warga Madrasah',
    pernyataan: 'Keteladanan dalam pembiasaan ibadah dan akhlak',
    snp: 'Standar Kompetensi Lulusan', bobot: 3,
    penciri: [
      { level: 1, text: 'Tidak ada program pembiasaan ibadah terstruktur, guru dan siswa tidak melaksanakan ibadah berjamaah, tidak ada teladan dari guru dalam berakhlak, pelanggaran akhlak sering terjadi tanpa pembinaan.' },
      { level: 2, text: 'Ada program pembiasaan ibadah tapi belum rutin (shalat dhuha/jumat hanya kadang-kadang), sebagian guru ikut berjamaah, ada pembinaan akhlak tapi belum terstruktur, pelanggaran akhlak masih terjadi.' },
      { level: 3, text: 'Program pembiasaan ibadah berjalan rutin (shalat dhuha, dhuhur berjamaah, tadarus), sebagian besar guru menjadi teladan, pembinaan akhlak terstruktur, pelanggaran akhlak minimal dan ditangani dengan baik.' },
      { level: 4, text: 'Program pembiasaan ibadah komprehensif dan membudaya (shalat berjamaah, dhuha, tadarus, tahfidz, kultum), seluruh guru menjadi teladan utama dalam ibadah dan akhlak, pembinaan akhlak terintegrasi dalam semua mata pelajaran, budaya akhlak mulia menjadi karakter khas madrasah.' }
    ],
    contohBukti: ['Jadwal shalat berjamaah', 'Program pembiasaan ibadah', 'Buku monitoring ibadah siswa', 'Dokumentasi kegiatan keagamaan'],
    templateRekomendasi: ['Menyusun jadwal pembiasaan ibadah harian', 'Mengadakan pelatihan keteladanan bagi guru', 'Mengintegrasikan pendidikan akhlak dalam semua mata pelajaran'],
    active: true
  },
  // ASPEK B
  {
    kode: 'B.1', aspek: 'B. Budaya Pengembangan Diri GTK',
    pernyataan: 'Partisipasi guru dalam pelatihan/workshop/bimtek',
    snp: 'Standar Pendidik dan Tenaga Kependidikan', bobot: 3,
    penciri: [
      { level: 1, text: 'Partisipasi guru dalam pelatihan < 1 kali per tahun, tidak ada perencanaan pengembangan kompetensi guru, guru tidak termotivasi mengikuti pelatihan, tidak ada anggaran untuk pengembangan guru.' },
      { level: 2, text: 'Partisipasi guru dalam pelatihan 1-2 kali per tahun, perencanaan pengembangan guru belum terstruktur, sebagian guru mengikuti pelatihan sesuai penugasan, anggaran pengembangan guru terbatas.' },
      { level: 3, text: 'Partisipasi guru dalam pelatihan 2-3 kali per tahun, ada perencanaan pengembangan kompetensi guru yang cukup baik, mayoritas guru aktif mengikuti pelatihan, anggaran pengembangan guru tersedia.' },
      { level: 4, text: 'Partisipasi guru dalam pelatihan > 3 kali per tahun, perencanaan pengembangan guru terstruktur dan berbasis kebutuhan, semua guru aktif mengikuti berbagai pelatihan, madrasah memiliki program pengembangan guru yang berkelanjutan, anggaran memadai.' }
    ],
    contohBukti: ['Sertifikat pelatihan guru', 'Laporan hasil pelatihan', 'Rencana pengembangan kompetensi guru', 'Dokumentasi kegiatan pelatihan'],
    templateRekomendasi: ['Menyusun rencana pengembangan kompetensi guru tahunan', 'Mengalokasikan anggaran khusus untuk pelatihan guru', 'Mengirim guru secara bergilir ke pelatihan-pelatihan'],
    active: true
  },
  {
    kode: 'B.2', aspek: 'B. Budaya Pengembangan Diri GTK',
    pernyataan: 'Partisipasi guru dalam KKG/MGMP',
    snp: 'Standar Pendidik dan Tenaga Kependidikan', bobot: 3,
    penciri: [
      { level: 1, text: 'Guru tidak mengikuti kegiatan KKG/MGMP, tidak ada dukungan madrasah untuk kegiatan KKG/MGMP, guru bekerja sendiri-sendiri tanpa forum komunikasi profesional.' },
      { level: 2, text: 'Sebagian guru (< 50%) mengikuti KKG/MGMP secara tidak rutin, dukungan madrasah terbatas, forum KKG/MGMP belum memberikan dampak signifikan pada pembelajaran.' },
      { level: 3, text: 'Sebagian besar guru (50-75%) aktif mengikuti KKG/MGMP secara rutin, madrasah mendukung dengan alokasi waktu dan dana, hasil KKG/MGMP mulai diterapkan dalam pembelajaran.' },
      { level: 4, text: 'Semua guru (> 75%) aktif mengikuti KKG/MGMP secara rutin, madrasah menjadi tempat penyelenggaraan KKG/MGMP, hasil forum diterapkan dan dibagikan secara luas, KKG/MGMP menjadi wadah inovasi pembelajaran.' }
    ],
    contohBukti: ['Daftar hadir KKG/MGMP', 'Laporan kegiatan KKG/MGMP', 'Materi hasil KKG/MGMP', 'Dokumentasi penerapan hasil'],
    templateRekomendasi: ['Mengalokasikan waktu dan dana untuk KKG/MGMP', 'Mewajibkan guru mengikuti KKG/MGMP rutin', 'Menjadikan madrasah sebagai tuan rumah KKG/MGMP bergilir'],
    active: true
  },
  {
    kode: 'B.3', aspek: 'B. Budaya Pengembangan Diri GTK',
    pernyataan: 'Pengembangan profesi berkelanjutan guru',
    snp: 'Standar Pendidik dan Tenaga Kependidikan', bobot: 4,
    penciri: [
      { level: 1, text: 'Tidak ada guru yang melakukan pengembangan profesi berkelanjutan (penelitian, karya tulis, publikasi), tidak ada program PKB di madrasah, guru tidak memahami konsep PKB.' },
      { level: 2, text: 'Ada 1-2 guru yang mulai merintis PKB (PTK/artikel sederhana), madrasah mulai mendorong PKB tapi belum terprogram, hasil PKB belum dipublikasikan atau dimanfaatkan.' },
      { level: 3, text: 'Beberapa guru (25-50%) aktif melakukan PKB (PTK, artikel, modul), madrasah memiliki program PKB tahunan, hasil PKB dipresentasikan dalam forum internal, mulai ada karya yang dipublikasikan.' },
      { level: 4, text: 'Mayoritas guru (> 50%) aktif melakukan PKB secara berkelanjutan, madrasah memiliki program PKB terstruktur dengan anggaran khusus, banyak karya guru dipublikasikan di jurnal/forum ilmiah, budaya meneliti dan menulis membudaya.' }
    ],
    contohBukti: ['Karya tulis/PTK guru', 'Publikasi jurnal', 'Program PKB madrasah', 'Dokumentasi seminar internal'],
    templateRekomendasi: ['Menyusun program PKB tahunan', 'Mengadakan workshop penulisan karya ilmiah', 'Mendorong dan memfasilitasi publikasi karya guru'],
    active: true
  },
  {
    kode: 'B.4', aspek: 'B. Budaya Pengembangan Diri GTK',
    pernyataan: 'Budaya berbagi pengetahuan dan praktik baik antar guru',
    snp: 'Standar Pendidik dan Tenaga Kependidikan', bobot: 3,
    penciri: [
      { level: 1, text: 'Tidak ada forum berbagi pengetahuan antar guru, guru bekerja terisolasi di kelas masing-masing, praktik baik tidak terdokumentasi atau dibagikan, tidak ada budaya saling belajar.' },
      { level: 2, text: 'Ada forum berbagi terbatas (rapat dinas kadang membahas praktik baik), beberapa guru mau berbagi tapi belum terstruktur, praktik baik mulai terdokumentasi secara informal.' },
      { level: 3, text: 'Ada forum berbagi rutin (sharing session bulanan, peer observation), guru secara sukarela berbagi praktik baik, praktik baik terdokumentasi dalam bentuk catatan sederhana, budaya berbagi mulai tumbuh.' },
      { level: 4, text: 'Forum berbagi pengetahuan terstruktur dan rutin (in-house training, lesson study, peer coaching), semua guru aktif berbagi dan belajar dari rekan, praktik baik terdokumentasi digital dan menjadi sumber belajar madrasah, budaya berbagi menjadi nilai inti madrasah.' }
    ],
    contohBukti: ['Laporan sharing session', 'Dokumentasi praktik baik', 'Jadwal peer observation', 'Repo praktik baik digital'],
    templateRekomendasi: ['Menyelenggarakan sharing session rutin antar guru', 'Mendokumentasikan praktik baik dalam bentuk digital', 'Menerapkan program lesson study'],
    active: true
  },
  // ASPEK C
  {
    kode: 'C.1', aspek: 'C. Proses Pembelajaran',
    pernyataan: 'Persiapan RPP/modul ajar oleh guru',
    snp: 'Standar Proses', bobot: 5,
    penciri: [
      { level: 1, text: 'RPP/modul ajar tidak tersedia atau hanya copy-paste dari internet, tidak direview oleh kepala madrasah/pengawas, guru mengajar tanpa persiapan tertulis, RPP tidak sesuai dengan kondisi siswa.' },
      { level: 2, text: 'RPP/modul ajar tersedia tapi belum lengkap untuk semua KD/materi, review oleh kepala madrasah dilakukan tapi tidak rutin, sebagian RPP masih copy-paste, beberapa guru mengajar tanpa RPP.' },
      { level: 3, text: 'RPP/modul ajar tersedia lengkap untuk semua KD/materi, direview dan disahkan oleh kepala madrasah secara berkala, RPP disusun sesuai kondisi siswa dan konteks madrasah, sebagian besar guru mengajar berdasarkan RPP.' },
      { level: 4, text: 'RPP/modul ajar tersedia lengkap, kreatif, dan inovatif untuk semua materi, disusun bersama dalam tim guru mata pelajaran, direview rutin dan direvisi berdasarkan hasil evaluasi pembelajaran, semua guru menggunakan RPP sebagai panduan mengajar yang dinamis.' }
    ],
    contohBukti: ['Dokumen RPP/modul ajar semua mapel', 'Lembar pengesahan/review RPP', 'Dokumentasi penyusunan RPP bersama', 'Hasil supervisi RPP'],
    templateRekomendasi: ['Mengadakan workshop penyusunan RPP/modul ajar', 'Melakukan review dan pengesahan RPP secara berkala', 'Menyusun RPP secara kolaboratif dalam tim guru mapel'],
    active: true
  },
  {
    kode: 'C.2', aspek: 'C. Proses Pembelajaran',
    pernyataan: 'Pelaksanaan pembelajaran sesuai RPP/modul ajar',
    snp: 'Standar Proses', bobot: 5,
    penciri: [
      { level: 1, text: 'Pembelajaran tidak sesuai dengan RPP yang disusun, tidak ada korelasi antara RPP dan praktik mengajar di kelas, guru mengajar secara spontan tanpa mengikuti perencanaan, supervisi pembelajaran tidak dilakukan.' },
      { level: 2, text: 'Pembelajaran sebagian sesuai RPP, masih ada kesenjangan antara perencanaan dan pelaksanaan, supervisi pembelajaran dilakukan tapi jarang, beberapa guru masih mengajar tidak sesuai RPP.' },
      { level: 3, text: 'Pembelajaran sesuai dengan RPP pada sebagian besar aspek (pendahuluan, inti, penutup), supervisi pembelajaran dilakukan rutin oleh kepala madrasah, umpan balik hasil supervisi ditindaklanjuti.' },
      { level: 4, text: 'Pembelajaran sepenuhnya sesuai RPP dengan penyesuaian kontekstual yang tepat, supervisi pembelajaran klinis dilakukan rutin dan konstruktif, hasil supervisi menjadi bahan perbaikan berkelanjutan, RPP dan praktik mengajar saling memperkuat.' }
    ],
    contohBukti: ['Laporan supervisi pembelajaran', 'Instrumen supervisi', 'Dokumentasi pembelajaran', 'Tindak lanjut supervisi'],
    templateRekomendasi: ['Meningkatkan frekuensi supervisi pembelajaran', 'Memberikan umpan balik konstruktif hasil supervisi', 'Mengadakan peer observation antar guru'],
    active: true
  },
  {
    kode: 'C.3', aspek: 'C. Proses Pembelajaran',
    pernyataan: 'Penggunaan metode pembelajaran variatif dan inovatif',
    snp: 'Standar Proses', bobot: 4,
    penciri: [
      { level: 1, text: 'Metode pembelajaran monoton (ceramah terus-menerus), tidak ada variasi metode, siswa pasif dalam pembelajaran, tidak ada penggunaan model pembelajaran inovatif.' },
      { level: 2, text: 'Mulai ada variasi metode pembelajaran (ceramah + diskusi/tanya jawab), kadang-kadang menggunakan model pembelajaran tertentu, siswa mulai dilibatkan tapi belum aktif sepenuhnya, beberapa guru mencoba metode baru.' },
      { level: 3, text: 'Metode pembelajaran bervariasi dan disesuaikan dengan materi (diskusi, penugasan, demonstrasi, eksperimen), menggunakan model pembelajaran yang sesuai (PBL, discovery, cooperative), siswa aktif dalam pembelajaran, penggunaan metode inovatif konsisten.' },
      { level: 4, text: 'Metode pembelajaran sangat bervariasi, inovatif, dan adaptif terhadap kebutuhan siswa, penggunaan berbagai model pembelajaran mutakhir (PBL, PJBL, inquiry, design thinking), siswa menjadi pusat pembelajaran (student-centered), inovasi metode pembelajaran menjadi budaya di madrasah.' }
    ],
    contohBukti: ['Dokumentasi variasi metode pembelajaran', 'RPP dengan model pembelajaran inovatif', 'Foto/video pembelajaran', 'Hasil karya siswa'],
    templateRekomendasi: ['Mengadakan pelatihan metode pembelajaran inovatif', 'Mendorong penerapan student-centered learning', 'Menyediakan media dan alat bantu pembelajaran'],
    active: true
  },
  {
    kode: 'C.4', aspek: 'C. Proses Pembelajaran',
    pernyataan: 'Pelaksanaan penilaian formatif dan sumatif',
    snp: 'Standar Penilaian Pendidikan', bobot: 4,
    penciri: [
      { level: 1, text: 'Penilaian hanya mengandalkan ujian sumatif (UTS/UAS), tidak ada penilaian formatif, instrumen penilaian tidak terstandar, penilaian sikap/keterampilan tidak dilakukan, hasil penilaian hanya berupa angka tanpa deskripsi.' },
      { level: 2, text: 'Penilaian formatif mulai dilakukan (kuis, tugas) tapi belum terstruktur, instrumen penilaian sederhana, penilaian sikap dan keterampilan mulai dilakukan tapi belum lengkap, hasil penilaian belum dianalisis mendalam.' },
      { level: 3, text: 'Penilaian formatif dan sumatif dilakukan secara terstruktur, instrumen penilaian bervariasi (tes, observasi, portofolio, proyek), penilaian sikap, pengetahuan, dan keterampilan dilakukan seimbang, hasil penilaian digunakan untuk perbaikan.' },
      { level: 4, text: 'Sistem penilaian komprehensif mencakup assessment for, as, and of learning, instrumen penilaian terstandar dan terkalibrasi, penilaian autentik dan berbasis proyek dominan, rubrik penilaian jelas dan dikomunikasikan ke siswa, hasil penilaian terintegrasi dengan sistem informasi madrasah.' }
    ],
    contohBukti: ['Instrumen penilaian', 'Kisi-kisi soal', 'Portofolio siswa', 'Rubrik penilaian', 'Rekap nilai'],
    templateRekomendasi: ['Menyusun instrumen penilaian yang bervariasi', 'Menerapkan penilaian autentik berbasis proyek', 'Mengintegrasikan penilaian sikap, pengetahuan, dan keterampilan'],
    active: true
  },
  {
    kode: 'C.5', aspek: 'C. Proses Pembelajaran',
    pernyataan: 'Pelaksanaan program remedial dan pengayaan',
    snp: 'Standar Penilaian Pendidikan', bobot: 4,
    penciri: [
      { level: 1, text: 'Tidak ada program remedial dan pengayaan, siswa yang belum tuntas tidak mendapat perlakuan khusus, siswa yang sudah tuntas tidak mendapat pengayaan, semua siswa mendapat pembelajaran yang sama tanpa diferensiasi.' },
      { level: 2, text: 'Program remedial dilakukan secara informal (pemberian tugas tambahan), pengayaan belum terprogram, remedial dilakukan seragam untuk semua siswa yang belum tuntas, belum ada analisis kebutuhan remedial/pengayaan per siswa.' },
      { level: 3, text: 'Program remedial dan pengayaan dilaksanakan secara terstruktur, remedial disesuaikan dengan kesulitan masing-masing siswa, pengayaan diberikan kepada siswa yang sudah tuntas, dokumentasi pelaksanaan tersedia.' },
      { level: 4, text: 'Program remedial dan pengayaan terintegrasi dalam sistem pembelajaran, remedial berbasis diagnosis kesulitan belajar individual, pengayaan menantang dan mengembangkan potensi siswa, ada program akselerasi untuk siswa berbakat, monitoring dan evaluasi program berjalan baik.' }
    ],
    contohBukti: ['Jadwal remedial/pengayaan', 'Laporan pelaksanaan remedial', 'Materi pengayaan', 'Analisis hasil remedial'],
    templateRekomendasi: ['Menyusun program remedial dan pengayaan terstruktur', 'Melakukan diagnosis kesulitan belajar per siswa', 'Mengembangkan materi pengayaan yang menantang'],
    active: true
  },
  {
    kode: 'C.6', aspek: 'C. Proses Pembelajaran',
    pernyataan: 'Analisis hasil penilaian pembelajaran',
    snp: 'Standar Penilaian Pendidikan', bobot: 4,
    penciri: [
      { level: 1, text: 'Tidak ada analisis hasil penilaian, nilai hanya direkap tanpa analisis lebih lanjut, daya serap per KD tidak dihitung, kesulitan belajar siswa tidak teridentifikasi dari hasil penilaian.' },
      { level: 2, text: 'Analisis hasil penilaian dilakukan secara sederhana (rata-rata, nilai tertinggi/terendah), daya serap per KD mulai dihitung tapi tidak rutin, belum ada analisis butir soal, hasil analisis belum digunakan untuk perbaikan.' },
      { level: 3, text: 'Analisis hasil penilaian dilakukan secara rutin dan cukup mendalam (daya serap per KD, analisis butir soal untuk ujian), hasil analisis dijadikan dasar remedial dan perbaikan pembelajaran, guru memahami kekuatan dan kelemahan siswanya dari data.' },
      { level: 4, text: 'Analisis hasil penilaian dilakukan secara komprehensif menggunakan teknik statistik, hasil analisis terintegrasi digital (software analisis), digunakan untuk perbaikan kurikulum, strategi pembelajaran, dan kebijakan madrasah, analisis dilakukan bersama dalam tim guru.' }
    ],
    contohBukti: ['Laporan analisis hasil penilaian', 'Grafik daya serap per KD', 'Analisis butir soal', 'Rekomendasi hasil analisis'],
    templateRekomendasi: ['Melakukan analisis butir soal secara rutin', 'Menghitung daya serap per KD dan per indikator', 'Menggunakan hasil analisis untuk perbaikan pembelajaran'],
    active: true
  },
  {
    kode: 'C.7', aspek: 'C. Proses Pembelajaran',
    pernyataan: 'Tindak lanjut hasil penilaian untuk perbaikan pembelajaran',
    snp: 'Standar Penilaian Pendidikan', bobot: 3,
    penciri: [
      { level: 1, text: 'Tidak ada tindak lanjut dari hasil penilaian, pembelajaran tetap sama tanpa perubahan meskipun hasil penilaian rendah, tidak ada umpan balik ke siswa, kesalahan siswa tidak dibahas.' },
      { level: 2, text: 'Tindak lanjut terbatas pada perbaikan nilai (remidi), belum ada perubahan strategi pembelajaran berdasarkan hasil penilaian, umpan balik ke siswa masih umum, pembahasan kesalahan siswa dilakukan sekilas.' },
      { level: 3, text: 'Tindak lanjut dilakukan secara sistematis: remedial untuk yang belum tuntas, pengayaan untuk yang tuntas, strategi pembelajaran disesuaikan berdasarkan hasil analisis, umpan balik spesifik diberikan ke siswa, kemajuan siswa dimonitor.' },
      { level: 4, text: 'Tindak lanjut hasil penilaian komprehensif: perubahan strategi pembelajaran berbasis data, program intervensi individual, pelibatan orang tua dalam tindak lanjut, siklus Plan-Do-Check-Act (PDCA) berjalan, terjadi peningkatan hasil belajar yang signifikan dan berkelanjutan.' }
    ],
    contohBukti: ['Rencana tindak lanjut hasil penilaian', 'Laporan pelaksanaan tindak lanjut', 'Dokumentasi perubahan strategi pembelajaran', 'Grafik peningkatan hasil belajar'],
    templateRekomendasi: ['Menyusun rencana tindak lanjut hasil penilaian', 'Menerapkan siklus PDCA dalam perbaikan pembelajaran', 'Melibatkan orang tua dalam program tindak lanjut'],
    active: true
  }
];

export default edmIndicators;