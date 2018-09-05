module.exports = () => {
  const getRollupConfig = require('kcd-scripts/config').getRollupConfig

  const rollupConfig = getRollupConfig()

  const commonJsIndex = rollupConfig.plugins.findIndex(
    plugin => plugin.name === 'commonjs',
  )

  if (commonJsIndex >= 0) {
    const commonjs = require('rollup-plugin-commonjs')

    rollupConfig.plugins[commonJsIndex] = commonjs({
      include: 'node_modules/**',
      namedExports: {
        'react-is': ['isValidElementType'],
      },
    })
  }

  if (process.env.BUILD_FORMAT !== 'umd') {
    const babelIndex = rollupConfig.plugins.findIndex(
      plugin => plugin.name === 'babel',
    )

    if (babelIndex >= 0) {
      const babel = require('rollup-plugin-babel')

      rollupConfig.plugins[babelIndex] = babel({
        exclude: 'node_modules/**',
        babelrc: true,
        runtimeHelpers: true,
      })
    }
  }

  return rollupConfig
}
