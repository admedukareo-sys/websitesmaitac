import React from 'react';
import { Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-emerald-950 text-emerald-200 text-xs py-2 px-4 border-b border-emerald-800/60 hidden lg:block">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left: Official Contact Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={14} className="text-amber-400" />
            <span>0812-6655-8123</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail size={14} className="text-amber-400" />
            <span>smaitandalascendekia@gmail.com</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-amber-400" />
            <span>Dharmasraya, Sumatera Barat</span>
          </div>
        </div>

        {/* Right: School Tagline & Badges */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 bg-emerald-900/80 px-3 py-0.5 rounded-full text-amber-300 font-bold tracking-wide">
            <ShieldCheck size={13} className="text-amber-400" />
            <span>Sekolah Generasi Pemimpin Qur’ani</span>
          </div>
          
          <div className="flex items-center gap-3 text-emerald-300">
            <a href="#" className="hover:text-amber-400 transition-colors font-bold text-xs" title="Facebook">FB</a>
            <a href="#" className="hover:text-amber-400 transition-colors font-bold text-xs" title="Instagram">IG</a>
            <a href="#" className="hover:text-amber-400 transition-colors font-bold text-xs" title="YouTube">YT</a>
          </div>
        </div>
      </div>
    </div>
  );
}
