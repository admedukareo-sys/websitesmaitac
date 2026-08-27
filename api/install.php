<?php
// ==============================================================================
// SCRIPT OTOMATIS INSTALL SKEMA & DATA BASELINE (PHP -> MYSQL)
// Database: andalas4_smaitac
// ==============================================================================

require_once __DIR__ . '/config.php';

try {
    // 1. Users Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `users` (
      `id` INT(11) NOT NULL AUTO_INCREMENT,
      `name` VARCHAR(255) NOT NULL,
      `email` VARCHAR(255) NOT NULL,
      `role` ENUM('STUDENT', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
      `password` VARCHAR(255) NOT NULL,
      `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`),
      UNIQUE KEY `email` (`email`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // Seed Admin if empty
    $stmt = $pdo->query("SELECT COUNT(*) FROM `users` WHERE `email` = 'admin@smait.sch.id'");
    if ($stmt->fetchColumn() == 0) {
        $pdo->exec("INSERT INTO `users` (`name`, `email`, `role`, `password`, `created_at`) VALUES 
        ('Administrator SPMB', 'admin@smait.sch.id', 'ADMIN', 'admin', NOW());");
    }

    // 2. Registrations Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `registrations` (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 3. Site Settings Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `site_settings` (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    $stmt = $pdo->query("SELECT COUNT(*) FROM `site_settings`");
    if ($stmt->fetchColumn() == 0) {
        $pdo->exec("INSERT INTO `site_settings` (`school_name`, `tagline`, `visi`, `address`, `phone`, `email`, `website`, `npsn`, `accreditation`, `video_url`, `facebook_url`, `instagram_url`, `youtube_url`, `principal_name`, `principal_title`, `principal_message`, `principal_photo_url`, `history_text`, `updated_at`) VALUES
        ('SMA IT Andalas Cendekia', 'Sekolah Generasi Pemimpin Qur’ani', 'Mewujudkan Siswa Generasi Pemimpin Qur’ani', 'Jorong Ranah Lintas, Nagari Tebing Tinggi, Kec. Pulau Punjung, Kab. Dharmasraya, Prov. Sumatera Barat', '0812-6655-8123', 'smaitandalascendekia@gmail.com', 'https://smait.andalascendekia.sch.id/', '20104766', 'Akreditasi A', 'https://www.youtube.com/embed/9E09XrFAi_s?autoplay=1', 'https://facebook.com', 'https://instagram.com', 'https://youtube.com', 'Fadhilah Ikhtiarni, M.Pd.', 'Kepala Sekolah SMA IT Andalas Cendekia', 'Assalamu\'alaikum Warahmatullahi Wabarakatuh. Selamat datang di portal resmi SMA IT Andalas Cendekia.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', 'SMA IT Andalas Cendekia didirikan pada tanggal 5 Mei 2024 di Kabupaten Dharmasraya.', NOW());");
    }

    // 4. Teachers Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `teachers` (
      `id` INT(11) NOT NULL AUTO_INCREMENT,
      `name` VARCHAR(255) NOT NULL,
      `role` VARCHAR(150) NOT NULL,
      `mapel` VARCHAR(255) NOT NULL,
      `strata` VARCHAR(50) NOT NULL DEFAULT 'S1',
      `photo_url` VARCHAR(500) DEFAULT NULL,
      `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 5. Hero Slides Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `hero_slides` (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 6. Facilities Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `facilities` (
      `id` INT(11) NOT NULL AUTO_INCREMENT,
      `title` VARCHAR(255) NOT NULL,
      `category` ENUM('Akademik', 'Keagamaan', 'Teknologi', 'Olahraga & Terbuka') NOT NULL,
      `description` TEXT NOT NULL,
      `image_url` VARCHAR(500) NOT NULL,
      `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 7. Testimonials Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `testimonials` (
      `id` INT(11) NOT NULL AUTO_INCREMENT,
      `name` VARCHAR(150) NOT NULL,
      `role` VARCHAR(150) NOT NULL,
      `rating` INT(11) NOT NULL DEFAULT 5,
      `quote` TEXT NOT NULL,
      `avatar_url` VARCHAR(500) NOT NULL,
      `time_ago` VARCHAR(50) DEFAULT NULL,
      `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 8. Activities Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `activities` (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 9. Curriculum Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `curriculum` (
      `id` INT(11) NOT NULL AUTO_INCREMENT,
      `title` VARCHAR(255) NOT NULL,
      `type` ENUM('Program Tahfidz', 'Program Kurikulum', 'Profil Lulusan') NOT NULL,
      `target` VARCHAR(255) NOT NULL,
      `description` TEXT NOT NULL,
      `badge_color` VARCHAR(50) DEFAULT 'bg-emerald-600',
      `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 10. News Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `news` (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 11. Events Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `events` (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    echo json_encode([
        "status" => "success",
        "message" => "Database MySQL `andalas4_smaitac` berhasil disiapkan dan terhubung 100%!"
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Gagal eksekusi skema database: " . $e->getMessage()
    ]);
}
