import React from 'react';
import { BookOpen, CheckCircle2, Award, Globe, Cpu, Users, GraduationCap, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Kurikulum() {
  const profilLulusan = [
    {
      no: '1',
      title: 'Lolos PTN / PTKIN',
      target: '90% lulusan melanjutkan kuliah & 50% lolos PTN / PTKIN favorit',
      desc: 'Program pendampingan intensif & persiapan UTBK sejak awal.',
      color: 'bg-emerald-500',
    },
    {
      no: '2',
      title: 'Portofolio Pemimpin',
      target: '100% lulusan memiliki portofolio Kepemimpinan Qur’ani (skor min. 80)',
      desc: 'Melalui program PENDAKI & pengorganisasian santri.',
      color: 'bg-amber-500',
    },
    {
      no: '3',
      title: 'Hafal Al-Qur’an',
      target: '100% lulusan memiliki hafalan Al-Qur’an minimal Juz 30 (hingga 5–10 Juz)',
      desc: 'Didampingi musyrif/musyrifah berkualitas mutqin.',
      color: 'bg-emerald-600',
    },
    {
      no: '4',
      title: 'Adab & Akhlaq Mulia',
      target: '100% lulusan memiliki adab dan akhlak mulia (skor min. 80)',
      desc: 'Pembiasaan karakter Rabbani & pembinaan adab harian.',
      color: 'bg-amber-600',
    },
    {
      no: '5',
      title: 'Faqih Fiddin',
      target: '100% menguasai dasar ilmu agama (aqidah, fiqih, sirah, tarikh) (skor min. 80)',
      desc: 'Pemahaman mendalam tentang ilmu-ilmu syar\'i.',
      color: 'bg-emerald-700',
    },
    {
      no: '6',
      title: 'Kemampuan Bahasa (Tri Lingual)',
      target: '100% menguasai 3 Bahasa (Indonesia, Arab, & Inggris) (skor min. 75)',
      desc: 'Lingkungan komunikasi bahasa asing harian.',
      color: 'bg-blue-600',
    },
    {
      no: '7',
      title: 'Life Skill Kekinian',
      target: '100% memiliki life skill (soft & hard skill) era digital (skor min. 75)',
      desc: 'Penguasaan komputer, AI, dan kecakapan masa depan.',
      color: 'bg-indigo-600',
    },
  ];

  const programKhas = [
    {
      title: 'PENDAKI (Pembinaan Dasar Kepemimpinan Islam)',
      desc: 'Program latihan kepemimpinan, karakter mandiri, integritas, dan manajemen organisasi berbasis nilai Islam.',
      icon: <Award className="text-amber-500" size={24} />,
    },
    {
      title: 'Campus Preparation Program',
      desc: 'Bimbingan belajar UTBK, matrikulasi jurusan, psikotes pemetaan bakat, dan tryout berkala menuju PTN/PTKIN.',
      icon: <GraduationCap className="text-emerald-500" size={24} />,
    },
    {
      title: 'Islamic Studies & Adab Habituation',
      desc: 'Pembiasaan zikir, shalat jamaah, mentoring Tahsin & Tahfizh, serta pendampingan adab sebelum ilmu.',
      icon: <BookOpen className="text-emerald-600" size={24} />,
    },
    {
      title: 'Tri Lingual Culture',
      desc: 'Pengembangan budaya berbahasa 3 bahasa (Bahasa Indonesia, Arab, dan Inggris) dalam percakapan dan debat.',
      icon: <Globe className="text-blue-500" size={24} />,
    },
    {
      title: 'Life Skill Development Era Digital',
      desc: 'Pelatihan teknologi komputer, media digital, rancang karir (Life & Career Plan), serta problem solving.',
      icon: <Cpu className="text-indigo-500" size={24} />,
    },
    {
      title: 'Daurah Pra-SMA (1,5 Bulan)',
      desc: 'Program matrikulasi dan pembekalan awal bagi calon siswa yang lolos seleksi sebelum masuk KBM reguler.',
      icon: <ShieldCheck className="text-amber-600" size={24} />,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-emerald-950 py-16 text-center text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <span className="inline-block bg-amber-500 text-amber-950 px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4 shadow">
            Kurikulum & Strategi Pendidikan
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-3">Program Khas & Profil Lulusan</h1>
          <p className="text-amber-300 font-semibold text-lg italic mb-2">"Sekolah Generasi Pemimpin Qur’ani"</p>
          <p className="text-emerald-200 text-sm max-w-2xl mx-auto">
            Integrasi ilmu agama, adab, kecakapan hidup era digital, dan persiapan lulusan menuju kampus favorit PTN/PTKIN.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-16">

        {/* Section 1: 7 Profil Lulusan Target */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
              Target Output Lulusan
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">7 Profil Utama Lulusan SMA IT</h2>
            <p className="text-slate-600 text-sm">
              Standardisasi ketercapaian kompetensi santri yang diukur secara berkala dan terstruktur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profilLulusan.map((item) => (
              <div key={item.no} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`w-8 h-8 rounded-xl ${item.color} text-white font-extrabold text-sm flex items-center justify-center shadow`}>
                      {item.no}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">Standardized</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-xs font-bold text-emerald-700 bg-white p-2.5 rounded-xl border border-slate-200 mb-3">
                    {item.target}
                  </p>
                  <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Program Khas Sekolah */}
        <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-800">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
              Core & Added Programs
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-3">Program Khas SMA IT Andalas Cendekia</h2>
            <p className="text-emerald-200 text-sm">
              Program unggulan khas yang membentuk imunitas moral, kemampuan akademis, dan life skill era digital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programKhas.map((prog, idx) => (
              <div key={idx} className="bg-emerald-900/60 backdrop-blur-md p-6 rounded-2xl border border-emerald-800/80 hover:border-amber-400/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-slate-900/80 flex items-center justify-center mb-4 shadow">
                  {prog.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{prog.title}</h3>
                <p className="text-emerald-200 text-xs leading-relaxed">{prog.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: 4 Pengelompokan Pembinaan Guru */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">4 Kelompok Pembinaan Tenaga Pendidik</h2>
            <p className="text-slate-600 text-sm">Penyederhanaan sistem kerja dan monitoring evaluasi pembelajaran.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
              <h3 className="font-bold text-emerald-800 text-base mb-2">1. SMS Cluster</h3>
              <p className="text-xs font-semibold text-emerald-700 mb-3">Sains, Matematika & Sosial</p>
              <p className="text-slate-600 text-xs leading-relaxed">Fokus persiapan UTBK, pendalaman materi akademik sains & sosial kontekstual.</p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200">
              <h3 className="font-bold text-amber-800 text-base mb-2">2. Islamic Studies</h3>
              <p className="text-xs font-semibold text-amber-700 mb-3">Keislaman & Al-Qur'an</p>
              <p className="text-slate-600 text-xs leading-relaxed">Tahsin, Tahfizh Al-Qur'an, Aqidah, Akhlak, Fiqh, Sirah, & Tarikh Islam.</p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200">
              <h3 className="font-bold text-blue-800 text-base mb-2">3. Language Cluster</h3>
              <p className="text-xs font-semibold text-blue-700 mb-3">Tri Lingual Culture</p>
              <p className="text-slate-600 text-xs leading-relaxed">Penguasaan Bahasa Indonesia, Bahasa Arab, dan Bahasa Inggris.</p>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-200">
              <h3 className="font-bold text-indigo-800 text-base mb-2">4. Life Skill Cluster</h3>
              <p className="text-xs font-semibold text-indigo-700 mb-3">Kepemimpinan & Digital</p>
              <p className="text-slate-600 text-xs leading-relaxed">Leadership, Life Plan, Komputer, & Campus Preparation.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
