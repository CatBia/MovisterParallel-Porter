"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  selectedAisle?: string | null;
}

export default function ProductGrid({ selectedAisle = null }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiClient.getProducts();
        
        // Filter by aisle if selected
        const filteredProducts = selectedAisle
          ? data.filter((product: Product) => product.category === selectedAisle)
          : data;
        
        setProducts(filteredProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedAisle]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-12">
        <div className="text-gray-600 mb-2">
          {selectedAisle ? `No products found in ${selectedAisle} aisle.` : "No products available."}
        </div>
        {selectedAisle && (
          <button
            onClick={() => window.location.href = '/'}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View all products
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

