import React, { useState } from 'react';
import HeroSlider from '@/components/HeroSlider';
import CoreValues from '@/components/CoreValues';
import FacilitiesShowcase from '@/components/FacilitiesShowcase';
import EventCalendar from '@/components/EventCalendar';
import NewsGrid from '@/components/NewsGrid';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import VideoModal from '@/components/VideoModal';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div>
      {/* 1. Hero Photo Slider */}
      <HeroSlider />

      {/* Video Banner Strip */}
      <section className="bg-emerald-900 py-6 text-white border-y border-emerald-800 shadow-inner">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping shrink-0"></span>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Tonton Video Profil SMA IT Andalas Cendekia</h3>
              <p className="text-xs text-emerald-200">Mengenal suasana belajar, fasilitas, dan kegiatan santri kami.</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold px-6 py-2.5 rounded-full shadow transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-xs uppercase tracking-wider shrink-0"
          >
            <Play size={16} fill="currentColor" /> Tonton Video Profil
          </button>
        </div>
      </section>

      {/* 2. Visi & 3 Pilar Utama (Core Values) */}
      <CoreValues />

      {/* 3. Fasilitas Sekolah (Interactive Showcase Grid) */}
      <FacilitiesShowcase />

      {/* 4. Agenda & Kalender Akademik (Event Calendar) */}
      <EventCalendar />

      {/* 5. Berita & Prestasi Terkini (News Grid) */}
      <NewsGrid />

      {/* 6. Mengapa Memilih Kami & Jam Operasional (Why Choose Us) */}
      <WhyChooseUs />

      {/* 7. Testimoni Orang Tua & Alumni */}
      <Testimonials />

      {/* Video Modal Popup */}
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoTitle="Video Profil SMA IT Andalas Cendekia"
      />
    </div>
  );
}
