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
exports.EmailServiceManager = void 0;
const SendGridService_1 = require("./SendGridService");
const SESService_1 = require("./SESService");
class EmailServiceManager {
    constructor() {
        this.primaryService = new SendGridService_1.SendGridService();
        this.secondaryService = new SESService_1.SESService();
    }
    getProvider() {
        return this.primaryService.getProvider();
    }
    switchPriority() {
        [this.primaryService, this.secondaryService] = [
            this.secondaryService,
            this.primaryService,
        ];
    }
    sendEmail(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let isSuccess = yield this.primaryService.sendEmail(input);
            if (!isSuccess) {
                isSuccess = yield this.secondaryService.sendEmail(input);
                this.switchPriority();
            }
            return isSuccess;
        });
    }
}
exports.EmailServiceManager = EmailServiceManager;
//# sourceMappingURL=EmailServiceManager.js.map