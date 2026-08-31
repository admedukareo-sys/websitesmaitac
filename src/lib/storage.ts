import { api } from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'STUDENT' | 'ADMIN';
  password?: string;
}

export interface Registration {
  id: number;
  userId: number;
  nisn?: string;
  nik?: string;
  birthPlace?: string;
  birthDate?: string;
  gender?: string;
  address?: string;
  fatherName?: string;
  motherName?: string;
  parentPhone?: string;
  previousSchool?: string;
  status: 'DRAFT' | 'SUBMITTED' | 'VERIFIED' | 'REJECTED' | 'PASSED' | 'FAILED' | 'REGISTERED';
  rejectionReason?: string;
  aktaUrl?: string;
  kkUrl?: string;
  fotoUrl?: string;
  raporUrl?: string;
  paymentProofUrl?: string;
  paymentStatus: 'UNPAID' | 'PENDING' | 'VERIFIED';
  testScore?: number;
  interviewNotes?: string;
  reRegistrationProofUrl?: string;
  uniformSize?: string;
  programType?: 'BOARDING' | 'REGULER';
  infoSource?: string;
  reasonToJoin?: string;
  createdAt: string;
  updatedAt: string;
}

export function formatDateTime(isoString?: string): string {
  if (!isoString) return '-';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    const formatted = d.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return `${formatted.replace('.', ':')} WIB`;
  } catch (e) {
    return isoString;
  }
}

export interface SiteSettings {
  schoolName: string;
  tagline: string;
  visi: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  npsn: string;
  accreditation: string;
  videoUrl: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  principalName?: string;
  principalTitle?: string;
  principalMessage?: string;
  principalPhotoUrl?: string;
  historyText?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  category: 'Berita Terkini' | 'Kegiatan Sekolah' | 'Prestasi' | 'Galeri';
  date: string;
  author: string;
  commentsCount: number;
  imageUrl: string;
  excerpt: string;
  content: string;
}

export interface EventItem {
  id: number;
  day: string;
  month: string;
  title: string;
  time: string;
  location: string;
  category: string;
  description: string;
  organizer: string;
}

