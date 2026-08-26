import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, FileText, CreditCard, Laptop } from 'lucide-react';

export default function SpmbHome() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Portal SPMB Online</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Sistem Penerimaan Murid Baru SMA IT Andalas Cendekia Tahun Ajaran 2026/2027.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Pendaftar Baru</h2>
            <p className="text-slate-600 mb-8">
              Silakan buat akun pendaftaran terlebih dahulu untuk memulai proses pendaftaran siswa baru.
            </p>
            <Link 
              to="/spmb/register" 
              className="w-full block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl transition-colors"
            >
              Buat Akun Pendaftaran
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Sudah Punya Akun?</h2>
            <p className="text-slate-600 mb-8">
              Masuk menggunakan Email dan Password yang telah didaftarkan untuk melengkapi data atau mengecek status.
            </p>
            <Link 
              to="/spmb/login" 
              className="w-full block text-center bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-medium py-3 rounded-xl transition-colors"
            >
              Login Calon Siswa / Admin
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Alur Pendaftaran SPMB</h2>
          
          <div className="grid md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-1/8 right-1/8 h-0.5 bg-emerald-100 -z-10 w-[75%] mx-auto"></div>
            
            <div className="text-center relative z-10">
              <div className="w-20 h-20 mx-auto bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-sm border-4 border-white">
                <Laptop size={32} />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">1. Registrasi Akun</h3>
              <p className="text-sm text-slate-600">Buat akun dengan email aktif dan isi formulir pendaftaran awal.</p>
            </div>
            
            <div className="text-center relative z-10">
              <div className="w-20 h-20 mx-auto bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-sm border-4 border-white">
                <FileText size={32} />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">2. Upload Berkas</h3>
              <p className="text-sm text-slate-600">Lengkapi data diri dan unggah scan KK, Akta, serta Rapor/SKL.</p>
            </div>
            
            <div className="text-center relative z-10">
              <div className="w-20 h-20 mx-auto bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-sm border-4 border-white">
                <CreditCard size={32} />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">3. Pembayaran</h3>
              <p className="text-sm text-slate-600">Lakukan pembayaran biaya seleksi dan unggah bukti transfer.</p>
            </div>
            
            <div className="text-center relative z-10">
              <div className="w-20 h-20 mx-auto bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-sm border-4 border-white">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">4. Seleksi & Hasil</h3>
              <p className="text-sm text-slate-600">Ikuti tes akademik/tahfidz lalu cek hasil kelulusan di dashboard.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
