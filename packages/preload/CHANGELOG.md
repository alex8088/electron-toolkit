### v3.0.2 (_2025-04-19_)

- feat: add 'webUtils.getPathForFile' api

### v3.0.1 (_2024-04-04_)

- feat: allow to remove a once listener

### v3.0.0 (_2023-12-19_)

- feat: support ESM
- feat: deprecate sendTo api
- fix: postMessage is available when context isolation is enabled [#5](https://github.com/alex8088/electron-toolkit/issues/5)

### v2.0.0 (_2023-06-04_)

New way to remove a listener

```ts
const listener = (_, ...args): void => {}
const ipc = window.electron.ipcRenderer

// Old, remove listener not work
ipc.on(channel, listener)
ipc.removeListener(channel, listener)

// New
const removeListener = ipc.on(channel, listener)
removeListener()
```

- refactor: remove IpcRendererEvent type export and use Electron's own type
- refactor: remove listener
- refactor: deprecated IpcRenderer removeListener API
- chore: export IpcRendererListener type

### v1.0.3 (_2022-12-28_)

#### Bug Fixes

- fix: `sendSync` does not return

### v1.0.2 (_2022-04-23_)

#### Features

- `exposeElectronAPI` method: A concise way to expose APIs in preload script
- ipcRenderer: more APIs
  - sendTo
  - sendSync
  - sendToHost
  - postMessage
  - removeAllListeners
- webFrame: more APIs
  - setZoomFactor
  - setZoomLevel
- process: more props
  - env property

### v1.0.1 (_2022-03-28_)

#### Bug Fixes

- **preload**: use wider range for peer deps

### v1.0.0 (_2022-03-25_)

#### Features

- expose `ipcRenderer` Electron APIs to the renderer process
- expose `webFrame` Electron APIs to the renderer process
- expose `process` Electron APIs to the renderer process
