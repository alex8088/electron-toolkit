import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { IpcEventMap, IpcListener } from './main'
import { ipcMain } from 'electron'

vi.mock('electron', () => ({
  ipcMain: {
    on: vi.fn(),
    removeListener: vi.fn(),
    handle: vi.fn(),
    removeHandler: vi.fn()
  }
}))

describe('IpcListener', () => {
  let ipcListener: IpcListener<IpcEventMap>

  beforeEach(() => {
    ipcListener = new IpcListener()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should register a listener and return a cleanup function', () => {
    const channel = 'test-channel'
    const listener1 = vi.fn()
    const listener2 = vi.fn()

    const cleanup1 = ipcListener.on(channel, listener1)
    ipcListener.on(channel, listener2)

    cleanup1()

    expect(ipcMain.removeListener).toHaveBeenCalledWith(channel, listener1)
    expect(ipcListener['listeners'].get(channel)?.has(listener1)).toBe(false)
    expect(ipcListener['listeners'].get(channel)?.has(listener2)).toBe(true)
  })

  it('should delete the channel from the listeners map when all listeners are removed', () => {
    const channel = 'test-channel'
    const listener = vi.fn()

    const cleanup = ipcListener.on(channel, listener)

    cleanup()

    expect(ipcListener['listeners'].has(channel)).toBe(false)
  })

  it('should register a handler and return a cleanup function', () => {
    const channel1 = 'test-channel-1'
    const channel2 = 'test-channel-2'
    const handler1 = vi.fn()
    const handler2 = vi.fn()

    const cleanup1 = ipcListener.handle(channel1, handler1)
    const cleanup2 = ipcListener.handle(channel2, handler2)

    cleanup1()

    expect(ipcMain.removeHandler).toHaveBeenCalledWith(channel1)
    expect(ipcListener['handlers'].has(channel1)).toBe(false)
    expect(ipcListener['handlers'].has(channel2)).toBe(true)

    cleanup2()

    expect(ipcMain.removeHandler).toHaveBeenCalledWith(channel2)
    expect(ipcListener['handlers'].has(channel2)).toBe(false)
  })

  it('should dispose all listeners and handlers', () => {
    const channel1 = 'test-channel-1'
    const channel2 = 'test-channel-2'
    const listener1 = vi.fn()
    const listener2 = vi.fn()
    const handler = vi.fn()

    ipcListener.on(channel1, listener1)
    ipcListener.on(channel2, listener2)
    ipcListener.handle(channel1, handler)

    ipcListener.dispose()

    expect(ipcMain.removeListener).toHaveBeenCalledWith(channel1, listener1)
    expect(ipcMain.removeListener).toHaveBeenCalledWith(channel2, listener2)
    expect(ipcMain.removeHandler).toHaveBeenCalledWith(channel1)
    expect(ipcListener['listeners'].size).toBe(0)
    expect(ipcListener['handlers'].size).toBe(0)
  })

  it('should only dispose listeners and handlers registered by the instance', () => {
    const channel1 = 'test-channel-1'
    const channel2 = 'test-channel-2'
    const listener1 = vi.fn()
    const listener2 = vi.fn()
    const handler = vi.fn()

    ipcListener.on(channel1, listener1)
    ipcListener.on(channel2, listener2)
    ipcListener.handle(channel1, handler)

    const otherIpcListener = new IpcListener()

    const otherChannel = 'other-channel'
    const otherListener = vi.fn()
    const otherHandler = vi.fn()

    otherIpcListener.on(otherChannel, otherListener)
    otherIpcListener.handle(otherChannel, otherHandler)

    ipcListener.dispose()

    expect(ipcMain.removeListener).toHaveBeenCalledWith(channel1, listener1)
    expect(ipcMain.removeListener).toHaveBeenCalledWith(channel2, listener2)
    expect(ipcMain.removeHandler).toHaveBeenCalledWith(channel1)
    expect(ipcMain.removeListener).not.toHaveBeenCalledWith(otherChannel, otherListener)
    expect(ipcMain.removeHandler).not.toHaveBeenCalledWith(otherChannel)
    expect(ipcListener['listeners'].size).toBe(0)
    expect(ipcListener['handlers'].size).toBe(0)
  })
})
