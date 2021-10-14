import { DAO } from "@email-service/commons";
import events from "events";
import { v4 as uuidv4 } from "uuid";
import { EmailProvider } from "../emailService/IEmailService";

export interface IHistoryEvent {
  emailId: string;
  status: DAO.EmailHistoryStatus;
  provider: EmailProvider;
}

export const historyTracker = new events.EventEmitter();

//Subscribe for ErrorEvent
historyTracker.on("ErrorEvent", function (data) {
  DAO.EmailHistory.create({
    id: uuidv4(),
    emailId: data.emailId,
    status: DAO.EmailHistoryStatus.ERROR,
    provider: data.provider,
  });

  DAO.Email.update(
    {
      status: DAO.EmailStatus.FAILED,
    },
    { where: { id: data.emailId } }
  );
});

//Subscribe for SuccessEvent
historyTracker.on("SuccessEvent", function (data) {
  DAO.EmailHistory.create({
    id: uuidv4(),
    emailId: data.emailId,
    status: DAO.EmailHistoryStatus.SUCCESS,
    provider: data.provider,
  });

  DAO.Email.update(
    {
      status: DAO.EmailStatus.SENT,
    },
    { where: { id: data.emailId } }
  );
});

//Subscribe for ReceivedEvent
historyTracker.on("ReceivedEvent", function (data) {
  DAO.EmailHistory.create({
    id: uuidv4(),
    emailId: data.emailId,
    status: DAO.EmailHistoryStatus.PROCESSING,
    provider: data.provider,
  });
});
