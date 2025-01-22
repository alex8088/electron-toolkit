const recommendedConfig = require('eslint-plugin-prettier/recommended')

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  ...recommendedConfig,
  rules: {
    ...recommendedConfig.rules,
    'prettier/prettier': 'warn'
  }
}
