import { IEmailInput } from "../IEmailService";

export class SendinblueAdapter {
  static toSendinblueRequest(input: IEmailInput) {
    const { to, from, body } = input;

    // const form = new URLSearchParams()

    return {
      sender: { email: from },
      to: [{ email: to }],
      textContent: body,
    };
  }
}
