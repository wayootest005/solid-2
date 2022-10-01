//import {build} from '@chialab/rna-bundler';
import esbuild from 'esbuild';
import postcssPlugin from '@chialab/esbuild-plugin-postcss';
//import htmlPlugin from '@chialab/esbuild-plugin-html';
//import cssImportPlugin from '@chialab/esbuild-plugin-css-import';

import {copyFiles} from './copy.mjs';

const isDevelopment = true;
const watch = true;

(async () => {
  const outdir = isDevelopment ? 'public' : 'releases/src';
  const copyWatchers = await copyFiles(
    {
      'assets/index.html': `${outdir}/index.html`,
    },
    isDevelopment && watch
  );

  esbuild
    .build({
      entryPoints: ['src/index.ts'],
      outdir: 'public',
      assetNames: 'assets/[name]-[hash]',
      chunkNames: '[ext]/[name]-[hash]',
      plugins: [postcssPlugin()],
      bundle: true,
      watch: true,
      target: ['es2020'],
      platform: 'browser', // 'node',
      format: 'esm', // 'cjs' 'iife'
      minify: !isDevelopment,
    })
    .then(() => {
      console.log(
        'build finished' +
          (isDevelopment && watch ? ', watching for changes...' : '')
      );
    })
    .catch(() => {
      for (const watcher of copyWatchers) {
        watcher.close();
      }
    });
})();
