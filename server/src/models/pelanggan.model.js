// server/src/models/pelanggan.model.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config.js";

class Pelanggan extends Model {}

Pelanggan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_pelanggan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kontak_pelanggan: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Kontak harus unik
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Pelanggan",
    tableName: "pelanggan", // Nama tabel di DB
    timestamps: true,
  }
);

export default Pelanggan;