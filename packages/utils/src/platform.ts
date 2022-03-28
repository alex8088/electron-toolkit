export interface Platform {
  isWindows: boolean
  isMacOS: boolean
  isLinux: boolean
}

export const platform: Platform = {
  isWindows: process.platform === 'win32',
  isMacOS: process.platform === 'darwin',
  isLinux: process.platform === 'linux'
}
