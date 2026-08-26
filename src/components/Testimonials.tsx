import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  quote: string;
  avatarUrl: string;
  timeAgo: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Dr. H. Hendra Wijaya, M.Si.',
    role: 'Orang Tua Siswa Kelas XI',
    rating: 5,
    quote: 'Alhamdulillah, perkembangan hafalan Al-Qur\'an dan kedisiplinan anak saya meningkat drastis semenjak bersekolah di SMA IT Andalas Cendekia. Guru-gurunya sangat perhatian dan bimbingannya sangat intensif.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    timeAgo: '1 Minggu yang lalu',
  },
  {
    id: 2,
    name: 'Siti Rahmawati, S.Kom.',
    role: 'Alumni SMA IT & Mahasiswi Teknik Informatika UI',
    rating: 5,
    quote: 'Bekal ilmu coding, bahasa Inggris, serta hafalan Al-Qur\'an dari sekolah membuat saya sangat percaya diri saat masuk perkuliahan. Lingkungan islami di sekolah membentuk karakter tangguh.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    timeAgo: '1 Bulan yang lalu',
  },
  {
    id: 3,
    name: 'Ir. Ahmad Zulkarnain',
    role: 'Orang Tua Alumni (Kedokteran Unand)',
    rating: 5,
    quote: 'Perpaduan Kurikulum Merdeka dan program Tahfidz di SMA IT Andalas Cendekia terbukti menghasilkan lulusan yang tidak hanya cerdas akademis namun juga berakhlak mulia.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    timeAgo: '3 Bulan yang lalu',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Kata Mereka
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Testimoni Orang Tua & Alumni
          </h2>
          <p className="text-slate-600 text-base">
            Kepercayaan dan kebanggaan keluarga besar SMA IT Andalas Cendekia.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <Quote size={28} className="text-emerald-200" />
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
                <img 
                  src={item.avatarUrl} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                  <p className="text-slate-500 text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
