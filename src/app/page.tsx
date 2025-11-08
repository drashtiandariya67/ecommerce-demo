"use client";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import LazyImage from "@/components/LazyImage/LazyImage";
import Toast from "@/components/Toast/Toast";
import { useState } from "react";
import { Product } from "@/types";

export default function HomePage() {
  const { addToCart } = useCart();
  const [toast, setToast] = useState("");

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setToast(`${product.name} added to cart`);
  };

  return (
    <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-xl shadow-sm bg-white p-4 flex flex-col items-center 
                     hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <LazyImage src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-lg mb-3 transition-transform duration-300 hover:scale-105" />
          <h2 className="font-semibold text-lg text-center">{product.name}</h2>
          <p className="text-gray-600 mb-2">₹{product.price}</p>
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 active:scale-95 transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </section>
  );
}
