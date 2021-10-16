import { SendGridAdapter } from "./adapters/SendGridAdapter";
import { EmailProvider, IEmailInput, IEmailService } from "./IEmailService";
import axios from "axios";
import type { AxiosInstance } from "axios";
import { historyTracker } from "../historyTracker";
import { Models } from "@email-service/commons";

export class SendGridService implements IEmailService {
  private sendGridClient: AxiosInstance;

  constructor() {
    this.sendGridClient = axios.create({
      baseURL: "https://api.sendgrid.com",
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
    });
  }

  getProvider(): EmailProvider {
    return EmailProvider.SENDGRID;
  }

  async sendEmail(input: IEmailInput): Promise<boolean> {
    console.log("SendGridService: Start send email.");
    try {
      const request = SendGridAdapter.toSendGridRequest(input);
      await this.sendGridClient.post("/v3/mail/send", request, {
        timeout: 3000,
      });
      console.log("SendGridService: Send email done.");
      historyTracker.emit('SuccessEvent', {
        emailId: input.id,
        status: Models.EmailHistoryStatus.SUCCESS,
        provider: this.getProvider(),
      });
      return true;
    } catch (err) {
      console.log("SendGridService: Send email failed.");
      historyTracker.emit('ErrorEvent', {
        emailId: input.id,
        status: Models.EmailHistoryStatus.ERROR,
        provider: this.getProvider(),
      });
      return false;
    }
  }
}
