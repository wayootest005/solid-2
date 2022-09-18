import {build} from '@chialab/rna-bundler';
import esbuild from 'esbuild';
import postcssPlugin from '@chialab/esbuild-plugin-postcss';
import htmlPlugin from '@chialab/esbuild-plugin-html';

await esbuild.build({
  entryPoints: ['src/index.html'],
  outdir: 'public',
  assetNames: 'assets/[name]-[hash]',
  chunkNames: '[ext]/[name]-[hash]',
  plugins: [postcssPlugin(), htmlPlugin()],
});

await build({
  input: 'dist/index.js',
  output: 'public/index.js',

  // code: '...',
  // rootDir: '.',
  bundle: false,
  platform: 'browser', // 'node',
  format: 'esm', // 'cjs' 'iife'
  // globalName: '', // global name for iife modules
  sourcemap: true,
  minify: false,
  watch: true,
});
