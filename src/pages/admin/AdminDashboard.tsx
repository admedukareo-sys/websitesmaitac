import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRegistrations, Registration, formatDateTime } from '@/lib/storage';
import { getVisitorStats, getVisitorLogs, VisitorLog } from '@/lib/visitorTracking';
import { Eye, Users, Globe, MapPin, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const [regs, setRegs] = useState<Registration[]>([]);
  const [visitorStats, setVisitorStats] = useState(getVisitorStats());
  const [recentVisits, setRecentVisits] = useState<VisitorLog[]>([]);

  const loadData = () => {
    setRegs(getRegistrations());
    setVisitorStats(getVisitorStats());
    setRecentVisits(getVisitorLogs().slice(0, 5));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('smait_data_synced', loadData);
    window.addEventListener('smait_visitor_updated', loadData);
    return () => {
      window.removeEventListener('smait_data_synced', loadData);
      window.removeEventListener('smait_visitor_updated', loadData);
    };
  }, []);

  const totalRegs = regs.length;
  const submittedRegs = regs.filter((r) => r.status === 'SUBMITTED').length;
  const pendingPayments = regs.filter((r) => r.paymentStatus === 'PENDING').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800">Admin Dashboard</h1>
        <p className="text-slate-500 text-xs mt-1">Ringkasan aktivitas SPMB, status pendaftaran, dan lalu lintas kunjungan website SMA IT Andalas Cendekia.</p>
      </div>

      {/* Main KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total Pendaftar SPMB</div>
          <div className="text-4xl font-extrabold text-slate-900">{totalRegs}</div>
          <Link to="/admin/registrations" className="text-xs font-bold text-emerald-600 hover:underline mt-4 inline-flex items-center gap-1">
            Lihat semua pendaftar &rarr;
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Menunggu Verifikasi Berkas</div>
          <div className="text-4xl font-extrabold text-amber-500">{submittedRegs}</div>
          <Link to="/admin/registrations" className="text-xs font-bold text-emerald-600 hover:underline mt-4 inline-flex items-center gap-1">
            Verifikasi Berkas &rarr;
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total Kunjungan Website</div>
          <div className="text-4xl font-extrabold text-emerald-700 flex items-center gap-2">
            <span>{visitorStats.totalVisits}</span>
            <Eye size={24} className="text-emerald-500" />
          </div>
          <Link to="/admin/visitors" className="text-xs font-bold text-emerald-600 hover:underline mt-4 inline-flex items-center gap-1">
            Detail Analisis Kunjungan &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Pengunjung Unik</div>
          <div className="text-4xl font-extrabold text-blue-600 flex items-center gap-2">
            <span>{visitorStats.uniqueVisitors}</span>
            <Users size={24} className="text-blue-400" />
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-3">Berdasarkan Alamat IP</p>
        </div>
      </div>

      {/* Visitor Tracking Overview Widget */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
              <Globe className="text-emerald-600" size={20} />
              <span>Ringkasan Pengunjung Website Terbaru</span>
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">Pencatatan real-time lokasi kota pengunjung dan halaman yang diakses.</p>
          </div>

          <Link 
            to="/admin/visitors"
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <span>Buka Analisis Lengkap</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Top Location Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Lokasi Kota Terbanyak</span>
            <div className="space-y-2">
              {visitorStats.topCities.slice(0, 3).map((c, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <MapPin size={12} className="text-purple-600" /> {c.city}
                  </span>
                  <span className="font-mono text-purple-700 font-bold">{c.count} visit ({c.percent}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Pages Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Halaman Terpopuler</span>
            <div className="space-y-2">
              {visitorStats.topPages.slice(0, 3).map((p, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="font-mono text-emerald-800 font-semibold bg-emerald-100/70 px-1.5 py-0.5 rounded text-[11px]">
                    {p.page}
                  </span>
                  <span className="font-mono text-emerald-700 font-bold">{p.count} views</span>
                </div>
              ))}
            </div>
          </div>

          {/* Device Distribution */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Kunjungan Hari Ini</span>
            <div className="text-3xl font-extrabold text-amber-600 mb-1">{visitorStats.todayVisits}</div>
            <p className="text-slate-500 text-[11px] font-medium">Kunjungan aktif pada hari ini.</p>
          </div>
        </div>

        {/* Recent Visits Mini Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-bold border-y border-slate-200">
                <th className="py-2.5 px-4">Waktu</th>
                <th className="py-2.5 px-4">Halaman</th>
                <th className="py-2.5 px-4">Lokasi / Kota</th>
                <th className="py-2.5 px-4">IP Address</th>
                <th className="py-2.5 px-4">Perangkat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentVisits.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-medium text-slate-700">{formatDateTime(v.timestamp)}</td>
                  <td className="py-2.5 px-4 font-bold text-emerald-800">{v.pageTitle || v.page}</td>
                  <td className="py-2.5 px-4 text-purple-900 font-semibold">{v.city}, {v.region}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-600">{v.ip}</td>
                  <td className="py-2.5 px-4 text-slate-600">{v.deviceType} ({v.os})</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
