import { useEffect } from 'react';
import { projectConfig } from '../../config/project.config';

export interface UseSEOOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
}

export function useSEO(options: UseSEOOptions) {
  useEffect(() => {
    if (options.title) {
      document.title = projectConfig.seo.titleTemplate.replace('%s', options.title);
    }
    if (options.description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', options.description);
    }
  }, [options.title, options.description]);
}
