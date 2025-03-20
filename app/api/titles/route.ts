import { auth } from "@/auth";
import { fetchGenres } from "@/lib/data";
import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/titles
 */
export const GET = async (req: NextRequest) => {
  try {
    // Log request params for debugging
    const params = req.nextUrl.searchParams;
    console.log("Incoming Request Params:", params.toString());

    // Authentication check
    const session = await auth();
    console.log("Session in /api/titles:", session);

    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized - Not logged in" },
        { status: 401 }
      );
    }

    const email = session.user.email;
    const page = Number(params.get("page") ?? 1);
    const minYear = 2023;
    const maxYear = 2024;
    const query = params.get("query") ?? "";
    const genres = params.get("genres")?.split(",") ?? (await fetchGenres());

    // Fetch total count of titles
    const { count: totalMovies, error: countError } = await supabase
      .from("titles")
      .select("*", { count: "exact", head: true }) // Use head: true for count optimization
      .gte("released", minYear)
      .lte("released", maxYear);

    if (countError) throw countError;

    // Fetch paginated titles
    const start = (page - 1) * 10;
    const end = start + 9; // Fix pagination range
    let supabaseQuery = supabase
      .from("titles")
      .select("*")
      .gte("released", minYear)
      .lte("released", maxYear)
      .range(start, end);

    // Apply filters
    if (query) {
      supabaseQuery = supabaseQuery.ilike("title", `%${query}%`);
    }
    if (genres.length > 0 && genres[0] !== "") {
      supabaseQuery = supabaseQuery.in("genre", genres);
    }

    const { data, error } = await supabaseQuery;

    if (error) throw error;

    return NextResponse.json({ titles: data, totalMovies }); // Return `totalMovies`
  } catch (error) {
    console.error("Error fetching titles:", error);
    return NextResponse.json({ error: "Failed to fetch titles" }, { status: 500 });
  }
};
