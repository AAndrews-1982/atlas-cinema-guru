import { deleteWatchLater, insertWatchLater, watchLaterExists } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react"; // Use getSession for better integration with NextAuth

/**
 * Helper function to parse the ID from the request URL if needed
 */
function getIdFromPath(url: string): string | null {
  return url.split('/').pop() ?? null;
}

/**
 * POST /api/watch-later/:id
 * Adds an item to the user's watch-later list if it's not already added.
 */
export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized - Not logged in" }, { status: 401 });
  }

  const { id } = params;
  const email = session.user.email;

  // Check if the item is already in the watch-later list
  const exists = await watchLaterExists(id, email);
  if (exists) {
    return NextResponse.json({ message: "Already added to Watch Later" });
  }

  try {
    await insertWatchLater(id, email);
    return NextResponse.json({ message: "Watch Later Added" });
  } catch (error) {
    console.error("Failed to add to watch-later:", error);
    return NextResponse.json({ error: "Failed to add to watch-later" }, { status: 500 });
  }
};

/**
 * DELETE /api/watch-later/:id
 * Removes an item from the user's watch-later list.
 */
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized - Not logged in" }, { status: 401 });
  }

  const { id } = params;
  const email = session.user.email;

  try {
    await deleteWatchLater(id, email);
    return NextResponse.json({ message: "Watch Later removed" });
  } catch (error) {
    console.error("Failed to remove from watch-later:", error);
    return NextResponse.json({ error: "Failed to remove from watch-later" }, { status: 500 });
  }
};
