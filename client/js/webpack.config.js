'use strict'
var path = require('path')
const uglify = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './client/js/app.js',
    output: {
        path: path.resolve(__dirname, '../../dist/client/public'),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins:[
        new uglify(),
        new CopyWebpackPlugin([{
            from: './client/public/index.html',
            to: path.resolve(__dirname, '../../dist/client/public'),
            force: true
        }])
    ]
}