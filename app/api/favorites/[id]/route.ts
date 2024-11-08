import { deleteFavorite, favoriteExists, insertFavorite } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

// Authentication check function
async function checkAuth(request: NextRequest): Promise<string> {
  const session = await getSession({ req: request });
  if (!session?.user?.email) {
    throw new Error("Unauthorized - Not logged in");
  }
  return session.user.email;
}

// Helper function for creating JSON responses
function createResponse(content: Object, status: number = 200) {
  return NextResponse.json(content, { status });
}

/**
 * POST /api/favorites/:id
 * Adds a favorite item for the authenticated user.
 */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const email = await checkAuth(request);

    if (await favoriteExists(id, email)) {
      return createResponse({ message: "Already favorited" });
    }

    await insertFavorite(id, email);
    return createResponse({ message: "Favorite Added" });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return createResponse({ error: "Failed to add favorite" }, 500);
  }
}

/**
 * DELETE /api/favorites/:id
 * Removes a favorite item for the authenticated user.
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const email = await checkAuth(request);

    await deleteFavorite(id, email);
    return createResponse({ message: "Favorite removed" });
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    return createResponse({ error: "Failed to remove favorite" }, 500);
  }
}
