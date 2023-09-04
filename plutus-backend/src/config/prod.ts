import dotenv from 'dotenv'

dotenv.config()

const {PROD_PORT, PROD_DB_NAME, PROD_DB_HOST, PROD_DB_USERNAME, PROD_DB_PASSWORD} = process.env

export default {
    PORT:PROD_PORT, // {PORT : 6000}
    DB_NAME:PROD_DB_NAME,
    DB_HOST: PROD_DB_HOST,
    DB_USERNAME: PROD_DB_USERNAME,
    DB_PASSWORD: PROD_DB_PASSWORD,
}


console.log("running in production mode")
