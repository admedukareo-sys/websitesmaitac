import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, HeartHandshake, Award, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      title: 'Tenaga Pendidik Berpengalaman & Berdedikasi',
      desc: 'Guru lulusan S2 & Lc. alumni perguruan tinggi terkemuka dalam dan luar negeri dengan kualifikasi profesional.',
    },
    {
      title: 'Lingkungan Inklusif & Pembentukan Karakter Rabbani',
      desc: 'Penerapan budaya 5S (Senyum, Salam, Sapa, Sopan, Santun) dan integrasi adab sebelum ilmu.',
    },
    {
      title: 'Pembelajaran Berbasis Proyek (Project Based Learning)',
      desc: 'Mendorong daya kritis, kolaborasi, dan kreativitas siswa dalam memecahkan masalah nyata.',
    },
    {
      title: 'Ekstrakurikuler & Pembinaan Bakat Terpadu',
      desc: 'Lebih dari 24 pilihan klub pengembangan bakat olahraga, seni, sains, IT, dan keagamaan.',
    },
    {
      title: 'Fasilitas Digital & Lingkungan Kampus Kondusif',
      desc: 'Smart Classroom, Laboratorium Komputer AI, Masjid Kampus, dan area terbuka hijau.',
    },
    {
      title: 'Kolaborasi Erat Antara Sekolah & Orang Tua',
      desc: 'Layanan informasi berkala, parenting session, serta pendampingan perkembangan santri.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Why Choose Us Reasons */}
          <div className="lg:col-span-7">
            <span className="text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
              Keunggulan Utama
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Mengapa Memilih SMA IT Andalas Cendekia?
            </h2>
            <p className="text-slate-600 text-base mb-8 leading-relaxed">
              Kami berkomitmen menyelenggarakan pendidikan menengah atas terbaik yang memadukan keunggulan akademik, kemajuan sains teknologi, serta keteguhan iman takwa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Working Hours Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden border border-emerald-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-700/20 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-amber-950 flex items-center justify-center font-bold shadow">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Jam Operasional</h3>
                  <p className="text-xs text-emerald-200">Layanan Administrasi & Kantor SPMB</p>
                </div>
              </div>

              <p className="text-emerald-100 text-xs mb-6 leading-relaxed border-b border-emerald-800 pb-6">
                Tim layanan informasi dan pendaftaran kami siap membantu kebutuhan Anda pada jam operasional kerja berikut:
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-emerald-800/60">
                  <span className="font-medium text-emerald-200">Senin – Kamis</span>
                  <span className="font-bold text-amber-400 bg-emerald-950/80 px-3 py-1 rounded-full">07:30 AM – 03:30 PM</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-emerald-800/60">
                  <span className="font-medium text-emerald-200">Jumat</span>
                  <span className="font-bold text-amber-400 bg-emerald-950/80 px-3 py-1 rounded-full">07:30 AM – 02:30 PM</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-emerald-800/60">
                  <span className="font-medium text-emerald-200">Sabtu (Klub & SPMB)</span>
                  <span className="font-bold text-amber-400 bg-emerald-950/80 px-3 py-1 rounded-full">08:00 AM – 12:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium text-emerald-200">Minggu & Hari Libur</span>
                  <span className="font-bold text-red-300 bg-red-950/40 px-3 py-1 rounded-full border border-red-900/50">Tutup</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-emerald-800 flex items-center gap-3 bg-emerald-950/60 p-4 rounded-2xl">
                <ShieldCheck className="text-amber-400 shrink-0" size={24} />
                <div className="text-[11px] text-emerald-200">
                  <span className="font-bold text-white block mb-0.5">Sertifikasi Standar Mutu</span>
                  ISO 9001:2015 Certified • Akreditasi A (Unggul)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
