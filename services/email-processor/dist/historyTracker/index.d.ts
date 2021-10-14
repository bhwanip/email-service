/// <reference types="node" />
import { DAO } from "@email-service/commons";
import events from "events";
import { EmailProvider } from "../emailService/IEmailService";
export interface IHistoryEvent {
    emailId: string;
    status: DAO.EmailHistoryStatus;
    provider: EmailProvider;
}
export declare const historyTracker: events;
//# sourceMappingURL=index.d.ts.map