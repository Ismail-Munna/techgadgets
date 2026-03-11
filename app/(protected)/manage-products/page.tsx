import type { Metadata } from "next";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import ProductTable from "@/app/admin/manage-products/product-table";

export const metadata: Metadata = {
  title: "Manage Products | TechGadgets",
  description: "Manage your store products.",
};

export default function ManageProductsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Manage Products
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              A list of all the products in your store including their title, price,
              priority, and date added.
            </p>
          </div>

          <Link
            href="/add-product"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <ProductTable />
        </div>
      </div>
    </div>
  );
}
