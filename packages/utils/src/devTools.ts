import path from 'path'
import fs from 'fs'
import { app, session } from 'electron'
import https from 'https'

import { unzipCrx } from './utils/unzipCrx'
import { is } from './is'

const getCachePath = (): string => {
  return path.resolve(app.getPath('userData'), 'CachedExtensions')
}

const mkdir = (path: string): void => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true })
  }
}

const rmdir = (dir: string): void => {
  const names = fs.readdirSync(dir) || []
  names.forEach(name => {
    const _path = path.join(dir, name)
    const i = fs.statSync(_path)
    if (i.isDirectory()) {
      rmdir(_path)
    } else {
      try {
        fs.unlinkSync(_path)
      } catch (e) {
        console.log()
      }
    }
  })
  try {
    fs.rmdirSync(dir)
  } catch (e) {
    console.log()
  }
}

const dl = (url: string, savePath: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const failed = (err: Error | string): void => reject(err)
    const request = https.get(url)
    request.on('response', res => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(savePath)).on('close', resolve)
        res.on('error', failed)
      } else if (res.statusCode === 302 && res.headers.location) {
        dl(res.headers.location, savePath).then(resolve).catch(failed)
      } else {
        failed(`Error: download extension response with ${res.statusCode}`)
      }
    })
    request.on('error', failed)
    request.end()
  })
}

const downloadChromeExtension = (extensionId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cachePath = getCachePath()

    mkdir(cachePath)

    const extensionDir = path.resolve(cachePath, extensionId)
    if (fs.existsSync(extensionDir)) rmdir(extensionDir)

    const url = `https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${extensionId}%26uc&prodversion=32` // eslint-disable-line
    const savePath = path.resolve(cachePath, `${extensionId}.crx`)

    dl(url, savePath)
      .then(() => unzipCrx(savePath, extensionDir))
      .then(() => resolve(extensionDir))
      .catch(e => {
        if (fs.existsSync(extensionDir)) rmdir(extensionDir)
        console.error('Install extension failed.\n', e)
        reject()
      })
  })
}

const chromeExtensions = {
  ANGULARJS_BATARANG: 'ighdmehidhipcmcojjgiloacoafjmpfk',
  REACT_DEVELOPER_TOOLS: 'fmkadmapgofadopljbjfkapdkoienihi',
  REDUX_DEVTOOLS: 'lmhkpmbekcpmknklioeibfkpmmfibljd',
  VUEJS3_DEVTOOLS: 'ljjemllljcmogpfapbkkighbhhppjdbg',
  VUEJS_DEVTOOLS: 'nhdogjmejiglipccpnnnanhbledajbpd'
}

export type ChromeExtension =
  | 'ANGULARJS_BATARANG'
  | 'REACT_DEVELOPER_TOOLS'
  | 'REDUX_DEVTOOLS'
  | 'VUEJS3_DEVTOOLS'
  | 'VUEJS_DEVTOOLS'

export interface ChromeExtensionOptions {
  forceDownload?: boolean
  allowFileAccess?: boolean
}

export interface DevTools {
  install: (extensionId: ChromeExtension, options?: ChromeExtensionOptions) => Promise<void>
}

export const devTools: DevTools = {
  install: async (extensionId: ChromeExtension, options?: ChromeExtensionOptions): Promise<void> => {
    if (!is.dev || !app.isReady() || process.type !== 'browser') return

    const chromeExtensionId = chromeExtensions[extensionId]
    if (!chromeExtensionId) {
      console.error('Invalid extension')
      return
    }

    if (session.defaultSession.getExtension(chromeExtensionId)) {
      console.warn('Extension installed')
      return
    }

    const cacheDir = getCachePath()
    let extensionDir = path.resolve(cacheDir, chromeExtensionId)

    if (!fs.existsSync(extensionDir) || options?.forceDownload) {
      try {
        extensionDir = await downloadChromeExtension(chromeExtensionId)
      } catch {
        extensionDir = ''
      }
    }

    const loadExtensionOptions = {
      allowFileAccess: options?.allowFileAccess || false
    }

    if (extensionDir) session.defaultSession.loadExtension(extensionDir, loadExtensionOptions)
  }
}
