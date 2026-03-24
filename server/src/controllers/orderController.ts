import { Request, Response } from 'express';
import * as orderService from '../services/orderService.js';

export const checkout = async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const { email, phone } = req.query;
    if (!email && !phone) {
      res.status(400).json({ error: 'Email or phone is required' });
      return;
    }
    const orders = await orderService.getOrdersByContact(email as string, phone as string);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};