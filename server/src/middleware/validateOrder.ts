import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const orderSchema = z.object({
  userName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  totalPrice: z.number().positive(),
  items: z.array(z.object({
    productId: z.number(),
    quantity: z.number().int().positive(),
  })).min(1),
});

export const validateOrder = (req: Request, res: Response, next: NextFunction) => {
  try {
    orderSchema.parse(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({ error: error.errors });
  }
};