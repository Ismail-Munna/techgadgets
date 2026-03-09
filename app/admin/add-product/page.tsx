import { Metadata } from "next";
import AddProductForm from "./add-product-form";

export const metadata: Metadata = {
  title: "Add Product | TechGadgets Admin",
  description: "Add a new product to the store.",
};

export default function AddProductPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Add New Product</h1>
          <p className="mt-2 text-gray-600">
            Fill out the form below to add a new product to your inventory.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <AddProductForm />
        </div>
      </div>
    </div>
  );
}
