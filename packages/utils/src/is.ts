import { app } from 'electron'

export interface Is {
  dev: boolean
}

export const is: Is = {
  dev: !app.isPackaged
}
