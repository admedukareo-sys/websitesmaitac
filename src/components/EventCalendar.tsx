import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, ArrowRight, X, User } from 'lucide-react';
import { getSiteEvents, EventItem } from '@/lib/storage';

export default function EventCalendar() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const loadData = () => {
    setEvents(getSiteEvents());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('smait_data_synced', loadData);
    return () => {
      window.removeEventListener('smait_data_synced', loadData);
    };
  }, []);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
              Kalender Akademik & Kegiatan
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
              Agenda Acara Mendatang
            </h2>
          </div>
          <p className="text-slate-600 text-sm max-w-md">
            Ikuti berbagai agenda penting kegiatan santri, seminar parenting, olimpiade, serta ujian akademik di SMA IT Andalas Cendekia.
          </p>
        </div>

        {/* Events Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((evt) => (
            <div 
              key={evt.id}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
            >
              <div>
                {/* Date & Category Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-950 text-white flex flex-col items-center justify-center font-bold shadow-md">
                    <span className="text-xl leading-none text-amber-400">{evt.day}</span>
                    <span className="text-[10px] tracking-wider uppercase text-emerald-200 mt-0.5">{evt.month}</span>
                  </div>

                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full">
                    {evt.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-4 line-clamp-2 hover:text-emerald-700 transition-colors">
                  {evt.title}
                </h3>

                <div className="space-y-2 mb-6 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock size={15} className="text-emerald-600 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-emerald-600 shrink-0" />
                    <span>{evt.location}</span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-6">
                  {evt.description}
                </p>
              </div>

              <button
                onClick={() => setSelectedEvent(evt)}
                className="w-full bg-white hover:bg-emerald-600 hover:text-white border border-slate-200 font-bold text-xs py-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm text-slate-700"
              >
                Detail Agenda <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl relative border border-slate-100">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950 text-white flex flex-col items-center justify-center font-bold shadow-md shrink-0">
                <span className="text-2xl leading-none text-amber-400">{selectedEvent.day}</span>
                <span className="text-xs uppercase text-emerald-200">{selectedEvent.month}</span>
              </div>
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full inline-block mb-1">
                  {selectedEvent.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{selectedEvent.title}</h3>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs text-slate-700 mb-6 border border-slate-200/80">
              <div className="flex items-center gap-2 font-semibold">
                <Clock size={16} className="text-emerald-600" />
                <span>Waktu: {selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <MapPin size={16} className="text-emerald-600" />
                <span>Lokasi: {selectedEvent.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <User size={16} className="text-emerald-600" />
                <span>Penyelenggara: {selectedEvent.organizer}</span>
              </div>
            </div>

            <div className="prose prose-slate text-xs leading-relaxed text-slate-600 mb-8">
              <h4 className="font-bold text-slate-800 mb-2 text-sm">Deskripsi Acara:</h4>
              <p>{selectedEvent.description}</p>
            </div>

            <div className="pt-4 border-t flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-6 py-2.5 rounded-full transition-colors"
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
