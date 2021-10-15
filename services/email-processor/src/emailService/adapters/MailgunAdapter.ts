
import FormData from "form-data";
import { IEmailInput } from "../IEmailService";

export class MailgunAdapter {
  static toMailgunRequest(input: IEmailInput): FormData {
    const { to, from, body } = input;

    // const form = new URLSearchParams()

    const form = new FormData();

    form.append("from", from);
    form.append("to", to);
    form.append("text", body);

    return form;
  }
}
