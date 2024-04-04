/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IpcRendererEvent } from 'electron'

export type IpcRendererListener = (event: IpcRendererEvent, ...args: any[]) => void

export interface IpcRenderer {
  // Docs: https://electronjs.org/docs/api/ipc-renderer

  /**
   * Listens to `channel`, when a new message arrives `listener` would be called with
   * `listener(event, args...)`.
   */
  on(channel: string, listener: IpcRendererListener): () => void
  /**
   * Adds a one time `listener` function for the event. This `listener` is invoked
   * only the next time a message is sent to `channel`, after which it is removed.
   */
  once(channel: string, listener: IpcRendererListener): () => void
  /**
   * Removes all listeners, or those of the specified `channel`.
   */
  removeAllListeners(channel: string): void
  /**
   * Removes the specified `listener` from the listener array for the specified
   * `channel`.
   *
   * @deprecated Use `on` listen return instead
   *
   */
  removeListener(channel: string, listener: (...args: any[]) => void): this
  /**
   * Send an asynchronous message to the main process via `channel`, along with
   * arguments. Arguments will be serialized with the Structured Clone Algorithm,
   * just like `window.postMessage`, so prototype chains will not be included.
   * Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an
   * exception.
   *
   * **NOTE:** Sending non-standard JavaScript types such as DOM objects or special
   * Electron objects will throw an exception.
   *
   * Since the main process does not have support for DOM objects such as
   * `ImageBitmap`, `File`, `DOMMatrix` and so on, such objects cannot be sent over
   * Electron's IPC to the main process, as the main process would have no way to
   * decode them. Attempting to send such objects over IPC will result in an error.
   *
   * The main process handles it by listening for `channel` with the `ipcMain`
   * module.
   *
   * If you need to transfer a `MessagePort` to the main process, use
   * `ipcRenderer.postMessage`.
   *
   * If you want to receive a single response from the main process, like the result
   * of a method call, consider using `ipcRenderer.invoke`.
   */
  send(channel: string, ...args: any[]): void
  /**
   * Resolves with the response from the main process.
   *
   * Send a message to the main process via `channel` and expect a result
   * asynchronously. Arguments will be serialized with the Structured Clone
   * Algorithm, just like `window.postMessage`, so prototype chains will not be
   * included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw
   * an exception.
   *
   * **NOTE:** Sending non-standard JavaScript types such as DOM objects or special
   * Electron objects will throw an exception.
   *
   * Since the main process does not have support for DOM objects such as
   * `ImageBitmap`, `File`, `DOMMatrix` and so on, such objects cannot be sent over
   * Electron's IPC to the main process, as the main process would have no way to
   * decode them. Attempting to send such objects over IPC will result in an error.
   *
   * The main process should listen for `channel` with `ipcMain.handle()`.
   *
   * For example:
   *
   * If you need to transfer a `MessagePort` to the main process, use
   * `ipcRenderer.postMessage`.
   *
   * If you do not need a response to the message, consider using `ipcRenderer.send`.
   */
  invoke(channel: string, ...args: any[]): Promise<any>
  /**
   * Send a message to the main process, optionally transferring ownership of zero or
   * more `MessagePort` objects.
   *
   * The transferred `MessagePort` objects will be available in the main process as
   * `MessagePortMain` objects by accessing the `ports` property of the emitted
   * event.
   *
   * **NOTE:** Cannot transfer these when `contextIsolation: true`.
   *
   * For example:
   *
   * For more information on using `MessagePort` and `MessageChannel`, see the MDN
   * documentation.
   */
  postMessage(channel: string, message: any, transfer?: MessagePort[]): void
  /**
   * The value sent back by the `ipcMain` handler.
   *
   * Send a message to the main process via `channel` and expect a result
   * synchronously. Arguments will be serialized with the Structured Clone Algorithm,
   * just like `window.postMessage`, so prototype chains will not be included.
   * Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an
   * exception.
   *
   * **NOTE:** Sending non-standard JavaScript types such as DOM objects or special
   * Electron objects will throw an exception.
   *
   * Since the main process does not have support for DOM objects such as
   * `ImageBitmap`, `File`, `DOMMatrix` and so on, such objects cannot be sent over
   * Electron's IPC to the main process, as the main process would have no way to
   * decode them. Attempting to send such objects over IPC will result in an error.
   *
   * The main process handles it by listening for `channel` with `ipcMain` module,
   * and replies by setting `event.returnValue`.
   *
   * warning: **WARNING**: Sending a synchronous message will block the whole
   * renderer process until the reply is received, so use this method only as a last
   * resort. It's much better to use the asynchronous version, `invoke()`.
   */
  sendSync(channel: string, ...args: any[]): any
  /**
   * Sends a message to a window with `webContentsId` via `channel`.
   *
   * @deprecated This methond has been removed since Electron 28.
   */
  sendTo(webContentsId: number, channel: string, ...args: any[]): void
  /**
   * Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in
   * the host page instead of the main process.
   */
  sendToHost(channel: string, ...args: any[]): void
}

export interface WebFrame {
  // Docs: https://electronjs.org/docs/api/web-frame

  /**
   * A key for the inserted CSS that can later be used to remove the CSS via
   * `webFrame.removeInsertedCSS(key)`.
   *
   * Injects CSS into the current web page and returns a unique key for the inserted
   * stylesheet.
   */
  insertCSS(css: string): string

  /**
   * Changes the zoom factor to the specified factor. Zoom factor is zoom percent
   * divided by 100, so 300% = 3.0.
   *
   * The factor must be greater than 0.0.
   */
  setZoomFactor(factor: number): void

  /**
   * Changes the zoom level to the specified level. The original size is 0 and each
   * increment above or below represents zooming 20% larger or smaller to default
   * limits of 300% and 50% of original size, respectively.
   *
   * **NOTE**: The zoom policy at the Chromium level is same-origin, meaning that
   * the zoom level for a specific domain propagates across all instances of windows
   * with the same domain. Differentiating the window URLs will make zoom work
   * per-window.
   */
  setZoomLevel(level: number): void
}

export interface NodeProcess {
  /**
   * The process.platform property returns a string identifying the operating system platform
   * on which the Node.js process is running.
   */
  readonly platform: string

  /**
   * A list of versions for the current node.js/electron configuration.
   */
  readonly versions: { [key: string]: string | undefined }

  /**
   * The process.env property returns an object containing the user environment.
   */
  readonly env: { [key: string]: string | undefined }
}

export interface ElectronAPI {
  ipcRenderer: IpcRenderer
  webFrame: WebFrame
  process: NodeProcess
}
