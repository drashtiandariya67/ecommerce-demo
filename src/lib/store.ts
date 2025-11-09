import { v4 as uuidv4 } from "uuid";

export type CartItem = { id: string | number; name: string; price: number; quantity: number; image?: string };
export type Order = { id: string; userId: string; items: CartItem[]; subtotal: number; discountCode?: string | null; discountAmount: number; total: number; createdAt: string };
export type Discount = { code: string; percentage: number; used: boolean; createdAt: string; usedAt?: string };

export const NTH_ORDER_FOR_DISCOUNT = 5;

// server-side in-memory store
export const orders: Order[] = [];
export const discounts: Discount[] = [];

/**
 * Create order record and return it.
 * Note: caller should compute discount and total and pass amounts.
 */
export function createOrder(userId: string, items: CartItem[], subtotal: number, discountCode: string | null, discountAmount: number, total: number) {
  const order: Order = {
    id: uuidv4(),
    userId,
    items,
    subtotal,
    discountCode,
    discountAmount,
    total,
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
}

export function tryApplyDiscount(code?: string | null) {
  if (!code) return { valid: false, percentage: 0, reason: "no-code" };
  const discount = store.discountCodes.find((d) => d.code === code);
  if (!discount) return { valid: false, percentage: 0, reason: "not-found" };
  if (discount.used) return { valid: false, percentage: 0, reason: "used" };
  return { valid: true, percentage: discount.percentage, discount };
}

export function markDiscountUsed(code: string) {
  const d = discounts.find((x) => x.code === code);
  if (!d) return null;
  d.used = true;
  d.usedAt = new Date().toISOString();
  return d;
}

/**
 * Generate a discount code if eligible (called after creating an order).
 * Returns the generated Discount or null.
 */
export function maybeGenerateDiscount() {
  if (store.orders.length > 0 && store.orders.length % NTH_ORDER_FOR_DISCOUNT === 0) {
    const code = `UBX-${Date.now().toString(36).toUpperCase()}`;
    const discount = {
      code,
      percentage: 10,
      used: false,
      createdAt: new Date().toISOString(),
    };
    store.discountCodes.push(discount);
    return discount;
  }
  return null;
}

export function getStats() {
  const totalItems = orders.reduce((s, o) => s + o.items.reduce((si, it) => si + it.quantity, 0), 0);
  const totalPurchase = orders.reduce((s, o) => s + o.total, 0);
  const usedDiscounts = discounts.filter((d) => d.used);
  const totalDiscountAmount = orders.reduce((s, o) => s + (o.discountAmount || 0), 0);
  return {
    totalOrders: orders.length,
    totalItems,
    totalPurchase,
    discounts: discounts.slice(),
    totalDiscountAmount,
    usedDiscountsCount: usedDiscounts.length,
  };
}

// 👇 Create global store that persists across hot reloads in dev & API calls
const globalStore = global as any;

if (!globalStore.__ECOM_STORE__) {
  globalStore.__ECOM_STORE__ = {
    orders: [] as any[],
    discountCodes: [] as any[],
    addOrder(order: any) {
      const newOrder = { id: uuidv4(), createdAt: new Date().toISOString(), ...order };
      this.orders.push(newOrder);
      return newOrder;
    },
  };
}

export const store = globalStore.__ECOM_STORE__;

export const generateDiscountCode = () => ({
  id: uuidv4(),
  code: `SAVE10-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
  discount: 10,
  percentage: 10,
  used: false,
  createdAt: new Date().toISOString(),
});