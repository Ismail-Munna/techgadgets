import type { LucideIcon } from "lucide-react";
import {
  Headphones,
  Layers3,
  Lightbulb,
  MonitorSmartphone,
  Radar,
  ShieldCheck,
  Sparkles,
  Users,
  Watch,
} from "lucide-react";

export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export interface Category {
  name: string;
  description: string;
  productCount: number;
  href: string;
  icon: LucideIcon;
}

export interface CompanyHighlight {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface MissionVisionItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah J.",
    role: "Tech Enthusiast",
    text: "The product quality is consistently high, and the recommendations feel genuinely curated instead of generic.",
  },
  {
    name: "Mike T.",
    role: "Software Engineer",
    text: "I rebuilt my desk setup from this store. Shipping was fast, and every item felt worth the spend.",
  },
  {
    name: "Emily R.",
    role: "Digital Nomad",
    text: "The catalog is focused enough that I can find reliable travel gear without overthinking every purchase.",
  },
];

export const categories: Category[] = [
  {
    name: "Audio",
    description: "Headphones, speakers, and listening gear for focused work and immersive downtime.",
    productCount: 12,
    href: "/products",
    icon: Headphones,
  },
  {
    name: "Wearables",
    description: "Smart watches and health-focused accessories that keep key signals close at hand.",
    productCount: 8,
    href: "/products",
    icon: Watch,
  },
  {
    name: "Workstations",
    description: "Laptops, ergonomic upgrades, and productivity tools for efficient daily setups.",
    productCount: 10,
    href: "/products",
    icon: MonitorSmartphone,
  },
  {
    name: "Smart Home",
    description: "Connected hubs and automation essentials that make the home easier to manage.",
    productCount: 9,
    href: "/products",
    icon: Layers3,
  },
  {
    name: "Mobile Creators",
    description: "Portable cameras and accessories for capturing content while moving fast.",
    productCount: 6,
    href: "/products",
    icon: Radar,
  },
  {
    name: "Trusted Essentials",
    description: "Reliable everyday tech with strong value, long-term utility, and fewer compromises.",
    productCount: 14,
    href: "/products",
    icon: ShieldCheck,
  },
];

export const companyHighlights: CompanyHighlight[] = [
  {
    title: "Curated Products",
    description: "Every product earns its place through useful features, dependable performance, and a clear fit for daily life.",
    icon: Sparkles,
  },
  {
    title: "Trusted Quality",
    description: "We prioritize reliable electronics and accessories that balance design, durability, and long-term value.",
    icon: ShieldCheck,
  },
  {
    title: "Customer First Support",
    description: "Shopping stays straightforward with clearer product guidance and responsive help before and after checkout.",
    icon: Users,
  },
];

export const missionAndVision: MissionVisionItem[] = [
  {
    title: "Mission",
    description: "Help customers discover dependable technology faster by combining strong curation, clear product storytelling, and a storefront that stays easy to navigate.",
    icon: ShieldCheck,
  },
  {
    title: "Vision",
    description: "Build a modern electronics store where every category feels editorially selected, every recommendation feels earned, and buying tech feels calm instead of chaotic.",
    icon: Sparkles,
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Nadia Rahman",
    role: "Founder & Merchandising Lead",
    bio: "Nadia shapes the assortment and makes sure the catalog stays disciplined, useful, and current.",
    initials: "NR",
  },
  {
    name: "Owen Carter",
    role: "Customer Experience Manager",
    bio: "Owen translates feedback from shoppers into better support flows and clearer onsite guidance.",
    initials: "OC",
  },
  {
    name: "Priya Sen",
    role: "Product Content Strategist",
    bio: "Priya connects technical detail with plain-language storytelling so customers can compare products quickly.",
    initials: "PS",
  },
];
