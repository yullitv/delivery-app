import { Request, Response } from 'express';
import * as orderService from '../services/orderService.js';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const getOrdersByContact = async (req: Request, res: Response) => {
  try {
    const { email, phone } = req.query;
    const orders = await orderService.getOrdersByContact(email as string, phone as string);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};