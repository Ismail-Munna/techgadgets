import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { HomeHeroSection } from "@/components/sections/HomeHeroSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { products } from "@/lib/data";
import { testimonials } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="bg-white">
      <HomeHeroSection />
      <FeaturedProductsSection products={products.slice(0, 4)} />
      <TestimonialsSection testimonials={testimonials} />
      <NewsletterSection />
    </div>
  );
}
