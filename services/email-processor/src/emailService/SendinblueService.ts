
import { EmailProvider, IEmailInput, IEmailService } from "./IEmailService";
import axios from "axios";
import type { AxiosInstance } from "axios";
import { historyTracker } from "../historyTracker";
import { DAO } from "@email-service/commons";
import { SendinblueAdapter } from "./adapters/SendinblueAdapter";

export class SendinblueService implements IEmailService {
  private mailgunClient: AxiosInstance;

  constructor() {
    this.mailgunClient = axios.create({
      baseURL: "https://api.sendinblue.com",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "api-key":
          "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",
      },
    });
  }

  getProvider(): EmailProvider {
    return EmailProvider.SENDGRID;
  }

  async sendEmail(input: IEmailInput): Promise<boolean> {
    console.log("SendinblueService: Start send email.");
    try {
      const request = SendinblueAdapter.toSendinblueRequest(input);
      await this.mailgunClient.post("/v3/smtp/email", request, {
        timeout: 3000,
      });
      console.log("SendinblueService: Send email done.");
      historyTracker.emit('SuccessEvent', {
        emailId: input.id,
        status: DAO.EmailHistoryStatus.SUCCESS,
        provider: this.getProvider(),
      });
      return true;
    } catch (err) {
      console.log(err);
      console.log("SendinblueService: Send email failed.");
      historyTracker.emit('ErrorEvent', {
        emailId: input.id,
        status: DAO.EmailHistoryStatus.ERROR,
        provider: this.getProvider(),
      });
      return false;
    }
  }
}
