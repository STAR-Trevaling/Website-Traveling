export type Locale = "vi" | "en";

export interface NavTranslations {
  home: string;
  packages: string;
  tours: string;
  aboutUs: string;
  contact: string;
  login: string;
  account: string;
  phoneLabel: string;
  emailLabel: string;
}

export interface HeroTranslations {
  discoverTitle: string;
  discoverSubtitle: string;
  exploreDestinationsBtn: string;
  viewToursBtn: string;
  slides: Array<{
    title: string;
    subtitle: string;
    tag: string;
  }>;
}

export interface DestinationsSectionTranslations {
  tag: string;
  heading: string;
  subheading: string;
  viewAllBtn: string;
}

export interface FeaturedSectionTranslations {
  heading: string;
  subheading: string;
  viewAllBtn: string;
  pricePerPerson: string;
}

export interface WhyUsTranslations {
  heading: string;
  items: Array<{
    title: string;
    desc: string;
  }>;
}

export interface AdventuresTranslations {
  heading: string;
  items: {
    canalCruise: { title: string; desc: string };
    sailing: { title: string; desc: string };
    hiking: { title: string; desc: string };
    camping: { title: string; desc: string };
    scubaDiving: { title: string; desc: string };
  };
}

export interface NewsletterTranslations {
  heading: string;
  subheading: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  submitBtn: string;
  successMessage: string;
}

export interface AwardsTranslations {
  heading: string;
  subheading: string;
  items: Array<{
    title: string;
    subtitle: string;
  }>;
}

export interface LookingForTranslations {
  heading: string;
  subheading: string;
  button: string;
}

export interface FooterTranslations {
  tagline: string;
  home: string;
  aboutUs: string;
  destinations: string;
  experiences: string;
  tours: string;
  stories: string;
  contact: string;
  partner: string;
  copyright: string;
}

export interface TranslationDictionary {
  nav: NavTranslations;
  hero: HeroTranslations;
  destinations: DestinationsSectionTranslations;
  featured: FeaturedSectionTranslations;
  whyUs: WhyUsTranslations;
  adventures: AdventuresTranslations;
  newsletter: NewsletterTranslations;
  awards: AwardsTranslations;
  lookingFor: LookingForTranslations;
  footer: FooterTranslations;
}
