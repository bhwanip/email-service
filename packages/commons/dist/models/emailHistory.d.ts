import { Model, Sequelize } from "sequelize";
export declare enum EmailHistoryStatus {
    PROCESSING = "PROCESSING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR"
}
export default class EmailHistory extends Model {
    emailId: string;
    provider: "SENDGRID" | "AWS_SES";
    status: EmailHistoryStatus;
    id: string;
    static initialize(sequelize: Sequelize): void;
}
//# sourceMappingURL=emailHistory.d.ts.map