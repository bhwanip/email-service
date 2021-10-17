import { DataTypes, Model, Sequelize } from "sequelize";

export enum EmailHistoryStatus {
  PROCESSING = "PROCESSING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export default class EmailHistory extends Model {
  public emailId: string;
  public provider: "SENDGRID" | "ELASTIC_EMAIL";
  public status: EmailHistoryStatus;
  public response: string;

  public id: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        emailId: DataTypes.STRING,
        provider: DataTypes.ENUM("SENDGRID", "ELASTIC_EMAIL"),
        status: DataTypes.ENUM("PROCESSING", "SUCCESS", "ERROR"),
        response: {
          type: DataTypes.TEXT,
          set: function (value) {
            this.setDataValue("response", JSON.stringify(value));
          },
        },
      },
      {
        sequelize: sequelize,
        name: {
          singular: "EmailHistory",
          plural: "EmailsHistory",
        },
      }
    );
  }
}
