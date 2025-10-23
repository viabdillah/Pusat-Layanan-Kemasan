// client/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { checkAuthStatus } from "../api/auth.api.js";
import { AiOutlineLoading } from "react-icons/ai"; // Ikon loading

// 1. Buat Context-nya
const AuthContext = createContext();

// 2. Buat Provider (Komponen Pembungkus)
export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  // State untuk loading pengecekan auth
  const [loading, setLoading] = useState(true);

  // Gunakan useEffect untuk mengecek status saat app dimuat
  useEffect(() => {
    const checkUser = async () => {
      try {
        // Panggil API 'get me'
        const data = await checkAuthStatus();
        setAuthUser(data); // Jika berhasil, set data user
      } catch {
        // Jika terjadi error (misal: token tidak valid), set user ke null
        setAuthUser(null);
      } finally {
        // Selesai mengecek, matikan loading
        setLoading(false);
      }
    };

    checkUser();
  }, []); // [] = hanya berjalan sekali saat app dimuat

  // Jika masih loading (mengecek auth), tampilkan spinner fullscreen
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <AiOutlineLoading className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  // Kirim state dan fungsi setter ke provider
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Buat Custom Hook (untuk mempermudah pemanggilan)
export const useAuth = () => {
  return useContext(AuthContext);
};