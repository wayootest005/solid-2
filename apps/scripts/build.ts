//import {build} from '@chialab/rna-bundler';
import esbuild from 'esbuild';
import postcssPlugin from '@chialab/esbuild-plugin-postcss';
//import htmlPlugin from '@chialab/esbuild-plugin-html';
//import cssImportPlugin from '@chialab/esbuild-plugin-css-import';

(async () => {
  esbuild.build({
    entryPoints: ['src/index.ts'],
    outdir: 'public',
    assetNames: 'assets/[name]-[hash]',
    chunkNames: '[ext]/[name]-[hash]',
    plugins: [postcssPlugin()],
    bundle: true,

    target: ['es2020'],
    platform: 'browser', // 'node',
    format: 'esm', // 'cjs' 'iife'
  });
})();
