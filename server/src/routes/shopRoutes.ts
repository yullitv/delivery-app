import { Router } from "express";
import * as shopController from "../controllers/shopController.js";

const router = Router();

router.get("/", shopController.getShops);

export default router;
