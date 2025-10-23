// server/src/middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware 1: Memeriksa apakah user sudah login (validasi token)
export const protect = async (req, res, next) => {
  let token;

  // Kita akan membaca token dari httpOnly cookie yang kita set saat login
  token = req.cookies.jwt;

  if (token) {
    try {
      // 1. Verifikasi token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 2. Dapatkan data user dari ID di token (tanpa password)
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ["password"] },
      });

      if (!req.user) {
         return res.status(401).json({ message: "User tidak ditemukan" });
      }

      // 3. Lanjutkan ke controller
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Token tidak valid, otorisasi gagal" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Tidak ada token, otorisasi gagal" });
  }
};

// Middleware 2: Memeriksa role user
// Ini adalah "function factory" - fungsi yang mengembalikan fungsi middleware
export const authorize = (...roles) => {
  return (req, res, next) => {
    // Cek apakah role user (dari middleware 'protect') ada di
    // dalam array 'roles' yang kita kirimkan
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role '${req.user.role}' tidak diizinkan mengakses sumber daya ini`,
      });
    }
    // Jika diizinkan, lanjutkan
    next();
  };
};