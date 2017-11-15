const configs = {
  local: {
    baseHref: '/',
    apiUrl: '/api/',
    googleAnalyticsTag: '-',
    sourceMap: 'nosources-source-map'
  },
  dev: {
    baseHref: '/',
    apiUrl: '/api/',
    googleAnalyticsTag: '-',
    sourceMap: 'nosources-source-map'
  },
  prod: {
    baseHref: '/',
    apiUrl: '/api/',
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