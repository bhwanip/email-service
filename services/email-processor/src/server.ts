import { receiveMessage } from "./aws";
import { IEmailInput } from "./emailService/IEmailService";
import { EmailServiceManager } from "./emailService/EmailServiceManager";
import { historyTracker } from "./historyTracker";
import { Models } from "@email-service/commons";

const emailService = new EmailServiceManager();

async function processor(message: IEmailInput) {
  
  historyTracker.emit("ReceivedEvent", {
    emailId: message.id,
    status: Models.EmailHistoryStatus.PROCESSING,
  });
  
  return await emailService.sendEmail(message);
}

async function startProcessingMessages() {
  while (true) {
    await receiveMessage(processor);
  }
}

startProcessingMessages();
