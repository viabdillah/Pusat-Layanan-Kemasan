// server/src/api/kemasan.routes.js
import express from "express";
import {
  createKemasan,
  getKemasanByPelanggan,
  updateKemasan,
  deleteKemasan,
} from "../controllers/kemasan.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(protect);

// ---- TAMBAHKAN BARIS YANG HILANG INI ----
const adminKasir = authorize("admin", "kasir");
// ----------------------------------------

router.route("/").post(adminKasir, createKemasan);

router
  .route("/by-pelanggan/:pelangganId")
  .get(authorize("admin", "kasir", "manajer"), getKemasanByPelanggan);

router
  .route("/:id")
  .put(adminKasir, updateKemasan)   // Sekarang 'adminKasir' sudah terdefinisi
  .delete(adminKasir, deleteKemasan); // Sekarang 'adminKasir' sudah terdefinisi

export default router;