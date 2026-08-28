import React, { useEffect, useState } from 'react';
import { getRegistrations, getUsers, updateRegistrationById, Registration } from '@/lib/storage';

interface CombinedReg extends Registration {
  userName: string;
  userEmail: string;
}

export default function AdminPayments() {
  const [list, setList] = useState<CombinedReg[]>([]);

  const loadData = () => {
    const regs = getRegistrations();
    const users = getUsers();
    const filtered = regs
      .filter((r) => ['PENDING', 'VERIFIED'].includes(r.paymentStatus))
      .map((r) => {
        const u = users.find((usr) => Number(usr.id) === Number(r.userId));
        return {
          ...r,
          userName: u ? u.name : 'Unknown',
          userEmail: u ? u.email : '-',
        };
      });
    setList(filtered);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('smait_data_synced', loadData);
    return () => {
      window.removeEventListener('smait_data_synced', loadData);
    };
  }, []);

  const handleVerify = (id: number) => {
    updateRegistrationById(id, { paymentStatus: 'VERIFIED' });
    loadData();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Verifikasi Pembayaran</h1>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm">
              <th className="px-6 py-4 font-medium text-slate-600">Pendaftar</th>
              <th className="px-6 py-4 font-medium text-slate-600">Bukti Transfer</th>
              <th className="px-6 py-4 font-medium text-slate-600">Status Pembayaran</th>
              <th className="px-6 py-4 font-medium text-slate-600">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {list.map((reg) => (
              <tr key={reg.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-800">{reg.userName}</div>
                  <div className="text-xs text-slate-500">{reg.userEmail}</div>
                </td>
                <td className="px-6 py-4">
                  {reg.paymentProofUrl ? (
                    <a href={reg.paymentProofUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium text-xs">Lihat Bukti Transfer</a>
                  ) : '-'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${reg.paymentStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {reg.paymentStatus === 'VERIFIED' ? 'Sudah Diverifikasi' : 'Menunggu Verifikasi'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {reg.paymentStatus === 'PENDING' && (
                    <button 
                      onClick={() => handleVerify(reg.id)}
                      className="text-xs bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded hover:bg-emerald-700 transition-colors"
                    >
                      Verifikasi Sekarang
                    </button>
                  )}
                  {reg.paymentStatus === 'VERIFIED' && (
                    <span className="text-xs text-emerald-600 font-medium">✓ Terverifikasi</span>
                  )}
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">Belum ada pembayaran yang perlu diverifikasi.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
