import React, { useState } from 'react';
import { BookOpen, Globe, Cpu, X, ArrowRight, CheckCircle2, Award, Shield } from 'lucide-react';

interface ValueDetail {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  colorBg: string;
  colorText: string;
  colorBorder: string;
  description: string;
  points: string[];
  fullContent: string;
}

const values: ValueDetail[] = [
  {
    id: 'qurani',
    title: 'Generasi Pemimpin Qur’ani',
    subtitle: 'Karakter Rabbani, Adab, Akhlak Mulia, & Faqih Fiddin',
    icon: <BookOpen size={32} />,
    colorBg: 'bg-emerald-50 hover:bg-emerald-100/80',
    colorText: 'text-emerald-700',
    colorBorder: 'border-emerald-200',
    description: 'Menyelenggarakan pendidikan berbasis Al-Qur’an dan nilai-nilai Islam yang terintegrasi dengan kurikulum nasional.',
    points: [
      'Target hafalan Al-Qur\'an (Juz 30 hingga 5–10 Juz).',
      'Portofolio Kepemimpinan Qur’ani (PENDAKI) dengan skor min. 80.',
      'Penguasaan dasar ilmu agama (aqidah, fiqih, sirah, tarikh).'
    ],
    fullContent: 'Setiap siswa ditanamkan karakter Rabbani dan akhlak mulia melalui pembiasaan adab harian, zikir, halaqah Al-Qur\'an, serta program PENDAKI (Pembinaan Dasar Kepemimpinan Islam) untuk melahirkan calon pemimpin bangsa yang berintegritas.'
  },
  {
    id: 'global',
    title: 'Wawasan Global & Tri-Lingual',
    subtitle: 'Penguasaan 3 Bahasa & Keterampilan Abad 21',
    icon: <Globe size={32} />,
    colorBg: 'bg-amber-50 hover:bg-amber-100/80',
    colorText: 'text-amber-700',
    colorBorder: 'border-amber-200',
    description: 'Mengasah kemampuan bahasa asing dan keterampilan abad ke-21 untuk siap bersaing dalam dunia global.',
    points: [
      '100% siswa menguasai 3 Bahasa (Indonesia, Arab, & Inggris).',
      'Pengembangan kemampuan komunikasi & debat internasional.',
      'Analisis komprehensif potensi siswa secara berkelanjutan.'
    ],
    fullContent: 'Tri Lingual Culture diterapkan melalui pembiasaan bahasa harian, kelas diskusi, serta literasi sains global sehingga santri siap melanjutkan kuliah ke PTN/PTKIN terbaik maupun perguruan tinggi internasional.'
  },
  {
    id: 'teknologi',
    title: 'Inovasi Teknologi & Life Skill',
    subtitle: 'Digital Mastery & Persiapan Kuliah PTN/PTKIN',
    icon: <Cpu size={32} />,
    colorBg: 'bg-blue-50 hover:bg-blue-100/80',
    colorText: 'text-blue-700',
    colorBorder: 'border-blue-200',
    description: 'Menghadirkan pembelajaran inovatif berbasis teknologi untuk membekali keterampilan digital era modern.',
    points: [
      '100% siswa memiliki life skill (soft & hard skill) digital.',
      'Campus Preparation & pendampingan intensif UTBK.',
      'Smart Classroom & pembelajaran berbasis proyek (PBL).'
    ],
    fullContent: 'SMA IT Andalas Cendekia mentargetkan 90% lulusan melanjutkan kuliah dan 50% lolos masuk PTN/PTKIN favorit melalui bimbingan akademis kontekstual, pemetaan minat psikotes, serta pembekalan kecakapan digital masa depan.'
  }
];

export default function CoreValues() {
  const [selectedPillar, setSelectedPillar] = useState<ValueDetail | null>(null);

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Visi & Keunggulan Utama
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-3">
            Mewujudkan Siswa Generasi Pemimpin Qur’ani
          </h2>
          <p className="text-amber-600 font-bold text-sm italic mb-4">Tagline: "Sekolah Generasi Pemimpin Qur’ani"</p>
          <p className="text-slate-600 text-base">
            Sistem pendidikan terpadu di Kabupaten Dharmasraya yang mengintegrasikan nilai Al-Qur'an, kurikulum nasional, kecakapan digital, dan kesiapan karir.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((pillar) => (
            <div 
              key={pillar.id}
              className={`p-8 rounded-3xl border ${pillar.colorBorder} ${pillar.colorBg} transition-all duration-300 transform hover:-translate-y-1.5 shadow-sm hover:shadow-xl flex flex-col justify-between`}
            >
              <div>
                <div className={`w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-6 ${pillar.colorText}`}>
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{pillar.title}</h3>
                <p className="text-xs font-semibold text-slate-500 mb-4 uppercase tracking-wider">{pillar.subtitle}</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {pillar.description}
                </p>

                <ul className="space-y-2.5 mb-8">
                  {pillar.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${pillar.colorText}`} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedPillar(pillar)}
                className={`inline-flex items-center gap-2 font-bold text-sm ${pillar.colorText} hover:underline mt-auto`}
              >
                Pelajari Selengkapnya <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pillar Detail Modal */}
      {selectedPillar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative border border-slate-100">
            <button 
              onClick={() => setSelectedPillar(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X size={20} />
            </button>

            <div className={`w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 ${selectedPillar.colorText}`}>
              {selectedPillar.icon}
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedPillar.title}</h3>
            <p className="text-sm font-medium text-slate-500 mb-6">{selectedPillar.subtitle}</p>

            <div className="prose prose-slate text-sm leading-relaxed mb-6">
              <p className="text-slate-700 font-medium mb-4">{selectedPillar.fullContent}</p>
              <h4 className="font-bold text-slate-800 mb-2">Pencapaian Target:</h4>
              <ul className="space-y-2">
                {selectedPillar.points.map((pt, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t flex justify-end">
              <button
                onClick={() => setSelectedPillar(null)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors"
              >
                Tutup Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
