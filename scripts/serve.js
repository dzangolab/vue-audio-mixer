import path from 'path'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import vue from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import common from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import scss from 'rollup-plugin-scss'
import scssVariable from 'rollup-plugin-sass-variables'

export default {
  input: path.join(__dirname, '..', 'example', 'main.js'),
  output: {
    file: path.join(__dirname, '..', 'example', 'demo.js'),
    format: 'iife',
    name: 'demo',
    sourcemap: false
  },
  plugins: [
    vue({
      css: true
    }),
    scss(),
    postcss(),
    scssVariable(),

    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    resolve({
      mainFields: ['module', 'main']
    }),
    common(),
    babel({exclude: 'node_modules/**'}),
    serve({
      open: true,
      contentBase: path.join(__dirname, '..', 'example'),
      host: 'localhost',
      port: 10001
    }),
    livereload({
      verbose: true,
      watch: path.join(__dirname, '..', 'example')
    })
  ]
}