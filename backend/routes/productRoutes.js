import express from "express";
const router = express.Router();
import { protect, adminProtect } from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";

router.route("/").get(getProducts).post(protect, adminProtect, createProduct);
router.route("/top").get(getTopProducts);
router.route("/:id/reviews").post(protect, createProductReview);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, adminProtect, updateProduct)
  .delete(protect, adminProtect, deleteProduct);

export default router;
