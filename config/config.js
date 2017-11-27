const configs = {
  local: {
    baseHref: '/',
    apiUrl: 'https://evo-staging.herokuapp.com/api/v1/',
    googleAnalyticsTag: '-',
    sourceMap: 'nosources-source-map'
  },
  dev: {
    baseHref: '/',
    apiUrl: 'https://evo-staging.herokuapp.com/api/v1/',
    googleAnalyticsTag: '-',
    sourceMap: 'nosources-source-map'
  },
  prod: {
    baseHref: '/',
    apiUrl: '/api/v1/',
    googleAnalyticsTag: '-',
    sourceMap: 'nosources-source-map'
  },
};

module.exports = {
  getConfig(env) {
    if (typeof configs[env] !== 'undefined') {
      return configs[env];
    }

    return configs['local'];
  }
};