export interface ISendGridRequest {
  personalizations: Array<{
    to: Array<{ email: string }>;
    cc: Array<{ email: string }>;
    bcc: Array<{ email: string }>;
  }>;
  from: { email: string };
  subject: string;
  content: Array<{
    type: "text/plain";
    value: string;
  }>;
}

export interface ISESRequest {
  Source: string;
  Destination: { ToAddresses: Array<string> };
  Message: {
    Subject: {
      Data: string;
    };
    Body: {
      Text: {
        Data: string;
      };
    };
  };
}

export interface IEmailInput {
  id: string;
  to: string;
  from: string;
  subject?: string;
  body?: string;
  cc?: string;
  bcc?: string;
  delimiter: "," | ";";
}

export interface IEmailService {
  sendEmail(input: IEmailInput): Promise<boolean>;
  getProvider(): EmailProvider;
}

export enum EmailProvider {
  ELASTIC_EMAIL = "ELASTIC_EMAIL",
  SENDGRID = "SENDGRID",
}
