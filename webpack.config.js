var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './app/main.js',
    output: { path: __dirname + '/app/dist', filename: 'bundle.js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
};