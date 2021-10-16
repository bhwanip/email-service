import { receiveMessage } from "./aws";
import { IEmailInput } from "./emailService/IEmailService";
import { EmailServiceManager } from "./emailService/EmailServiceManager";
import { historyTracker } from "./historyTracker";
import { Models } from "@email-service/commons";

const emailService = new EmailServiceManager();

async function processor(message: IEmailInput): Promise<boolean> {
  
  Models.Email.update(
    {
      isProcessing: true,
    },
    { where: { id: message.id } }
  );

  historyTracker.emit("ReceivedEvent", {
    emailId: message.id,
    status: Models.EmailHistoryStatus.PROCESSING,
  });
  
  const isSuccess =  await emailService.sendEmail(message);

  Models.Email.update(
    {
      isProcessing: false,
    },
    { where: { id: message.id } }
  );

  return isSuccess;
}

async function startProcessingMessages() {
  while (true) {
    await receiveMessage(processor);
  }
}

startProcessingMessages();
