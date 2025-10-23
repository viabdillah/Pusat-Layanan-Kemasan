// client/src/api/pelanggan.api.js
import api from "./index.js";

/**
 * Mengambil semua data pelanggan.
 * @returns {Promise<Array>} Array of pelanggan objects.
 */
export const getAllPelanggan = async () => {
  const response = await api.get("/pelanggan");
  return response.data;
};

/**
 * Membuat pelanggan baru.
 * @param {object} pelangganData - (nama_pelanggan, kontak_pelanggan, alamat).
 * @returns {Promise<object>} Data pelanggan yang baru dibuat.
 */
export const createPelanggan = async (pelangganData) => {
  try {
    const response = await api.post("/pelanggan", pelangganData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data.message;
    } else {
      throw error.message || "Gagal membuat pelanggan.";
    }
  }
};

/**
 * Mendapatkan detail satu pelanggan (termasuk kemasan & pesanan).
 * @param {number} id - ID Pelanggan.
 * @returns {Promise<object>} Objek pelanggan dengan data terkait.
 */
export const getPelangganById = async (id) => {
  const response = await api.get(`/pelanggan/${id}`);
  return response.data;
};