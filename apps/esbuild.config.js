#!/usr/bin/env node

import esbuildServe from 'esbuild-serve';
import autoprefixer from 'autoprefixer';
import postCssPlugin from 'esbuild-plugin-postcss2';

esbuildServe(
  {
    logLevel: 'info',
    entryPoints: ['dist/index.js'],
    bundle: true,
    outfile: 'www/main.js',
    plugins: [
      postCssPlugin.default({
        plugins: [autoprefixer],
      }),
    ],
  },
  {root: 'www'}
);