export interface SlideItem {
  id: number;
  badge: string;
  title: string;
  description: string;
  imageUrl: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export interface FacilityItem {
  id: number;
  title: string;
  category: 'Akademik' | 'Keagamaan' | 'Teknologi' | 'Olahraga & Terbuka';
  description: string;
  imageUrl: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  rating: number;
  quote: string;
  avatarUrl: string;
  timeAgo?: string;
}

export interface ActivityAchievementItem {
  id: number;
  title: string;
  type: 'Prestasi' | 'Aktivitas Kesiswaan' | 'Ekstrakurikuler';
  category: string;
  date: string;
  studentName: string;
  achievementBadge: string;
  description: string;
  imageUrl: string;
}

export interface CurriculumTahfidzItem {
  id: number;
  title: string;
  type: 'Program Tahfidz' | 'Program Kurikulum' | 'Profil Lulusan';
  target: string;
  description: string;
  badgeColor?: string;
}

export interface TeacherItem {
  id: number;
  name: string;
  role: string;
  mapel: string;
  strata: string;
  photoUrl?: string;
}

const STORAGE_KEYS = {
  USERS: 'smait_users',
  REGISTRATIONS: 'smait_registrations',
  CURRENT_USER: 'smait_current_user',
  SITE_SETTINGS: 'smait_site_settings',
  SITE_NEWS: 'smait_site_news',
  SITE_EVENTS: 'smait_site_events',
  SITE_SLIDES: 'smait_site_slides',
  SITE_FACILITIES: 'smait_site_facilities',
  SITE_TESTIMONIALS: 'smait_site_testimonials',
  SITE_ACTIVITIES: 'smait_site_activities',
  SITE_CURRICULUM: 'smait_site_curriculum',
  SITE_TEACHERS: 'smait_site_teachers',
};

// Seed initial data if empty
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const initialUsers: User[] = [
      {
        id: 1,
        name: 'Administrator SPMB',
        email: 'admin@smait.sch.id',
        role: 'ADMIN',
        password: 'admin',
      },
      {
        id: 2,
        name: 'Ahmad Zaki',
        email: 'zaki@gmail.com',
        role: 'STUDENT',
        password: 'password123',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.REGISTRATIONS)) {
    const initialRegistrations: Registration[] = [
      {
        id: 1,
        userId: 2,
        nisn: '0051234567',
        nik: '1371012304050001',
        birthPlace: 'Pulau Punjung',
        birthDate: '2008-05-14',
        gender: 'L',
        address: 'Jorong Ranah Lintas, Dharmasraya',
        fatherName: 'Budi Santoso',
        motherName: 'Siti Aminah',
        parentPhone: '081266778899',
        previousSchool: 'SMP Negeri 1 Pulau Punjung',
        status: 'SUBMITTED',
        paymentStatus: 'PENDING',
        paymentProofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
        programType: 'BOARDING',
        infoSource: 'Instagram / Facebook Official',
        reasonToJoin: 'Ingin fokus mendalami program Tahfidz Al-Qur\'an 10 Juz serta pembentukan karakter kepemimpinan Islam.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(initialRegistrations));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SITE_SETTINGS)) {
    const defaultSettings: SiteSettings = {
      schoolName: 'SMA IT Andalas Cendekia',
      tagline: 'Sekolah Generasi Pemimpin Qur’ani',
      visi: 'Mewujudkan Siswa Generasi Pemimpin Qur’ani',
      address: 'Jorong Ranah Lintas, Nagari Tebing Tinggi, Kec. Pulau Punjung, Kab. Dharmasraya, Prov. Sumatera Barat',
      phone: '0812-6655-8123',
      email: 'smaitandalascendekia@gmail.com',
      website: 'https://smait.andalascendekia.sch.id/',
      npsn: '20104766',
      accreditation: 'Akreditasi A',
      videoUrl: 'https://www.youtube.com/embed/9E09XrFAi_s?autoplay=1',
      facebookUrl: 'https://facebook.com',
      instagramUrl: 'https://instagram.com',
      youtubeUrl: 'https://youtube.com',
      principalName: 'Fadhilah Ikhtiarni, M.Pd.',
      principalTitle: 'Kepala Sekolah SMA IT Andalas Cendekia',
      principalMessage: 'Assalamu\'alaikum Warahmatullahi Wabarakatuh. Selamat datang di portal resmi SMA IT Andalas Cendekia. Kami berkomitmen menyelenggarakan pendidikan yang membekali pendidikan agama, adab dan akhlak mulia, kecakapan hidup kekinian, serta penguasaan sains dan teknologi untuk membentuk Generasi Pemimpin Qur\'ani.',
      principalPhotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      historyText: 'SMA IT Andalas Cendekia didirikan pada tanggal 5 Mei 2024 di Kabupaten Dharmasraya, Sumatera Barat. Lembaga ini hadir sebagai komitmen nyata untuk mencetak generasi pemimpin Qur\'ani yang berakhlak mulia, cerdas akademis, berwawasan global, dan siap bersaing di perguruan tinggi terkemuka.',
    };
    localStorage.setItem(STORAGE_KEYS.SITE_SETTINGS, JSON.stringify(defaultSettings));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SITE_NEWS)) {
    const defaultNews: NewsItem[] = [
      {
        id: 1,
        title: 'Siswa SMA IT Andalas Cendekia Raih Juara 1 Olimpiade Sains & IT Nasional 2026',
        category: 'Prestasi',
        date: '23/04/2026',
        author: 'Tim Humas',
        commentsCount: 12,
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
        excerpt: 'Delegasi SMA IT Andalas Cendekia kembali menorehkan prestasi gemilang dengan menjuarai kompetisi karya ilmiah dan aplikasi IT tingkat nasional.',
        content: 'Pada ajang Olimpiade Sains dan IT tingkat nasional yang diselenggarakan di Jakarta, tim siswa SMA IT Andalas Cendekia berhasil meraih Medali Emas Juara 1 dalam kategori Inovasi Aplikasi Edukasi Islami Berbasis AI. Kepala Sekolah memberikan apresiasi setinggi-tingginya atas perjuangan para siswa dan guru pendamping.',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.SITE_NEWS, JSON.stringify(defaultNews));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SITE_EVENTS)) {
    const defaultEvents: EventItem[] = [
      {
        id: 1,
        day: '15',
        month: 'OKT',
        title: 'Camp Tahfidz Intensif & Sertifikasi Hafalan 2026',
        time: '08:00 WIB – Selesai',
        location: 'Masjid & Camp Hall SMA IT',
        category: 'Keagamaan & Tahfidz',
        description: 'Kegiatan karantina dan murojaah hafalan intensif bagi seluruh calon wisudawan Tahfidz angkatan 2026/2027.',
        organizer: 'Panitia Tahfidz & Musyrif',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.SITE_EVENTS, JSON.stringify(defaultEvents));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SITE_SLIDES)) {
    const defaultSlides: SlideItem[] = [
      {
        id: 1,
        badge: 'Penerimaan Siswa Baru 2026/2027 Telah Dibuka',
        title: 'Membentuk Generasi Qurani, Cerdas, dan Berprestasi',
        description: 'SMA IT Andalas Cendekia memadukan kurikulum nasional dan keislaman untuk mencetak pemimpin masa depan yang berakhlak mulia dan berwawasan global.',
        imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80',
        primaryCtaText: 'Daftar SPMB Sekarang',
        primaryCtaLink: '/spmb',
        secondaryCtaText: 'Pelajari Lebih Lanjut',
        secondaryCtaLink: '/profil',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.SITE_SLIDES, JSON.stringify(defaultSlides));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SITE_FACILITIES)) {
    const defaultFacilities: FacilityItem[] = [
      {
        id: 1,
        title: 'Smart Classroom Interaktif',
        category: 'Akademik',
        description: 'Ruang kelas dilengkapi pendingin udara, layar sentuh digital interaktif, dan sound system pendukung.',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.SITE_FACILITIES, JSON.stringify(defaultFacilities));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SITE_TESTIMONIALS)) {
    const defaultTestimonials: TestimonialItem[] = [
      {
        id: 1,
        name: 'Dr. H. Hendra Wijaya, M.Si.',
        role: 'Orang Tua Siswa Kelas XI',
        rating: 5,
        quote: 'Alhamdulillah, perkembangan hafalan Al-Qur\'an dan kedisiplinan anak saya meningkat drastis semenjak bersekolah di SMA IT Andalas Cendekia.',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.SITE_TESTIMONIALS, JSON.stringify(defaultTestimonials));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SITE_ACTIVITIES)) {
    const defaultActivities: ActivityAchievementItem[] = [
      {
        id: 1,
        title: 'Juara 1 Medali Emas Olimpiade IT & AI Nasional 2026',
        type: 'Prestasi',
        category: 'Tingkat Nasional',
        date: '2026',
        studentName: 'Tim Robotik & Coding SMA IT',
        achievementBadge: 'Juara 1 Emas',
        description: 'Meraih penghargaan tertinggi pada kategori pengembangan aplikasi kecerdasan buatan untuk pendidikan Al-Qur\'an.',
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.SITE_ACTIVITIES, JSON.stringify(defaultActivities));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SITE_CURRICULUM)) {
    const defaultCurriculum: CurriculumTahfidzItem[] = [
      {
        id: 1,
        title: 'Program Hafalan Tahfidz Al-Qur\'an Intensif',
        type: 'Program Tahfidz',
        target: 'Target 5 - 10 Juz Mutqin',
        description: 'Setoran halaqah harian bersama musyrif/musyrifah, karantina murojaah, dan wisuda sertifikasi Tahfidz.',
        badgeColor: 'bg-emerald-600',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.SITE_CURRICULUM, JSON.stringify(defaultCurriculum));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SITE_TEACHERS)) {
    const defaultTeachers: TeacherItem[] = [
      { id: 1, name: 'Fadhilah Ikhtiarni, M.Pd.', role: 'Kepala Sekolah', mapel: 'Manajerial & Kepemimpinan', strata: 'S2' },
      { id: 2, name: 'Novrika mawarni, S.Pd.', role: 'Waka Kurikulum', mapel: 'Biologi, Kimia, B. Inggris, Mentoring Qur\'anic Leader', strata: 'S1' },
      { id: 3, name: 'Sherly Mairiyasti L., S.Pd.', role: 'Waka Kesiswaan', mapel: 'Ekonomi, Sejarah, Geografi, Sosiologi', strata: 'S1' },
      { id: 4, name: 'Rayun Sucinda, M.Pd.', role: 'Waka Sarpras', mapel: 'Adab & Al-Qur\'an, Pendidikan Pancasila', strata: 'S2' },
      { id: 5, name: 'Yuyun Rahmanita, S.Kom.', role: 'Tata Usaha / Administrasi', mapel: 'Sistem Informasi & Administrasi', strata: 'S1' },
      { id: 6, name: 'Vivi Safitri, S.Pd.', role: 'Guru Bidang Studi', mapel: 'Bahasa Indonesia', strata: 'S1' },
      { id: 7, name: 'Ade Pahmi Paizal, S.T', role: 'Guru Bidang Studi', mapel: 'Informatika & Komputer', strata: 'S1' },
      { id: 8, name: 'Febri Uljapi, S.Hum', role: 'Guru Bidang Studi', mapel: 'Bahasa Arab, Akidah, Fiqh, Sejarah Peradaban Islam', strata: 'S1' },
      { id: 9, name: 'St. Irvan Charis, S.Pd.', role: 'Guru Bidang Studi', mapel: 'PJOK (Pendidikan Jasmani Olahraga)', strata: 'S1' },
      { id: 10, name: 'Dela Oktavia H., S.Pd.', role: 'Guru Bidang Studi', mapel: 'Bimbingan Konseling (BK)', strata: 'S1' },
    ];
    localStorage.setItem(STORAGE_KEYS.SITE_TEACHERS, JSON.stringify(defaultTeachers));
  }
}

export function getUsers(): User[] {
  initializeStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
}

export function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export function getRegistrations(): Registration[] {
  initializeStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTRATIONS) || '[]');
}

