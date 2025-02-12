# @electron-toolkit/eslint-config-ts

> Basic ESLint config for Electron-TypeScript projects.

Requires `eslint >= 9.0.0`.

This config is specifically designed to be used by `@quick-start/create-electron` setups.

## Installation

```sh
npm add -D @electron-toolkit/eslint-config-ts
```

## Usage

This package exports the following:

| name    | Description                                                                             |
| ------- | --------------------------------------------------------------------------------------- |
| config  | A utility function for creating type-safe flat configs, export form `typescript-eslint` |
| configs | Built-in configurations: `base`, `recommended` and `recommendedTypeChecked`             |
| parser  | TypeScript parser for ESLint, export form `@typescript-eslint/parser`                   |
| plugin  | TypeScript plugin for ESLint, export form `@typescript-eslint/eslint-plugin`            |

Import `@electron-toolkit/eslint-config-ts` and add it to the configuration array in your `eslint.config.js` file.

```js
import tseslint from '@electron-toolkit/eslint-config-ts'

export default tseslint.config(
  tseslint.configs.recommended
  // Any other config
)
```
