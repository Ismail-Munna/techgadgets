import Link from "next/link";
import { SectionHeading } from "@/components/sections/SectionHeading";
import type { Category } from "@/lib/site-content";

interface CategoriesGridSectionProps {
  categories: Category[];
}

export function CategoriesGridSection({
  categories,
}: CategoriesGridSectionProps) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Categories"
          title="Explore categories built around real use"
          description="Shop curated collections for audio, wearables, workstations, smart home upgrades, and other dependable everyday tech."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <article
                key={category.name}
                className="group flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-6 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {category.name}
                    </h3>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                      {category.productCount} items
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {category.description}
                  </p>
                </div>
                <Link
                  href={category.href}
                  className="mt-8 inline-flex items-center text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
                >
                  View collection
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
