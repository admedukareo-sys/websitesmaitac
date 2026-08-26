import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { getSiteSettings, SiteSettings } from '@/lib/storage';

export default function TopBar() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    setSettings(getSiteSettings());
  }, []);

  const phone = settings?.phone || '0812-6655-8123';
  const email = settings?.email || 'smaitandalascendekia@gmail.com';
  const fb = settings?.facebookUrl || '#';
  const ig = settings?.instagramUrl || '#';
  const yt = settings?.youtubeUrl || '#';

  return (
    <div className="bg-emerald-950 text-emerald-200 text-xs py-2 px-4 border-b border-emerald-800/60 hidden lg:block">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left: Official Contact Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={14} className="text-amber-400" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail size={14} className="text-amber-400" />
            <span>{email}</span>
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
            <span>{settings?.tagline || 'Sekolah Generasi Pemimpin Qur’ani'}</span>
          </div>
          
          <div className="flex items-center gap-3 text-emerald-300">
            <a href={fb} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors font-bold text-xs" title="Facebook">FB</a>
            <a href={ig} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors font-bold text-xs" title="Instagram">IG</a>
            <a href={yt} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors font-bold text-xs" title="YouTube">YT</a>
          </div>
        </div>
      </div>
    </div>
  );
}
