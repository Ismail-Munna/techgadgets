import type { Metadata } from "next";
import { Headset, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About | TechGadgets",
  description: "Learn how TechGadgets curates modern tech for work, play, and home.",
};

const aboutCards = [
  {
    title: "Curated Products",
    description:
      "We select electronics, smart devices, and accessories with a clear reason to be in the catalog, so customers spend less time sorting through noise.",
    icon: Sparkles,
  },
  {
    title: "Trusted Quality",
    description:
      "Each collection is built around dependable performance, practical value, and products that fit real daily routines at home, at work, and on the go.",
    icon: ShieldCheck,
  },
  {
    title: "Customer First Support",
    description:
      "From product discovery to post-purchase help, we focus on straightforward guidance and responsive support that keeps shopping simple.",
    icon: Headset,
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-x-0 top-0 -z-10 h-56 bg-gradient-to-b from-indigo-50 via-white to-white" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm">
            <div className="grid gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-12 lg:py-14">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
                  About Us
                </p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                  TechGadgets helps people buy better technology with more clarity
                  and less guesswork.
                </h1>

                <div className="mt-6 space-y-5 text-base leading-7 text-gray-600 sm:text-lg">
                  <p>
                    We built TechGadgets for shoppers who want quality electronics,
                    smart home devices, and everyday accessories without digging
                    through endless low-signal options. Our catalog stays focused so
                    every product feels intentional.
                  </p>
                  <p>
                    Instead of chasing every trend, we prioritize useful technology
                    that fits real routines, whether that means upgrading a workspace,
                    simplifying home automation, or finding reliable gear for daily
                    carry.
                  </p>
                  <p>
                    The result is a cleaner, more dependable shopping experience
                    shaped by thoughtful curation, clear product storytelling, and
                    support that puts customer confidence first.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {aboutCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <article
                      key={card.title}
                      className="group flex h-full flex-col rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200 transition-colors group-hover:bg-indigo-50 group-hover:ring-indigo-100">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="mt-5 text-lg font-semibold text-gray-900">
                        {card.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {card.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
