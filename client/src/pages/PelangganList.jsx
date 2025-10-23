// client/src/pages/PelangganList.jsx
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getAllPelanggan } from "../api/pelanggan.api.js";
import { HiOutlinePlus, HiOutlineUsers } from "react-icons/hi";
import { AiOutlineLoading } from "react-icons/ai";
import toast from "react-hot-toast";
import CreatePelangganModal from "../components/specific/CreatePelangganModal.jsx";

const PelangganList = () => {
  const [pelanggan, setPelanggan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPelanggan = async () => {
    setLoading(true);
    try {
      const data = await getAllPelanggan();
      setPelanggan(data);
    } catch {
      toast.error("Gagal mengambil data pelanggan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPelanggan();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Manajemen Pelanggan
          </h2>
          <p className="mt-2 text-gray-600">
            Daftar semua pelanggan yang terdaftar.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <HiOutlinePlus className="w-5 h-5 mr-2" />
          Tambah Pelanggan
        </button>
      </div>

      {/* Konten (Tabel Pelanggan) */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-20">
            <AiOutlineLoading className="w-10 h-10 text-blue-500 animate-spin" />
          </div>
        ) : pelanggan.length === 0 ? (
          <div className="flex flex-col justify-center items-center p-20 text-gray-500">
            <HiOutlineUsers className="w-16 h-16" />
            <p className="mt-4 text-lg">Belum ada data pelanggan</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Pelanggan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kontak
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alamat
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pelanggan.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item.nama_pelanggan}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {item.kontak_pelanggan}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.alamat || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                            to={`/pelanggan/${item.id}`} // Arahkan ke rute dinamis
                            className="text-blue-600 hover:text-blue-800"
                    >
                            Riwayat & Detail
                        </Link>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Render Modal */}
      <CreatePelangganModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPelangganAdded={() => {
          fetchPelanggan(); // Refresh tabel
        }}
      />
    </div>
  );
};

export default PelangganList;