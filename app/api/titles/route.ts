import { getSession } from "next-auth/react";
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
 * Retrieves a list of titles based on the provided search criteria and user's email.
 * @param req - NextRequest object containing query parameters
 * @returns JSON response with titles or error message
 */
export const GET = async (req: NextRequest) => {
  // Authenticate user
  const session = await getSession({ req });
  if (!session?.user?.email) {
    return NextResponse.redirect(new URL('/401', req.url), 401);
  }

  try {
    // Parse and validate query parameters
    const params = await parseQueryParams(req.nextUrl.searchParams);
    const validation = validateParams(params);

    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Fetch titles based on validated parameters and user email
    const titles = await fetchTitles(
      params.page,
      params.minYear,
      params.maxYear,
      params.query,
      params.genres,
      session.user.email
    );

    return NextResponse.json({ 
      titles,
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
    console.error("Error fetching titles:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
