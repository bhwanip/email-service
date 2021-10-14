// import { IEmailInput, IEmailService } from "./IEmailService";
// import axios from "axios";
// import type { AxiosInstance } from "axios";
// import * as AxiosLogger from "axios-logger";
// import { MailgunAdapter } from "./adapters/MailgunAdapter";
// export class MailgunService implements IEmailService {
//   private mailgunClient: AxiosInstance;
//   constructor() {
//     this.mailgunClient = axios.create({
//       baseURL: "https://api.mailgun.net",
//       responseType: "json",
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization:
//           "Bearer YXBpOjU2MzZiYmNkZmQ0ZTE2Y2Y5OGU2ODgyNDYxZWRmMGVlLTJhYzgyNWExLTYxNGM0OTcx",
//       },
//     });
//     this.mailgunClient.interceptors.request.use(AxiosLogger.requestLogger);
//   }
//   async sendEmail(input: IEmailInput): Promise<boolean> {
//     try {
//       const request = MailgunAdapter.toMailgunRequest(input);
//       await this.mailgunClient.post(
//         "/v3/sandbox9381daca36d742e4a2f5b8eca8bfde5c.mailgun.org/messages",
//         request,
//         { timeout: 3000 }
//       );
//       return true;
//     } catch (err) {
//       console.error("FAILED");
//       console.error(err.response); 
//       return false;
//     }
//   }
// }
//# sourceMappingURL=MailgunService.js.map