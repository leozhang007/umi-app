import { defineConfig } from 'umi';
const CompressionPlugin = require('compression-webpack-plugin');
const prod = process.env.NODE_ENV === 'production';

export default defineConfig({
  // 项目别名
  alias: {},
  // https://github.com/umijs/umi-webpack-bundle-analyzer#options-for-plugin
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
  },
  // 将 ClassName 类名变成驼峰命名形式
  // cssLoader: {
  //   localsConvention: 'camelCase'
  // },
  // 默认是 umi
  // chunks: ['vendors', 'umi'],
  // 通过 webpack-chain 的 API 修改 webpack 配置。
  chainWebpack: function(config, { webpack }) {
    if (prod) {
      //gzip压缩
      config.plugin('compression-webpack-plugin').use(CompressionPlugin, [
        {
          test: /\.js$|\.html$|\.css$/, //匹配文件名
          threshold: 10240, //对超过10k的数据压缩
          deleteOriginalAssets: false, //不删除源文件
        },
      ]);
    }

    // TODO：开启 optimization 启动项目会卡住，进度在 90 % 左右，
    // github 也没有看到有好的解决方案
    // config.merge({
    //   // 代码提取 优化
    //   optimization: {
    //     minimize: !prod,
    //     splitChunks: {
    //       chunks: 'all',
    //       minSize: 20000,
    //       minChunks: 1,
    //       automaticNameDelimiter: '.',
    //       cacheGroups: {
    //         vendor: {
    //           name: 'vendors',
    //           test({ resource }) {
    //             return /[\\/]node_modules[\\/]/.test(resource);
    //           },
    //           priority: -10,
    //         },
    //       },
    //     },
    //   }
    // });
  },
  // 按需加载
  dynamicImport: {
    loading: '@/component/loading',
  },
  // 配置图片文件是否走 base64 编译的阈值
  // inlineLimit: 5000,
  // 开启 TypeScript 编译时类型检查，默认关闭。
  // forkTSChecker: {},
  // 开启 Ant Design 的 Layout， 包括导航以及侧边栏
  layout: {
    // 产品名，默认值为包名。
    name: 'umi-app',
  },
  // 配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存。 html 没有
  hash: prod,
  request: {
    // 接口统一格式中的数据字段
    dataField: 'data',
  },
  // 设置 node_modules 目录下依赖文件的编译方式。
  nodeModulesTransform: {
    type: 'none',
  },
  // 不配置 name routes 生成的侧边栏菜单，不生成面包屑
  routes: [
    {
      exact: true,
      name: '首页',
      path: '/',
      component: '@/pages/index',
      // 只有拥有canReadFoo的权限，才能访问页面，否则会默认渲染layout的内置权限错误页面（在layout插件之外设置无效）
      // 具体配置可看 /src/access.ts
      // access: 'canReadFoo'
    },
    {
      exact: true,
      name: '用户',
      title: 'wahaha',
      path: '/user',
      component: '@/pages/user',
      wrappers: ['@/wrappers/auth'],
    },
  ],
  // header meta 标签
  // metas: [{
  //   name: 'keywords',
  //   content: 'umi umijs'
  // }],
  // 使用 esbuild 作为压缩器
  // https://zhuanlan.zhihu.com/p/139219361 压缩对比
  esbuild: {},
  // 为所有非三方脚本加上 crossorigin="anonymous" 属性，通常用于统计脚本错误。
  crossorigin: true,
  // 整合 antd 组件库。
  antd: {
    dark: false,
  },
  dva: {
    // 是否启用 immer 以方便修改 reducer。
    immer: true,
    // 是否跳过 model 验证。
    skipModelValidate: false,
    // 表示是否启用 dva model 的热更新。
    hmr: false,
  },
  // cssnano 配置
  cssnano: {
    normalizeUrl: false,
  },
  // 使用 targets 兼容浏览器
  // Default: { chrome: 49, firefox: 64, safari: 10, edge: 13, ios: 10 }
  targets: {
    chrome: 49,
    firefox: 64,
    safari: 10,
    edge: 13,
    ios: 10,
    ie: 11,
  },
  autoprefixer: {
    flexbox: 'no-2009',
    browsers: ['> 1%', 'last 2 versions', 'not ie <= 10'],
  },
  devtool: prod ? 'eval' : 'source-map',
});
