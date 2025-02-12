const tseslint = require('typescript-eslint')
const base = require('./eslint-base')
const ts = require('./eslint-typescript')

/**
 * @type { import('typescript-eslint').ConfigArray }
 */
module.exports = [...base, ...tseslint.configs.recommendedTypeChecked, ...ts]
