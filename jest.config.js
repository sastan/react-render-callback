const jestConfig = require('kcd-scripts/jest')

module.exports = Object.assign(jestConfig, {
  displayName: 'react-render-callback',
  testMatch: ['**/*.test.js'],
})
