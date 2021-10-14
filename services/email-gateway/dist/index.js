"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, routes_1.initEmailRoutes)(app);
app.get("/health", (_, res) => {
    res.status(200).send('Ok');
});
app.listen(3000);
//# sourceMappingURL=index.js.map