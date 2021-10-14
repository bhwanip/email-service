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
const aws_1 = require("./aws");
const EmailServiceManager_1 = require("./emailService/EmailServiceManager");
const historyTracker_1 = require("./historyTracker");
const commons_1 = require("@email-service/commons");
const emailService = new EmailServiceManager_1.EmailServiceManager();
function processor(message) {
    return __awaiter(this, void 0, void 0, function* () {
        historyTracker_1.historyTracker.emit("ReceivedEvent", {
            emailId: message.id,
            status: commons_1.DAO.EmailHistoryStatus.PROCESSING,
        });
        return yield emailService.sendEmail(message);
    });
}
function startProcessingMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            yield (0, aws_1.receiveMessage)(processor);
        }
    });
}
startProcessingMessages();
//# sourceMappingURL=server.js.map