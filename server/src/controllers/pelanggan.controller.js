// server/src/controllers/pelanggan.controller.js
import Pelanggan from "../models/pelanggan.model.js";
import Kemasan from "../models/kemasan.model.js";
import Pesanan from "../models/pesanan.model.js";

// @desc    Membuat pelanggan baru
// @route   POST /api/pelanggan
// @access  Admin, Kasir
export const createPelanggan = async (req, res) => {
  try {
    const { nama_pelanggan, kontak_pelanggan, alamat } = req.body;
    if (!nama_pelanggan || !kontak_pelanggan) {
      return res.status(400).json({ message: "Nama dan Kontak wajib diisi" });
    }
    
    // Cek duplikasi kontak
    const existing = await Pelanggan.findOne({ where: { kontak_pelanggan } });
    if (existing) {
      return res.status(400).json({ message: "Kontak pelanggan sudah terdaftar" });
    }

    const pelanggan = await Pelanggan.create({
      nama_pelanggan,
      kontak_pelanggan,
      alamat,
    });
    res.status(201).json(pelanggan);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Mendapatkan semua pelanggan (untuk search/dropdown)
// @route   GET /api/pelanggan
// @access  Admin, Kasir, Manajer
export const getAllPelanggan = async (req, res) => {
  try {
    const pelanggan = await Pelanggan.findAll({
      order: [["nama_pelanggan", "ASC"]],
    });
    res.status(200).json(pelanggan);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Mendapatkan detail pelanggan + riwayat
// @route   GET /api/pelanggan/:id
// @access  Admin, Kasir, Manajer
export const getPelangganById = async (req, res) => {
  try {
    const pelanggan = await Pelanggan.findByPk(req.params.id, {
      include: [
        {
          model: Kemasan, // Mengambil daftar kemasan milik pelanggan
          as: "kemasan",
          order: [["nama_kemasan", "ASC"]],
        },
        {
          model: Pesanan, // Mengambil riwayat pesanan milik pelanggan
          as: "pesanan",
          order: [["createdAt", "DESC"]],
        },
      ],
    });

    if (!pelanggan) {
      return res.status(404).json({ message: "Pelanggan tidak ditemukan" });
    }
    res.status(200).json(pelanggan);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};