import { Request, Response } from "express";
import * as orderService from "../services/orderService.js";
import { validateEmail, validatePhone, normalizePhoneNumber } from "../lib/validation.js";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userName, email, phone, address, items, totalPrice } = req.body;

    if (!userName || !email || !phone || !address || !items || !totalPrice) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ error: "Invalid phone format. Expected +380XXXXXXXXX" });
    }

    const order = await orderService.createOrder({
      userName: userName.trim(),
      email: email.toLowerCase().trim(),
      phone: normalizePhoneNumber(phone),
      address: address.trim(),
      items,
      totalPrice: Number(totalPrice)
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getOrdersByContact = async (req: Request, res: Response) => {
  try {
    const { email, phone } = req.query;

    if (!email && !phone) {
      return res.status(400).json({ error: "Email or phone required" });
    }

    const searchEmail = email ? (email as string).toLowerCase().trim() : "";
    const searchPhone = phone ? normalizePhoneNumber(phone as string) : "";

    const orders = await orderService.getOrdersByContact(searchEmail, searchPhone);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};