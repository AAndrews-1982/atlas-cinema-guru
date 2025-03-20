import { fetchWatchLaters } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth"; // Use `auth()` instead of `getServerSession()`

/**
 * GET /api/watch-later
 */
export async function GET(req: NextRequest) {
  const session = await auth(); // Use `auth()` instead of `getServerSession()`

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized - Not logged in" },
      { status: 401 }
    );
  }

  const params = req.nextUrl.searchParams;
  const page = params.get("page") ? Number(params.get("page")) : 1;
  const email = session.user.email;

  // Fetch watch-later items
  const watchLater = await fetchWatchLaters(page, email);

  return NextResponse.json({ watchLater });
}
