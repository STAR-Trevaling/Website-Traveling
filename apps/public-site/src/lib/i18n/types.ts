export type Locale = "vi" | "en";

export interface NavTranslations {
  home: string;
  explore: string;
  destinations: string;
  packages: string;
  tours: string;
  stories: string;
  aboutMenu: string;
  aboutUs: string;
  partner: string;
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

export interface CommonTranslations {
  explore: string;
  details: string;
  viewAll: string;
  reviews: string;
  fromPrice: string;
  currencyVND: string;
  search: string;
  searchAria: string;
  backHome: string;
  phone: string;
  email: string;
  freeSupport247: string;
  featured: string;
}

export interface ToursTranslations {
  heroTitle: string;
  heroSubtitle: string;
  searchLabel: string;
  searchPlaceholder: string;
  regionLabel: string;
  regions: {
    all: string;
    north: string;
    central: string;
    south: string;
  };
  sortLabel: string;
  sortOptions: {
    featured: string;
    priceAsc: string;
    priceDesc: string;
  };
  resultsFoundText: string; // e.g. "Tìm thấy {count} tour du lịch trọn gói phù hợp"
  priceFrom: string;
  reviewsCountText: string; // e.g. "{count} đánh giá"
  viewDetails: string;
  noResults: string;
}

export interface TourDetailTranslations {
  durationLabel: string;
  departureLabel: string;
  highlightsTitle: string;
  itineraryTitle: string;
  inclusionsTitle: string;
  exclusionsTitle: string;
  relatedToursTitle: string;
  dayLabel: string;
  morning: string;
  afternoon: string;
  evening: string;
  hotlineAssist: string;
  reviewsText: string;
  bookingCard: {
    priceFrom: string;
    perPerson: string;
    departureDate: string;
    adults: string;
    children: string;
    childDiscountNote: string;
    totalPrice: string;
    bookNowBtn: string;
    bookingModalTitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    confirmBookingBtn: string;
    bookingSuccess: string;
    modalSubtitle: string;
  };
}

export interface ExperiencesTranslations {
  heroTitle: string;
  heroSubtitle: string;
  badge: string;
  heading: string;
  categories: {
    all: string;
    cruise: string;
    watersports: string;
    trekking: string;
    camping: string;
    scuba: string;
  };
  noResults: string;
  noResultsSearch: string;
  viewAllBtn: string;
  ctaHeading: string;
  ctaDesc: string;
  ctaToursBtn: string;
  ctaConsultBtn: string;
}

export interface ExperienceDetailTranslations {
  breadcrumbHome: string;
  breadcrumbExp: string;
  duration: string;
  durationValue: string;
  groupSize: string;
  groupSizeValue: string;
  rating: string;
  safety: string;
  safetyValue: string;
  overviewTitle: string;
  highlightsTitle: string;
  reviewsTitle: string;
  writeReviewTitle: string;
  ratingScore: string;
  reviewComment: string;
  reviewCommentPlaceholder: string;
  submitReview: string;
  submitSuccess: string;
  relatedTitle: string;
  bookingCard: {
    title: string;
    priceFrom: string;
    perPerson: string;
    selectDate: string;
    guests: string;
    total: string;
    bookBtn: string;
    contactConsult: string;
    successMsg: string;
  };
}

export interface DestinationsPageTranslations {
  heroTitle: string;
  heroSubtitle: string;
  badge: string;
  heading: string;
  subheading: string;
  searchPlaceholder: string;
  searchAria: string;
  noResults: string;
  noResultsSearch: string;
  viewAllBtn: string;
  ctaHeading: string;
  ctaDesc: string;
  ctaExpBtn: string;
  ctaToursBtn: string;
  fromPrice: string;
  featuredBadge: string;
  exploreBtn: string;
}

export interface DestinationDetailTranslations {
  overviewBadge: string;
  overviewHeading: string;
  featuredToursBadge: string;
  featuredToursHeading: string;
  experiencesBadge: string;
  experiencesHeading: string;
  viewAllTours: string;
  viewAllExp: string;
  noTours: string;
  noExperiences: string;
}

export interface AboutTranslations {
  heroTitle: string;
  heroSubtitle: string;
  storyBadge: string;
  storyHeading: string;
  storyP1: string;
  storyP2: string;
  storyP3: string;
  storyCheck1: string;
  storyCheck2: string;
  pillarsBadge: string;
  pillarsHeading: string;
  pillars: Array<{
    title: string;
    subtitle: string;
    desc: string;
  }>;
  metrics: Array<{
    value: string;
    label: string;
    sublabel: string;
  }>;
  awardsBadge: string;
  awardsHeading: string;
  awardsSubheading: string;
  awards: Array<{
    title: string;
    category: string;
    desc: string;
  }>;
  ctaBadge: string;
  ctaHeading: string;
  ctaDesc: string;
  ctaExploreBtn: string;
  ctaContactBtn: string;
}

export interface ContactTranslations {
  heroTitle: string;
  heroSubtitle: string;
  channelsBadge: string;
  channelsHeading: string;
  channels: Array<{
    title: string;
    primary: string;
    secondary: string;
  }>;
  officesBadge: string;
  officesHeading: string;
  offices: Array<{
    city: string;
    address: string;
    phone: string;
  }>;
  formBadge: string;
  formTitle: string;
  formDesc: string;
  form: {
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    destination: string;
    destinationPlaceholder: string;
    guests: string;
    guestsPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
  };
  faqBadge: string;
  faqHeading: string;
  faqList: Array<{
    q: string;
    a: string;
  }>;
}

export interface PartnerTranslations {
  heroTitle: string;
  heroSubtitle: string;
  benefitsBadge: string;
  benefitsHeading: string;
  benefits: Array<{
    title: string;
    desc: string;
  }>;
  stepsBadge: string;
  stepsHeading: string;
  steps: Array<{
    num: string;
    title: string;
    desc: string;
  }>;
  formBadge: string;
  formTitle: string;
  formDesc: string;
  form: {
    companyName: string;
    companyNamePlaceholder: string;
    contactPerson: string;
    contactPersonPlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    businessType: string;
    businessTypes: {
      travel: string;
      cruise: string;
      trekking: string;
      resort: string;
      other: string;
    };
    location: string;
    locationPlaceholder: string;
    portfolioLink: string;
    portfolioLinkPlaceholder: string;
    notes: string;
    notesPlaceholder: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
  };
}

export interface StoriesTranslations {
  heroTitle: string;
  heroSubtitle: string;
  featuredBadge: string;
  readTimeSuffix: string;
  byAuthor: string;
  relatedHeading: string;
  shareArticle: string;
  backToStories: string;
  notFound: string;
}

export interface AuthTranslations {
  loginPageTitle: string;
  loginPageDesc: string;
  loginHeroTitle: string;
  loginHeroSubtitle: string;
  loginCardTitle: string;
  loginCardSubtitle: string;
  usernameLabel: string;
  passwordLabel: string;
  usernamePlaceholder: string;
  passwordPlaceholder: string;
  signInBtn: string;
  noAccountPrompt: string;
  registerLink: string;
  registerPageTitle: string;
  registerPageDesc: string;
  registerHeroTitle: string;
  registerHeroSubtitle: string;
  registerCardTitle: string;
  registerCardSubtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  roleLabel: string;
  roles: {
    traveler: string;
    partner: string;
    admin: string;
  };
  signUpBtn: string;
  hasAccountPrompt: string;
  loginLink: string;
  accountWelcome: string;
  accountRolePrefix: string;
  logoutBtn: string;
  exploreToursCard: string;
  exploreToursDesc: string;
  savedExperiencesCard: string;
  savedExperiencesDesc: string;
  securitySettingsCard: string;
  securitySettingsDesc: string;
}

export interface NotFoundTranslations {
  errorCode: string;
  title: string;
  description: string;
  backHomeBtn: string;
  exploreToursBtn: string;
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
  common: CommonTranslations;
  toursPage: ToursTranslations;
  tourDetailPage: TourDetailTranslations;
  experiencesPage: ExperiencesTranslations;
  experienceDetailPage: ExperienceDetailTranslations;
  destinationsPage: DestinationsPageTranslations;
  destinationDetailPage: DestinationDetailTranslations;
  aboutPage: AboutTranslations;
  contactPage: ContactTranslations;
  partnerPage: PartnerTranslations;
  storiesPage: StoriesTranslations;
  authPages: AuthTranslations;
  notFoundPage: NotFoundTranslations;
}
