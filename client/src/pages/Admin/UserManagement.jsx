// client/src/pages/Admin/UserManagement.jsx
import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../../api/user.api.js"; // Impor deleteUser
import { HiOutlinePlus, HiUsers } from "react-icons/hi";
import { AiOutlineLoading } from "react-icons/ai"; // Ikon loading
import toast from "react-hot-toast";

// Impor Modal-Modal baru
import AddUserModal from "../../components/specific/AddUserModal.jsx";
import EditUserModal from "../../components/specific/EditUserModal.jsx";
import ConfirmDeleteModal from "../../components/specific/ConfirmDeleteModal.jsx";

// Komponen helper untuk badge Role (tetap sama)
const RoleBadge = ({ role }) => {
  const colors = {
    admin: "bg-red-100 text-red-700",
    manajer: "bg-purple-100 text-purple-700",
    kasir: "bg-green-100 text-green-700",
    desainer: "bg-blue-100 text-blue-700",
    operator: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span
      className={`px-3 py-1 text-sm font-medium rounded-full ${
        colors[role] || "bg-gray-100 text-gray-700"
      }`}
    >
      {role}
    </span>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false); // State loading hapus

  // State untuk 3 Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State untuk menyimpan user yang dipilih
  const [selectedUser, setSelectedUser] = useState(null);

  // Fungsi untuk mengambil data user
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch {
      toast.error("Gagal mengambil data user.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // --- Handler untuk membuka modal ---
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // --- Handler Aksi ---
  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    setIsDeleting(true);
    try {
      await deleteUser(selectedUser.id);
      toast.success(`User '${selectedUser.nama_lengkap}' berhasil dihapus.`);
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      fetchUsers(); // Refresh tabel
    } catch {
      toast.error("Gagal menghapus user.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Manajemen User</h2>
          <p className="mt-2 text-gray-600">
            Kelola semua akun user yang terdaftar di sistem.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)} // Buka modal tambah
          className="flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <HiOutlinePlus className="w-5 h-5 mr-2" />
          Tambah User
        </button>
      </div>

      {/* Konten (Tabel User) */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-20">
            <AiOutlineLoading className="w-10 h-10 text-blue-500 animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col justify-center items-center p-20 text-gray-500">
            <HiUsers className="w-16 h-16" />
            <p className="mt-4 text-lg">Belum ada data user</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Lengkap
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tgl. Dibuat
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.nama_lengkap}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {user.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* Tombol Aksi Baru */}
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user)}
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

      {/* Render Modal-Modal (mereka tidak akan tampil jika isOpen=false) */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onUserAdded={() => {
          fetchUsers();
        }}
      />
      
      {/* Pastikan userToEdit tidak null sebelum merender modal edit */}
      {selectedUser && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUserUpdated={() => {
            fetchUsers();
          }}
          userToEdit={selectedUser}
        />
      )}

      {selectedUser && (
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          loading={isDeleting}
          itemName={selectedUser.nama_lengkap}
        />
      )}
    </div>
  );
};

export default UserManagement;