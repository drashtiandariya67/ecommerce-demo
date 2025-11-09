import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const { coupon } = await req.json();
    const found = store.discountCodes.find((c) => c.code === coupon);
    return NextResponse.json({ valid: !!found });
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}
