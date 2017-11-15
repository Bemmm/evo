const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const argv = require('yargs').argv;

const prodProxy = argv.env && argv.env.prodProxy;

const devServerProxy = !prodProxy ? {
    "/api": {
        target: "http://localhost:8080",
        secure: false
    },    
} : {
    "/api": {
        target: "http://localhost:8080",
        secure: false
    }            
};

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: prodProxy ? 'http://localhost:3000/' : 'http://app.evo.com:3000/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css')
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        proxy: devServerProxy
    }
});