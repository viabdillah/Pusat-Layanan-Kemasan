// client/src/pages/Dashboard.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  HiOutlineCube, 
  HiOutlineClock, 
  HiOutlineCheckCircle, 
  HiOutlineUsers,
  HiOutlinePlus
} from 'react-icons/hi';

// Data dummy (nanti diganti data API)
const stats = [
  { name: 'Proyek Dikerjakan', value: '12', icon: HiOutlineCube, color: 'text-blue-500' },
  { name: 'Menunggu Antrian', value: '3', icon: HiOutlineClock, color: 'text-yellow-500' },
  { name: 'Proyek Selesai', value: '150', icon: HiOutlineCheckCircle, color: 'text-green-500' },
  { name: 'Total Klien', value: '89', icon: HiOutlineUsers, color: 'text-purple-500' },
];

const Dashboard = () => {
  const { authUser } = useAuth();

  return (
    <div className="space-y-8">
      {/* Header Selamat Datang */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">
          Selamat Datang, {authUser.nama_lengkap}!
        </h2>
        <p className="mt-2 text-gray-600">
          Ini adalah ringkasan sistem manajemen proyek Anda hari ini.
        </p>
      </div>

      {/* Grid Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.name}
            className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          >
            <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <div className="text-3xl font-semibold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">
                {stat.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Area Aksi Cepat (Contoh berdasarkan role) */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Aksi Cepat</h3>
        <div className="flex flex-wrap gap-4">
          
          {/* Tombol Aksi Cepat dengan Hover Keren */}
          {authUser.role === 'kasir' && (
            <button className="flex items-center px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
              <HiOutlinePlus className="w-5 h-5 mr-2" />
              Buat Proyek Baru
            </button>
          )}
          
          {authUser.role === 'admin' && (
            <button className="flex items-center px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              <HiOutlinePlus className="w-5 h-5 mr-2" />
              Tambah User Baru
            </button>
          )}

          <button className="flex items-center px-5 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300">
            Lihat Semua Proyek
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;