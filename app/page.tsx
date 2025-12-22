"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import AisleNavigation from "@/components/AisleNavigation";
import AisleSidebar from "@/components/AisleSidebar";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedAisle, setSelectedAisle] = useState<string | null>(null);

  useEffect(() => {
    const aisle = searchParams.get("aisle");
    setSelectedAisle(aisle);
  }, [searchParams]);

  const handleAisleSelect = (aisle: string | null) => {
    setSelectedAisle(aisle);
    if (aisle) {
      router.push(`/?aisle=${encodeURIComponent(aisle)}`);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to ShopHub</h1>
        <p className="text-gray-600">Discover amazing products at great prices</p>
      </div>
      
      <AisleNavigation />
      
      <div className="flex gap-8">
        {/* Sidebar for desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <AisleSidebar selectedAisle={selectedAisle} onAisleSelect={handleAisleSelect} />
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          {selectedAisle && (
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                {selectedAisle} Aisle
              </h2>
              <button
                onClick={() => handleAisleSelect(null)}
                className="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                Clear filter
              </button>
            </div>
          )}
          <ProductGrid selectedAisle={selectedAisle} />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}

