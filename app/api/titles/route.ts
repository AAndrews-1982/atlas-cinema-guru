import { getSession } from "next-auth/react"; // Use getSession for authentication
import { fetchGenres, fetchTitles } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/titles
 * Retrieves a list of titles based on the provided search criteria and user's email.
 */
export const GET = async (req: NextRequest) => {
  const session = await getSession({ req });
  if (!session?.user?.email) {
    return NextResponse.redirect(new URL('/401', req.url), 401);
  }

  const email = session.user.email;
  const params = req.nextUrl.searchParams;

  // More explicit handling of default values
  const page = parseInt(params.get("page") ?? "1");
  const minYear = parseInt(params.get("minYear") ?? "0");
  const maxYear = parseInt(params.get("maxYear") ?? `${new Date().getFullYear()}`);
  const query = params.get("query") ?? "";
  const genres = params.get("genres") ? params.get("genres").split(",") : await fetchGenres(); // Fetch default genres if not specified

  try {
    const titles = await fetchTitles(page, minYear, maxYear, query, genres, email);
    return NextResponse.json({ titles });
  } catch (error) {
    console.error("Error fetching titles:", error);
    return NextResponse.json(
      { error: "Failed to fetch titles due to a server error." },
      { status: 500 }
    );
  }
};
