"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailHistoryStatus = exports.EmailStatus = exports.EmailHistory = exports.Email = exports.Database = void 0;
const db_config_json_1 = __importDefault(require("../config/db.config.json"));
const sequelize_1 = require("sequelize");
const email_js_1 = __importDefault(require("./email.js"));
exports.Email = email_js_1.default;
const emailHistory_1 = __importDefault(require("./emailHistory"));
exports.EmailHistory = emailHistory_1.default;
// Open database connection
const sequelize = new sequelize_1.Sequelize(db_config_json_1.default.database, db_config_json_1.default.username, db_config_json_1.default.password, Object.assign({}, db_config_json_1.default));
exports.Database = sequelize;
let models = [email_js_1.default, emailHistory_1.default];
models.forEach((model) => model.initialize(sequelize));
var email_1 = require("./email");
Object.defineProperty(exports, "EmailStatus", { enumerable: true, get: function () { return email_1.EmailStatus; } });
var emailHistory_2 = require("./emailHistory");
Object.defineProperty(exports, "EmailHistoryStatus", { enumerable: true, get: function () { return emailHistory_2.EmailHistoryStatus; } });
//# sourceMappingURL=index.js.map