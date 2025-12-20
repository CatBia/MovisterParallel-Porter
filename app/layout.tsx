import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import CartIcon from "@/components/CartIcon";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "E-Commerce Store",
  description: "Modern e-commerce store built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
                  ShopHub
                </Link>
                <div className="flex items-center space-x-4">
                  <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
                    Products
                  </Link>
                  <Link href="/orders" className="text-gray-700 hover:text-gray-900 font-medium">
                    Orders
                  </Link>
                  <CartIcon />
                </div>
              </div>
            </div>
          </nav>
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}

