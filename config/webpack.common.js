const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const autoprefixer = require('autoprefixer');
const argv = require('yargs').argv
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin')
const config = require('./config').getConfig(argv.env && argv.env.mode);

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
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          configFile: helpers.root('tslint.json'),
          tsConfigFile: helpers.root('src', 'tsconfig.json'),
          emitErrors: true
        },
        exclude: helpers.root('node_modules', 'angular4-color-picker'),

      },
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('src', 'tsconfig.json') }
          }, 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[ext]'
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
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.template.ejs',
      metadata: {
        baseHref: config.baseHref,
        googleAnalyticsTag: config.googleAnalyticsTag
      }
    }),

    new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer()
      ]
     }
  }),

   new BaseHrefWebpackPlugin({ baseHref: config.baseHref }),

   new webpack.DefinePlugin({
     'GLOBAL_ENV': {
       'API_URL': JSON.stringify(config.apiUrl),
       'BASE_HREF': JSON.stringify(config.baseHref)
     }
   })
  ]
};
