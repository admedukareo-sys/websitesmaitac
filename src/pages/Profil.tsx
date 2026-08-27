import React, { useState, useEffect } from 'react';
import { BookOpen, Award, CheckCircle2, UserCheck, Shield, GraduationCap, Phone, Mail, MapPin, Calendar, Globe } from 'lucide-react';
import { getSiteSettings, getSiteTeachers, SiteSettings, TeacherItem } from '@/lib/storage';

export default function Profil() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [teacherList, setTeacherList] = useState<TeacherItem[]>([]);

  const loadData = () => {
    setSettings(getSiteSettings());
    const teachers = getSiteTeachers();
    setTeacherList(Array.isArray(teachers) ? teachers : []);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('smait_data_synced', loadData);
    return () => {
      window.removeEventListener('smait_data_synced', loadData);
    };
  }, []);

  const schoolName = settings?.schoolName || 'SMA IT Andalas Cendekia';
  const tagline = settings?.tagline || 'Sekolah Generasi Pemimpin Qur’ani';
  const visi = settings?.visi || 'Mewujudkan Siswa Generasi Pemimpin Qur’ani';
  const address = settings?.address || 'Jorong Ranah Lintas, Nagari Tebing Tinggi, Kec. Pulau Punjung, Kab. Dharmasraya, Prov. Sumatera Barat';
  const phone = settings?.phone || '0812-6655-8123';
  const email = settings?.email || 'smaitandalascendekia@gmail.com';
  const website = settings?.website || 'https://smait.andalascendekia.sch.id/';
  const principalName = settings?.principalName || 'Fadhilah Ikhtiarni, M.Pd.';
  const principalTitle = settings?.principalTitle || 'Kepala Sekolah SMA IT Andalas Cendekia';
  const principalMessage = settings?.principalMessage || "Assalamu'alaikum Warahmatullahi Wabarakatuh. Selamat datang di portal resmi SMA IT Andalas Cendekia. Kami berkomitmen menyelenggarakan pendidikan yang membekali pendidikan agama, adab dan akhlak mulia, kecakapan hidup kekinian, serta penguasaan sains dan teknologi untuk membentuk Generasi Pemimpin Qur'ani.";
  const principalPhoto = settings?.principalPhotoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80';
  const historyText = settings?.historyText || 'SMA IT Andalas Cendekia didirikan pada tanggal 5 Mei 2024 di Kabupaten Dharmasraya, Sumatera Barat. Lembaga ini hadir sebagai komitmen nyata untuk mencetak generasi pemimpin Qur\'ani yang berakhlak mulia, cerdas akademis, berwawasan global, dan siap bersaing di perguruan tinggi terkemuka.';

  const misiList = [
    'Menyelenggarakan pendidikan berbasis Al-Qur’an dan nilai-nilai Islam yang terintegrasi dengan kurikulum nasional.',
    'Membentuk karakter pemimpin Islami dengan menanamkan adab, akhlak mulia, dan nilai kepemimpinan.',
    'Mengembangkan potensi siswa melalui analisis komprehensif dan berkelanjutan.',
    'Menghadirkan pembelajaran inovatif berbasis teknologi untuk membekali keterampilan digital.',
    'Mengasah kemampuan bahasa asing dan keterampilan abad ke-21 untuk menghadapi persaingan global.',
    'Membangun sinergi dengan orang tua dan masyarakat dalam mendukung pendidikan siswa.',
    'Menyelenggarakan program pendampingan untuk mempersiapkan siswa menuju perguruan tinggi dan karier unggulan.'
  ];

  const tujuanList = [
    'Mewujudkan generasi pemimpin yang memiliki karakter Qur’ani dengan adab dan akhlak mulia sebagai landasan hidup.',
    'Menyediakan pendidikan yang mengintegrasikan nilai-nilai Islam dengan kurikulum nasional dan kekhasan sekolah untuk menghasilkan lulusan yang unggul secara akademik dan spiritual.',
    'Membentuk siswa yang percaya diri, berintegritas, dan memiliki kemampuan kepemimpinan Islami.',
    'Mengoptimalkan potensi siswa melalui evaluasi mendalam yang berkesinambungan, sehingga mereka berkembang sesuai bakat dan kemampuannya.',
    'Membekali siswa dengan keterampilan digital dan inovasi teknologi agar siap menghadapi tantangan di era modern.',
    'Meningkatkan kemampuan komunikasi dalam bahasa asing untuk memperluas wawasan global siswa.',
    'Membekali siswa dengan keterampilan abad ke-21 yang relevan untuk bersaing dalam dunia kerja global.',
    'Membangun kolaborasi yang harmonis antara sekolah, orang tua, dan masyarakat untuk menciptakan lingkungan belajar yang kondusif.',
    'Memberikan pendampingan dan motivasi bagi siswa untuk meraih cita-cita di perguruan tinggi dan karier masa depan yang gemilang.'
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-emerald-950 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <span className="inline-block bg-amber-500 text-amber-950 px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4 shadow">
            Profil Resmi Sekolah
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-3">{schoolName}</h1>
          <p className="text-amber-300 font-semibold text-lg italic mb-2">"{tagline}"</p>
          <p className="text-emerald-200 text-sm max-w-2xl mx-auto">
            {historyText}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-16">
        
        {/* Section 1: Identitas Sekolah Table */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/80">
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <GraduationCap size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">A. Identitas Sekolah</h2>
              <p className="text-xs text-slate-500">Data Pokok Kelembagaan {schoolName}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Nama Sekolah</span>
                <span className="font-bold text-slate-800">{schoolName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Jenjang Pendidikan</span>
                <span className="font-bold text-slate-800">Sekolah Menengah Atas (SMA)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Status Sekolah</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">Swasta</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Tanggal Pendirian</span>
                <span className="font-bold text-slate-800">5 Mei 2024</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Tagline / Branding</span>
                <span className="font-bold text-amber-600">{tagline}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium block mb-1">Alamat Lengkap</span>
                <span className="font-semibold text-slate-800 leading-relaxed block">
                  {address}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Nomor Telepon</span>
                <span className="font-bold text-slate-800">{phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Email Official</span>
                <span className="font-bold text-emerald-700">{email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Website Official</span>
                <span className="font-bold text-blue-600">{website}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Sambutan Kepala Sekolah */}
        <section className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white p-8 sm:p-10 rounded-3xl shadow-xl border border-emerald-800">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-32 h-32 bg-amber-500 rounded-2xl shrink-0 flex items-center justify-center overflow-hidden border-4 border-amber-400/50 shadow-lg">
              <img src={principalPhoto} alt={principalName} className="object-cover w-full h-full" />
            </div>
            <div>
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2 inline-block">Sambutan Kepala Sekolah</span>
              <h2 className="text-2xl font-bold mb-1 text-white">{principalName}</h2>
              <p className="text-xs font-semibold text-amber-300 mb-3">{principalTitle}</p>
              <p className="text-emerald-100 text-sm leading-relaxed italic mb-4">
                "{principalMessage}"
              </p>
              <div className="font-bold text-amber-400 text-xs">- {principalName}</div>
            </div>
          </div>
        </section>

        {/* Section 3: Visi, Misi, & Tujuan Sekolah */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Visi, Misi, & Tujuan Sekolah</h2>
            <p className="text-slate-600 text-sm">Landasan nilai dan arah pandang pendidikan di {schoolName}.</p>
          </div>

          {/* Visi */}
          <div className="bg-emerald-50 border-2 border-emerald-200 p-8 rounded-2xl mb-10 text-center">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-2">Visi Utama</span>
            <p className="text-xl sm:text-2xl font-extrabold text-emerald-950">
              "{visi}"
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Misi (7 Poin) */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b pb-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">M</span>
                Misi Sekolah (7 Poin Utama)
              </h3>
              <ul className="space-y-4">
                {misiList.map((misi, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{misi}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tujuan Sekolah (9 Poin) */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b pb-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500 text-amber-950 flex items-center justify-center text-sm font-bold">T</span>
                Tujuan Sekolah (9 Poin Utama)
              </h3>
              <ul className="space-y-3.5">
                {tujuanList.map((tujuan, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-slate-700">
                    <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{tujuan}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Data Kepemimpinan & Organisasi Sekolah */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-8 border-b pb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">C. Data Kepemimpinan & Tenaga Pendidik</h2>
              <p className="text-xs text-slate-500">Struktur Organisasi & Dewan Guru {schoolName}</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
              Tahun Ajaran 2026/2027
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
                  <th className="py-3.5 px-4">Nama Tenaga Pendidik</th>
                  <th className="py-3.5 px-4">Jabatan Struktural</th>
                  <th className="py-3.5 px-4">Mata Pelajaran / Bidang Tugas</th>
                  <th className="py-3.5 px-4 text-center">Strata</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {(Array.isArray(teacherList) ? teacherList : []).map((t, idx) => (
                  <tr key={t.id || idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{t.name}</td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-700">{t.role}</td>
                    <td className="py-3.5 px-4 text-slate-600">{t.mapel}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full font-mono font-bold text-[11px]">
                        {t.strata}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
