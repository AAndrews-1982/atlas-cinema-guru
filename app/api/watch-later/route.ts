import { fetchWatchLaters } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react"; // Use getSession for session management

/**
 * GET /api/watch-laters
 * Retrieves the watch later list for the authenticated user.
 */
export const GET = async (req: NextRequest) => {
  // Handle authentication using getSession which is directly supported by NextAuth
  const session = await getSession({ req });
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized - Not logged in" }, { status: 401 });
  }

  // Extract parameters using URLSearchParams for cleaner access
  const params = req.nextUrl.searchParams;
  const page = parseInt(params.get("page") || "1", 10);
  const minYear = parseInt(params.get("minYear") || "0", 10);
  const maxYear = parseInt(params.get("maxYear") || `${new Date().getFullYear()}`, 10);
  const query = params.get("query") || "";

  // Fetch the user's watch later items
  try {
    const watchLater = await fetchWatchLaters(page, session.user.email);
    return NextResponse.json({ watchLater });
  } catch (error) {
    console.error("Failed to fetch watch later items:", error);
    return NextResponse.json({ error: "Server error fetching watch later items" }, { status: 500 });
  }
};
