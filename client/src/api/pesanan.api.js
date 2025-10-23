// client/src/api/pesanan.api.js
import api from "./index.js";

/**
 * Mengambil SEMUA pesanan (untuk Admin, Kasir, Manajer).
 * @returns {Promise<Array>} Array of pesanan objects.
 */
export const getAllPesanan = async () => {
  const response = await api.get("/pesanan");
  return response.data;
};

/**
 * Mengambil "Tugas Tersedia" (Pool) untuk Desainer/Operator.
 * @returns {Promise<Array>} Array of pesanan objects (status Antrian/ACC).
 */
export const getAvailableTasks = async () => {
  const response = await api.get("/pesanan/available");
  return response.data;
};

/**
 * Mengambil "Tugas Saya" (yang sudah diklaim) untuk Desainer/Operator.
 * @returns {Promise<Array>} Array of pesanan objects (status Desain/Produksi).
 */
export const getMyTasks = async () => {
  const response = await api.get("/pesanan/my-tasks");
  return response.data;
};

/**
 * Membuat pesanan baru (oleh Kasir/Admin).
 * @param {object} pesananData - Data pesanan baru.
 * @returns {Promise<object>} Data pesanan yang baru dibuat.
 */
export const createPesanan = async (pesananData) => {
  try {
    const response = await api.post("/pesanan", pesananData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data.message;
    } else {
      throw error.message || "Gagal membuat pesanan.";
    }
  }
};

/**
 * Mengupdate pesanan (Klaim, Update Status, dll).
 * @param {number} id - ID Pesanan.
 * @param {object} updateData - Data yang akan diupdate.
 * @returns {Promise<object>} Data pesanan yang telah diupdate.
 */
export const updatePesanan = async (id, updateData) => {
  try {
    const response = await api.put(`/pesanan/${id}`, updateData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data.message;
    } else {
      throw error.message || "Gagal mengupdate pesanan.";
    }
  }
};