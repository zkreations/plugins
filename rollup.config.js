import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'

export default {
  input: 'src/js/main.js',
  output: {
    file: 'dist/js/main.js',
    format: 'iife',
    name: 'Plugin'
  },
  plugins: [
    commonjs(),
    babel({
      babelHelpers: 'bundled'
    })
  ]
}
