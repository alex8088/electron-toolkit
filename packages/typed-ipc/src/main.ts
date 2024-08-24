/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcMain } from 'electron'
import type { IpcEventMap, IpcListenEventMap, ExtractArgs, ExtractHandler } from './types'

export * from './types'

/**
 * Typed listener for Electron `ipcMain`.
 */
export class IpcListener<T extends IpcEventMap> {
  private listeners: string[] = []
  private handlers: string[] = []

  /**
   * Listen to `channel`.
   */
  on<E extends keyof ExtractArgs<T>>(
    channel: Extract<E, string>,
    listener: (e: Electron.IpcMainEvent, ...args: ExtractArgs<T>[E]) => void | Promise<void>
  ): void {
    this.listeners.push(channel)
    ipcMain.on(channel, listener as (e: Electron.IpcMainEvent, ...args: any[]) => void)
  }

  /**
   * Handle a renderer invoke request.
   */
  handle<E extends keyof ExtractHandler<T>>(
    channel: Extract<E, string>,
    listener: (
      e: Electron.IpcMainInvokeEvent,
      ...args: Parameters<ExtractHandler<T>[E]>
    ) => ReturnType<ExtractHandler<T>[E]> | Promise<ReturnType<ExtractHandler<T>[E]>>
  ): void {
    this.handlers.push(channel)
    ipcMain.handle(channel, listener as (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any)
  }

  /**
   * Dispose all listeners and handlers.
   */
  dispose(): void {
    this.listeners.forEach(c => ipcMain.removeAllListeners(c))
    this.listeners = []
    this.handlers.forEach(c => ipcMain.removeHandler(c))
    this.handlers = []
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
