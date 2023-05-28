import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import routes from './routes';
import customTheme from './customTheme';

export default defineConfig({
  hash: false,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: false,
  locale: {
    default: 'vi-VN',
    antd: true,
    title: true,
    baseNavigator: true,
    baseSeparator: '-',
  },
  ignoreMomentLocale: true,
  publicPath: '/',
  nodeModulesTransform: { type: 'none' },
  exportStatic: {
    htmlSuffix: false,
    dynamicRoot: false,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  routes,
  theme: {
    'primary-color': defaultSettings.primaryColor,
    ...customTheme,
  },
  esbuild: {},
  title: false,
  manifest: {
    basePath: '/',
  },
  fastRefresh: {},
  extraPostCSSPlugins: [
    require('tailwindcss')({
      config: './tailwind.config.js',
    }),
  ],
  // ssr: {
  //   forceInitial: true,
  //   devServerRender: true,
  // },
  // devtool: false,
});
