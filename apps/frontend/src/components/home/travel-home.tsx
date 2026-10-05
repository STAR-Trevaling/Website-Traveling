import { SiteHeader } from "@/components/layout/site-header";
import { HeroSlider } from "./hero-slider";
import { FeaturedTours } from "./featured-tours";
import { NewsletterAwards } from "./newsletter-awards";
import {
  PopularDestinationsSection,
  WhyUsAndAdventuresSection,
  LookingForSection,
} from "./home-sections";

export function TravelHome() {
  return (
    <main className="w-full template-page-bg text-[#282828] overflow-x-hidden">
      {/* 1. HERO SLIDER BANNER */}
      <section className="relative w-full overflow-hidden">
        <SiteHeader overlay />
        <HeroSlider />
      </section>

      {/* 2. POPULAR DESTINATIONS */}
      <PopularDestinationsSection />

      {/* 3. FEATURED TOURS */}
      <FeaturedTours />

      {/* 4. WHY US & ADVENTURES */}
      <WhyUsAndAdventuresSection />

      {/* 5. NEWSLETTER & AWARD WINNING */}
      <NewsletterAwards />

      {/* 6. LOOKING FOR AN EXPERIENCE? */}
      <LookingForSection />
    </main>
  );
}
