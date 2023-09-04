import merge from "lodash.merge";
import dotenv from "dotenv";
dotenv.config();

const stage: string = process.env.NODE_ENV!;

console.log(stage);
let config;

if (stage === "production") {
  config = require("./prod").default;
  console.log(config);
} else if (stage === "development") {
  config = require("./dev").default;
  console.log(config);
} else {
  config = null;
}

const mergge = merge(
  {
    stage,
  },
  config
);

console.log("merge", mergge);

export default merge(
  {
    stage,
  },
  config
);
