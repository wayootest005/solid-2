var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable no-console */
import { build } from 'esbuild';
import postCssPlugin from '@chialab/esbuild-plugin-postcss';
import { copyFiles } from './copy';
const isDevelopment = process.env.NODE_ENV === 'development';
const watch = process.env.NODE_WATCH === 'watch';
(() => __awaiter(void 0, void 0, void 0, function* () {
    const outdir = isDevelopment ? 'dist' : 'releases\\src';
    const copyWatchers = yield copyFiles({
        'src\\index.html': `${outdir}\\main\\index.html`,
    }, isDevelopment && watch);
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
        console.log('build finished' +
            (isDevelopment && watch ? ', watching for changes...' : ''));
    })
        .catch(() => {
        for (const watcher of copyWatchers) {
            watcher.close();
        }
        process.exit(1);
    });
}))();
//# sourceMappingURL=build.js.map