import express from 'express';
import { getRankings } from '../controllers/rankingController';

const router = express.Router();

router.get('/get', getRankings);

export default router;
