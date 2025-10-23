// server/src/controllers/user.controller.js
import User from "../models/user.model.js";

// @desc    Mendaftarkan user baru
// @route   POST /api/auth/register
// @access  Public (Nantinya kita ubah ke 'Admin')
// @desc    Membuat user baru
// @route   POST /api/users
// @access  Admin
export const createUser = async (req, res) => {
  try {
    const { nama_lengkap, username, password, role } = req.body;

    // 1. Cek apakah input ada
    if (!nama_lengkap || !username || !password || !role) {
      return res.status(400).json({ message: "Harap isi semua field" });
    }

    // 2. Cek apakah username sudah ada
    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    // 3. Buat user baru
    const user = await User.create({
      nama_lengkap,
      username,
      password,
      role,
    });

    if (user) {
      res.status(201).json({
        message: "User berhasil dibuat",
        data: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      });
    } else {
      res.status(400).json({ message: "Data user tidak valid" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Mendapatkan semua user
// @route   GET /api/users
// @access  Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // Jangan kirim password
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Mendapatkan user by ID
// @route   GET /api/users/:id
// @access  Admin
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update data user
// @route   PUT /api/users/:id
// @access  Admin
export const updateUser = async (req, res) => {
  try {
    const { nama_lengkap, username, role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (user) {
      user.nama_lengkap = nama_lengkap || user.nama_lengkap;
      user.username = username || user.username;
      user.role = role || user.role;

      // (Catatan: kita tidak mengizinkan update password di sini
      // agar hook hashing tidak terpicu secara tidak sengaja)
      
      const updatedUser = await user.save();
      res.status(200).json({
        id: updatedUser.id,
        nama_lengkap: updatedUser.nama_lengkap,
        username: updatedUser.username,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: "User tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Hapus user
// @route   DELETE /api/users/:id
// @access  Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user) {
      await user.destroy();
      res.status(200).json({ message: "User berhasil dihapus" });
    } else {
      res.status(404).json({ message: "User tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};