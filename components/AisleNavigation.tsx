"use client";

import { useState, useEffect } from "react";
import { apiClient, Aisle } from "@/lib/api";
import Link from "next/link";

export default function AisleNavigation() {
  const [aisles, setAisles] = useState<Aisle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAisles = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiClient.getAisles();
        setAisles(data);
      } catch (error) {
        console.error("Failed to fetch aisles:", error);
        setError("Failed to load aisles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAisles();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-center py-4">
          <div className="text-gray-500">Loading aisles...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col justify-center items-center py-4">
          <div className="text-red-600 mb-2">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="text-blue-600 hover:text-blue-800 underline text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (aisles.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-center py-4">
          <div className="text-gray-500">No aisles available.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Shop by Aisle</h2>
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth snap-x snap-mandatory">
            {aisles.map((aisle) => (
              <Link
                key={aisle.name}
                href={`/?aisle=${encodeURIComponent(aisle.name)}`}
                className="flex flex-col items-center group flex-shrink-0 snap-center min-w-[100px]"
                title={aisle.name}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 border-4 border-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group-hover:scale-110 cursor-pointer">
                  <span className="text-4xl">{aisle.icon}</span>
                </div>
                <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 text-center max-w-[100px] truncate">
                  {aisle.name}
                </span>
                <span className="text-xs text-gray-500">{aisle.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

