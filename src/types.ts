export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  bgGradientStart: string;
  bgGradientEnd: string;
  glowColor: string;
  fontFamily: string;
  darkTheme: boolean;
  particlesEnabled?: boolean;
  movingLinesEnabled?: boolean;
  gridEnabled?: boolean;
  glowingOrbsEnabled?: boolean;
  starsEnabled?: boolean;
  shootingStarsEnabled?: boolean;
}

export interface HeroConfig {
  avatarUrl: string;
  title: string;
  subtitle: string;
  statusText: string;
  showScrollHint: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  img: string;
  videoUrl?: string;
}

export interface AboutConfig {
  text: string;
  profileImgUrl: string;
  skills: string[];
}

export interface WebstoreProduct {
  title: string;
  desc: string;
  price: string;
  emailSubject: string;
}

export interface ContactConfig {
  email: string;
  discordUrl: string;
  discordUsername?: string;
  webstoreUrl: string;
  webstoreProducts: WebstoreProduct[];
  instagramUrl: string;
}

export interface SettingsConfig {
  siteTitle: string;
  faviconUrl: string;
  seoDesc: string;
  copyrightText: string;
}

export interface SiteConfig {
  theme: ThemeConfig;
  hero: HeroConfig;
  thumbnails: PortfolioItem[];
  logos: PortfolioItem[];
  skins: PortfolioItem[];
  animations: PortfolioItem[];
  about: AboutConfig;
  contact: ContactConfig;
  settings: SettingsConfig;
}
