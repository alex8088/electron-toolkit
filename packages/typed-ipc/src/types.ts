/* eslint-disable @typescript-eslint/no-explicit-any */
export type IpcListenEventMap = {
  [key: string]: [...args: any[]]
}

export type IpcHandleEventMap = {
  [key: string]: (...args: any[]) => any
}

export type IpcEventMap = IpcListenEventMap | IpcHandleEventMap

export type ExtractArgs<T> = T extends IpcListenEventMap ? T : never

export type ExtractHandler<T> = T extends IpcHandleEventMap ? T : never
