import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import config from "./dbConfig";
dotenv.config();

const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = config;

export const db = new Sequelize(
    DB_NAME!, //name of database
    DB_USERNAME!, //name of username
   DB_PASSWORD!, //db password
  
    {
      host: DB_HOST,
      port: 5432,
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        encrypt: true,
        ssl: {
          rejectUnauthorized: true,
        },
      },
    },
);


