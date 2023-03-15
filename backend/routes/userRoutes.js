import express from "express";
const router = express.Router();
import {
  authUser,
  getUsers,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { adminProtect, protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, adminProtect, getUsers);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, adminProtect, getUserById)
  .put(protect, adminProtect, updateUser)
  .delete(protect, adminProtect, deleteUser);

export default router;
