import { Model, Sequelize } from "sequelize";
export declare enum EmailStatus {
    ACCEPTED = "ACCEPTED",
    SENT = "SENT",
    FAILED = "FAILED"
}
export default class Email extends Model {
    from: string;
    to: string;
    bcc: string;
    cc: string;
    subject: string;
    body: string;
    status: EmailStatus;
    payload: string;
    id: string;
    static initialize(sequelize: Sequelize): void;
}
//# sourceMappingURL=email.d.ts.map