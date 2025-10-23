// server/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./src/config/db.config.js";
import cookieParser from "cookie-parser";

// (Penting) Impor model agar bisa di-sync
import User from "./src/models/user.model.js";
import Pelanggan from "./src/models/pelanggan.model.js"; 
import Kemasan from "./src/models/kemasan.model.js";
import Pesanan from "./src/models/pesanan.model.js";
import PesananItem from "./src/models/pesananItem.model.js";

import mainApiRouter from "./src/api/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Hanya izinkan frontend Anda
  credentials: true                 // Izinkan pengiriman cookie
}));
app.use(express.json()); // Membaca body request sebagai JSON
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Untuk membaca cookie

// Rute Sederhana untuk Tes
app.get("/", (req, res) => {
  res.json({ message: "Selamat datang di API Sistem Manajemen Kemasan." });
});

// (Kita akan menambahkan Rute API kita di sini nanti)
app.use("/api", mainApiRouter);

// Sinkronisasi Database dan Jalankan Server
const startServer = async () => {
  try {
    // Menyinkronkan semua model dengan database
    // { force: true } akan drop tabel jika sudah ada (HATI-HATI di produksi)
    // { alter: true } akan mencoba mencocokkan tabel (lebih aman)
    await sequelize.sync({ alter: true });
    console.log("Database berhasil tersinkronisasi.");

    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Tidak dapat terhubung ke database:", error);
  }
};

startServer();