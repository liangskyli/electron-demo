import { defineConfig } from '@umijs/max';

export default defineConfig({
  npmClient: 'pnpm',
  plugins: ['@liangskyli/umijs-plugin-electron'],
  antd: {},
  electron: {
    builderOptions: {
      // asar: false,
      appId: 'com.electron.demo.app',
      productName: 'electron-demo1',
      dmg: {
        title: '${productName}-${version}',
        artifactName: '${productName}-setup-${version}-${arch}.${ext}',
      },
      nsis: {
        artifactName: '${productName}-setup-${version}.${ext}',
      },
      publish: {
        provider: 'generic',
        url: 'http://localhost:8000/download/',
      },
    },
  },
  dva: {
    immer: {
      enableES5: true,
      enableAllPlugins: true,
    },
  },
});
