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
