#!/usr/bin/env node

import esbuildServe from 'esbuild-serve';
//import autoprefixer from 'autoprefixer';
import postcssPlugin from '@chialab/esbuild-plugin-postcss';

esbuildServe(
  {
    logLevel: 'info',
    entryPoints: ['dist/index.js'],
    bundle: true,
    outfile: 'www/main.js',
    plugins: [postcssPlugin()],
  },
  {root: 'www'}
);
