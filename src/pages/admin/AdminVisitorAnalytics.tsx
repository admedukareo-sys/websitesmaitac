import React, { useEffect, useState } from 'react';
import { 
  getVisitorLogs, 
  getVisitorStats, 
  clearVisitorLogs, 
  syncVisitorLogsFromSupabase,
  VisitorLog 
} from '@/lib/visitorTracking';
import { formatDateTime } from '@/lib/storage';
import { 
  Eye, Users, Calendar, MapPin, Smartphone, Monitor, Globe, Search, RefreshCw, Trash2, ArrowUpRight, ShieldCheck, Compass, Laptop
} from 'lucide-react';

export default function AdminVisitorAnalytics() {
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [stats, setStats] = useState(getVisitorStats());
  const [search, setSearch] = useState('');
  const [pageFilter, setPageFilter] = useState('ALL');
  const [deviceFilter, setDeviceFilter] = useState('ALL');

  const loadData = async () => {
    const rawLogs = await syncVisitorLogsFromSupabase();
    setLogs(rawLogs);
    setStats(getVisitorStats());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('smait_visitor_updated', loadData);
    return () => {
      window.removeEventListener('smait_visitor_updated', loadData);
    };
  }, []);

  const handleClear = () => {
    if (window.confirm('Apakah Anda yakin ingin mengosongkan log kunjungan website? Log akan di-reset.')) {
      clearVisitorLogs();
      loadData();
    }
  };

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.ip.toLowerCase().includes(search.toLowerCase()) ||
      log.city.toLowerCase().includes(search.toLowerCase()) ||
      log.region.toLowerCase().includes(search.toLowerCase()) ||
      log.page.toLowerCase().includes(search.toLowerCase()) ||
      (log.pageTitle && log.pageTitle.toLowerCase().includes(search.toLowerCase()));

    const matchesPage = pageFilter === 'ALL' || log.page === pageFilter;
    const matchesDevice = deviceFilter === 'ALL' || log.deviceType === deviceFilter;

    return matchesSearch && matchesPage && matchesDevice;
  });

  const topCity = stats.topCities.length > 0 ? `${stats.topCities[0].city}` : 'Dharmasraya';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-2">
            <Globe className="text-emerald-600" size={30} />
            <span>Pencatatan Kunjungan Website & Lokasi</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Pantau statistik pengunjung website SMA IT Andalas Cendekia, lokasi kota asal, halaman populer, dan detail IP address secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            className="bg-white hover:bg-slate-100 text-slate-700 font-bold px-3.5 py-2 rounded-xl text-xs border border-slate-300 transition-all flex items-center gap-1.5 shadow-sm"
            title="Refresh Data"
          >
            <RefreshCw size={14} className="text-emerald-600" /> Refresh Data
          </button>

          <button
            onClick={handleClear}
            className="bg-red-50 hover:bg-red-100 text-red-700 font-bold px-3.5 py-2 rounded-xl text-xs border border-red-200 transition-all flex items-center gap-1.5"
            title="Reset Visitor Logs"
          >
            <Trash2 size={14} /> Reset Log
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Visits */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Kunjungan</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Eye size={20} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{stats.totalVisits}</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight size={13} /> Tayangan halaman website
          </p>
        </div>

        {/* Card 2: Unique Visitors */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pengunjung Unik</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Users size={20} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{stats.uniqueVisitors}</div>
          <p className="text-[11px] text-blue-600 font-semibold mt-1 flex items-center gap-1">
            <ShieldCheck size={13} /> Berdasarkan Alamat IP unik
          </p>
        </div>

        {/* Card 3: Today's Visits */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Kunjungan Hari Ini</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Calendar size={20} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-600 mt-2">{stats.todayVisits}</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Sesi kunjungan aktif hari ini</p>
        </div>

        {/* Card 4: Top Location */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Kota Asal Terbanyak</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <MapPin size={20} />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 truncate" title={topCity}>{topCity}</div>
          <p className="text-[11px] text-purple-600 font-semibold mt-1 flex items-center gap-1">
            <Compass size={13} /> Sumbar & Wilayah Sekitar
          </p>
        </div>
      </div>

      {/* Visual Analytics Cards: Location & Popular Pages & Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Top Locations */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <MapPin size={16} className="text-purple-600" />
                <span>Distribusi Lokasi Pengunjung</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">{stats.topCities.length} Kota</span>
            </div>

            <div className="space-y-3 text-xs">
              {stats.topCities.slice(0, 5).map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      {item.city} <span className="text-[10px] text-slate-400 font-normal">({item.region})</span>
                    </span>
                    <span className="text-purple-700 font-mono">{item.count} kunjungan ({item.percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(item.percent, 5)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Top Visited Pages */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <Globe size={16} className="text-emerald-600" />
                <span>Halaman Terpopuler</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Top URLs</span>
            </div>

            <div className="space-y-3 text-xs">
              {stats.topPages.slice(0, 5).map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span className="font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                      {item.page}
                    </span>
                    <span className="text-emerald-700 font-mono">{item.count} tayangan ({item.percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(item.percent, 5)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Devices & Browsers */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <Laptop size={16} className="text-blue-600" />
                <span>Perangkat & Browser</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Platform</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Tipe Perangkat</span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {stats.topDevices.map((d, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-2 rounded-xl">
                      <div className="text-slate-400 flex justify-center mb-1">
                        {d.device === 'Mobile' ? <Smartphone size={16} /> : <Monitor size={16} />}
                      </div>
                      <div className="font-bold text-slate-800 text-[11px]">{d.device}</div>
                      <div className="text-blue-600 font-mono text-[10px] font-bold">{d.percent}% ({d.count})</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Browser Terpopuler</span>
                <div className="flex flex-wrap gap-1.5">
                  {stats.topBrowsers.map((b, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-semibold">
                      {b.browser}: <strong className="text-slate-900">{b.count}</strong> ({b.percent}%)
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Section: Realtime Visitor Logs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari IP address, kota, halaman..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
            {/* Page Filter */}
            <select
              value={pageFilter}
              onChange={(e) => setPageFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-300 bg-white text-slate-700 outline-none"
            >
              <option value="ALL">Semua Halaman Website</option>
              <option value="/">Beranda (/)</option>
              <option value="/spmb">Portal SPMB (/spmb)</option>
              <option value="/profil">Profil Sekolah (/profil)</option>
              <option value="/kurikulum">Kurikulum (/kurikulum)</option>
              <option value="/kesiswaan">Kesiswaan (/kesiswaan)</option>
              <option value="/kontak">Kontak (/kontak)</option>
            </select>

            {/* Device Filter */}
            <select
              value={deviceFilter}
              onChange={(e) => setDeviceFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-300 bg-white text-slate-700 outline-none"
            >
              <option value="ALL">Semua Perangkat</option>
              <option value="Desktop">Desktop / Laptop</option>
              <option value="Mobile">Mobile Smartphone</option>
              <option value="Tablet">Tablet</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <th className="px-6 py-4">Waktu Kunjungan</th>
                <th className="px-6 py-4">Halaman Dibuka</th>
                <th className="px-6 py-4">Lokasi & Kota Asal</th>
                <th className="px-6 py-4">Alamat IP</th>
                <th className="px-6 py-4">Perangkat & Browser</th>
                <th className="px-6 py-4">Sumber Referrer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                    Belum ada log kunjungan yang sesuai dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-slate-400" />
                        <span>{formatDateTime(log.timestamp)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-emerald-800">{log.pageTitle || log.page}</div>
                      <div className="text-slate-400 font-mono text-[11px]">{log.page}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-purple-900 flex items-center gap-1">
                        <MapPin size={12} className="text-purple-600 shrink-0" />
                        <span>{log.city}</span>
                      </div>
                      <div className="text-slate-500 text-[11px]">{log.region}, {log.country}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                        {log.ip}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800 flex items-center gap-1">
                        {log.deviceType === 'Mobile' ? <Smartphone size={13} className="text-blue-500" /> : <Monitor size={13} className="text-slate-500" />}
                        <span>{log.deviceType} ({log.os})</span>
                      </div>
                      <div className="text-slate-500 text-[11px]">{log.browser}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                        {log.referrer}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 flex justify-between items-center">
          <span>Menampilkan <strong>{filteredLogs.length}</strong> dari total <strong>{logs.length}</strong> log kunjungan</span>
          <span className="font-mono text-[11px] text-slate-400">Otomatis mencatat geolocation IP & waktu</span>
        </div>
      </div>
    </div>
  );
}
