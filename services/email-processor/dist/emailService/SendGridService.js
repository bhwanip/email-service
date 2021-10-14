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
exports.SendGridService = void 0;
const SendGridAdapter_1 = require("./adapters/SendGridAdapter");
const IEmailService_1 = require("./IEmailService");
const axios_1 = __importDefault(require("axios"));
const historyTracker_1 = require("../historyTracker");
const commons_1 = require("@email-service/commons");
class SendGridService {
    constructor() {
        this.sendGridClient = axios_1.default.create({
            baseURL: "https://api.sendgrid.com",
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer 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",
            },
        });
    }
    getProvider() {
        return IEmailService_1.EmailProvider.SENDGRID;
    }
    sendEmail(input) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("SendGridService: Start send email.");
            try {
                const request = SendGridAdapter_1.SendGridAdapter.toSendGridRequest(input);
                yield this.sendGridClient.post("/v3/mail/send", request, {
                    timeout: 3000,
                });
                console.log("SendGridService: Send email done.");
                historyTracker_1.historyTracker.emit('SuccessEvent', {
                    emailId: input.id,
                    status: commons_1.DAO.EmailHistoryStatus.SUCCESS,
                    provider: this.getProvider(),
                });
                return true;
            }
            catch (err) {
                console.log("SendGridService: Send email failed.");
                historyTracker_1.historyTracker.emit('ErrorEvent', {
                    emailId: input.id,
                    status: commons_1.DAO.EmailHistoryStatus.ERROR,
                    provider: this.getProvider(),
                });
                return false;
            }
        });
    }
}
exports.SendGridService = SendGridService;
//# sourceMappingURL=SendGridService.js.map