import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { storeSettings } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { isAuthorized } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic"; // Ensure fresh data

// GET: Public endpoint for current price
export async function GET() {
  try {
    // We assume ID 1 is always the singleton record
    let settings = await db.query.storeSettings.findFirst({
      where: eq(storeSettings.id, 1),
    });

    // Seed initial data if empty
    if (!settings) {
      [settings] = await db
        .insert(storeSettings)
        .values({ id: 1, price: "1300.00" })
        .returning();
    }
    return NextResponse.json(settings);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Failed to fetch price ${error as Error}.message` },
      { status: 500 },
    );
  }
}

// PATCH: Admin only update
export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  // 🔒 Security Check
  if (!session || !isAuthorized(session?.user?.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { price } = body; // Expects string "1400.00"

    // Update singleton record ID 1
    const updated = await db
      .update(storeSettings)
      .set({ price, updatedAt: new Date() })
      .where(eq(storeSettings.id, 1))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating price" },
      { status: 500 },
    );
  }
}
