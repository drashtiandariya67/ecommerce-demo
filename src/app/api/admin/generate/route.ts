import { NextResponse } from "next/server";
import { maybeGenerateDiscount } from "@/lib/store";

export async function POST() {
  const d = maybeGenerateDiscount();
  if (!d) return NextResponse.json({ success: false, message: "Not eligible yet" }, { status: 400 });
  return NextResponse.json({ success: true, discount: d });
}
