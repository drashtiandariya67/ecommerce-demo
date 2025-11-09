"use client";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();
  return (
      <header className="sticky top-0 z-20 bg-white shadow-md flex items-center justify-between px-8 py-4">
        <h1
          className="text-2xl font-bold text-blue-600 select-none cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => router.push("/")}
        >
          Uniblox Store
        </h1>
      </header>
  );
};

export default Header;
