import { EmailProvider, IEmailInput, IEmailService } from "./IEmailService";
export declare class EmailServiceManager implements IEmailService {
    private primaryService;
    private secondaryService;
    constructor();
    getProvider(): EmailProvider;
    private switchPriority;
    sendEmail(input: IEmailInput): Promise<boolean>;
}
//# sourceMappingURL=EmailServiceManager.d.ts.map