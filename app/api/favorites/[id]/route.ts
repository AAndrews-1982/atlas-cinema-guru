import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { insertFavorite, deleteFavorite, favoriteExists } from "@/lib/data"; // Ensure all functions are imported

/**
 * POST /api/favorites/:id - Add movie to favorites
 */
export const POST = async (req: NextRequest, { params }: { params: { id?: string } }) => {
  const id = params?.id; // No need to await params

  if (!id) {
    return NextResponse.json({ error: "Missing movie ID" }, { status: 400 });
  }

  // Await `auth()` function properly
  const session = await auth();
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized - Not logged in" }, { status: 401 });
  }

  const userEmail = session.user.email;

  try {
    // Check if already favorited
    const exists = await favoriteExists(id, userEmail);
    if (exists) {
      return NextResponse.json({ message: "Already added to favorites" }, { status: 200 });
    }

    await insertFavorite(id, userEmail);
    return NextResponse.json({ message: "Movie added to favorites" }, { status: 201 });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return NextResponse.json({ error: "Failed to add to favorites" }, { status: 500 });
  }
};

/**
 * DELETE /api/favorites/:id - Remove movie from favorites
 */
export const DELETE = async (req: NextRequest, { params }: { params: { id?: string } }) => {
  const id = params?.id; // No need to await params

  if (!id) {
    return NextResponse.json({ error: "Missing movie ID" }, { status: 400 });
  }

  // Await `auth()` function properly
  const session = await auth();
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized - Not logged in" }, { status: 401 });
  }

  const userEmail = session.user.email;

  try {
    await deleteFavorite(id, userEmail);
    return NextResponse.json({ message: "Favorite removed successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting favorite:", error);
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 });
  }
};