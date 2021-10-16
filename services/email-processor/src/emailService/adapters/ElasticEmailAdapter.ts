import { IElasticEmailRequest, IEmailInput } from "../IEmailService";

export class ElasticEmailAdapter {
  static toElasticEmailRequest(input: IEmailInput): IElasticEmailRequest {
    const { to, from, subject, body, cc, bcc } = input;

    return {
      api_key:
        "0E164F82A09EE27C783CA883E06F55D6E7D2F5D6253068254EA3432C5E5C730903C242BF3A3246C6578F913B80EB96B8",
      username: "puneet11.dce@gmail.com",
      from,
      msgTo: to,
      ...(cc ? { msgCC: cc } : {}),
      ...(bcc ? { msgBcc: bcc } : {}),
      ...(subject ? { subject } : {}),
      body_text: body,
    };
  }
}
