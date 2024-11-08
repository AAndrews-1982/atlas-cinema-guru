import { deleteWatchLater, insertWatchLater, watchLaterExists } from "@/lib/data";
import {
  deleteWatchLater,
  insertWatchLater,
  watchLaterExists,
} from "@/lib/data";

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react"; // Use getSession for better integration with NextAuth

/**
 * Helper function to parse the ID from the request URL
 */
function getIdFromPath(url: string): string | null {
  return url.split('/').pop() ?? null;
}


/**
 * POST /api/watch-later/:id
 * Adds an item to the user's watch-later list if it's not already added.
 */
export const POST = async (req: NextRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized - Not logged in" }, { status: 401 });

export const GET = auth(
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

    const exists = await watchLaterExists(id, email);
    if (exists) {
      return NextResponse.json({ message: "Already added to Watch Later" });
    }

    await insertWatchLater(id, email);
    return NextResponse.json({ message: "Watch Later Added" });

  }

  const id = getIdFromPath(req.nextUrl.pathname);
  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const email = session.user.email;

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
export const DELETE = async (req: NextRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized - Not logged in" }, { status: 401 });
  }

  const id = getIdFromPath(req.nextUrl.pathname);
  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const email = session.user.email;

  try {
    await deleteWatchLater(id, email);
    return NextResponse.json({ message: "Watch Later removed" });
  } catch (error) {
    console.error("Failed to remove from watch-later:", error);
    return NextResponse.json({ error: "Failed to remove watch-later" }, { status: 500 });
  }
};

export const DELETE = auth(
  //@ts-ignore
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    const {
      user: { email }, //@ts-ignore
    } = req.auth;

    await deleteWatchLater(id, email);
    return NextResponse.json({ message: "Watch Later removed" });
  }
);
