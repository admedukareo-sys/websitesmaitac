import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getRegistrationByUserId, Registration, updateRegistration } from '@/lib/storage';
import RegistrationCardModal from '@/components/RegistrationCardModal';
import { Mail, Printer, CheckCircle2 } from 'lucide-react';

export default function SpmbDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [showEmailNotice, setShowEmailNotice] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/spmb/login');
      return;
    }
    if (user.role === 'ADMIN') {
      navigate('/admin');
      return;
    }

    const reg = getRegistrationByUserId(user.id);
    if (!reg) {
      const newReg = updateRegistration(user.id, { status: 'DRAFT', paymentStatus: 'UNPAID' });
      setRegistration(newReg);
    } else {
      setRegistration(reg);
    }

    if (location.state && (location.state as any).emailSent) {
      setShowEmailNotice(true);
    }
  }, [user, navigate, location.state]);

  if (!user || !registration) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const statusColors = {
    DRAFT: 'bg-slate-100 text-slate-800',
    SUBMITTED: 'bg-blue-100 text-blue-800',
    VERIFIED: 'bg-emerald-100 text-emerald-800',
    REJECTED: 'bg-red-100 text-red-800',
    PASSED: 'bg-amber-100 text-amber-800',
    FAILED: 'bg-red-100 text-red-800',
    REGISTERED: 'bg-emerald-100 text-emerald-800',
  };

  const statusLabel = {
    DRAFT: 'Draft (Belum Submit)',
    SUBMITTED: 'Menunggu Verifikasi Berkas (Daftar Tunggu)',
    VERIFIED: 'Berkas Lulus, Siap Tes',
    REJECTED: 'Berkas Ditolak / Perlu Perbaikan',
    PASSED: 'Selamat! Lulus Seleksi',
    FAILED: 'Tidak Lulus',
    REGISTERED: 'Siswa Resmi Terdaftar',
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Email Sent Notification Notice */}
        {showEmailNotice && (
          <div className="mb-6 bg-emerald-600 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={24} className="text-amber-300 shrink-0" />
              <div>
                <h4 className="font-bold text-sm">Formulir Pendaftaran Berhasil Dikirim!</h4>
                <p className="text-xs text-emerald-100">Salinan bukti pendaftaran SPMB resmi telah otomatis dikirimkan ke email <strong>{user.email}</strong>.</p>
              </div>
            </div>
            <button 
              onClick={() => setShowEmailNotice(false)}
              className="text-emerald-200 hover:text-white text-xs font-bold px-2 py-1"
            >
              Tutup
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Dashboard Calon Siswa</h1>
            <p className="text-slate-600 text-sm mt-1">Selamat datang, <strong className="text-emerald-700">{user.name}</strong> ({user.email})</p>
          </div>

          {registration.status !== 'DRAFT' && (
            <button
              onClick={() => setIsCardModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-full transition-all shadow-md flex items-center gap-2 shrink-0"
            >
              <Mail size={16} />
              <span>Cetak / Kirim Formulir ke Email</span>
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Status Pendaftaran</h2>
            <div className={`inline-block px-4 py-2 rounded-full font-medium mb-4 text-xs ${statusColors[registration.status] || statusColors.DRAFT}`}>
              {statusLabel[registration.status] || registration.status}
            </div>
            
            {registration.status === 'DRAFT' && (
              <p className="text-slate-600 text-sm mb-4">
                Anda belum melengkapi formulir pendaftaran. Silakan isi data diri, data orang tua, dan asal sekolah.
              </p>
            )}

            {registration.status === 'SUBMITTED' && (
              <p className="text-slate-600 text-sm mb-4">
                Formulir Anda telah berhasil dikirim dan saat ini masuk ke daftar tunggu verifikasi panitia SPMB.
              </p>
            )}

            {registration.status === 'REJECTED' && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 text-xs">
                <p className="font-bold text-red-800">Alasan Penolakan / Catatan Perbaikan:</p>
                <p className="text-red-700 mt-1">{registration.rejectionReason || 'Berkas/data belum sesuai persyaratan'}</p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/spmb/dashboard/form" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition-colors shadow">
                {registration.status === 'DRAFT' || registration.status === 'REJECTED' ? 'Lengkapi Formulir' : 'Lihat Data Formulir'}
              </Link>

              {registration.status !== 'DRAFT' && (
                <button
                  onClick={() => setIsCardModalOpen(true)}
                  className="inline-flex items-center gap-1.5 border border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors"
                >
                  <Printer size={15} /> Cetak Bukti Pendaftaran
                </button>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Informasi Pembayaran</h2>
            <div className="mb-4">
              <span className="block text-xs text-slate-500 mb-1">Status Pembayaran Pendaftaran</span>
              <span className={`font-bold text-xs ${registration.paymentStatus === 'VERIFIED' ? 'text-emerald-600' : registration.paymentStatus === 'PENDING' ? 'text-amber-600' : 'text-slate-600'}`}>
                {registration.paymentStatus === 'UNPAID' ? 'Belum Bayar' : registration.paymentStatus === 'PENDING' ? 'Menunggu Verifikasi' : 'Sudah Diverifikasi'}
              </span>
            </div>
            {registration.paymentStatus === 'UNPAID' && (
              <Link to="/spmb/dashboard/payment" className="block text-center border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors">
                Upload Bukti Bayar
              </Link>
            )}
          </div>
        </div>

        {registration.status === 'PASSED' && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 text-center">
            <h2 className="text-2xl font-bold text-amber-800 mb-2">Selamat! Anda Lulus Seleksi 🎉</h2>
            <p className="text-amber-700 text-sm mb-6">Langkah selanjutnya adalah melakukan Daftar Ulang dan melengkapi data seragam.</p>
            <button 
              onClick={() => alert('Daftar ulang berhasil dikonfirmasi! Selamat bergabung di SMA IT Andalas Cendekia.')}
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm px-8 py-3 rounded-xl transition-colors shadow"
            >
              Proses Daftar Ulang
            </button>
          </div>
        )}

        {/* Modal Card Preview & Print */}
        <RegistrationCardModal 
          isOpen={isCardModalOpen}
          onClose={() => setIsCardModalOpen(false)}
          user={user}
          registration={registration}
        />

      </div>
    </div>
  );
}
