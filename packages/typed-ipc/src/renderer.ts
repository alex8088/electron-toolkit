/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IpcEventMap, IpcListenEventMap, ExtractArgs, ExtractHandler } from './types'

export * from './types'

/**
 * Typed emitter for Electron `ipcRenderer`.
 */
export class IpcEmitter<T extends IpcEventMap> {
  send<E extends keyof ExtractArgs<T>>(channel: Extract<E, string>, ...args: ExtractArgs<T>[E]): void {
    window.electron.ipcRenderer.send(channel, ...args)
  }

  invoke<E extends keyof ExtractHandler<T>>(
    channel: Extract<E, string>,
    ...args: Parameters<ExtractHandler<T>[E]>
  ): Promise<ReturnType<ExtractHandler<T>[E]>> {
    return window.electron.ipcRenderer.invoke(channel, ...args)
  }
}

/**
 * Typed listener for Electron `ipcRenderer`.
 */
export class IpcListener<T extends IpcListenEventMap> {
  on<E extends keyof T>(
    channel: Extract<E, string>,
    listener: (e: Electron.IpcRendererEvent, ...args: T[E]) => void
  ): void | Promise<void> {
    window.electron.ipcRenderer.on(channel, listener as (event: Electron.IpcRendererEvent, ...args: any[]) => void)
  }

  once<E extends keyof T>(
    channel: Extract<E, string>,
    listener: (e: Electron.IpcRendererEvent, ...args: T[E]) => void | Promise<void>
  ): () => void {
    return window.electron.ipcRenderer.once(
      channel,
      listener as (event: Electron.IpcRendererEvent, ...args: any[]) => void
    )
  }
}
