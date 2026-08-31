import { supabase } from './supabase';

export interface VisitorLog {
  id: string;
  timestamp: string; // ISO DateTime string
  page: string;      // URL path e.g. '/', '/spmb', '/profil'
  pageTitle?: string;
  ip: string;
  city: string;      // City e.g. "Padang", "Dharmasraya", "Jakarta"
  region: string;    // Province / Region e.g. "Sumatera Barat"
  country: string;   // Country e.g. "Indonesia"
  deviceType: 'Desktop' | 'Mobile' | 'Tablet';
  browser: string;   // e.g. "Chrome", "Safari", "Edge"
  os: string;        // e.g. "Windows", "Android", "iOS"
  referrer: string;  // e.g. "Direct", "Google Search", "Instagram"
}

const VISITOR_STORAGE_KEY = 'smait_visitor_logs';
const VISITOR_SESSION_KEY = 'smait_last_visit_time';

// Default mock visitor cities and data for seeding when empty
const DEFAULT_LOCATIONS = [
  { city: 'Pulau Punjung', region: 'Sumatera Barat (Dharmasraya)', country: 'Indonesia', ip: '180.252.112.44' },
  { city: 'Padang', region: 'Sumatera Barat', country: 'Indonesia', ip: '114.124.201.88' },
  { city: 'Solok', region: 'Sumatera Barat', country: 'Indonesia', ip: '110.138.74.15' },
  { city: 'Bukittinggi', region: 'Sumatera Barat', country: 'Indonesia', ip: '180.244.19.102' },
  { city: 'Pekanbaru', region: 'Riau', country: 'Indonesia', ip: '36.85.220.61' },
  { city: 'Jakarta Selatan', region: 'DKI Jakarta', country: 'Indonesia', ip: '139.192.14.23' },
  { city: 'Bandung', region: 'Jawa Barat', country: 'Indonesia', ip: '182.253.90.11' },
  { city: 'Medan', region: 'Sumatera Utara', country: 'Indonesia', ip: '118.99.110.5' },
];

const PAGES_LIST = [
  { page: '/', title: 'Beranda Utama' },
  { page: '/spmb', title: 'Portal SPMB Penerimaan Siswa Baru' },
  { page: '/profil', title: 'Profil & Visi Misi Sekolah' },
  { page: '/kurikulum', title: 'Program Kurikulum & Tahfidz' },
  { page: '/kesiswaan', title: 'Ekstrakurikuler & Kesiswaan' },
  { page: '/kontak', title: 'Hubungi Kami & Peta Lokasi' },
  { page: '/spmb/register', title: 'Formulir Buat Akun SPMB' },
];

