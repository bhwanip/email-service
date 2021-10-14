import { SQS } from "aws-sdk";
import { Message } from "aws-sdk/clients/sqs";
import uniqBy from "lodash.uniqby";
import { IEmailInput } from "../emailService/IEmailService";

type ProcessorFn = (input: IEmailInput) => Promise<boolean>;

const queue = new SQS({
  apiVersion: "2012-11-05",
  endpoint: "http://localhost:9324",
  region: "us-east-1",
});

(async () => {
  const queues = await queue.listQueues().promise();
  console.log(queues);
})();

export async function receiveMessage(processorFn: ProcessorFn) {
  const params = {
    QueueUrl: "http://localhost:9324/queue/default",
  };

  const { Messages: messages } = await queue
    .receiveMessage({
      ...params,
      WaitTimeSeconds: 8,
    })
    .promise();

  if (messages) {
    uniqBy(messages, "MessageId").forEach(async (msg: Message) => {
      console.log("PROCESSOR===>", msg);

      await queue
        .changeMessageVisibility({
          ...params,
          ReceiptHandle: msg.ReceiptHandle,
          VisibilityTimeout: 20,
        })
        .promise();

      const messageObj = JSON.parse(msg.Body);

      const isSuccess = await processorFn(messageObj);

      if (isSuccess) {
        console.log("PROCESSOR DONE");

        await queue
          .deleteMessage({
            ...params,
            ReceiptHandle: msg.ReceiptHandle,
          })
          .promise();
      }
    });
  }
}
