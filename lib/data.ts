import { supabase } from "./db";

/**
 * Fetch all unique genres
 */
export async function fetchGenres(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from("titles")
      .select("genre")
      .neq("genre", null); // Ensure no null values

    if (error) throw new Error(error.message);

    // Handle multiple genres stored as a single string (comma-separated)
    const genreSet = new Set<string>();
    data.forEach((row) => {
      if (row.genre) {
        row.genre.split(",").forEach((g: string) => genreSet.add(g.trim()));
      }
    });

    const uniqueGenres = Array.from(genreSet); // Convert Set to Array
    console.log("Fetched Genres:", uniqueGenres); // Debugging Log

    return uniqueGenres;
  } catch (error) {
    console.error("Database Error in fetchGenres:", error);
    throw new Error("Failed to fetch genres.");
  }
}

/**
 * Fetch user activities
 */
export async function fetchActivities(userEmail: string, page: number = 1) {
  try {
    console.log("Fetching activities for user:", userEmail);

    const { data: activities, error } = await supabase
      .from("activities")
      .select("*")
      .eq("user_id", userEmail)
      .order("timestamp", { ascending: false })
      .range((page - 1) * 10, page * 10 - 1);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error(error.message);
    }

    console.log("Fetched activities:", activities);
    return activities;
  } catch (error) {
    console.error("Database Error in fetchActivities:", error.message);
    throw new Error("Failed to fetch activities.");
  }
}

/**
 * Fetch all movie titles with genre filtering
 */
export async function fetchTitles(
  page: number,
  minYear: number,
  maxYear: number,
  query: string,
  genres: string[],
  userEmail: string
) {
  try {
    let queryBuilder = supabase
      .from("titles")
      .select("id, title, synopsis, released, genre, image")
      .gte("released", minYear)
      .lte("released", maxYear)
      .order("title", { ascending: true })
      .range((page - 1) * 6, page * 6 - 1);

    if (query) queryBuilder = queryBuilder.ilike("title", `%${query}%`);

    // Ensure genres are properly filtered
    if (genres.length > 0) {
      queryBuilder = queryBuilder.in("genre", genres.map((g) => g.trim()));
    }

    const { data: titles, error } = await queryBuilder;
    if (error) throw new Error(error.message);

    console.log("🎬 Fetched Titles:", titles.map((m) => m.genre));

    return titles.map((row) => ({
      ...row,
      image: row.image ?? "/images/default-movie.webp",
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch titles.");
  }
}

/**
 * Fetch user's favorite movies
 */
export async function fetchFavorites(page: number, userEmail: string) {
  try {
    const { data: favorites, error } = await supabase
      .from("favorites")
      .select("title_id")
      .eq("user_id", userEmail);

    if (error) throw new Error(error.message);

    const favoriteIds = favorites?.map((fav) => fav.title_id) ?? [];
    if (favoriteIds.length === 0) return [];

    const { data: titles, error: titleError } = await supabase
      .from("titles")
      .select("id, title, synopsis, released, genre, image")
      .in("id", favoriteIds)
      .order("released", { ascending: true })
      .range((page - 1) * 6, page * 6 - 1);

    if (titleError) throw new Error(titleError.message);

    return titles.map((row) => ({
      ...row,
      favorited: true,
      image: row.image ?? "/images/default-movie.webp",
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch favorites.");
  }
}

/**
 * Check if a movie is already in favorites
 */
export async function favoriteExists(title_id: string, userEmail: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("favorites")
      .select("title_id")
      .eq("user_id", userEmail)
      .eq("title_id", title_id)
      .maybeSingle();

    if (error) {
      console.error("Database Error:", error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error("Unexpected error in favoriteExists:", error);
    return false;
  }
}

/**
 * Add a movie to favorites
 */
export async function insertFavorite(title_id: string, userEmail: string) {
  try {
    const { error } = await supabase
      .from("favorites")
      .insert([{ title_id, user_id: userEmail }]);

    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add favorite.");
  }
}

/**
 * Check if a movie is already in the watch later list
 */
export async function watchLaterExists(title_id: string, userEmail: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("watchlater")
      .select("title_id")
      .eq("user_id", userEmail)
      .eq("title_id", title_id)
      .maybeSingle();

    if (error) {
      console.error("Database Error:", error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error("Unexpected error in watchLaterExists:", error);
    return false;
  }
}

/**
 * Add a movie to the watch later list
 */
export async function insertWatchLater(title_id: string, userEmail: string) {
  try {
    const { error } = await supabase.from("watchlater").insert([{ title_id, user_id: userEmail }]);
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add watch later.");
  }
}

/**
 * Fetch user's watch later list
 */
export async function fetchWatchLaters(page: number, userEmail: string) {
  try {
    const { data: watchLater, error } = await supabase
      .from("watchlater")
      .select("title_id")
      .eq("user_id", userEmail);

    if (error) throw new Error(error.message);

    const watchLaterIds = watchLater?.map((wl) => wl.title_id) ?? [];
    if (watchLaterIds.length === 0) return [];

    const { data: titles, error: titleError } = await supabase
      .from("titles")
      .select("id, title, synopsis, released, genre, image")
      .in("id", watchLaterIds)
      .order("released", { ascending: true })
      .range((page - 1) * 6, page * 6 - 1);

    if (titleError) throw new Error(titleError.message);

    return titles.map((row) => ({
      ...row,
      watchLater: true,
      image: row.image ?? "/images/default-movie.webp",
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch watch later list.");
  }
}

/**
 * Remove a movie from favorites
 */
export async function deleteFavorite(title_id: string, userEmail: string) {
  try {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("title_id", title_id)
      .eq("user_id", userEmail);

    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete favorite.");
  }
}

/**
 * Remove a movie from watch later list
 */
export async function deleteWatchLater(title_id: string, userEmail: string) {
  try {
    const { error } = await supabase
      .from("watchlater")
      .delete()
      .eq("title_id", title_id)
      .eq("user_id", userEmail);

    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to remove from watch later.");
  }
}

export {
  fetchTitles,
  fetchGenres,
  fetchActivities,
  fetchFavorites,
  favoriteExists,
  insertFavorite,
  fetchWatchLaters,
  watchLaterExists,
  insertWatchLater,
  deleteFavorite,
  deleteWatchLater
};