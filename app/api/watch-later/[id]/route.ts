import { deleteWatchLater, insertWatchLater, watchLaterExists } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export const POST = auth(
  async (req: NextRequest, ctx: { params: { id: string } }) => {
    const { id } = await ctx.params; // ✅ Ensure params is awaited

    if (!id) {
      return NextResponse.json({ error: "Missing movie ID" }, { status: 400 });
    }

    //@ts-ignore
    if (!req.auth) {
      return NextResponse.json({ error: "Unauthorized - Not logged in" }, { status: 401 });
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
);

export const DELETE = auth(
  async (req: NextRequest, ctx: { params: { id: string } }) => {
    const { id } = await ctx.params; // ✅ Ensure params is awaited

    if (!id) {
      return NextResponse.json({ error: "Missing movie ID" }, { status: 400 });
    }

    //@ts-ignore
    if (!req.auth) {
      return NextResponse.json({ error: "Unauthorized - Not logged in" }, { status: 401 });
    }

    const {
      user: { email }, //@ts-ignore
    } = req.auth;

    await deleteWatchLater(id, email);
    return NextResponse.json({ message: "Watch Later removed" });
  }
);
