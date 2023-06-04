# @electron-toolkit/preload

> Easy to expose Electron APIs (ipcRenderer,webFrame,process) to renderer.

---

## Usage

### Install

```sh
npm i @electron-toolkit/preload
```

### Get Started

First, use `contextBridge` APIs to expose Electron APIs to renderer only if context isolation is enabled, otherwise just add to the DOM global.

```javascript
import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
}
```

or

```javascript
import { electronAPI } from '@electron-toolkit/preload'

exposeElectronAPI()
```

Then, use the Electron APIs directly in the renderer process：

```javascript
// Send a message to the main process with no response
window.electron.ipcRenderer.send('electron:say', 'hello')

// Send a message to the main process with the response asynchronously
window.electron.ipcRenderer.invoke('electron:doAThing', '').then(re => {
  console.log(re)
})

// Receive messages from the main process
window.electron.ipcRenderer.on('electron:reply', (_, args) => {
  console.log(args)
})

// Remove a listener
const removeListener = window.electron.ipcRenderer.on('electron:reply', (_, args) => {})
removeListener()
```

**Note**: If you're building your Electron app with TypeScript, you may want to get TypeScript intelliSense for the renderer process. So that you can create a `*.d.ts` declaration file and globally augment the `Window` interface:

```javascript
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
  }
}
```

## API

### IpcRenderer

- `send`
- `sendTo`
- `sendSync`
- `sendToHost`
- `invoke`
- `postMessage`
- `on`
- `once`
- `removeAllListeners`
- `removeListener`

### WebFrame

- `insertCSS`
- `setZoomFactor`
- `setZoomLevel`

### NodeProcess

- `platform` property
- `versions` property
- `env` property

## License

[MIT](./LICENSE) © alex.wei
