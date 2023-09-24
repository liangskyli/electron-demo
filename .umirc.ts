import { defineConfig } from '@umijs/max';

export default defineConfig({
  npmClient: 'pnpm',
  plugins: ['@liangskyli/umijs-plugin-electron'],
  electron: {
    builderOptions: {
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
        url: 'url',
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
