import { SectionHeading } from "@/components/sections/SectionHeading";
import type { CompanyHighlight } from "@/lib/site-content";

interface WhyChooseUsSectionProps {
  highlights: CompanyHighlight[];
}

export function WhyChooseUsSection({
  highlights,
}: WhyChooseUsSectionProps) {
  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="A cleaner way to shop modern tech"
          description="TechGadgets combines focused product selection, dependable quality, and customer-first support so every upgrade feels easier to trust."
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {highlights.map((highlight) => {
            const Icon = highlight.icon;

            return (
              <article
                key={highlight.title}
                className="group flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {highlight.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
                  {highlight.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
