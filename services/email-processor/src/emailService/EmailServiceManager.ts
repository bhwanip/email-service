import { ElasticEmailService } from "./ElasticEmailService";
import { EmailProvider, IEmailInput, IEmailService } from "./IEmailService";
import { SendGridService } from "./SendGridService";

export class EmailServiceManager implements IEmailService {
  private primaryService: IEmailService;
  private secondaryService: IEmailService;

  constructor() {
    this.primaryService = new ElasticEmailService();
    this.secondaryService = new SendGridService();
  }
  getProvider(): EmailProvider {
    return this.primaryService.getProvider();
  }

  private switchPriority() {
    [this.primaryService, this.secondaryService] = [
      this.secondaryService,
      this.primaryService,
    ];
  }

  async sendEmail(input: IEmailInput): Promise<boolean> {
    let isSuccess = await this.primaryService.sendEmail(input);
    if (!isSuccess) {
      isSuccess = await this.secondaryService.sendEmail(input);
      this.switchPriority();
    }
    return isSuccess;
  }
}
