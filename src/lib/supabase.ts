import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wxlgzolegkykucrhbxzs.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bGd6b2xlZ2t5a3VjcmhieHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NDMxMDMsImV4cCI6MjEwMzMxOTEwM30.jQ2xTHtvgiFe4-vtKTrw-72FJVWm50IzjMqea-G7kv4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
