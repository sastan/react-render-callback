module.exports = () => {
  const getRollupConfig = require('kcd-scripts/config').getRollupConfig

  const rollupConfig = getRollupConfig()

  if (process.env.BUILD_FORMAT !== 'umd') {
    replace(rollupConfig.plugins, 'babel', () => {
      const babel = require('rollup-plugin-babel')

      return babel({
        exclude: 'node_modules/**',
        babelrc: true,
        runtimeHelpers: true,
      })
    })
  }

  return rollupConfig
}

function replace(plugins, name, factory) {
  const idx = plugins.findIndex(plugin => plugin.name === name)

  if (idx >= 0) {
    plugins[idx] = factory(plugins[idx])
  }
}
