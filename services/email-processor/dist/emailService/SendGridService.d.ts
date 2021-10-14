import { EmailProvider, IEmailInput, IEmailService } from "./IEmailService";
export declare class SendGridService implements IEmailService {
    private sendGridClient;
    constructor();
    getProvider(): EmailProvider;
    sendEmail(input: IEmailInput): Promise<boolean>;
}
//# sourceMappingURL=SendGridService.d.ts.map