export function saveRegistrations(regs: Registration[]) {
  localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(regs));
}

export function getRegistrationByUserId(userId: number): Registration | null {
  const regs = getRegistrations();
  return regs.find((r) => Number(r.userId) === Number(userId)) || null;
}

export function getCurrentUser(): User | null {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user: User | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

export function updateRegistration(userId: number, updates: Partial<Registration>): Registration {
  const regs = getRegistrations();
  let index = regs.findIndex((r) => Number(r.userId) === Number(userId));
  let updatedReg: Registration;
  
  if (index === -1) {
    updatedReg = {
      id: Date.now(),
      userId,
      status: 'DRAFT',
      paymentStatus: 'UNPAID',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...updates,
    };
    regs.push(updatedReg);
  } else {
    updatedReg = {
      ...regs[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    regs[index] = updatedReg;
  }
  saveRegistrations(regs);
  api.saveRegistration(updatedReg);
  return updatedReg;
}

export function updateRegistrationById(id: number, updates: Partial<Registration>): Registration | null {
  const regs = getRegistrations();
  const index = regs.findIndex((r) => Number(r.id) === Number(id));
  if (index !== -1) {
    regs[index] = {
      ...regs[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveRegistrations(regs);
    api.saveRegistration(regs[index]);
    return regs[index];
  }
  return null;
}

export function deleteRegistrationById(id: number) {
  const regs = getRegistrations();
  const filtered = regs.filter((r) => Number(r.id) !== Number(id));
  saveRegistrations(filtered);
  api.deleteRegistration?.(id);
}

export function addRegistrationByAdmin(data: {
  name: string;
  email: string;
  previousSchool?: string;
  nisn?: string;
  programType?: 'BOARDING' | 'REGULER';
  infoSource?: string;
  reasonToJoin?: string;
  status: Registration['status'];
  paymentStatus: Registration['paymentStatus'];
}) {
  const users = getUsers();
  let existingUser = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
  let userId = existingUser ? existingUser.id : Date.now();

  if (!existingUser) {
    existingUser = {
      id: userId,
      name: data.name,
      email: data.email,
      role: 'STUDENT',
      password: 'password123',
    };
    users.push(existingUser);
    saveUsers(users);
    api.saveUser(existingUser);
  }

  const regs = getRegistrations();
  const newReg: Registration = {
    id: Date.now(),
    userId,
    nisn: data.nisn || '',
    previousSchool: data.previousSchool || '',
    programType: data.programType || 'BOARDING',
    infoSource: data.infoSource || 'Instagram / Facebook Official',
    reasonToJoin: data.reasonToJoin || '',
    status: data.status,
    paymentStatus: data.paymentStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  regs.push(newReg);
  saveRegistrations(regs);
  api.saveRegistration(newReg);
  return newReg;
}

// Helper to strip unwanted API update tags from strings and objects
export function stripSupabaseTag<T>(value: T): T {
  if (typeof value === 'string') {
    return value
      .replace(/\s*\(\s*Updated via Supabase API.*?\)/gi, '')
      .replace(/\s*\(\s*Updated via.*?\)/gi, '')
      .replace(/\s*Updated via Supabase API.*/gi, '')
      .trim() as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => stripSupabaseTag(item)) as unknown as T;
  }
  if (value !== null && typeof value === 'object') {
    const cleaned: Record<string, any> = {};
    for (const key of Object.keys(value)) {
      cleaned[key] = stripSupabaseTag((value as Record<string, any>)[key]);
    }
    return cleaned as unknown as T;
  }
  return value;
}

// Site Content CMS Helpers
export function getSiteSettings(): SiteSettings {
  initializeStorage();
  let data: any = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SITE_SETTINGS);
    if (raw) data = JSON.parse(raw);
  } catch (e) {
    data = {};
  }
  return stripSupabaseTag({
    schoolName: data.schoolName || data.school_name || 'SMA IT Andalas Cendekia',
    tagline: data.tagline || 'Sekolah Generasi Pemimpin Qur’ani',
    visi: data.visi || 'Mewujudkan Siswa Generasi Pemimpin Qur’ani',
    address: data.address || 'Jorong Ranah Lintas, Nagari Tebing Tinggi, Kec. Pulau Punjung, Kab. Dharmasraya, Prov. Sumatera Barat',
    phone: data.phone || '0812-6655-8123',
    email: data.email || 'smaitandalascendekia@gmail.com',
    website: data.website || 'https://smait.andalascendekia.sch.id/',
    npsn: data.npsn || '20104766',
    accreditation: data.accreditation || 'Akreditasi A',
    videoUrl: data.videoUrl || data.video_url || 'https://www.youtube.com/embed/9E09XrFAi_s?autoplay=1',
    facebookUrl: data.facebookUrl || data.facebook_url || 'https://facebook.com',
    instagramUrl: data.instagramUrl || data.instagram_url || 'https://instagram.com',
    youtubeUrl: data.youtubeUrl || data.youtube_url || 'https://youtube.com',
    principalName: data.principalName || data.principal_name || 'Fadhilah Ikhtiarni, M.Pd.',
    principalTitle: data.principalTitle || data.principal_title || 'Kepala Sekolah SMA IT Andalas Cendekia',
    principalMessage: data.principalMessage || data.principal_message || "Assalamu'alaikum Warahmatullahi Wabarakatuh. Selamat datang di portal resmi SMA IT Andalas Cendekia. Kami berkomitmen menyelenggarakan pendidikan yang membekali pendidikan agama, adab dan akhlak mulia, kecakapan hidup kekinian, serta penguasaan sains dan teknologi untuk membentuk Generasi Pemimpin Qur'ani.",
    principalPhotoUrl: data.principalPhotoUrl || data.principal_photo_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    historyText: data.historyText || data.history_text || 'SMA IT Andalas Cendekia didirikan pada tanggal 5 Mei 2024 di Kabupaten Dharmasraya, Sumatera Barat. Lembaga ini hadir sebagai komitmen nyata untuk mencetak generasi pemimpin Qur\'ani yang berakhlak mulia, cerdas akademis, berwawasan global, dan siap bersaing di perguruan tinggi terkemuka.',
  });
}

export function saveSiteSettings(settings: SiteSettings) {
  const cleaned = stripSupabaseTag(settings);
  localStorage.setItem(STORAGE_KEYS.SITE_SETTINGS, JSON.stringify(cleaned));
  api.saveSettings(cleaned);
}

export function getSiteNews(): NewsItem[] {
  initializeStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SITE_NEWS);
    const data = raw ? JSON.parse(raw) : [];
    return stripSupabaseTag(Array.isArray(data) ? data : []);
  } catch (e) {
    return [];
  }
}

export function saveSiteNews(news: NewsItem[]) {
  localStorage.setItem(STORAGE_KEYS.SITE_NEWS, JSON.stringify(news));
  api.saveNews?.(news);
}

export function getSiteEvents(): EventItem[] {
  initializeStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SITE_EVENTS);
    const data = raw ? JSON.parse(raw) : [];
    return stripSupabaseTag(Array.isArray(data) ? data : []);
  } catch (e) {
    return [];
  }
}

