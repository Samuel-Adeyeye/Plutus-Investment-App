import express from "express";
import dotenv from "dotenv";
import { HttpError } from "http-errors";
import config from "./config/dbConfig";
import userRoute from "./routes/users.routes";
import beneficiaryRoute from "./routes/beneficiary.routes";
import transferRoute from "./routes/transfer.route";
import companyRoute from "./routes/company.route";
import transactionRoute from "./routes/transaction.route";
import investorRoute from "./routes/investor.route";
import cors from "cors";
import logger from "morgan";
import { db } from "./config";

const { PORT } = config;

dotenv.config();

const app = express();
app.use(express.json());
app.use(logger("dev"));
app.use(cors());
app.use("/user", userRoute);
app.use("/investor", investorRoute);
app.use("/beneficiary", beneficiaryRoute);
app.use("/transfer", transferRoute);
app.use("/company", companyRoute);
app.use("/transactions", transactionRoute);

app.get("/", (req, res) => {
  return res.send("Hello World!");
});


db.sync()
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err: HttpError) => {
    console.log(err);
  });

// {force:true}

const port = PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
