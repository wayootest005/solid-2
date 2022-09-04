const fileName_1 = "C:/Users/To/Desktop/Programme/Javascript/Effect-lit/apps/html-4/apps/src/index.ts";
import * as tsplus_module_1 from "@effect/html/io/Render";
import * as tsplus_module_2 from "@effect/html/data/Many/operations/from";
import * as tsplus_module_3 from "@effect/core/io/Effect/operations/map";
import * as tsplus_module_4 from "@effect/core/io/Effect/operations/runtime";
import './globals';
const program = tsplus_module_3.map_(tsplus_module_1.render(document.body, tsplus_module_1.html `this is a ${tsplus_module_2.from([1, 2].map((n) => tsplus_module_1.svg `${n}`))} test`), () => void 0, fileName_1 + ":4:4");
tsplus_module_4.unsafeRunPromise(program, fileName_1 + ":12:25");
//# sourceMappingURL=index.js.map