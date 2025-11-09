import { NextResponse } from "next/server";
import {
  store,
  generateDiscountCode,
  NTH_ORDER_FOR_DISCOUNT,
} from "@/lib/store";
import { CartItem } from "@/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, items, discountCode } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Calculate subtotal
    const subtotal = items.reduce(
      (sum: number, i: CartItem) => sum + i.price * i.quantity,
      0
    );

    let discountAmount = 0;
    let validCode: string | null = null;

    // Validate coupon if provided
    if (discountCode) {
      const found = store.discountCodes.find((c) => c.code === discountCode);

      if (!found) {
        return NextResponse.json(
          { success: false, error: "Invalid coupon code." },
          { status: 400 }
        );
      }

      if (found.used) {
        return NextResponse.json(
          { success: false, error: "This coupon has already been used." },
          { status: 400 }
        );
      }

      // Valid and unused
      discountAmount = subtotal * (found.percentage / 100);
      validCode = discountCode;

      // Mark coupon as used immediately
      found.used = true;
      found.usedAt = new Date().toISOString();
    }

    const total = subtotal - discountAmount;

    // Create order
    const order = store.addOrder({
      userId,
      items,
      subtotal,
      discountCode: validCode,
      discountAmount,
      total,
    });

    // Generate new coupon for every Nth order
    let generatedCoupon = null;
    if (store.orders.length % NTH_ORDER_FOR_DISCOUNT === 0) {
      generatedCoupon = generateDiscountCode();
      store.discountCodes.push(generatedCoupon);
    }

    return NextResponse.json({
      success: true,
      order,
      generatedCoupon,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
