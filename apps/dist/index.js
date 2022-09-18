const fileName_1 = "C:/Users/t/Desktop/Programmieren/Effect/Effect-2/solid-2/apps/src/index.ts";
import * as tsplus_module_1 from "@effect/html/io/Render";
import * as tsplus_module_2 from "@effect/core/io/Effect/operations/map";
import * as tsplus_module_3 from "@effect/core/io/Effect/operations/runtime";
import './globals';
import '../assets/css/main.css';
const myPage = tsplus_module_1.html ` <div>Here's my main page.</div> `;
const myListView = tsplus_module_1.html `<p class="text-blue-600">The quick brown fox...</p>`;
const myPage2 = tsplus_module_1.html ` ${myPage} ${myListView} `;
const program = tsplus_module_2.map_(tsplus_module_1.render(document.body, tsplus_module_1.html ` ${myPage2}`), () => void 0, fileName_1 + ":11:4");
tsplus_module_3.unsafeRunPromise(program, fileName_1 + ":14:25");
//# sourceMappingURL=index.js.map