import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import importCss from 'rollup-plugin-import-css';

export default {
  input: 'src/LiquidGlass.jsx',
  output: [
    {
      file: 'dist/LiquidGlass.cjs',
      format: 'cjs',
      exports: 'named',
      inlineDynamicImports: true
    },
    {
      file: 'dist/LiquidGlass.esm.js',
      format: 'esm',
      inlineDynamicImports: true
    }
  ],  
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx']
    }),
    commonjs(),
    importCss({
        output: 'liquid-glass.css' // add this option to emit CSS file
      }),  
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      extensions: ['.js', '.jsx']
    })
  ],
  external: ['react', 'react-dom']
};
