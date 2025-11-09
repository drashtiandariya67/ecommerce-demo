"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import _ from "lodash";
import Alert from "@/components/Alert/Alert";
import CouponInput from "@/components/CouponInput/CouponInput";
import CartItems from "@/components/CartItems/CartItems";
import Button from "@/components/Button/Button";

const CheckoutPage: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const router = useRouter();
  const [discountCode, setDiscountCode] = useState("");
  const [discountValid, setDiscountValid] = useState(false);
  const [loadingApply, setLoadingApply] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [newCoupon, setNewCoupon] = useState<any | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleValidateCoupon = async () => {
    if (!discountCode.trim()) return;
    setLoadingApply(true);
    try {
      const res = await fetch("/api/checkout/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coupon: discountCode }),
      });
      const data = await res.json();
      if (data.valid) {
        setDiscountValid(true);
        setMsg({ type: "success", text: "Coupon applied successfully (10% off)" });
      } else {
        setDiscountValid(false);
        setMsg({ type: "error", text: "Invalid or already used coupon" });
      }
    } catch {
      setMsg({ type: "error", text: "Error validating coupon" });
    } finally {
      setLoadingApply(false);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (_.isEmpty(cart)) {
      setMsg({ type: "error", text: "Cart is empty" });
      return;
    }
    setLoadingCheckout(true);
    setMsg(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user-123",
          items: cart,
          discountCode: discountValid ? discountCode : null,
        }),
      });
      const data = await res.json();
      setLoadingCheckout(false);
      if (!data.success) {
        setMsg({ type: "error", text: data.error || "Checkout failed" });
        return;
      }
      setMsg({
        type: "success",
        text: `Order placed successfully! Total: ₹${data.order.total.toFixed(
          2
        )} ${data.order.discountAmount ? `(Discount ₹${data.order.discountAmount.toFixed(2)} applied)` : ""}`,
      });
      if (data.generatedCoupon) setNewCoupon(data.generatedCoupon);
      setOrderPlaced(true);
      clearCart();
      setTimeout(() => router.push("/"), 5000);
    } catch {
      setLoadingCheckout(false);
      setMsg({ type: "error", text: "Network error, please try again." });
    }
  };

  return (
    <main className="min-h-screen p-6 flex justify-center items-start">
      <div className="max-w-3xl w-full bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Checkout</h1>
          <Button type="button" variant="outline" onClick={() => router.push("/")}>
            {'<'} Back
          </Button>
        </div>
        <form onSubmit={handleCheckout} className="space-y-6">
          {!orderPlaced && (
            <>
              <CouponInput
                discountCode={discountCode}
                setDiscountCode={setDiscountCode}
                handleValidateCoupon={handleValidateCoupon}
                loading={loadingApply}
              />
              <CartItems cart={cart} total={total} discountValid={discountValid} />
            </>
          )}
          {msg && <Alert type={msg.type}>{msg.text}</Alert>}
          {newCoupon && (
            <div className="mt-4 p-4 border border-green-300 rounded-lg bg-green-50 text-center">
              <strong>Congrats!</strong> You’ve earned a new coupon:
              <div className="text-xl font-mono text-green-700 mt-1">{newCoupon.code}</div>
              <p className="text-sm text-black mt-1">
                Use it next time for {newCoupon.percentage}% off!
              </p>
            </div>
          )}
          {!orderPlaced && (
            <Button
              className="w-full"
              variant="primary"
              type="submit"
              disabled={loadingCheckout}
            >
              {loadingCheckout ? "Processing..." : "Place Order"}
            </Button>
          )}
        </form>
      </div>
    </main>
  );
};

export default CheckoutPage;