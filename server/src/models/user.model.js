// server/src/models/user.model.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config.js";
import bcrypt from "bcryptjs";

class User extends Model {
  // Fungsi helper untuk mengecek password saat login
  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_lengkap: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(
        "admin",
        "kasir",
        "operator",
        "desainer",
        "manajer"
      ),
      allowNull: false,
      defaultValue: "operator", // Tentukan default role saat user baru dibuat
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users", // Nama tabel di database
    timestamps: true, // Otomatis membuat createdAt dan updatedAt
    hooks: {
      // Hook ini berjalan otomatis SEBELUM user baru dibuat
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      // (Opsional) Hook jika user mengganti password
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;