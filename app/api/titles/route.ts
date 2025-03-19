import { auth } from "@/auth";
import { fetchGenres } from "@/lib/data";
import { supabase } from "@/lib/db"; // import Supabase
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/titles
 */
export const GET = async (req: NextRequest) => {
  const session = await auth(); // Use `auth()` to fetch user session
  
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized - Not logged in" },
      { status: 401 }
    );
  }

  const email = session.user.email;
  const params = req.nextUrl.searchParams;
  const page = Number(params.get("page") ?? 1);
  const minYear = 2023;
  const maxYear = 2024;
  const query = params.get("query") ?? "";
  const genres = params.get("genres")?.split(",") ?? (await fetchGenres());

  try {
    // Fetch titles from Supabase
    let supabaseQuery = supabase
      .from("titles")
      .select("*")
      .gte("released", minYear)
      .lte("released", maxYear);

    if (query) {
      supabaseQuery = supabaseQuery.ilike("title", `%${query}%`);
    }

    if (genres.length > 0) {
      supabaseQuery = supabaseQuery.in("genre", genres);
    }

    // Pagination (increase results per page if needed)
    const start = (page - 1) * 10;
    const end = start + 9;
    const { data, error } = await supabaseQuery.range(start, end);

    if (error) throw error;

    return NextResponse.json({ titles: data });
  } catch (error) {
    console.error("Error fetching titles:", error);
    return NextResponse.json({ error: "Failed to fetch titles" }, { status: 500 });
  }
};