export function saveSiteEvents(events: EventItem[]) {
  const cleaned = stripSupabaseTag(events);
  localStorage.setItem(STORAGE_KEYS.SITE_EVENTS, JSON.stringify(cleaned));
  api.saveEvents?.(cleaned);
}

export function getSiteSlides(): SlideItem[] {
  initializeStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SITE_SLIDES);
    const data = raw ? JSON.parse(raw) : [];
    return stripSupabaseTag(Array.isArray(data) ? data : []);
  } catch (e) {
    return [];
  }
}

export function saveSiteSlides(slides: SlideItem[]) {
  const cleaned = stripSupabaseTag(slides);
  localStorage.setItem(STORAGE_KEYS.SITE_SLIDES, JSON.stringify(cleaned));
  api.saveSlides?.(cleaned);
}

export function getSiteFacilities(): FacilityItem[] {
  initializeStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SITE_FACILITIES);
    const data = raw ? JSON.parse(raw) : [];
    return stripSupabaseTag(Array.isArray(data) ? data : []);
  } catch (e) {
    return [];
  }
}

export function saveSiteFacilities(facilities: FacilityItem[]) {
  const cleaned = stripSupabaseTag(facilities);
  localStorage.setItem(STORAGE_KEYS.SITE_FACILITIES, JSON.stringify(cleaned));
  api.saveFacilities?.(cleaned);
}

