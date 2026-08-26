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
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
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
  if (!data.facebookUrl) data.facebookUrl = 'https://facebook.com';
  if (!data.instagramUrl) data.instagramUrl = 'https://instagram.com';
  if (!data.youtubeUrl) data.youtubeUrl = 'https://youtube.com';
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

export function getSiteFacilities(): FacilityItem[] {
  initializeStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.SITE_FACILITIES) || '[]');
}

export function saveSiteFacilities(facilities: FacilityItem[]) {
  localStorage.setItem(STORAGE_KEYS.SITE_FACILITIES, JSON.stringify(facilities));
}

export function getSiteTestimonials(): TestimonialItem[] {
  initializeStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.SITE_TESTIMONIALS) || '[]');
}

export function saveSiteTestimonials(testimonials: TestimonialItem[]) {
  localStorage.setItem(STORAGE_KEYS.SITE_TESTIMONIALS, JSON.stringify(testimonials));
}
