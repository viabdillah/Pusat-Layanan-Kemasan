// client/src/components/specific/AddUserModal.jsx
import React, { useState } from "react";
import { HiX, HiOutlineUserAdd } from "react-icons/hi";
import { createUser } from "../../api/user.api.js";
import toast from "react-hot-toast";

/**
 * Komponen Modal untuk menambah user baru.
 * @param {object} props
 * @param {boolean} props.isOpen - Status modal (terbuka/tertutup).
 * @param {function} props.onClose - Fungsi untuk menutup modal.
 * @param {function} props.onUserAdded - Fungsi untuk di-trigger setelah user berhasil ditambah (untuk refresh data).
 */
const AddUserModal = ({ isOpen, onClose, onUserAdded }) => {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("operator"); // Default role
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createUser({
        nama_lengkap: namaLengkap,
        username,
        password,
        role,
      });
      toast.success("User berhasil dibuat!");
      onUserAdded(); // Panggil fungsi refresh
      onClose(); // Tutup modal
      // Reset form
      setNamaLengkap("");
      setUsername("");
      setPassword("");
      setRole("operator");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Jika modal tidak terbuka, jangan render apapun
  if (!isOpen) return null;

  return (
    // Overlay (latar belakang gelap)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Konten Modal */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        {/* Header Modal */}
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-xl font-semibold text-gray-800">
            Tambah User Baru
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="operator">Operator</option>
              <option value="desainer">Desainer</option>
              <option value="kasir">Kasir</option>
              <option value="manajer">Manajer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Footer Modal (Tombol) */}
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
              {loading ? "Menyimpan..." : "Simpan User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;