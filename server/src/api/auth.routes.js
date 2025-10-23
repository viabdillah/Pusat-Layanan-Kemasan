// server/src/api/auth.routes.js
import express from "express";
import { 
  loginUser, 
  getMe,        // <-- Impor
  logoutUser    // <-- Impor
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js"; // <-- Impor

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser); // <-- Tambahkan rute logout
router.get("/me", protect, getMe);  // <-- Tambahkan rute 'get me'

export default router;