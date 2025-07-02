import express from "express";
import {
  placeOrder,
  allOrders,
  updateStatus,
  userOrders,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

// Public routes
orderRouter.post("/place", placeOrder);
orderRouter.post("/userorders", userOrders);

// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/update", adminAuth, updateStatus);

export default orderRouter;
