import React, { useState } from 'react';
import { Calendar, User, ArrowRight, X, MessageSquare } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  category: 'Berita Terkini' | 'Kegiatan Sekolah' | 'Prestasi' | 'Galeri';
  date: string;
  author: string;
  commentsCount: number;
  imageUrl: string;
  excerpt: string;
  content: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'Siswa SMA IT Andalas Cendekia Raih Juara 1 Olimpiade Sains & IT Nasional 2026',
    category: 'Prestasi',
    date: '23/04/2026',
    author: 'Tim Humas',
    commentsCount: 12,
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Delegasi SMA IT Andalas Cendekia kembali menorehkan prestasi gemilang dengan menjuarai kompetisi karya ilmiah dan aplikasi IT tingkat nasional.',
    content: 'Pada ajang Olimpiade Sains dan IT tingkat nasional yang diselenggarakan di Jakarta, tim siswa SMA IT Andalas Cendekia berhasil meraih Medali Emas Juara 1 dalam kategori Inovasi Aplikasi Edukasi Islami Berbasis AI. Kepala Sekolah memberikan apresiasi setinggi-tingginya atas perjuangan para siswa dan guru pendamping.',
  },
  {
    id: 2,
    title: 'Muria & Halal Bihalal Ramadhan: Santunan Anak Yatim dan Tahfidz Qur\'an',
    category: 'Kegiatan Sekolah',
    date: '15/04/2026',
    author: 'Panitia Rohis',
    commentsCount: 8,
    imageUrl: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Seluruh keluarga besar sekolah merayakan penutupan bulan suci dengan pembagian sembako, santunan, dan khataman Al-Qur\'an 30 Juz.',
    content: 'Kegiatan rutin tahunan dalam rangka mengasah kepedulian sosial peserta didik dan mempererat tali silaturahmi antar warga sekolah, orang tua, dan masyarakat sekitar.',
  },
  {
    id: 3,
    title: 'Pembelajaran Outdoor & Study Visit ke Pusat Riset & Laboratorium Teknologi',
    category: 'Berita Terkini',
    date: '02/03/2026',
    author: 'Kurikulum',
    commentsCount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Siswa kelas XI mengikuti kunjungan industri dan riset sains untuk mengenal lebih dalam penerapan ilmu fisika dan komputasi di dunia nyata.',
    content: 'Dalam rangka mengaplikasikan konsep Project Based Learning (PBL), siswa diajak menyaksikan langsung proses pengolahan data sains, pengembangan perangkat lunak, dan simulasi robotika industri.',
  },
  {
    id: 4,
    title: 'Dokumentasi Galeri: Pentas Seni & Seni Islam Nasyid Festival 2026',
    category: 'Galeri',
    date: '20/02/2026',
    author: 'Tim Kreatif',
    commentsCount: 15,
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Suasana kemeriahan dan kekompakan siswa dalam menampilkan bakat nasyid, pidato 3 bahasa, dan seni seni kaligrafi.',
    content: 'Pentas karya seni Islam merupakan wadah ekspresi bakat dan kreativitas siswa dalam mengagungkan kebesaran syiar Islam melalui alunan nasyid dan keindahan seni kaligrafi.',
  },
];

export default function NewsGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  const categories = ['Semua', 'Berita Terkini', 'Kegiatan Sekolah', 'Prestasi', 'Galeri'];

  const filteredNews = activeCategory === 'Semua' 
    ? newsData 
    : newsData.filter(n => n.category === activeCategory);

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Kabar & Informasi
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Berita & Prestasi Terkini
          </h2>
          <p className="text-slate-600 text-base">
            Mengulas berbagai aktivitas, prestasi santri, dan pengumuman resmi SMA IT Andalas Cendekia.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNews.map((news) => (
            <div 
              key={news.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img 
                    src={news.imageUrl} 
                    alt={news.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    {news.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {news.date}</span>
                    <span className="flex items-center gap-1"><User size={12} /> {news.author}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-800 mb-3 line-clamp-2 hover:text-emerald-600 transition-colors">
                    {news.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4">
                    {news.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <MessageSquare size={12} /> {news.commentsCount} Komentar
                </span>

                <button
                  onClick={() => setSelectedArticle(news)}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  Baca <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X size={20} />
            </button>

            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
              {selectedArticle.category}
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{selectedArticle.title}</h2>

            <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 border-b pb-4">
              <span>Diposting oleh: {selectedArticle.author}</span>
              <span>•</span>
              <span>Tanggal: {selectedArticle.date}</span>
            </div>

            <div className="rounded-2xl overflow-hidden mb-6 aspect-video">
              <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-slate text-sm leading-relaxed text-slate-700 space-y-4 mb-8">
              <p className="font-semibold text-slate-800">{selectedArticle.excerpt}</p>
              <p>{selectedArticle.content}</p>
            </div>

            <div className="pt-4 border-t flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors"
              >
                Tutup Artikel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
