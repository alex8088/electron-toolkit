# @electron-toolkit/typed-ipc

Type-safe Electron IPC, best practices in TypeScript.

Type checking and intellisense are available both in the main process and the renderer process. Both the listener parameters, handler parameters and return value types can be inspected and sensed, and you will not miss any modifications.

It provide a good development experience. Constrain the IPC registration of the main process and the calling of the renderer process, and avoid low-level errors. At the same time, it maintains the original writing method of IPC, which is more conducive to reading and understanding rather than over-encapsulating Electorn's IPC.

## Usage

### Install

```sh
npm i @electron-toolkit/preload @electron-toolkit/typed-ipc
```

### Get Started

1. Use [@electron-toolkit/preload](https://github.com/alex8088/electron-toolkit/tree/master/packages/preload) to expose Electron APIs.

   You can expose it in the specified preload script:

   ```ts
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

   ```ts
   import { exposeElectronAPI } from '@electron-toolkit/preload'

   exposeElectronAPI()
   ```

2. Add `*.d.ts` declaration file to define IPC event type constraints. And remember to include it in your tsconfig to make sure it takes effect.

   ```ts
   // Main process ipc events
   type IpcEvents =
     | {
         ping: [string] // listener event map
       }
     | {
         'say-hello': () => string // handler event map
       }

   //Renderer ipc events
   type IpcRendererEvent = {
     ready: [boolean]
   }
   ```

3. Register a listener or handler in the main process, or send a message to the renderer.

   ```ts
   import { IpcListener， IpcEmitter } from '@electron-toolkit/typed-ipc/main'

   const ipc = new IpcListener<IpcEvents>()

   const emitter = new IpcEmitter<IpcRendererEvent>()

   ipc.on('ping', (e, arg) => {
     console.log(arg)
     emitter.send(e.sender, 'ready', true)
   })

   ipc.handle('say-hello', () => {
     return 'hello'
   })
   ```

4. Send a message from the render process to the main process, or listen for messages from the main process.

   ```ts
   import { IpcListener， IpcEmitter } from '@electron-toolkit/typed-ipc/renderer'

   const ipc = new IpcListener<IpcRendererEvent>()

   const emitter = new IpcEmitter<IpcEvents>()

   ipc.on('ready', (e, arg) => {
     console.log(arg)
   })

   emitter.send('ping', 'pong')

   emitter.invoke('say-hello').then((str) => {
     console.log(str)
   })
   ```

## License

[MIT](./LICENSE) © alex.wei
