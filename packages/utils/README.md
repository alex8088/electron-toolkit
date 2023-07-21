# @electron-toolkit/utils

> Utils for Electron main process.

---

## Install

```sh
npm i @electron-toolkit/utils
```

## APIs

### is

- dev

  - Type: boolean, `true` when `app.isPackaged` is `false`

### platform

- isWindows

  - Type: boolean, `true` when `process.platform` is `win32`

- isMacOS

  - Type: boolean, `true` when `process.platform` is `darwin`

- isLinux

  - Type: boolean, `true` when `process.platform` is `linux`

### electronApp

- setAppUserModelId

  - Type: (id: string): void

  - Platform: win32

    The `id` is used only when the applcation is packaged. otherwise use the `process.execPath` value as id. See [https://www.electronjs.org/docs/latest/tutorial/notifications#windows](https://www.electronjs.org/docs/latest/tutorial/notifications#windows)

- setAutoLaunch

  - Type: (auto: boolean) => boolean

  - Platform: darwin,win32

    Set the app automatically open at login or not

- skipProxy

  - Type: () => Promise<void>

  - Kind: async, sequential

    Skip proxy for Electron app

### ipcHelper

> The Ipc helper can make you easy to manage your main Ipc.

- handle

  - Type: (channel: string, listener: (event: IpcMainInvokeEvent, ...args: any[]) => Promise<void> | any): void

  - Kind: async, sequential

- on

  - Type: () => (channel: string, listener: (event: IpcMainEvent, ...args: any[]) => void): this

- removeAllListeners

  - Type: (): this

    Remove all register ipc listeners

- removeAllHandlers

  - Type: (): void

    Remove all register ipc handlers

- removeListeners

  - Type: (channels: string[]): this

    Remove ipc listeners

- removeHandlers

  - Type: (channels: string[]): void

    Remove ipc handlers

### optimizer

- watchWindowShortcuts

  - Type: (window: BrowserWindow, shortcutOptions?: shortcutOptions) => void

    Default open or close DevTools by `F12` in development and ignore `CommandOrControl + R` in production. Furthermore, you can use `shortcutOptions` to control more shortcuts.

    Example:

    ```javascript
    import { app } from 'electron'
    import { optimizer } from '@electron-toolkit/utils'

    app.whenReady().then(() => {
      app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
      })
    })
    ```

- registerFramelessWindowIpc

  - Type: () => void

    If use a frameless window which hide the system's native window controls, we may need to create custom window controls in HTML.

    The frameless window ipc allow the renderer process to control the browser window.

    The ipc channel named **`win:invoke`**.

    Example:

    ```javascript
    // main.js
    import { app } from 'electron'
    import { optimizer } from '@electron-toolkit/utils'

    app.whenReady().then(() => {
      optimizer.registerFramelessWindowIpc()
    })
    ```

    ```javascript
    // renderer.js or preload.js
    ipcRenderer.send('win:invoke', 'show')
    ipcRenderer.send('win:invoke', 'showInactive')
    ipcRenderer.send('win:invoke', 'min')
    ipcRenderer.send('win:invoke', 'max')
    ipcRenderer.send('win:invoke', 'close')
    ```
