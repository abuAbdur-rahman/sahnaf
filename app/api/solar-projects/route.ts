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

// GET: Public product listing with optional category filter
export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get("category");

    if (category && category !== "all") {
      const data = await db
        .select()
        .from(products)
        .orderBy(desc(products.createdAt))
        .where(eq(products.category, category));

      return NextResponse.json(data);
    }

    const data = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt));

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/products error:", err);
    const error = err as Error;
    return NextResponse.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// POST: Admin add new product
export async function POST(request: Request) {
  try {
    await checkAuth();

    const body = await request.json();
    const { name, price, category, shop, stock, description, image } = body;

    // Validate required fields
    if (
      !name ||
      price === undefined ||
      !category ||
      !shop ||
      !stock ||
      !image
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          required: ["name", "price", "category", "shop", "stock", "image"],
        },
        { status: 400 },
      );
    }

    // Validate price is a positive number
    if (typeof price !== "number" || price < 0) {
      return NextResponse.json(
        { error: "Price must be a positive number" },
        { status: 400 },
      );
    }

    // Insert new product
    const [newProduct] = await db
      .insert(products)
      .values({
        name,
        price: price.toString(),
        category,
        shop,
        stock,
        description: description || null,
        image,
      })
      .returning();

    return NextResponse.json(
      { success: true, data: newProduct },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/products error:", err);
    const error = err as Error;
    const status = error.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status },
    );
  }
}

// PUT: Admin update product
export async function PUT(request: Request) {
  try {
    await checkAuth();

    const body = await request.json();
    const { id, ...updateData } = body;

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    // Check if product exists
    const existing = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Validate price if provided
    if (updateData.price !== undefined) {
      if (typeof updateData.price !== "number" || updateData.price < 0) {
        return NextResponse.json(
          { error: "Price must be a positive number" },
          { status: 400 },
        );
      }
      updateData.price = updateData.price.toString();
    }

    // Update product
    const [updatedProduct] = await db
      .update(products)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (err) {
    console.error("PUT /api/products error:", err);
    const error = err as Error;
    const status = error.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json(
      { error: error.message || "Failed to update product" },
      { status },
    );
  }
}

// PATCH: Admin update stock status only
export async function PATCH(request: Request) {
  try {
    await checkAuth();

    const body = await request.json();
    const { id, stock } = body;

    // Validate required fields
    if (!id || !stock) {
      return NextResponse.json(
        { error: "Product ID and stock status are required" },
        { status: 400 },
      );
    }

    // Validate stock value
    const validStockStatuses = ["in-stock", "low-stock", "out-of-stock"];
    if (!validStockStatuses.includes(stock)) {
      return NextResponse.json(
        {
          error: "Invalid stock status",
          validValues: validStockStatuses,
        },
        { status: 400 },
      );
    }

    // Check if product exists
    const existing = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update stock status
    const [updatedProduct] = await db
      .update(products)
      .set({
        stock,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (err) {
    console.error("PATCH /api/products error:", err);
    const error = err as Error;
    const status = error.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json(
      { error: error.message || "Failed to update stock status" },
      { status },
    );
  }
}

// DELETE: Admin remove product
export async function DELETE(request: Request) {
  try {
    await checkAuth();

    const body = await request.json();
    const { id } = body;

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    // Check if product exists
    const existing = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete product
    await db.delete(products).where(eq(products.id, id));

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error("DELETE /api/products error:", err);
    const error = err as Error;
    const status = error.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json(
      { error: error.message || "Failed to delete product" },
      { status },
    );
  }
}
