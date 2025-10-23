// server/src/controllers/auth.controller.js
import User from "../models/user.model.js";
import { generateToken } from "../utils/jwt.helper.js";

// @desc    Login user & mendapatkan token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Cek apakah input ada
    if (!username || !password) {
      return res.status(400).json({ message: "Harap isi username dan password" });
    }

    // 2. Cari user berdasarkan username
    const user = await User.findOne({ where: { username } });

    // 3. Jika user ada DAN password cocok
    // Kita panggil method 'validatePassword' yang kita buat di model
    if (user && (await user.validatePassword(password))) {
      // 4. Buat token dan kirim sebagai response
      generateToken(res, user.id, user.role);

      res.status(200).json({
        message: "Login berhasil",
        data: {
          id: user.id,
          username: user.username,
          nama_lengkap: user.nama_lengkap,
          role: user.role,
        },
      });
    } else {
      res.status(401).json({ message: "Username atau password salah" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Mendapatkan data user yang sedang login
// @route   GET /api/auth/me
// @access  Protected
export const getMe = async (req, res) => {
  // Middleware 'protect' sudah bekerja dan menaruh data user di req.user
  // Kita hanya perlu mengirimkannya kembali
  res.status(200).json(req.user);
};

// @desc    Logout user (menghapus cookie)
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = (req, res) => {
  // Hapus cookie dengan cara meng-set-nya dengan masa lalu/kadaluarsa
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout berhasil" });
};