import { SQS } from "aws-sdk";

const queue = new SQS({
  apiVersion: "2012-11-05",
  endpoint: "http://localhost:9324",
  region: "us-east-1",
});

(async () => {
  const queues = await queue.listQueues().promise();
  console.log(queues);
})();

export async function sendMessage(data: Object | string | number) {
  await queue
    .sendMessage({
      QueueUrl: "http://localhost:9324/queue/default",
      MessageBody: JSON.stringify(data),
    })
    .promise();
}
