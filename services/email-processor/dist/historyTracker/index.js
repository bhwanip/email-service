"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyTracker = void 0;
const commons_1 = require("@email-service/commons");
const events_1 = __importDefault(require("events"));
const uuid_1 = require("uuid");
exports.historyTracker = new events_1.default.EventEmitter();
//Subscribe for ErrorEvent
exports.historyTracker.on("ErrorEvent", function (data) {
    commons_1.DAO.EmailHistory.create({
        id: (0, uuid_1.v4)(),
        emailId: data.emailId,
        status: commons_1.DAO.EmailHistoryStatus.ERROR,
        provider: data.provider,
    });
    commons_1.DAO.Email.update({
        status: commons_1.DAO.EmailStatus.FAILED,
    }, { where: { id: data.emailId } });
});
//Subscribe for SuccessEvent
exports.historyTracker.on("SuccessEvent", function (data) {
    commons_1.DAO.EmailHistory.create({
        id: (0, uuid_1.v4)(),
        emailId: data.emailId,
        status: commons_1.DAO.EmailHistoryStatus.SUCCESS,
        provider: data.provider,
    });
    commons_1.DAO.Email.update({
        status: commons_1.DAO.EmailStatus.SENT,
    }, { where: { id: data.emailId } });
});
//Subscribe for ReceivedEvent
exports.historyTracker.on("ReceivedEvent", function (data) {
    commons_1.DAO.EmailHistory.create({
        id: (0, uuid_1.v4)(),
        emailId: data.emailId,
        status: commons_1.DAO.EmailHistoryStatus.PROCESSING,
        provider: data.provider,
    });
});
//# sourceMappingURL=index.js.map