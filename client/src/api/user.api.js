// client/src/api/user.api.js
import api from "./index.js";

/**
 * Mengambil semua data user (khusus Admin).
 * @returns {Promise<Array>} Array of user objects.
 */
export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

/**
 * Membuat user baru (khusus Admin).
 * @param {object} userData - Data user baru (nama_lengkap, username, password, role).
 * @returns {Promise<object>} Data user yang baru dibuat.
 */
export const createUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    // Melempar pesan error agar bisa ditangkap oleh komponen
    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data.message;
    } else {
      throw error.message || "Gagal membuat user.";
    }
  }
};

/**
 * Mengupdate data user (khusus Admin).
 * @param {number} id - ID user yang akan diupdate.
 * @param {object} userData - Data user yang diupdate (nama_lengkap, username, role).
 * @returns {Promise<object>} Data user yang telah diupdate.
 */
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data.message;
    } else {
      throw error.message || "Gagal mengupdate user.";
    }
  }
};

/**
 * Menghapus user (khusus Admin).
 * @param {number} id - ID user yang akan dihapus.
 * @returns {Promise<object>} Pesan sukses.
 */
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};