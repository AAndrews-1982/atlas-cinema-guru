import * as seed from "@/lib/seed";

/**
 * Exposes an API endpoint `GET /api/seed`. When hit, runs the commands against the database to create tables and load data.
 */
export async function GET() {
  try {
    await seed.seedTitles();
    await seed.seedFavorites();
    await seed.seedWatchLater();
    await seed.seedActivity();

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seeding failed:", error);
    return Response.json({ error: error.message || "Seeding failed" }, { status: 500 });
  }
}
