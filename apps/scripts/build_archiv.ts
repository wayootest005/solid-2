/* eslint-disable no-console */

import {build} from 'esbuild';
import postCssPlugin from '@chialab/esbuild-plugin-postcss';

import {copyFiles} from './copy';

const isDevelopment = process.env.NODE_ENV === 'development';
const watch = process.env.NODE_WATCH === 'watch';

(async () => {
  const outdir = isDevelopment ? 'dist' : 'releases\\src';
  const copyWatchers = await copyFiles(
    {
      'src\\index.html': `${outdir}\\main\\index.html`,
    },
    isDevelopment && watch
  );

  build({
    plugins: [postCssPlugin()],
    entryPoints: ['src/index.ts'],
    outdir,
    bundle: true,

    define: {
      global: 'globalThis',
    },
    watch: isDevelopment &&
      watch && {
        onRebuild(error, result) {
          if (error) {
            console.error('watch build failed:', error);
            return;
          }
          console.log('watch build succeeded:', result);
        },
      },
    minify: !isDevelopment,
    target: ['es2020'],
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
      process.exit(1);
    });
})();
