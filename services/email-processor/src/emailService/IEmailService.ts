export interface ISendGridRequest {
  personalizations: Array<{
    to: Array<{ email: string }>;
    cc?: Array<{ email: string }>;
    bcc?: Array<{ email: string }>;
  }>;
  from: { email: string };
  subject?: string;
  content: Array<{
    type: "text/plain";
    value: string;
  }>;
}

export interface IElasticEmailRequest {
  api_key: string;
  username: string;
  from: string;
  msgTo: string;
  msgCC?: string;
  msgBcc?: string;
  subject?: string;
  body_text: string;
}

export interface IEmailInput {
  id: string;
  to: string;
  from: string;
  subject?: string;
  body: string;
  cc?: string;
  bcc?: string;
}

export interface IEmailService {
  sendEmail(input: IEmailInput): Promise<boolean>;
  getProvider(): EmailProvider;
}

export enum EmailProvider {
  ELASTIC_EMAIL = "ELASTIC_EMAIL",
  SENDGRID = "SENDGRID",
}
