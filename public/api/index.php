<?php
// ==============================================================================
// REST API ROUTER UNTUK WEBSITE SMA IT ANDALAS CENDEKIA
// Database Backend: MySQL (andalas4_smaitac)
// ==============================================================================

require_once __DIR__ . '/config.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';

// Ambil JSON Input jika ada
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true) ?? $_POST;

switch ($action) {
    case 'ping':
        echo json_encode([
            "status" => "success",
            "message" => "Database MySQL `andalas4_smaitac` aktif dan siap!",
            "server_time" => date('Y-m-d H:i:s')
        ]);
        break;

    case 'login':
        $email = trim($input['email'] ?? '');
        $password = trim($input['password'] ?? '');

        $stmt = $pdo->prepare("SELECT `id`, `name`, `email`, `role` FROM `users` WHERE `email` = ? AND `password` = ? LIMIT 1");
        $stmt->execute([$email, $password]);
        $user = $stmt->fetch();

        if ($user) {
            echo json_encode(["status" => "success", "user" => $user]);
        } else {
            http_response_code(401);
            echo json_encode(["status" => "error", "message" => "Email atau password tidak sesuai!"]);
        }
        break;

    case 'get_settings':
        $stmt = $pdo->query("SELECT * FROM `site_settings` LIMIT 1");
        $settings = $stmt->fetch() ?: [];
        echo json_encode(["status" => "success", "data" => $settings]);
        break;

    case 'save_settings':
        $s = $input;
        $stmt = $pdo->prepare("UPDATE `site_settings` SET 
            `school_name` = ?, `tagline` = ?, `visi` = ?, `address` = ?, `phone` = ?, 
            `email` = ?, `website` = ?, `npsn` = ?, `accreditation` = ?, `video_url` = ?, `facebook_url` = ?, 
            `instagram_url` = ?, `youtube_url` = ?, `principal_name` = ?, 
            `principal_title` = ?, `principal_message` = ?, `principal_photo_url` = ?, 
            `history_text` = ? WHERE `id` = 1");
        $stmt->execute([
            $s['schoolName'] ?? $s['school_name'] ?? 'SMA IT Andalas Cendekia',
            $s['tagline'] ?? '',
            $s['visi'] ?? '',
            $s['address'] ?? '',
            $s['phone'] ?? '',
            $s['email'] ?? '',
            $s['website'] ?? '',
            $s['npsn'] ?? '20104766',
            $s['accreditation'] ?? 'Akreditasi A',
            $s['videoUrl'] ?? $s['video_url'] ?? '',
            $s['facebookUrl'] ?? $s['facebook_url'] ?? '',
            $s['instagramUrl'] ?? $s['instagram_url'] ?? '',
            $s['youtubeUrl'] ?? $s['youtube_url'] ?? '',
            $s['principalName'] ?? $s['principal_name'] ?? '',
            $s['principalTitle'] ?? $s['principal_title'] ?? '',
            $s['principalMessage'] ?? $s['principal_message'] ?? '',
            $s['principalPhotoUrl'] ?? $s['principal_photo_url'] ?? '',
            $s['historyText'] ?? $s['history_text'] ?? '',
        ]);
        echo json_encode(["status" => "success", "message" => "Pengaturan berhasil disimpan ke MySQL"]);
        break;

    case 'get_registrations':
        $stmt = $pdo->query("SELECT r.*, u.name as user_name, u.email as user_email 
                            FROM `registrations` r 
                            JOIN `users` u ON r.user_id = u.id 
                            ORDER BY r.id DESC");
        $rows = $stmt->fetchAll();
        echo json_encode(["status" => "success", "data" => $rows]);
        break;

    case 'save_registration':
        $r = $input;
        $userId = $r['userId'] ?? 0;
        
        $stmt = $pdo->prepare("SELECT id FROM `registrations` WHERE `user_id` = ? LIMIT 1");
        $stmt->execute([$userId]);
        $existing = $stmt->fetch();

        if ($existing) {
            $stmt = $pdo->prepare("UPDATE `registrations` SET 
                `nisn` = ?, `nik` = ?, `birth_place` = ?, `birth_date` = ?, `gender` = ?, 
                `address` = ?, `father_name` = ?, `mother_name` = ?, `parent_phone` = ?, 
                `previous_school` = ?, `status` = ?, `payment_status` = ?, `payment_proof_url` = ? 
                WHERE `user_id` = ?");
            $stmt->execute([
                $r['nisn'] ?? '', $r['nik'] ?? '', $r['birthPlace'] ?? '', $r['birthDate'] ?? null, $r['gender'] ?? 'L',
                $r['address'] ?? '', $r['fatherName'] ?? '', $r['motherName'] ?? '', $r['parentPhone'] ?? '',
                $r['previousSchool'] ?? '', $r['status'] ?? 'DRAFT', $r['paymentStatus'] ?? 'UNPAID', $r['paymentProofUrl'] ?? '',
                $userId
            ]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO `registrations` 
                (`user_id`, `nisn`, `nik`, `birth_place`, `birth_date`, `gender`, `address`, `father_name`, `mother_name`, `parent_phone`, `previous_school`, `status`, `payment_status`, `payment_proof_url`, `created_at`) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
            $stmt->execute([
                $userId, $r['nisn'] ?? '', $r['nik'] ?? '', $r['birthPlace'] ?? '', $r['birthDate'] ?? null, $r['gender'] ?? 'L',
                $r['address'] ?? '', $r['fatherName'] ?? '', $r['motherName'] ?? '', $r['parentPhone'] ?? '',
                $r['previousSchool'] ?? '', $r['status'] ?? 'DRAFT', $r['paymentStatus'] ?? 'UNPAID', $r['paymentProofUrl'] ?? ''
            ]);
        }
        echo json_encode(["status" => "success", "message" => "Pendaftaran berhasil disimpan ke MySQL"]);
        break;

    case 'get_teachers':
        $stmt = $pdo->query("SELECT * FROM `teachers` ORDER BY `id` ASC");
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
        break;

    case 'save_teachers':
        if (is_array($input)) {
            $pdo->exec("DELETE FROM `teachers`");
            $stmt = $pdo->prepare("INSERT INTO `teachers` (`id`, `name`, `role`, `mapel`, `strata`, `photo_url`) VALUES (?, ?, ?, ?, ?, ?)");
            foreach ($input as $t) {
                $stmt->execute([
                    $t['id'] ?? null,
                    $t['name'] ?? '',
                    $t['role'] ?? '',
                    $t['mapel'] ?? '',
                    $t['strata'] ?? 'S1',
                    $t['photoUrl'] ?? $t['photo_url'] ?? '',
                ]);
            }
        }
        echo json_encode(["status" => "success", "message" => "Data guru berhasil disimpan"]);
        break;

    case 'get_curriculum':
        $stmt = $pdo->query("SELECT * FROM `curriculum` ORDER BY `id` ASC");
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
        break;

    case 'get_activities':
        $stmt = $pdo->query("SELECT * FROM `activities` ORDER BY `id` DESC");
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
        break;

    case 'get_facilities':
        $stmt = $pdo->query("SELECT * FROM `facilities` ORDER BY `id` ASC");
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
        break;

    case 'get_testimonials':
        $stmt = $pdo->query("SELECT * FROM `testimonials` ORDER BY `id` DESC");
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
        break;

    case 'get_slides':
        $stmt = $pdo->query("SELECT * FROM `hero_slides` ORDER BY `id` ASC");
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
        break;

    case 'get_news':
        $stmt = $pdo->query("SELECT * FROM `news` ORDER BY `id` DESC");
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
        break;

    case 'get_events':
        $stmt = $pdo->query("SELECT * FROM `events` ORDER BY `id` DESC");
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
        break;

    default:
        echo json_encode([
            "status" => "active",
            "app" => "SMA IT Andalas Cendekia API",
            "database" => "MySQL (andalas4_smaitac)",
            "url" => "https://smait.andalascendekia.sch.id",
            "instructions" => "Gunakan ?action=ping untuk cek status DB MySQL"
        ]);
        break;
}
