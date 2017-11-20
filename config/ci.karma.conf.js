const webpackConfig = require('./webpack.test');

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  const _config = {
    basePath: '..',

    frameworks: ['jasmine'],

    files: [{
      pattern: './config/karma-test-shim.js',
      watched: false
    }],

    preprocessors: {
      './config/karma-test-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity,
    captureTimeout: 60000,
    browserDisconnectTimeout: 2000,
    browserDisconnectTolerance: 0,
    browserNoActivityTimeout: 10000,
  };

  config.set(_config);
};