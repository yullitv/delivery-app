import { Request, Response } from 'express';
import * as productService from '../services/productService.js';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const shopId = parseInt(req.query.shop_id as string);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9;
    const category = req.query.category as string;
    const sortBy = req.query.sortBy as string;

    if (isNaN(shopId)) {
      res.status(400).json({ error: 'Valid shop_id is required' });
      return;
    }

    const products = await productService.getProductsByShop(
      shopId, 
      page, 
      limit, 
      category, 
      sortBy
    );
    res.json(products);
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};