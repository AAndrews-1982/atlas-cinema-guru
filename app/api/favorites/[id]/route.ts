import { deleteFavorite, favoriteExists, insertFavorite } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react"; // Using getSession for clearer authentication handling

<<<<<<< HEAD
// Simplified authentication check function
async function checkAuth(request: NextRequest) {
  const session = await getSession({ req: request });
  if (!session?.user?.email) {
    throw new Error("Unauthorized - Not logged in");
=======
/**
 * POST /api/favorites/:id
 */
export const POST = auth(
  //@ts-ignore
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    //@ts-ignore
    if (!req.auth) {
      return NextResponse.json(
        { error: "Unauthorized - Not logged in" },
        { status: 401 }
      );
    }

    const {
      user: { email }, //@ts-ignore
    } = req.auth;

    const exists = await favoriteExists(id, email);
    if (exists) {
      return NextResponse.json({ message: "Already favorited" });
    }

    await insertFavorite(id, email);
    return NextResponse.json({ message: "Favorite Added" });
>>>>>>> 25e2ed2 (still not able to load images)
  }
  return session.user.email;
}

<<<<<<< HEAD
// Encapsulate repetitive response generation in a function
function createResponse(content: Object, status: number = 200) {
  return NextResponse.json(content, { status });
}

export async function POST(request: NextRequest, { params: { id } }: { params: { id: string } }) {
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

export async function DELETE(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const email = await checkAuth(request);

    await deleteFavorite(id, email);
    return createResponse({ message: "Favorite removed" });
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    return createResponse({ error: "Failed to remove favorite" }, 500);
  }
}
=======
/**
 * DELETE /api/favorites/:id
 */
export const DELETE = auth(
  //@ts-ignore
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    const {
      user: { email }, //@ts-ignore
    } = req.auth;

    await deleteFavorite(id, email);
    return NextResponse.json({ message: "Favorite removed" });
  }
);
>>>>>>> 25e2ed2 (still not able to load images)