export function getSiteTestimonials(): TestimonialItem[] {
  initializeStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SITE_TESTIMONIALS);
    const data = raw ? JSON.parse(raw) : [];
    return stripSupabaseTag(Array.isArray(data) ? data : []);
  } catch (e) {
    return [];
  }
}

export function saveSiteTestimonials(testimonials: TestimonialItem[]) {
  const cleaned = stripSupabaseTag(testimonials);
  localStorage.setItem(STORAGE_KEYS.SITE_TESTIMONIALS, JSON.stringify(cleaned));
  api.saveTestimonials?.(cleaned);
}

export function getSiteActivities(): ActivityAchievementItem[] {
  initializeStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SITE_ACTIVITIES);
    const data = raw ? JSON.parse(raw) : [];
    return stripSupabaseTag(Array.isArray(data) ? data : []);
  } catch (e) {
    return [];
  }
}

export function saveSiteActivities(activities: ActivityAchievementItem[]) {
  const cleaned = stripSupabaseTag(activities);
  localStorage.setItem(STORAGE_KEYS.SITE_ACTIVITIES, JSON.stringify(cleaned));
  api.saveActivities?.(cleaned);
}

export function getSiteCurriculum(): CurriculumTahfidzItem[] {
  initializeStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SITE_CURRICULUM);
    const data = raw ? JSON.parse(raw) : [];
    return stripSupabaseTag(Array.isArray(data) ? data : []);
  } catch (e) {
    return [];
  }
}

