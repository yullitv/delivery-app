import { Request, Response } from "express";
import * as orderService from "../services/orderService.js";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userName, email, phone, address, items } = req.body;

    if (!userName || !email || !phone || !address || !items) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Cart cannot be empty" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getOrdersByContact = async (req: Request, res: Response) => {
  try {
    const { email, phone } = req.query;

    if (!email && !phone) {
      return res
        .status(400)
        .json({ error: "Email or phone required for search" });
    }

    const orders = await orderService.getOrdersByContact(
      email as string,
      phone as string,
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
