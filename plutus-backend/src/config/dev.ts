import dotenv from "dotenv";

dotenv.config();

const { DEV_PORT, DEV_DB_NAME, DEV_DB_HOST, DEV_DB_USERNAME, DEV_DB_PASSWORD } =
  process.env;

export default {
  PORT: DEV_PORT,
  DB_NAME: DEV_DB_NAME,
  DB_HOST: DEV_DB_HOST,
  DB_USERNAME: DEV_DB_USERNAME,
  DB_PASSWORD: DEV_DB_PASSWORD,
};

console.log("running in dev mode");
