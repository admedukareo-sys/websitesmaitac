-- ==============================================================================
-- SUPABASE POSTGRESQL SCHEMA & SEED DATA UNTUK SMA IT ANDALAS CENDEKIA
-- Compatible with Supabase SQL Editor (PostgreSQL 15+)
-- ==============================================================================

-- Drop existing tables if needed (in reverse dependency order)
DROP TABLE IF EXISTS registrations CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS hero_slides CASCADE;
DROP TABLE IF EXISTS facilities CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS curriculum CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS events CASCADE;

-- --------------------------------------------------------
-- 1. TABEL: users (Akun Pengguna & Admin)
-- --------------------------------------------------------
CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'STUDENT' CHECK (role IN ('STUDENT', 'ADMIN')),
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 2. TABEL: registrations (Pendaftaran SPMB & Daftar Tunggu)
-- --------------------------------------------------------
CREATE TABLE registrations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  nisn TEXT,
  nik TEXT,
  birth_place TEXT,
  birth_date DATE,
  gender TEXT CHECK (gender IN ('L', 'P')),
  address TEXT,
  father_name TEXT,
  mother_name TEXT,
  parent_phone TEXT,
  previous_school TEXT,
  status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'SUBMITTED', 'VERIFIED', 'REJECTED', 'PASSED', 'FAILED', 'REGISTERED')),
  rejection_reason TEXT,
  akta_url TEXT,
  kk_url TEXT,
  foto_url TEXT,
  rapor_url TEXT,
  payment_proof_url TEXT,
  payment_status TEXT NOT NULL DEFAULT 'UNPAID' CHECK (payment_status IN ('UNPAID', 'PENDING', 'VERIFIED')),
  test_score DECIMAL(5,2),
  interview_notes TEXT,
  re_registration_proof_url TEXT,
  uniform_size TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 3. TABEL: site_settings (Pengaturan Profil, Visi, Sambutan Kepsek)
-- --------------------------------------------------------
CREATE TABLE site_settings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  school_name TEXT NOT NULL DEFAULT 'SMA IT Andalas Cendekia',
  tagline TEXT NOT NULL DEFAULT 'Sekolah Generasi Pemimpin Qur’ani',
  visi TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT NOT NULL,
  npsn TEXT NOT NULL DEFAULT '20104766',
  accreditation TEXT NOT NULL DEFAULT 'Akreditasi A',
  video_url TEXT NOT NULL,
  facebook_url TEXT DEFAULT 'https://facebook.com',
  instagram_url TEXT DEFAULT 'https://instagram.com',
  youtube_url TEXT DEFAULT 'https://youtube.com',
  principal_name TEXT DEFAULT 'Fadhilah Ikhtiarni, M.Pd.',
  principal_title TEXT DEFAULT 'Kepala Sekolah SMA IT Andalas Cendekia',
  principal_message TEXT,
  principal_photo_url TEXT,
  history_text TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 4. TABEL: teachers (Tenaga Pendidik, Guru & Staff)
