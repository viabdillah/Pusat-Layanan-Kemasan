// client/src/components/layout/Header.jsx

import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { logout } from '../../api/auth.api.js';

const Header = () => {
  const { authUser, setAuthUser } = useAuth();
  
  // Fungsi logout
  const handleLogout = async () => {
    try {
      await logout(); // Panggil API untuk hapus cookie
      setAuthUser(null); // Set state di frontend jadi null
      toast.success('Anda berhasil logout.');
      // Redirect akan terjadi otomatis karena App.jsx akan mendeteksi authUser=null
    } catch (err) {
      toast.error(`Gagal logout: ${err.message}`);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm h-20 border-b">
      
      {/* Search (Bisa diaktifkan nanti) */}
      <div className="flex-1">
        {/* <input type="text" placeholder="Cari..." className="..."/> */}
        <h1 className="text-xl font-semibold text-gray-800 lg:hidden">
          Dashboard
        </h1>
      </div>

      {/* User Info & Logout */}
      <div className="flex items-center space-x-4">
        <div className="text-right hidden sm:block">
          <div className="font-semibold text-gray-800">{authUser.nama_lengkap}</div>
          <div className="text-sm text-gray-500 capitalize">{authUser.role}</div>
        </div>
        <button 
          onClick={handleLogout}
          className="p-3 text-gray-600 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
          title="Logout"
        >
          <HiOutlineLogout size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;