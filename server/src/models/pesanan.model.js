// server/src/models/pesanan.model.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config.js";
import User from "./user.model.js";
import Pelanggan from "./pelanggan.model.js";
// Hapus 'import Kemasan', kita akan impor 'PesananItem'

class Pesanan extends Model {}

Pesanan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_pesanan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // --- FIELD INI DIHAPUS ---
    // jumlah_pesanan: { ... }

    total_harga: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false, // Total harga kini dihitung dari 'items'
    },
    status_pembayaran: {
      type: DataTypes.ENUM("Belum Lunas", "DP", "Lunas"),
      defaultValue: "Belum Lunas",
    },
    status_pesanan: {
      type: DataTypes.ENUM(
        "Antrian", "Desain", "Revisi", "ACC",
        "Produksi", "Selesai", "Dibatalkan"
      ),
      defaultValue: "Antrian",
    },
    file_desain_final: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    catatan_pesanan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    
    // --- FIELD INI DIHAPUS ---
    // kemasan_id: { ... }

    // Foreign Keys
    pelanggan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pelanggan,
        key: "id",
      },
    },
    user_id_kasir: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    user_id_desainer: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
    user_id_operator: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Pesanan",
    tableName: "pesanan",
    timestamps: true,
  }
);

// Mendefinisikan Asosiasi
Pesanan.belongsTo(Pelanggan, { foreignKey: "pelanggan_id", as: "pelanggan" });
// Hapus relasi Pesanan.belongsTo(Kemasan)

Pesanan.belongsTo(User, { foreignKey: "user_id_kasir", as: "kasir" });
Pesanan.belongsTo(User, { foreignKey: "user_id_desainer", as: "desainer" });
Pesanan.belongsTo(User, { foreignKey: "user_id_operator", as: "operator" });

Pelanggan.hasMany(Pesanan, { foreignKey: "pelanggan_id", as: "pesanan" });

export default Pesanan;