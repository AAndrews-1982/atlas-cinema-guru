import { supabase } from "@/lib/db"; // ✅ Use Supabase client
import { titles } from "@/seed/titles";

export async function seedTitles() {
  // Ensure the "titles" table exists in Supabase (You must create tables manually in Supabase UI)
  for (const title of titles) {
    try {
      await supabase
        .from("titles")
        .insert([
          {
            id: title.id,
            title: title.title,
            synopsis: title.synopsis,
            released: title.released,
            genre: title.genre,
          },
        ])
        .eq("id", title.id)
        .select();
    } catch (error) {
      console.error("Error inserting title:", title.id, error);
    }
  }
}

export async function seedFavorites() {
  // Ensure the "favorites" table exists
  try {
    await supabase
      .from("favorites")
      .insert([
        {
          id: crypto.randomUUID(),
          title_id: "some-title-id",
          user_id: "some-user-id",
        },
      ])
      .select();
  } catch (error) {
    console.error("Error creating favorites table:", error);
  }
}

export async function seedWatchLater() {
  // Ensure the "watchLater" table exists
  try {
    await supabase
      .from("watchlater")
      .insert([
        {
          id: crypto.randomUUID(),
          title_id: "some-title-id",
          user_id: "some-user-id",
        },
      ])
      .select();
  } catch (error) {
    console.error("Error creating watch later table:", error);
  }
}

export async function seedActivity() {
  // Ensure the "activities" table exists
  try {
    await supabase
      .from("activities")
      .insert([
        {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          title_id: "some-title-id",
          user_id: "some-user-id",
          activity: "Watched a movie",
        },
      ])
      .select();
  } catch (error) {
    console.error("Error creating activities table:", error);
  }
}
