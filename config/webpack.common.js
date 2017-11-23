const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const argv = require('yargs').argv;
const autoprefixer = require('autoprefixer');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin')
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
// const StyleLintPlugin = require('stylelint-webpack-plugin');
const config = require('./config').getConfig(argv.env && argv.env.mode);

const aot = argv.env && argv.env.aot;
const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: ['app', 'vendor', 'polyfills']
  }),

  new HtmlWebpackPlugin({
    template: './src/index.html',
    chunksSortMode: 'dependency'
  }),


  new BaseHrefWebpackPlugin({
    baseHref: config.baseHref
  }),

  new webpack.DefinePlugin({
    'GLOBAL_ENV': {
      'API_URL': JSON.stringify(config.apiUrl),
      'BASE_HREF': JSON.stringify(config.baseHref)
    }
  })
];

// Workaround for angular/angular#11580
!aot && plugins.push(
  new webpack.ContextReplacementPlugin(
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    /angular(\\|\/)core/,
    helpers.root('./src'), // location of your src
    {} // a map of your routes
  )
);

aot && plugins.push(
  new AngularCompilerPlugin({
    tsConfigPath: helpers.root('src', 'tsconfig.json'),
    entryModule: helpers.root('src', 'app', 'app.module#AppModule'),
  })
);

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js', '.scss'],
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },

  module: {
    rules: [{
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          configFile: helpers.root('tslint.json'),
          tsConfigFile: helpers.root('src', 'tsconfig.json'),
          emitErrors: true
        },
        exclude: helpers.root('node_modules'),
      },
      aot ? {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loaders: ['@ngtools/webpack'],
      } : {
        test: /\.ts$/,
        loaders: [{
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: helpers.root('src', 'tsconfig.json')
          }
        }, 'angular2-template-loader', 'angular-router-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'resolve-url-loader', 'sass-loader']
        })
      },
      {
        test: /\.scss$/,
        include: helpers.root('src', 'app'),
        loaders: ['exports-loader?module.exports.toString()', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: (loader) => [
              autoprefixer,
            ]
          }
        }, 'sass-loader?' + JSON.stringify({
          sourceMap: true,
          data: '@import "common";',
          includePaths: [
              helpers.root('src', 'assets', 'scss')
          ]
        })]
      },
    ]
  },

  plugins
};
