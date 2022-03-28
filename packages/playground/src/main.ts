import { app, BrowserWindow } from 'electron'
import * as path from 'path'

import { optimizer, electronApp } from '@electron-toolkit/utils'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, './preload.js')
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../index.html'))
}

app.on('ready', () => {
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  electronApp.setAppUserModelId('electron.com')

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
