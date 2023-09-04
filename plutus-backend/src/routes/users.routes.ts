import { userSignup, loginUser, verifyChangePasswordEmail, verifyChangePasswordOTP, verifyChangePassword, resendOTP, updateUserProfile, createUserImage } from '../controllers/client/clientMutationController';
import { createAdmin } from '../controllers/admin/adminMutationController';

import { Router } from 'express';

import { auth } from '../middleware/auth';
import { createCompany } from '../controllers/company/companyMutationController';

import { isAdmin } from '../utils/auth';
import { getUsersByAdmin } from "../controllers/admin/adminQueryController";

import { getAllUsersByAdmin } from '../controllers/admin/adminQueryController';
import { deleteUserByAdmin } from '../controllers/admin/adminMutationController';

import { getUsersBalance, getUsersInfo } from "../controllers/client/clientQueryController";
import { upload } from '../middleware/uploadImage';
import { forgotPassword, verifyUser } from '../controllers/client/clientMutationController';

import { getUserNotifications } from "../controllers/client/clientQueryController"

const router = Router();

router.post('/signup', userSignup);
// router.put('/update', forgotPassword);
router.put('/resendotp/:token', resendOTP);
router.post('/login', loginUser);

router.post('/adminSignup', createAdmin);
router.put('/forgot-password', forgotPassword);
router.patch('/verify-user', auth, verifyUser);
router.put('/change-password-email', verifyChangePasswordEmail);
router.put('/change-password-otp/:id', verifyChangePasswordOTP);

router.put('/change-password/:id', verifyChangePassword);
router.patch('/updateaccount', updateUserProfile);

router.put('/profileimage', auth, upload.single('image'), createUserImage);
router.post("/company", isAdmin, createCompany);

router.get("/get", getUsersByAdmin);
router.get("/getAllUsersByAdmin", isAdmin, getAllUsersByAdmin);

router.delete("/deleteUser/:id", isAdmin, deleteUserByAdmin);

router.get("/balance", auth, getUsersBalance);

router.get("/info", auth, getUsersInfo);
router.get("/notifications", auth, getUserNotifications)

export default router;




























