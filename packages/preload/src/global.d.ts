/* eslint-disable @typescript-eslint/no-explicit-any */

declare namespace Electron {
  interface IpcRenderer {
    sendTo(webContentsId: number, channel: string, ...args: any[]): void
  }
}
