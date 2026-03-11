import Link from "next/link";
import {
  Facebook,
  Github,
  Instagram,
  ShoppingCart,
  Twitter,
} from "lucide-react";

const footerGroups = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Featured Products", href: "/#featured-products" },
      { label: "New Arrivals", href: "/products" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "mailto:support@techgadgets.com" },
      { label: "FAQs", href: "/about" },
      { label: "Shipping & Returns", href: "/about" },
      { label: "Track Order", href: "/login" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Twitter", href: "#", icon: Twitter },
  { label: "GitHub", href: "#", icon: Github },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-900">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1.15fr_1.85fr] xl:gap-14">
          <div className="rounded-3xl border border-slate-800 bg-white/[0.04] p-7 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.85)] backdrop-blur-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-300">
              Modern Tech Store
            </p>
            <Link href="/" className="mt-4 inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300 ring-1 ring-white/10">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                TechGadgets
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-300">
              Curated electronics, smart devices, and everyday accessories for
              shoppers who want dependable performance, cleaner choices, and a
              more confident buying experience.
            </p>

            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((socialLink) => {
                const Icon = socialLink.icon;

                return (
                  <a
                    key={socialLink.label}
                    href={socialLink.href}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-800 bg-white/[0.05] text-gray-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-indigo-400/10 hover:text-indigo-400"
                    aria-label={socialLink.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
                  {group.title}
                </h2>
                <ul className="mt-5 space-y-3.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-300 transition-colors hover:text-indigo-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-gray-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} TechGadgets. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/about"
              className="transition-colors hover:text-indigo-400"
            >
              About
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-indigo-400"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-indigo-400"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
