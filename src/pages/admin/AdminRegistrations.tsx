import React, { useEffect, useState } from 'react';
import { 
  getRegistrations, 
  getUsers, 
  updateRegistrationById, 
  deleteRegistrationById, 
  addRegistrationByAdmin, 
  formatDateTime,
  Registration 
} from '@/lib/storage';
import { 
  Plus, Edit2, Trash2, Search, Filter, X, CheckCircle, Clock, AlertCircle, 
  BarChart3, PieChart, Layers, HelpCircle, FileText, Share2, Eye, Building2, User, Sparkles, Calendar
} from 'lucide-react';

interface CombinedReg extends Registration {
  userName: string;
  userEmail: string;
}

export default function AdminRegistrations() {
  const [list, setList] = useState<CombinedReg[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [programFilter, setProgramFilter] = useState<string>('ALL');
  const [activeMainTab, setActiveMainTab] = useState<'LIST' | 'ANALYTICS'>('LIST');

  // Analytics Specific Filters
  const [analyticsProgram, setAnalyticsProgram] = useState<string>('ALL');
  const [analyticsSource, setAnalyticsSource] = useState<string>('ALL');
  const [analyticsStatus, setAnalyticsStatus] = useState<string>('ALL');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingReg, setEditingReg] = useState<CombinedReg | null>(null);
  const [surveyDetailReg, setSurveyDetailReg] = useState<CombinedReg | null>(null);

  // Form States for Add
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newSchool, setNewSchool] = useState('');
  const [newNisn, setNewNisn] = useState('');
  const [newProgramType, setNewProgramType] = useState<'BOARDING' | 'REGULER'>('BOARDING');
  const [newInfoSource, setNewInfoSource] = useState('Instagram / Facebook Official');
  const [newReasonToJoin, setNewReasonToJoin] = useState('');
  const [newStatus, setNewStatus] = useState<Registration['status']>('SUBMITTED');
  const [newPaymentStatus, setNewPaymentStatus] = useState<Registration['paymentStatus']>('PENDING');

  // Form States for Edit
  const [editStatus, setEditStatus] = useState<Registration['status']>('DRAFT');
  const [editProgramType, setEditProgramType] = useState<'BOARDING' | 'REGULER'>('BOARDING');
  const [editInfoSource, setEditInfoSource] = useState('');
  const [editReasonToJoin, setEditReasonToJoin] = useState('');
  const [editSchool, setEditSchool] = useState('');
  const [editReason, setEditReason] = useState('');

  const loadData = () => {
    const regs = getRegistrations();
    const users = getUsers();
    const combined: CombinedReg[] = regs.map((r) => {
      const u = users.find((usr) => usr.id === r.userId);
      return {
        ...r,
        userName: u ? u.name : 'Siswa',
        userEmail: u ? u.email : '-',
      };
    });
    setList(combined);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('smait_data_synced', loadData);
    return () => {
      window.removeEventListener('smait_data_synced', loadData);
    };
  }, []);

  const handleUpdateStatus = (id: number, newStatusVal: Registration['status']) => {
    updateRegistrationById(id, { status: newStatusVal });
    loadData();
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data pendaftar "${name}"?`)) {
      deleteRegistrationById(id);
      loadData();
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRegistrationByAdmin({
      name: newName,
      email: newEmail,
      previousSchool: newSchool,
      nisn: newNisn,
      programType: newProgramType,
      infoSource: newInfoSource,
      reasonToJoin: newReasonToJoin,
      status: newStatus,
      paymentStatus: newPaymentStatus,
    });
    setIsAddModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewSchool('');
    setNewNisn('');
    setNewReasonToJoin('');
    loadData();
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReg) return;

    updateRegistrationById(editingReg.id, {
      status: editStatus,
      programType: editProgramType,
      infoSource: editInfoSource,
      reasonToJoin: editReasonToJoin,
      previousSchool: editSchool,
      rejectionReason: editReason,
    });

    setEditingReg(null);
    loadData();
  };

  const openEditModal = (reg: CombinedReg) => {
    setEditingReg(reg);
    setEditStatus(reg.status);
    setEditProgramType(reg.programType || 'BOARDING');
    setEditInfoSource(reg.infoSource || 'Instagram / Facebook Official');
    setEditReasonToJoin(reg.reasonToJoin || '');
    setEditSchool(reg.previousSchool || '');
    setEditReason(reg.rejectionReason || '');
  };

  // Filter & Search Logic for Table View
  const filteredList = list.filter((reg) => {
    const matchesSearch = 
      reg.userName.toLowerCase().includes(search.toLowerCase()) ||
      reg.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      (reg.previousSchool && reg.previousSchool.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || reg.status === statusFilter;
    const matchesProgram = programFilter === 'ALL' || (reg.programType || 'BOARDING') === programFilter;

    return matchesSearch && matchesStatus && matchesProgram;
  });

  // Analytics Filter Logic
  const analyticsList = list.filter((reg) => {
    const matchesProgram = analyticsProgram === 'ALL' || (reg.programType || 'BOARDING') === analyticsProgram;
    const matchesSource = analyticsSource === 'ALL' || reg.infoSource === analyticsSource;
    const matchesStatus = analyticsStatus === 'ALL' || reg.status === analyticsStatus;
    return matchesProgram && matchesSource && matchesStatus;
  });

  // Calculate Analytics Stats
  const totalAnalyticsCount = analyticsList.length;
  const boardingCount = analyticsList.filter(r => (r.programType || 'BOARDING') === 'BOARDING').length;
  const regulerCount = analyticsList.filter(r => r.programType === 'REGULER').length;

  const boardingPercent = totalAnalyticsCount > 0 ? Math.round((boardingCount / totalAnalyticsCount) * 100) : 0;
  const regulerPercent = totalAnalyticsCount > 0 ? Math.round((regulerCount / totalAnalyticsCount) * 100) : 0;

  // Source Distribution Breakdown
  const knownSources = [
    'Instagram / Facebook Official',
    'Spanduk / Baliho / Banner',
    'Brosur / Leaflet Informasi',
    'Rekomendasi Alumni / Teman / Kerabat',
    'Sosialisasi Sekolah / Kunjungan Guru',
    'Website Official Sekolah',
    'Lain-lain',
  ];

  const sourceCounts: Record<string, number> = {};
  knownSources.forEach(s => { sourceCounts[s] = 0; });
  analyticsList.forEach(r => {
    const src = r.infoSource || 'Instagram / Facebook Official';
    sourceCounts[src] = (sourceCounts[src] || 0) + 1;
  });

  const getStatusBadge = (status: Registration['status']) => {
    switch (status) {
      case 'SUBMITTED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 inline-flex items-center gap-1"><Clock size={12} /> Menunggu Verifikasi</span>;
      case 'VERIFIED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 inline-flex items-center gap-1"><CheckCircle size={12} /> Berkas Diverifikasi</span>;
      case 'PASSED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1"><CheckCircle size={12} /> Lulus Seleksi</span>;
      case 'REJECTED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200 inline-flex items-center gap-1"><AlertCircle size={12} /> Ditolak / Revisi</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">Draft</span>;
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Manajemen & Analytics SPMB</h1>
          <p className="text-slate-500 text-xs mt-1">Kelola data calon siswa, survei informasi, pilihan program (Boarding/Reguler), dan kelulusan.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow flex items-center gap-2 shrink-0"
          >
            <Plus size={16} /> Tambah Data Pendaftar
          </button>
        </div>
      </div>

      {/* Navigation Main Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveMainTab('LIST')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeMainTab === 'LIST'
              ? 'bg-emerald-800 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText size={16} />
          <span>Tabel Data Pendaftar</span>
          <span className="ml-1 bg-emerald-950/40 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-mono">
            {list.length}
          </span>
        </button>

        <button
          onClick={() => setActiveMainTab('ANALYTICS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeMainTab === 'ANALYTICS'
              ? 'bg-emerald-800 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BarChart3 size={16} className="text-amber-400" />
          <span>Grafik & Analisis Survei SPMB</span>
          <span className="ml-1 bg-amber-400 text-amber-950 text-[10px] px-2 py-0.5 rounded-full font-bold">
            Analytics
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TABEL DATA PENDAFTAR */}
      {/* ========================================================================= */}
      {activeMainTab === 'LIST' && (
        <>
          {/* Filter & Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari nama, email, asal sekolah..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            {/* Filter Group */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
              {/* Program Filter */}
              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-300 bg-slate-50 text-slate-700 outline-none"
              >
                <option value="ALL">Semua Program</option>
                <option value="BOARDING">Boarding (Berasrama)</option>
                <option value="REGULER">Reguler (Full Day)</option>
              </select>

              {/* Status Filter Tabs */}
              {[
                { label: 'Semua Status', value: 'ALL' },
                { label: 'Daftar Tunggu', value: 'SUBMITTED' },
                { label: 'Berkas Lulus', value: 'VERIFIED' },
                { label: 'Lulus Seleksi', value: 'PASSED' },
                { label: 'Ditolak', value: 'REJECTED' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setStatusFilter(tab.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    statusFilter === tab.value 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase">
                    <th className="px-6 py-4">Nama & Email Calon Siswa</th>
                    <th className="px-6 py-4">Tanggal & Waktu Daftar</th>
                    <th className="px-6 py-4">Program Layanan</th>
                    <th className="px-6 py-4">Asal Sekolah</th>
                    <th className="px-6 py-4">Status Pendaftaran</th>
                    <th className="px-6 py-4">Pembayaran</th>
                    <th className="px-6 py-4 text-center">Survei & Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredList.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-slate-400">
                        Tidak ada data pendaftar yang cocok dengan pencarian / filter.
                      </td>
                    </tr>
                  ) : (
                    filteredList.map((reg) => (
                      <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">{reg.userName}</div>
                          <div className="text-slate-500 text-[11px]">{reg.userEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-slate-700 font-medium">
                          <div className="flex items-center gap-1.5 font-bold text-slate-800">
                            <Calendar size={13} className="text-emerald-600 shrink-0" />
                            <span>{formatDateTime(reg.createdAt)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {(reg.programType || 'BOARDING') === 'BOARDING' ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1">
                              <Building2 size={11} /> Boarding (Berasrama)
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300 inline-flex items-center gap-1">
                              <User size={11} /> Reguler (Full Day)
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-700">
                          {reg.previousSchool || '-'}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(reg.status)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                            reg.paymentStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : reg.paymentStatus === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {reg.paymentStatus === 'VERIFIED' ? 'Terverifikasi' : reg.paymentStatus === 'PENDING' ? 'Menunggu Verifikasi' : 'Belum Bayar'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {/* Detail Survey Button */}
                            <button
                              onClick={() => setSurveyDetailReg(reg)}
                              className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors flex items-center gap-1 font-bold text-[11px]"
                              title="Lihat Detail Survei & Alasan Memilih Sekolah"
                            >
                              <Eye size={14} /> Survei
                            </button>

                            {/* Action buttons based on status */}
                            {reg.status === 'SUBMITTED' && (
                              <>
                                <button 
                                  onClick={() => handleUpdateStatus(reg.id, 'VERIFIED')}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded text-[11px] font-bold transition-colors"
                                >
                                  Terima
                                </button>
                                <button 
                                  onClick={() => handleUpdateStatus(reg.id, 'REJECTED')}
                                  className="bg-red-100 hover:bg-red-200 text-red-700 px-2.5 py-1 rounded text-[11px] font-bold transition-colors"
                                >
                                  Tolak
                                </button>
                              </>
                            )}
                            {reg.status === 'VERIFIED' && (
                              <button 
                                onClick={() => handleUpdateStatus(reg.id, 'PASSED')}
                                className="bg-amber-500 hover:bg-amber-600 text-amber-950 px-2.5 py-1 rounded text-[11px] font-bold transition-colors"
                              >
                                Lulus
                              </button>
                            )}

                            {/* Edit Button */}
                            <button 
                              onClick={() => openEditModal(reg)}
                              className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                              title="Edit Data"
                            >
                              <Edit2 size={14} />
                            </button>

                            {/* Delete Button */}
                            <button 
                              onClick={() => handleDelete(reg.id, reg.userName)}
                              className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                              title="Hapus"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: GRAFIK & ANALISIS SURVEI SPMB */}
      {/* ========================================================================= */}
      {activeMainTab === 'ANALYTICS' && (
        <div className="space-y-6">
          {/* Interactive Filters Bar for Analytics */}
          <div className="bg-emerald-950 text-white p-5 rounded-3xl shadow-lg border border-emerald-800">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-3">
              <Filter size={16} /> Filter Analisis Grafik Survei SPMB
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {/* Program Filter */}
              <div>
                <label className="block text-emerald-200 font-semibold mb-1">Filter Program Layanan</label>
                <select
                  value={analyticsProgram}
                  onChange={(e) => setAnalyticsProgram(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-900 border border-emerald-700 text-white outline-none font-medium"
                >
                  <option value="ALL">Semua Program (Boarding & Reguler)</option>
                  <option value="BOARDING">Boarding School (Berasrama)</option>
                  <option value="REGULER">Program Reguler (Full Day)</option>
                </select>
              </div>

              {/* Source Filter */}
              <div>
                <label className="block text-emerald-200 font-semibold mb-1">Filter Sumber Informasi</label>
                <select
                  value={analyticsSource}
                  onChange={(e) => setAnalyticsSource(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-900 border border-emerald-700 text-white outline-none font-medium"
                >
                  <option value="ALL">Semua Saluran Informasi</option>
                  {knownSources.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-emerald-200 font-semibold mb-1">Filter Status Pendaftaran</label>
                <select
                  value={analyticsStatus}
                  onChange={(e) => setAnalyticsStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-900 border border-emerald-700 text-white outline-none font-medium"
                >
                  <option value="ALL">Semua Status Pendaftar</option>
                  <option value="SUBMITTED">Submitted (Daftar Tunggu)</option>
                  <option value="VERIFIED">Verified (Berkas Lulus)</option>
                  <option value="PASSED">Passed (Lulus Seleksi)</option>
                  <option value="REJECTED">Rejected (Ditolak)</option>
                  <option value="DRAFT">Draft</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-slate-500 text-xs font-bold block uppercase tracking-wider mb-1">Total Responden Survei</span>
              <div className="text-3xl font-extrabold text-slate-900">{totalAnalyticsCount}</div>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">Pendaftar Terfilter</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-slate-500 text-xs font-bold block uppercase tracking-wider mb-1">Minat Boarding School</span>
              <div className="text-3xl font-extrabold text-emerald-700">{boardingCount} <span className="text-sm text-slate-500 font-normal">({boardingPercent}%)</span></div>
              <p className="text-[11px] text-slate-500 mt-1">Berasrama 24 Jam</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-slate-500 text-xs font-bold block uppercase tracking-wider mb-1">Minat Program Reguler</span>
              <div className="text-3xl font-extrabold text-blue-700">{regulerCount} <span className="text-sm text-slate-500 font-normal">({regulerPercent}%)</span></div>
              <p className="text-[11px] text-slate-500 mt-1">Full Day (Non-Asrama)</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-slate-500 text-xs font-bold block uppercase tracking-wider mb-1">Saluran Terpopuler</span>
              <div className="text-base font-extrabold text-amber-700 truncate mt-1">
                {Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Instagram / Facebook'}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Penyumbang Pendaftar Terbanyak</p>
            </div>
          </div>

          {/* Graphics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Boarding vs Reguler Distribution */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-3 border-b">
                <div className="flex items-center gap-2">
                  <PieChart className="text-emerald-700" size={20} />
                  <h3 className="font-extrabold text-slate-800 text-base">Grafik Proporsi Program Layanan</h3>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                  Boarding vs Reguler
                </span>
              </div>

              {totalAnalyticsCount === 0 ? (
                <p className="text-center text-slate-400 py-12 text-xs">Tidak ada data untuk filter yang dipilih.</p>
              ) : (
                <div className="space-y-6">
                  {/* Progress visual bar */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-emerald-700">Boarding ({boardingCount} Siswa • {boardingPercent}%)</span>
                      <span className="text-blue-700">Reguler ({regulerCount} Siswa • {regulerPercent}%)</span>
                    </div>
                    <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden flex p-1 border border-slate-200">
                      <div 
                        style={{ width: `${boardingPercent}%` }} 
                        className="bg-emerald-600 h-full rounded-full transition-all duration-500 shadow-sm"
                      ></div>
                      <div 
                        style={{ width: `${regulerPercent}%` }} 
                        className="bg-blue-600 h-full rounded-full transition-all duration-500 shadow-sm"
                      ></div>
                    </div>
                  </div>

                  {/* Program Cards Breakdown */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                      <div className="font-bold text-emerald-900 text-sm mb-1 flex items-center gap-1.5">
                        <Building2 size={16} /> Boarding School
                      </div>
                      <p className="text-slate-600 text-[11px] mb-2">Pilihan Berasrama dengan pembinaan 24 jam.</p>
                      <div className="text-2xl font-extrabold text-emerald-800">{boardingCount} Pendaftar</div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                      <div className="font-bold text-blue-900 text-sm mb-1 flex items-center gap-1.5">
                        <User size={16} /> Program Reguler
                      </div>
                      <p className="text-slate-600 text-[11px] mb-2">Pilihan Full Day (Non-Asrama) pulang pergi.</p>
                      <div className="text-2xl font-extrabold text-blue-800">{regulerCount} Pendaftar</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chart 2: Marketing Source Channels */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-3 border-b">
                <div className="flex items-center gap-2">
                  <BarChart3 className="text-emerald-700" size={20} />
                  <h3 className="font-extrabold text-slate-800 text-base">Grafik Sumber Informasi SPMB</h3>
                </div>
                <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full">
                  Analisis Media
                </span>
              </div>

              {totalAnalyticsCount === 0 ? (
                <p className="text-center text-slate-400 py-12 text-xs">Tidak ada data untuk filter yang dipilih.</p>
              ) : (
                <div className="space-y-4">
                  {knownSources.map((source) => {
                    const count = sourceCounts[source] || 0;
                    const percent = totalAnalyticsCount > 0 ? Math.round((count / totalAnalyticsCount) * 100) : 0;

                    return (
                      <div key={source} className="text-xs">
                        <div className="flex justify-between font-semibold text-slate-700 mb-1">
                          <span className="truncate pr-2">{source}</span>
                          <span className="font-bold text-slate-900 shrink-0">{count} pendaftar ({percent}%)</span>
                        </div>
                        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                          <div
                            style={{ width: `${percent}%` }}
                            className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Student & Parent Quotes / Reasons list */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-3 border-b">
              <div className="flex items-center gap-2">
                <Sparkles className="text-amber-500" size={20} />
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base">Alasan Memilih SMA IT Andalas Cendekia</h3>
                  <p className="text-slate-500 text-xs">Daftar motivasi dan tanggapan asli dari calon orang tua / santri pendaftar.</p>
                </div>
              </div>
              <span className="text-xs bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-full">
                {analyticsList.filter(r => r.reasonToJoin).length} Respon Terisi
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analyticsList.filter(r => r.reasonToJoin).length === 0 ? (
                <div className="col-span-2 text-center py-10 text-slate-400 text-xs">
                  Belum ada catatan alasan memilih sekolah untuk filter ini.
                </div>
              ) : (
                analyticsList
                  .filter(r => r.reasonToJoin)
                  .map((reg) => (
                    <div key={reg.id} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">{reg.userName}</span>
                        {(reg.programType || 'BOARDING') === 'BOARDING' ? (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Boarding</span>
                        ) : (
                          <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Reguler</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700 italic bg-white p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                        "{reg.reasonToJoin}"
                      </p>
                      <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                        <span>Asal: {reg.previousSchool || '-'}</span>
                        <span className="text-emerald-700 font-medium">Info: {reg.infoSource || 'Social Media'}</span>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL DETAIL SURVEI SISWA */}
      {/* ========================================================================= */}
      {surveyDetailReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-200">
            <button 
              onClick={() => setSurveyDetailReg(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4 pb-3 border-b">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
                <HelpCircle size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Detail Survei Pendaftar</h3>
                <p className="text-xs text-slate-500">{surveyDetailReg.userName} ({surveyDetailReg.userEmail})</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border flex items-center justify-between">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-0.5">Tanggal & Waktu Pendaftaran</span>
                  <span className="font-bold text-emerald-800 text-xs flex items-center gap-1.5">
                    <Calendar size={14} className="text-emerald-600 shrink-0" />
                    {formatDateTime(surveyDetailReg.createdAt)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-0.5">Terakhir Diperbarui</span>
                  <span className="font-semibold text-slate-700 text-[11px]">
                    {formatDateTime(surveyDetailReg.updatedAt)}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border">
                <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Pilihan Program Layanan</span>
                {(surveyDetailReg.programType || 'BOARDING') === 'BOARDING' ? (
                  <span className="px-3 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800 text-xs inline-block">
                    Boarding School (Berasrama)
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full font-bold bg-blue-100 text-blue-800 text-xs inline-block">
                    Program Reguler (Full Day)
                  </span>
                )}
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border">
                <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Sumber Informasi SPMB</span>
                <span className="font-bold text-slate-800 text-xs">{surveyDetailReg.infoSource || 'Instagram / Facebook Official'}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border">
                <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Alasan Memilih SMA IT Andalas Cendekia</span>
                <p className="font-medium text-slate-800 text-xs leading-relaxed italic bg-white p-3 rounded-lg border border-slate-200 mt-1">
                  "{surveyDetailReg.reasonToJoin || 'Tidak diisi'}"
                </p>
              </div>

              <div className="pt-3 border-t flex justify-end">
                <button
                  onClick={() => setSurveyDetailReg(null)}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
                >
                  Tutup Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL TAMBAH PENDAFTAR BARU */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Tambah Pendaftar Baru</h3>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Lengkap Santri</label>
                <input 
                  type="text" 
                  required 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Muhammad Irfan"
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email Aktif</label>
                <input 
                  type="email" 
                  required 
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Contoh: irfan@gmail.com"
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Program Layanan</label>
                <select
                  value={newProgramType}
                  onChange={(e) => setNewProgramType(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500 font-bold text-slate-800"
                >
                  <option value="BOARDING">Boarding School (Berasrama)</option>
                  <option value="REGULER">Program Reguler (Full Day)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Sumber Info SPMB</label>
                <select
                  value={newInfoSource}
                  onChange={(e) => setNewInfoSource(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                >
                  {knownSources.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Alasan Memilih Sekolah</label>
                <textarea
                  rows={2}
                  value={newReasonToJoin}
                  onChange={(e) => setNewReasonToJoin(e.target.value)}
                  placeholder="Alasan singkat memilih sekolah..."
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Asal Sekolah (SMP/MTs)</label>
                <input 
                  type="text" 
                  value={newSchool}
                  onChange={(e) => setNewSchool(e.target.value)}
                  placeholder="Contoh: SMPN 1 Pulau Punjung"
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Status Pendaftaran</label>
                  <select 
                    value={newStatus} 
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="SUBMITTED">Submitted (Daftar Tunggu)</option>
                    <option value="VERIFIED">Verified (Berkas Lulus)</option>
                    <option value="PASSED">Passed (Lulus Seleksi)</option>
                    <option value="REJECTED">Rejected (Ditolak)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Status Pembayaran</label>
                  <select 
                    value={newPaymentStatus} 
                    onChange={(e) => setNewPaymentStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                  >
                    <option value="UNPAID">Belum Bayar</option>
                    <option value="PENDING">Menunggu Verifikasi</option>
                    <option value="VERIFIED">Sudah Diverifikasi</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL EDIT PENDAFTAR */}
      {/* ========================================================================= */}
      {editingReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setEditingReg(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-slate-800 mb-1">Edit Data Pendaftar</h3>
            <p className="text-slate-500 text-xs mb-4">{editingReg.userName} ({editingReg.userEmail})</p>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Program Layanan</label>
                <select 
                  value={editProgramType} 
                  onChange={(e) => setEditProgramType(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500 font-bold"
                >
                  <option value="BOARDING">Boarding School (Berasrama)</option>
                  <option value="REGULER">Program Reguler (Full Day)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Sumber Info SPMB</label>
                <select 
                  value={editInfoSource} 
                  onChange={(e) => setEditInfoSource(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                >
                  {knownSources.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Alasan Memilih Sekolah</label>
                <textarea 
                  rows={2}
                  value={editReasonToJoin} 
                  onChange={(e) => setEditReasonToJoin(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Asal Sekolah</label>
                <input 
                  type="text" 
                  value={editSchool}
                  onChange={(e) => setEditSchool(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Status Pendaftaran</label>
                <select 
                  value={editStatus} 
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="SUBMITTED">Submitted (Menunggu Verifikasi / Daftar Tunggu)</option>
                  <option value="VERIFIED">Verified (Berkas Lulus, Siap Tes)</option>
                  <option value="PASSED">Passed (Lulus Seleksi)</option>
                  <option value="REJECTED">Rejected (Ditolak / Perlu Perbaikan)</option>
                </select>
              </div>

              {editStatus === 'REJECTED' && (
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Alasan Penolakan / Catatan Perbaikan</label>
                  <textarea 
                    rows={3}
                    value={editReason}
                    onChange={(e) => setEditReason(e.target.value)}
                    placeholder="Contoh: Scan KK dan Rapor belum terbaca jelas..."
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                  ></textarea>
                </div>
              )}

              <div className="pt-4 border-t flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setEditingReg(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow"
                >
                  Update Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
