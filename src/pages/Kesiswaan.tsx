import React, { useState, useEffect } from 'react';
import { Award, Trophy, Sparkles, Calendar, UserCheck, X } from 'lucide-react';
import { getSiteActivities, ActivityAchievementItem } from '@/lib/storage';

export default function Kesiswaan() {
  const [activities, setActivities] = useState<ActivityAchievementItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>('Semua');
  const [selectedItem, setSelectedItem] = useState<ActivityAchievementItem | null>(null);

  const loadData = () => {
    setActivities(getSiteActivities());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('smait_data_synced', loadData);
    return () => {
      window.removeEventListener('smait_data_synced', loadData);
    };
  }, []);

  const tabs = ['Semua', 'Prestasi', 'Aktivitas Kesiswaan', 'Ekstrakurikuler'];

  const filteredItems = activeTab === 'Semua' 
    ? activities 
    : activities.filter((a) => a.type === activeTab);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Page Header */}
      <div className="relative bg-emerald-950 py-20 text-white overflow-hidden border-b border-emerald-900">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-80 h-80 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-emerald-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <span className="text-amber-300 bg-emerald-900/90 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block border border-amber-400/30">
            Aktivitas & Prestasi Siswa
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Kesiswaan, Ekstrakurikuler & Prestasi
          </h1>
          <p className="text-emerald-200 max-w-2xl mx-auto text-base leading-relaxed">
            Wadah bina karakter islami, pengembangan kepemimpinan, bakat generasi Qur’ani, dan torehan karya juara siswa SMA IT Andalas Cendekia.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-xs font-extrabold transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Activities & Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Type Badge */}
                  <span className={`absolute top-4 left-4 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow ${
                    item.type === 'Prestasi' 
                      ? 'bg-amber-500 text-amber-950 font-black' 
                      : item.type === 'Ekstrakurikuler' 
                      ? 'bg-blue-600' 
                      : 'bg-emerald-600'
                  }`}>
                    {item.type}
                  </span>

                  {/* Achievement Badge */}
                  <span className="absolute bottom-4 right-4 bg-emerald-950/90 text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-400/40 backdrop-blur-sm flex items-center gap-1">
                    <Trophy size={12} className="text-amber-400" />
                    {item.achievementBadge}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-emerald-700">{item.category}</span>
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 border-t border-slate-100 mt-2 pt-4 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <UserCheck size={14} className="text-emerald-600" /> {item.studentName}
                </span>
                <span className="text-emerald-600 font-bold hover:underline">Detail &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Preview Detail */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
            >
              <X size={18} />
            </button>

            <div className="relative aspect-video w-full bg-slate-900">
              <img 
                src={selectedItem.imageUrl} 
                alt={selectedItem.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                  {selectedItem.type}
                </span>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                  {selectedItem.category}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 mb-3">{selectedItem.title}</h3>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 pb-4 border-b">
                <span>🏆 Badge: <strong className="text-slate-800">{selectedItem.achievementBadge}</strong></span>
                <span>👤 Peserta: <strong className="text-slate-800">{selectedItem.studentName}</strong></span>
                <span>📅 Tahun: <strong className="text-slate-800">{selectedItem.date}</strong></span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
