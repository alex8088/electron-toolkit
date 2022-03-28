/* eslint-disable  @typescript-eslint/no-explicit-any */

export interface IpcRendererEvent extends Event {
  // Docs: https://electronjs.org/docs/api/structures/ipc-renderer-event

  /**
   * The `IpcRenderer` instance that emitted the event originally
   */
  sender: IpcRenderer
  /**
   * The `webContents.id` that sent the message, you can call
   * `event.sender.sendTo(event.senderId, ...)` to reply to the message, see
   * ipcRenderer.sendTo for more information. This only applies to messages sent from
   * a different renderer. Messages sent directly from the main process set
   * `event.senderId` to `0`.
   */
  senderId: number
}

export interface IpcRenderer {
  // Docs: https://electronjs.org/docs/api/ipc-renderer

  /**
   * Listens to `channel`, when a new message arrives `listener` would be called with
   * `listener(event, args...)`.
   */
  on(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): this
  /**
   * Adds a one time `listener` function for the event. This `listener` is invoked
   * only the next time a message is sent to `channel`, after which it is removed.
   */
  once(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): this
  /**
   * Removes the specified `listener` from the listener array for the specified
   * `channel`.
   */
  removeListener(channel: string, listener: (...args: any[]) => void): this
  /**
   * Send an asynchronous message to the main process via `channel`, along with
   * arguments. Arguments will be serialized with the Structured Clone Algorithm,
   * just like `window.postMessage`, so prototype chains will not be included.
   * Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an
   * exception.
   *
   * &gt; **NOTE:** Sending non-standard JavaScript types such as DOM objects or special
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
   * &gt; **NOTE:** Sending non-standard JavaScript types such as DOM objects or special
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
}

export interface ElectronAPI {
  ipcRenderer: IpcRenderer
  webFrame: WebFrame
  process: NodeProcess
}
