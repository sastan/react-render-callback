const jestConfig = require('kcd-scripts/config').jest

module.exports = Object.assign(jestConfig, {
  displayName: 'react-render-callback',
  roots: ['.'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [],
})
