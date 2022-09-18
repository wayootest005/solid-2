import {build} from '@chialab/rna-bundler';

await build({
  input: 'dist/index.js',
  output: 'public/index.js',
  // code: '...',
  // rootDir: '.',
  bundle: true,
  platform: 'browser', // 'node',
  format: 'esm', // 'cjs' 'iife'
  // globalName: '', // global name for iife modules
  sourcemap: true,
  minify: true,
  watch: true,
});
