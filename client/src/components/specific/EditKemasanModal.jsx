// client/src/components/specific/EditKemasanModal.jsx
import React, { useState, useEffect } from "react";
import { HiX, HiOutlinePencilAlt } from "react-icons/hi";
import { updateKemasan } from "../../api/kemasan.api.js";
import toast from "react-hot-toast";

const EditKemasanModal = ({ isOpen, onClose, onKemasanUpdated, kemasanToEdit }) => {
  // 1. Tambahkan state baru
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const [ukuran, setUkuran] = useState("");
  const [pirt, setPirt] = useState("");
  const [halal, setHalal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. Perbarui useEffect untuk mengisi semua state
  useEffect(() => {
    if (kemasanToEdit) {
      setNama(kemasanToEdit.nama_kemasan || "");
      setJenis(kemasanToEdit.jenis_kemasan || "");
      setUkuran(kemasanToEdit.ukuran_kemasan || "");
      setPirt(kemasanToEdit.no_pirt || "");
      setHalal(kemasanToEdit.no_halal || "");
      setDeskripsi(kemasanToEdit.deskripsi || "");
    }
  }, [kemasanToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 3. Kirim semua data baru ke API update
      await updateKemasan(kemasanToEdit.id, {
        nama_kemasan: nama,
        jenis_kemasan: jenis,
        ukuran_kemasan: ukuran,
        no_pirt: pirt,
        no_halal: halal,
        deskripsi: deskripsi,
      });
      toast.success("Kemasan berhasil diupdate!");
      onKemasanUpdated();
      onClose();
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
            Edit Kemasan: {kemasanToEdit?.nama_kemasan}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800">
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* 4. Perbarui Form (identik dengan Create Modal) */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Nama Kemasan
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Contoh: Keripik paria rasa Ori"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Jenis Kemasan
              </label>
              <input
                type="text"
                value={jenis}
                onChange={(e) => setJenis(e.target.value)}
                placeholder="Contoh: Standing Pouch"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Ukuran Kemasan
              </label>
              <input
                type="text"
                value={ukuran}
                onChange={(e) => setUkuran(e.target.value)}
                placeholder="Contoh: 20x12 cm"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                No. PIRT (Opsional)
              </label>
              <input
                type="text"
                value={pirt}
                onChange={(e) => setPirt(e.target.value)}
                placeholder="P-IRT No. XXXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                No. Halal (Opsional)
              </label>
              <input
                type="text"
                value={halal}
                onChange={(e) => setHalal(e.target.value)}
                placeholder="IDXXXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Deskripsi Lainnya (Opsional)
            </label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Catatan tambahan: Laminasi Doff, Zipperlock"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end pt-4 space-x-3 border-t">
            <button type="button" onClick={onClose} className="px-5 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-5 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:from-gray-400"
            >
              <HiOutlinePencilAlt className="w-5 h-5 mr-2" />
              {loading ? "Menyimpan..." : "Update Kemasan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditKemasanModal;