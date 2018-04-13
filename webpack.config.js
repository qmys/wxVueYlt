var path = require('path')
var webpack = require('webpack')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var rules = [
    {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            loaders: {
                less:[
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            }
        }
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
    },
    {
        test: /\.md/,
        loader: 'vue-markdown-loader',
        options: {
            // 阻止提取脚本和样式标签
            preventExtract: true
        }
    }
]

module.exports = {
    devtool: '#cheap-module-eval-source-map',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'wxvueylt.min.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    module: {
        rules: rules
    }
}