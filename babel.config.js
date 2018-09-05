module.exports = api => {
  api.cache(false)

  const babelConfig = require('kcd-scripts/babel')(api)

  if (process.env.BUILD_FORMAT !== 'umd') {
    babelConfig.plugins.unshift([
      '@babel/plugin-transform-runtime',
      {
        corejs: 2,
        helpers: true,
        regenerator: false,
        useESModules: false,
      },
    ])
  }

  if (process.env.NODE_ENV === 'test') {
    babelConfig.plugins.unshift('dynamic-import-node')
  }

  return babelConfig
}
