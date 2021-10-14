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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESService = void 0;
const IEmailService_1 = require("./IEmailService");
const aws_sdk_1 = require("aws-sdk");
const SESAdapter_1 = require("./adapters/SESAdapter");
const commons_1 = require("@email-service/commons");
const historyTracker_1 = require("../historyTracker");
class SESService {
    constructor() {
        this.sesClient = new aws_sdk_1.SES({
            apiVersion: "2010-12-01",
            region: "ap-southeast-2",
        });
    }
    getProvider() {
        return IEmailService_1.EmailProvider.AWS_SES;
    }
    sendEmail(input) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("SESService: Start send email.");
            try {
                const request = SESAdapter_1.SESAdapter.toSESRequest(input);
                yield this.sesClient.sendEmail(request).promise();
                console.log("SESService: Send email done.");
                historyTracker_1.historyTracker.emit('SuccessEvent', {
                    emailId: input.id,
                    status: commons_1.DAO.EmailHistoryStatus.SUCCESS,
                    provider: this.getProvider(),
                });
                return true;
            }
            catch (err) {
                console.log("SESService: Send email failed.");
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
exports.SESService = SESService;
//# sourceMappingURL=SESService.js.map