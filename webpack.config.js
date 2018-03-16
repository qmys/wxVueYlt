var path = require('path')
var webpack = require('webpack')

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
]

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: 'wxVueYlt.js',
        library: 'wxVueYlt',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: rules
    }
}