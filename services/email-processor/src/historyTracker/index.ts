import { Models } from "@email-service/commons";
import events from "events";
import { v4 as uuidv4 } from "uuid";
import { EmailProvider } from "../emailService/IEmailService";

export interface IHistoryEvent {
  emailId: string;
  status: Models.EmailHistoryStatus;
  provider: EmailProvider;
}

export const historyTracker = new events.EventEmitter();

//Subscribe for ErrorEvent
historyTracker.on("ErrorEvent", function (data) {
  Models.EmailHistory.create({
    id: uuidv4(),
    emailId: data.emailId,
    status: Models.EmailHistoryStatus.ERROR,
    provider: data.provider,
    response: data.response,
  });

  Models.Email.update(
    {
      status: Models.EmailStatus.FAILED,
      isProcessing: false,
    },
    { where: { id: data.emailId } }
  );
});

//Subscribe for SuccessEvent
historyTracker.on("SuccessEvent", function (data) {
  Models.EmailHistory.create({
    id: uuidv4(),
    emailId: data.emailId,
    status: Models.EmailHistoryStatus.SUCCESS,
    provider: data.provider,
    response: data.response,
  });

  Models.Email.update(
    {
      status: Models.EmailStatus.SENT,
      isProcessing: false,
    },
    { where: { id: data.emailId } }
  );
});

//Subscribe for ReceivedEvent
historyTracker.on("ReceivedEvent", function (data) {
  Models.EmailHistory.create({
    id: uuidv4(),
    emailId: data.emailId,
    status: Models.EmailHistoryStatus.PROCESSING,
    provider: data.provider,
  });
});
