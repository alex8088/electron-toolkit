# @electron-toolkit/eslint-config-prettier

> ESLint config with Prettier support for Electron projects.

Requires `eslint >= 9.0.0` and `prettier >= 3.0.0`.

This config is specifically designed to be used by `@quick-start/create-electron` setups.

The default config is based on the recommended configuration of [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier/#recommended-configuration), which also depends on [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier). Please refer to their corresponding documentations for more implementation details.

## Installation

```sh
npm add -D @electron-toolkit/eslint-config-prettier
```

## Usage

Import `@electron-toolkit/eslint-config-prettier` and add it as the **last** item in the configuration array in your `eslint.config.js` file so that it has the opportunity to override other configs.

```js
import configPrettier from '@electron-toolkit/eslint-config-prettier'

export default [
  // Any other config imports go at the top
  configPrettier
]
```

This configuration is the most straightward way to use ESLint with Prettier.

It disables all rules that are unnecessary or might conflict with Prettier. It also enables the `eslint-plugin-prettier` plugin, which runs Prettier as an ESLint rule and reports differences as individual ESLint issues.

By default all formatting issues are reported as `warnings`, and will be automatically fixed during `eslint --fix`.
