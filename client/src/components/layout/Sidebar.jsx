// client/src/components/layout/Sidebar.jsx

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { 
  HiChartPie, 
  HiUsers, 
  HiCollection, 
  HiMenuAlt2, 
  HiX,
  HiOutlineIdentification,
} from 'react-icons/hi';

const Sidebar = () => {
  const { authUser } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Definisikan link navigasi berdasarkan role
  const navLinks = [
    { name: 'Dashboard', path: '/', icon: HiChartPie, roles: ['admin', 'kasir', 'operator', 'desainer', 'manajer'] },
    { name: 'Manajemen User', path: '/admin/users', icon: HiUsers, roles: ['admin'] },
    {
      name: "Pesanan",
      path: "/pesanan",
      icon: HiCollection, // Ikon ini masih relevan
      roles: ["admin", "kasir", "manajer"],
    },
    {
      name: "Pelanggan",
      path: "/pelanggan",
      icon: HiOutlineIdentification,
      roles: ["admin", "kasir", "manajer"],
    },
    // Tambahkan link lain di sini
  ];

  const filteredLinks = navLinks.filter(link => link.roles.includes(authUser.role));

  const LinkItems = () => (
    <nav className="flex-1 px-4 py-4 space-y-2">
      {filteredLinks.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          end
          // 'className' prop tetap sama, ini sudah benar
          className={({ isActive }) =>
            `group flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`
          }
          onClick={() => setIsMobileOpen(false)}
        >
          {({ isActive }) => (
            <>
              <link.icon 
                className={`w-6 h-6 mr-3 transition-transform duration-300 ${
                  !isActive ? 'group-hover:scale-110' : ''
                }`} 
              />
              <span className="font-medium">{link.name}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <>
      {/* Tombol Menu Mobile (Floating) */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed z-20 bottom-6 right-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg lg:hidden"
      >
        {isMobileOpen ? <HiX size={24} /> : <HiMenuAlt2 size={24} />}
      </button>

      {/* Sidebar Desktop (statis) */}
      <aside className="hidden lg:flex lg:flex-col w-64 h-screen bg-white shadow-lg">
        <div className="flex items-center justify-center h-20 border-b">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            KemasanApp
          </h1>
        </div>
        <LinkItems />
      </aside>
      
      {/* Sidebar Mobile (Overlay) */}
      <div
        className={`fixed inset-0 z-10 flex flex-col w-64 h-full bg-white shadow-xl lg:hidden transform ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between h-20 p-4 border-b">
           <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            KemasanApp
          </h1>
          <button onClick={() => setIsMobileOpen(false)}>
            <HiX className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <LinkItems />
      </div>
    </>
  );
};

export default Sidebar;