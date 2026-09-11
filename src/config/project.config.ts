/**
 * CORE PROJECT CONFIGURATION
 * Centralized settings for Branding, Features, i18n, SEO, and API.
 * Modify this single file to re-brand or configure any demo project.
 */

export interface ProjectConfig {
  app: {
    id: string;
    name: string;
    version: string;
    environment: 'development' | 'staging' | 'production';
  };
  client: {
    brandName: string;
    tagline: string;
    description: string;
    industry: string;
    logoUrl?: string;
    faviconUrl?: string;
    contact: {
      hotline: string;
      email: string;
      address: string;
      socials?: {
        facebook?: string;
        instagram?: string;
        tiktok?: string;
      };
    };
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    canonicalUrl: string;
    ogImage: string;
    keywords: string[];
    author: string;
  };
  i18n: {
    defaultLocale: 'vi' | 'en';
    supportedLocales: Array<{ code: 'vi' | 'en'; label: string; flag: string }>;
  };
  features: {
    enableI18n: boolean;
    enableCart: boolean;
    enableQuickDelivery: boolean;
    enableWorkshopBooking: boolean;
    enableUserAuth: boolean;
    enableSystemDesignView: boolean;
    enableMockApi: boolean;
  };
  api: {
    baseUrl: string;
    timeout: number;
    mockLatencyMs: number;
  };
}

export const projectConfig: ProjectConfig = {
  app: {
    id: 'lumina-coffee-demo',
    name: 'Lumina Specialty Coffee',
    version: '1.2.0',
    environment: 'development',
  },
  client: {
    brandName: 'Lumina Coffee Roastery',
    tagline: 'Hành Trình Tinh Hoa Cà Phê Đặc Sản',
    description: 'Nền tảng thương mại điện tử & trải nghiệm cà phê thủ công cao cấp nguyên bản từ Cầu Đất, Đà Lạt.',
    industry: 'F&B / Specialty Coffee & Roastery',
    logoUrl: '/assets/logo.svg',
    contact: {
      hotline: '0901 888 234',
      email: 'hello@luminacoffee.vn',
      address: '28 Thảo Điền, P. Thảo Điền, TP. Thủ Đức, TP.HCM',
      socials: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        tiktok: 'https://tiktok.com',
      },
    },
  },
  seo: {
    defaultTitle: 'Lumina Specialty Coffee — Thưởng thức cà phê đặc sản nguyên bản',
    titleTemplate: '%s | Lumina Specialty Coffee',
    defaultDescription: 'Trải nghiệm cà phê đặc sản Việt Nam: hạt rang mộc Cầu Đất, Cold Brew đóng lon giữ nhiệt, khóa học thử nếm Cupping Workshop.',
    canonicalUrl: 'https://lumina-coffee.vercel.app',
    ogImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    keywords: ['cà phê đặc sản', 'specialty coffee', 'arabica cầu đất', 'cold brew', 'cupping workshop', 'cà phê rang mộc'],
    author: 'Lumina Development Team',
  },
  i18n: {
    defaultLocale: 'vi',
    supportedLocales: [
      { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
      { code: 'en', label: 'English', flag: '🇬🇧' },
    ],
  },
  features: {
    enableI18n: true,
    enableCart: true,
    enableQuickDelivery: true,
    enableWorkshopBooking: true,
    enableUserAuth: true,
    enableSystemDesignView: true,
    enableMockApi: true,
  },
  api: {
    baseUrl: process.env.VITE_API_URL || '/api',
    timeout: 8000,
    mockLatencyMs: 400,
  },
};
