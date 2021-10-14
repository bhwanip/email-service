"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = exports.Database = void 0;
const db_config_js_1 = __importDefault(require("../config/db.config.js"));
const sequelize_1 = require("sequelize");
const email_js_1 = __importDefault(require("./email.js"));
exports.Email = email_js_1.default;
// Open database connection
const sequelize = new sequelize_1.Sequelize(db_config_js_1.default.database, db_config_js_1.default.username, db_config_js_1.default.password, Object.assign({}, db_config_js_1.default));
exports.Database = sequelize;
let models = [email_js_1.default];
models.forEach((model) => model.initialize(sequelize));
//# sourceMappingURL=index.js.map