import { createClient } from "@supabase/supabase-js";

// Read env variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Log to confirm they exist
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase ANON Key:", supabaseAnonKey ? "Exists" : "Missing");

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase credentials. Check your environment variables.");
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface TitlesTable {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
}

export interface UsersTable {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface FavoritesTable {
  id: string;
  title_id: string;
  user_id: string;
}

export interface WatchLaterTable {
  id: string;
  title_id: string;
  user_id: string;
}

export interface ActivitiesTable {
  id: string;
  timestamp: Date;
  title_id: string;
  user_id: string;
  activity: "FAVORITED" | "WATCH_LATER";
}

// Ensure correct client export
export default supabase;
