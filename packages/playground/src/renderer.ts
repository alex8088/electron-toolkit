function init(): void {
  window.addEventListener('DOMContentLoaded', () => {
    const versions = window.electron.process.versions
    replaceText('#electron-version', `v${versions.electron}`)
    replaceText('#chrome-version', `v${versions.chrome}`)
    replaceText('#node-version', `v${versions.node}`)
  })
}

function replaceText(selector: string, text: string): void {
  const element = document.querySelector<HTMLElement>(selector)
  if (element) {
    element.innerText = text
  }
}

init()
