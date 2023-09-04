// import {createInvestor} from '../controllers/investorController'
import { Router } from "express";
import { auth, companyAuth } from "../middleware/auth";
// import {
//   getInvestment,
//   //   getTotalInvestment,
// } from "../controllers/investorController";
import {
  getInvestment,
  getInvestmentsByUser,
  //   getTotalInvestment,
} from "../controllers/client/clientQueryController";
import { getInvestor } from "../controllers/company/companyQueryController";

const router = Router();

router.get("/get", companyAuth, getInvestor);
router.get("/getinvestment/", auth, getInvestment);
router.get("/getInvestmentsByUser", auth, getInvestmentsByUser);

// router.get("/getinvestment/", auth, getInvestment);
// router.get("/gettotalinvestment", auth, getTotalInvestment);

// router.post('/register/:id', createInvestor);

export default router;
