"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailStatus = void 0;
const sequelize_1 = require("sequelize");
var EmailStatus;
(function (EmailStatus) {
    EmailStatus["ACCEPTED"] = "ACCEPTED";
    EmailStatus["SENT"] = "SENT";
    EmailStatus["FAILED"] = "FAILED";
})(EmailStatus = exports.EmailStatus || (exports.EmailStatus = {}));
class Email extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            from: sequelize_1.DataTypes.STRING,
            to: sequelize_1.DataTypes.STRING,
            bcc: sequelize_1.DataTypes.STRING,
            cc: sequelize_1.DataTypes.STRING,
            subject: sequelize_1.DataTypes.STRING,
            body: sequelize_1.DataTypes.STRING,
            status: sequelize_1.DataTypes.ENUM("ACCEPTED", "SENT", "FAILED"),
            payload: {
                type: sequelize_1.DataTypes.TEXT,
                set: function (value) {
                    this.setDataValue("payload", JSON.stringify(value));
                },
            },
        }, {
            sequelize: sequelize,
            // timestamps: false,
            name: {
                singular: "Email",
                plural: "Emails",
            },
        });
    }
}
exports.default = Email;
//# sourceMappingURL=email.js.map