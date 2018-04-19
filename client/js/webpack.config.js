'use strict'
var path = require('path')
const uglify = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './client/js/app.js',
    output: {
        path: path.resolve(__dirname, '../public/dist'),
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
        new uglify()
    ]
}