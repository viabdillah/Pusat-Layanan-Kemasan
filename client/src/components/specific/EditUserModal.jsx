// client/src/components/specific/EditUserModal.jsx
import React, { useState, useEffect } from "react";
import { HiX, HiOutlinePencilAlt } from "react-icons/hi";
import { updateUser } from "../../api/user.api.js";
import toast from "react-hot-toast";

/**
 * Komponen Modal untuk mengedit user.
 * @param {object} props
 * @param {boolean} props.isOpen - Status modal.
 * @param {function} props.onClose - Fungsi untuk menutup modal.
 * @param {function} props.onUserUpdated - Fungsi refresh data.
 * @param {object} props.userToEdit - Objek user yang akan diedit.
 */
const EditUserModal = ({ isOpen, onClose, onUserUpdated, userToEdit }) => {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("operator");
  const [loading, setLoading] = useState(false);

  // useEffect ini akan mengisi form setiap kali userToEdit berubah
  useEffect(() => {
    if (userToEdit) {
      setNamaLengkap(userToEdit.nama_lengkap);
      setUsername(userToEdit.username);
      setRole(userToEdit.role);
    }
  }, [userToEdit]); // Dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUser(userToEdit.id, {
        nama_lengkap: namaLengkap,
        username,
        role,
      });
      toast.success("User berhasil diupdate!");
      onUserUpdated(); // Panggil fungsi refresh
      onClose(); // Tutup modal
    } catch (error) {
      toast.error(error);
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
            Edit User: {userToEdit?.nama_lengkap}
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
          {/* Perhatikan: Kita sengaja menghilangkan field password.
            Mengubah password tidak seharusnya dilakukan bersamaan dengan update data biasa.
            Ini bisa menjadi fitur terpisah ("Reset Password").
          */}
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
              <HiOutlinePencilAlt className="w-5 h-5 mr-2" />
              {loading ? "Menyimpan..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;