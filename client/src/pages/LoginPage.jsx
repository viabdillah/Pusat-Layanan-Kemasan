// client/src/pages/LoginPage.jsx

import React, { useState } from "react";
import { login } from "../api/auth.api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import { HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi"; // Ikon minimalis
import toast from "react-hot-toast"; // Popup alert

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(username, password);
      setAuthUser(response.data);
      // Popup sukses dengan ikon
      toast.success(`Selamat datang, ${response.data.nama_lengkap}!`, {
        icon: "👋",
      });
      navigate("/");
    } catch (err) {
      // Popup error dengan ikon
      toast.error(err, {
        icon: "🚫",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="flex w-full max-w-5xl m-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Bagian Kiri (Branding) */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-12 bg-gradient-to-br from-blue-500 to-purple-600">
          <h1 className="text-4xl font-bold text-white text-center">
            Sistem Manajemen Proyek
          </h1>
          <p className="text-lg text-blue-100 mt-4 text-center">
            Pusat Layanan Kemasan
          </p>
        </div>

        {/* Bagian Kanan (Form) */}
        <div className="w-full md:w-1/2 p-8 md:p-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Sign In
          </h2>
          
          <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
            {/* Input Username */}
            <div className="relative border-b-2 border-gray-200 focus-within:border-blue-500 transition-colors">
              <HiOutlineUser className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                id="username"
                type="text"
                required
                className="w-full pl-8 pr-4 py-3 text-gray-900 placeholder-transparent bg-white focus:outline-none peer"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label 
                htmlFor="username"
                className="absolute left-8 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Username
              </label>
            </div>

            {/* Input Password */}
            <div className="relative border-b-2 border-gray-200 focus-within:border-blue-500 transition-colors">
              <HiOutlineLockClosed className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                id="password"
                type="password"
                required
                className="w-full pl-8 pr-4 py-3 text-gray-900 placeholder-transparent bg-white focus:outline-none peer"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label 
                htmlFor="password"
                className="absolute left-8 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Password
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:from-gray-400"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;