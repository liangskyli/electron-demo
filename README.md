# 基于umi的electron demo

> 提供基于@umijs/max@^4的electron的开发及打包的demo

- 底层基于umi插件[@liangskyli/umijs-plugin-electron](https://github.com/liangskyli/umi-electron)实现


### Electron 版本降级

- 你可以手动将 package.json 中的 electron 修改至低版本，支持electron最低版本22.0.0

### 开发

```
$ pnpm electron:dev
```

### 打包

- 打包路径不能有中文，electron-builder不能跨平台打包，请在对应系统上打包

```
//windows
$ electron:build:win
//mac
$ electron:build:mac
//linux
$ electron:build:linux
//按平台打包
$ electron:build:win --ia32    //32位
$ electron:build:win --x64     //64位
$ electron:build:win --armv7l  //arm32位
$ electron:build:win --arm64   //arm64位
```
