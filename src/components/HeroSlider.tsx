import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Play, Pause } from 'lucide-react';
import { getSiteSlides, SlideItem } from '@/lib/storage';

export default function HeroSlider() {
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const loadData = () => {
    setSlides(getSiteSlides());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('smait_data_synced', loadData);
    return () => {
      window.removeEventListener('smait_data_synced', loadData);
    };
  }, []);

  useEffect(() => {
    if (isPaused || slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, slides]);

  const handlePrev = () => {
    if (slides.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    if (slides.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  if (slides.length === 0) {
    return <div className="min-h-[500px] bg-emerald-950 flex items-center justify-center text-white">Loading Slide...</div>;
  }

  return (
    <div 
      className="relative w-full overflow-hidden bg-emerald-950 min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] flex items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Background Images with Smooth Cross-fade */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-10000 ease-out"
            style={{ backgroundImage: `url('${slide.imageUrl}')` }}
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-emerald-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-black/30" />
        </div>
      ))}

      {/* Slide Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-20 md:py-28">
        <div className="max-w-3xl">
          {slides.map((slide, index) => {
            if (index !== currentIndex) return null;
            return (
              <div key={slide.id} className="animate-fadeIn">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-emerald-800/80 backdrop-blur-md border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm font-semibold mb-6 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  {slide.badge}
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-md">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg md:text-xl text-emerald-100/90 mb-8 max-w-2xl leading-relaxed">
                  {slide.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  {slide.primaryCtaText && (
                    <Link 
                      to={slide.primaryCtaLink || '/spmb'} 
                      className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold px-8 py-3.5 rounded-full shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 text-sm sm:text-base"
                    >
                      {slide.primaryCtaText} <ArrowRight size={20} />
                    </Link>
                  )}
                  {slide.secondaryCtaText && (
                    <Link 
                      to={slide.secondaryCtaLink || '/profil'} 
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium px-8 py-3.5 rounded-full transition-all duration-300 hover:border-white/50 text-sm sm:text-base"
                    >
                      {slide.secondaryCtaText}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-emerald-600/80 text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110 focus:outline-none hidden sm:flex items-center justify-center shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-emerald-600/80 text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110 focus:outline-none hidden sm:flex items-center justify-center shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Bottom Controls Bar (Slide Counter + Dots + Play/Pause) */}
      <div className="absolute bottom-6 left-0 right-0 z-30 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Slide Counter */}
        <div className="text-white/80 font-mono text-sm tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
          <span className="text-amber-400 font-bold">0{currentIndex + 1}</span> / 0{slides.length}
        </div>

        {/* Dots Navigation */}
        <div className="flex items-center gap-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-500 focus:outline-none ${
                index === currentIndex 
                  ? 'w-10 bg-amber-400 shadow-md shadow-amber-400/50' 
                  : 'w-2.5 bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause Indicator */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="text-white/70 hover:text-white text-xs flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 transition-colors"
          title={isPaused ? "Resume auto-play" : "Pause auto-play"}
        >
          {isPaused ? <Play size={12} /> : <Pause size={12} />}
          <span>{isPaused ? 'Paused' : 'Auto Play'}</span>
        </button>
      </div>
    </div>
  );
}
