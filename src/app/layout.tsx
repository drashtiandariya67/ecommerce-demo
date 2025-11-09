import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header/Header";
import CartDrawer from "@/components/CartDrawer/CartDrawer";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"  suppressHydrationWarning={true}>
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <CartProvider>
          <Header />
          <div className="flex flex-1">
            <main className="flex-1 p-6 transition-all duration-300">{children}</main>
            <CartDrawer />
          </div>
        </CartProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
