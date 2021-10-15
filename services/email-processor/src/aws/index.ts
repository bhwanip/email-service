import { SQS } from "aws-sdk";
import { Message } from "aws-sdk/clients/sqs";
import uniqBy from "lodash.uniqby";
import { IEmailInput } from "../emailService/IEmailService";

type ProcessorFn = (input: IEmailInput) => Promise<boolean>;

const queue = new SQS({
  apiVersion: "2012-11-05",
  endpoint: "http://email-service_aws_sqs_1:9324",
  region: "ap-southeast-2",
  accessKeyId: "fake",
  secretAccessKey: "fake",
});

(async () => {
  const queues = await queue.listQueues().promise();
  console.log(queues);
})();

export async function receiveMessage(processorFn: ProcessorFn) {
  const params = {
    QueueUrl: "http://email-service_aws_sqs_1:9324/queue/default",
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
