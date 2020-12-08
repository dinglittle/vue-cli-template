/*
 * @Description: vue.config.js
 * @Author: liwangjun
 * @Date: 2020-12-08 14:52:21
 * @LastEditors: liwangjun
 * @LastEditTime: 2020-12-08 15:32:02
 * @FilePath: /vue-cli-template/vue.config.js
 */
// 代码压缩
const TerserPlugin = require("terser-webpack-plugin");
// 打包分析器
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// gzip压缩
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 环境判断
const isProduction = process.env.NODE_ENV === "production";

// 本地环境是否需要 cdn
const devNeedCdn = true;

// cdn
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  // 包名: 变量名
  // 'element-ui': 'ELEMENT',
  // 'vuex': 'Vuex',
  // 'vue-router': 'VueRouter'
  externals: {
    vue: "Vue",
    "vue-router": "VueRouter",
    vuex: "Vuex"
  },
  // cdn 的 css 链接
  css: [],
  // cdn 的 js 链接
  js: [
    "https://cdn.jsdelivr.net/npm/vue/dist/vue.js",
    "https://unpkg.com/vuex@3.6.0/dist/vuex.js",
    "https://unpkg.com/vue-router/dist/vue-router.js"
  ]
};

module.exports = {
  productionSourceMap: true, // 是否需要 sourceMap
  devServer: {
    port: 8080,
    open: true
  },
  chainWebpack: config => {
    // 打包分析
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)

    // ============注入cdn start============
    config.plugin("html").tap(args => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction || devNeedCdn) args[0].cdn = cdn;
      return args;
    });
    // ============注入cdn start============
  },
  configureWebpack: config => {
    // 用cdn方式引入，则构建时要忽略相关资源
    if (isProduction || devNeedCdn) config.externals = cdn.externals;

    // 生产环境相关配置，根据需求可将判断条件去掉，适用于所有环境
    if (isProduction) {
      // 代码压缩
      config.plugins.push(
        new TerserPlugin({
          parallel: true,
          sourceMap: false,
          terserOptions: {
            ecma: 6,
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ["console.log"]
            }
          }
        })
      );
    }

    // gzip压缩,需要后台同学配合，根据需要自行放开
    // const productionGzipExtensions = ['html', 'js', 'css']
    // config.plugins.push(
    //   new CompressionWebpackPlugin({
    //     filename: '[path].gz[query]',
    //     algorithm: 'gzip',
    //     test: new RegExp(
    //       '\\.(' + productionGzipExtensions.join('|') + ')$'
    //     ),
    //     threshold: 10240, // 只有大小大于该值的资源会被处理 10240
    //     minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
    //     deleteOriginalAssets: true // 删除原文件
    //   })
    // )

  }
};
