import { describe, it, expect, beforeEach } from "vitest";
import { store, NTH_ORDER_FOR_DISCOUNT, maybeGenerateDiscount, tryApplyDiscount } from "@/lib/store";

beforeEach(() => {
  // reset store before each test
  store.orders.length = 0;
  store.discountCodes.length = 0;
});

describe("Store functions", () => {
  it("creates an order correctly", () => {
    const order = store.addOrder({
      userId: "u1",
      items: [{ id: 1, name: "Test Product", price: 100, quantity: 2 }],
      subtotal: 200,
      discountCode: null,
      discountAmount: 0,
      total: 200,
    });

    expect(store.orders.length).toBe(1);
    expect(order.total).toBe(200);
    expect(order.discountCode).toBeNull();
  });

  it("applies discount correctly", () => {
    store.discountCodes.push({
      code: "SAVE10",
      percentage: 10,
      used: false,
      createdAt: new Date().toISOString(),
    });

    const discount = tryApplyDiscount("SAVE10");
    expect(discount.valid).toBe(true);
    expect(discount.percentage).toBe(10);

    // mark discount as used
    store.discountCodes[0].used = true;
    const discountUsed = tryApplyDiscount("SAVE10");
    expect(discountUsed.valid).toBe(false);
    expect(discountUsed.reason).toBe("used");
  });

  it("generates discount on nth order", () => {
    // fill orders up to NTH_ORDER_FOR_DISCOUNT
    for (let i = 0; i < NTH_ORDER_FOR_DISCOUNT - 1; i++) {
      store.addOrder({
        userId: `user${i}`,
        items: [{ id: i, name: "Test", price: 50, quantity: 1 }],
        subtotal: 50,
        discountCode: null,
        discountAmount: 0,
        total: 50,
      });
    }

    // no discount yet
    expect(maybeGenerateDiscount()).toBeNull();

    // add nth order
    store.addOrder({
      userId: "userNth",
      items: [{ id: 999, name: "Nth Product", price: 100, quantity: 1 }],
      subtotal: 100,
      discountCode: null,
      discountAmount: 0,
      total: 100,
    });

    const newCoupon = maybeGenerateDiscount();
    expect(newCoupon).toBeDefined();
    expect(newCoupon?.code).toMatch(/^UBX-/);
    expect(store.discountCodes).toContainEqual(newCoupon);
  });
});
