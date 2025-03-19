import { supabase } from "./db";

/**
 * Fetch all movie titles with pagination, genre filtering, and image fallback
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
    console.log(`Fetching Titles: Page ${page}, Filters:`, { minYear, maxYear, query, genres }); // Logging for fetching titles

    let queryBuilder = supabase
      .from("titles")
      .select("id, title, synopsis, released, genre, image")
      .gte("released", minYear)
      .lte("released", maxYear)
      .order("title", { ascending: true })
      .range((page - 1) * 10, page * 10 - 1);

    if (query) queryBuilder = queryBuilder.ilike("title", `%${query}%`);
    if (genres.length > 0) queryBuilder = queryBuilder.in("genre", genres.map((g) => g.trim()));

    const { data: titles, error } = await queryBuilder;
    if (error) throw new Error(error.message);

    return {
      movies: titles.map((row) => ({
        ...row,
        image: row.image?.startsWith("http") ? row.image : "/images/default-movie.webp",
      })),
      totalMovies: titles.length,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch titles.");
  }
}

/**
 * Fetch all unique genres
 */
export async function fetchGenres(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from("titles")
      .select("genre")
      .neq("genre", null);

    if (error) throw new Error(error.message);

    const genreSet = new Set<string>();
    data.forEach((row) => {
      if (row.genre) {
        row.genre.split(",").forEach((g: string) => genreSet.add(g.trim()));
      }
    });

    return Array.from(genreSet);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch genres.");
  }
}

/**
 * Fetch user's favorite movies with pagination
 */
export async function fetchFavorites(page: number, userEmail: string) {
  try {
    console.log(`Fetching Favorites: Page ${page} for ${userEmail}`); // Logging for fetching favorites

    const { data: favorites, error: favError } = await supabase
      .from("favorites")
      .select("title_id")
      .eq("user_id", userEmail);

    if (favError) throw new Error(favError.message);
    const favoriteIds = favorites?.map((fav) => fav.title_id) ?? [];
    if (favoriteIds.length === 0) return { movies: [], totalMovies: 0 };

    const { data: titles, error: titleError } = await supabase
      .from("titles")
      .select("id, title, synopsis, released, genre, image")
      .in("id", favoriteIds)
      .order("released", { ascending: true })
      .range((page - 1) * 10, page * 10 - 1);

    if (titleError) throw new Error(titleError.message);

    return {
      movies: titles.map((row) => ({
        ...row,
        favorited: true,
        image: row.image?.startsWith("http") ? row.image : "/images/default-movie.webp",
      })),
      totalMovies: favoriteIds.length,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch favorites.");
  }
}

/**
 * Fetch user's watch later list with pagination
 */
export async function fetchWatchLaters(page: number, userEmail: string) {
  try {
    console.log(`⏳ Fetching Watch Later: Page ${page} for ${userEmail}`); // Logging for fetching watch-later

    const { data: watchLater, error } = await supabase
      .from("watchlater")
      .select("title_id")
      .eq("user_id", userEmail);

    if (error) throw new Error(error.message);
    const watchLaterIds = watchLater?.map((wl) => wl.title_id) ?? [];
    if (watchLaterIds.length === 0) return { movies: [], totalMovies: 0 };

    const { data: titles, error: titleError } = await supabase
      .from("titles")
      .select("id, title, synopsis, released, genre, image")
      .in("id", watchLaterIds)
      .order("released", { ascending: true })
      .range((page - 1) * 10, page * 10 - 1);

    if (titleError) throw new Error(titleError.message);

    return {
      movies: titles.map((row) => ({
        ...row,
        watchLater: true,
        image: row.image?.startsWith("http") ? row.image : "/images/default-movie.webp",
      })),
      totalMovies: watchLaterIds.length,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch watch later list.");
  }
}

/**
 * Utility Functions for Favorites & Watch Later
 */
export async function favoriteExists(title_id: string, userEmail: string): Promise<boolean> {
  const { data } = await supabase
    .from("favorites")
    .select("title_id")
    .eq("user_id", userEmail)
    .eq("title_id", title_id)
    .maybeSingle();

  return !!data;
}

export async function insertFavorite(title_id: string, userEmail: string) {
  await supabase.from("favorites").insert([{ title_id, user_id: userEmail }]);
}

export async function deleteFavorite(title_id: string, userEmail: string) {
  await supabase.from("favorites").delete().eq("title_id", title_id).eq("user_id", userEmail);
}

export async function watchLaterExists(title_id: string, userEmail: string): Promise<boolean> {
  const { data } = await supabase
    .from("watchlater")
    .select("title_id")
    .eq("user_id", userEmail)
    .eq("title_id", title_id)
    .maybeSingle();

  return !!data;
}

export async function insertWatchLater(title_id: string, userEmail: string) {
  await supabase.from("watchlater").insert([{ title_id, user_id: userEmail }]);
}

export async function deleteWatchLater(title_id: string, userEmail: string) {
  await supabase.from("watchlater").delete().eq("title_id", title_id).eq("user_id", userEmail);
}
