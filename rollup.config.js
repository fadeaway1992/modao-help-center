import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
 
export default {
  input: 'bundle.js',
  output: {
    file: 'global.js',
    format: 'iife',
    name: 'MyModule'
  },
  plugins: [
    resolve(),
    commonjs()
  ]
};