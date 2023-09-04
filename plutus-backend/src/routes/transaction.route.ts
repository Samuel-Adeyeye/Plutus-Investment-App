import express from 'express';
import { getUserDetails, getAllExpenses, getAllIncome} from "../controllers/client/clientQueryController";
import { getAllTransactions } from '../controllers/admin/adminQueryController'
import { auth } from '../middleware/auth';
const router = express.Router();

router.get('/getAllTransactions', auth, getAllTransactions);
router.get('/getUserDetails', auth, getUserDetails);
router.get('/getAllExpenses', auth, getAllExpenses);
router.get('/getAllIncome', auth, getAllIncome)




export default router
