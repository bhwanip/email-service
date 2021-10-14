import { IEmailInput, ISESRequest } from "../IEmailService";


export class SESAdapter {
  static toSESRequest(input: IEmailInput): ISESRequest {
    const { to, from, subject, body } = input;

    return {
      Source: from,
      Destination: { ToAddresses: to.split(",") },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Text: {
            Data: body,
          },
        },
      },
    };
  }
}
