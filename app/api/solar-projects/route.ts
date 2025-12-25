// app/api/solar-projects/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { solarProjects } from "@/lib/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAuthorized } from "@/lib/utils";
import { eq, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session || !isAuthorized(session.user?.email)) {
    throw new Error("Unauthorized");
  }
  return session;
}

// GET: public listing
export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q");
    const data = await db
      .select()
      .from(solarProjects)
      .orderBy(desc(solarProjects.createdAt));

    // simple search by title/location if q provided
    if (q) {
      const filtered = data.filter(
        (p) =>
          p.title?.toLowerCase().includes(q.toLowerCase()) ||
          p.location?.toLowerCase().includes(q.toLowerCase()),
      );
      return NextResponse.json(filtered);
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/solar-projects error:", err);
    const error = err as Error;
    return NextResponse.json(
      { error: error.message || "Failed to fetch solar projects" },
      { status: 500 },
    );
  }
}

// POST: create new project (admin)
export async function POST(request: Request) {
  try {
    await checkAuth();
    const body = await request.json();
    const { title, location, image, description, kva, completedAt } = body;

    if (!title || !image) {
      return NextResponse.json(
        { error: "Missing required fields", required: ["title", "image"] },
        { status: 400 },
      );
    }

    const [newProject] = await db
      .insert(solarProjects)
      .values({
        title,
        location: location || null,
        image,
        description: description || null,
        kva: kva || null,
        completedAt: completedAt ? new Date(completedAt) : null,
      })
      .returning();

    return NextResponse.json(
      { success: true, data: newProject },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/solar-projects error:", err);
    const error = err as Error;
    const status = error.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json(
      { error: error.message || "Failed to create project" },
      { status },
    );
  }
}

// PUT: update project (admin)
export async function PUT(request: Request) {
  try {
    await checkAuth();
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 },
      );
    }

    const existing = await db
      .select()
      .from(solarProjects)
      .where(eq(solarProjects.id, id))
      .limit(1);
    if (existing.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // If completedAt provided convert to Date
    if (updateData.completedAt)
      updateData.completedAt = new Date(updateData.completedAt);

    const [updated] = await db
      .update(solarProjects)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(solarProjects.id, id))
      .returning();

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("PUT /api/solar-projects error:", err);
    const error = err as Error;
    const status = error.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json(
      { error: error.message || "Failed to update project" },
      { status },
    );
  }
}

// DELETE: remove project (admin)
export async function DELETE(request: Request) {
  try {
    await checkAuth();
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 },
      );
    }

    const existing = await db
      .select()
      .from(solarProjects)
      .where(eq(solarProjects.id, id))
      .limit(1);
    if (existing.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await db.delete(solarProjects).where(eq(solarProjects.id, id));
    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (err) {
    console.error("DELETE /api/solar-projects error:", err);
    const error = err as Error;
    const status = error.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json(
      { error: error.message || "Failed to delete project" },
      { status },
    );
  }
}
