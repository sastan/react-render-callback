module.exports = api => {
  api.cache(false)

  const babelConfig = require('kcd-scripts/babel')(api)

  babelConfig.plugins.unshift([
    '@babel/plugin-transform-runtime',
    {
      helpers: true,
      regenerator: false,
      useESModules:
        process.env.NODE_ENV !== 'test' && process.env.BUILD_FORMAT !== 'cjs',
    },
  ])

  if (process.env.NODE_ENV === 'test') {
    babelConfig.plugins.unshift('dynamic-import-node')
  }

  return babelConfig
}
