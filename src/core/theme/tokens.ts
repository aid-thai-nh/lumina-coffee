/**
 * DESIGN SYSTEM TOKENS
 * Single source of truth for design variables, colors, typography, spacing, and elevations.
 */

export const designTokens = {
  colors: {
    brand: {
      espresso: '#2C1810',
      roastDark: '#201206',
      caramel: '#835423',
      amber: '#D36B00',
      terracotta: '#EA7C1B',
      crema: '#C68E58',
      vanilla: '#FDD5B8',
      milkFoam: '#FCF9F8',
    },
    neutral: {
      50: '#FAF8F5',
      100: '#F4EFEA',
      200: '#E8DFD5',
      300: '#D5C7B8',
      400: '#A89785',
      500: '#7C6B59',
      600: '#5A4A39',
      700: '#3D3125',
      800: '#261E16',
      900: '#18120D',
    },
    semantic: {
      success: '#2E7D32',
      successBg: '#E8F5E9',
      warning: '#EA7C1B',
      warningBg: '#FFF3E0',
      error: '#C62828',
      errorBg: '#FFEBEE',
      info: '#0288D1',
      infoBg: '#E1F5FE',
    },
    surface: {
      canvas: '#FCF9F8',
      card: '#FFFFFF',
      elevated: '#FFFFFF',
      subtle: '#F7F3EE',
      dark: '#201206',
    },
  },
  typography: {
    fontDisplay: "'Cinzel', Georgia, 'Times New Roman', serif",
    fontSans: "'Plus Jakarta Sans', 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontMono: "'JetBrains Mono', 'Fira Code', monospace",
    scale: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(44, 24, 16, 0.05)',
    md: '0 4px 12px -2px rgba(44, 24, 16, 0.08)',
    lg: '0 12px 24px -4px rgba(44, 24, 16, 0.12)',
    xl: '0 20px 32px -6px rgba(44, 24, 16, 0.16)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '400ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

export type DesignTokens = typeof designTokens;
