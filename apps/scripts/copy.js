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
import chokidar from 'chokidar';
import { copyFile, mkdir } from 'fs/promises';
import path from 'path';
const copy = (sourcePath, dest) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mkdir(path.dirname(dest), { recursive: true });
    }
    catch (_) { }
    copyFile(sourcePath, dest)
        .then(() => {
        console.log(`${sourcePath} is copied to ${dest}`);
    })
        .catch((err) => {
        if (err) {
            console.log(`${sourcePath} is copied to ${dest}`);
            console.log(err.stack);
        }
    });
});
export const copyFiles = (paths, watch) => __awaiter(void 0, void 0, void 0, function* () {
    if (watch) {
        const watchers = Object.keys(paths).map((s) => chokidar.watch(s));
        console.log('path');
        console.log(paths);
        for (const watcher of watchers) {
            watcher.on('add', (path) => __awaiter(void 0, void 0, void 0, function* () {
                console.log('add');
                console.log(path);
                console.log(paths[path]);
                yield copy(path, paths[path]);
            }));
            watch &&
                watcher.on('change', (path) => __awaiter(void 0, void 0, void 0, function* () { return yield copy(path, paths[path]); }));
        }
        return watchers;
    }
    for (const [src, dest] of Object.entries(paths)) {
        yield copy(src, dest);
    }
    return [];
});
//# sourceMappingURL=copy.js.map