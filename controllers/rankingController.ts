import { Request, Response } from 'express';
import { getRankingsService } from '../services/rankingService';

export const getRankings = async (req: Request, res: Response) => {
    try {
        const { filter = 'pvpkills', page = '1', limit = '20', search = '' } = req.query;

        const pageNumber = Math.max(parseInt(page as string, 10), 1);
        const pageSize = Math.min(Math.max(parseInt(limit as string, 10), 1), 100);

        const rankingData = await getRankingsService(filter as string, search as string, pageNumber, pageSize);

        return res.json(rankingData);
    } catch (error) {
        console.error("Error fetching rankings:", error);
        return res.status(400).json({ message: (error as Error).message });
    }
};
