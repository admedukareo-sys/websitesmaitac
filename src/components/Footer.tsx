import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-emerald-950 text-white overflow-hidden pt-16 pb-8 border-t border-emerald-900">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          {/* Col 1: Identity & Vision */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-1 rounded-2xl shadow">
                <img 
                  src="/logo.png" 
                  alt="Logo Official SMA IT Andalas Cendekia" 
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white leading-tight">SMA IT</h3>
                <p className="text-xs text-amber-300 font-semibold">Andalas Cendekia</p>
              </div>
            </div>

            <div className="bg-emerald-900/60 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-emerald-800/80">
              <h4 className="font-bold text-amber-400 text-xs uppercase tracking-wider mb-2">Tagline & Visi Sekolah</h4>
              <p className="text-emerald-100 text-xs font-semibold italic mb-2">"Sekolah Generasi Pemimpin Qur’ani"</p>
              <p className="text-emerald-200 text-xs leading-relaxed">
                Mewujudkan Siswa Generasi Pemimpin Qur’ani yang beradab, berakhlak mulia, dan siap bersaing secara global.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-xs text-slate-300 uppercase tracking-wider mb-3">Media Sosial Official</h4>
              <div className="flex space-x-2">
                <a href="#" className="w-9 h-9 bg-emerald-900/80 hover:bg-amber-500 hover:text-amber-950 font-bold text-xs rounded-xl flex items-center justify-center transition-all duration-300 text-emerald-200">FB</a>
                <a href="#" className="w-9 h-9 bg-emerald-900/80 hover:bg-amber-500 hover:text-amber-950 font-bold text-xs rounded-xl flex items-center justify-center transition-all duration-300 text-emerald-200">IG</a>
                <a href="#" className="w-9 h-9 bg-emerald-900/80 hover:bg-amber-500 hover:text-amber-950 font-bold text-xs rounded-xl flex items-center justify-center transition-all duration-300 text-emerald-200">YT</a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white text-base mb-6 border-b border-emerald-800 pb-3">Tautan Utama</h4>
            <ul className="space-y-3 text-xs">
              <li><Link to="/" className="text-emerald-200 hover:text-white transition-colors">Beranda Utama</Link></li>
              <li><Link to="/profil" className="text-emerald-200 hover:text-white transition-colors">Profil & Struktur Organisasi</Link></li>
              <li><Link to="/kurikulum" className="text-emerald-200 hover:text-white transition-colors">Program Khas & Profil Lulusan</Link></li>
              <li><Link to="/kesiswaan" className="text-emerald-200 hover:text-white transition-colors">Aktivitas & Ekstrakurikuler</Link></li>
              <li><Link to="/spmb" className="text-emerald-200 hover:text-white transition-colors">Portal SPMB Online</Link></li>
              <li><Link to="/kontak" className="text-emerald-200 hover:text-white transition-colors">Hubungi Sekolah</Link></li>
            </ul>
          </div>

          {/* Col 3: Excellent Programs */}
          <div>
            <h4 className="font-bold text-white text-base mb-6 border-b border-emerald-800 pb-3">Program Khas Sekolah</h4>
            <ul className="space-y-3 text-xs text-emerald-200">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                PENDAKI (Pembinaan Dasar Kepemimpinan Islam)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Campus Preparation (Target Lolos PTN/PTKIN)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Tri Lingual Culture (Indonesia, Arab, English)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Islamic Studies (Tahsin, Tahfizh, Aqidah, Fiqh)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Life Skill Development Era Digital
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Identity */}
          <div>
            <h4 className="font-bold text-white text-base mb-6 border-b border-emerald-800 pb-3">Alamat & Kontak Resmi</h4>
            <div className="space-y-4 text-xs text-emerald-200">
              <div className="flex items-start gap-3">
                <MapPin className="text-amber-400 shrink-0 mt-0.5" size={18} />
                <span>Jorong Ranah Lintas, Nagari Tebing Tinggi, Kec. Pulau Punjung, Kab. Dharmasraya, Prov. Sumatera Barat</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-amber-400 shrink-0" size={18} />
                <span>0812-6655-8123</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-amber-400 shrink-0" size={18} />
                <span>smaitandalascendekia@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-amber-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <p>Website: www.andalascendekia.sch.id</p>
                  <p>Pendirian: 5 Mei 2024</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-800/80 space-y-1.5 text-[11px]">
                <div className="flex items-center gap-2 text-white font-medium">
                  <ShieldCheck size={16} className="text-amber-400" />
                  <span>SMA IT Andalas Cendekia</span>
                </div>
                <p className="text-emerald-300/80 pl-6">Jenjang: SMA • Status: Swasta</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="border-t border-emerald-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-emerald-400">
          <p>&copy; {new Date().getFullYear()} SMA IT Andalas Cendekia. All rights reserved.</p>
          <div className="flex space-x-6 text-[11px] text-emerald-400/80">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
