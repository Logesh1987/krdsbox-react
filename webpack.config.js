var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var config = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js'
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            {
                test: /\.(jpe?g|png|gif|cur|webp|mp3|ogg|woff|woff2|ttf|svg|eot)$/,
                loader: 'file-loader?name=[path][name].[ext]?[hash:8]'
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html'
        })
    ],
    mode: 'development'
}

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    )
}

module.exports = config;