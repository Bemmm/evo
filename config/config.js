const configs = {
  local: {
    baseHref: '/',
    apiUrl: 'http://localhost:4200/api/',
    googleAnalyticsTag: '-',
    sourceMap: 'nosources-source-map'
  },
  dev: {
    baseHref: '/',
    apiUrl: 'http://localhost:4200/api/',
    googleAnalyticsTag: '-',
    sourceMap: 'nosources-source-map'
  },
  prod: {
    baseHref: '/',
    apiUrl: 'http://localhost:4200/api/',
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
