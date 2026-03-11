import { Metadata } from "next";
import { products } from "@/lib/data";
import ProductsCatalog from "./products-catalog";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Products | TechGadgets",
  description: "Browse our collection of premium tech gadgets.",
};

export default function ProductsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">All Products</h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Explore our full range of high-quality electronics, smart home devices, and accessories designed to make your life easier.
          </p>
        </div>

        <ProductsCatalog products={products} />
      </div>
    </div>
  );
}
