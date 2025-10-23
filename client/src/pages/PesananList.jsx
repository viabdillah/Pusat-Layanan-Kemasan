// client/src/pages/PesananList.jsx
import React, { useState, useEffect } from "react";
import { getAllPesanan } from "../api/pesanan.api.js";
import { HiOutlinePlus, HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineLoading } from "react-icons/ai";
import toast from "react-hot-toast";
import CreatePesananModal from "../components/specific/CreatePesananModal.jsx"; // Kita akan buat ini

// Helper Badge untuk Status Pesanan
const StatusPesananBadge = ({ status }) => {
  const colors = {
    Antrian: "bg-gray-200 text-gray-800",
    Desain: "bg-blue-100 text-blue-800",
    Revisi: "bg-orange-100 text-orange-800",
    ACC: "bg-teal-100 text-teal-800",
    Produksi: "bg-yellow-100 text-yellow-800",
    Selesai: "bg-green-100 text-green-800",
    Dibatalkan: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${
        colors[status] || "bg-gray-100"
      }`}
    >
      {status}
    </span>
  );
};

// Helper Badge untuk Status Bayar
const StatusBayarBadge = ({ status }) => {
  const colors = {
    "Belum Lunas": "bg-red-100 text-red-800",
    DP: "bg-yellow-100 text-yellow-800",
    Lunas: "bg-green-100 text-green-800",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${
        colors[status] || "bg-gray-100"
      }`}
    >
      {status}
    </span>
  );
};

const PesananList = () => {
  const [pesanan, setPesanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPesanan = async () => {
    setLoading(true);
    try {
      const data = await getAllPesanan();
      setPesanan(data);
    } catch {
      toast.error("Gagal mengambil data pesanan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPesanan();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Daftar Pesanan</h2>
          <p className="mt-2 text-gray-600">
            Lacak semua pesanan dari antrian hingga selesai.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <HiOutlinePlus className="w-5 h-5 mr-2" />
          Buat Pesanan Baru
        </button>
      </div>

      {/* Konten (Tabel Pesanan) */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center p-20">
            <AiOutlineLoading className="w-10 h-10 text-blue-500 animate-spin" />
          </div>
        ) : pesanan.length === 0 ? (
          <div className="flex flex-col justify-center items-center p-20 text-gray-500">
            <HiOutlineClipboardList className="w-16 h-16" />
            <p className="mt-4 text-lg">Belum ada data pesanan</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pesanan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pelanggan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status Pesanan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status Bayar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pesanan.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.nama_pesanan}</div>
                    <div className="text-xs text-gray-500">{item.kemasan.nama_kemasan}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.pelanggan.nama_pelanggan}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusPesananBadge status={item.status_pesanan} /></td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusBayarBadge status={item.status_pembayaran} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                    Rp{Number(item.total_harga || 0).toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-800">Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Render Modal */}
      <CreatePesananModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPesananAdded={() => {
          fetchPesanan(); // Refresh tabel
        }}
      />
    </div>
  );
};

export default PesananList;