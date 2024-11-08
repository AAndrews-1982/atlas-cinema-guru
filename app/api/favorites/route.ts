import { fetchFavorites } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react"; // Use getSession for clarity

/**
 * GET /api/favorites
 * Retrieves a list of favorite items for the authenticated user.
 */
export const GET = async (req: NextRequest) => {
  // Simplify the handling of authentication and session management
  const session = await getSession({ req });
  if (!session || !session.user?.email) {
    // Directly use NextResponse to handle unauthorized access
    return NextResponse.rewrite(new URL('/401', req.url), {
      status: 401,
      statusText: 'Unauthorized - Not logged in'
    });
  }

  // Use URLSearchParams to extract parameters cleanly
  const searchParams = new URLSearchParams(req.nextUrl.search);
  const page = parseInt(searchParams.get("page") ?? "1", 10); // Ensures a default page number and clearer parsing

  // Fetch favorites using the authenticated user's email
  const favorites = await fetchFavorites(page, session.user.email);

<<<<<<< HEAD
  // Return a structured JSON response with a standard HTTP status code
  return NextResponse.json({ favorites }, { status: 200 });
};
=======
  return NextResponse.json({ favorites });
});
>>>>>>> 25e2ed2 (still not able to load images)
