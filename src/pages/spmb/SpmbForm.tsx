import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getRegistrationByUserId, Registration, updateRegistration } from '@/lib/storage';
import { sendRegistrationEmail } from '@/lib/email';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function SpmbForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Registration>>({});
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/spmb/login');
      return;
    }
    const reg = getRegistrationByUserId(user.id);
    if (reg) {
      setFormData(reg);
      setIsReadOnly(!['DRAFT', 'REJECTED'].includes(reg.status));
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    const updatedReg = updateRegistration(user.id, {
      ...formData,
      status: 'SUBMITTED',
    });

    // Otomatis kirim email bukti pendaftaran
    await sendRegistrationEmail({
      toEmail: user.email,
      toName: user.name,
      subject: `Konfirmasi Formulir Pendaftaran SPMB - #${updatedReg.id}`,
      registrationData: updatedReg,
    });

    setIsSubmitting(false);
    navigate('/spmb/dashboard', { state: { emailSent: true } });
  };

  if (!user) return null;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Formulir Pendaftaran SPMB</h1>
              <p className="text-xs text-slate-500">SMA IT Andalas Cendekia • Tahun Ajaran 2026/2027</p>
            </div>

            <div className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full font-semibold border border-emerald-200">
              <Mail size={14} />
              <span>Email: {user.email}</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Data Diri */}
            <section>
              <h2 className="text-xl font-semibold text-slate-800 border-b pb-2 mb-4">Data Diri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">NISN</label>
                  <input type="text" name="nisn" value={formData.nisn || ''} onChange={handleChange} disabled={isReadOnly} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">NIK</label>
                  <input type="text" name="nik" value={formData.nik || ''} onChange={handleChange} disabled={isReadOnly} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Tempat Lahir</label>
                  <input type="text" name="birthPlace" value={formData.birthPlace || ''} onChange={handleChange} disabled={isReadOnly} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Tanggal Lahir</label>
                  <input type="date" name="birthDate" value={formData.birthDate || ''} onChange={handleChange} disabled={isReadOnly} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-100" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">Jenis Kelamin</label>
                  <select name="gender" value={formData.gender || ''} onChange={handleChange} disabled={isReadOnly} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-100">
                    <option value="">Pilih...</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">Alamat Lengkap</label>
                  <textarea name="address" value={formData.address || ''} onChange={handleChange} disabled={isReadOnly} required rows={3} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-100"></textarea>
                </div>
              </div>
            </section>

            {/* Data Orang Tua */}
            <section>
              <h2 className="text-xl font-semibold text-slate-800 border-b pb-2 mb-4">Data Orang Tua</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Nama Ayah</label>
                  <input type="text" name="fatherName" value={formData.fatherName || ''} onChange={handleChange} disabled={isReadOnly} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Nama Ibu</label>
                  <input type="text" name="motherName" value={formData.motherName || ''} onChange={handleChange} disabled={isReadOnly} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-100" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">No. WhatsApp Orang Tua</label>
                  <input type="tel" name="parentPhone" value={formData.parentPhone || ''} onChange={handleChange} disabled={isReadOnly} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-100" />
                </div>
              </div>
            </section>

            {/* Asal Sekolah */}
            <section>
              <h2 className="text-xl font-semibold text-slate-800 border-b pb-2 mb-4">Pendidikan Terakhir</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700">Asal Sekolah (SMP/MTs)</label>
                <input type="text" name="previousSchool" value={formData.previousSchool || ''} onChange={handleChange} disabled={isReadOnly} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-100" />
              </div>
            </section>

            {/* Program Layanan Sekolah */}
            <section>
              <h2 className="text-xl font-semibold text-slate-800 border-b pb-2 mb-4 flex items-center justify-between">
                <span>Pilihan Program Layanan</span>
                <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-bold">Wajib Dipilih</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  (formData.programType || 'BOARDING') === 'BOARDING' 
                    ? 'border-emerald-600 bg-emerald-50/60 shadow-sm' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}>
                  <div className="flex items-start gap-3">
                    <input 
                      type="radio" 
                      name="programType" 
                      value="BOARDING" 
                      checked={(formData.programType || 'BOARDING') === 'BOARDING'} 
                      onChange={handleChange} 
                      disabled={isReadOnly} 
                      className="mt-1 text-emerald-600 focus:ring-emerald-500" 
                    />
                    <div>
                      <span className="font-bold text-slate-900 text-sm block mb-0.5">Boarding School (Berasrama)</span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Program tinggal di asrama dengan pendampingan 24 jam, halaqah Tahfidz Al-Qur'an harian, & pengasuhan adab islami.
                      </p>
                    </div>
                  </div>
                </label>

                <label className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.programType === 'REGULER' 
                    ? 'border-emerald-600 bg-emerald-50/60 shadow-sm' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}>
                  <div className="flex items-start gap-3">
                    <input 
                      type="radio" 
                      name="programType" 
                      value="REGULER" 
                      checked={formData.programType === 'REGULER'} 
                      onChange={handleChange} 
                      disabled={isReadOnly} 
                      className="mt-1 text-emerald-600 focus:ring-emerald-500" 
                    />
                    <div>
                      <span className="font-bold text-slate-900 text-sm block mb-0.5">Program Reguler (Non-Asrama / Full Day)</span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Program pembelajaran tatap muka harian (Senin - Jumat 07.30 - 15.30 WIB) pulang pergi tanpa berasrama.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </section>

            {/* Survei Informasi & Alasan Memilih Sekolah */}
            <section className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 space-y-4">
              <h2 className="text-lg font-bold text-slate-800 border-b pb-2 flex items-center justify-between">
                <span>Survei SPMB & Alasan Memilih Sekolah</span>
                <span className="text-[11px] text-slate-500 font-normal italic">*Survei internal (Tidak tercetak di kartu bukti fisik)</span>
              </h2>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Darimana Anda mengetahui informasi SPMB SMA IT Andalas Cendekia?
                </label>
                <select 
                  name="infoSource" 
                  value={formData.infoSource || ''} 
                  onChange={handleChange} 
                  disabled={isReadOnly} 
                  required
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-100 text-sm bg-white"
                >
                  <option value="">-- Pilih Sumber Informasi --</option>
                  <option value="Instagram / Facebook Official">Instagram / Facebook Official</option>
                  <option value="Spanduk / Baliho / Banner">Spanduk / Baliho / Banner Jalan</option>
                  <option value="Brosur / Leaflet Informasi">Brosur / Leaflet Cetak</option>
                  <option value="Rekomendasi Alumni / Teman / Kerabat">Rekomendasi Alumni / Teman / Kerabat</option>
                  <option value="Sosialisasi Sekolah / Kunjungan Guru">Sosialisasi Sekolah / Kunjungan Guru SMP</option>
                  <option value="Website Official Sekolah">Website Official Sekolah</option>
                  <option value="Lain-lain">Lain-lain</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Apa alasan Anda memilih SMA IT Andalas Cendekia?
                </label>
                <textarea 
                  name="reasonToJoin" 
                  value={formData.reasonToJoin || ''} 
                  onChange={handleChange} 
                  disabled={isReadOnly} 
                  required
                  rows={3} 
                  placeholder="Contoh: Karena memiliki program unggulan Tahfidz Al-Qur'an 5-10 Juz, fasilitas digital modern, serta pembentukan karakter kepemimpinan Islam..." 
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-100 text-sm bg-white"
                ></textarea>
              </div>
            </section>

            {!isReadOnly && (
              <div className="pt-4 flex items-center justify-between">
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Mail size={14} className="text-emerald-600" />
                  Formulir pendaftaran akan otomatis dikirim ke <strong>{user.email}</strong>
                </p>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow disabled:opacity-50"
                >
                  {isSubmitting ? 'Mengirim & Memproses...' : 'Simpan & Submit Formulir'}
                </button>
              </div>
            )}
            {isReadOnly && (
              <div className="pt-4 text-center text-amber-800 bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs font-semibold">
                Formulir telah dikirim dan tidak dapat diubah (Status: {formData.status})
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
