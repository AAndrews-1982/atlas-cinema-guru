import { NextRequest, NextResponse } from "next/server";
import { fetchActivities } from "@/lib/data";
import { auth } from "@/auth";

interface User {
  email: string;
}

interface AuthenticatedRequest extends NextRequest {
  user?: User;
}

export const GET = async (req: AuthenticatedRequest): Promise<NextResponse> => {
  // Check authentication and user existence
  const user = await auth(req);  // Ensure auth returns User | undefined
  if (!user) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized - Not logged in" }), {
      status: 401,
    });
  }

  req.user = user;  // Manually attach user to request if not done by `auth`
  const params = req.nextUrl.searchParams;
  const page = params.get("page") ? parseInt(params.get("page"), 10) : 1;

  const activities = await fetchActivities(page, user.email);
  return new NextResponse(JSON.stringify({ activities }));
};
