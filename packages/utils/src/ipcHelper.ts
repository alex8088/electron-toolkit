/* eslint-disable  @typescript-eslint/no-explicit-any */

import { IpcMainEvent, IpcMainInvokeEvent, ipcMain } from 'electron'

export interface IpcHelper {
  // Docs: https://electronjs.org/docs/api/ipc-main

  /**
   * Adds a handler for an `invoke`able IPC. This handler will be called whenever a
   * renderer calls `ipcRenderer.invoke(channel, ...args)`.
   *
   * If `listener` returns a Promise, the eventual result of the promise will be
   * returned as a reply to the remote caller. Otherwise, the return value of the
   * listener will be used as the value of the reply.
   *
   * The `event` that is passed as the first argument to the handler is the same as
   * that passed to a regular event listener. It includes information about which
   * WebContents is the source of the invoke request.
   *
   * Errors thrown through `handle` in the main process are not transparent as they
   * are serialized and only the `message` property from the original error is
   * provided to the renderer process. Please refer to #24427 for details.
   */
  handle(channel: string, listener: (event: IpcMainInvokeEvent, ...args: any[]) => Promise<void> | any): void
  /**
   * Listens to `channel`, when a new message arrives `listener` would be called with
   * `listener(event, args...)`.
   */
  on(channel: string, listener: (event: IpcMainEvent, ...args: any[]) => void): this
  /**
   * Remove all register ipc listeners.
   */
  removeAllListeners(): this
  /**
   * Remove all register ipc handlers.
   */
  removeAllHandlers(): void
  /**
   * Remove ipc listeners.
   */
  removeListeners(channels: string[]): this
  /**
   * Remove ipc handlers.
   */
  removeHandlers(channels: string[]): void
}

let listeners: string[] = []
let handlers: string[] = []

export const ipcHelper: IpcHelper = {
  handle(channel, listener) {
    handlers.push(channel)
    ipcMain.handle(channel, listener)
  },
  on(channel, listener) {
    listeners.push(channel)
    ipcMain.on(channel, listener)
    return this
  },
  removeAllListeners() {
    listeners.forEach(c => ipcMain.removeAllListeners(c))
    listeners = []
    return this
  },
  removeAllHandlers() {
    handlers.forEach(c => ipcMain.removeHandler(c))
    handlers = []
  },
  removeListeners(channels) {
    channels.forEach(c => ipcMain.removeAllListeners(c))
    return this
  },
  removeHandlers(channels) {
    channels.forEach(c => ipcMain.removeHandler(c))
  }
}
