import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import TopBar from './TopBar';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profilDropdown, setProfilDropdown] = useState(false);
  const [kesiswaanDropdown, setKesiswaanDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* TopBar Header */}
      <TopBar />

      {/* Main Glassmorphism Navbar */}
      <div className="bg-emerald-900/95 backdrop-blur-md text-white border-b border-emerald-800/80">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2.5">
            {/* Official Logo Brand */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-white p-1 rounded-xl shadow-md group-hover:scale-105 transition-transform">
                <img 
                  src="/logo.png" 
                  alt="Logo SMA IT Andalas Cendekia" 
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
              <div>
                <h1 className="font-extrabold text-lg sm:text-xl leading-none tracking-tight text-white">SMA IT</h1>
                <p className="text-[11px] text-amber-300 font-bold">Andalas Cendekia</p>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">
              <Link to="/" className="hover:text-amber-400 transition-colors">Beranda</Link>

              {/* Dropdown Tentang / Profil */}
              <div 
                className="relative"
                onMouseEnter={() => setProfilDropdown(true)}
                onMouseLeave={() => setProfilDropdown(false)}
              >
                <button className="flex items-center gap-1 hover:text-amber-400 py-2 transition-colors">
                  <span>Profil & Visi</span>
                  <ChevronDown size={15} className={`transition-transform duration-200 ${profilDropdown ? 'rotate-180 text-amber-400' : ''}`} />
                </button>
                {profilDropdown && (
                  <div className="absolute top-full left-0 w-52 bg-emerald-950/95 backdrop-blur-xl border border-emerald-800 rounded-2xl shadow-2xl py-2 animate-fadeIn z-50">
                    <Link to="/profil" className="block px-4 py-2.5 hover:bg-emerald-800/80 hover:text-amber-400 transition-colors text-xs">Profil & Sejarah Sekolah</Link>
                    <Link to="/profil" className="block px-4 py-2.5 hover:bg-emerald-800/80 hover:text-amber-400 transition-colors text-xs">Visi, Misi & 3 Pilar</Link>
                  </div>
                )}
              </div>

              <Link to="/kurikulum" className="hover:text-amber-400 transition-colors">Kurikulum & Tahfidz</Link>

              {/* Dropdown Kesiswaan */}
              <div 
                className="relative"
                onMouseEnter={() => setKesiswaanDropdown(true)}
                onMouseLeave={() => setKesiswaanDropdown(false)}
              >
                <button className="flex items-center gap-1 hover:text-amber-400 py-2 transition-colors">
                  <span>Aktivitas & Prestasi</span>
                  <ChevronDown size={15} className={`transition-transform duration-200 ${kesiswaanDropdown ? 'rotate-180 text-amber-400' : ''}`} />
                </button>
                {kesiswaanDropdown && (
                  <div className="absolute top-full left-0 w-52 bg-emerald-950/95 backdrop-blur-xl border border-emerald-800 rounded-2xl shadow-2xl py-2 animate-fadeIn z-50">
                    <Link to="/kesiswaan" className="block px-4 py-2.5 hover:bg-emerald-800/80 hover:text-amber-400 transition-colors text-xs">Kegiatan Ekstrakurikuler</Link>
                    <Link to="/kesiswaan" className="block px-4 py-2.5 hover:bg-emerald-800/80 hover:text-amber-400 transition-colors text-xs">Galeri Prestasi Santri</Link>
                  </div>
                )}
              </div>

              <Link to="/kontak" className="hover:text-amber-400 transition-colors">Hubungi Kami</Link>
              
              <div className="h-5 w-px bg-emerald-700/80 mx-1"></div>
              
              {user ? (
                <div className="flex items-center gap-4">
                  <Link 
                    to={user.role === 'ADMIN' ? '/admin' : '/spmb/dashboard'} 
                    className="bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2 rounded-full transition-all duration-300 text-xs font-bold border border-emerald-600 shadow"
                  >
                    Dashboard ({user.role})
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="text-emerald-300 hover:text-white transition-colors text-xs font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/spmb" 
                  className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-extrabold px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md shadow-amber-500/20 text-xs tracking-wide uppercase"
                >
                  Portal SPMB
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white focus:outline-none p-2 rounded-lg hover:bg-emerald-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Panel */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-emerald-800/80 flex flex-col gap-3 font-semibold text-sm animate-fadeIn">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400">Beranda</Link>
              <Link to="/profil" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400">Profil & Visi Misi</Link>
              <Link to="/kurikulum" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400">Kurikulum & Tahfidz</Link>
              <Link to="/kesiswaan" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400">Aktivitas & Ekstrakurikuler</Link>
              <Link to="/kontak" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400">Hubungi Kami</Link>
              
              <hr className="border-emerald-800 my-2" />
              {user ? (
                <>
                  <Link 
                    to={user.role === 'ADMIN' ? '/admin' : '/spmb/dashboard'} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-emerald-800 text-center py-2.5 rounded-xl font-bold"
                  >
                    Dashboard ({user.role})
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }} 
                    className="text-left text-emerald-300 hover:text-white py-1"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/spmb" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-amber-500 text-amber-950 font-bold text-center py-2.5 rounded-xl shadow uppercase text-xs tracking-wider"
                >
                  Portal SPMB
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
