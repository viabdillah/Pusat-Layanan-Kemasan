// server/src/models/kemasan.model.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config.js";
import Pelanggan from "./pelanggan.model.js"; // Impor Pelanggan untuk relasi

class Kemasan extends Model {}

Kemasan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_kemasan: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Misal: Box Brownies 20x10",
    },
    jenis_kemasan: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Misal: Standing Pouch, Box, Botol",
    },
    ukuran_kemasan: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Misal: 20x12 cm, 250ml",
    },
    no_pirt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    no_halal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // --- REVISI ---
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Deskripsi Lainnya (Catatan tambahan)",
    },
    file_desain_master: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Path/URL ke file desain (Corel, AI, PDF) master",
    },
    // ---- Kunci Relasi (Foreign Key) ----
    pelanggan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pelanggan,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Kemasan",
    tableName: "kemasan",
    timestamps: true,
  }
);

// Mendefinisikan Asosiasi: "Satu Kemasan dimiliki oleh Satu Pelanggan"
Kemasan.belongsTo(Pelanggan, {
  foreignKey: "pelanggan_id",
  as: "pelanggan",
});

// TAMBAHKAN INI: "Satu Pelanggan memiliki BANYAK Kemasan"
// Ini akan memperbaiki 'include' di controller
Pelanggan.hasMany(Kemasan, {
  foreignKey: "pelanggan_id",
  as: "kemasan", // 'as' ini harus cocok dengan di controller
});

// Kita juga bisa definisikan kebalikannya di pelanggan.model.js (opsional)
// Pelanggan.hasMany(Kemasan, { foreignKey: 'pelanggan_id' });

export default Kemasan;