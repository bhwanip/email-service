import { EmailProvider, IEmailInput, IEmailService } from "./IEmailService";
import { SES } from "aws-sdk";
import { SESAdapter } from "./adapters/SESAdapter";
import { DAO } from "@email-service/commons";
import { historyTracker } from "../historyTracker";

export class SESService implements IEmailService {
  private sesClient;

  constructor() {
    this.sesClient = new SES({
      apiVersion: "2010-12-01",
      region: "ap-southeast-2",
    });
  }
  
  getProvider(): EmailProvider {
    return EmailProvider.AWS_SES;
  }

  async sendEmail(input: IEmailInput): Promise<boolean> {
    console.log("SESService: Start send email.");
    try {
      const request = SESAdapter.toSESRequest(input);
      await this.sesClient.sendEmail(request).promise();
      console.log("SESService: Send email done.");
      historyTracker.emit('SuccessEvent', {
        emailId: input.id,
        status: DAO.EmailHistoryStatus.SUCCESS,
        provider: this.getProvider(),
      });
      return true;
    } catch (err) {
      console.log("SESService: Send email failed.");
      historyTracker.emit('ErrorEvent', {
        emailId: input.id,
        status: DAO.EmailHistoryStatus.ERROR,
        provider: this.getProvider(),
      });
      return false;
    }
  }
}
