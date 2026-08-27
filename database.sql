-- ==============================================================================
-- DATABASE SCHEMA & SEED DATA UNTUK SMA IT ANDALAS CENDEKIA
-- Database: andalas4_smaitac
-- Compatible with MySQL 5.7+ / MySQL 8.0+ / MariaDB & cPanel phpMyAdmin
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------
-- 1. TABEL: users (Akun Pengguna & Admin)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `role` ENUM('STUDENT', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
  `password` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data Seed: users
INSERT INTO `users` (`id`, `name`, `email`, `role`, `password`, `created_at`) VALUES
(1, 'Administrator SPMB', 'admin@smait.sch.id', 'ADMIN', 'admin', '2026-08-26 00:00:00'),
(2, 'Ahmad Zaki', 'zaki@gmail.com', 'STUDENT', 'password123', '2026-08-26 00:00:00'),
(3, 'Fatimah Az-Zahra', 'fatimah@gmail.com', 'STUDENT', 'password123', '2026-08-26 00:00:00');

-- --------------------------------------------------------
-- 2. TABEL: registrations (Pendaftaran SPMB & Daftar Tunggu)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `registrations` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `nisn` VARCHAR(50) DEFAULT NULL,
  `nik` VARCHAR(50) DEFAULT NULL,
  `birth_place` VARCHAR(100) DEFAULT NULL,
  `birth_date` DATE DEFAULT NULL,
  `gender` ENUM('L', 'P') DEFAULT NULL,
  `address` TEXT DEFAULT NULL,
  `father_name` VARCHAR(150) DEFAULT NULL,
  `mother_name` VARCHAR(150) DEFAULT NULL,
  `parent_phone` VARCHAR(50) DEFAULT NULL,
  `previous_school` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('DRAFT', 'SUBMITTED', 'VERIFIED', 'REJECTED', 'PASSED', 'FAILED', 'REGISTERED') NOT NULL DEFAULT 'DRAFT',
  `rejection_reason` TEXT DEFAULT NULL,
  `akta_url` VARCHAR(500) DEFAULT NULL,
  `kk_url` VARCHAR(500) DEFAULT NULL,
  `foto_url` VARCHAR(500) DEFAULT NULL,
  `rapor_url` VARCHAR(500) DEFAULT NULL,
  `payment_proof_url` VARCHAR(500) DEFAULT NULL,
  `payment_status` ENUM('UNPAID', 'PENDING', 'VERIFIED') NOT NULL DEFAULT 'UNPAID',
  `test_score` DECIMAL(5,2) DEFAULT NULL,
  `interview_notes` TEXT DEFAULT NULL,
  `re_registration_proof_url` VARCHAR(500) DEFAULT NULL,
  `uniform_size` VARCHAR(10) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_registrations_user` (`user_id`),
  CONSTRAINT `fk_registrations_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data Seed: registrations
INSERT INTO `registrations` (`id`, `user_id`, `nisn`, `nik`, `birth_place`, `birth_date`, `gender`, `address`, `father_name`, `mother_name`, `parent_phone`, `previous_school`, `status`, `payment_status`, `payment_proof_url`, `created_at`, `updated_at`) VALUES
(1, 2, '0051234567', '1371012304050001', 'Pulau Punjung', '2008-05-14', 'L', 'Jorong Ranah Lintas, Dharmasraya', 'Budi Santoso', 'Siti Aminah', '081266778899', 'SMP Negeri 1 Pulau Punjung', 'SUBMITTED', 'PENDING', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80', '2026-08-26 00:00:00', '2026-08-26 00:00:00'),
(2, 3, '0059876543', '1371012304050002', 'Sungai Dareh', '2008-08-20', 'P', 'Nagari Tebing Tinggi, Dharmasraya', 'Rahman Hakim', 'Nurhaliza', '081399887766', 'MTsN 1 Dharmasraya', 'DRAFT', 'UNPAID', NULL, '2026-08-26 00:00:00', '2026-08-26 00:00:00');

-- --------------------------------------------------------
-- 3. TABEL: site_settings (Pengaturan Profil, Visi, Sambutan Kepsek & Media Sosial)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `school_name` VARCHAR(255) NOT NULL DEFAULT 'SMA IT Andalas Cendekia',
  `tagline` VARCHAR(255) NOT NULL DEFAULT 'Sekolah Generasi Pemimpin Qur’ani',
  `visi` TEXT NOT NULL,
  `address` TEXT NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `website` VARCHAR(255) NOT NULL,
  `npsn` VARCHAR(50) NOT NULL DEFAULT '20104766',
  `accreditation` VARCHAR(50) NOT NULL DEFAULT 'Akreditasi A',
  `video_url` VARCHAR(500) NOT NULL,
  `facebook_url` VARCHAR(500) DEFAULT 'https://facebook.com',
  `instagram_url` VARCHAR(500) DEFAULT 'https://instagram.com',
  `youtube_url` VARCHAR(500) DEFAULT 'https://youtube.com',
  `principal_name` VARCHAR(150) DEFAULT 'Fadhilah Ikhtiarni, M.Pd.',
  `principal_title` VARCHAR(255) DEFAULT 'Kepala Sekolah SMA IT Andalas Cendekia',
  `principal_message` TEXT DEFAULT NULL,
  `principal_photo_url` VARCHAR(500) DEFAULT NULL,
  `history_text` TEXT DEFAULT NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data Seed: site_settings
INSERT INTO `site_settings` (`id`, `school_name`, `tagline`, `visi`, `address`, `phone`, `email`, `website`, `npsn`, `accreditation`, `video_url`, `facebook_url`, `instagram_url`, `youtube_url`, `principal_name`, `principal_title`, `principal_message`, `principal_photo_url`, `history_text`, `updated_at`) VALUES
(1, 'SMA IT Andalas Cendekia', 'Sekolah Generasi Pemimpin Qur’ani', 'Mewujudkan Siswa Generasi Pemimpin Qur’ani', 'Jorong Ranah Lintas, Nagari Tebing Tinggi, Kec. Pulau Punjung, Kab. Dharmasraya, Prov. Sumatera Barat', '0812-6655-8123', 'smaitandalascendekia@gmail.com', 'https://smait.andalascendekia.sch.id/', '20104766', 'Akreditasi A', 'https://www.youtube.com/embed/9E09XrFAi_s?autoplay=1', 'https://facebook.com', 'https://instagram.com', 'https://youtube.com', 'Fadhilah Ikhtiarni, M.Pd.', 'Kepala Sekolah SMA IT Andalas Cendekia', 'Assalamu\'alaikum Warahmatullahi Wabarakatuh. Selamat datang di portal resmi SMA IT Andalas Cendekia. Kami berkomitmen menyelenggarakan pendidikan yang membekali pendidikan agama, adab dan akhlak mulia, kecakapan hidup kekinian, serta penguasaan sains dan teknologi untuk membentuk Generasi Pemimpin Qur\'ani.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', 'SMA IT Andalas Cendekia didirikan pada tanggal 5 Mei 2024 di Kabupaten Dharmasraya, Sumatera Barat. Lembaga ini hadir sebagai komitmen nyata untuk mencetak generasi pemimpin Qur\'ani yang berakhlak mulia, cerdas akademis, berwawasan global, dan siap bersaing di perguruan tinggi terkemuka.', '2026-08-26 00:00:00');

-- --------------------------------------------------------
-- 4. TABEL: teachers (Tenaga Pendidik, Guru & Staff)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `teachers` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(150) NOT NULL,
  `mapel` VARCHAR(255) NOT NULL,
  `strata` VARCHAR(50) NOT NULL DEFAULT 'S1',
  `photo_url` VARCHAR(500) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data Seed: teachers
INSERT INTO `teachers` (`id`, `name`, `role`, `mapel`, `strata`, `created_at`) VALUES
(1, 'Fadhilah Ikhtiarni, M.Pd.', 'Kepala Sekolah', 'Manajerial & Kepemimpinan', 'S2', '2026-08-26 00:00:00'),
(2, 'Novrika mawarni, S.Pd.', 'Waka Kurikulum', 'Biologi, Kimia, B. Inggris, Mentoring Qur\'anic Leader', 'S1', '2026-08-26 00:00:00'),
(3, 'Sherly Mairiyasti L., S.Pd.', 'Waka Kesiswaan', 'Ekonomi, Sejarah, Geografi, Sosiologi', 'S1', '2026-08-26 00:00:00'),
(4, 'Rayun Sucinda, M.Pd.', 'Waka Sarpras', 'Adab & Al-Qur\'an, Pendidikan Pancasila', 'S2', '2026-08-26 00:00:00'),
(5, 'Yuyun Rahmanita, S.Kom.', 'Tata Usaha / Administrasi', 'Sistem Informasi & Administrasi', 'S1', '2026-08-26 00:00:00'),
(6, 'Vivi Safitri, S.Pd.', 'Guru Bidang Studi', 'Bahasa Indonesia', 'S1', '2026-08-26 00:00:00'),
(7, 'Ade Pahmi Paizal, S.T', 'Guru Bidang Studi', 'Informatika & Komputer', 'S1', '2026-08-26 00:00:00'),
(8, 'Febri Uljapi, S.Hum', 'Guru Bidang Studi', 'Bahasa Arab, Akidah, Fiqh, Sejarah Peradaban Islam', 'S1', '2026-08-26 00:00:00'),
(9, 'St. Irvan Charis, S.Pd.', 'Guru Bidang Studi', 'PJOK (Pendidikan Jasmani Olahraga)', 'S1', '2026-08-26 00:00:00'),
(10, 'Dela Oktavia H., S.Pd.', 'Guru Bidang Studi', 'Bimbingan Konseling (BK)', 'S1', '2026-08-26 00:00:00');

-- --------------------------------------------------------
-- 5. TABEL: hero_slides (Hero Photo Banner Carousel Beranda)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `hero_slides` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `badge` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `primary_cta_text` VARCHAR(100) DEFAULT NULL,
  `primary_cta_link` VARCHAR(255) DEFAULT NULL,
  `secondary_cta_text` VARCHAR(100) DEFAULT NULL,
  `secondary_cta_link` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data Seed: hero_slides
INSERT INTO `hero_slides` (`id`, `badge`, `title`, `description`, `image_url`, `primary_cta_text`, `primary_cta_link`, `secondary_cta_text`, `secondary_cta_link`, `created_at`) VALUES
(1, 'Penerimaan Siswa Baru 2026/2027 Telah Dibuka', 'Membentuk Generasi Qurani, Cerdas, dan Berprestasi', 'SMA IT Andalas Cendekia memadukan kurikulum nasional dan keislaman untuk mencetak pemimpin masa depan yang berakhlak mulia dan berwawasan global.', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80', 'Daftar SPMB Sekarang', '/spmb', 'Pelajari Lebih Lanjut', '/profil', '2026-08-26 00:00:00'),
(2, 'Program Unggulan Tahfidz Al-Qur\'an', 'Target Hafalan 5-10 Juz Berlandaskan Adab Islami', 'Pendampingan halaqah Al-Qur\'an harian bersama musyrif & musyrifah berpengalaman untuk mencetak alumni penghafal Al-Qur\'an mutqin.', 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1920&q=80', 'Lihat Kurikulum & Program', '/kurikulum', 'Portal SPMB', '/spmb', '2026-08-26 00:00:00');

-- --------------------------------------------------------
-- 6. TABEL: facilities (Sarana & Prasarana Sekolah)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `facilities` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `category` ENUM('Akademik', 'Keagamaan', 'Teknologi', 'Olahraga & Terbuka') NOT NULL,
  `description` TEXT NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data Seed: facilities
INSERT INTO `facilities` (`id`, `title`, `category`, `description`, `image_url`, `created_at`) VALUES
(1, 'Smart Classroom Interaktif', 'Akademik', 'Ruang kelas dilengkapi pendingin udara, layar sentuh digital interaktif, dan sound system pendukung.', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80', '2026-08-26 00:00:00'),
(2, 'Laboratorium Komputer & Robotics', 'Teknologi', 'Perangkat PC spesifikasi tinggi, jaringan internet gigabit, dan kit eksperimen kecerdasan buatan (AI) & IoT.', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80', '2026-08-26 00:00:00'),
(3, 'Masjid & Halaqah Center', 'Keagamaan', 'Pusat kegiatan ibadah, Shalat Jamaah harian, serta halaqah Tahfidz Al-Qur\'an dengan kapasitas 500+ jamaah.', 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=800&q=80', '2026-08-26 00:00:00'),
(4, 'Perpustakaan Digital & Literasi', 'Akademik', 'Koleksi e-book 10.000+ judul, area membaca yang nyaman, serta ruang diskusi terbuka.', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80', '2026-08-26 00:00:00'),
(5, 'Lapangan Olahraga Multi-fungsi', 'Olahraga & Terbuka', 'Sarana olahraga basket, futsal, voli, dan arena olahraga panahan bertaraf standar nasional.', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80', '2026-08-26 00:00:00'),
(6, 'Taman Pembelajaran Terbuka & Gazebo', 'Olahraga & Terbuka', 'Lingkungan kampus asri dan hijau yang mendukung kegiatan outdoor study dan istirahat siswa.', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80', '2026-08-26 00:00:00');

-- --------------------------------------------------------
-- 7. TABEL: testimonials (Testimoni Orang Tua & Alumni)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `role` VARCHAR(150) NOT NULL,
  `rating` INT(11) NOT NULL DEFAULT 5,
  `quote` TEXT NOT NULL,
  `avatar_url` VARCHAR(500) NOT NULL,
  `time_ago` VARCHAR(50) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data Seed: testimonials
INSERT INTO `testimonials` (`id`, `name`, `role`, `rating`, `quote`, `avatar_url`, `time_ago`, `created_at`) VALUES
(1, 'Dr. H. Hendra Wijaya, M.Si.', 'Orang Tua Siswa Kelas XI', 5, 'Alhamdulillah, perkembangan hafalan Al-Qur\'an dan kedisiplinan anak saya meningkat drastis semenjak bersekolah di SMA IT Andalas Cendekia. Guru-gurunya sangat perhatian dan bimbingannya sangat intensif.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', '1 Minggu yang lalu', '2026-08-26 00:00:00'),
(2, 'Siti Rahmawati, S.Kom.', 'Alumni SMA IT & Mahasiswi Teknik Informatika UI', 5, 'Bekal ilmu coding, bahasa Inggris, serta hafalan Al-Qur\'an dari sekolah membuat saya sangat percaya diri saat masuk perkuliahan. Lingkungan islami di sekolah membentuk karakter tangguh.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', '1 Bulan yang lalu', '2026-08-26 00:00:00'),
(3, 'Ir. Ahmad Zulkarnain', 'Orang Tua Alumni (Kedokteran Unand)', 5, 'Perpaduan Kurikulum Merdeka dan program Tahfidz di SMA IT Andalas Cendekia terbukti menghasilkan lulusan yang tidak hanya cerdas akademis namun juga berakhlak mulia.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', '3 Bulan yang lalu', '2026-08-26 00:00:00');

-- --------------------------------------------------------
-- 8. TABEL: activities (Aktivitas, Ekstrakurikuler & Prestasi Siswa)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `activities` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `type` ENUM('Prestasi', 'Aktivitas Kesiswaan', 'Ekstrakurikuler') NOT NULL,
  `category` VARCHAR(150) NOT NULL,
  `date` VARCHAR(50) NOT NULL,
  `student_name` VARCHAR(150) NOT NULL,
  `achievement_badge` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data Seed: activities
INSERT INTO `activities` (`id`, `title`, `type`, `category`, `date`, `student_name`, `achievement_badge`, `description`, `image_url`, `created_at`) VALUES
(1, 'Juara 1 Medali Emas Olimpiade IT & AI Nasional 2026', 'Prestasi', 'Tingkat Nasional', '2026', 'Tim Robotik & Coding SMA IT', 'Juara 1 Emas', 'Meraih penghargaan tertinggi pada kategori pengembangan aplikasi kecerdasan buatan untuk pendidikan Al-Qur\'an.', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', '2026-08-26 00:00:00'),
(2, 'Kemah Ukhuwah & Latsar Pramuka SIT 2026', 'Aktivitas Kesiswaan', 'Kepemimpinan & Karakter', '2026', 'Seluruh Siswa Kelas X & XI', 'PENDAKI Leadership', 'Pembentukan karakter tangguh, kedisiplinan mandiri, dan semangat kepemimpinan Islam di alam terbuka.', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80', '2026-08-26 00:00:00'),
(3, 'Klub Panahan & Olahraga Sunnah', 'Ekstrakurikuler', 'Minat Bakat & Olahraga', 'Rutin Mingguan', 'Ekstrakurikuler Panahan', 'Ekskul Unggulan', 'Melatih konsentrasi, ketenangan jiwa, ketepatan sasaran, dan fisik siswa sesuai tuntunan sunnah Rasulullah SAW.', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80', '2026-08-26 00:00:00'),
(4, 'Juara 2 Musabaqah Fahmil Qur\'an (MFQ) Provinsi', 'Prestasi', 'Tingkat Provinsi', '2025', 'Tim Tahfidz & Syarhil Qur\'an', 'Juara 2 Perak', 'Prestasi luar biasa siswa dalam pemahaman wawasan Al-Qur\'an dan wawasan keislaman tingkat Sumatera Barat.', 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=800&q=80', '2026-08-26 00:00:00');

-- --------------------------------------------------------
-- 9. TABEL: curriculum (Kurikulum, Program Tahfidz & Profil Lulusan)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `curriculum` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `type` ENUM('Program Tahfidz', 'Program Kurikulum', 'Profil Lulusan') NOT NULL,
  `target` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `badge_color` VARCHAR(50) DEFAULT 'bg-emerald-600',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data Seed: curriculum
INSERT INTO `curriculum` (`id`, `title`, `type`, `target`, `description`, `badge_color`, `created_at`) VALUES
(1, 'Program Hafalan Tahfidz Al-Qur\'an Intensif', 'Program Tahfidz', 'Target 5 - 10 Juz Mutqin', 'Setoran halaqah harian bersama musyrif/musyrifah, karantina murojaah, dan wisuda sertifikasi Tahfidz.', 'bg-emerald-600', '2026-08-26 00:00:00'),
(2, 'Campus Preparation & Sukses UTBK', 'Program Kurikulum', '90% Melanjutkan Kuliah & 50% Lolos PTN/PTKIN', 'Pendampingan belajar intensif, tryout berkala, matrikulasi jurusan, dan pemetaan bakat menuju perguruan tinggi favorit.', 'bg-amber-500', '2026-08-26 00:00:00'),
(3, 'PENDAKI (Pembinaan Dasar Kepemimpinan Islam)', 'Program Kurikulum', '100% Memiliki Portofolio Kepemimpinan Qur’ani', 'Latihan manajemen organisasi santri, pengasuhan adab harian, integritas, dan keberanian tampil di depan publik.', 'bg-emerald-700', '2026-08-26 00:00:00'),
(4, 'Tri Lingual Culture (Indonesia, Arab, English)', 'Program Kurikulum', '100% Menguasai 3 Bahasa Aktif', 'Lingkungan percakapan dan debat harian dalam 3 bahasa untuk kesiapan global peserta didik.', 'bg-blue-600', '2026-08-26 00:00:00'),
(5, 'Faqih Fiddin & Islamic Studies', 'Profil Lulusan', 'Menguasai Aqidah, Fiqih, Sirah, & Tarikh', 'Pemahaman komprehensif tentang ilmu syar\'i untuk melahirkan generasi yang bertakwa dan berwawasan luas.', 'bg-amber-600', '2026-08-26 00:00:00'),
(6, 'Life Skill & Kecakapan Digital', 'Profil Lulusan', 'Penguasaan Komputer, AI & Problem Solving', 'Pembekalan hard skill era digital dan pemanfaatan teknologi positif.', 'bg-indigo-600', '2026-08-26 00:00:00');

-- --------------------------------------------------------
-- 10. TABEL: news (Berita & Pengumuman Sekolah)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `news` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `category` ENUM('Berita Terkini', 'Kegiatan Sekolah', 'Prestasi', 'Galeri') NOT NULL,
  `date` VARCHAR(50) NOT NULL,
  `author` VARCHAR(100) NOT NULL DEFAULT 'Admin',
  `comments_count` INT(11) NOT NULL DEFAULT 0,
  `image_url` VARCHAR(500) NOT NULL,
  `excerpt` TEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data Seed: news
INSERT INTO `news` (`id`, `title`, `category`, `date`, `author`, `comments_count`, `image_url`, `excerpt`, `content`, `created_at`) VALUES
(1, 'Siswa SMA IT Andalas Cendekia Raih Juara 1 Olimpiade Sains & IT Nasional 2026', 'Prestasi', '23/04/2026', 'Tim Humas', 12, 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', 'Delegasi SMA IT Andalas Cendekia kembali menorehkan prestasi gemilang dengan menjuarai kompetisi karya ilmiah dan aplikasi IT tingkat nasional.', 'Pada ajang Olimpiade Sains dan IT tingkat nasional yang diselenggarakan di Jakarta, tim siswa SMA IT Andalas Cendekia berhasil meraih Medali Emas Juara 1 dalam kategori Inovasi Aplikasi Edukasi Islami Berbasis AI. Kepala Sekolah memberikan apresiasi setinggi-tingginya atas perjuangan para siswa dan guru pendamping.', '2026-08-26 00:00:00'),
(2, 'Muria & Halal Bihalal Ramadhan: Santunan Anak Yatim dan Tahfidz Qur\'an', 'Kegiatan Sekolah', '15/04/2026', 'Panitia Rohis', 8, 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=800&q=80', 'Seluruh keluarga besar sekolah merayakan penutupan bulan suci dengan pembagian sembako, santunan, dan khataman Al-Qur\'an 30 Juz.', 'Kegiatan rutin tahunan dalam rangka mengasah kepedulian sosial peserta didik dan mempererat tali silaturahmi antar warga sekolah, orang tua, dan masyarakat sekitar.', '2026-08-26 00:00:00');

-- --------------------------------------------------------
-- 11. TABEL: events (Agenda Acara & Kalender Akademik)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `events` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `day` VARCHAR(10) NOT NULL,
  `month` VARCHAR(20) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `time` VARCHAR(100) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `organizer` VARCHAR(150) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data Seed: events
INSERT INTO `events` (`id`, `day`, `month`, `title`, `time`, `location`, `category`, `description`, `organizer`, `created_at`) VALUES
(1, '15', 'OKT', 'Camp Tahfidz Intensif & Sertifikasi Hafalan 2026', '08:00 WIB – Selesai', 'Masjid & Camp Hall SMA IT', 'Keagamaan & Tahfidz', 'Kegiatan karantina dan murojaah hafalan intensif bagi seluruh calon wisudawan Tahfidz angkatan 2026/2027.', 'Panitia Tahfidz & Musyrif', '2026-08-26 00:00:00');

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
