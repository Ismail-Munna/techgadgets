import type { Metadata } from "next";
import AddProductForm from "@/app/admin/add-product/add-product-form";

export const metadata: Metadata = {
  title: "Add Product | TechGadgets",
  description: "Add a product to your store.",
};

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Add New Product
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Fill out the form below to add a new product to your inventory.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <AddProductForm />
        </div>
      </div>
    </div>
  );
}
