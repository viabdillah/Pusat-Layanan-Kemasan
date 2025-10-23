// client/src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import LoginPage from "../pages/LoginPage.jsx";

// 1. Impor komponen baru kita
import Dashboard from "../pages/Dashboard.jsx";
import UserManagement from "../pages/Admin/UserManagement.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PelangganList from "../pages/PelangganList.jsx";
import PelangganDetail from "../pages/PelangganDetail.jsx";
import PesananList from "../pages/PesananList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 2. Set Dashboard sebagai halaman utama (index)
      {
        index: true,
        element: <Dashboard />,
      },
      // 3. Buat rute baru untuk admin
      {
        path: "admin/users", // -> /admin/users
        element: (
          // 4. Bungkus halaman dengan ProtectedRoute
          <ProtectedRoute allowedRoles={['admin']}>
            <UserManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "pelanggan",
        element: (
          <ProtectedRoute allowedRoles={["admin", "kasir", "manajer"]}>
            <PelangganList />
          </ProtectedRoute>
        ),
      },
      {
        path: "pelanggan/:id", // Rute dinamis
        element: (
          <ProtectedRoute allowedRoles={["admin", "kasir", "manajer"]}>
            <PelangganDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "pesanan",
        element: (
          <ProtectedRoute allowedRoles={["admin", "kasir", "manajer"]}>
            <PesananList />
          </ProtectedRoute>
        ),
      },
      // (Nanti kita tambahkan rute lain di sini)
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;