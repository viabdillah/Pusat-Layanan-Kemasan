// server/src/api/pelanggan.routes.js
import express from "express";
import {
  createPelanggan,
  getAllPelanggan,
  getPelangganById,
} from "../controllers/pelanggan.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Terapkan 'protect' ke semua rute
router.use(protect);

// Admin & Kasir bisa membuat, Admin & Kasir & Manajer bisa melihat
router
  .route("/")
  .post(authorize("admin", "kasir"), createPelanggan)
  .get(authorize("admin", "kasir", "manajer"), getAllPelanggan);

router
  .route("/:id")
  .get(authorize("admin", "kasir", "manajer"), getPelangganById);
// (Nanti kita tambahkan PUT dan DELETE di sini)

export default router;