import React, { useState, useEffect } from 'react';
import { 
  getSiteSettings, saveSiteSettings, SiteSettings,
  getSiteNews, saveSiteNews, NewsItem,
  getSiteEvents, saveSiteEvents, EventItem,
  getSiteSlides, saveSiteSlides, SlideItem,
  getSiteFacilities, saveSiteFacilities, FacilityItem,
  getSiteTestimonials, saveSiteTestimonials, TestimonialItem,
  getSiteActivities, saveSiteActivities, ActivityAchievementItem,
  getSiteCurriculum, saveSiteCurriculum, CurriculumTahfidzItem,
  getSiteTeachers, saveSiteTeachers, TeacherItem
} from '@/lib/storage';
import { Save, Plus, Edit2, Trash2, CheckCircle2, Newspaper, Calendar, Settings, Video, Sliders, Building2, MessageSquareQuote, Star, Share2, Award, BookOpen, User, Users } from 'lucide-react';

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState<'SETTINGS' | 'TEACHERS' | 'CURRICULUM' | 'ACTIVITIES' | 'TESTIMONIALS' | 'FACILITIES' | 'SLIDES' | 'NEWS' | 'EVENTS'>('TEACHERS');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Settings State
  const [settings, setSettings] = useState<SiteSettings>({
    schoolName: '',
    tagline: '',
    visi: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    npsn: '',
    accreditation: '',
    videoUrl: '',
    facebookUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
    principalName: '',
    principalTitle: '',
    principalMessage: '',
    principalPhotoUrl: '',
    historyText: '',
  });

  // Teachers State
  const [teachersList, setTeachersList] = useState<TeacherItem[]>([]);
  const [editingTeacher, setEditingTeacher] = useState<TeacherItem | null>(null);
  const [isAddTeacherModal, setIsAddTeacherModal] = useState(false);

  // Curriculum & Tahfidz State
  const [curriculumList, setCurriculumList] = useState<CurriculumTahfidzItem[]>([]);
  const [editingCurriculum, setEditingCurriculum] = useState<CurriculumTahfidzItem | null>(null);
  const [isAddCurriculumModal, setIsAddCurriculumModal] = useState(false);

  // Activities & Achievements State
  const [activitiesList, setActivitiesList] = useState<ActivityAchievementItem[]>([]);
  const [editingActivity, setEditingActivity] = useState<ActivityAchievementItem | null>(null);
  const [isAddActivityModal, setIsAddActivityModal] = useState(false);

  // Testimonials State
  const [testimonialsList, setTestimonialsList] = useState<TestimonialItem[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [isAddTestimonialModal, setIsAddTestimonialModal] = useState(false);

  // Facilities State
  const [facilitiesList, setFacilitiesList] = useState<FacilityItem[]>([]);
  const [editingFacility, setEditingFacility] = useState<FacilityItem | null>(null);
  const [isAddFacilityModal, setIsAddFacilityModal] = useState(false);

  // Slides State
  const [slidesList, setSlidesList] = useState<SlideItem[]>([]);
  const [editingSlide, setEditingSlide] = useState<SlideItem | null>(null);
  const [isAddSlideModal, setIsAddSlideModal] = useState(false);

  // News State
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isAddNewsModal, setIsAddNewsModal] = useState(false);

  // Events State
  const [eventsList, setEventsList] = useState<EventItem[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [isAddEventModal, setIsAddEventModal] = useState(false);

  // Teacher Form
  const [teacherName, setTeacherName] = useState('');
  const [teacherRole, setTeacherRole] = useState('');
  const [teacherMapel, setTeacherMapel] = useState('');
  const [teacherStrata, setTeacherStrata] = useState('S1');

  // Curriculum Form
  const [currTitle, setCurrTitle] = useState('');
  const [currType, setCurrType] = useState<CurriculumTahfidzItem['type']>('Program Tahfidz');
  const [currTarget, setCurrTarget] = useState('');
  const [currDesc, setCurrDesc] = useState('');

  // Activity Form
  const [actTitle, setActTitle] = useState('');
  const [actType, setActType] = useState<ActivityAchievementItem['type']>('Prestasi');
  const [actCategory, setActCategory] = useState('');
  const [actDate, setActDate] = useState('');
  const [actStudentName, setActStudentName] = useState('');
  const [actBadge, setActBadge] = useState('');
  const [actDesc, setActDesc] = useState('');
  const [actImage, setActImage] = useState('');

  // Testimonial Form
  const [testiName, setTestiName] = useState('');
  const [testiRole, setTestiRole] = useState('');
  const [testiRating, setTestiRating] = useState(5);
  const [testiQuote, setTestiQuote] = useState('');
  const [testiAvatar, setTestiAvatar] = useState('');

  // Facility Form
  const [facTitle, setFacTitle] = useState('');
  const [facCategory, setFacCategory] = useState<FacilityItem['category']>('Akademik');
  const [facDesc, setFacDesc] = useState('');
  const [facImage, setFacImage] = useState('');

  // Slide Form
  const [slideBadge, setSlideBadge] = useState('');
  const [slideTitle, setSlideTitle] = useState('');
  const [slideDesc, setSlideDesc] = useState('');
  const [slideImage, setSlideImage] = useState('');
  const [slidePrimaryText, setSlidePrimaryText] = useState('');
  const [slidePrimaryLink, setSlidePrimaryLink] = useState('/spmb');
  const [slideSecondaryText, setSlideSecondaryText] = useState('');
  const [slideSecondaryLink, setSlideSecondaryLink] = useState('/profil');

  // News Form
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState<NewsItem['category']>('Berita Terkini');
  const [newsDate, setNewsDate] = useState('');
  const [newsAuthor, setNewsAuthor] = useState('Admin');
  const [newsImage, setNewsImage] = useState('');
  const [newsExcerpt, setNewsExcerpt] = useState('');
  const [newsContent, setNewsContent] = useState('');

  // Event Form
  const [eventDay, setEventDay] = useState('');
  const [eventMonth, setEventMonth] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventOrganizer, setEventOrganizer] = useState('');

  const loadAll = () => {
    setSettings(getSiteSettings());
    setTeachersList(getSiteTeachers());
    setCurriculumList(getSiteCurriculum());
    setActivitiesList(getSiteActivities());
    setTestimonialsList(getSiteTestimonials());
    setFacilitiesList(getSiteFacilities());
    setSlidesList(getSiteSlides());
    setNewsList(getSiteNews());
    setEventsList(getSiteEvents());
  };

  useEffect(() => {
    loadAll();
  }, []);

  const triggerNotice = (msg: string) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 4000);
  };

  // Helper formatting URL YouTube
  const formatYouTubeEmbed = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/embed/')) return url;
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedSettings = {
      ...settings,
      videoUrl: formatYouTubeEmbed(settings.videoUrl),
    };
    saveSiteSettings(formattedSettings);
    setSettings(formattedSettings);
    triggerNotice('Profil, Visi, Sambutan Kepsek & Tautan Media Sosial berhasil diperbarui!');
  };

  // Teachers Handlers
  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    const newTeacher: TeacherItem = {
      id: Date.now(),
      name: teacherName,
      role: teacherRole,
      mapel: teacherMapel,
      strata: teacherStrata,
    };

    const updated = [...teachersList, newTeacher];
    saveSiteTeachers(updated);
    setTeachersList(updated);
    setIsAddTeacherModal(false);
    resetTeacherForm();
    triggerNotice('Tenaga pendidik / guru baru berhasil ditambahkan!');
  };

  const handleEditTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;

    const updated = teachersList.map((item) => {
      if (item.id === editingTeacher.id) {
        return {
          ...item,
          name: teacherName,
          role: teacherRole,
          mapel: teacherMapel,
          strata: teacherStrata,
        };
      }
      return item;
    });

    saveSiteTeachers(updated);
    setTeachersList(updated);
    setEditingTeacher(null);
    resetTeacherForm();
    triggerNotice('Data tenaga pendidik berhasil diperbarui!');
  };

  const handleDeleteTeacher = (id: number, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data pendidik "${name}"?`)) {
      const filtered = teachersList.filter((t) => t.id !== id);
      saveSiteTeachers(filtered);
      setTeachersList(filtered);
      triggerNotice('Data pendidik berhasil dihapus!');
    }
  };

  const openEditTeacherModal = (item: TeacherItem) => {
    setEditingTeacher(item);
    setTeacherName(item.name);
    setTeacherRole(item.role);
    setTeacherMapel(item.mapel);
    setTeacherStrata(item.strata);
  };

  const resetTeacherForm = () => {
    setTeacherName('');
    setTeacherRole('');
    setTeacherMapel('');
    setTeacherStrata('S1');
  };

  // Curriculum & Tahfidz Handlers
  const handleAddCurriculum = (e: React.FormEvent) => {
    e.preventDefault();
    const newCurr: CurriculumTahfidzItem = {
      id: Date.now(),
      title: currTitle,
      type: currType,
      target: currTarget,
      description: currDesc,
      badgeColor: currType === 'Program Tahfidz' ? 'bg-emerald-600' : currType === 'Profil Lulusan' ? 'bg-amber-600' : 'bg-blue-600',
    };

    const updated = [newCurr, ...curriculumList];
    saveSiteCurriculum(updated);
    setCurriculumList(updated);
    setIsAddCurriculumModal(false);
    resetCurriculumForm();
    triggerNotice('Program Kurikulum / Tahfidz baru berhasil ditambahkan!');
  };

  const handleEditCurriculumSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCurriculum) return;

    const updated = curriculumList.map((item) => {
      if (item.id === editingCurriculum.id) {
        return {
          ...item,
          title: currTitle,
          type: currType,
          target: currTarget,
          description: currDesc,
        };
      }
      return item;
    });

    saveSiteCurriculum(updated);
    setCurriculumList(updated);
    setEditingCurriculum(null);
    resetCurriculumForm();
    triggerNotice('Program Kurikulum / Tahfidz berhasil diperbarui!');
  };

  const handleDeleteCurriculum = (id: number, title: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${title}"?`)) {
      const filtered = curriculumList.filter((c) => c.id !== id);
      saveSiteCurriculum(filtered);
      setCurriculumList(filtered);
      triggerNotice('Program Kurikulum / Tahfidz berhasil dihapus!');
    }
  };

  const openEditCurriculumModal = (item: CurriculumTahfidzItem) => {
    setEditingCurriculum(item);
    setCurrTitle(item.title);
    setCurrType(item.type);
    setCurrTarget(item.target);
    setCurrDesc(item.description);
  };

  const resetCurriculumForm = () => {
    setCurrTitle('');
    setCurrType('Program Tahfidz');
    setCurrTarget('');
    setCurrDesc('');
  };

  // Activity & Achievement Handlers
  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    const newAct: ActivityAchievementItem = {
      id: Date.now(),
      title: actTitle,
      type: actType,
      category: actCategory || 'Prestasi Siswa',
      date: actDate || new Date().getFullYear().toString(),
      studentName: actStudentName || 'Siswa SMA IT',
      achievementBadge: actBadge || 'Juara',
      description: actDesc,
      imageUrl: actImage || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    };

    const updated = [newAct, ...activitiesList];
    saveSiteActivities(updated);
    setActivitiesList(updated);
    setIsAddActivityModal(false);
    resetActivityForm();
    triggerNotice('Aktivitas / Prestasi siswa baru berhasil ditambahkan!');
  };

  const handleEditActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingActivity) return;

    const updated = activitiesList.map((item) => {
      if (item.id === editingActivity.id) {
        return {
          ...item,
          title: actTitle,
          type: actType,
          category: actCategory,
          date: actDate,
          studentName: actStudentName,
          achievementBadge: actBadge,
          description: actDesc,
          imageUrl: actImage,
        };
      }
      return item;
    });

    saveSiteActivities(updated);
    setActivitiesList(updated);
    setEditingActivity(null);
    resetActivityForm();
    triggerNotice('Aktivitas / Prestasi siswa berhasil diperbarui!');
  };

  const handleDeleteActivity = (id: number, title: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${title}"?`)) {
      const filtered = activitiesList.filter((a) => a.id !== id);
      saveSiteActivities(filtered);
      setActivitiesList(filtered);
      triggerNotice('Aktivitas / Prestasi berhasil dihapus!');
    }
  };

  const openEditActivityModal = (item: ActivityAchievementItem) => {
    setEditingActivity(item);
    setActTitle(item.title);
    setActType(item.type);
    setActCategory(item.category);
    setActDate(item.date);
    setActStudentName(item.studentName);
    setActBadge(item.achievementBadge);
    setActDesc(item.description);
    setActImage(item.imageUrl);
  };

  const resetActivityForm = () => {
    setActTitle('');
    setActType('Prestasi');
    setActCategory('');
    setActDate('');
    setActStudentName('');
    setActBadge('');
    setActDesc('');
    setActImage('');
  };

  // Testimonial Handlers
  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    const newTesti: TestimonialItem = {
      id: Date.now(),
      name: testiName,
      role: testiRole,
      rating: Number(testiRating) || 5,
      quote: testiQuote,
      avatarUrl: testiAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    };

    const updated = [newTesti, ...testimonialsList];
    saveSiteTestimonials(updated);
    setTestimonialsList(updated);
    setIsAddTestimonialModal(false);
    resetTestimonialForm();
    triggerNotice('Testimoni baru berhasil ditambahkan!');
  };

  const handleEditTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;

    const updated = testimonialsList.map((item) => {
      if (item.id === editingTestimonial.id) {
        return {
          ...item,
          name: testiName,
          role: testiRole,
          rating: Number(testiRating) || 5,
          quote: testiQuote,
          avatarUrl: testiAvatar,
        };
      }
      return item;
    });

    saveSiteTestimonials(updated);
    setTestimonialsList(updated);
    setEditingTestimonial(null);
    resetTestimonialForm();
    triggerNotice('Testimoni berhasil diperbarui!');
  };

  const handleDeleteTestimonial = (id: number, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus testimoni dari "${name}"?`)) {
      const filtered = testimonialsList.filter((t) => t.id !== id);
      saveSiteTestimonials(filtered);
      setTestimonialsList(filtered);
      triggerNotice('Testimoni berhasil dihapus!');
    }
  };

  const openEditTestimonialModal = (item: TestimonialItem) => {
    setEditingTestimonial(item);
    setTestiName(item.name);
    setTestiRole(item.role);
    setTestiRating(item.rating);
    setTestiQuote(item.quote);
    setTestiAvatar(item.avatarUrl);
  };

  const resetTestimonialForm = () => {
    setTestiName('');
    setTestiRole('');
    setTestiRating(5);
    setTestiQuote('');
    setTestiAvatar('');
  };

  // Facility Handlers
  const handleAddFacility = (e: React.FormEvent) => {
    e.preventDefault();
    const newFac: FacilityItem = {
      id: Date.now(),
      title: facTitle,
      category: facCategory,
      description: facDesc,
      imageUrl: facImage || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    };

    const updated = [newFac, ...facilitiesList];
    saveSiteFacilities(updated);
    setFacilitiesList(updated);
    setIsAddFacilityModal(false);
    resetFacilityForm();
    triggerNotice('Fasilitas sarana prasarana baru berhasil ditambahkan!');
  };

  const handleEditFacilitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFacility) return;

    const updated = facilitiesList.map((item) => {
      if (item.id === editingFacility.id) {
        return {
          ...item,
          title: facTitle,
          category: facCategory,
          description: facDesc,
          imageUrl: facImage,
        };
      }
      return item;
    });

    saveSiteFacilities(updated);
    setFacilitiesList(updated);
    setEditingFacility(null);
    resetFacilityForm();
    triggerNotice('Fasilitas berhasil diperbarui!');
  };

  const handleDeleteFacility = (id: number, title: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus fasilitas "${title}"?`)) {
      const filtered = facilitiesList.filter((f) => f.id !== id);
      saveSiteFacilities(filtered);
      setFacilitiesList(filtered);
      triggerNotice('Fasilitas berhasil dihapus!');
    }
  };

  const openEditFacilityModal = (item: FacilityItem) => {
    setEditingFacility(item);
    setFacTitle(item.title);
    setFacCategory(item.category);
    setFacDesc(item.description);
    setFacImage(item.imageUrl);
  };

  const resetFacilityForm = () => {
    setFacTitle('');
    setFacCategory('Akademik');
    setFacDesc('');
    setFacImage('');
  };

  // Slide Handlers
  const handleAddSlide = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlide: SlideItem = {
      id: Date.now(),
      badge: slideBadge,
      title: slideTitle,
      description: slideDesc,
      imageUrl: slideImage || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80',
      primaryCtaText: slidePrimaryText,
      primaryCtaLink: slidePrimaryLink,
      secondaryCtaText: slideSecondaryText,
      secondaryCtaLink: slideSecondaryLink,
    };

    const updated = [...slidesList, newSlide];
    saveSiteSlides(updated);
    setSlidesList(updated);
    setIsAddSlideModal(false);
    resetSlideForm();
    triggerNotice('Slide banner baru berhasil ditambahkan!');
  };

  const handleEditSlideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;

    const updated = slidesList.map((item) => {
      if (item.id === editingSlide.id) {
        return {
          ...item,
          badge: slideBadge,
          title: slideTitle,
          description: slideDesc,
          imageUrl: slideImage,
          primaryCtaText: slidePrimaryText,
          primaryCtaLink: slidePrimaryLink,
          secondaryCtaText: slideSecondaryText,
          secondaryCtaLink: slideSecondaryLink,
        };
      }
      return item;
    });

    saveSiteSlides(updated);
    setSlidesList(updated);
    setEditingSlide(null);
    resetSlideForm();
    triggerNotice('Slide banner berhasil diperbarui!');
  };

  const handleDeleteSlide = (id: number, title: string) => {
    if (slidesList.length <= 1) {
      alert('Minimal harus ada 1 slide banner di beranda!');
      return;
    }
    if (window.confirm(`Apakah Anda yakin ingin menghapus slide "${title}"?`)) {
      const filtered = slidesList.filter((s) => s.id !== id);
      saveSiteSlides(filtered);
      setSlidesList(filtered);
      triggerNotice('Slide banner berhasil dihapus!');
    }
  };

  const openEditSlideModal = (item: SlideItem) => {
    setEditingSlide(item);
    setSlideBadge(item.badge);
    setSlideTitle(item.title);
    setSlideDesc(item.description);
    setSlideImage(item.imageUrl);
    setSlidePrimaryText(item.primaryCtaText);
    setSlidePrimaryLink(item.primaryCtaLink);
    setSlideSecondaryText(item.secondaryCtaText);
    setSlideSecondaryLink(item.secondaryCtaLink);
  };

  const resetSlideForm = () => {
    setSlideBadge('');
    setSlideTitle('');
    setSlideDesc('');
    setSlideImage('');
    setSlidePrimaryText('');
    setSlidePrimaryLink('/spmb');
    setSlideSecondaryText('');
    setSlideSecondaryLink('/profil');
  };

  // News Handlers
  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    const newArticle: NewsItem = {
      id: Date.now(),
      title: newsTitle,
      category: newsCategory,
      date: newsDate || new Date().toLocaleDateString('id-ID'),
      author: newsAuthor || 'Admin',
      commentsCount: 0,
      imageUrl: newsImage || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      excerpt: newsExcerpt,
      content: newsContent,
    };

    const updated = [newArticle, ...newsList];
    saveSiteNews(updated);
    setNewsList(updated);
    setIsAddNewsModal(false);
    resetNewsForm();
    triggerNotice('Berita baru berhasil ditambahkan!');
  };

  const handleEditNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;

    const updated = newsList.map((item) => {
      if (item.id === editingNews.id) {
        return {
          ...item,
          title: newsTitle,
          category: newsCategory,
          date: newsDate,
          author: newsAuthor,
          imageUrl: newsImage,
          excerpt: newsExcerpt,
          content: newsContent,
        };
      }
      return item;
    });

    saveSiteNews(updated);
    setNewsList(updated);
    setEditingNews(null);
    resetNewsForm();
    triggerNotice('Berita berhasil diperbarui!');
  };

  const handleDeleteNews = (id: number, title: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus berita "${title}"?`)) {
      const filtered = newsList.filter((n) => n.id !== id);
      saveSiteNews(filtered);
      setNewsList(filtered);
      triggerNotice('Berita berhasil dihapus!');
    }
  };

  const openEditNewsModal = (item: NewsItem) => {
    setEditingNews(item);
    setNewsTitle(item.title);
    setNewsCategory(item.category);
    setNewsDate(item.date);
    setNewsAuthor(item.author);
    setNewsImage(item.imageUrl);
    setNewsExcerpt(item.excerpt);
    setNewsContent(item.content);
  };

  const resetNewsForm = () => {
    setNewsTitle('');
    setNewsCategory('Berita Terkini');
    setNewsDate('');
    setNewsAuthor('Admin');
    setNewsImage('');
    setNewsExcerpt('');
    setNewsContent('');
  };

  // Event Handlers
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvt: EventItem = {
      id: Date.now(),
      day: eventDay,
      month: eventMonth,
      title: eventTitle,
      time: eventTime,
      location: eventLocation,
      category: eventCategory,
      description: eventDesc,
      organizer: eventOrganizer,
    };

    const updated = [newEvt, ...eventsList];
    saveSiteEvents(updated);
    setEventsList(updated);
    setIsAddEventModal(false);
    resetEventForm();
    triggerNotice('Agenda acara baru berhasil ditambahkan!');
  };

  const handleDeleteEvent = (id: number, title: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus agenda "${title}"?`)) {
      const filtered = eventsList.filter((e) => e.id !== id);
      saveSiteEvents(filtered);
      setEventsList(filtered);
      triggerNotice('Agenda berhasil dihapus!');
    }
  };

  const resetEventForm = () => {
    setEventDay('');
    setEventMonth('');
    setEventTitle('');
    setEventTime('');
    setEventLocation('');
    setEventCategory('');
    setEventDesc('');
    setEventOrganizer('');
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800">Pengelola Isi Website (Admin CMS)</h1>
        <p className="text-slate-500 text-xs mt-1">
          Perbarui profil & visi sekolah, kepemimpinan & tenaga pendidik, kurikulum & tahfidz, aktivitas & prestasi siswa, sarana prasarana, tautan media sosial, hero slider, berita, dan agenda secara real-time.
        </p>
      </div>

      {/* Save Notification Toast */}
      {savedNotice && (
        <div className="mb-6 bg-emerald-600 text-white p-4 rounded-2xl shadow-lg flex items-center gap-2 font-bold text-xs animate-fadeIn">
          <CheckCircle2 size={18} className="text-amber-300 shrink-0" />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex flex-wrap border-b border-slate-200 mb-8 gap-2">
        <button
          onClick={() => setActiveTab('TEACHERS')}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-xs border-b-2 transition-colors ${
            activeTab === 'TEACHERS'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users size={16} />
          <span>Tenaga Pendidik & Guru ({teachersList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('SETTINGS')}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-xs border-b-2 transition-colors ${
            activeTab === 'SETTINGS'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Settings size={16} />
          <span>Identitas, Visi & Profil</span>
        </button>

        <button
          onClick={() => setActiveTab('CURRICULUM')}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-xs border-b-2 transition-colors ${
            activeTab === 'CURRICULUM'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen size={16} />
          <span>Kurikulum & Tahfidz ({curriculumList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ACTIVITIES')}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-xs border-b-2 transition-colors ${
            activeTab === 'ACTIVITIES'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award size={16} />
          <span>Aktivitas & Prestasi ({activitiesList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('TESTIMONIALS')}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-xs border-b-2 transition-colors ${
            activeTab === 'TESTIMONIALS'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquareQuote size={16} />
          <span>Testimoni ({testimonialsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('FACILITIES')}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-xs border-b-2 transition-colors ${
            activeTab === 'FACILITIES'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 size={16} />
          <span>Sarana Prasarana ({facilitiesList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('SLIDES')}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-xs border-b-2 transition-colors ${
            activeTab === 'SLIDES'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sliders size={16} />
          <span>Hero Slider ({slidesList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('NEWS')}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-xs border-b-2 transition-colors ${
            activeTab === 'NEWS'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Newspaper size={16} />
          <span>Berita ({newsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('EVENTS')}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-xs border-b-2 transition-colors ${
            activeTab === 'EVENTS'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar size={16} />
          <span>Agenda ({eventsList.length})</span>
        </button>
      </div>

      {/* TAB: KELOLA TENAGA PENDIDIK & GURU */}
      {activeTab === 'TEACHERS' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Daftar Kepemimpinan & Tenaga Pendidik</h2>
              <p className="text-xs text-slate-500">Kelola nama guru, gelar, jabatan struktural, mata pelajaran/tugas, dan strata pendidikan.</p>
            </div>

            <button
              onClick={() => { resetTeacherForm(); setIsAddTeacherModal(true); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-full text-xs transition-all shadow flex items-center gap-2"
            >
              <Plus size={16} /> Tambah Guru / Pendidik
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
                    <th className="py-3.5 px-4">Nama Pendidik & Gelar</th>
                    <th className="py-3.5 px-4">Jabatan Struktural</th>
                    <th className="py-3.5 px-4">Mata Pelajaran / Bidang Tugas</th>
                    <th className="py-3.5 px-4 text-center">Strata</th>
                    <th className="py-3.5 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {teachersList.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{t.name}</td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-700">{t.role}</td>
                      <td className="py-3.5 px-4 text-slate-600">{t.mapel}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full font-mono font-bold text-[11px]">
                          {t.strata}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => openEditTeacherModal(t)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteTeacher(t.id, t.name)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: IDENTITAS, VISI, SAMBUTAN KEPSEK & MEDIA SOSIAL */}
      {activeTab === 'SETTINGS' && (
        <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 max-w-4xl">
          <h2 className="text-xl font-bold text-slate-800 border-b pb-3">Informasi Profil, Visi, Sambutan Kepala Sekolah & Kontak</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Sekolah</label>
              <input 
                type="text" 
                value={settings.schoolName}
                onChange={(e) => setSettings({ ...settings, schoolName: e.target.value })}
                className="w-full px-3 py-2.5 border rounded-xl outline-none focus:border-emerald-500 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Tagline / Branding Sekolah</label>
              <input 
                type="text" 
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3 py-2.5 border rounded-xl outline-none focus:border-emerald-500"
              />
            </div>

            {/* Visi Sekolah */}
            <div className="md:col-span-2 bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200">
              <label className="block font-bold text-emerald-950 text-sm mb-1">Visi Utama Sekolah</label>
              <input 
                type="text" 
                value={settings.visi}
                onChange={(e) => setSettings({ ...settings, visi: e.target.value })}
                className="w-full px-3 py-2.5 border border-emerald-300 rounded-xl outline-none focus:border-emerald-500 font-bold text-sm bg-white"
              />
            </div>

            {/* Sambutan Kepala Sekolah Fields */}
            <div className="md:col-span-2 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2 text-emerald-900">
                <User size={16} /> Pengaturan Sambutan Kepala Sekolah
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Kepala Sekolah</label>
                  <input 
                    type="text" placeholder="Fadhilah Ikhtiarni, M.Pd."
                    value={settings.principalName || ''}
                    onChange={(e) => setSettings({ ...settings, principalName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500 font-semibold bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jabatan / Gelar Struktural</label>
                  <input 
                    type="text" placeholder="Kepala Sekolah SMA IT Andalas Cendekia"
                    value={settings.principalTitle || ''}
                    onChange={(e) => setSettings({ ...settings, principalTitle: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Foto Profil Kepala Sekolah</label>
                <input 
                  type="url" placeholder="https://images.unsplash.com/..."
                  value={settings.principalPhotoUrl || ''}
                  onChange={(e) => setSettings({ ...settings, principalPhotoUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-emerald-300 rounded-xl outline-none focus:border-emerald-500 font-mono text-[11px] bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Naskah Sambutan Kepala Sekolah</label>
                <textarea 
                  rows={3}
                  value={settings.principalMessage || ''}
                  onChange={(e) => setSettings({ ...settings, principalMessage: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500 bg-white leading-relaxed"
                ></textarea>
              </div>
            </div>

            {/* Ringkasan Profil & Sejarah */}
            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Deskripsi Ringkasan Profil & Sejarah Sekolah</label>
              <textarea 
                rows={3}
                value={settings.historyText || ''}
                onChange={(e) => setSettings({ ...settings, historyText: e.target.value })}
                className="w-full px-3 py-2.5 border rounded-xl outline-none focus:border-emerald-500"
              ></textarea>
            </div>

            {/* Media Sosial Fields */}
            <div className="md:col-span-2 bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200/80 space-y-4">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2 text-emerald-900">
                <Share2 size={16} /> Tautan Akun Media Sosial Official
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Facebook URL</label>
                  <input 
                    type="url" placeholder="https://facebook.com/smaitandalascendekia"
                    value={settings.facebookUrl || ''}
                    onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500 font-mono text-[11px] bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Instagram URL</label>
                  <input 
                    type="url" placeholder="https://instagram.com/smaitandalascendekia"
                    value={settings.instagramUrl || ''}
                    onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500 font-mono text-[11px] bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">YouTube URL Channel</label>
                  <input 
                    type="url" placeholder="https://youtube.com/@smaitandalascendekia"
                    value={settings.youtubeUrl || ''}
                    onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500 font-mono text-[11px] bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5 text-emerald-700">
                <Video size={16} />
                Link Video Profil Beranda (YouTube Embed / Link YouTube)
              </label>
              <input 
                type="text" 
                placeholder="Contoh: https://www.youtube.com/watch?v=9E09XrFAi_s"
                value={settings.videoUrl}
                onChange={(e) => setSettings({ ...settings, videoUrl: e.target.value })}
                className="w-full px-3 py-2.5 border border-emerald-300 rounded-xl outline-none focus:border-emerald-500 font-mono text-[11px] bg-emerald-50/40"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Alamat Lengkap Sekolah</label>
              <textarea 
                rows={2}
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3 py-2.5 border rounded-xl outline-none focus:border-emerald-500"
              ></textarea>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nomor Telepon / WhatsApp Official</label>
              <input 
                type="text" 
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3 py-2.5 border rounded-xl outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Official Sekolah</label>
              <input 
                type="email" 
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3 py-2.5 border rounded-xl outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end">
            <button 
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-full text-xs transition-colors shadow flex items-center gap-2"
            >
              <Save size={16} /> Simpan Perubahan Profil & Visi Sekolah
            </button>
          </div>
        </form>
      )}

      {/* TAB: KELOLA KURIKULUM & TAHFIDZ */}
      {activeTab === 'CURRICULUM' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Daftar Program Kurikulum, Tahfidz & Profil Lulusan</h2>
              <p className="text-xs text-slate-500">Tambah, edit judul program khas, target pencapaian hafalan/akademik, dan deskripsi.</p>
            </div>

            <button
              onClick={() => { resetCurriculumForm(); setIsAddCurriculumModal(true); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-full text-xs transition-all shadow flex items-center gap-2"
            >
              <Plus size={16} /> Tambah Program Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {curriculumList.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                      {item.type}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-2">{item.title}</h3>
                  <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 mb-3">
                    🎯 {item.target}
                  </p>
                  <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed mb-4">{item.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button 
                    onClick={() => openEditCurriculumModal(item)}
                    className="flex items-center gap-1 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteCurriculum(item.id, item.title)}
                    className="flex items-center gap-1 text-xs font-bold bg-red-50 hover:bg-red-100 text-red-600 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <Trash2 size={14} /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: KELOLA AKTIVITAS & PRESTASI SISWA */}
      {activeTab === 'ACTIVITIES' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Daftar Aktivitas, Ekstrakurikuler & Prestasi</h2>
              <p className="text-xs text-slate-500">Kelola judul, jenis (Prestasi / Aktivitas / Ekskul), nama siswa/tim, badge juara, foto, dan deskripsi.</p>
            </div>

            <button
              onClick={() => { resetActivityForm(); setIsAddActivityModal(true); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-full text-xs transition-all shadow flex items-center gap-2"
            >
              <Plus size={16} /> Tambah Aktivitas / Prestasi
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activitiesList.map((act) => (
              <div key={act.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                    <img 
                      src={act.imageUrl} 
                      alt={act.title} 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow">
                      {act.type}
                    </span>
                    <span className="absolute top-3 right-3 bg-amber-500 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow">
                      {act.achievementBadge}
                    </span>
                  </div>

                  <div className="p-6">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mb-2">
                      {act.category} • {act.studentName}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mb-2">{act.title}</h3>
                    <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">{act.description}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex items-center justify-end gap-2 border-t border-slate-100 mt-2 pt-4">
                  <button 
                    onClick={() => openEditActivityModal(act)}
                    className="flex items-center gap-1 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteActivity(act.id, act.title)}
                    className="flex items-center gap-1 text-xs font-bold bg-red-50 hover:bg-red-100 text-red-600 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <Trash2 size={14} /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: KELOLA TESTIMONI ORANG TUA */}
      {activeTab === 'TESTIMONIALS' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Daftar Testimoni Orang Tua & Alumni</h2>
              <p className="text-xs text-slate-500">Tambah, edit nama, rating bintang, foto profil, dan kutipan testimoni.</p>
            </div>

            <button
              onClick={() => { resetTestimonialForm(); setIsAddTestimonialModal(true); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-full text-xs transition-all shadow flex items-center gap-2"
            >
              <Plus size={16} /> Tambah Testimoni Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsList.map((t) => (
              <div key={t.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  <p className="text-slate-600 text-xs italic line-clamp-4 leading-relaxed mb-4">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={t.avatarUrl} 
                      alt={t.name} 
                      className="w-10 h-10 rounded-full object-cover border shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">{t.name}</h4>
                      <p className="text-slate-500 text-[11px]">{t.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <button 
                      onClick={() => openEditTestimonialModal(t)}
                      className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDeleteTestimonial(t.id, t.name)}
                      className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: KELOLA SARANA PRASARANA / FASILITAS */}
      {activeTab === 'FACILITIES' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Daftar Fasilitas Sarana & Prasarana</h2>
              <p className="text-xs text-slate-500">Kelola foto, nama fasilitas, kategori, dan deskripsi sarana sekolah.</p>
            </div>

            <button
              onClick={() => { resetFacilityForm(); setIsAddFacilityModal(true); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-full text-xs transition-all shadow flex items-center gap-2"
            >
              <Plus size={16} /> Tambah Fasilitas Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facilitiesList.map((fac) => (
              <div key={fac.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                    <img 
                      src={fac.imageUrl} 
                      alt={fac.title} 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow">
                      {fac.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 text-base mb-2">{fac.title}</h3>
                    <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">{fac.description}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex items-center justify-end gap-2 border-t border-slate-100 mt-2 pt-4">
                  <button 
                    onClick={() => openEditFacilityModal(fac)}
                    className="flex items-center gap-1 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteFacility(fac.id, fac.title)}
                    className="flex items-center gap-1 text-xs font-bold bg-red-50 hover:bg-red-100 text-red-600 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <Trash2 size={14} /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: HERO SLIDER BANNER CMS */}
      {activeTab === 'SLIDES' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Daftar Slide Foto Hero Banner</h2>
              <p className="text-xs text-slate-500">Edit gambar latar, judul, deskripsi, dan tombol aksi slider beranda utama.</p>
            </div>

            <button
              onClick={() => { resetSlideForm(); setIsAddSlideModal(true); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-full text-xs transition-all shadow flex items-center gap-2"
            >
              <Plus size={16} /> Tambah Slide Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {slidesList.map((slide, idx) => (
              <div key={slide.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/8] bg-slate-900 overflow-hidden">
                    <img 
                      src={slide.imageUrl} 
                      alt={slide.title} 
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 bg-amber-500 text-amber-950 text-[10px] font-extrabold px-3 py-1 rounded-full shadow uppercase">
                      Slide 0{idx + 1}
                    </span>
                  </div>

                  <div className="p-6">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mb-2">
                      {slide.badge}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mb-2">{slide.title}</h3>
                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-4">{slide.description}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex items-center justify-end gap-2 border-t border-slate-100 mt-2 pt-4">
                  <button 
                    onClick={() => openEditSlideModal(slide)}
                    className="flex items-center gap-1 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl transition-colors"
                  >
                    <Edit2 size={14} /> Edit Slide
                  </button>
                  <button 
                    onClick={() => handleDeleteSlide(slide.id, slide.title)}
                    className="flex items-center gap-1 text-xs font-bold bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl transition-colors"
                  >
                    <Trash2 size={14} /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: KELOLA BERITA & PENGUMUMAN */}
      {activeTab === 'NEWS' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Daftar Berita & Pengumuman Sekolah</h2>
            <button
              onClick={() => { resetNewsForm(); setIsAddNewsModal(true); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-full text-xs transition-all shadow flex items-center gap-2"
            >
              <Plus size={16} /> Tambah Berita Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsList.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-slate-400 text-xs">{item.date}</span>
                  </div>

                  <h3 className="font-bold text-slate-800 text-base mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-4">{item.excerpt}</p>
                </div>

                <div className="pt-4 border-t flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">Penulis: {item.author}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openEditNewsModal(item)}
                      className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDeleteNews(item.id, item.title)}
                      className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: KELOLA AGENDA ACARA */}
      {activeTab === 'EVENTS' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Daftar Agenda & Kalender Akademik</h2>
            <button
              onClick={() => { resetEventForm(); setIsAddEventModal(true); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-full text-xs transition-all shadow flex items-center gap-2"
            >
              <Plus size={16} /> Tambah Agenda Baru
            </button>
          </div>

          <div className="space-y-4">
            {eventsList.map((evt) => (
              <div key={evt.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-emerald-600 text-white flex flex-col items-center justify-center font-bold text-xs shrink-0">
                    <span>{evt.day}</span>
                    <span className="text-[10px] uppercase">{evt.month}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-700">{evt.category}</span>
                    <h3 className="font-bold text-slate-800 text-base">{evt.title}</h3>
                    <p className="text-slate-500 text-xs">{evt.time} • {evt.location}</p>
                  </div>
                </div>

                <button 
                  onClick={() => handleDeleteEvent(evt.id, evt.title)}
                  className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Add / Edit Teacher */}
      {(isAddTeacherModal || editingTeacher) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">
              {editingTeacher ? 'Edit Data Tenaga Pendidik / Guru' : 'Tambah Guru / Pendidik Baru'}
            </h3>

            <form onSubmit={editingTeacher ? handleEditTeacherSubmit : handleAddTeacher} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Pendidik & Gelar</label>
                <input 
                  type="text" required placeholder="Contoh: Novrika mawarni, S.Pd."
                  value={teacherName} onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Jabatan Struktural</label>
                <input 
                  type="text" required placeholder="Contoh: Waka Kurikulum / Guru Bidang Studi"
                  value={teacherRole} onChange={(e) => setTeacherRole(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500 font-semibold text-emerald-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mata Pelajaran / Bidang Tugas</label>
                <input 
                  type="text" required placeholder="Contoh: Biologi, Kimia, Mentoring Qur'anic Leader"
                  value={teacherMapel} onChange={(e) => setTeacherMapel(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Strata Pendidikan</label>
                <select 
                  value={teacherStrata} onChange={(e) => setTeacherStrata(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500 font-mono font-bold"
                >
                  <option value="S1">S1 (Sarjana)</option>
                  <option value="S2">S2 (Magister)</option>
                  <option value="S3">S3 (Doktor)</option>
                  <option value="D3">D3 (Diploma)</option>
                </select>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => { setIsAddTeacherModal(false); setEditingTeacher(null); }}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow"
                >
                  Simpan Data Pendidik
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add / Edit Curriculum */}
      {(isAddCurriculumModal || editingCurriculum) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">
              {editingCurriculum ? 'Edit Program Kurikulum & Tahfidz' : 'Tambah Program Baru'}
            </h3>

            <form onSubmit={editingCurriculum ? handleEditCurriculumSubmit : handleAddCurriculum} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Program / Matrikulasi</label>
                <input 
                  type="text" required placeholder="Contoh: Program Hafalan Tahfidz Al-Qur'an Intensif"
                  value={currTitle} onChange={(e) => setCurrTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tipe Program</label>
                <select 
                  value={currType} onChange={(e) => setCurrType(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500 font-semibold"
                >
                  <option value="Program Tahfidz">Program Tahfidz</option>
                  <option value="Program Kurikulum">Program Kurikulum</option>
                  <option value="Profil Lulusan">Profil Lulusan</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Output / Ketercapaian</label>
                <input 
                  type="text" required placeholder="Contoh: Target 5 - 10 Juz Mutqin / 90% Lolos PTN"
                  value={currTarget} onChange={(e) => setCurrTarget(e.target.value)}
                  className="w-full px-3 py-2 border border-emerald-300 rounded-xl outline-none focus:border-emerald-500 font-semibold text-emerald-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Ringkas</label>
                <textarea 
                  rows={3} required placeholder="Tuliskan detail pelaksanaan program..."
                  value={currDesc} onChange={(e) => setCurrDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => { setIsAddCurriculumModal(false); setEditingCurriculum(null); }}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow"
                >
                  Simpan Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add / Edit Activity */}
      {(isAddActivityModal || editingActivity) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">
              {editingActivity ? 'Edit Aktivitas / Prestasi Siswa' : 'Tambah Aktivitas / Prestasi Baru'}
            </h3>

            <form onSubmit={editingActivity ? handleEditActivitySubmit : handleAddActivity} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Aktivitas / Prestasi</label>
                <input 
                  type="text" required placeholder="Contoh: Juara 1 Medali Emas Olimpiade IT Nasional 2026"
                  value={actTitle} onChange={(e) => setActTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tipe Konten</label>
                  <select 
                    value={actType} onChange={(e) => setActType(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                  >
                    <option value="Prestasi">Prestasi Siswa</option>
                    <option value="Aktivitas Kesiswaan">Aktivitas Kesiswaan</option>
                    <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori / Tingkat</label>
                  <input 
                    type="text" required placeholder="Contoh: Tingkat Nasional / Provinsi"
                    value={actCategory} onChange={(e) => setActCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Badge Penghargaan</label>
                  <input 
                    type="text" required placeholder="Contoh: Juara 1 Emas"
                    value={actBadge} onChange={(e) => setActBadge(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500 font-semibold text-emerald-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Siswa / Tim</label>
                  <input 
                    type="text" required placeholder="Contoh: Tim Robotik & IT"
                    value={actStudentName} onChange={(e) => setActStudentName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tahun / Tanggal</label>
                  <input 
                    type="text" required placeholder="Contoh: 2026 / April 2026"
                    value={actDate} onChange={(e) => setActDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Foto Aktivitas / Prestasi</label>
                <input 
                  type="url" required placeholder="https://images.unsplash.com/..."
                  value={actImage} onChange={(e) => setActImage(e.target.value)}
                  className="w-full px-3 py-2 border border-emerald-300 rounded-xl outline-none focus:border-emerald-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Aktivitas / Prestasi</label>
                <textarea 
                  rows={3} required placeholder="Tuliskan cerita singkat pencapaian dan proses kegiatan..."
                  value={actDesc} onChange={(e) => setActDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => { setIsAddActivityModal(false); setEditingActivity(null); }}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow"
                >
                  Simpan Konten
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add / Edit Testimonial */}
      {(isAddTestimonialModal || editingTestimonial) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">
              {editingTestimonial ? 'Edit Testimoni Orang Tua' : 'Tambah Testimoni Baru'}
            </h3>

            <form onSubmit={editingTestimonial ? handleEditTestimonialSubmit : handleAddTestimonial} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Orang Tua / Alumni</label>
                <input 
                  type="text" required placeholder="Contoh: Dr. H. Hendra Wijaya, M.Si."
                  value={testiName} onChange={(e) => setTestiName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Peran / Status</label>
                <input 
                  type="text" required placeholder="Contoh: Orang Tua Siswa Kelas XI"
                  value={testiRole} onChange={(e) => setTestiRole(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Rating Bintang (1 - 5)</label>
                <select 
                  value={testiRating} onChange={(e) => setTestiRating(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                >
                  <option value={5}>5 Bintang (Sangat Puas)</option>
                  <option value={4}>4 Bintang (Puas)</option>
                  <option value={3}>3 Bintang (Cukup)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Foto Profil Avatar</label>
                <input 
                  type="url" required placeholder="https://images.unsplash.com/..."
                  value={testiAvatar} onChange={(e) => setTestiAvatar(e.target.value)}
                  className="w-full px-3 py-2 border border-emerald-300 rounded-xl outline-none focus:border-emerald-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kutipan Testimoni</label>
                <textarea 
                  rows={3} required placeholder="Tuliskan pengalaman dan kesan selama menyekolahkan anak di SMA IT..."
                  value={testiQuote} onChange={(e) => setTestiQuote(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => { setIsAddTestimonialModal(false); setEditingTestimonial(null); }}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow"
                >
                  Simpan Testimoni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add / Edit Facility */}
      {(isAddFacilityModal || editingFacility) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">
              {editingFacility ? 'Edit Fasilitas / Sarana' : 'Tambah Fasilitas Baru'}
            </h3>

            <form onSubmit={editingFacility ? handleEditFacilitySubmit : handleAddFacility} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Fasilitas / Ruangan</label>
                <input 
                  type="text" required placeholder="Contoh: Smart Classroom Interaktif"
                  value={facTitle} onChange={(e) => setFacTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kategori Fasilitas</label>
                <select 
                  value={facCategory} onChange={(e) => setFacCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                >
                  <option value="Akademik">Akademik</option>
                  <option value="Keagamaan">Keagamaan</option>
                  <option value="Teknologi">Teknologi</option>
                  <option value="Olahraga & Terbuka">Olahraga & Terbuka</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Foto Fasilitas</label>
                <input 
                  type="url" required placeholder="https://images.unsplash.com/..."
                  value={facImage} onChange={(e) => setFacImage(e.target.value)}
                  className="w-full px-3 py-2 border border-emerald-300 rounded-xl outline-none focus:border-emerald-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Fasilitas</label>
                <textarea 
                  rows={3} required placeholder="Tuliskan spesifikasi dan keunggulan fasilitas..."
                  value={facDesc} onChange={(e) => setFacDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => { setIsAddFacilityModal(false); setEditingFacility(null); }}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow"
                >
                  Simpan Fasilitas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add / Edit Slide */}
      {(isAddSlideModal || editingSlide) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">
              {editingSlide ? 'Edit Slide Banner Hero' : 'Tambah Slide Banner Baru'}
            </h3>

            <form onSubmit={editingSlide ? handleEditSlideSubmit : handleAddSlide} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Badge Pengumuman / Peringatan</label>
                <input 
                  type="text" required placeholder="Contoh: Penerimaan Siswa Baru 2026/2027 Telah Dibuka"
                  value={slideBadge} onChange={(e) => setSlideBadge(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Utama Slide</label>
                <input 
                  type="text" required placeholder="Contoh: Membentuk Generasi Qurani, Cerdas, dan Berprestasi"
                  value={slideTitle} onChange={(e) => setSlideTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Gambar Foto Latar Belakang (Slider Photo)</label>
                <input 
                  type="url" required placeholder="https://images.unsplash.com/..."
                  value={slideImage} onChange={(e) => setSlideImage(e.target.value)}
                  className="w-full px-3 py-2 border border-emerald-300 rounded-xl outline-none focus:border-emerald-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Ringkas Slide</label>
                <textarea 
                  rows={3} required placeholder="Tuliskan penjelas ringkas..."
                  value={slideDesc} onChange={(e) => setSlideDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => { setIsAddSlideModal(false); setEditingSlide(null); }}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow"
                >
                  Simpan Slide Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add / Edit News */}
      {(isAddNewsModal || editingNews) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">
              {editingNews ? 'Edit Berita' : 'Tambah Berita Baru'}
            </h3>

            <form onSubmit={editingNews ? handleEditNewsSubmit : handleAddNews} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Berita</label>
                <input 
                  type="text" required
                  value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <select 
                    value={newsCategory} onChange={(e) => setNewsCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                  >
                    <option value="Berita Terkini">Berita Terkini</option>
                    <option value="Kegiatan Sekolah">Kegiatan Sekolah</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="Galeri">Galeri</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal</label>
                  <input 
                    type="text" required placeholder="Contoh: 26/08/2026"
                    value={newsDate} onChange={(e) => setNewsDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Gambar Banner</label>
                <input 
                  type="url" required placeholder="https://images.unsplash.com/..."
                  value={newsImage} onChange={(e) => setNewsImage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ringkasan (Excerpt)</label>
                <textarea 
                  rows={2} required
                  value={newsExcerpt} onChange={(e) => setNewsExcerpt(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kontak Lengkap Berita</label>
                <textarea 
                  rows={4} required
                  value={newsContent} onChange={(e) => setNewsContent(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => { setIsAddNewsModal(false); setEditingNews(null); }}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow"
                >
                  Simpan Berita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Event */}
      {isAddEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Tambah Agenda Baru</h3>

            <form onSubmit={handleAddEvent} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal (Angka)</label>
                  <input type="text" required placeholder="Contoh: 15" value={eventDay} onChange={(e) => setEventDay(e.target.value)} className="w-full px-3 py-2 border rounded-xl outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bulan (Singkatan)</label>
                  <input type="text" required placeholder="Contoh: OKT" value={eventMonth} onChange={(e) => setEventMonth(e.target.value)} className="w-full px-3 py-2 border rounded-xl outline-none" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Agenda</label>
                <input type="text" required value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} className="w-full px-3 py-2 border rounded-xl outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Waktu</label>
                  <input type="text" required placeholder="08:00 WIB - Selesai" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="w-full px-3 py-2 border rounded-xl outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <input type="text" required placeholder="Keagamaan / Sains" value={eventCategory} onChange={(e) => setEventCategory(e.target.value)} className="w-full px-3 py-2 border rounded-xl outline-none" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lokasi Acara</label>
                <input type="text" required placeholder="Aula Utama / Masjid" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} className="w-full px-3 py-2 border rounded-xl outline-none" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea rows={3} required value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} className="w-full px-3 py-2 border rounded-xl outline-none"></textarea>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddCurriculumModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 font-bold">Batal</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow">Simpan Agenda</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
