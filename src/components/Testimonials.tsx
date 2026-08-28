import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { getSiteTestimonials, TestimonialItem } from '@/lib/storage';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  const loadData = () => {
    setTestimonials(getSiteTestimonials());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('smait_data_synced', loadData);
    return () => {
      window.removeEventListener('smait_data_synced', loadData);
    };
  }, []);

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
                    {[...Array(item.rating || 5)].map((_, i) => (
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
                  src={item.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm shrink-0"
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
