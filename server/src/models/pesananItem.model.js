// server/src/models/pesananItem.model.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config.js";
import Pesanan from "./pesanan.model.js";
import Kemasan from "./kemasan.model.js";

class PesananItem extends Model {}

PesananItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pesanan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pesanan,
        key: "id",
      },
    },
    kemasan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Kemasan,
        key: "id",
      },
    },
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    harga_satuan: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PesananItem",
    tableName: "pesanan_item",
    timestamps: false, // Biasanya tabel perantara tidak butuh timestamp
  }
);

// Definisikan relasi
Pesanan.hasMany(PesananItem, { foreignKey: "pesanan_id", as: "items" });
PesananItem.belongsTo(Pesanan, { foreignKey: "pesanan_id" });

Kemasan.hasMany(PesananItem, { foreignKey: "kemasan_id" });
PesananItem.belongsTo(Kemasan, { foreignKey: "kemasan_id", as: "kemasan" });

export default PesananItem;