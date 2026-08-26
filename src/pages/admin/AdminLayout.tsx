import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, Users, CreditCard, LogOut, ArrowLeft, ShieldCheck, User } from 'lucide-react';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/spmb/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-950 text-emerald-100 flex-shrink-0 flex flex-col justify-between border-r border-emerald-900 shadow-xl">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-emerald-900/80 bg-emerald-900/40">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-amber-950 flex items-center justify-center font-bold shadow">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-lg font-extrabold text-white">Panel Admin</h2>
            </div>
            <p className="text-xs text-amber-300 font-medium">SMA IT Andalas Cendekia</p>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-6 space-y-1.5 font-semibold text-xs">
            <Link 
              to="/admin" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive('/admin') 
                  ? 'bg-amber-500 text-amber-950 font-bold shadow-md shadow-amber-500/20' 
                  : 'hover:bg-emerald-900/80 text-emerald-200 hover:text-white'
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard Admin</span>
            </Link>

            <Link 
              to="/admin/registrations" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive('/admin/registrations') 
                  ? 'bg-amber-500 text-amber-950 font-bold shadow-md shadow-amber-500/20' 
                  : 'hover:bg-emerald-900/80 text-emerald-200 hover:text-white'
              }`}
            >
              <Users size={18} />
              <span>Data Pendaftar</span>
            </Link>

            <Link 
              to="/admin/payments" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive('/admin/payments') 
                  ? 'bg-amber-500 text-amber-950 font-bold shadow-md shadow-amber-500/20' 
                  : 'hover:bg-emerald-900/80 text-emerald-200 hover:text-white'
              }`}
            >
              <CreditCard size={18} />
              <span>Verifikasi Pembayaran</span>
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer (User info & Logout) */}
        <div className="p-4 border-t border-emerald-900/80 bg-emerald-950/80 space-y-2">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xs font-semibold text-emerald-300 hover:text-white px-3 py-2 rounded-lg hover:bg-emerald-900/60 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Website Utama</span>
          </Link>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600/90 hover:bg-red-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow transition-colors"
          >
            <LogOut size={16} />
            <span>Logout Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Portal Admin</span>
            <span>/</span>
            <span className="font-bold text-slate-800">
              {location.pathname === '/admin' ? 'Dashboard' : location.pathname.includes('registrations') ? 'Data Pendaftar' : 'Verifikasi Pembayaran'}
            </span>
          </div>

          {/* Admin User Info & Logout Button Header */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-right">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs border border-emerald-300">
                <User size={16} />
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-bold text-slate-800 leading-tight">{user.name}</div>
                <div className="text-[10px] text-slate-500">{user.email}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 border border-red-200"
              title="Logout dari Admin"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
