import React, { useEffect } from 'react';
import { projectConfig } from '../../config/project.config';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  canonicalUrl?: string;
  schema?: Record<string, any>;
}

/**
 * SEOHead Component
 * Dynamically synchronizes document title, meta tags, and JSON-LD structured data.
 * Compatible with SPA and ready for Next.js Head export.
 */
export const SEOHead: React.FC<SEOProps> = ({
  title,
  description = projectConfig.seo.defaultDescription,
  keywords = projectConfig.seo.keywords,
  ogImage = projectConfig.seo.ogImage,
  ogType = 'website',
  canonicalUrl = projectConfig.seo.canonicalUrl,
  schema,
}) => {
  const fullTitle = title
    ? projectConfig.seo.titleTemplate.replace('%s', title)
    : projectConfig.seo.defaultTitle;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to update or create a meta tag
    const updateMeta = (selector: string, attribute: string, attrVal: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    updateMeta('meta[name="description"]', 'name', 'description', description);
    updateMeta('meta[name="keywords"]', 'name', 'keywords', keywords.join(', '));
    updateMeta('meta[name="author"]', 'name', 'author', projectConfig.seo.author);
    updateMeta('meta[name="robots"]', 'name', 'robots', 'index, follow');

    // 3. OpenGraph Tags
    updateMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    updateMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    updateMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    updateMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    updateMeta('meta[property="og:site_name"]', 'property', 'og:site_name', projectConfig.client.brandName);

    // 4. Twitter Cards
    updateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. JSON-LD Structured Data
    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': 'CoffeeShop',
      name: projectConfig.client.brandName,
      description: projectConfig.client.description,
      url: projectConfig.seo.canonicalUrl,
      telephone: projectConfig.client.contact.hotline,
      address: {
        '@type': 'PostalAddress',
        streetAddress: projectConfig.client.contact.address,
        addressLocality: 'Ho Chi Minh City',
        addressCountry: 'VN',
      },
      servesCuisine: 'Specialty Coffee',
      priceRange: '$$',
    };

    const scriptId = 'seo-structured-data-jsonld';
    let scriptTag = document.getElementById(scriptId);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema || defaultSchema);
  }, [fullTitle, description, keywords, ogImage, ogType, canonicalUrl, schema]);

  return null;
};
