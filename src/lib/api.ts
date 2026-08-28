import { supabase } from './supabase';

const API_BASE = import.meta.env.VITE_API_URL || '/api/index.php';

async function apiRequest<T = any>(action: string, data?: any): Promise<T | null> {
  try {
    const url = `${API_BASE}?action=${action}`;
    const options: RequestInit = data
      ? {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      : { method: 'GET' };

    const res = await fetch(url, options);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  } catch (err) {
    console.warn(`[API Client] Failed to fetch action "${action}":`, err);
    return null;
  }
}

// Helper to reconcile deletions in Supabase for array-based tables
async function reconcileDeletions(tableName: string, currentItems: any[]) {
  try {
    const { data: existing } = await supabase.from(tableName).select('id');
    if (existing && Array.isArray(existing)) {
      const currentIds = currentItems.map((item) => Number(item.id)).filter((id) => id && id < 1000000000000);
      const toDelete = existing.map((r: any) => Number(r.id)).filter((id: number) => !currentIds.includes(id));
      if (toDelete.length > 0) {
        await supabase.from(tableName).delete().in('id', toDelete);
      }
    }
  } catch (e) {
    console.warn(`[Supabase Delete Sync] Table "${tableName}":`, e);
  }
}

export const api = {
  ping: async () => {
    try {
      const { data, error } = await supabase.from('site_settings').select('id').limit(1);
      if (!error) {
        return { status: 'success', connected: true, message: 'Terhubung ke Supabase PostgreSQL database!' };
      }
    } catch (e) {}
    return apiRequest('ping');
  },

  getUsers: async () => {
    try {
      const { data, error } = await supabase.from('users').select('*').order('id', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return apiRequest('get_users');
  },

  saveUser: async (user: any) => {
    try {
      const payload = {
        name: user.name,
        email: user.email,
        role: user.role || 'STUDENT',
        password: user.password || 'password123',
      };

      const { data: existing } = await supabase.from('users').select('id').eq('email', user.email.trim()).maybeSingle();
      if (existing) {
        const { data, error } = await supabase.from('users').update(payload).eq('email', user.email.trim()).select().single();
        if (!error && data) return data;
      } else {
        const { data, error } = await supabase.from('users').insert(payload).select().single();
        if (!error && data) return data;
      }
    } catch (e) {
      console.warn('[Supabase saveUser]', e);
    }
    return apiRequest('save_user', user);
  },

  login: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, name, email, role')
        .eq('email', email.trim())
        .eq('password', password.trim())
        .maybeSingle();

      if (!error && data) {
        return data;
      }
    } catch (e) {}
    return apiRequest('login', { email, password });
  },

  getSettings: async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('id', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        return data;
      }
    } catch (e) {}
    return apiRequest('get_settings');
  },

  saveSettings: async (settings: any) => {
    try {
      const row = {
        school_name: settings.schoolName || settings.school_name || 'SMA IT Andalas Cendekia',
        tagline: settings.tagline || 'Sekolah Generasi Pemimpin Qur’ani',
        visi: settings.visi || '',
        address: settings.address || '',
        phone: settings.phone || '',
        email: settings.email || '',
        website: settings.website || '',
        npsn: settings.npsn || '20104766',
        accreditation: settings.accreditation || 'Akreditasi A',
        video_url: settings.videoUrl || settings.video_url || '',
        facebook_url: settings.facebookUrl || settings.facebook_url || '',
        instagram_url: settings.instagramUrl || settings.instagram_url || '',
        youtube_url: settings.youtubeUrl || settings.youtube_url || '',
        principal_name: settings.principalName || settings.principal_name || '',
        principal_title: settings.principalTitle || settings.principal_title || '',
        principal_message: settings.principalMessage || settings.principal_message || '',
        principal_photo_url: settings.principalPhotoUrl || settings.principal_photo_url || '',
        history_text: settings.historyText || settings.history_text || '',
        updated_at: new Date().toISOString(),
      };

      const { data: existing } = await supabase.from('site_settings').select('id').limit(1).maybeSingle();
      if (existing) {
        const { data, error } = await supabase.from('site_settings').update(row).eq('id', existing.id).select();
        if (!error) return data || { status: 'success' };
      } else {
        const { data, error } = await supabase.from('site_settings').insert(row).select();
        if (!error) return data || { status: 'success' };
      }
    } catch (e) {
      console.warn('[Supabase saveSettings]', e);
    }
    return apiRequest('save_settings', settings);
  },

  getRegistrations: async () => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*, users(name, email)')
        .order('id', { ascending: false });

      if (!error && data) {
        return data.map((r: any) => ({
          ...r,
          user_name: r.users?.name || '',
          user_email: r.users?.email || '',
        }));
      }
    } catch (e) {}
    return apiRequest('get_registrations');
  },

  saveRegistration: async (regData: any) => {
    try {
      const userId = regData.userId || regData.user_id;
      const row: any = {
        user_id: userId,
        nisn: regData.nisn || '',
        nik: regData.nik || '',
        birth_place: regData.birthPlace || regData.birth_place || '',
        birth_date: (regData.birthDate && String(regData.birthDate).trim()) || (regData.birth_date && String(regData.birth_date).trim()) || null,
        gender: regData.gender || 'L',
        address: regData.address || '',
        father_name: regData.fatherName || regData.father_name || '',
        mother_name: regData.motherName || regData.mother_name || '',
        parent_phone: regData.parentPhone || regData.parent_phone || '',
        previous_school: regData.previousSchool || regData.previous_school || '',
        status: regData.status || 'DRAFT',
        rejection_reason: regData.rejectionReason || regData.rejection_reason || '',
        payment_status: regData.paymentStatus || regData.payment_status || 'UNPAID',
        payment_proof_url: regData.paymentProofUrl || regData.payment_proof_url || '',
        updated_at: new Date().toISOString(),
      };

      const { data: existing } = await supabase.from('registrations').select('id').eq('user_id', userId).maybeSingle();
      if (existing) {
        const { data, error } = await supabase.from('registrations').update(row).eq('user_id', userId).select();
        if (!error) return data || { status: 'success' };
      } else {
        const { data, error } = await supabase.from('registrations').insert(row).select();
        if (!error) return data || { status: 'success' };
      }
    } catch (e) {
      console.warn('[Supabase saveRegistration]', e);
    }
    return apiRequest('save_registration', regData);
  },

  deleteRegistration: async (id: number) => {
    try {
      const { error } = await supabase.from('registrations').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {}
    return apiRequest('delete_registration', { id });
  },

  getTeachers: async () => {
    try {
      const { data, error } = await supabase.from('teachers').select('*').order('id', { ascending: true });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {}
    return apiRequest('get_teachers');
  },

  saveTeachers: async (teachers: any[]) => {
    try {
      if (Array.isArray(teachers)) {
        await reconcileDeletions('teachers', teachers);
        for (const t of teachers) {
          const row = {
            name: t.name || '',
            role: t.role || '',
            mapel: t.mapel || '',
            strata: t.strata || 'S1',
            photo_url: t.photoUrl || t.photo_url || '',
          };
          if (t.id && Number(t.id) < 1000000000000) {
            await supabase.from('teachers').update(row).eq('id', t.id);
          } else {
            await supabase.from('teachers').insert(row);
          }
        }
        return { status: 'success' };
      }
    } catch (e) {
      console.warn('[Supabase saveTeachers]', e);
    }
    return apiRequest('save_teachers', teachers);
  },

  getCurriculum: async () => {
    try {
      const { data, error } = await supabase.from('curriculum').select('*').order('id', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return apiRequest('get_curriculum');
  },

  saveCurriculum: async (curriculum: any[]) => {
    try {
      if (Array.isArray(curriculum)) {
        await reconcileDeletions('curriculum', curriculum);
        for (const c of curriculum) {
          const row = {
            title: c.title,
            type: c.type,
            target: c.target,
            description: c.description,
            badge_color: c.badgeColor || c.badge_color || 'bg-emerald-600',
          };
          if (c.id && Number(c.id) < 1000000000000) {
            await supabase.from('curriculum').update(row).eq('id', c.id);
          } else {
            await supabase.from('curriculum').insert(row);
          }
        }
        return { status: 'success' };
      }
    } catch (e) {}
    return apiRequest('save_curriculum', curriculum);
  },

  getActivities: async () => {
    try {
      const { data, error } = await supabase.from('activities').select('*').order('id', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return apiRequest('get_activities');
  },

  saveActivities: async (activities: any[]) => {
    try {
      if (Array.isArray(activities)) {
        await reconcileDeletions('activities', activities);
        for (const a of activities) {
          const row = {
            title: a.title,
            type: a.type,
            category: a.category,
            date: a.date,
            student_name: a.studentName || a.student_name,
            achievement_badge: a.achievementBadge || a.achievement_badge,
            description: a.description,
            image_url: a.imageUrl || a.image_url,
          };
          if (a.id && Number(a.id) < 1000000000000) {
            await supabase.from('activities').update(row).eq('id', a.id);
          } else {
            await supabase.from('activities').insert(row);
          }
        }
        return { status: 'success' };
      }
    } catch (e) {}
    return apiRequest('save_activities', activities);
  },

  getFacilities: async () => {
    try {
      const { data, error } = await supabase.from('facilities').select('*').order('id', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return apiRequest('get_facilities');
  },

  saveFacilities: async (facilities: any[]) => {
    try {
      if (Array.isArray(facilities)) {
        await reconcileDeletions('facilities', facilities);
        for (const f of facilities) {
          const row = {
            title: f.title,
            category: f.category,
            description: f.description,
            image_url: f.imageUrl || f.image_url,
          };
          if (f.id && Number(f.id) < 1000000000000) {
            await supabase.from('facilities').update(row).eq('id', f.id);
          } else {
            await supabase.from('facilities').insert(row);
          }
        }
        return { status: 'success' };
      }
    } catch (e) {}
    return apiRequest('save_facilities', facilities);
  },

  getTestimonials: async () => {
    try {
      const { data, error } = await supabase.from('testimonials').select('*').order('id', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return apiRequest('get_testimonials');
  },

  saveTestimonials: async (testimonials: any[]) => {
    try {
      if (Array.isArray(testimonials)) {
        await reconcileDeletions('testimonials', testimonials);
        for (const t of testimonials) {
          const row = {
            name: t.name,
            role: t.role,
            rating: t.rating || 5,
            quote: t.quote,
            avatar_url: t.avatarUrl || t.avatar_url,
            time_ago: t.timeAgo || t.time_ago,
          };
          if (t.id && Number(t.id) < 1000000000000) {
            await supabase.from('testimonials').update(row).eq('id', t.id);
          } else {
            await supabase.from('testimonials').insert(row);
          }
        }
        return { status: 'success' };
      }
    } catch (e) {}
    return apiRequest('save_testimonials', testimonials);
  },

  getSlides: async () => {
    try {
      const { data, error } = await supabase.from('hero_slides').select('*').order('id', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return apiRequest('get_slides');
  },

  saveSlides: async (slides: any[]) => {
    try {
      if (Array.isArray(slides)) {
        await reconcileDeletions('hero_slides', slides);
        for (const s of slides) {
          const row = {
            badge: s.badge,
            title: s.title,
            description: s.description,
            image_url: s.imageUrl || s.image_url,
            primary_cta_text: s.primaryCtaText || s.primary_cta_text,
            primary_cta_link: s.primaryCtaLink || s.primary_cta_link,
            secondary_cta_text: s.secondaryCtaText || s.secondary_cta_text,
            secondary_cta_link: s.secondaryCtaLink || s.secondary_cta_link,
          };
          if (s.id && Number(s.id) < 1000000000000) {
            await supabase.from('hero_slides').update(row).eq('id', s.id);
          } else {
            await supabase.from('hero_slides').insert(row);
          }
        }
        return { status: 'success' };
      }
    } catch (e) {}
    return apiRequest('save_slides', slides);
  },

  getNews: async () => {
    try {
      const { data, error } = await supabase.from('news').select('*').order('id', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return apiRequest('get_news');
  },

  saveNews: async (news: any[]) => {
    try {
      if (Array.isArray(news)) {
        await reconcileDeletions('news', news);
        for (const item of news) {
          const row = {
            title: item.title,
            category: item.category,
            date: item.date,
            author: item.author || 'Admin',
            comments_count: item.commentsCount || item.comments_count || 0,
            image_url: item.imageUrl || item.image_url,
            excerpt: item.excerpt,
            content: item.content,
          };
          if (item.id && Number(item.id) < 1000000000000) {
            await supabase.from('news').update(row).eq('id', item.id);
          } else {
            await supabase.from('news').insert(row);
          }
        }
        return { status: 'success' };
      }
    } catch (e) {}
    return apiRequest('save_news', news);
  },

  getEvents: async () => {
    try {
      const { data, error } = await supabase.from('events').select('*').order('id', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {}
    return apiRequest('get_events');
  },

  saveEvents: async (events: any[]) => {
    try {
      if (Array.isArray(events)) {
        await reconcileDeletions('events', events);
        for (const e of events) {
          const row = {
            day: e.day,
            month: e.month,
            title: e.title,
            time: e.time,
            location: e.location,
            category: e.category,
            description: e.description,
            organizer: e.organizer,
          };
          if (e.id && Number(e.id) < 1000000000000) {
            await supabase.from('events').update(row).eq('id', e.id);
          } else {
            await supabase.from('events').insert(row);
          }
        }
        return { status: 'success' };
      }
    } catch (e) {}
    return apiRequest('save_events', events);
  },
};
