// client/src/components/specific/CreatePesananModal.jsx
import React, { useState, useEffect } from "react";
import { HiX, HiOutlineDocumentAdd, HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { getAllPelanggan } from "../../api/pelanggan.api.js";
import { getKemasanByPelanggan } from "../../api/kemasan.api.js";
import { createPesanan } from "../../api/pesanan.api.js";
import toast from "react-hot-toast";

const CreatePesananModal = ({ isOpen, onClose, onPesananAdded }) => {
  const [step, setStep] = useState(1); // 1: Pelanggan, 2: Kemasan, 3: Detail
  const [loading, setLoading] = useState(false);

  // Data
  const [allPelanggan, setAllPelanggan] = useState([]);
  const [filteredKemasan, setFilteredKemasan] = useState([]);

  // State Form
  const [pelangganId, setPelangganId] = useState("");
  const [kemasanId, setKemasanId] = useState("");
  const [namaPesanan, setNamaPesanan] = useState("");
  const [jumlah, setJumlah] = useState(100);
  const [harga, setHarga] = useState("");
  const [catatan, setCatatan] = useState("");

  // Step 1: Ambil semua pelanggan saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      const fetchPelanggan = async () => {
        try {
          const data = await getAllPelanggan();
          setAllPelanggan(data);
        } catch {
          toast.error("Gagal memuat daftar pelanggan");
        }
      };
      fetchPelanggan();
    }
  }, [isOpen]);

  // Step 2: Ambil kemasan milik pelanggan yang dipilih
  useEffect(() => {
    if (pelangganId) {
      const fetchKemasan = async () => {
        try {
          const data = await getKemasanByPelanggan(pelangganId);
          setFilteredKemasan(data);
          setKemasanId(""); // Reset pilihan kemasan
        } catch {
          toast.error("Gagal memuat daftar kemasan");
        }
      };
      fetchKemasan();
    }
  }, [pelangganId]);

  // Reset semua state saat modal ditutup
  const handleClose = () => {
    setStep(1);
    setPelangganId("");
    setKemasanId("");
    setNamaPesanan("");
    setJumlah(100);
    setHarga("");
    setCatatan("");
    setAllPelanggan([]);
    setFilteredKemasan([]);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPesanan({
        pelanggan_id: pelangganId,
        kemasan_id: kemasanId,
        nama_pesanan: namaPesanan,
        jumlah_pesanan: jumlah,
        total_harga: harga,
        catatan_pesanan: catatan,
      });
      toast.success("Pesanan baru berhasil dibuat!");
      onPesananAdded();
      handleClose();
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
            Buat Pesanan Baru (Langkah {step}/3)
          </h3>
          <button onClick={handleClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800">
            <HiX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* ----- LANGKAH 1: PILIH PELANGGAN ----- */}
          {step === 1 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Pilih Pelanggan
              </label>
              <select
                value={pelangganId}
                onChange={(e) => setPelangganId(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="" disabled>-- Daftar Pelanggan --</option>
                {allPelanggan.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nama_pelanggan} ({p.kontak_pelanggan})
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500">
                Pelanggan tidak ada? Daftarkan dulu di halaman "Pelanggan".
              </p>
            </div>
          )}

          {/* ----- LANGKAH 2: PILIH KEMASAN ----- */}
          {step === 2 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Pilih Kemasan
              </label>
              <select
                value={kemasanId}
                onChange={(e) => setKemasanId(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="" disabled>-- Daftar Kemasan Milik Pelanggan --</option>
                {filteredKemasan.length === 0 ? (
                  <option disabled>Pelanggan ini belum punya kemasan</option>
                ) : (
                  filteredKemasan.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.nama_kemasan} ({k.ukuran_kemasan || "ukuran belum di-set"})
                    </option>
                  ))
                )}
              </select>
              <p className="text-xs text-gray-500">
                Kemasan tidak ada? Tambahkan dulu di halaman "Detail Pelanggan".
              </p>
            </div>
          )}

          {/* ----- LANGKAH 3: DETAIL PESANAN ----- */}
          {step === 3 && (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Pesanan</label>
                <input
                  type="text"
                  value={namaPesanan}
                  onChange={(e) => setNamaPesanan(e.target.value)}
                  placeholder="Contoh: Cetak Box Brownies 500pcs"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Jumlah (pcs)</label>
                  <input
                    type="number"
                    value={jumlah}
                    onChange={(e) => setJumlah(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Harga (Rp)</label>
                  <input
                    type="number"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    placeholder="Contoh: 500000"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Catatan (Opsional)</label>
                <textarea
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* ----- TOMBOL NAVIGASI & SUBMIT ----- */}
          <div className="flex justify-between items-center pt-4 border-t">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="flex items-center px-5 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              <HiArrowLeft className="w-5 h-5 mr-1" />
              Kembali
            </button>
            
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={(step === 1 && !pelangganId) || (step === 2 && !kemasanId)}
                className="flex items-center px-5 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                Lanjut
                <HiArrowRight className="w-5 h-5 ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !namaPesanan}
                className="flex items-center px-5 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:from-gray-400"
              >
                <HiOutlineDocumentAdd className="w-5 h-5 mr-2" />
                {loading ? "Menyimpan..." : "Simpan Pesanan"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePesananModal;