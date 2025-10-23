// server/src/utils/jwt.helper.js
import jwt from "jsonwebtoken";

// Fungsi ini akan kita panggil setelah user berhasil login
export const generateToken = (res, userId, userRole) => {
  const token = jwt.sign(
    { 
      id: userId, 
      role: userRole 
    },
    process.env.JWT_SECRET, // Mengambil 'rahasia' dari file .env
    {
      expiresIn: "1d", // Token akan kadaluarsa dalam 1 hari
    }
  );

  // (Opsional tapi direkomendasikan) Simpan token di httpOnly cookie
  // Ini lebih aman daripada menyimpannya di localStorage frontend
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // 'true' di produksi (HTTPS)
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 hari
  });

  return token; // Kita juga kembalikan token untuk fleksibilitas
};