import React, { useState } from 'react';
import { Registration, User } from '@/lib/storage';
import { sendRegistrationEmail } from '@/lib/email';
import { X, Printer, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  registration: Registration;
}

export default function RegistrationCardModal({ isOpen, onClose, user, registration }: Props) {
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendEmail = async () => {
    setSendingEmail(true);
    setEmailStatus(null);

    const res = await sendRegistrationEmail({
      toEmail: user.email,
      toName: user.name,
      subject: `Formulir Pendaftaran SPMB SMA IT Andalas Cendekia - #${registration.id}`,
      registrationData: registration,
    });

    setSendingEmail(false);
    setEmailStatus(res.message);
    setTimeout(() => setEmailStatus(null), 6000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-slate-200">
        
        {/* Modal Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors print:hidden"
        >
          <X size={20} />
        </button>

        {/* Status Toast */}
        {emailStatus && (
          <div className="mb-6 bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 print:hidden">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span>{emailStatus}</span>
          </div>
        )}

        {/* Printable Card Header */}
        <div className="border-b-2 border-emerald-900 pb-6 mb-6 text-center">
          <img 
            src="/logo.png" 
            alt="Logo Official SMA IT Andalas Cendekia" 
            className="h-16 w-auto object-contain mx-auto mb-2"
          />
          <h2 className="text-2xl font-extrabold text-slate-900 uppercase">SMA IT ANDALAS CENDEKIA</h2>
          <p className="text-xs font-bold text-amber-600 italic mb-1">"Sekolah Generasi Pemimpin Qur’ani"</p>
          <p className="text-[11px] text-slate-500">
            Jorong Ranah Lintas, Nagari Tebing Tinggi, Pulau Punjung, Kab. Dharmasraya, Sumatera Barat | Telp: 0812-6655-8123
          </p>
        </div>

        {/* Title */}
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-center mb-6">
          <h3 className="text-base font-extrabold text-emerald-900">KARTU BUKTI PENDAFTARAN SPMB 2026/2027</h3>
          <p className="text-xs text-emerald-700 font-mono">No. Registrasi: #SPMB-{registration.id}</p>
        </div>

        {/* Data Summary Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs mb-8">
          <div className="space-y-2">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Nama Lengkap Santri</span>
              <span className="font-bold text-slate-900 text-sm">{user.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Email Registrasi</span>
              <span className="font-semibold text-slate-800">{user.email}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">NISN</span>
              <span className="font-semibold text-slate-800">{registration.nisn || '-'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">NIK</span>
              <span className="font-semibold text-slate-800">{registration.nik || '-'}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Asal Sekolah (SMP/MTs)</span>
              <span className="font-semibold text-slate-800">{registration.previousSchool || '-'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">No. HP Orang Tua</span>
              <span className="font-semibold text-slate-800">{registration.parentPhone || '-'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Status Berkas</span>
              <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px] inline-block">{registration.status}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Status Pembayaran</span>
              <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[11px] inline-block">{registration.paymentStatus}</span>
            </div>
          </div>
        </div>

        {/* Buttons (Hidden when printing) */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between gap-3 print:hidden">
          <button
            onClick={handleSendEmail}
            disabled={sendingEmail}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-full transition-colors flex items-center justify-center gap-2 shadow disabled:opacity-50"
          >
            <Mail size={16} />
            <span>{sendingEmail ? 'Mengirim ke Email...' : 'Kirim Formulir ke Email Saya'}</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-5 py-3 rounded-full transition-colors flex items-center justify-center gap-2 shadow"
            >
              <Printer size={16} />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-3 rounded-full transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
