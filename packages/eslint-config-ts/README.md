# @electron-toolkit/eslint-config-ts

> Basic ESLint config for Electron-TypeScript projects.

Requires `eslint >= 8.0.0`.

This config is specifically designed to be used by `@quick-start/create-electron` setups.

See [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/rules/) for available rules.

## Installation

```sh
npm add -D @electron-toolkit/eslint-config-ts
```

## Usage

This package comes with 3 rulesets.

### @electron-toolkit/eslint-config-ts

This ruleset is the base configuration for Electron-TypeScript projects.

```js
module.exports = {
  extends: ['@electron-toolkit/eslint-config-ts']
}
```

### @electron-toolkit/eslint-config-ts/eslint-recommended

Built-in some recommended rules for Electron-TypeScript projects.

```js
module.exports = {
  extends: ['@electron-toolkit/eslint-config-ts/eslint-recommended']
}
```

### @electron-toolkit/eslint-config-ts/recommended

This is extended from `@electron-toolkit/eslint-config-ts` and `@electron-toolkit/eslint-config-ts/eslint-recommended` ruleset.

```js
module.exports = {
  extends: ['@electron-toolkit/eslint-config-ts/recommended']
}
```
