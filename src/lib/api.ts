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
        id: 1,
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
      const { data, error } = await supabase.from('site_settings').upsert(row);
      if (!error) return data || { status: 'success' };
    } catch (e) {}
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
      const row = {
        user_id: regData.userId || regData.user_id,
        nisn: regData.nisn || '',
        nik: regData.nik || '',
        birth_place: regData.birthPlace || regData.birth_place || '',
        birth_date: regData.birthDate || regData.birth_date || null,
        gender: regData.gender || 'L',
        address: regData.address || '',
        father_name: regData.fatherName || regData.father_name || '',
        mother_name: regData.motherName || regData.mother_name || '',
        parent_phone: regData.parentPhone || regData.parent_phone || '',
        previous_school: regData.previousSchool || regData.previous_school || '',
        status: regData.status || 'DRAFT',
        payment_status: regData.paymentStatus || regData.payment_status || 'UNPAID',
        payment_proof_url: regData.paymentProofUrl || regData.payment_proof_url || '',
        updated_at: new Date().toISOString(),
      };
      const { data, error } = await supabase.from('registrations').upsert(row, { onConflict: 'user_id' });
      if (!error) return data || { status: 'success' };
    } catch (e) {}
    return apiRequest('save_registration', regData);
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
        const rows = teachers.map((t: any) => ({
          id: t.id,
          name: t.name || '',
          role: t.role || '',
          mapel: t.mapel || '',
          strata: t.strata || 'S1',
          photo_url: t.photoUrl || t.photo_url || '',
        }));
        const { data, error } = await supabase.from('teachers').upsert(rows);
        if (!error) return data || { status: 'success' };
      }
    } catch (e) {}
    return apiRequest('save_teachers', teachers);
  },

  getCurriculum: async () => {
    try {
      const { data, error } = await supabase.from('curriculum').select('*').order('id', { ascending: true });
      if (!error && data) return data;
    } catch (e) {}
    return apiRequest('get_curriculum');
  },

  getActivities: async () => {
    try {
      const { data, error } = await supabase.from('activities').select('*').order('id', { ascending: false });
      if (!error && data) return data;
    } catch (e) {}
    return apiRequest('get_activities');
  },

  getFacilities: async () => {
    try {
      const { data, error } = await supabase.from('facilities').select('*').order('id', { ascending: true });
      if (!error && data) return data;
    } catch (e) {}
    return apiRequest('get_facilities');
  },

  getTestimonials: async () => {
    try {
      const { data, error } = await supabase.from('testimonials').select('*').order('id', { ascending: false });
      if (!error && data) return data;
    } catch (e) {}
    return apiRequest('get_testimonials');
  },

  getSlides: async () => {
    try {
      const { data, error } = await supabase.from('hero_slides').select('*').order('id', { ascending: true });
      if (!error && data) return data;
    } catch (e) {}
    return apiRequest('get_slides');
  },

  getNews: async () => {
    try {
      const { data, error } = await supabase.from('news').select('*').order('id', { ascending: false });
      if (!error && data) return data;
    } catch (e) {}
    return apiRequest('get_news');
  },

  getEvents: async () => {
    try {
      const { data, error } = await supabase.from('events').select('*').order('id', { ascending: false });
      if (!error && data) return data;
    } catch (e) {}
    return apiRequest('get_events');
  },
};
