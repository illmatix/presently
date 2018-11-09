'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: {main: './src/app/index.js'},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app/[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    })
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            {
                cache: true,
                from: 'src/_locales',
                to: '_locales',
                toType: 'dir'
            },
            {
                cache: true,
                from: 'src/manifest.json',
                toType: 'file'
            }
        ]),
        new ExtractTextPlugin(
            {filename: 'css/style.[chunkhash].css', disable: false, allChunks: true}
        ),
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            template: './src/app/index.html',
            filename: 'app/index.html'
        })
    ]
};
