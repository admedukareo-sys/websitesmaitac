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
  createdAt: string;
  updatedAt: string;
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

const STORAGE_KEYS = {
  USERS: 'smait_users',
  REGISTRATIONS: 'smait_registrations',
  CURRENT_USER: 'smait_current_user',
  SITE_SETTINGS: 'smait_site_settings',
  SITE_NEWS: 'smait_site_news',
  SITE_EVENTS: 'smait_site_events',
  SITE_SLIDES: 'smait_site_slides',
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
      {
        id: 3,
        name: 'Fatimah Az-Zahra',
        email: 'fatimah@gmail.com',
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        userId: 3,
        nisn: '0059876543',
        nik: '1371012304050002',
        birthPlace: 'Sungai Dareh',
        birthDate: '2008-08-20',
        gender: 'P',
        address: 'Nagari Tebing Tinggi, Dharmasraya',
        fatherName: 'Rahman Hakim',
        motherName: 'Nurhaliza',
        parentPhone: '081399887766',
        previousSchool: 'MTsN 1 Dharmasraya',
        status: 'DRAFT',
        paymentStatus: 'UNPAID',
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
      {
        id: 2,
        title: 'Muria & Halal Bihalal Ramadhan: Santunan Anak Yatim dan Tahfidz Qur\'an',
        category: 'Kegiatan Sekolah',
        date: '15/04/2026',
        author: 'Panitia Rohis',
        commentsCount: 8,
        imageUrl: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=800&q=80',
        excerpt: 'Seluruh keluarga besar sekolah merayakan penutupan bulan suci dengan pembagian sembako, santunan, dan khataman Al-Qur\'an 30 Juz.',
        content: 'Kegiatan rutin tahunan dalam rangka mengasah kepedulian sosial peserta didik dan mempererat tali silaturahmi antar warga sekolah, orang tua, dan masyarakat sekitar.',
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
      {
        id: 2,
        badge: 'Program Unggulan Tahfidz Al-Qur\'an',
        title: 'Target Hafalan 5-10 Juz Berlandaskan Adab Islami',
        description: 'Pendampingan halaqah Al-Qur\'an harian bersama musyrif & musyrifah berpengalaman untuk mencetak alumni penghafal Al-Qur\'an mutqin.',
        imageUrl: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1920&q=80',
        primaryCtaText: 'Lihat Kurikulum & Program',
        primaryCtaLink: '/kurikulum',
        secondaryCtaText: 'Portal SPMB',
        secondaryCtaLink: '/spmb',
      },
      {
        id: 3,
        badge: 'Fasilitas Digital & Smart Classroom',
        title: 'Integrasi Sains, Teknologi IPTEK, dan Imtaq',
        description: 'Laboratorium komputer canggih, kelas digital interaktif, dan akses e-learning 24/7 untuk mendukung pembelajaran berbasis abad 21.',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80',
        primaryCtaText: 'Jelajahi Kesiswaan',
        primaryCtaLink: '/kesiswaan',
        secondaryCtaText: 'Hubungi Kami',
        secondaryCtaLink: '/kontak',
      },
      {
        id: 4,
        badge: 'Prestasi & Ekstrakurikuler',
        title: 'Wadah Bakat, Kepemimpinan, dan Karakter Rabbani',
        description: 'Lebih dari 24 ekstrakurikuler unggulan serta raihan 120+ prestasi tingkat kabupaten, provinsi, hingga nasional.',
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80',
        primaryCtaText: 'Daftar SPMB Sekarang',
        primaryCtaLink: '/spmb',
        secondaryCtaText: 'Profil Sekolah',
        secondaryCtaLink: '/profil',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.SITE_SLIDES, JSON.stringify(defaultSlides));
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
  return regs.find((r) => r.userId === userId) || null;
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
  let index = regs.findIndex((r) => r.userId === userId);
  
  if (index === -1) {
    const newReg: Registration = {
      id: Date.now(),
      userId,
      status: 'DRAFT',
      paymentStatus: 'UNPAID',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...updates,
    };
    regs.push(newReg);
    saveRegistrations(regs);
    return newReg;
  } else {
    regs[index] = {
      ...regs[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveRegistrations(regs);
    return regs[index];
  }
}

export function updateRegistrationById(id: number, updates: Partial<Registration>): Registration | null {
  const regs = getRegistrations();
  const index = regs.findIndex((r) => r.id === id);
  if (index !== -1) {
    regs[index] = {
      ...regs[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveRegistrations(regs);
    return regs[index];
  }
  return null;
}

export function deleteRegistrationById(id: number) {
  const regs = getRegistrations();
  const filtered = regs.filter((r) => r.id !== id);
  saveRegistrations(filtered);
}

export function addRegistrationByAdmin(data: {
  name: string;
  email: string;
  previousSchool?: string;
  nisn?: string;
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
  }

  const regs = getRegistrations();
  const newReg: Registration = {
    id: Date.now(),
    userId,
    nisn: data.nisn || '',
    previousSchool: data.previousSchool || '',
    status: data.status,
    paymentStatus: data.paymentStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  regs.push(newReg);
  saveRegistrations(regs);
  return newReg;
}

// Site Content CMS Helpers
export function getSiteSettings(): SiteSettings {
  initializeStorage();
  const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.SITE_SETTINGS) || '{}');
  if (!data.videoUrl) {
    data.videoUrl = 'https://www.youtube.com/embed/9E09XrFAi_s?autoplay=1';
  }
  return data;
}

export function saveSiteSettings(settings: SiteSettings) {
  localStorage.setItem(STORAGE_KEYS.SITE_SETTINGS, JSON.stringify(settings));
}

export function getSiteNews(): NewsItem[] {
  initializeStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.SITE_NEWS) || '[]');
}

export function saveSiteNews(news: NewsItem[]) {
  localStorage.setItem(STORAGE_KEYS.SITE_NEWS, JSON.stringify(news));
}

export function getSiteEvents(): EventItem[] {
  initializeStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.SITE_EVENTS) || '[]');
}

export function saveSiteEvents(events: EventItem[]) {
  localStorage.setItem(STORAGE_KEYS.SITE_EVENTS, JSON.stringify(events));
}

export function getSiteSlides(): SlideItem[] {
  initializeStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.SITE_SLIDES) || '[]');
}

export function saveSiteSlides(slides: SlideItem[]) {
  localStorage.setItem(STORAGE_KEYS.SITE_SLIDES, JSON.stringify(slides));
}
