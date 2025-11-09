"use client";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard/ProductCard";

const HomePage: React.FC = () => {
  return (
    <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default HomePage;
