// client/src/components/specific/ConfirmDeleteModal.jsx
import React from "react";
import { HiX, HiOutlineExclamation, HiOutlineTrash } from "react-icons/hi";

/**
 * Komponen Modal untuk konfirmasi hapus.
 * @param {object} props
 * @param {boolean} props.isOpen - Status modal.
 * @param {function} props.onClose - Fungsi untuk menutup modal.
 * @param {function} props.onConfirm - Fungsi yang dijalankan saat konfirmasi.
 * @param {boolean} props.loading - Status loading.
 * @param {string} props.itemName - Nama item yang akan dihapus (untuk ditampilkan).
 */
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, loading, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-5 border-b">
          <h3 className="text-xl font-semibold text-gray-800">Konfirmasi Hapus</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <HiOutlineExclamation className="w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-lg text-gray-700">
                Anda yakin ingin menghapus user:
              </p>
              <p className="text-xl font-bold text-gray-900">{itemName}</p>
              <p className="text-sm text-gray-500 mt-1">Tindakan ini tidak dapat dibatalkan.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-5 bg-gray-50 rounded-b-lg space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center px-5 py-2 text-white bg-red-600 rounded-lg shadow-md hover:shadow-lg hover:bg-red-700 transition-all disabled:bg-gray-400"
          >
            <HiOutlineTrash className="w-5 h-5 mr-2" />
            {loading ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;