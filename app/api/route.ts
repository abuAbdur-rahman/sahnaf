import { NextResponse } from "next/server";

export function GET() {
  NextResponse.json({
    ok: true,
  });
}
