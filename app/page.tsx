import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to ShopHub</h1>
        <p className="text-gray-600">Discover amazing products at great prices</p>
      </div>
      <ProductGrid />
    </div>
  );
}

