import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, X } from 'lucide-react';

interface EventItem {
  id: number;
  day: string;
  month: string;
  title: string;
  time: string;
  location: string;
  category: string;
  description: string;
  organizer: string;
}

const upcomingEvents: EventItem[] = [
  {
    id: 1,
    day: '15',
    month: 'OKT',
    title: 'Camp Tahfidz Intensif & Sertifikasi Hafalan 2026',
    time: '08:00 WIB – Selesai',
    location: 'Masjid & Camp Hall SMA IT',
    category: 'Keagamaan & Tahfidz',
    description: 'Kegiatan karantina dan murojaah hafalan intensif bagi seluruh calon wisudawan Tahfidz angkatan 2026/2027.',
    organizer: 'Panitia Tahfidz & Musyrif',
  },
  {
    id: 2,
    day: '22',
    month: 'OKT',
    title: 'Seminar Parenting: Mendidik Anak Berakhlak & Adaptif Digital',
    time: '09:00 WIB – 12:00 WIB',
    location: 'Aula Utama SMA IT Andalas',
    category: 'Parenting & Edukasi',
    description: 'Seminar interaktif bersama psikolog pendidikan nasional membahas strategi pengawasan dan pendampingan anak di era AI.',
    organizer: 'Humas & Komite Sekolah',
  },
  {
    id: 3,
    day: '05',
    month: 'NOV',
    title: 'Andalas Science, IT & Innovation Expo 2026',
    time: '08:30 WIB – 15:30 WIB',
    location: 'Smart Lab & Gymnasium',
    category: 'Sains & Teknologi',
    description: 'Pameran karya proyek teknologi siswa, kompetisi robotik antar-SMP/SMA, serta workshop kecerdasan buatan.',
    organizer: 'Klub IT & Ekstrakurikuler',
  },
];

export default function EventCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-slate-900 to-slate-950"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-slate-800 pb-8">
          <div>
            <span className="text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
              Agenda & Kegiatan Sekolah
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">
              Event & Kalender Akademik
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            Ikuti berbagai kegiatan akademik, keagamaan, seminar parenting, dan pentas karya peserta didik.
          </p>
        </div>

        {/* Event List Cards */}
        <div className="space-y-6">
          {upcomingEvents.map((evt) => (
            <div 
              key={evt.id}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-3xl p-6 sm:p-8 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              {/* Date Box */}
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex flex-col items-center justify-center shrink-0 shadow-md">
                  <span className="text-2xl font-extrabold leading-none">{evt.day}</span>
                  <span className="text-xs font-bold uppercase tracking-wider mt-1 opacity-90">{evt.month}</span>
                </div>

                <div>
                  <span className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold px-3 py-0.5 rounded-full mb-2">
                    {evt.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 hover:text-amber-400 transition-colors">
                    {evt.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-amber-400" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-amber-400" />
                      <span>{evt.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedEvent(evt)}
                className="shrink-0 bg-white/10 hover:bg-emerald-600 text-white border border-white/20 hover:border-emerald-500 px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2"
              >
                Detail Agenda <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-xl w-full p-8 shadow-2xl relative">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <span className="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full mb-4">
              {selectedEvent.category}
            </span>

            <h3 className="text-2xl font-bold text-white mb-4">{selectedEvent.title}</h3>

            <div className="space-y-3 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 mb-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-amber-400" />
                <span>Tanggal: {selectedEvent.day} {selectedEvent.month} 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-amber-400" />
                <span>Waktu: {selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-amber-400" />
                <span>Lokasi: {selectedEvent.location}</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {selectedEvent.description}
            </p>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Penyelenggara: {selectedEvent.organizer}</span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2 rounded-full transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
