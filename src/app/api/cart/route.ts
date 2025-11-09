import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, item } = body || {};
    if (!userId || !item) return NextResponse.json({ error: "userId and item required" }, { status: 400 });
    return NextResponse.json({ success: true, item });
  } catch (err: any) {
    return NextResponse.json({ error: "server_error", detail: err?.message || String(err) }, { status: 500 });
  }
}
