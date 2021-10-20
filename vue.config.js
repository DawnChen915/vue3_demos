const path = require('path')
const {
    publicPath,
    assetsDir,
    outputDir,
    lintOnSave,
    transpileDependencies,
    devPort,
  } = require('./src/config')

module.exports={
    publicPath,
    assetsDir,
    outputDir,
    lintOnSave,
    transpileDependencies,
    devServer: {
      hot: true,
      port: devPort,
      open: true,
      noInfo: false,
      overlay: {
        warnings: true,
        errors: true,
      },
      proxy: {
        '/rest': { //替换代理地址名称
             target: 'http://localhost:3000/', //代理地址
             changeOrigin: true, //可否跨域
             pathRewrite: {
             '^/rest': '' //重写接口，去掉/rest
            }
        }
      },
    },
    css: {
        requireModuleExtension: true,
        sourceMap: true,
        loaderOptions: {
          scss: {
            /*sass-loader 8.0语法 */
            //prependData: '@import "~@/styles/variables.scss";',
    
            /*sass-loader 9.0写法，感谢github用户 shaonialife*/
            additionalData(content, loaderContext) {
              const { resourcePath, rootContext } = loaderContext
              const relativePath = path.relative(rootContext, resourcePath)
              if (
                relativePath.replace(/\\/g, '/') !== 'src/styles/variables.scss'
              ) {
                return '@import "~@/styles/variables.scss";' + content
              }
              return content
            },
          },
        },
      },
}