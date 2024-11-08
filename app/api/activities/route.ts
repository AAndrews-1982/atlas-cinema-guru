import { NextRequest, NextResponse } from "next/server";
import { fetchActivities } from "@/lib/data";
import { getSession } from "next-auth/react"; // Use getSession instead of getToken

// Define the interface for User right inside the export to reduce global declarations
export const GET = async (req: NextRequest & { user?: { email: string } }): Promise<NextResponse> => {
  // Authenticate user and extract email directly
  const session = await getSession({ req });
  if (!session?.user?.email) {
    return NextResponse.rewrite(new URL('/api/auth/unauthorized', req.url), {
      status: 401,
      statusText: "Unauthorized - Please log in"
    });
  }

  // Simplify URL parameter access
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");

<<<<<<< HEAD
  // Fetch activities based on user email
  const activities = await fetchActivities(page, session.user.email);

  // Utilize JSON helper for structured responses
  return NextResponse.json({ activities }, { status: 200 });
};
=======
  const activities = await fetchActivities(page, email);
  return NextResponse.json({ activities });
});
>>>>>>> 25e2ed2 (still not able to load images)
