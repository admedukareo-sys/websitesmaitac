import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, Award, Globe, Cpu, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react';
import { getSiteCurriculum, CurriculumTahfidzItem } from '@/lib/storage';

export default function Kurikulum() {
  const [curriculumData, setCurriculumData] = useState<CurriculumTahfidzItem[]>([]);

  const loadData = () => {
    setCurriculumData(getSiteCurriculum());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('smait_data_synced', loadData);
    return () => {
      window.removeEventListener('smait_data_synced', loadData);
    };
  }, []);

  const profilLulusan = curriculumData.filter(item => item.type === 'Profil Lulusan');
  const programKhas = curriculumData.filter(item => item.type === 'Program Kurikulum' || item.type === 'Program Tahfidz');

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-emerald-950 py-16 text-center text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <span className="inline-block bg-amber-500 text-amber-950 px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4 shadow">
            Kurikulum & Strategi Pendidikan
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-3">Program Khas, Kurikulum & Tahfidz</h1>
          <p className="text-amber-300 font-semibold text-lg italic mb-2">"Sekolah Generasi Pemimpin Qur’ani"</p>
          <p className="text-emerald-200 text-sm max-w-2xl mx-auto">
            Integrasi ilmu agama, adab, hafalan Al-Qur'an, kecakapan hidup era digital, dan persiapan lulusan menuju kampus favorit PTN/PTKIN.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-16">

        {/* Section 1: Program Unggulan & Tahfidz */}
        <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-800">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
              Core & Tahfidz Programs
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-3">Program Khas & Tahfidz Al-Qur'an</h2>
            <p className="text-emerald-200 text-sm">
              Program unggulan khas yang membentuk imunitas moral, hafalan Al-Qur'an mutqin, dan kecakapan akademik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programKhas.map((prog, idx) => (
              <div key={prog.id || idx} className="bg-emerald-900/60 backdrop-blur-md p-6 rounded-2xl border border-emerald-800/80 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-slate-900/80 text-amber-400 flex items-center justify-center shadow">
                      <BookOpen size={20} />
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-800 text-amber-300 border border-amber-400/30">
                      {prog.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{prog.title}</h3>
                  <p className="text-amber-300 font-bold text-xs bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800 mb-3">
                    {prog.target}
                  </p>
                  <p className="text-emerald-200 text-xs leading-relaxed">{prog.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Target Profil Lulusan */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
              Target Output Lulusan
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Profil Utama Lulusan SMA IT</h2>
            <p className="text-slate-600 text-sm">
              Standardisasi ketercapaian kompetensi santri yang diukur secara berkala dan terstruktur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profilLulusan.map((item, idx) => (
              <div key={item.id || idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`w-8 h-8 rounded-xl ${item.badgeColor || 'bg-emerald-600'} text-white font-extrabold text-sm flex items-center justify-center shadow`}>
                      {idx + 1}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">Standardized</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-xs font-bold text-emerald-700 bg-white p-2.5 rounded-xl border border-slate-200 mb-3">
                    {item.target}
                  </p>
                  <p className="text-slate-600 text-xs leading-relaxed">{item.description}</p>
                </div>
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
