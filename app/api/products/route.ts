import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { authOptions } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";
import { isAuthorized } from "@/lib/utils";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session || !isAuthorized(session?.user?.email)) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");

  try {
    // Build the base query
    let query = db.select().from(products);

    // Add where clause if category exists
    if (category && category !== "all") {
      // @ts-expect-error kkkkkkkkkkkkkkk
      query = query.where(eq(products.category, category));
    }

    // Add ordering last
    const data = await query.orderBy(desc(products.createdAt));

    return NextResponse.json(data);
  } catch (err) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await checkAuth();
    const body = await request.json();
    const { name, price, category, shop, stock, description, image } = body;

    // Fixed: changed location to shop to match your schema
    if (!name || !price || !category || !stock || !image || !shop) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await db.insert(products).values({
      name,
      price: price.toString(), // Decimal expects string or number
      category,
      shop,
      stock,
      description,
      image,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const error = err as Error;
    const status = error.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

export async function PUT(request: Request) {
  try {
    await checkAuth();
    const { id, ...updateData } = await request.json();

    if (!id)
      return NextResponse.json({ error: "ID required" }, { status: 400 });

    await db
      .update(products)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id));

    return NextResponse.json({ success: true });
  } catch (err) {
    const error = err as Error;
    const status = error.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

export async function PATCH(request: Request) {
  try {
    await checkAuth();
    const { id, stock } = await request.json();

    await db.update(products).set({ stock }).where(eq(products.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    const error = err as Error;
    const status = error.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

export async function DELETE(request: Request) {
  try {
    await checkAuth();
    const { id } = await request.json();

    await db.delete(products).where(eq(products.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    const error = err as Error;
    const status = error.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
