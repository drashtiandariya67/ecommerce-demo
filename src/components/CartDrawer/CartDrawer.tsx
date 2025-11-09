"use client";
import { useCart } from "@/context/CartContext";
import React, { useState } from "react";
import _ from "lodash";
import LazyImage from "../LazyImage/LazyImage";
import { useRouter, usePathname } from "next/navigation";
import Button from "../Button/Button";

const CartDrawer: React.FC = () => {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Show cart button only if drawer closed and not on checkout page
  const showCartButton = !open && pathname !== "/checkout";

  const handleClear = () => {
    clearCart();
    setOpen(false);
  };

  const handleCheckout = () => {
    setOpen(false);
    router.push("/checkout");
  };

  return (
    <>
      {showCartButton && (
        <button
          onClick={() => setOpen(true)}
          className="fixed right-5 bottom-5 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 active:scale-95 transition flex items-center justify-center"
          aria-label="Open cart"
        >
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold animate-pulse">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          )}
        </button>
      )}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-2xl p-5 overflow-y-auto z-40 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5 border-b pb-2">
          <h2 className="text-xl font-semibold text-black">Your Cart</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-black transition-colors"
          >
            ✕
          </button>
        </div>
        {_.isEmpty(cart) ? (
          <p className="text-gray-600 text-center mt-10">No items yet.</p>
        ) : (
          <ul className="space-y-3">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 pb-3 hover:bg-gray-50 rounded transition"
              >
                <div className="flex items-center gap-3">
                  <LazyImage
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium text-black">{item.name}</p>
                    <p className="text-sm text-gray-600">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 text-black bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-40"
                      disabled={item.quantity <= 1}
                    >
                      –
                    </button>
                    <span className="w-6 text-center text-black">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 text-black bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {!_.isEmpty(cart) && (
          <>
            <div className="mt-6 border-t border-gray-300 pt-4">
              <p className="text-lg font-semibold text-black">Total: ₹{total.toFixed(2)}</p>
            </div>
            <div className="mt-4 flex gap-2 flex-col sm:flex-row">
              <Button
                className="w-full sm:w-1/2"
                variant="outline"
                onClick={handleClear}
              >
                Clear
              </Button>
              <Button
                className="w-full sm:w-1/2"
                variant="primary"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;  