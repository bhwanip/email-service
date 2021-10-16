import { SQS } from "aws-sdk";

const queue = new SQS({
  apiVersion: "2012-11-05",
  endpoint: "http://email-service_aws_sqs_1:9324",
  region: "ap-southeast-2",
  accessKeyId: "fake",
  secretAccessKey: "fake",
});

(async () => {
  await queue.listQueues().promise();
  console.log("🚀  email-gateway server is ready.");
})();

export async function sendMessage(data: Object | string | number) {
  await queue
    .sendMessage({
      QueueUrl: "http://email-service_aws_sqs_1:9324/queue/default",
      MessageBody: JSON.stringify(data),
    })
    .promise();
}
