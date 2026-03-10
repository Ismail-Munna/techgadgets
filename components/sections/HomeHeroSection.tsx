import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HomeHeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.35),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.2),_transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-medium text-indigo-100 backdrop-blur">
            Curated gear for modern life
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Tech that feels considered before it ever reaches your desk.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
            Shop premium gadgets, smart home essentials, and productivity tools
            selected for performance, reliability, and everyday usefulness.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-indigo-400"
            >
              Shop now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10"
            >
              Browse categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
