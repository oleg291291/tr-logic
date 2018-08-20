const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const autoprefixer = require('autoprefixer');

const isDevelopment = process.env.NODE_ENV !== 'production';

console.log('isDevelopment === ' + isDevelopment)

const config = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    devtool: isDevelopment && "source-map",
    devServer: {
        port: 3000,
        open: false,
        hot: true,
        contentBase: path.join(__dirname, "src", "html"),
        publicPath: '/',
        historyApiFallback: true,
    },
    resolve: {
        alias: {
            "barba": path.resolve('node_modules', 'barba.js/dist/barba.min')
        }
    },

    module: {
        rules: [
            {
                /////////////
                //for production only! (hot reload not working with this)
                ///////////////
                test: /\.(sass|scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: isDevelopment,
                            minimize: !isDevelopment
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            autoprefixer: {
                                browsers: ["last 2 versions"]
                            },
                            sourceMap: isDevelopment,
                            plugins: () => [
                                autoprefixer
                            ]
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: isDevelopment
                        }
                    }

                ]
            },


            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'static/',
                            useRelativePath: true,
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                        }
                    },

                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        require('autoprefixer'),
        new MiniCssExtractPlugin({
            filename: "[name]-styles.css",
            chunkFilename: "[id].css"
        }),


        new HtmlWebpackPlugin({
            title: 'Profile',
            filename: 'profile.html',
            template: path.resolve(__dirname, 'src', 'html', 'profile.html'),
            minify: !isDevelopment && {
                html5: true,
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: true,
                removeEmptyElements: false
            },

        }),
        new HtmlWebpackPlugin({
            title: 'Validation Form',
            template: path.resolve(__dirname, 'src', 'html', 'index.html'),
            minify: !isDevelopment && {
                html5: true,
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: true,
                removeEmptyElements: false
            },

        }),
    ]
};



if (isDevelopment) {
    // for hot reload support!
    config.module.rules[0] = {
        test: /\.(sass|scss|css)$/,
        use: [
            "style-loader",
            {
                loader: "css-loader",
                options: {
                    module: true
                }
            },
            "sass-loader"
        ]
    }
}


module.exports = config;