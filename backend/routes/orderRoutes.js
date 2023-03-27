import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  getUserOrders,
  updateOrderToPaid,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { protect, adminProtect } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, adminProtect, getOrders);
router.route("/myorders").get(protect, getUserOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, adminProtect, updateOrderToDelivered);

export default router;
