import { ipcRenderer, webFrame } from 'electron'
import { ElectronAPI } from './types'

export type { ElectronAPI, IpcRenderer, IpcRendererEvent, WebFrame, NodeProcess } from './types'

export const electronAPI: ElectronAPI = {
  ipcRenderer: {
    send(channel, ...args) {
      ipcRenderer.send(channel, ...args)
    },
    invoke(channel, ...args) {
      return ipcRenderer.invoke(channel, ...args)
    },
    on(channel, listener) {
      ipcRenderer.on(channel, listener)
      return this
    },
    once(channel, listener) {
      ipcRenderer.once(channel, listener)
      return this
    },
    removeListener(channel, listener) {
      ipcRenderer.removeListener(channel, listener)
      return this
    }
  },
  webFrame: {
    insertCSS(css) {
      return webFrame.insertCSS(css)
    }
  },
  process: {
    get platform() {
      return process.platform
    },
    get versions() {
      return process.versions
    }
  }
}
