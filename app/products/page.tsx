import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, ArrowRight } from "lucide-react";
import { products } from "@/lib/data";

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

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
              placeholder="Search products..."
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap">
              <Filter className="h-4 w-4 mr-2" /> Filters
            </button>
            <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium whitespace-nowrap">All</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium whitespace-nowrap">Audio</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium whitespace-nowrap">Wearables</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium whitespace-nowrap">Computers</button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-800 backdrop-blur-sm shadow-sm">
                    {product.priority} Priority
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{product.title}</h3>
                  <span className="text-lg font-bold text-indigo-600 whitespace-nowrap">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mb-6 line-clamp-2 flex-grow">{product.shortDescription}</p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 flex items-center">
                    View Details <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
