import { Metadata } from "next";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import ProductTable from "./product-table";

export const metadata: Metadata = {
  title: "Manage Products | TechGadgets Admin",
  description: "Manage your store inventory.",
};

export default function ManageProductsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Products</h1>
            <p className="mt-2 text-sm text-gray-600">
              A list of all the products in your store including their title, price, and priority.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/admin/add-product"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              <PlusCircle className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Product
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-300 sm:rounded-lg overflow-hidden">
          <ProductTable />
        </div>
      </div>
    </div>
  );
}
