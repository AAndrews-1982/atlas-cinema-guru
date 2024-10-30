import { auth } from "@/auth";
import { fetchActivities } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/activities
 */
export const GET = async (req: NextRequest): Promise<NextResponse> => {
  // Apply auth middleware and check authentication status
  const isAuthorized = await auth(req);
  
  if (!isAuthorized) {
    return NextResponse.json(
      { error: "Unauthorized - Not logged in" },
      { status: 401 }
    );
  }

  const params = req.nextUrl.searchParams;
  const page = params.get("page") ? Number(params.get("page")) : 1;

  // Extract email from auth context
  const { email } = isAuthorized.user;
  const activities = await fetchActivities(page, email);

  return NextResponse.json({ activities });
};

