import { SectionHeading } from "@/components/sections/SectionHeading";
import type { CompanyHighlight } from "@/lib/site-content";

interface AboutIntroductionSectionProps {
  highlights: CompanyHighlight[];
}

export function AboutIntroductionSection({
  highlights,
}: AboutIntroductionSectionProps) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <SectionHeading
            eyebrow="About"
            title="Technology should feel useful, not overwhelming."
            description="TechGadgets started with a simple goal: help people buy better electronics without sorting through endless noise. We curate products that earn their place through everyday performance, thoughtful design, and long-term value."
          />
          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
            We work across consumer electronics, productivity gear, and smart
            home devices, combining editorial curation with hands-on product
            knowledge so every collection feels intentional.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {highlights.map((highlight) => {
            const Icon = highlight.icon;

            return (
              <article
                key={highlight.title}
                className="rounded-3xl border border-gray-200 bg-gray-50 p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {highlight.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
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
