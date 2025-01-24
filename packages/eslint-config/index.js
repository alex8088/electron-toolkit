const eslint = require('@eslint/js')
const globals = require('globals')

/**
 * @type { import('eslint').Linter.Config }
 */
module.exports = {
  ...eslint.configs.recommended,
  languageOptions: {
    ecmaVersion: 2022,
    globals: {
      ...globals.browser,
      ...globals.es2021,
      ...globals.node,
      document: 'readonly',
      navigator: 'readonly',
      window: 'readonly'
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 2022,
      sourceType: 'module'
    },
    sourceType: 'module'
  }
}
