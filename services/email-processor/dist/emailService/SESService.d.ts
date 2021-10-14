import { EmailProvider, IEmailInput, IEmailService } from "./IEmailService";
export declare class SESService implements IEmailService {
    private sesClient;
    constructor();
    getProvider(): EmailProvider;
    sendEmail(input: IEmailInput): Promise<boolean>;
}
//# sourceMappingURL=SESService.d.ts.map