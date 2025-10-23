# 📦 Pusat Layanan Kemasan

[![Lisensi](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status Repositori](https://img.shields.io/badge/Status-Development-orange.svg)]()
[![Bahasa Utama](https://img.shields.io/github/languages/top/viabdillah/Pusat-Layanan-Kemasan)](https://github.com/viabdillah/Pusat-Layanan-Kemasan)

Sistem Informasi ini dirancang untuk mengelola dan memfasilitasi kebutuhan layanan kemasan secara terpadu, memisahkan fungsionalitas Frontend dan Backend dalam arsitektur Monorepo.

---

## 🛠️ Tumpukan Teknologi (Tech Stack)

Proyek ini dibangun menggunakan arsitektur full-stack JavaScript yang modern dengan teknologi inti sebagai berikut:

| Kategori | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | Library JavaScript untuk membangun antarmuka pengguna di sisi klien. |
| | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | Build tool modern yang digunakan untuk pengembangan frontend yang cepat. |
| | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | Framework CSS utility-first untuk styling yang responsif dan cepat. |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) | Lingkungan runtime JavaScript untuk menjalankan logika server. |
| | ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | Framework Node.js minimalis untuk membangun API yang kuat. |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white) | Sistem manajemen database relasional. |
| | ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white) | Next-generation ORM untuk interaksi database yang aman dan terstruktur. |
| **Lain-lain** | ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) | Sistem kontrol versi. |
| | ![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) | Hosting repositori kode. |

---

## 🚀 Instalasi dan Menjalankan Proyek

Proyek ini dipisahkan menjadi dua bagian: **`client`** (Frontend) dan **`server`** (Backend). Pastikan Anda telah menginstal **Node.js** dan **Git** sebelum melanjutkan.

### Persiapan Database

1.  Pastikan server **MySQL** Anda berjalan.
2.  Buat database baru (misalnya: `pusat_kemasan_db`).
3.  Konfigurasi koneksi database di file **`server/.env`**.
4.  Jalankan migrasi database menggunakan Prisma (dari dalam folder **`server`**):
    ```bash
    npx prisma migrate dev --name init
    ```

### 1. Backend (Server)

1.  Masuk ke direktori server:
    ```bash
    cd server
    ```
2.  Instal dependensi:
    ```bash
    npm install
    ```
3.  Jalankan server dalam mode development:
    ```bash
    npm run dev
    # Biasanya berjalan di http://localhost:5000
    ```

### 2. Frontend (Client)

1.  Buka terminal baru dan masuk ke direktori client:
    ```bash
    cd client
    ```
2.  Instal dependensi:
    ```bash
    npm install
    ```
3.  Jalankan aplikasi client:
    ```bash
    npm run dev
    # Biasanya berjalan di http://localhost:5173
    ```

Aplikasi kini dapat diakses di *port* yang ditampilkan oleh Vite (biasanya `http://localhost:5173`).

---

## 📂 Struktur Proyek

Struktur monorepo memudahkan pengelolaan kode klien dan server secara terpisah namun dalam satu repositori:
