import express from "express";
import { processPaymentController } from "../controllers/payment.controllers.js";

const router = express.Router();

router.post("/payment", processPaymentController);

export default router;
