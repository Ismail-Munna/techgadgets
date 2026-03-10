import type { Metadata } from "next";
import { CategoriesGridSection } from "@/components/sections/CategoriesGridSection";
import { categories } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Categories | TechGadgets",
  description: "Browse TechGadgets by category to find the right setup faster.",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CategoriesGridSection categories={categories} />
    </div>
  );
}