-- --------------------------------------------------------
CREATE TABLE teachers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  mapel TEXT NOT NULL,
  strata TEXT NOT NULL DEFAULT 'S1',
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 5. TABEL: hero_slides (Carousel Slides Beranda)
-- --------------------------------------------------------
CREATE TABLE hero_slides (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  badge TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  primary_cta_text TEXT,
  primary_cta_link TEXT,
  secondary_cta_text TEXT,
  secondary_cta_link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 6. TABEL: facilities (Fasilitas Kampus)
-- --------------------------------------------------------
CREATE TABLE facilities (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Akademik', 'Keagamaan', 'Teknologi', 'Olahraga & Terbuka')),
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 7. TABEL: testimonials (Testimoni Orang Tua & Alumni)
-- --------------------------------------------------------
CREATE TABLE testimonials (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  quote TEXT NOT NULL,
  avatar_url TEXT NOT NULL,
  time_ago TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 8. TABEL: activities (Prestasi & Ekskul)
-- --------------------------------------------------------
CREATE TABLE activities (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Prestasi', 'Aktivitas Kesiswaan', 'Ekstrakurikuler')),
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  student_name TEXT NOT NULL,
  achievement_badge TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 9. TABEL: curriculum (Program Kurikulum & Tahfidz)
-- --------------------------------------------------------
CREATE TABLE curriculum (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Program Tahfidz', 'Program Kurikulum', 'Profil Lulusan')),
  target TEXT NOT NULL,
  description TEXT NOT NULL,
  badge_color TEXT DEFAULT 'bg-emerald-600',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 10. TABEL: news (Berita & Pengumuman)
-- --------------------------------------------------------
CREATE TABLE news (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Berita Terkini', 'Kegiatan Sekolah', 'Prestasi', 'Galeri')),
  date TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Admin',
  comments_count INT NOT NULL DEFAULT 0,
  image_url TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 11. TABEL: events (Agenda Acara)
-- --------------------------------------------------------
CREATE TABLE events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  day TEXT NOT NULL,
  month TEXT NOT NULL,
  title TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  organizer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES FOR SUPABASE
-- ==============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE curriculum ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public all on users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on registrations" ON registrations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on teachers" ON teachers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on hero_slides" ON hero_slides FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on facilities" ON facilities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on testimonials" ON testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on activities" ON activities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on curriculum" ON curriculum FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on news" ON news FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on events" ON events FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

INSERT INTO users (name, email, role, password) VALUES
('Administrator SPMB', 'admin@smait.sch.id', 'ADMIN', 'admin'),
('Ahmad Zaki', 'zaki@gmail.com', 'STUDENT', 'password123'),
('Fatimah Az-Zahra', 'fatimah@gmail.com', 'STUDENT', 'password123');

INSERT INTO registrations (user_id, nisn, nik, birth_place, birth_date, gender, address, father_name, mother_name, parent_phone, previous_school, status, payment_status, payment_proof_url) VALUES
(2, '0051234567', '1371012304050001', 'Pulau Punjung', '2008-05-14', 'L', 'Jorong Ranah Lintas, Dharmasraya', 'Budi Santoso', 'Siti Aminah', '081266778899', 'SMP Negeri 1 Pulau Punjung', 'SUBMITTED', 'PENDING', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'),
(3, '0059876543', '1371012304050002', 'Sungai Dareh', '2008-08-20', 'P', 'Nagari Tebing Tinggi, Dharmasraya', 'Rahman Hakim', 'Nurhaliza', '081399887766', 'MTsN 1 Dharmasraya', 'DRAFT', 'UNPAID', NULL);

INSERT INTO site_settings (school_name, tagline, visi, address, phone, email, website, npsn, accreditation, video_url, facebook_url, instagram_url, youtube_url, principal_name, principal_title, principal_message, principal_photo_url, history_text) VALUES
('SMA IT Andalas Cendekia', 'Sekolah Generasi Pemimpin Qur’ani', 'Mewujudkan Siswa Generasi Pemimpin Qur’ani', 'Jorong Ranah Lintas, Nagari Tebing Tinggi, Kec. Pulau Punjung, Kab. Dharmasraya, Prov. Sumatera Barat', '0812-6655-8123', 'smaitandalascendekia@gmail.com', 'https://smait.andalascendekia.sch.id/', '20104766', 'Akreditasi A', 'https://www.youtube.com/embed/9E09XrFAi_s?autoplay=1', 'https://facebook.com', 'https://instagram.com', 'https://youtube.com', 'Fadhilah Ikhtiarni, M.Pd.', 'Kepala Sekolah SMA IT Andalas Cendekia', 'Assalamu''alaikum Warahmatullahi Wabarakatuh. Selamat datang di portal resmi SMA IT Andalas Cendekia. Kami berkomitmen menyelenggarakan pendidikan yang membekali pendidikan agama, adab dan akhlak mulia, kecakapan hidup kekinian, serta penguasaan sains dan teknologi untuk membentuk Generasi Pemimpin Qur''ani.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', 'SMA IT Andalas Cendekia didirikan pada tanggal 5 Mei 2024 di Kabupaten Dharmasraya, Sumatera Barat. Lembaga ini hadir sebagai komitmen nyata untuk mencetak generasi pemimpin Qur''ani yang berakhlak mulia, cerdas akademis, berwawasan global, dan siap bersaing di perguruan tinggi terkemuka.');

INSERT INTO teachers (name, role, mapel, strata) VALUES
('Fadhilah Ikhtiarni, M.Pd.', 'Kepala Sekolah', 'Manajerial & Kepemimpinan', 'S2'),
('Novrika mawarni, S.Pd.', 'Waka Kurikulum', 'Biologi, Kimia, B. Inggris, Mentoring Qur''anic Leader', 'S1'),
('Sherly Mairiyasti L., S.Pd.', 'Waka Kesiswaan', 'Ekonomi, Sejarah, Geografi, Sosiologi', 'S1'),
('Rayun Sucinda, M.Pd.', 'Waka Sarpras', 'Adab & Al-Qur''an, Pendidikan Pancasila', 'S2'),
('Yuyun Rahmanita, S.Kom.', 'Tata Usaha / Administrasi', 'Sistem Informasi & Administrasi', 'S1'),
('Vivi Safitri, S.Pd.', 'Guru Bidang Studi', 'Bahasa Indonesia', 'S1'),
('Ade Pahmi Paizal, S.T', 'Guru Bidang Studi', 'Informatika & Komputer', 'S1'),
('Febri Uljapi, S.Hum', 'Guru Bidang Studi', 'Bahasa Arab, Akidah, Fiqh, Sejarah Peradaban Islam', 'S1'),
('St. Irvan Charis, S.Pd.', 'Guru Bidang Studi', 'PJOK (Pendidikan Jasmani Olahraga)', 'S1'),
('Dela Oktavia H., S.Pd.', 'Guru Bidang Studi', 'Bimbingan Konseling (BK)', 'S1');

INSERT INTO hero_slides (badge, title, description, image_url, primary_cta_text, primary_cta_link, secondary_cta_text, secondary_cta_link) VALUES
('Penerimaan Siswa Baru 2026/2027 Telah Dibuka', 'Membentuk Generasi Qurani, Cerdas, dan Berprestasi', 'SMA IT Andalas Cendekia memadukan kurikulum nasional dan keislaman untuk mencetak pemimpin masa depan yang berakhlak mulia dan berwawasan global.', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80', 'Daftar SPMB Sekarang', '/spmb', 'Pelajari Lebih Lanjut', '/profil'),
('Program Unggulan Tahfidz Al-Qur''an', 'Target Hafalan 5-10 Juz Berlandaskan Adab Islami', 'Pendampingan halaqah Al-Qur''an harian bersama musyrif & musyrifah berpengalaman untuk mencetak alumni penghafal Al-Qur''an mutqin.', 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1920&q=80', 'Lihat Kurikulum & Program', '/kurikulum', 'Portal SPMB', '/spmb');

INSERT INTO facilities (title, category, description, image_url) VALUES
('Smart Classroom Interaktif', 'Akademik', 'Ruang kelas dilengkapi pendingin udara, layar sentuh digital interaktif, dan sound system pendukung.', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'),
('Laboratorium Komputer & Robotics', 'Teknologi', 'Perangkat PC spesifikasi tinggi, jaringan internet gigabit, dan kit eksperimen kecerdasan buatan (AI) & IoT.', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'),
('Masjid & Halaqah Center', 'Keagamaan', 'Pusat kegiatan ibadah, Shalat Jamaah harian, serta halaqah Tahfidz Al-Qur''an dengan kapasitas 500+ jamaah.', 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=800&q=80'),
('Perpustakaan Digital & Literasi', 'Akademik', 'Koleksi e-book 10.000+ judul, area membaca yang nyaman, serta ruang diskusi terbuka.', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80'),
('Lapangan Olahraga Multi-fungsi', 'Olahraga & Terbuka', 'Sarana olahraga basket, futsal, voli, dan arena olahraga panahan bertaraf standar nasional.', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80'),
('Taman Pembelajaran Terbuka & Gazebo', 'Olahraga & Terbuka', 'Lingkungan kampus asri dan hijau yang mendukung kegiatan outdoor study dan istirahat siswa.', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80');

INSERT INTO testimonials (name, role, rating, quote, avatar_url, time_ago) VALUES
('Dr. H. Hendra Wijaya, M.Si.', 'Orang Tua Siswa Kelas XI', 5, 'Alhamdulillah, perkembangan hafalan Al-Qur''an dan kedisiplinan anak saya meningkat drastis semenjak bersekolah di SMA IT Andalas Cendekia. Guru-gurunya sangat perhatian dan bimbingannya sangat intensif.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', '1 Minggu yang lalu'),
('Siti Rahmawati, S.Kom.', 'Alumni SMA IT & Mahasiswi Teknik Informatika UI', 5, 'Bekal ilmu coding, bahasa Inggris, serta hafalan Al-Qur''an dari sekolah membuat saya sangat percaya diri saat masuk perkuliahan. Lingkungan islami di sekolah membentuk karakter tangguh.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', '1 Bulan yang lalu'),
('Ir. Ahmad Zulkarnain', 'Orang Tua Alumni (Kedokteran Unand)', 5, 'Perpaduan Kurikulum Merdeka dan program Tahfidz di SMA IT Andalas Cendekia terbukti menghasilkan lulusan yang tidak hanya cerdas akademis namun juga berakhlak mulia.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', '3 Bulan yang lalu');

INSERT INTO activities (title, type, category, date, student_name, achievement_badge, description, image_url) VALUES
('Juara 1 Medali Emas Olimpiade IT & AI Nasional 2026', 'Prestasi', 'Tingkat Nasional', '2026', 'Tim Robotik & Coding SMA IT', 'Juara 1 Emas', 'Meraih penghargaan tertinggi pada kategori pengembangan aplikasi kecerdasan buatan untuk pendidikan Al-Qur''an.', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'),
('Kemah Ukhuwah & Latsar Pramuka SIT 2026', 'Aktivitas Kesiswaan', 'Kepemimpinan & Karakter', '2026', 'Seluruh Siswa Kelas X & XI', 'PENDAKI Leadership', 'Pembentukan karakter tangguh, kedisiplinan mandiri, dan semangat kepemimpinan Islam di alam terbuka.', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80'),
('Klub Panahan & Olahraga Sunnah', 'Ekstrakurikuler', 'Minat Bakat & Olahraga', 'Rutin Mingguan', 'Ekstrakurikuler Panahan', 'Ekskul Unggulan', 'Melatih konsentrasi, ketenangan jiwa, ketepatan sasaran, dan fisik siswa sesuai tuntunan sunnah Rasulullah SAW.', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80'),
('Juara 2 Musabaqah Fahmil Qur''an (MFQ) Provinsi', 'Prestasi', 'Tingkat Provinsi', '2025', 'Tim Tahfidz & Syarhil Qur''an', 'Juara 2 Perak', 'Prestasi luar biasa siswa dalam pemahaman wawasan Al-Qur''an dan wawasan keislaman tingkat Sumatera Barat.', 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=800&q=80');

INSERT INTO curriculum (title, type, target, description, badge_color) VALUES
('Program Hafalan Tahfidz Al-Qur''an Intensif', 'Program Tahfidz', 'Target 5 - 10 Juz Mutqin', 'Setoran halaqah harian bersama musyrif/musyrifah, karantina murojaah, dan wisuda sertifikasi Tahfidz.', 'bg-emerald-600'),
('Campus Preparation & Sukses UTBK', 'Program Kurikulum', '90% Melanjutkan Kuliah & 50% Lolos PTN/PTKIN', 'Pendampingan belajar intensif, tryout berkala, matrikulasi jurusan, dan pemetaan bakat menuju perguruan tinggi favorit.', 'bg-amber-500'),
('PENDAKI (Pembinaan Dasar Kepemimpinan Islam)', 'Program Kurikulum', '100% Memiliki Portofolio Kepemimpinan Qur’ani', 'Latihan manajemen organisasi santri, pengasuhan adab harian, integritas, dan keberanian tampil di depan publik.', 'bg-emerald-700'),
('Tri Lingual Culture (Indonesia, Arab, English)', 'Program Kurikulum', '100% Menguasai 3 Bahasa Aktif', 'Lingkungan percakapan dan debat harian dalam 3 bahasa untuk kesiapan global peserta didik.', 'bg-blue-600'),
('Faqih Fiddin & Islamic Studies', 'Profil Lulusan', 'Menguasai Aqidah, Fiqih, Sirah, & Tarikh', 'Pemahaman komprehensif tentang ilmu syar''i untuk melahirkan generasi yang bertakwa dan berwawasan luas.', 'bg-amber-600'),
('Life Skill & Kecakapan Digital', 'Profil Lulusan', 'Penguasaan Komputer, AI & Problem Solving', 'Pembekalan hard skill era digital dan pemanfaatan teknologi positif.', 'bg-indigo-600');

INSERT INTO news (title, category, date, author, comments_count, image_url, excerpt, content) VALUES
('Siswa SMA IT Andalas Cendekia Raih Juara 1 Olimpiade Sains & IT Nasional 2026', 'Prestasi', '23/04/2026', 'Tim Humas', 12, 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', 'Delegasi SMA IT Andalas Cendekia kembali menorehkan prestasi gemilang dengan menjuarai kompetisi karya ilmiah dan aplikasi IT tingkat nasional.', 'Pada ajang Olimpiade Sains dan IT tingkat nasional yang diselenggarakan di Jakarta, tim siswa SMA IT Andalas Cendekia berhasil meraih Medali Emas Juara 1 dalam kategori Inovasi Aplikasi Edukasi Islami Berbasis AI. Kepala Sekolah memberikan apresiasi setinggi-tingginya atas perjuangan para siswa dan guru pendamping.'),
('Muria & Halal Bihalal Ramadhan: Santunan Anak Yatim dan Tahfidz Qur''an', 'Kegiatan Sekolah', '15/04/2026', 'Panitia Rohis', 8, 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=800&q=80', 'Seluruh keluarga besar sekolah merayakan penutupan bulan suci dengan pembagian sembako, santunan, dan khataman Al-Qur''an 30 Juz.', 'Kegiatan rutin tahunan dalam rangka mengasah kepedulian sosial peserta didik dan mempererat tali silaturahmi antar warga sekolah, orang tua, dan masyarakat sekitar.');

INSERT INTO events (day, month, title, time, location, category, description, organizer) VALUES
('15', 'OKT', 'Camp Tahfidz Intensif & Sertifikasi Hafalan 2026', '08:00 WIB – Selesai', 'Masjid & Camp Hall SMA IT', 'Keagamaan & Tahfidz', 'Kegiatan karantina dan murojaah hafalan intensif bagi seluruh calon wisudawan Tahfidz angkatan 2026/2027.', 'Panitia Tahfidz & Musyrif');
