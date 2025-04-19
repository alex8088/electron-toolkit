import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import rm from 'rollup-plugin-rm'

export default defineConfig([
  {
    input: ['src/main.ts'],
    output: [
      {
        entryFileNames: '[name].cjs',
        chunkFileNames: 'chunks/lib-[hash].cjs',
        format: 'cjs',
        dir: 'dist'
      },
      {
        entryFileNames: '[name].mjs',
        chunkFileNames: 'chunks/lib-[hash].mjs',
        format: 'es',
        dir: 'dist'
      }
    ],
    external: ['electron'],
    plugins: [
      resolve(),
      commonjs(),
      ts({
        compilerOptions: {
          rootDir: 'src',
          declaration: true,
          declarationDir: 'dist/types'
        }
      }),
      rm('dist', 'buildStart')
    ]
  },
  {
    input: ['src/renderer.ts'],
    output: [
      { file: './dist/renderer.mjs', format: 'es' },
      { name: 'renderer', file: './dist/renderer.js', format: 'iife' }
    ],
    plugins: [
      ts({
        compilerOptions: {
          rootDir: 'src',
          declaration: true,
          declarationDir: 'dist/types'
        }
      })
    ]
  },
  {
    input: ['dist/types/main.d.ts'],
    output: [{ file: './dist/main.d.ts', format: 'es' }],
    plugins: [dts()],
    external: ['electron']
  },
  {
    input: ['dist/types/renderer.d.ts'],
    output: [{ file: './dist/renderer.d.ts', format: 'es' }],
    plugins: [dts(), rm('dist/types', 'buildEnd')]
  }
])
