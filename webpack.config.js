const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isProduciton = process.env.NODE_ENV === 'production'

const config = {
    mode: process.env.NODE_ENV,
    target: ['web'],
    entry: path.resolve(__dirname, './src'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        chunkFilename: '[id].js',
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, './src'),
        },
        extensions: [
            ".vue", ".js", ".json",
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    isProduciton ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    isProduciton ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|gif|svg|jpe?g)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10,
                            name: isProduciton ? 'assets/images/[contenthash].[ext]' : '[path]/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(aot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: isProduciton ? 'assets/fonts/[contenthash].[ext]' : '[path]/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new VueLoaderPlugin(),
    ],
}

if (isProduciton) {
    config.output = {
        ...config.output,
        clean: true,
        filename: 'scripts/[contenthash].js',
        chunkFilename: 'scripts/[contenthash].js',
        publicPath: 'auto',
    }
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: 'assets/styles/[contenthash].css',
            chunkFilename: 'assets/styles/[contenthash].css',
        }),
    )
    config.optimization = {
        minimize: true,
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
            }),
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    }
}
else {
    config.devtool = 'eval-cheap-module-source-map'
    config.devServer = {
        host: '0.0.0.0',
        port: 'auto',
        hot: true,
    }
}

module.exports = config
