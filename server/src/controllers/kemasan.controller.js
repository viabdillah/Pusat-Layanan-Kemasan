// server/src/controllers/kemasan.controller.js
import Kemasan from "../models/kemasan.model.js";
import Pesanan from "../models/pesanan.model.js";

// @desc    Membuat kemasan baru
// @route   POST /api/kemasan
// @access  Admin, Kasir
export const createKemasan = async (req, res) => {
  try {
    // 1. Ambil field baru dari body
    const {
      nama_kemasan,
      pelanggan_id,
      jenis_kemasan,
      ukuran_kemasan,
      no_pirt,
      no_halal,
      deskripsi,
    } = req.body;

    if (!nama_kemasan || !pelanggan_id) {
      return res.status(400).json({ message: "Nama kemasan dan ID Pelanggan wajib diisi" });
    }

    const kemasan = await Kemasan.create({
      nama_kemasan,
      pelanggan_id,
      jenis_kemasan,
      ukuran_kemasan,
      no_pirt,
      no_halal,
      deskripsi,
    });
    res.status(201).json(kemasan);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Mendapatkan semua kemasan milik 1 pelanggan
// @route   GET /api/kemasan/by-pelanggan/:pelangganId
// @access  Admin, Kasir, Manajer
export const getKemasanByPelanggan = async (req, res) => {
  try {
    const kemasan = await Kemasan.findAll({
      where: { pelanggan_id: req.params.pelangganId },
      order: [["nama_kemasan", "ASC"]],
    });
    res.status(200).json(kemasan);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// @desc    Update data kemasan
// @route   PUT /api/kemasan/:id
// @access  Admin, Kasir
export const updateKemasan = async (req, res) => {
  try {
    // 2. Ambil field baru dari body
    const {
      nama_kemasan,
      jenis_kemasan,
      ukuran_kemasan,
      no_pirt,
      no_halal,
      deskripsi,
    } = req.body;
    
    const kemasan = await Kemasan.findByPk(req.params.id);

    if (!kemasan) {
      return res.status(404).json({ message: "Kemasan tidak ditemukan" });
    }

    // 3. Update semua field
    kemasan.nama_kemasan = nama_kemasan || kemasan.nama_kemasan;
    kemasan.jenis_kemasan = jenis_kemasan || kemasan.jenis_kemasan;
    kemasan.ukuran_kemasan = ukuran_kemasan || kemasan.ukuran_kemasan;
    kemasan.no_pirt = no_pirt || kemasan.no_pirt;
    kemasan.no_halal = no_halal || kemasan.no_halal;
    kemasan.deskripsi = deskripsi || kemasan.deskripsi;

    const updatedKemasan = await kemasan.save();
    res.status(200).json(updatedKemasan);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Hapus kemasan
// @route   DELETE /api/kemasan/:id
// @access  Admin, Kasir
export const deleteKemasan = async (req, res) => {
  try {
    const kemasan = await Kemasan.findByPk(req.params.id);
    if (!kemasan) {
      return res.status(404).json({ message: "Kemasan tidak ditemukan" });
    }

    // 2. CEK PENTING: Jangan hapus kemasan jika sudah dipakai di pesanan
    const pesananTerkait = await Pesanan.findOne({
      where: { kemasan_id: kemasan.id },
    });
    if (pesananTerkait) {
      return res.status(400).json({
        message: "Kemasan tidak bisa dihapus karena sudah digunakan dalam riwayat pesanan.",
      });
    }

    await kemasan.destroy();
    res.status(200).json({ message: "Kemasan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};