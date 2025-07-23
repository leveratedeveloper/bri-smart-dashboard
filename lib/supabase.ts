import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    // In a real app, you might want to show a more user-friendly error page.
    throw new Error("Supabase URL and Anon Key are not set in environment variables.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);