const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'regenerator-runtime/runtime',
        './src/modern.js',
        'babel-polyfill'  //for backtracking es6 that isn't in es5 
    ],
    output: {
        path: path.resolve(__dirname,'dist'),  //these two lines indicated where our webpack builds goes
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module:{
        rules:[
            {
                test: /\.js$/,   //will look for all files that end in .js
                exclude: /node_modules/,  //exlude this dir to only apply babel-loader to our project
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};