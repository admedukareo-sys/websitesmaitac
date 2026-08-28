import React, { useState, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { getSiteFacilities, FacilityItem } from '@/lib/storage';

export default function FacilitiesShowcase() {
  const [facilitiesData, setFacilitiesData] = useState<FacilityItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>('Semua');
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);

  const loadData = () => {
    setFacilitiesData(getSiteFacilities());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('smait_data_synced', loadData);
    return () => {
      window.removeEventListener('smait_data_synced', loadData);
    };
  }, []);

  const categories = ['Semua', 'Akademik', 'Keagamaan', 'Teknologi', 'Olahraga & Terbuka'];

  const filteredFacilities = activeTab === 'Semua' 
    ? facilitiesData 
    : facilitiesData.filter(f => f.category === activeTab);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-600 bg-amber-100 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Sarana & Prasarana
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Fasilitas Sekolah Modern & Kondusif
          </h2>
          <p className="text-slate-600 text-base">
            Mendukung proses tumbuh kembang, minat bakat, dan kenyamanan siswa dalam lingkungan belajar terbaik.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFacilities.map((fac) => (
            <div 
              key={fac.id}
              onClick={() => setSelectedFacility(fac)}
              className="group relative bg-slate-900 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1.5"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={fac.imageUrl} 
                  alt={fac.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
                
                {/* Category Badge */}
                <span className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                  {fac.category}
                </span>

                {/* Hover Zoom Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={18} />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors">
                    {fac.title}
                  </h3>
                  <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
                    {fac.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setSelectedFacility(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/50 hover:bg-black text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="relative aspect-video w-full">
              <img 
                src={selectedFacility.imageUrl} 
                alt={selectedFacility.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
                {selectedFacility.category}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{selectedFacility.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{selectedFacility.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
