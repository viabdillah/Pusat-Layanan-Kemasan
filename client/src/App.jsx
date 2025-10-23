// client/src/App.jsx

import { useAuth } from "./context/AuthContext.jsx";
import { Outlet, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Impor Toaster
import Sidebar from "./components/layout/Sidebar.jsx";
import Header from "./components/layout/Header.jsx";

function App() {
  const { authUser } = useAuth();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {/* Container untuk popup alert kita. 
        Kita tambahkan styling untuk ikonnya.
      */}
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: '#F0FDF4', // bg-green-50
              color: '#16A34A', // text-green-600
            },
            iconTheme: {
              primary: '#22C55E', // green-500
              secondary: 'white',
            },
          },
          error: {
            style: {
              background: '#FFF1F2', // bg-red-50
              color: '#E11D48', // text-red-600
            },
            iconTheme: {
              primary: '#F43F5E', // red-500
              secondary: 'white',
            },
          },
        }}
      />

      {/* Layout Aplikasi */}
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-8">
            <Outlet /> {/* Halaman Dashboard/Lainnya akan dirender di sini */}
          </main>
        </div>
      </div>
    </>
  );
}

export default App;