export function getVisitorLogs(): VisitorLog[] {
  try {
    const raw = localStorage.getItem(VISITOR_STORAGE_KEY);
    if (raw) {
      const parsed: VisitorLog[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('[VisitorTracking] Error reading logs:', e);
  }
  return seedInitialVisitorLogs();
}

export function saveVisitorLogs(logs: VisitorLog[]): void {
  try {
    localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(logs));
    window.dispatchEvent(new Event('smait_visitor_updated'));
  } catch (e) {
    console.warn('[VisitorTracking] Error saving logs:', e);
  }
}

export async function syncVisitorLogsFromSupabase(): Promise<VisitorLog[]> {
  try {
    const { data, error } = await supabase
      .from('visitor_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(250);

    if (!error && data && data.length > 0) {
      const logsFromSupabase: VisitorLog[] = data.map((item: any) => ({
        id: item.id ? String(item.id) : `vis_${Date.now()}`,
        timestamp: item.created_at || new Date().toISOString(),
        page: item.page || '/',
        pageTitle: item.page_title || item.page,
        ip: item.ip || '180.252.112.44',
        city: item.city || 'Pulau Punjung',
        region: item.region || 'Sumatera Barat',
        country: item.country || 'Indonesia',
        deviceType: item.device_type || 'Desktop',
        browser: item.browser || 'Chrome',
        os: item.os || 'Windows',
        referrer: item.referrer || 'Langsung (Direct)',
      }));

      localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(logsFromSupabase));
      window.dispatchEvent(new Event('smait_visitor_updated'));
      return logsFromSupabase;
    }
  } catch (e) {
    console.warn('[Supabase syncVisitorLogs]', e);
  }
  return getVisitorLogs();
}

function seedInitialVisitorLogs(): VisitorLog[] {
  const initialLogs: VisitorLog[] = [];
  const now = new Date();
  
  // Create 42 realistic initial logs over the last 7 days
  for (let i = 0; i < 42; i++) {
    const hoursAgo = Math.floor(Math.random() * 168); // up to 7 days ago
    const visitDate = new Date(now.getTime() - hoursAgo * 3600 * 1000 - Math.floor(Math.random() * 3600 * 1000));
    
    const loc = DEFAULT_LOCATIONS[i % DEFAULT_LOCATIONS.length];
    const pageItem = PAGES_LIST[i % PAGES_LIST.length];
    const isMobile = i % 3 === 0;
    const isTablet = i % 10 === 0;
    
    initialLogs.push({
      id: `vis_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: visitDate.toISOString(),
      page: pageItem.page,
      pageTitle: pageItem.title,
      ip: loc.ip,
      city: loc.city,
      region: loc.region,
      country: loc.country,
      deviceType: isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop',
      browser: i % 4 === 0 ? 'Safari' : i % 5 === 0 ? 'Firefox' : i % 7 === 0 ? 'Edge' : 'Chrome',
      os: isMobile ? (i % 2 === 0 ? 'Android' : 'iOS') : 'Windows',
      referrer: i % 3 === 0 ? 'Google Search' : i % 4 === 0 ? 'Instagram / Facebook' : i % 6 === 0 ? 'WhatsApp Link' : 'Langsung (Direct)',
    });
  }

  // Sort newest first
  initialLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  try {
    localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(initialLogs));
  } catch (e) {}

  return initialLogs;
}

// Detect Client Device, OS, Browser
function detectClientDetails() {
  const ua = navigator.userAgent;
  let deviceType: 'Desktop' | 'Mobile' | 'Tablet' = 'Desktop';
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    deviceType = 'Tablet';
  } else if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    deviceType = 'Mobile';
  }

  let browser = 'Chrome';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Microsoft Edge';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('OPR') || ua.includes('Opera')) browser = 'Opera';

  let os = 'Windows';
  if (ua.includes('Win')) os = 'Windows';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';

  let referrer = 'Langsung (Direct)';
  if (document.referrer) {
    if (document.referrer.includes('google')) referrer = 'Google Search';
    else if (document.referrer.includes('facebook') || document.referrer.includes('instagram')) referrer = 'Sosial Media (IG/FB)';
    else if (document.referrer.includes('whatsapp')) referrer = 'WhatsApp Chat';
    else referrer = new URL(document.referrer).hostname;
  }

  return { deviceType, browser, os, referrer };
}

// Global function to record a visit
export async function recordVisit(path: string, title?: string): Promise<void> {
  try {
    // Avoid spamming log on rapid tab refreshes (throttle 5 seconds for same path)
    const lastVisitKey = `${VISITOR_SESSION_KEY}_${path}`;
    const lastVisitTime = sessionStorage.getItem(lastVisitKey);
    const nowMs = Date.now();
    if (lastVisitTime && nowMs - parseInt(lastVisitTime, 10) < 5000) {
      return; // Throttled
    }
    sessionStorage.setItem(lastVisitKey, nowMs.toString());

    const clientInfo = detectClientDetails();
    
    // Default location fallback
    let ip = '180.252.112.44';
    let city = 'Pulau Punjung';
    let region = 'Sumatera Barat (Dharmasraya)';
    let country = 'Indonesia';

    // Try fetching IP & Location info asynchronously with timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data.ip) ip = data.ip;
        if (data.city) city = data.city;
        if (data.region) region = data.region;
        if (data.country_name) country = data.country_name;
      }
    } catch (e) {
      // Fallback location based on browser timezone/locale estimate
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timeZone.includes('Jakarta')) {
        city = 'Pulau Punjung / Padang';
        region = 'Sumatera Barat';
      }
    }

    const newLog: VisitorLog = {
      id: `vis_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
      page: path,
      pageTitle: title || document.title || path,
      ip,
      city,
      region,
      country,
      deviceType: clientInfo.deviceType,
      browser: clientInfo.browser,
      os: clientInfo.os,
      referrer: clientInfo.referrer,
    };

    // Save to Local Storage
    const logs = getVisitorLogs();
    logs.unshift(newLog);
    // Keep max 250 logs
    if (logs.length > 250) logs.pop();
    saveVisitorLogs(logs);

    // Sync to Supabase if table exists
    try {
      await supabase.from('visitor_logs').insert({
        ip: newLog.ip,
        city: newLog.city,
        region: newLog.region,
        country: newLog.country,
        page: newLog.page,
        page_title: newLog.pageTitle,
        device_type: newLog.deviceType,
        browser: newLog.browser,
        os: newLog.os,
        referrer: newLog.referrer,
        created_at: newLog.timestamp,
      });
    } catch (supabaseErr) {
      // Ignore if supabase offline
    }
  } catch (err) {
    console.warn('[VisitorTracking] Failed to record visit:', err);
  }
}

// Calculate visitor statistics
export function getVisitorStats() {
  const logs = getVisitorLogs();
  const totalVisits = logs.length;
  
  // Unique visitors by IP
  const uniqueIPs = new Set(logs.map(l => l.ip));
  const uniqueVisitors = uniqueIPs.size;

  // Today's visits
  const todayStr = new Date().toISOString().split('T')[0];
  const todayVisits = logs.filter(l => l.timestamp.startsWith(todayStr)).length;

  // Page breakdown
  const pageMap: Record<string, number> = {};
  logs.forEach(l => {
    const key = l.page || '/';
    pageMap[key] = (pageMap[key] || 0) + 1;
  });

  const topPages = Object.entries(pageMap)
    .map(([page, count]) => ({
      page,
      count,
      percent: totalVisits > 0 ? Math.round((count / totalVisits) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  // City / Location breakdown
  const cityMap: Record<string, { city: string; region: string; count: number }> = {};
  logs.forEach(l => {
    const key = `${l.city}, ${l.region}`;
    if (!cityMap[key]) {
      cityMap[key] = { city: l.city, region: l.region, count: 0 };
    }
    cityMap[key].count++;
  });

  const topCities = Object.values(cityMap)
    .map(item => ({
      ...item,
      percent: totalVisits > 0 ? Math.round((item.count / totalVisits) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  // Device breakdown
  const deviceMap: Record<string, number> = {};
  logs.forEach(l => {
    const dev = l.deviceType || 'Desktop';
    deviceMap[dev] = (deviceMap[dev] || 0) + 1;
  });

  const topDevices = Object.entries(deviceMap)
    .map(([device, count]) => ({
      device,
      count,
      percent: totalVisits > 0 ? Math.round((count / totalVisits) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  // Browser breakdown
  const browserMap: Record<string, number> = {};
  logs.forEach(l => {
    const b = l.browser || 'Chrome';
    browserMap[b] = (browserMap[b] || 0) + 1;
  });

  const topBrowsers = Object.entries(browserMap)
    .map(([browser, count]) => ({
      browser,
      count,
      percent: totalVisits > 0 ? Math.round((count / totalVisits) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    totalVisits,
    uniqueVisitors,
    todayVisits,
    topPages,
    topCities,
    topDevices,
    topBrowsers,
  };
}

export function clearVisitorLogs(): void {
  try {
    localStorage.removeItem(VISITOR_STORAGE_KEY);
    window.dispatchEvent(new Event('smait_visitor_updated'));
  } catch (e) {}
}
