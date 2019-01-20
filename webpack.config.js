const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin');

var isProdaction = (process.env.NODE_ENV === "production");

module.exports = {
    mode: "production",

    context: path.resolve(__dirname, 'src'),
    entry:{
        app: [
            './js/main.js',
            './scss/main.scss',
        ],
    },
    output:{
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../'
    },
    devServer: {
        contentBase: './app'
    },

    devtool: (isProdaction ) ? '' : 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'postcss-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'sass-loader',
                            options: {sourceMap: true}
                        },
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test:/\.(png|gif|jpe?g)$/,
                loaders:[
                    {
                        loader: 'file-loader',
                        options: {
                        name: '[path][name].[ext]',

                        },
                    },
                    'img-loader',
                ]
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin(
            './css/main.css'
        ),
        new CleanWebpackPlugin(['dist']),

        new CopyWebpackPlugin(
            [
                {from: './img', to: 'img'}
            ],
            {
                 ignore: [
                     {glob: 'svg/*'} 
                 ]
            }
        ),
    ],

};

//production
if(isProdaction){
    module.exports.plugins.push(
        new UglifyjsWebpackPlugin(
            {
                sourceMap: true    
            }
        ),
    )
}






