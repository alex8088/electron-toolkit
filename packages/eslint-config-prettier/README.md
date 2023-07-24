# @electron-toolkit/eslint-config-prettier

> ESLint config with Prettier support for Electron projects.

Requires `eslint >= 8.0.0` and `prettier >= 3.0.0`.

This config is specifically designed to be used by `@quick-start/create-electron` setups.

The default config is based on the recommended configuration of [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier/#recommended-configuration), which also depends on [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier). Please refer to their corresponding documentations for more implementation details.

## Installation

```sh
npm add -D @electron-toolkit/eslint-config-prettier
```

## Usage

Add `@electron-toolkit/eslint-config-prettier` to the `extends` array in your `.eslintrc.cjs` file. Make sure to put it **last**, so it gets the chance to override other configs.

```js
module.exports = {
  extends: [
    // ... other configs
    '@electron-toolkit/eslint-config-prettier'
  ]
}
```

This configuration is the most straightward way to use ESLint with Prettier.

It disables all rules that are unnecessary or might conflict with Prettier. It also enables the `eslint-plugin-prettier` plugin, which runs Prettier as an ESLint rule and reports differences as individual ESLint issues.

By default all formatting issues are reported as `warnings`, and will be automatically fixed during `eslint --fix`.
