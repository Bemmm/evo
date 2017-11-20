const webpack = require('webpack');
const helpers = require('./helpers');
const path = require('path');
const argv = require('yargs').argv
const {
  BaseHrefWebpackPlugin
} = require('base-href-webpack-plugin')
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config').getConfig(argv.env && argv.env.mode);

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js', '.scss'],
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },

  node: {
    fs: "empty"
  },

  module: {
    rules: [{
        test: /\.ts$/,
        loaders: [{
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: helpers.root('src', 'tsconfig.json'),
            sourceMap: false,
            inlineSourceMap: true,
            compilerOptions: {
              removeComments: true
            },
          },
        }, 'angular2-template-loader']
      },
      {
        test: /\.ts$/,
        enforce: 'post',
        loader: 'istanbul-instrumenter-loader',
        include: helpers.root('src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          helpers.root('node_modules'),
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'

      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null-loader'
      },
      {
        test: /\.css$/,
        exclude: [helpers.root('src', 'app'), helpers.root('node_modules')],
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
      },
      {
        test: /\.css$/,
        include: [helpers.root('src', 'app'), helpers.root('node_modules')],
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        include: helpers.root('src', 'app'),
        loaders: ['exports-loader?module.exports.toString()', 'css-loader', 'postcss-loader', 'sass-loader?' + JSON.stringify({
          sourceMap: true,
          data: '@import "variables";@import "functions";@import "mixins";',
          includePaths: [
            helpers.root('src', 'assets', 'scss', 'partials')
          ]
        })]
      },
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'app'),
        loaders: ['to-string-loader', 'style-loader', 'css-loader', 'resolve-url-loader', 'postcss-loader', 'sass-loader?sourceMap']
      }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular|jasmine(\\|\/)lib/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new BaseHrefWebpackPlugin({
      baseHref: config.baseHref
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer()
        ]
      }
    }),

    new webpack.DefinePlugin({
      'GLOBAL_ENV': {
        'API_URL': JSON.stringify(config.apiUrl),
        'BASE_HREF': JSON.stringify(config.baseHref)
      }
    }),
  ]
};