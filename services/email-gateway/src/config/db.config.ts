export default {
  host: "127.0.0.1",
  port: 13306,
  username: "root",
  password: "Password",
  database: "email_service",
  logging: true,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
