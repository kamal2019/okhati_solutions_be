import express from 'express';

import * as  UserController from '../controller/user.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = express.Router()

router.get('/company', UserController.getAllCompanyList);
router.post("/company", authenticateUser, UserController.createCompany)

export default router;