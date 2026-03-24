import { Request, Response } from 'express';
import * as shopService from '../services/shopService.js';

export const getShops = async (req: Request, res: Response) => {
  try {
    const ratingMin = req.query.rating_min ? parseFloat(req.query.rating_min as string) : undefined;
    const shops = await shopService.getAllShops(ratingMin);
    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};