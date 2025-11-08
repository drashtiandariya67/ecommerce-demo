"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import _ from "lodash";
import LazyImage from "../LazyImage/LazyImage";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed right-5 bottom-5 bg-black text-white px-4 py-3 rounded-full shadow-lg hover:bg-gray-800 active:scale-95 transition"
      >
        {open ? "Close" : "Cart"}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-neutral-900 shadow-2xl p-5 overflow-y-auto z-40 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5 border-b pb-2">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Your Cart
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Empty Cart */}
        {_.isEmpty(cart) ? (
          <p className="text-gray-600 dark:text-gray-400 text-center mt-10">
            No items yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded transition"
              >
                <div className="flex items-center gap-3">
                  <LazyImage 
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium text-black dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ₹{item.price}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 text-black dark:text-white bg-gray-200 dark:bg-neutral-700 rounded hover:bg-gray-300 dark:hover:bg-neutral-600 transition disabled:opacity-40"
                      disabled={item.quantity <= 1}
                    >
                      –
                    </button>
                    <span className="w-6 text-center text-black dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 text-black dark:text-white bg-gray-200 dark:bg-neutral-700 rounded hover:bg-gray-300 dark:hover:bg-neutral-600 transition"
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

        {/* Footer */}
        {!_.isEmpty(cart) && (
          <>
            <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
              <p className="text-lg font-semibold text-black dark:text-white">
                Total: ₹{total.toFixed(2)}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={clearCart}
                className="w-1/2 py-2 border border-gray-400 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-neutral-800 transition active:scale-95"
              >
                Clear
              </button>
              {/* <button
                className="w-1/2 py-2 bg-black text-white rounded hover:bg-gray-800 active:scale-95 transition"
              >
                Checkout
              </button> */}
              <button
  onClick={() => router.push("/checkout")}
  className="w-1/2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:scale-95 transition"
>
  Checkout
</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
