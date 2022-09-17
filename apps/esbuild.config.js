#!/usr/bin/env node

import esbuildServe from 'esbuild-serve';

esbuildServe(
  {
    logLevel: 'info',
    entryPoints: ['dist/index.js'],
    bundle: true,
    outfile: 'www/main.js',
  },
  {root: 'www'}
);
