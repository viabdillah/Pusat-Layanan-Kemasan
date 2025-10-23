// client/src/pages/PelangganDetail.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getPelangganById } from "../api/pelanggan.api.js";
import {
  getKemasanByPelanggan,
  deleteKemasan,
} from "../api/kemasan.api.js";
import { AiOutlineLoading } from "react-icons/ai";
import {
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineArchive,
  HiOutlineClipboardList,
  HiOutlinePlus,
} from "react-icons/hi";
import toast from "react-hot-toast";

// Impor Modal-Modal
import CreateKemasanModal from "../components/specific/CreateKemasanModal.jsx";
import EditKemasanModal from "../components/specific/EditKemasanModal.jsx";
import ConfirmDeleteModal from "../components/specific/ConfirmDeleteModal.jsx";

// Komponen helper untuk badge Status Pesanan
const StatusBadge = ({ status }) => {
  const colors = {
    Antrian: "bg-gray-200 text-gray-800",
    Desain: "bg-blue-100 text-blue-800",
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

const PelangganDetail = () => {
  const { id } = useParams(); // Mengambil 'id' dari URL
  const [pelanggan, setPelanggan] = useState(null);
  const [kemasan, setKemasan] = useState([]);
  const [pesanan, setPesanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // State untuk 3 Modal Kemasan
  const [isCreateKemasanModalOpen, setIsCreateKemasanModalOpen] = useState(false);
  const [isEditKemasanModalOpen, setIsEditKemasanModalOpen] = useState(false);
  const [isDeleteKemasanModalOpen, setIsDeleteKemasanModalOpen] = useState(false);
  const [selectedKemasan, setSelectedKemasan] = useState(null);

  // Fungsi untuk me-refresh daftar kemasan (dibuat dengan useCallback)
  const refreshKemasan = useCallback(async () => {
    try {
      const dataKemasan = await getKemasanByPelanggan(id);
      setKemasan(dataKemasan);
    } catch {
      toast.error("Gagal me-refresh daftar kemasan.");
    }
  }, [id]);

  // Fungsi untuk mengambil semua data (dibuat dengan useCallback)
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Ambil data pelanggan (sudah termasuk pesanan)
      const dataPelanggan = await getPelangganById(id);
      setPelanggan(dataPelanggan);
      setPesanan(dataPelanggan.pesanan || []);

      // 2. Ambil data kemasan secara terpisah
      await refreshKemasan();
    } catch {
      toast.error("Gagal mengambil data detail pelanggan.");
    } finally {
      setLoading(false);
    }
  }, [id, refreshKemasan]); // Bergantung pada id dan fungsi refreshKemasan

  // useEffect untuk memanggil fetchData saat komponen dimuat
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Dependency sudah benar

  // --- Handler untuk Modal ---
  const handleEditKemasanClick = (item) => {
    setSelectedKemasan(item);
    setIsEditKemasanModalOpen(true);
  };

  const handleDeleteKemasanClick = (item) => {
    setSelectedKemasan(item);
    setIsDeleteKemasanModalOpen(true);
  };

  const handleConfirmDeleteKemasan = async () => {
    if (!selectedKemasan) return;
    setIsDeleting(true);
    try {
      await deleteKemasan(selectedKemasan.id);
      toast.success(`Kemasan '${selectedKemasan.nama_kemasan}' berhasil dihapus.`);
      setIsDeleteKemasanModalOpen(false);
      setSelectedKemasan(null);
      await refreshKemasan(); // Refresh daftar kemasan
    } catch (error) {
      toast.error(error); // Menampilkan pesan error dari API
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20">
        <AiOutlineLoading className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!pelanggan) {
    return <div className="p-6">Pelanggan tidak ditemukan.</div>;
  }

  return (
    <div className="space-y-6">
      {/* 1. Kartu Info Pelanggan */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">
          {pelanggan.nama_pelanggan}
        </h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
          <div className="flex items-center">
            <HiOutlinePhone className="w-5 h-5 mr-3" />
            <span>{pelanggan.kontak_pelanggan}</span>
          </div>
          <div className="flex items-center">
            <HiOutlineLocationMarker className="w-5 h-5 mr-3" />
            <span>{pelanggan.alamat || "Alamat belum diatur"}</span>
          </div>
        </div>
      </div>

      {/* 2. Daftar Kemasan */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <HiOutlineArchive className="w-6 h-6 mr-3" />
            Daftar Kemasan
          </h3>
          <button
            onClick={() => setIsCreateKemasanModalOpen(true)}
            className="flex items-center px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <HiOutlinePlus className="w-4 h-4 mr-1" />
            Tambah Kemasan
          </button>
        </div>
        {kemasan.length === 0 ? (
          <p className="p-6 text-gray-500">Belum ada data kemasan.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Kemasan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deskripsi</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {kemasan.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.nama_kemasan}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.deskripsi || "-"}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditKemasanClick(item)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteKemasanClick(item)}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 3. Riwayat Pesanan */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-5 border-b">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <HiOutlineClipboardList className="w-6 h-6 mr-3" />
            Riwayat Pesanan
          </h3>
        </div>
        {pesanan.length === 0 ? (
          <p className="p-6 text-gray-500">Belum ada riwayat pesanan.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Kemasan</th>
                {/* REVISI KOLO */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jenis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ukuran</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {kemasan.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.nama_kemasan}</td>
                  {/* REVISI KOLO */}
                  <td className="px-6 py-4 text-sm text-gray-600">{item.jenis_kemasan || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.ukuran_kemasan || "-"}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditKemasanClick(item)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteKemasanClick(item)}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Render Semua Modal */}
      <CreateKemasanModal
        isOpen={isCreateKemasanModalOpen}
        onClose={() => setIsCreateKemasanModalOpen(false)}
        onKemasanAdded={refreshKemasan}
        pelangganId={pelanggan?.id}
      />
      
      {selectedKemasan && (
        <EditKemasanModal
          isOpen={isEditKemasanModalOpen}
          onClose={() => setIsEditKemasanModalOpen(false)}
          onKemasanUpdated={() => {
            refreshKemasan();
            setSelectedKemasan(null);
          }}
          kemasanToEdit={selectedKemasan}
        />
      )}

      {selectedKemasan && (
        <ConfirmDeleteModal
          isOpen={isDeleteKemasanModalOpen}
          onClose={() => setIsDeleteKemasanModalOpen(false)}
          onConfirm={handleConfirmDeleteKemasan}
          loading={isDeleting}
          itemName={selectedKemasan.nama_kemasan}
        />
      )}
    </div>
  );
};

export default PelangganDetail;