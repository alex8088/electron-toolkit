const tseslint = require('typescript-eslint')

module.exports = {
  config: tseslint.config,
  configs: {
    base: require('./eslint-base'),
    recommended: require('./eslint-recommended'),
    recommendedTypeChecked: require('./eslint-recommended-type-checked')
  },
  parser: tseslint.parser,
  plugin: tseslint.plugin
}
