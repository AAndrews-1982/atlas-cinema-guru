<<<<<<< HEAD
import { getSession } from "next-auth/react"; // Use getSession for authentication
=======
import { auth } from "@/auth";
>>>>>>> 25e2ed2 (still not able to load images)
import { fetchGenres, fetchTitles } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

// Types
interface TitlesQueryParams {
  page: number;
  minYear: number;
  maxYear: number;
  query: string;
  genres: string[];
}

// Constants
const CURRENT_YEAR = new Date().getFullYear();

// Utility functions
const parseQueryParams = async (params: URLSearchParams): Promise<TitlesQueryParams> => {
  const defaultGenres = await fetchGenres();
  
  return {
    page: params.get("page") ? Number(params.get("page")) : 1,
    minYear: params.get("minYear") ? Number(params.get("minYear")) : 0,
    maxYear: params.get("maxYear") ? Number(params.get("maxYear")) : CURRENT_YEAR,
    query: params.get("query") ?? "",
    genres: params.get("genres")?.split(",") ?? defaultGenres
  };
};

const validateParams = (params: TitlesQueryParams): { isValid: boolean; error?: string } => {
  if (isNaN(params.page) || params.page < 1) {
    return { isValid: false, error: "Invalid page number" };
  }
  
  if (isNaN(params.minYear) || params.minYear < 0) {
    return { isValid: false, error: "Invalid minimum year" };
  }
  
  if (isNaN(params.maxYear) || params.maxYear > CURRENT_YEAR) {
    return { isValid: false, error: "Invalid maximum year" };
  }
  
  if (params.minYear > params.maxYear) {
    return { isValid: false, error: "Minimum year cannot be greater than maximum year" };
  }
  
  return { isValid: true };
};

/**
 * GET /api/titles
<<<<<<< HEAD
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
=======
 * 
 * Fetches titles based on provided filters
 * @param req NextRequest object containing query parameters
 * @returns JSON response with titles or error message
 */
export const GET = auth(async (req: NextRequest) => {
  // Auth check
  const session = req.auth;
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized - Not logged in" },
      { status: 401 }
    );
  }

  try {
    // Parse query parameters
    const params = await parseQueryParams(req.nextUrl.searchParams);
    
    // Validate parameters
    const validation = validateParams(params);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Fetch titles
    const titles = await fetchTitles(
      params.page,
      params.minYear,
      params.maxYear,
      params.query,
      params.genres,
      session.user.email
    );

    return NextResponse.json({ 
      title: titles,
      metadata: {
        page: params.page,
        filters: {
          minYear: params.minYear,
          maxYear: params.maxYear,
          query: params.query,
          genres: params.genres
        }
      }
    });

  } catch (error) {
    console.error('Error fetching titles:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});
>>>>>>> 25e2ed2 (still not able to load images)
