import { SiteHeader } from "@/components/layout/site-header";
import { HeroSlider } from "./hero-slider";
import { FeaturedTours } from "./featured-tours";
import { NewsletterAwards } from "./newsletter-awards";
import {
  PopularDestinationsSection,
  WhyUsAndAdventuresSection,
  LookingForSection,
} from "./home-sections";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

import type { Destination, TourItem } from "@/lib/types";

interface TravelHomeProps {
  destinations?: Destination[];
  tours?: TourItem[];
}

export function TravelHome({ destinations, tours }: TravelHomeProps = {}) {
  return (
    <main className="w-full template-page-bg text-[#282828]">
      {/* 1. HERO SLIDER BANNER */}
      <section className="relative w-full overflow-hidden">
        <SiteHeader overlay />
        <HeroSlider />
      </section>

      {/* TRANSITION DIVIDER 1 */}
      <div className="section-divider opacity-75" />

      {/* 2. POPULAR DESTINATIONS (Internal stagger & heading reveals) */}
      <PopularDestinationsSection destinations={destinations} />

      {/* TRANSITION DIVIDER 2 */}
      <div className="section-divider opacity-75" />

      {/* 3. FEATURED TOURS */}
      <ScrollReveal direction="up" distance={32} duration={1150} threshold={0.06}>
        <FeaturedTours initialTours={tours} />
      </ScrollReveal>
      {/* TRANSITION DIVIDER 3 */}
      <div className="section-divider opacity-75" />

      {/* 4. WHY US & ADVENTURES (Internal stagger & heading reveals) */}
      <WhyUsAndAdventuresSection />

      {/* TRANSITION DIVIDER 4 */}
      <div className="section-divider opacity-75" />

      {/* 5. NEWSLETTER & AWARD WINNING */}
      <ScrollReveal direction="up" distance={32} duration={1150} threshold={0.06}>
        <NewsletterAwards />
      </ScrollReveal>

      {/* 6. LOOKING FOR AN EXPERIENCE? */}
      <ScrollReveal direction="up" distance={32} duration={1150} threshold={0.06}>
        <LookingForSection />
      </ScrollReveal>
    </main>
  );
}
