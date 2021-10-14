import { DataTypes, Model, Sequelize } from "sequelize";

export enum EmailHistoryStatus {
  PROCESSING = "PROCESSING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export default class EmailHistory extends Model {
  public emailId: string;
  public provider: "SENDGRID" | "AWS_SES";
  public status: EmailHistoryStatus;

  // Auto-generated
  public id: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        emailId: DataTypes.STRING,
        provider: DataTypes.ENUM("SENDGRID", "AWS_SES"),
        status: DataTypes.ENUM("PROCESSING", "SUCCESS", "ERROR"),
      },
      {
        sequelize: sequelize,
        // timestamps: false,
        name: {
          singular: "EmailHistory",
          plural: "EmailsHistory",
        },
      }
    );
  }
}
