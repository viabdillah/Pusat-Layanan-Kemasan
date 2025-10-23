// server/src/api/index.js
import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import pelangganRoutes from "./pelanggan.routes.js"; // <-- BARU
import kemasanRoutes from "./kemasan.routes.js";   // <-- BARU
import pesananRoutes from "./pesanan.routes.js";   // <-- GANTI NAMA

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/pelanggan", pelangganRoutes);
router.use("/kemasan", kemasanRoutes);
router.use("/pesanan", pesananRoutes); // <-- GANTI NAMA

export default router;