export function saveSiteCurriculum(curriculum: CurriculumTahfidzItem[]) {
  const cleaned = stripSupabaseTag(curriculum);
  localStorage.setItem(STORAGE_KEYS.SITE_CURRICULUM, JSON.stringify(cleaned));
  api.saveCurriculum?.(cleaned);
}

export function getSiteTeachers(): TeacherItem[] {
  initializeStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SITE_TEACHERS);
    const data = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(data)) return [];
    return stripSupabaseTag(data.map((t: any, idx: number) => ({
      id: t.id || idx + 1,
      name: t.name || '',
      role: t.role || '',
      mapel: t.mapel || '',
      strata: t.strata || 'S1',
      photoUrl: t.photoUrl || t.photo_url || '',
    })));
  } catch (e) {
    return [];
  }
}

export function saveSiteTeachers(teachers: TeacherItem[]) {
  localStorage.setItem(STORAGE_KEYS.SITE_TEACHERS, JSON.stringify(teachers));
  api.saveTeachers?.(teachers);
}

export async function syncWithBackend() {
  try {
    let updated = false;

    // 1. Sync Settings
    const settings = await api.getSettings();
    if (settings && typeof settings === 'object' && Object.keys(settings).length > 0) {
      const current = getSiteSettings();
      const normalizedSettings: SiteSettings = stripSupabaseTag({
        schoolName: settings.schoolName || settings.school_name || current.schoolName,
        tagline: settings.tagline || current.tagline,
        visi: settings.visi || current.visi,
        address: settings.address || current.address,
        phone: settings.phone || current.phone,
        email: settings.email || current.email,
        website: settings.website || current.website,
        npsn: settings.npsn || current.npsn,
        accreditation: settings.accreditation || current.accreditation,
        videoUrl: settings.videoUrl || settings.video_url || current.videoUrl,
        facebookUrl: settings.facebookUrl || settings.facebook_url || current.facebookUrl,
        instagramUrl: settings.instagramUrl || settings.instagram_url || current.instagramUrl,
        youtubeUrl: settings.youtubeUrl || settings.youtube_url || current.youtubeUrl,
        principalName: settings.principalName || settings.principal_name || current.principalName,
        principalTitle: settings.principalTitle || settings.principal_title || current.principalTitle,
        principalMessage: settings.principalMessage || settings.principal_message || current.principalMessage,
        principalPhotoUrl: settings.principalPhotoUrl || settings.principal_photo_url || current.principalPhotoUrl,
        historyText: settings.historyText || settings.history_text || current.historyText,
      });
      localStorage.setItem(STORAGE_KEYS.SITE_SETTINGS, JSON.stringify(normalizedSettings));
      updated = true;
    }

    // 2. Sync Teachers
    const teachers = await api.getTeachers();
    if (teachers && Array.isArray(teachers) && teachers.length > 0) {
      const normalizedTeachers = stripSupabaseTag(teachers.map((t: any, idx: number) => ({
        id: t.id || idx + 1,
        name: t.name || '',
        role: t.role || '',
        mapel: t.mapel || '',
        strata: t.strata || 'S1',
        photoUrl: t.photoUrl || t.photo_url || '',
      })));
      localStorage.setItem(STORAGE_KEYS.SITE_TEACHERS, JSON.stringify(normalizedTeachers));
      updated = true;
    }

    // 3. Sync News
    const news = await api.getNews();
    if (news && Array.isArray(news) && news.length > 0) {
      const normalizedNews = stripSupabaseTag(news.map((item: any) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        date: item.date,
        author: item.author || 'Admin',
        commentsCount: item.commentsCount || item.comments_count || 0,
        imageUrl: item.imageUrl || item.image_url,
        excerpt: item.excerpt,
        content: item.content,
      })));
      localStorage.setItem(STORAGE_KEYS.SITE_NEWS, JSON.stringify(normalizedNews));
      updated = true;
    }

    // 4. Sync Events
    const events = await api.getEvents();
    if (events && Array.isArray(events) && events.length > 0) {
      localStorage.setItem(STORAGE_KEYS.SITE_EVENTS, JSON.stringify(stripSupabaseTag(events)));
      updated = true;
    }

    // 5. Sync Slides
    const slides = await api.getSlides();
    if (slides && Array.isArray(slides) && slides.length > 0) {
      const normalizedSlides = stripSupabaseTag(slides.map((s: any) => ({
        id: s.id,
        badge: s.badge,
        title: s.title,
        description: s.description,
        imageUrl: s.imageUrl || s.image_url,
        primaryCtaText: s.primaryCtaText || s.primary_cta_text,
        primaryCtaLink: s.primaryCtaLink || s.primary_cta_link,
        secondaryCtaText: s.secondaryCtaText || s.secondary_cta_text,
        secondaryCtaLink: s.secondaryCtaLink || s.secondary_cta_link,
      })));
      localStorage.setItem(STORAGE_KEYS.SITE_SLIDES, JSON.stringify(normalizedSlides));
      updated = true;
    }

    // 6. Sync Facilities
    const facilities = await api.getFacilities();
    if (facilities && Array.isArray(facilities) && facilities.length > 0) {
      const normalizedFacilities = stripSupabaseTag(facilities.map((f: any) => ({
        id: f.id,
        title: f.title,
        category: f.category,
        description: f.description,
        imageUrl: f.imageUrl || f.image_url,
      })));
      localStorage.setItem(STORAGE_KEYS.SITE_FACILITIES, JSON.stringify(normalizedFacilities));
      updated = true;
    }

    // 7. Sync Testimonials
    const testimonials = await api.getTestimonials();
    if (testimonials && Array.isArray(testimonials) && testimonials.length > 0) {
      const normalizedTestimonials = stripSupabaseTag(testimonials.map((t: any) => ({
        id: t.id,
        name: t.name,
        role: t.role,
        rating: t.rating || 5,
        quote: t.quote,
        avatarUrl: t.avatarUrl || t.avatar_url,
        timeAgo: t.timeAgo || t.time_ago,
      })));
      localStorage.setItem(STORAGE_KEYS.SITE_TESTIMONIALS, JSON.stringify(normalizedTestimonials));
      updated = true;
    }

    // 8. Sync Activities
    const activities = await api.getActivities();
    if (activities && Array.isArray(activities) && activities.length > 0) {
      const normalizedActivities = stripSupabaseTag(activities.map((a: any) => ({
        id: a.id,
        title: a.title,
        type: a.type,
        category: a.category,
        date: a.date,
        studentName: a.studentName || a.student_name,
        achievementBadge: a.achievementBadge || a.achievement_badge,
        description: a.description,
        imageUrl: a.imageUrl || a.image_url,
      })));
      localStorage.setItem(STORAGE_KEYS.SITE_ACTIVITIES, JSON.stringify(normalizedActivities));
      updated = true;
    }

    // 9. Sync Curriculum
    const curriculum = await api.getCurriculum();
    if (curriculum && Array.isArray(curriculum) && curriculum.length > 0) {
      const normalizedCurriculum = stripSupabaseTag(curriculum.map((c: any) => ({
        id: c.id,
        title: c.title,
        type: c.type,
        target: c.target,
        description: c.description,
        badgeColor: c.badgeColor || c.badge_color,
      })));
      localStorage.setItem(STORAGE_KEYS.SITE_CURRICULUM, JSON.stringify(normalizedCurriculum));
      updated = true;
    }

    // 10. Sync Registrations
    const registrations = await api.getRegistrations();
    if (registrations && Array.isArray(registrations) && registrations.length > 0) {
      const normalizedRegs = registrations.map((r: any) => ({
        id: r.id,
        userId: r.user_id || r.userId,
        nisn: r.nisn,
        nik: r.nik,
        birthPlace: r.birth_place || r.birthPlace,
        birthDate: r.birth_date || r.birthDate,
        gender: r.gender,
        address: r.address,
        fatherName: r.father_name || r.fatherName,
        motherName: r.mother_name || r.motherName,
        parentPhone: r.parent_phone || r.parentPhone,
        previousSchool: r.previous_school || r.previousSchool,
        status: r.status,
        rejectionReason: r.rejection_reason || r.rejectionReason,
        paymentProofUrl: r.payment_proof_url || r.paymentProofUrl,
        paymentStatus: r.payment_status || r.paymentStatus,
        programType: r.program_type || r.programType || 'BOARDING',
        infoSource: r.info_source || r.infoSource || 'Instagram / Facebook Official',
        reasonToJoin: r.reason_to_join || r.reasonToJoin || '',
        createdAt: r.created_at || r.createdAt,
        updatedAt: r.updated_at || r.updatedAt,
      }));
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(normalizedRegs));
      updated = true;
    }

    // 11. Sync Users
    const users = await api.getUsers();
    if (users && Array.isArray(users) && users.length > 0) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      updated = true;
    }

    if (updated && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('smait_data_synced'));
    }
  } catch (e) {
    console.warn('[Sync] Offline or backend unreachable, using localStorage');
  }
}

// Auto-trigger sync on module import in browser environment
if (typeof window !== 'undefined') {
  syncWithBackend();
}


