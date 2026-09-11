import { ThemeConfig } from 'antd';
import { designTokens } from './tokens';

/**
 * Creates Ant Design ThemeConfig from core Design Tokens
 * This keeps Ant Design and Tailwind CSS perfectly in sync.
 */
export function createAntdTheme(): ThemeConfig {
  return {
    token: {
      colorPrimary: designTokens.colors.brand.caramel,
      colorPrimaryHover: designTokens.colors.brand.terracotta,
      colorPrimaryActive: designTokens.colors.brand.espresso,
      colorSuccess: designTokens.colors.semantic.success,
      colorWarning: designTokens.colors.semantic.warning,
      colorError: designTokens.colors.semantic.error,
      colorInfo: designTokens.colors.semantic.info,
      colorTextBase: designTokens.colors.brand.espresso,
      colorBgBase: designTokens.colors.surface.card,
      borderRadius: 12,
      fontSize: 14,
      fontFamily: designTokens.typography.fontSans,
      controlHeight: 42,
      wireframe: false,
    },
    components: {
      Button: {
        controlHeight: 42,
        borderRadius: 12,
        fontWeight: 600,
        primaryColor: '#FFFFFF',
      },
      Input: {
        controlHeight: 42,
        borderRadius: 10,
        colorBorder: designTokens.colors.neutral[200],
        colorPrimaryHover: designTokens.colors.brand.amber,
        colorPrimary: designTokens.colors.brand.amber,
      },
      Select: {
        controlHeight: 42,
        borderRadius: 10,
        colorBorder: designTokens.colors.neutral[200],
        colorPrimaryHover: designTokens.colors.brand.amber,
        colorPrimary: designTokens.colors.brand.amber,
        optionSelectedBg: designTokens.colors.neutral[50],
        optionSelectedColor: designTokens.colors.brand.caramel,
      },
      Modal: {
        borderRadiusLG: 20,
      },
      Drawer: {
        borderRadiusSM: 16,
      },
      Tag: {
        borderRadiusSM: 6,
      },
      Rate: {
        colorFillContent: designTokens.colors.neutral[200],
      },
      Badge: {
        colorError: designTokens.colors.brand.amber,
      },
    },
  };
}

export const coreAntdTheme = createAntdTheme();
