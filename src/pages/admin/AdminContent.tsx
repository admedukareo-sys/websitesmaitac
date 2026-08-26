import React, { useState, useEffect } from 'react';
import { 
  getSiteSettings, saveSiteSettings, SiteSettings,
  getSiteNews, saveSiteNews, NewsItem,
  getSiteEvents, saveSiteEvents, EventItem,
  getSiteSlides, saveSiteSlides, SlideItem
} from '@/lib/storage';
import { Save, Plus, Edit2, Trash2, CheckCircle2, Newspaper, Calendar, Settings, Video, Sliders } from 'lucide-react';

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState<'SETTINGS' | 'SLIDES' | 'NEWS' | 'EVENTS'>('SLIDES');
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
  });

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

  // Helper formatting URL YouTube menjadi embed format
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
    triggerNotice('Identitas, Kontak & Link Video Profil berhasil diperbarui!');
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
          Perbarui slide banner beranda, foto slider, informasi sekolah, berita, dan agenda acara secara real-time.
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
      <div className="flex border-b border-slate-200 mb-8 space-x-2">
        <button
          onClick={() => setActiveTab('SLIDES')}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-xs border-b-2 transition-colors ${
            activeTab === 'SLIDES'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sliders size={16} />
          <span>Hero Slider Beranda ({slidesList.length})</span>
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
          <span>Identitas & Video Profil</span>
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
          <span>Berita & Pengumuman ({newsList.length})</span>
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
          <span>Agenda Acara ({eventsList.length})</span>
        </button>
      </div>

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
                  {/* Thumbnail Image Preview */}
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
                    
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 bg-slate-50 p-2.5 rounded-xl border">
                      <span>Tombol Utama: <strong>{slide.primaryCtaText}</strong> ({slide.primaryCtaLink})</span>
                    </div>
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

      {/* TAB 1: IDENTITAS & LINK VIDEO PROFIL */}
      {activeTab === 'SETTINGS' && (
        <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 max-w-4xl">
          <h2 className="text-xl font-bold text-slate-800 border-b pb-3">Informasi Kelembagaan & Video Profil</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Sekolah</label>
              <input 
                type="text" 
                value={settings.schoolName}
                onChange={(e) => setSettings({ ...settings, schoolName: e.target.value })}
                className="w-full px-3 py-2.5 border rounded-xl outline-none focus:border-emerald-500"
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

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5 text-emerald-700">
                <Video size={16} />
                Link Video Profil Beranda (YouTube Embed / Link YouTube)
              </label>
              <input 
                type="text" 
                placeholder="Contoh: https://www.youtube.com/watch?v=9E09XrFAi_s atau https://youtu.be/9E09XrFAi_s"
                value={settings.videoUrl}
                onChange={(e) => setSettings({ ...settings, videoUrl: e.target.value })}
                className="w-full px-3 py-2.5 border border-emerald-300 rounded-xl outline-none focus:border-emerald-500 font-mono text-[11px] bg-emerald-50/40"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Video ini akan diputar saat pengunjung mengklik tombol <strong>"Tonton Video Profil"</strong> di beranda utama.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Visi Utama Sekolah</label>
              <input 
                type="text" 
                value={settings.visi}
                onChange={(e) => setSettings({ ...settings, visi: e.target.value })}
                className="w-full px-3 py-2.5 border rounded-xl outline-none focus:border-emerald-500"
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
              <Save size={16} /> Simpan Perubahan Profil & Link Video
            </button>
          </div>
        </form>
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
                  rows={3} required placeholder="Tuliskan penjelas ringkas mengenai program / sekolah..."
                  value={slideDesc} onChange={(e) => setSlideDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teks Tombol Utama</label>
                  <input 
                    type="text" placeholder="Daftar SPMB Sekarang"
                    value={slidePrimaryText} onChange={(e) => setSlidePrimaryText(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Link Tombol Utama</label>
                  <input 
                    type="text" placeholder="/spmb"
                    value={slidePrimaryLink} onChange={(e) => setSlidePrimaryLink(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl outline-none font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teks Tombol Sekunder</label>
                  <input 
                    type="text" placeholder="Pelajari Lebih Lanjut"
                    value={slideSecondaryText} onChange={(e) => setSlideSecondaryText(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Link Tombol Sekunder</label>
                  <input 
                    type="text" placeholder="/profil"
                    value={slideSecondaryLink} onChange={(e) => setSlideSecondaryLink(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl outline-none font-mono text-[11px]"
                  />
                </div>
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
                <button type="button" onClick={() => setIsAddEventModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 font-bold">Batal</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow">Simpan Agenda</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
