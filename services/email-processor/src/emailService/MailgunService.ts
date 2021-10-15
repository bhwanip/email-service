import { EmailProvider, IEmailInput, IEmailService } from "./IEmailService";
import axios from "axios";
import type { AxiosInstance } from "axios";
import { historyTracker } from "../historyTracker";
import { DAO } from "@email-service/commons";
import { MailgunAdapter } from "./adapters/MailgunAdapter";

export class MailgunService implements IEmailService {
  private mailgunClient: AxiosInstance;

  constructor() {
    this.mailgunClient = axios.create({
      baseURL: "https://api.mailgun.net",
      headers: {
        "Content-Type": null,
        Authorization:
          "Bearer YXBpOjU2MzZiYmNkZmQ0ZTE2Y2Y5OGU2ODgyNDYxZWRmMGVlLTJhYzgyNWExLTYxNGM0OTcx",
      },
    });
  }

  getProvider(): EmailProvider {
    return EmailProvider.SENDGRID;
  }

  async sendEmail(input: IEmailInput): Promise<boolean> {
    console.log("MailgunService: Start send email.");
    try {
      const request = MailgunAdapter.toMailgunRequest(input);
      await this.mailgunClient.post("/v3/sandbox9381daca36d742e4a2f5b8eca8bfde5c.mailgun.org/messages", request, {
        timeout: 3000,
      });
      console.log("MailgunService: Send email done.");
      historyTracker.emit('SuccessEvent', {
        emailId: input.id,
        status: DAO.EmailHistoryStatus.SUCCESS,
        provider: this.getProvider(),
      });
      return true;
    } catch (err) {
      console.log("MailgunService: Send email failed.");
      historyTracker.emit('ErrorEvent', {
        emailId: input.id,
        status: DAO.EmailHistoryStatus.ERROR,
        provider: this.getProvider(),
      });
      return false;
    }
  }
}
