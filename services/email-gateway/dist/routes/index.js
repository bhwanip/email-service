"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initEmailRoutes = void 0;
const submitEmail_1 = require("./submitEmail");
function initEmailRoutes(app) {
    app.use("/api", submitEmail_1.router);
}
exports.initEmailRoutes = initEmailRoutes;
//# sourceMappingURL=index.js.map