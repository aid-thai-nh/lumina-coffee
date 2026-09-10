import { ThemeConfig } from 'antd';

export const luminaAntdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#835423',
    colorPrimaryHover: '#ea7c1b',
    colorPrimaryActive: '#5f3a14',
    colorSuccess: '#2e7d32',
    colorWarning: '#ea7c1b',
    colorError: '#c62828',
    colorInfo: '#835423',
    colorTextBase: '#2c1810',
    colorBgBase: '#ffffff',
    borderRadius: 12,
    fontSize: 13,
    fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, system-ui",
    controlHeight: 40,
    wireframe: false,
  },
  components: {
    Pagination: {
      itemActiveBg: '#d36b00',
      colorPrimary: '#ffffff',
      colorPrimaryHover: '#ffffff',
      itemSize: 36,
      borderRadius: 10,
    },
    Select: {
      controlHeight: 42,
      borderRadius: 10,
      colorBorder: '#e8dfd1',
      colorPrimaryHover: '#d36b00',
      colorPrimary: '#d36b00',
      optionSelectedBg: '#faf6f0',
      optionSelectedColor: '#835423',
    },
    Input: {
      controlHeight: 42,
      borderRadius: 10,
      colorBorder: '#e8dfd1',
      colorPrimaryHover: '#d36b00',
      colorPrimary: '#d36b00',
    },
    Button: {
      controlHeight: 42,
      borderRadius: 12,
      fontWeight: 600,
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
      colorFillContent: '#e8dfd1',
    },
  },
};
