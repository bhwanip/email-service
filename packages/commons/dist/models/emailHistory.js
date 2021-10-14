"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailHistoryStatus = void 0;
const sequelize_1 = require("sequelize");
var EmailHistoryStatus;
(function (EmailHistoryStatus) {
    EmailHistoryStatus["PROCESSING"] = "PROCESSING";
    EmailHistoryStatus["SUCCESS"] = "SUCCESS";
    EmailHistoryStatus["ERROR"] = "ERROR";
})(EmailHistoryStatus = exports.EmailHistoryStatus || (exports.EmailHistoryStatus = {}));
class EmailHistory extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            emailId: sequelize_1.DataTypes.STRING,
            provider: sequelize_1.DataTypes.ENUM("SENDGRID", "AWS_SES"),
            status: sequelize_1.DataTypes.ENUM("PROCESSING", "SUCCESS", "ERROR"),
        }, {
            sequelize: sequelize,
            // timestamps: false,
            name: {
                singular: "EmailHistory",
                plural: "EmailsHistory",
            },
        });
    }
}
exports.default = EmailHistory;
//# sourceMappingURL=emailHistory.js.map