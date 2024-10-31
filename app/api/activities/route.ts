import { auth } from "@/auth";
import { fetchActivities } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/activities
 */
export const GET = auth(async (req: NextRequest): Promise<NextResponse> => {
  const params = req.nextUrl.searchParams;
  const page = params.get("page") ? Number(params.get("page")) : 1;

  if (!req.auth) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized - Not logged in" }), {
      status: 401,
    });
  }

  const { email } = req.auth.user;

  const activities = await fetchActivities(page, email);
  return new NextResponse(JSON.stringify({ activities }));
});

