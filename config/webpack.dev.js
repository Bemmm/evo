const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const argv = require('yargs').argv;
const config = require('./config').getConfig(argv.env && argv.env.mode);

const devServerProxy = {
  "/api": {
    target: "https://evo-staging.herokuapp.com",
    secure: false
  },
}

module.exports = webpackMerge(commonConfig, {
  devtool: config.sourceMap,

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin(`${config.baseHref.replace('/', '')}assets/[name].css`)
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    proxy: devServerProxy,
  }
});
