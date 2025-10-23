// client/src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
// Hapus impor App.jsx
import './assets/index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { RouterProvider } from 'react-router-dom' // 1. Impor RouterProvider
import router from './router/index.jsx' // 2. Impor router kita

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)