import { IEmailInput, ISendGridRequest } from "../IEmailService";

const mapToSendGridList = (emailsString: string) => {
  return emailsString.split(";").map((val) => ({
    email: val,
  }));
};

export class SendGridAdapter {
  static toSendGridRequest(input: IEmailInput): ISendGridRequest {
    const { to, from, cc, bcc, subject, body } = input;

    const sendGridTo = mapToSendGridList(to);
    const sendGridCC = cc && mapToSendGridList(cc);
    const sendGridBCC = bcc && mapToSendGridList(bcc);

    const sendGridFrom = { email: from };

    return {
      personalizations: [
        {
          to: sendGridTo,
          ...(sendGridCC?.length ? { cc: sendGridCC } : {}),
          ...(sendGridBCC?.length ? { cc: sendGridBCC } : {}),
        },
      ],
      from: sendGridFrom,
      ...(subject ? { subject } : {}),
      content: [
        {
          type: "text/plain",
          value: body,
        },
      ],
    };
  }
}
