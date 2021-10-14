import { IEmailInput } from "../emailService/IEmailService";
declare type ProcessorFn = (input: IEmailInput) => Promise<boolean>;
export declare function receiveMessage(processorFn: ProcessorFn): Promise<void>;
export {};
//# sourceMappingURL=index.d.ts.map