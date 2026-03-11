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
    <footer className="relative border-t border-slate-800 bg-slate-900">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-18">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] xl:gap-8">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-indigo-400" />
              <span className="text-xl font-bold tracking-tight text-white">
                TechGadgets
              </span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              Curated electronics, smart devices, and everyday accessories for
              people who want reliable technology without the clutter.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((socialLink) => {
                const Icon = socialLink.icon;

                return (
                  <a
                    key={socialLink.label}
                    href={socialLink.href}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400 transition-all duration-200 hover:border-indigo-400/50 hover:bg-slate-800 hover:text-indigo-400"
                    aria-label={socialLink.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-white">
                {group.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-300 transition-colors hover:text-indigo-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
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
