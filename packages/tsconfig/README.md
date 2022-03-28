# @electron-toolkit/tsconfig

> TSConfigs for Electron projects to extend.

Requires TypeScript >= 4.5.

Install:

```sh
npm add -D @electron-toolkit/tsconfig
```

Add one of the available configurations to your `tsconfig.json`:

The base configuration:

```json
"extends": "@electron-toolkit/tsconfig/tsconfig.json"
```

Configuration for Browser environment (Renderer process):

```json
"extends": "@electron-toolkit/tsconfig/tsconfig.web.json"
```

Configuration for Node environment (Main process and Preload scripts):

```json
"extends": "@electron-toolkit/tsconfig/tsconfig.node.json"
```
