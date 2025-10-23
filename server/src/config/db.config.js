// server/src/config/db.config.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Memuat variabel dari .env

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Set 'true' jika ingin melihat query SQL di console
  }
);

export default sequelize;