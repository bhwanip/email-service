"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmailTask = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const uuid_1 = require("uuid");
const validator_1 = __importDefault(require("validator"));
const aws_1 = require("../aws");
const commons_1 = require("@email-service/commons");
const emailsListValidator = (value, { req }) => {
    const trimedValue = value === null || value === void 0 ? void 0 : value.trim();
    //ignore empty input
    if (!(trimedValue === null || trimedValue === void 0 ? void 0 : trimedValue.length))
        return true;
    console.log(trimedValue, new RegExp(/^\s+$/).test(value));
    if (/\s/.test(trimedValue)) {
        throw new Error(`White space not allowed in emails list.`);
    }
    const invalidEmails = new Array();
    trimedValue.split(req.body.delimiter).forEach((val) => {
        if (!validator_1.default.isEmail(val.trim())) {
            invalidEmails.push(`'${val}'`);
        }
    });
    if (invalidEmails.length) {
        throw new Error(`Invalid emails in the list: ${invalidEmails.join(",")}.`);
    }
    return true;
};
function validate(action) {
    console.log("validate");
    switch (action) {
        case "submitEmail": {
            return [
                (0, express_validator_1.body)("delimiter")
                    .notEmpty()
                    .withMessage("Email delimiter is required.")
                    .isIn([",", ";"])
                    .withMessage("Valid value for email delimiter are ',' and ';'"),
                (0, express_validator_1.body)("to")
                    .notEmpty()
                    .withMessage("To email is required.")
                    .custom(emailsListValidator),
                (0, express_validator_1.body)("cc").custom(emailsListValidator),
                (0, express_validator_1.body)("bcc").custom(emailsListValidator),
                (0, express_validator_1.body)("body").notEmpty().withMessage("Email body is required."),
            ];
        }
    }
}
exports.validate = validate;
function createEmailTask(req, res) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array({ onlyFirstError: true }) });
            return;
        }
        const { id } = yield commons_1.DAO.Email.create({
            id: (0, uuid_1.v4)(),
            from: "puneet11.dce@gmail.com",
            to: req.body.to.trim(),
            cc: (_a = req.body.cc) === null || _a === void 0 ? void 0 : _a.trim(),
            bcc: (_b = req.body.bcc) === null || _b === void 0 ? void 0 : _b.trim(),
            subject: (_c = req.body.subject) === null || _c === void 0 ? void 0 : _c.trim(),
            body: (_d = req.body.body) === null || _d === void 0 ? void 0 : _d.trim(),
            status: commons_1.DAO.EmailStatus.ACCEPTED,
            payload: req.body,
        });
        (0, aws_1.sendMessage)(Object.assign({ id }, req.body));
        res.status(202).json({ id });
    });
}
exports.createEmailTask = createEmailTask;
//# sourceMappingURL=createEmailTask.js.map