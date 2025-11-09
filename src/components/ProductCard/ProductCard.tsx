"use client";
import { Product } from "@/types";
import LazyImage from "../LazyImage/LazyImage";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Button from "../Button/Button";
import Alert from "../Alert/Alert";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [toast, setToast] = useState("");

  const handleAddToCart = () => {
    addToCart(product);
    setToast(`${product.name} added to cart`);
  };

  return (
    <div className="border border-gray-500 rounded-xl shadow-sm bg-white p-4 flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {toast && <Alert type="success">{toast}</Alert>}
      <LazyImage
        src={product.image}
        alt={product.name}
        className="w-32 h-32 object-cover rounded-lg mb-3 transition-transform duration-300 hover:scale-105"
      />
      <h2 className="font-semibold text-lg text-center">{product.name}</h2>
      <p className="text-gray-600 mb-2">₹{product.price}</p>
      <Button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 active:scale-95 transition" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
