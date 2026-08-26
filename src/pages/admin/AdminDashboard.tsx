import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRegistrations, Registration } from '@/lib/storage';

export default function AdminDashboard() {
  const [regs, setRegs] = useState<Registration[]>([]);

  useEffect(() => {
    setRegs(getRegistrations());
  }, []);

  const totalRegs = regs.length;
  const submittedRegs = regs.filter((r) => r.status === 'SUBMITTED').length;
  const pendingPayments = regs.filter((r) => r.paymentStatus === 'PENDING').length;

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-slate-500 mb-2 font-medium">Total Pendaftar</div>
          <div className="text-4xl font-bold text-slate-800">{totalRegs}</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-slate-500 mb-2 font-medium">Menunggu Verifikasi Berkas</div>
          <div className="text-4xl font-bold text-amber-500">{submittedRegs}</div>
          <Link to="/admin/registrations" className="text-sm font-semibold text-emerald-600 hover:underline mt-4 inline-block">Lihat Pendaftar &rarr;</Link>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-slate-500 mb-2 font-medium">Menunggu Verifikasi Pembayaran</div>
          <div className="text-4xl font-bold text-blue-500">{pendingPayments}</div>
          <Link to="/admin/payments" className="text-sm font-semibold text-emerald-600 hover:underline mt-4 inline-block">Verifikasi Sekarang &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
