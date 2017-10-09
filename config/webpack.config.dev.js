var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

// static directory
var staticDir = "static";


// CSS
var extractCSS = new ExtractTextPlugin(staticDir + "/css/[name].[contenthash:8].css");
var extractSASS = new ExtractTextPlugin(staticDir + "/css/[name].[contenthash:8].css");
var extractThemeDark = new ExtractTextPlugin(staticDir + "/css/[name]-dark.[contenthash:8].css");
var extractThemeLight = new ExtractTextPlugin(staticDir + "/css/[name]-light.[contenthash:8].css");

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: "./app/app.js",
        vendor: [
            "moment"
        ]
    },
    output: {
        path: __dirname + "/app",
        filename: "static/js/[name].[chunkhash:8].js",
        chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.js$/, // include .js files
                enforce: "pre", // preload the jshint loader
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                use: [
                    {
                        loader: "jshint-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: "style-loader",
                    use: ["css-loader", 'resolve-url-loader']
                })
            },
            {
                test: /\.scss$/,
                use: extractSASS.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "resolve-url-loader"
                    }, {
                        loader: 'sass-loader?sourceMap'
                    }],
                    fallback: "style-loader"
                }),
                exclude: [/dark.scss/, /light.scss/]
            },
            {
                test: /dark.scss/,
                use: extractThemeDark.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /light.scss/,
                use: extractThemeLight.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpg|jpeg|woff|woff2|eot|svg)$/,
                //use: [
                //      {
                    loader: "url-loader?limit=100000"
                ,//}],
                query: {
                    name: "static/media/[name].[hash:8].[ext]"
                }
            },
            {
                test: /\.ttf$/,
                loader: "file-loader",
                query: {
                    name: "static/media/[name].[hash:8].[ext]"
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: true
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: staticDir + "/js/[name].[hash:8].js"
        }),
        new HtmlWebpackPlugin({
           inject: true,
           template: './app/index.html'
        }),
        extractCSS,
        extractSASS,
        extractThemeDark,
        extractThemeLight
    ]
};
