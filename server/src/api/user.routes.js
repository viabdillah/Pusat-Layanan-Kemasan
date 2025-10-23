// server/src/api/user.routes.js
import express from "express";
import {
  createUser, // <-- Impor ini
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Terapkan middleware ke SEMUA rute di file ini
router.use(protect);
router.use(authorize("admin"));

// Gabungkan GET (lihat semua) dan POST (buat baru)
router.route("/")
  .get(getAllUsers)
  .post(createUser); // <-- Tambahkan ini

router
  .route("/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

export default router;