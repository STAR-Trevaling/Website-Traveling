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

export function TravelHome() {
  return (
    <main className="w-full template-page-bg text-[#282828] overflow-x-hidden">
      {/* 1. HERO SLIDER BANNER */}
      <section className="relative w-full overflow-hidden">
        <SiteHeader overlay />
        <HeroSlider />
      </section>

      {/* TRANSITION DIVIDER 1 */}
      <div className="section-divider opacity-75" />

      {/* 2. POPULAR DESTINATIONS */}
      <ScrollReveal direction="up" distance={28} duration={750} threshold={0.06}>
        <PopularDestinationsSection />
      </ScrollReveal>

      {/* TRANSITION DIVIDER 2 */}
      <div className="section-divider opacity-75" />

      {/* 3. FEATURED TOURS */}
      <ScrollReveal direction="up" distance={28} duration={750} threshold={0.06}>
        <FeaturedTours />
      </ScrollReveal>

      {/* TRANSITION DIVIDER 3 */}
      <div className="section-divider opacity-75" />

      {/* 4. WHY US & ADVENTURES */}
      <ScrollReveal direction="up" distance={28} duration={750} threshold={0.05}>
        <WhyUsAndAdventuresSection />
      </ScrollReveal>

      {/* TRANSITION DIVIDER 4 */}
      <div className="section-divider opacity-75" />

      {/* 5. NEWSLETTER & AWARD WINNING */}
      <ScrollReveal direction="up" distance={28} duration={750} threshold={0.06}>
        <NewsletterAwards />
      </ScrollReveal>

      {/* 6. LOOKING FOR AN EXPERIENCE? */}
      <ScrollReveal direction="fade" duration={650} threshold={0.08}>
        <LookingForSection />
      </ScrollReveal>
    </main>
  );
}
