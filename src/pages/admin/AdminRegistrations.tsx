import React, { useEffect, useState } from 'react';
import { 
  getRegistrations, 
  getUsers, 
  updateRegistrationById, 
  deleteRegistrationById, 
  addRegistrationByAdmin, 
  saveUsers, 
  Registration 
} from '@/lib/storage';
import { Plus, Edit2, Trash2, Search, Filter, X, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface CombinedReg extends Registration {
  userName: string;
  userEmail: string;
}

export default function AdminRegistrations() {
  const [list, setList] = useState<CombinedReg[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  
  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingReg, setEditingReg] = useState<CombinedReg | null>(null);

  // Form States for Add
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newSchool, setNewSchool] = useState('');
  const [newNisn, setNewNisn] = useState('');
  const [newStatus, setNewStatus] = useState<Registration['status']>('SUBMITTED');
  const [newPaymentStatus, setNewPaymentStatus] = useState<Registration['paymentStatus']>('PENDING');

  // Form States for Edit
  const [editStatus, setEditStatus] = useState<Registration['status']>('DRAFT');
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
      status: newStatus,
      paymentStatus: newPaymentStatus,
    });
    setIsAddModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewSchool('');
    setNewNisn('');
    loadData();
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReg) return;

    updateRegistrationById(editingReg.id, {
      status: editStatus,
      previousSchool: editSchool,
      rejectionReason: editReason,
    });

    setEditingReg(null);
    loadData();
  };

  const openEditModal = (reg: CombinedReg) => {
    setEditingReg(reg);
    setEditStatus(reg.status);
    setEditSchool(reg.previousSchool || '');
    setEditReason(reg.rejectionReason || '');
  };

  // Filter & Search Logic
  const filteredList = list.filter((reg) => {
    const matchesSearch = 
      reg.userName.toLowerCase().includes(search.toLowerCase()) ||
      reg.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      (reg.previousSchool && reg.previousSchool.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || reg.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Registration['status']) => {
    switch (status) {
      case 'SUBMITTED':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 inline-flex items-center gap-1"><Clock size={12} /> Menunggu Verifikasi (Daftar Tunggu)</span>;
      case 'VERIFIED':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 inline-flex items-center gap-1"><CheckCircle size={12} /> Berkas Diverifikasi</span>;
      case 'PASSED':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1"><CheckCircle size={12} /> Lulus Seleksi</span>;
      case 'REJECTED':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200 inline-flex items-center gap-1"><AlertCircle size={12} /> Ditolak / Revisi</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">Draft (Belum Submit)</span>;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Manajemen Data Pendaftar</h1>
          <p className="text-slate-500 text-xs mt-1">Kelola data calon siswa, verifikasi berkas, daftar tunggu, dan status kelulusan SPMB.</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-full text-xs transition-all shadow flex items-center gap-2 shrink-0"
        >
          <Plus size={16} /> Tambah Data Pendaftar
        </button>
      </div>

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

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {[
            { label: 'Semua', value: 'ALL' },
            { label: 'Daftar Tunggu / Verifikasi', value: 'SUBMITTED' },
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
                <th className="px-6 py-4">Asal Sekolah (SMP/MTs)</th>
                <th className="px-6 py-4">Status Pendaftaran</th>
                <th className="px-6 py-4">Status Pembayaran</th>
                <th className="px-6 py-4 text-center">Aksi & Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredList.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{reg.userName}</div>
                    <div className="text-slate-500 text-[11px]">{reg.userEmail}</div>
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
                      {/* Action buttons based on status */}
                      {reg.status === 'SUBMITTED' && (
                        <>
                          <button 
                            onClick={() => handleUpdateStatus(reg.id, 'VERIFIED')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded text-[11px] font-bold transition-colors"
                          >
                            Terima Berkas
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
                          Lulus Tes
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
                        title="Hapus Data"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                    Tidak ada data pendaftar yang sesuai dengan pencarian / filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Pendaftar */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
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

      {/* Modal Edit Pendaftar */}
      {editingReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
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
