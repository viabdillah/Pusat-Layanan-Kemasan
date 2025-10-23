// server/src/controllers/pesanan.controller.js
import Pesanan from "../models/pesanan.model.js";
import PesananItem from "../models/pesananItem.model.js";
import sequelize from "../config/db.config.js";
import User from "../models/user.model.js";
import Pelanggan from "../models/pelanggan.model.js";
import Kemasan from "../models/kemasan.model.js";
import { Op } from "sequelize";

// @desc    Membuat pesanan baru
// @route   POST /api/pesanan
// @access  Admin, Kasir
// @desc    Membuat pesanan baru
// @route   POST /api/pesanan
// @access  Admin, Kasir
export const createPesanan = async (req, res) => {
  // Gunakan transaksi
  const t = await sequelize.transaction();

  try {
    const {
      nama_pesanan,
      pelanggan_id,
      catatan_pesanan,
      items, // items adalah array: [{ kemasan_id, jumlah, harga_satuan }, ...]
    } = req.body;

    const kasirId = req.user.id;

    // 1. Validasi input
    if (!pelanggan_id || !items || items.length === 0) {
      return res.status(400).json({ message: "Pelanggan dan item pesanan wajib diisi" });
    }

    // 2. Hitung Total Harga dari 'items'
    let totalHarga = 0;
    for (const item of items) {
      if (!item.kemasan_id || !item.jumlah || !item.harga_satuan) {
        return res.status(400).json({ message: "Setiap item harus memiliki kemasan, jumlah, dan harga satuan." });
      }
      totalHarga += parseFloat(item.jumlah) * parseFloat(item.harga_satuan);
    }

    // 3. Buat Pesanan utama
    const pesanan = await Pesanan.create(
      {
        nama_pesanan: nama_pesanan || `Pesanan ${new Date().toLocaleDateString()}`,
        pelanggan_id,
        catatan_pesanan,
        user_id_kasir: kasirId,
        total_harga: totalHarga, // Simpan total harga yang sudah dihitung
        status_pesanan: "Antrian",
      },
      { transaction: t } // Masukkan ke transaksi
    );

    // 4. Buat semua PesananItem (item keranjang)
    const itemPromises = items.map((item) => {
      return PesananItem.create(
        {
          pesanan_id: pesanan.id,
          kemasan_id: item.kemasan_id,
          jumlah: item.jumlah,
          harga_satuan: item.harga_satuan,
        },
        { transaction: t } // Masukkan ke transaksi
      );
    });
    
    await Promise.all(itemPromises);

    // 5. Jika semua berhasil, commit transaksi
    await t.commit();
    res.status(201).json(pesanan);

  } catch (error) {
    // 6. Jika ada satu saja yang gagal, rollback semua
    await t.rollback();
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Mendapatkan SEMUA pesanan (untuk Manajer/Kasir)
// @route   GET /api/pesanan
// @access  Admin, Kasir, Manajer
export const getAllPesanan = async (req, res) => {
  try {
    const pesanan = await Pesanan.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        { model: Pelanggan, as: "pelanggan", attributes: ["nama_pelanggan"] },
        { model: Kemasan, as: "kemasan", attributes: ["nama_kemasan"] },
        { model: User, as: "kasir", attributes: ["nama_lengkap"] },
        { model: User, as: "desainer", attributes: ["nama_lengkap"] },
        { model: User, as: "operator", attributes: ["nama_lengkap"] },
      ],
    });
    res.status(200).json(pesanan);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Mendapatkan "Tugas Saya" (yang sedang dikerjakan)
// @route   GET /api/pesanan/my-tasks
// @access  Desainer, Operator
export const getMyTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    
    let whereClause = {};

    if (userRole === 'desainer') {
      whereClause.user_id_desainer = userId;
      whereClause.status_pesanan = { [Op.in]: ["Desain", "Revisi"] };
    } else if (userRole === 'operator') {
      whereClause.user_id_operator = userId;
      whereClause.status_pesanan = "Produksi";
    } else {
      return res.status(200).json([]);
    }

    const pesanan = await Pesanan.findAll({ where: whereClause, order: [["updatedAt", "DESC"]] });
    res.status(200).json(pesanan);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Mendapatkan "Tugas Tersedia" (Pool)
// @route   GET /api/pesanan/available
// @access  Desainer, Operator
export const getAvailableTasks = async (req, res) => {
    try {
        const userRole = req.user.role;
        let whereClause = {};

        if (userRole === 'desainer') {
            whereClause.status_pesanan = "Antrian";
        } else if (userRole === 'operator') {
            whereClause.status_pesanan = "ACC";
        } else {
            return res.status(200).json([]); // Role lain tidak punya tugas pool
        }

        const pesanan = await Pesanan.findAll({ 
            where: whereClause, 
            order: [["createdAt", "ASC"]], // Ambil yang paling lama dulu
            include: [
                { model: Pelanggan, as: "pelanggan", attributes: ["nama_pelanggan"] },
                { model: Kemasan, as: "kemasan", attributes: ["nama_kemasan"] },
            ]
        });
        res.status(200).json(pesanan);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Mendapatkan detail satu pesanan
// @route   GET /api/pesanan/:id
// @access  Protected
export const getPesananById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        { model: User, as: "kasir", attributes: ["nama_lengkap"] },
        { model: User, as: "desainer", attributes: ["nama_lengkap"] },
        { model: User, as: "operator", attributes: ["nama_lengkap"] },
      ],
    });

    if (!project) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update pesanan (Klaim, Update Status, Assign)
// @route   PUT /api/pesanan/:id
// @access  Protected
export const updatePesanan = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });
    }

    const user = req.user; // User yang sedang login
    const dataToUpdate = req.body;

    // Di sini kita bisa menambahkan logika bisnis yang kompleks
    // Contoh: Hanya Manajer yang bisa menugaskan desainer
    // Contoh: Hanya Desainer yang bisa upload file
    // Untuk saat ini, kita buat update umum:
    
    const updatedProject = await project.update(dataToUpdate);
    res.status(200).json(updatedProject);

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Hapus pesanan
// @route   DELETE /api/pesanan/:id
// @access  Admin, Manajer
export const deletePesanan = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Pesanan tidak ditemukan" });
        }
        
        await project.destroy();
        res.status(200).json({ message: "Pesanan berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};