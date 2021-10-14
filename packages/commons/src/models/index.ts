import dbConfig from "../config/db.config.json";
import { Sequelize, Options } from "sequelize";
import Email from "./email.js";
import EmailHistory from "./emailHistory";

// Open database connection
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  <Options>{ ...dbConfig }
);

let models = [Email, EmailHistory];
models.forEach((model) => model.initialize(sequelize));

export { sequelize as Database, Email, EmailHistory };
export { EmailStatus } from "./email";
export { EmailHistoryStatus } from "./emailHistory";
