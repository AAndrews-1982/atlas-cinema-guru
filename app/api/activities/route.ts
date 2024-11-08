import { NextRequest, NextResponse } from "next/server";
import { fetchActivities } from "@/lib/data";
import { getSession } from "next-auth/react";

export const GET = async (req: NextRequest & { user?: { email: string } }): Promise<NextResponse> => {
  // Authenticate user and extract email directly
  const session = await getSession({ req });
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized - Please log in" },
      { status: 401, statusText: "Unauthorized" }
    );
  }

  // Parse the "page" parameter from the URL
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");

  // Fetch activities based on the user's email
  const activities = await fetchActivities(page, session.user.email);

  // Return activities in a structured JSON response
  return NextResponse.json({ activities }, { status: 200 });
};
