const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const createThemeColorReplacerPlugin = require('./src/config/plugin.config')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve(dir) {
    return path.join(__dirname, dir)
}

const vueConfig = {
    // 基本路径
    publicPath: '/',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    productionSourceMap: false,
    // 全局less变量
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [resolve("src/styles/variable.less")]
        }
    },
    // 是否生成.map文件
    configureWebpack: config => {
        config.devtool = 'source-map' // 调试 时需要开启
        config.plugins.push(createThemeColorReplacerPlugin())
        if (isProduction) {
            config.externals = {
                // 'vue': 'Vue',
                // 'viser-vue': 'ViserVue',
                // 'ant-design-vue': 'antd',
                // 'moment': 'moment',
                // 'axios': 'axios',
                // 'lodash': '_'
            }
            // config.plugins.push(new BundleAnalyzerPlugin()) // 打包显示模块依赖关系
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }))
        }
    },
    devServer: {
        port: 3001,
        // 设置代理
        proxy: {
            "/api": {
                target: "http://mpi.yunjiahealth.com:28080/",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    // 'primary-color': '#409EFF',
                    // 'link-color': '#409EFF',
                    'border-radius-base': '2px',
                },
                javascriptEnabled: true
            }
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components/'))
            .set('_as', resolve('src/assets/'))

    }
}


module.exports = vueConfig