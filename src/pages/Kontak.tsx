import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Globe } from 'lucide-react';

export default function Kontak() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-emerald-950 py-16 text-center text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <span className="inline-block bg-amber-500 text-amber-950 px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4 shadow">
            Layanan Informasi
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-3">Hubungi Kami</h1>
          <p className="text-amber-300 font-semibold text-lg italic mb-2">"Sekolah Generasi Pemimpin Qur’ani"</p>
          <p className="text-emerald-200 text-sm max-w-2xl mx-auto">
            Tim panitia SPMB dan pengelola SMA IT Andalas Cendekia siap memberikan pelayanan informasi dan konsultasi pendaftaran.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-3">Informasi Alamat & Kontak Resmi</h2>
            
            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Alamat Lengkap Sekolah</h3>
                  <p className="text-slate-600 leading-relaxed text-xs">
                    Jorong Ranah Lintas, Nagari Tebing Tinggi, Kecamatan Pulau Punjung, Kabupaten Dharmasraya, Provinsi Sumatera Barat.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Telepon / WhatsApp Panitia</h3>
                  <p className="text-slate-600 text-xs font-mono font-bold text-emerald-700">0812-6655-8123</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Email Resmi Sekolah</h3>
                  <p className="text-slate-600 text-xs font-semibold text-emerald-700">smaitandalascendekia@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Globe size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Website Official</h3>
                  <p className="text-slate-600 text-xs text-blue-600">https://smait.andalascendekia.sch.id/</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t pt-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Jam Operasional Layanan</h3>
                  <p className="text-slate-600 text-xs">Senin - Jumat: 07.30 - 15.30 WIB<br/>Sabtu: 08.00 - 12.00 WIB</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-3">Kirim Pesan & Pertanyaan</h2>
            {sent && (
              <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg text-xs font-medium">
                Pesan Anda telah berhasil dikirim ke sekretariat panitia! Kami akan menghubungi Anda segera.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nama Lengkap Orang Tua / Calon Santri</label>
                <input type="text" required placeholder="Contoh: Ahmad Zaki" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email Aktif</label>
                <input type="email" required placeholder="Contoh: zaki@gmail.com" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">No. WhatsApp</label>
                <input type="tel" required placeholder="Contoh: 081266558123" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Pertanyaan / Pesan Anda</label>
                <textarea required placeholder="Tuliskan pertanyaan seputar SPMB atau program sekolah..." rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800"></textarea>
              </div>
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-6 rounded-xl transition-colors w-full shadow">Kirim Pesan Konsultasi</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
