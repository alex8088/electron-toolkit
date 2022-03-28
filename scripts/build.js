const colors = require('picocolors')
const path = require('path')
const fs = require('fs-extra')
const rollup = require('rollup')
const typescript = require('@rollup/plugin-typescript')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor')

run()

async function run() {
  let targets = process.argv.slice(2)
  if (!targets.length) targets = fs.readdirSync('packages')

  targets = targets.filter(t => t !== 'tsconfig')

  console.log(colors.yellow('Building packages...'))

  Promise.all(targets.map(t => build(t)))
    .then(() => {
      console.log(colors.green('Build Finished'))
    })
    .catch(e => {
      console.log(colors.red('ERROR'))
      console.error(e)
      process.exitCode = 1
    })
}

async function build(target) {
  const dir = path.resolve(`packages/${target}`)
  const pkg = require(`${dir}/package.json`)

  // ignore private packages
  if (pkg.private) return

  await fs.remove(`${dir}/dist`)

  console.log()
  console.log(colors.bold(colors.yellow(`Rolling up ts code for ${target} ...`)))

  const external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]

  const bundle = await rollup.rollup({
    input: path.join(dir, 'src/index.ts'),
    external,
    plugins: [
      typescript({
        tsconfig: path.resolve(dir, 'tsconfig.json')
      }),
      nodeResolve()
    ],
    treeshake: {
      moduleSideEffects: false
    }
  })
  await bundle.write({
    dir: path.join(dir, 'dist'),
    format: 'cjs'
  })

  console.log(colors.bold(colors.yellow(`Rolling up type definitions for ${target} ...`)))

  if (pkg.types) {
    const extractorConfig = ExtractorConfig.loadFileAndPrepare(path.resolve(dir, `api-extractor.json`))
    const extractorResult = Extractor.invoke(extractorConfig, {
      localBuild: true,
      showVerboseMessages: true
    })

    if (extractorResult.succeeded) {
      console.log(colors.green('API Extractor completed successfully'))
    } else {
      console.error(
        `API Extractor completed with ${extractorResult.errorCount} errors` +
          ` and ${extractorResult.warningCount} warnings`
      )
      process.exitCode = 1
    }
  }

  await fs.remove(`${dir}/dist/types`)

  console.log(colors.green(`Build ${pkg.name}@${pkg.version} successfully`))
}
