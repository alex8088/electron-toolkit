import { ipcRenderer, webFrame, contextBridge } from 'electron'
import { ElectronAPI } from './types'

export type { ElectronAPI, IpcRenderer, WebFrame, NodeProcess } from './types'

export const electronAPI: ElectronAPI = {
  ipcRenderer: {
    send(channel, ...args) {
      ipcRenderer.send(channel, ...args)
    },
    sendTo(webContentsId, channel, ...args) {
      ipcRenderer.sendTo(webContentsId, channel, ...args)
    },
    sendSync(channel, ...args) {
      return ipcRenderer.sendSync(channel, ...args)
    },
    sendToHost(channel, ...args) {
      ipcRenderer.sendToHost(channel, ...args)
    },
    postMessage(channel, message, transfer) {
      if (!process.contextIsolated) {
        ipcRenderer.postMessage(channel, message, transfer)
      }
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
    },
    removeAllListeners(channel) {
      ipcRenderer.removeAllListeners(channel)
      return this
    }
  },
  webFrame: {
    insertCSS(css) {
      return webFrame.insertCSS(css)
    },
    setZoomFactor(factor) {
      if (typeof factor === 'number' && factor > 0) {
        webFrame.setZoomFactor(factor)
      }
    },
    setZoomLevel(level) {
      if (typeof level === 'number') {
        webFrame.setZoomLevel(level)
      }
    }
  },
  process: {
    get platform() {
      return process.platform
    },
    get versions() {
      return process.versions
    },
    get env() {
      return { ...process.env }
    }
  }
}

/**
 * Expose Electron APIs from your preload script, the API
 * will be accessible from the website on `window.electron`.
 */
export function exposeElectronAPI(): void {
  if (process.contextIsolated) {
    try {
      contextBridge.exposeInMainWorld('electron', electronAPI)
    } catch (error) {
      console.error(error)
    }
  } else {
    // @ts-ignore (need dts)
    window.electron = electronAPI
  }
}
