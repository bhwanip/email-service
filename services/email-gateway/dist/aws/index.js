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
exports.sendMessage = void 0;
const aws_sdk_1 = require("aws-sdk");
const queue = new aws_sdk_1.SQS({
    apiVersion: "2012-11-05",
    endpoint: "http://localhost:9324",
    region: "us-east-1",
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const queues = yield queue.listQueues().promise();
    console.log(queues);
}))();
function sendMessage(data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queue
            .sendMessage({
            QueueUrl: "http://localhost:9324/queue/default",
            MessageBody: JSON.stringify(data),
        })
            .promise();
    });
}
exports.sendMessage = sendMessage;
//# sourceMappingURL=index.js.map