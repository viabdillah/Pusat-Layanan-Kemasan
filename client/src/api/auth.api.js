// client/src/api/auth.api.js
import api from "./index.js";

/**
 * Mengirim request login ke server.
 * @param {string} username - Username user.
 * @param {string} password - Password user.
 * @returns {Promise<object>} Data respons dari server (termasuk data user).
 */
export const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) { // 'error' sekarang digunakan di kedua blok
    // Melempar pesan error agar bisa ditangkap oleh komponen
    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data.message;
    } else {
      // PERBAIKAN: Gunakan error.message di sini
      throw error.message || "Tidak dapat terhubung ke server.";
    }
  }
};

/**
 * Mengecek status autentikasi user dengan memanggil endpoint /me.
 * @returns {Promise<object>} Data user jika cookie JWT valid.
 */
export const checkAuthStatus = async () => {
  // PERBAIKAN: Hapus try/catch yang tidak perlu.
  // Jika api.get gagal, promise-nya akan otomatis 'reject'
  // dan akan ditangkap oleh AuthContext.
  const response = await api.get("/auth/me");
  return response.data; // Mengembalikan data user
};

/**
 * Mengirim request logout ke server untuk menghapus cookie JWT.
 * @returns {Promise<object>} Pesan sukses dari server.
 */
export const logout = async () => {
  // PERBAIKAN: Hapus try/catch yang tidak perlu.
  const response = await api.post("/auth/logout");
  return response.data;
};