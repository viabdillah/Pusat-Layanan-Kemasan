// client/src/api/kemasan.api.js
import api from "./index.js";

/**
 * Mengambil semua kemasan milik 1 pelanggan.
 * @param {number} pelangganId - ID pelanggan.
 * @returns {Promise<Array>} Array of kemasan objects.
 */
export const getKemasanByPelanggan = async (pelangganId) => {
  const response = await api.get(`/kemasan/by-pelanggan/${pelangganId}`);
  return response.data;
};

/**
 * Membuat kemasan baru.
 * @param {object} kemasanData - (nama_kemasan, deskripsi, pelanggan_id).
 * @returns {Promise<object>} Data kemasan yang baru dibuat.
 */
export const createKemasan = async (kemasanData) => {
  try {
    const response = await api.post("/kemasan", kemasanData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data.message;
    } else {
      throw error.message || "Gagal membuat kemasan.";
    }
  }
};

/**
 * Mengupdate data kemasan.
 * @param {number} id - ID kemasan.
 * @param {object} kemasanData - (nama_kemasan, deskripsi).
 * @returns {Promise<object>} Data kemasan yang telah diupdate.
 */
export const updateKemasan = async (id, kemasanData) => {
  try {
    const response = await api.put(`/kemasan/${id}`, kemasanData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data.message;
    } else {
      throw error.message || "Gagal mengupdate kemasan.";
    }
  }
};

/**
 * Menghapus kemasan.
 * @param {number} id - ID kemasan.
 * @returns {Promise<object>} Pesan sukses.
 */
export const deleteKemasan = async (id) => {
  try {
    const response = await api.delete(`/kemasan/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data.message;
    } else {
      throw error.message || "Gagal menghapus kemasan.";
    }
  }
};