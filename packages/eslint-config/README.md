# @electron-toolkit/eslint-config

> Basic ESLint config for Electron projects.

Requires `eslint >= 8.21.0`.

This config is specifically designed to be used by `@quick-start/create-electron` setups.

## Installation

```sh
npm add -D @electron-toolkit/eslint-config
```

## Usage

Import `@electron-toolkit/eslint-config` and add it to the configuration array in your `eslint.config.js` file.

```js
import eslintConfig from '@electron-toolkit/eslint-config'

export default [
  eslintConfig
  // Any other config
]
```
