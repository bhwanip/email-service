import { IEmailInput, ISendGridRequest } from "../IEmailService";

const mapToSendGridList = (
  emailsString: string,
  delimiter: IEmailInput["delimiter"]
) => {
  return emailsString.split(delimiter).map((val) => ({
    email: val,
  }));
};

export class SendGridAdapter {
  static toSendGridRequest(input: IEmailInput): ISendGridRequest {
    const { to, delimiter, from, cc, bcc, subject, body } = input;

    const sendGridTo = mapToSendGridList(to, delimiter);
    const sendGridCC = cc && mapToSendGridList(cc, delimiter);
    const sendGridBCC = bcc && mapToSendGridList(bcc, delimiter);

    const sendGridFrom = { email: from };

    return {
      personalizations: [
        {
          to: sendGridTo,
          cc: sendGridCC,
          bcc: sendGridBCC,
        },
      ],
      from: sendGridFrom,
      subject,
      content: [
        {
          type: "text/plain",
          value: body,
        },
      ],
    };
  }
}
