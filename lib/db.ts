import { createClient } from "@supabase/supabase-js";

//Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Use Supabase pooled connection instead of direct connection
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Database {
  titles: TitlesTable;
  users: UsersTable;
  favorites: FavoritesTable;
  watchlater: WatchLaterTable;
  activities: ActivitiesTable;
}

export interface TitlesTable {
  id: Generated<string>;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
}

export interface UsersTable {
  id: Generated<string>;
  name: string;
  email: string;
  password: string;
}

export interface FavoritesTable {
  id: Generated<string>;
  title_id: string; // Removed Generated<string> to avoid auto-generation issues
  user_id: string;
}

export interface WatchLaterTable {
  id: Generated<string>;
  title_id: string;
  user_id: string;
}

export interface ActivitiesTable {
  id: Generated<string>;
  timestamp: Date;
  title_id: string;
  user_id: string;
  activity: "FAVORITED" | "WATCH_LATER";
}

//Ensure the correct client is exported
export default supabase;
