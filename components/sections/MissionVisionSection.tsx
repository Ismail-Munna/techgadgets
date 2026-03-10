import { SectionHeading } from "@/components/sections/SectionHeading";
import type { MissionVisionItem } from "@/lib/site-content";

interface MissionVisionSectionProps {
  items: MissionVisionItem[];
}

export function MissionVisionSection({
  items,
}: MissionVisionSectionProps) {
  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Direction"
          title="Mission and vision"
          description="The business is built around trusted recommendations today and a cleaner buying experience tomorrow."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-3xl bg-slate-950 p-8 text-white"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-indigo-200">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-300">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
