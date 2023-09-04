import express from 'express';
import { getBeneficiaries } from "../controllers/beneficiary/beneficiaryQueryController";
import { createBeneficiaries, deleteBeneficiary  } from "../controllers/beneficiary/beneficiaryMutationController";
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/get', auth, getBeneficiaries);
router.post('/create', auth, createBeneficiaries);
router.delete('/delete', auth, deleteBeneficiary);



export default router;
