import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { CategoriesGridSection } from "@/components/sections/CategoriesGridSection";
import { HomeHeroSection } from "@/components/sections/HomeHeroSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { products } from "@/lib/data";
import {
  categories,
  companyHighlights,
  testimonials,
} from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="bg-white">
      <HomeHeroSection />
      <FeaturedProductsSection products={products.slice(0, 4)} />
      <WhyChooseUsSection highlights={companyHighlights} />
      <CategoriesGridSection categories={categories} />
      <TestimonialsSection testimonials={testimonials} />
    </div>
  );
}
