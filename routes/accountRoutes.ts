import express from 'express';
import { createAccount } from '../controllers/accountController';

const router = express.Router();

router.post('/create-account', createAccount);

export default router;
