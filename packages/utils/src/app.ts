import { app, session } from 'electron'
import { platform } from './platform'
import { is } from './is'

export interface ElectronApp {
  /**
   * Changes the Application User Model ID to id.
   *
   * The `id` is used only when the applcation is packaged. otherwise use the
   * `process.execPath` value as id.
   *
   * see https://www.electronjs.org/docs/latest/tutorial/notifications#windows
   * @platform — win32
   */
  setAppUserModelId: (id: string) => void
  /**
   * Whether the call succeeded.
   *
   * Set the app open at login or not.
   *
   *  **Note:** `false` always on Linux.
   * @platform — darwin,win32
   */
  setAutoLaunch: (auto: boolean) => boolean
  /**
   * Skip proxy for Electron app.
   */
  skipProxy: () => Promise<void>
}

export const electronApp: ElectronApp = {
  setAppUserModelId(id: string): void {
    if (platform.isWindows) app.setAppUserModelId(is.dev ? process.execPath : id)
  },
  setAutoLaunch(auto: boolean): boolean {
    if (platform.isLinux) return false
    const isOpenAtLogin = (): boolean => {
      return app.getLoginItemSettings().openAtLogin
    }
    if (isOpenAtLogin() !== auto) {
      app.setLoginItemSettings({ openAtLogin: auto })
      return isOpenAtLogin() === auto
    } else {
      return true
    }
  },
  skipProxy(): Promise<void> {
    return session.defaultSession.setProxy({ mode: 'direct' })
  }
}
