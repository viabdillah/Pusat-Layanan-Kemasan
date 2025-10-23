// client/src/router/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

/**
 * Komponen ini akan menerima prop 'allowedRoles' (array)
 * Contoh: <ProtectedRoute allowedRoles={['admin', 'manajer']}>...</ProtectedRoute>
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { authUser } = useAuth();

  // 1. Dapatkan role user yang sedang login
  const userRole = authUser?.role;

  // 2. Cek apakah role user ada di dalam daftar 'allowedRoles'
  const isAllowed = allowedRoles.includes(userRole);

  // 3. Jika diizinkan, render halaman yang diminta (children)
  if (isAllowed) {
    return children;
  }

  // 4. Jika tidak diizinkan, tendang mereka kembali ke halaman utama
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;