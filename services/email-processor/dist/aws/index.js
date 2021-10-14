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
exports.receiveMessage = void 0;
const aws_sdk_1 = require("aws-sdk");
const lodash_uniqby_1 = __importDefault(require("lodash.uniqby"));
const queue = new aws_sdk_1.SQS({
    apiVersion: "2012-11-05",
    endpoint: "http://localhost:9324",
    region: "us-east-1",
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const queues = yield queue.listQueues().promise();
    console.log(queues);
}))();
function receiveMessage(processorFn) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            QueueUrl: "http://localhost:9324/queue/default",
        };
        const { Messages: messages } = yield queue
            .receiveMessage(Object.assign(Object.assign({}, params), { WaitTimeSeconds: 8 }))
            .promise();
        if (messages) {
            (0, lodash_uniqby_1.default)(messages, "MessageId").forEach((msg) => __awaiter(this, void 0, void 0, function* () {
                console.log("PROCESSOR===>", msg);
                yield queue
                    .changeMessageVisibility(Object.assign(Object.assign({}, params), { ReceiptHandle: msg.ReceiptHandle, VisibilityTimeout: 20 }))
                    .promise();
                const messageObj = JSON.parse(msg.Body);
                const isSuccess = yield processorFn(messageObj);
                if (isSuccess) {
                    console.log("PROCESSOR DONE");
                    yield queue
                        .deleteMessage(Object.assign(Object.assign({}, params), { ReceiptHandle: msg.ReceiptHandle }))
                        .promise();
                }
            }));
        }
    });
}
exports.receiveMessage = receiveMessage;
//# sourceMappingURL=index.js.map