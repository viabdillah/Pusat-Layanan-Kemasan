// server/src/api/pesanan.routes.js
import express from "express";
import {
  createPesanan,
  getAllPesanan,
  getMyTasks,
  getAvailableTasks,
  getPesananById,
  updatePesanan,
  deletePesanan,
} from "../controllers/pesanan.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

// Rute Spesifik
router.get("/my-tasks", authorize("desainer", "operator"), getMyTasks);
router.get("/available", authorize("desainer", "operator"), getAvailableTasks);

// Rute Umum
router
  .route("/")
  .post(authorize("admin", "kasir"), createPesanan)
  .get(authorize("admin", "kasir", "manajer"), getAllPesanan);

router
  .route("/:id")
  .get(getPesananById)
  .put(updatePesanan)
  .delete(authorize("admin", "manajer"), deletePesanan);

export default router;