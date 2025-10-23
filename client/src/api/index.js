// client/src/api/index.js
import axios from "axios";

// Buat instance axios dengan baseURL
// Ini akan membuat kita tidak perlu mengetik 'http://localhost:5000' berulang kali
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // PENTING: Agar cookie (JWT) bisa dikirim dan diterima
});

export default api;