/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcMain } from 'electron'
import type { IpcEventMap, IpcListenEventMap, ExtractArgs, ExtractHandler } from './types'

export * from './types'

/**
 * Typed listener for Electron `ipcMain`.
 */
export class IpcListener<T extends IpcEventMap> {
  private listeners: Map<string, Set<(...args: any[]) => void>> = new Map()
  private handlers: Set<string> = new Set()

  /**
   * Listen to `channel`.
   * @returns A function to remove the listener.
   */
  on<E extends keyof ExtractArgs<T>>(
    channel: Extract<E, string>,
    listener: (e: Electron.IpcMainEvent, ...args: ExtractArgs<T>[E]) => void | Promise<void>
  ): () => void {
    let listeners = this.listeners.get(channel)
    if (!listeners) {
      listeners = new Set()
      this.listeners.set(channel, listeners)
    }
    listeners.add(listener)
    ipcMain.on(channel, listener as (e: Electron.IpcMainEvent, ...args: any[]) => void)
    return () => {
      ipcMain.removeListener(channel, listener)
      listeners.delete(listener)
      if (listeners.size === 0) {
        this.listeners.delete(channel)
      }
    }
  }

  /**
   * Handle a renderer invoke request.
   * @returns A function to remove the handler.
   */
  handle<E extends keyof ExtractHandler<T>>(
    channel: Extract<E, string>,
    listener: (
      e: Electron.IpcMainInvokeEvent,
      ...args: Parameters<ExtractHandler<T>[E]>
    ) => ReturnType<ExtractHandler<T>[E]> | Promise<ReturnType<ExtractHandler<T>[E]>>
  ): () => void {
    this.handlers.add(channel)
    ipcMain.handle(channel, listener as (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any)
    return () => {
      ipcMain.removeHandler(channel)
      this.handlers.delete(channel)
    }
  }

  /**
   * Dispose all registered listeners and handlers.
   */
  dispose(): void {
    this.listeners.forEach((listeners, channel) => {
      listeners.forEach(listener => ipcMain.removeListener(channel, listener))
    })
    this.listeners.clear()
    this.handlers.forEach(channel => ipcMain.removeHandler(channel))
    this.handlers.clear()
  }
}

/**
 * Typed emitter for sending an asynchronous message to the renderer process.
 */
export class IpcEmitter<T extends IpcListenEventMap> {
  /**
   * Send an asynchronous message to the renderer process.
   */
  send<E extends keyof T>(sender: Electron.WebContents, channel: Extract<E, string>, ...args: T[E]): void {
    sender.send(channel, ...args)
  }
}
