"use client";

import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

// Default placeholder image URL
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop";

export default function ProductCard({ product }: ProductCardProps) {
  // Use product image if available, otherwise use default placeholder
  const imageUrl = product.image && product.image.trim() !== '' 
    ? product.image 
    : DEFAULT_IMAGE;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <div className="relative h-32 sm:h-48 lg:h-64 w-full">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="p-2 sm:p-4">
          <h3 className="text-xs sm:text-sm lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 hidden sm:block">
            {product.description}
          </p>
          <div className="flex items-center justify-between flex-col sm:flex-row gap-1 sm:gap-0">
            <span className="text-base sm:text-xl lg:text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            {product.inStock ? (
              <span className="text-xs bg-green-100 text-green-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                In Stock
              </span>
            ) : (
              <span className="text-xs bg-red-100 text-red-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

