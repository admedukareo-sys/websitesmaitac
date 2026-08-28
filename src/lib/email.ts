import { Registration, User } from './storage';

export interface EmailPayload {
  toEmail: string;
  toName: string;
  subject: string;
  registrationData: Registration;
}

/**
 * Service pengiriman email Bukti Pendaftaran SPMB.
 * Di lingkungan browser SPA, fungsi ini mensimulasikan pengiriman email otomatis 
 * dan menyediakan template siap pakai untuk dihubungkan ke EmailJS / Resend API.
 */
export async function sendRegistrationEmail(payload: EmailPayload): Promise<{ success: boolean; message: string }> {
  const { toEmail, toName, registrationData } = payload;

  console.log(`[Email Service] Mengirim email Formulir SPMB ke ${toEmail}...`);

  // Simulasi delay jaringan (1 detik)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Logika simulasi pengiriman sukses
  return {
    success: true,
    message: `Formulir Pendaftaran SPMB resmi telah berhasil dikirim ke email: ${toEmail}`,
  };
}

/**
 * Template Email HTML yang dapat digunakan saat dihubungkan ke Resend / EmailJS / Nodemailer
 */
export function generateEmailHTMLTemplate(name: string, reg: Registration): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <div style="background-color: #064e3b; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0;">SMA IT ANDALAS CENDEKIA</h2>
        <p style="margin: 5px 0 0 0; font-size: 14px; color: #fde047;">Sekolah Generasi Pemimpin Qur’ani</p>
      </div>

      <div style="padding: 20px; color: #1e293b;">
        <h3>Konfirmasi Pendaftaran SPMB 2026/2027</h3>
        <p>Assalamu'alaikum Warahmatullahi Wabarakatuh, <strong>${name}</strong>.</p>
        <p>Terima kasih telah mendaftar di SMA IT Andalas Cendekia. Berikut adalah ringkasan data pendaftaran Anda:</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #cbd5e1;"><strong>Nomor Pendaftaran</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #cbd5e1;">#SPMB-${reg.id}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #cbd5e1;"><strong>NISN</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #cbd5e1;">${reg.nisn || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #cbd5e1;"><strong>Asal Sekolah</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #cbd5e1;">${reg.previousSchool || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #cbd5e1;"><strong>Status Pendaftaran</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #cbd5e1;"><span style="color: #047857; font-weight: bold;">${reg.status}</span></td>
          </tr>
        </table>

        <p style="margin-top: 20px;">Silakan login ke Portal SPMB untuk mengecek status seleksi dan verifikasi pembayaran:</p>
        <p style="text-align: center;">
          <a href="https://smait.andalascendekia.sch.id/spmb/login" style="background-color: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 20px; font-weight: bold;">Login Portal SPMB</a>
        </p>

        <p style="margin-top: 30px; font-size: 12px; color: #64748b;">
          Panitia SPMB SMA IT Andalas Cendekia<br/>
          Jorong Ranah Lintas, Nagari Tebing Tinggi, Pulau Punjung, Kab. Dharmasraya<br/>
          WhatsApp: 0812-6655-8123 | Email: smaitandalascendekia@gmail.com
        </p>
      </div>
    </div>
  `;
}
