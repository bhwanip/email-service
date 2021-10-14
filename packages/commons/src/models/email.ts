import { DataTypes, Model, Sequelize } from "sequelize";

export enum EmailStatus {
  ACCEPTED = "ACCEPTED",
  SENT = "SENT",
  FAILED = "FAILED",
}

export default class Email extends Model {
  public from: string;
  public to: string;
  public bcc: string;
  public cc: string;
  public subject: string;
  public body: string;
  public status: EmailStatus;
  public payload: string;

  // Auto-generated
  public id: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        from: DataTypes.STRING,
        to: DataTypes.STRING,
        bcc: DataTypes.STRING,
        cc: DataTypes.STRING,
        subject: DataTypes.STRING,
        body: DataTypes.STRING,
        status: DataTypes.ENUM("ACCEPTED", "SENT", "FAILED"),
        payload: {
          type: DataTypes.TEXT,
          set: function (value) {
            this.setDataValue("payload", JSON.stringify(value));
          },
        },
      },
      {
        sequelize: sequelize,
        // timestamps: false,
        name: {
          singular: "Email",
          plural: "Emails",
        },
      }
    );
  }
}
