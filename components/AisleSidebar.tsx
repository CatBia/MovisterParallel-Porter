"use client";

import { useState, useEffect } from "react";
import { apiClient, Aisle } from "@/lib/api";

interface AisleSidebarProps {
  selectedAisle: string | null;
  onAisleSelect: (aisle: string | null) => void;
}

export default function AisleSidebar({ selectedAisle, onAisleSelect }: AisleSidebarProps) {
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
        setError("Failed to load aisles.");
      } finally {
        setLoading(false);
      }
    };

    fetchAisles();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="text-red-600 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Aisles</h3>
      <button
        onClick={() => onAisleSelect(null)}
        className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition-colors ${
          selectedAisle === null
            ? "bg-blue-100 text-blue-700 font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        All Products
      </button>
      <div className="space-y-2">
        {aisles.map((aisle) => (
          <button
            key={aisle.name}
            onClick={() => onAisleSelect(aisle.name)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center justify-between ${
              selectedAisle === aisle.name
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-xl">{aisle.icon}</span>
              <span>{aisle.name}</span>
            </span>
            <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
              {aisle.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

