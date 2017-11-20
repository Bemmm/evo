const webpackConfig = require('./webpack.test');
const argv = require('yargs').argv
const withCoverage = argv.env && argv.env.coverage;

module.exports = function(config) {
  const _config = {
    basePath: '',

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

    remapIstanbulReporter: withCoverage && {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },

    reporters: withCoverage ? ['progress', 'kjhtml', 'karma-remap-istanbul'] : ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
    captureTimeout: 60000,
    browserDisconnectTimeout: 2000,
    browserDisconnectTolerance: 0,
    browserNoActivityTimeout: 10000,
  };

  config.set(_config);
};