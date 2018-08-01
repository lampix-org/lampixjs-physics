import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import css from 'rollup-plugin-css-only';

const ts2 = require('typescript');

const defaults = {
  name: 'lampix.physics',
  input: 'src/index.ts',
  external: ['@lampix/core'],
  globals: {
    '@lampix/core': 'lampix'
  }
}

export default [
  // UMD - for script:src in html files
  {
    input: defaults.input,
    output: {
      file: 'lib/umd/lampix-physics.js',
      format: 'umd',
      name: defaults.name
    },
    plugins: [
      typescript({
        typescript: ts2
      }),
      // resolve({ module: true }),
      resolve(),
      commonjs({
        namedExports: {
          'node_modules/matter-js/build/matter.js': [
            'Matter',
            'Body',
            'Engine',
            'Render',
            'World',
            'Bodies',
            'use',
            'Bounds',
            'Constraint'
          ],
          'node_modules/matter-attractors/build/matter-attractors.js': [
            'matter-attractors'
          ]
        }
      })
    ]
  }
]
