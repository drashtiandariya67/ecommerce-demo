import { describe, it, expect, beforeEach } from "vitest";
import { POST } from "@/app/api/checkout/route";
import { store } from "@/lib/store";

beforeEach(() => {
  // reset store
  store.orders.length = 0;
  store.discountCodes.length = 0;
});

describe("Checkout API", () => {
  it("processes checkout successfully", async () => {
    const req = new Request("http://localhost/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        userId: "user1",
        items: [{ id: 1, name: "Product", price: 100, quantity: 2 }],
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(data.success).toBe(true);
    expect(data.order.total).toBe(200);
    expect(store.orders.length).toBe(1);
  });

  it("applies discount code correctly", async () => {
    // first, add a discount code in store
    store.discountCodes.push({
      code: "SAVE10",
      percentage: 10,
      used: false,
      createdAt: new Date().toISOString(),
    });

    const req = new Request("http://localhost/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        userId: "user1",
        items: [{ id: 1, name: "Product", price: 100, quantity: 2 }],
        discountCode: "SAVE10",
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(data.success).toBe(true);
    expect(data.order.total).toBe(180); // 10% discount
    expect(data.order.discountCode).toBe("SAVE10");

    // code should now be marked as used
    const discount = store.discountCodes.find((c) => c.code === "SAVE10");
    expect(discount?.used).toBe(true);
  });
});
