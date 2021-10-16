import { EmailProvider, IEmailInput, IEmailService } from "./IEmailService";
import axios from "axios";
import querystring from "querystring";
import type { AxiosInstance } from "axios";
import { historyTracker } from "../historyTracker";
import { Models } from "@email-service/commons";
import { ElasticEmailAdapter } from "./adapters/ElasticEmailAdapter";

export class ElasticEmailService implements IEmailService {
  private elasticEmailClient: AxiosInstance;

  constructor() {
    this.elasticEmailClient = axios.create({
      baseURL: "https://api.elasticemail.com",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  getProvider(): EmailProvider {
    return EmailProvider.ELASTIC_EMAIL;
  }

  async sendEmail(input: IEmailInput): Promise<boolean> {
    console.log("ElasticEmailService: Start send email.");
    try {
      const request = ElasticEmailAdapter.toElasticEmailRequest(input);
      const requestStr = querystring.stringify(
        request as unknown as querystring.ParsedUrlQueryInput
      );

      const { data } = (await this.elasticEmailClient.post(
        "/v2/email/send",
        requestStr,
        {
          timeout: 3000,
          headers: {
            "Content-Length": String(requestStr.length),
          },
        }
      )) as {
        data: {
          success: boolean;
          error: string;
          data: any;
        };
      };

      if (!data.success) {
        throw new Error(data.error);
      }

      console.log("ElasticEmailService: Send email done.", data);
      historyTracker.emit("SuccessEvent", {
        emailId: input.id,
        provider: this.getProvider(),
        response: data,
      });
      return true;
    } catch (err) {
      console.log("ElasticEmailService: Send email failed.");
      historyTracker.emit("ErrorEvent", {
        emailId: input.id,
        status: Models.EmailHistoryStatus.ERROR,
        provider: this.getProvider(),
        response: err,
      });
      return false;
    }
  }
}
