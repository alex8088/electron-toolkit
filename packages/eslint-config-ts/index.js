const tseslint = require('typescript-eslint')

module.exports = {
  config: tseslint.config,
  configs: {
    base: require('./eslint-base'),
    recommended: require('./eslint-recommended')
  }
}
