import { fetchFavorites } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/auth";
import getServerSession from "next-auth";

/**
 * GET /api/favorites
 */
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized - Not logged in" },
      { status: 401 }
    );
  }

  const params = req.nextUrl.searchParams;
  const page = params.get("page") ? Number(params.get("page")) : 1;
  const email = session.user.email;

  const favorites = await fetchFavorites(page, email);

  return NextResponse.json({ favorites });
}
