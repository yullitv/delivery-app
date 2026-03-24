import { Request, Response } from "express";
import * as couponService from "../services/couponService.js";

export const getCoupons = async (req: Request, res: Response) => {
  try {
    const coupons = await couponService.getAllCoupons();
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
