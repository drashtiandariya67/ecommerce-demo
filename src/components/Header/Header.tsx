"use client";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <header className="sticky top-0 z-20 bg-white shadow-md flex items-center justify-between px-8 py-4">
      <h1 className="text-2xl font-bold text-blue-600 select-none transition-transform duration-300 hover:scale-105">
        Uniblox Store
      </h1>
      <div className="relative cursor-pointer select-none">
        <div className="text-gray-700 font-medium hover:text-blue-600 transition">
          🛒 Cart
        </div>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
      </div>
    </header>
  );
}
