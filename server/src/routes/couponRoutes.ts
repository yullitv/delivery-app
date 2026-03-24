import { Router } from "express";
import * as couponController from "../controllers/couponController.js";

const router = Router();

router.get("/", couponController.getCoupons);

export default router;
