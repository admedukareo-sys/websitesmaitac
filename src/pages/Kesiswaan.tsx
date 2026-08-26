import React from 'react';

export default function Kesiswaan() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-emerald-950 py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Kesiswaan & Ekstrakurikuler</h1>
        <p className="text-emerald-200 max-w-2xl mx-auto">Wadah pengembangan minat, bakat, dan prestasi siswa.</p>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Kegiatan Ekstrakurikuler</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {['Pramuka SIT', 'Panahan', 'Pencak Silat', 'Robotik & IT', 'Jurnalistik', 'Nasyid & Rohis'].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:border-emerald-300 transition-colors">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {i + 1}
              </div>
              <h3 className="text-lg font-bold text-slate-800">{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
