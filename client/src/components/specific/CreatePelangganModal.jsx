// client/src/components/specific/CreatePelangganModal.jsx
import React, { useState } from "react";
import { HiX, HiOutlineUserAdd } from "react-icons/hi";
import { createPelanggan } from "../../api/pelanggan.api.js";
import toast from "react-hot-toast";

const CreatePelangganModal = ({ isOpen, onClose, onPelangganAdded }) => {
  const [nama, setNama] = useState("");
  const [kontak, setKontak] = useState("");
  const [alamat, setAlamat] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createPelanggan({
        nama_pelanggan: nama,
        kontak_pelanggan: kontak,
        alamat: alamat,
      });
      toast.success("Pelanggan baru berhasil ditambahkan!");
      onPelangganAdded(); // Panggil fungsi refresh
      onClose(); // Tutup modal
      // Reset form
      setNama("");
      setKontak("");
      setAlamat("");
    } catch (error) {
      toast.error(error); // Error dari API (misal: "Kontak sudah terdaftar")
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-xl font-semibold text-gray-800">
            Daftarkan Pelanggan Baru
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Nama Pelanggan
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Kontak (Email / No. HP)
            </label>
            <input
              type="text"
              value={kontak}
              onChange={(e) => setKontak(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Alamat (Opsional)
            </label>
            <textarea
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end pt-4 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-5 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:from-gray-400"
            >
              <HiOutlineUserAdd className="w-5 h-5 mr-2" />
              {loading ? "Menyimpan..." : "Simpan Pelanggan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePelangganModal;