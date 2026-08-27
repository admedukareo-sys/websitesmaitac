import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'andalas4_smaitac',
  password: process.env.DB_PASSWORD || 'Andalas@70053973',
  database: process.env.DB_NAME || 'andalas4_smaitac',
  connectTimeout: 5000,
};

let pool = null;
let dbConnected = false;
let dbErrorMessage = '';

async function initDatabase() {
  try {
    // Attempt direct connection to database
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const conn = await pool.getConnection();
    dbConnected = true;
    dbErrorMessage = '';
    console.log(`[MySQL SUCCESS] Terhubung ke MySQL Database "${dbConfig.database}" di ${dbConfig.host}:${dbConfig.port}`);
    conn.release();

    await autoMigrateTables();

  } catch (err) {
    dbConnected = false;
    dbErrorMessage = err.message;
    console.log(`[MySQL INFO] Koneksi lokal (${dbConfig.host}:${dbConfig.port}) belum aktif (${err.message}). Sistem menggunakan penyimpanan fallback otomatis.`);
  }
}

async function autoMigrateTables() {
  if (!pool || !dbConnected) return;

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`users\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`name\` VARCHAR(255) NOT NULL,
        \`email\` VARCHAR(255) NOT NULL,
        \`role\` ENUM('STUDENT', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
        \`password\` VARCHAR(255) NOT NULL,
        \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`email\` (\`email\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`site_settings\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`school_name\` VARCHAR(255) NOT NULL DEFAULT 'SMA IT Andalas Cendekia',
        \`tagline\` VARCHAR(255) NOT NULL DEFAULT 'Sekolah Generasi Pemimpin Qur’ani',
        \`visi\` TEXT NOT NULL,
        \`address\` TEXT NOT NULL,
        \`phone\` VARCHAR(50) NOT NULL,
        \`email\` VARCHAR(150) NOT NULL,
        \`website\` VARCHAR(255) NOT NULL,
        \`video_url\` VARCHAR(500) NOT NULL,
        \`facebook_url\` VARCHAR(500) DEFAULT 'https://facebook.com',
        \`instagram_url\` VARCHAR(500) DEFAULT 'https://instagram.com',
        \`youtube_url\` VARCHAR(500) DEFAULT 'https://youtube.com',
        \`principal_name\` VARCHAR(150) DEFAULT 'Fadhilah Ikhtiarni, M.Pd.',
        \`principal_title\` VARCHAR(255) DEFAULT 'Kepala Sekolah SMA IT Andalas Cendekia',
        \`principal_message\` TEXT DEFAULT NULL,
        \`principal_photo_url\` VARCHAR(500) DEFAULT NULL,
        \`history_text\` TEXT DEFAULT NULL,
        \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    console.log(`[MySQL Schema] Seluruh skema tabel database MySQL siap!`);
  } catch (err) {
    console.error(`[MySQL Schema Error]`, err.message);
  }
}

// Routes
app.get('/api/ping', async (req, res) => {
  res.json({
    status: 'success',
    connected: dbConnected,
    database: dbConfig.database,
    host: `${dbConfig.host}:${dbConfig.port}`,
    user: dbConfig.user,
    message: dbConnected 
      ? `Terhubung 100% ke Database MySQL ${dbConfig.database}` 
      : `Menunggu koneksi MySQL (${dbErrorMessage || 'Service belum aktif di port 3306'})`,
  });
});

app.listen(PORT, () => {
  console.log(`[Express MySQL Bridge] Server berjalan di http://localhost:${PORT}`);
  initDatabase();
});
