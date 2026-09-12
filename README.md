# Belajar Vibe Coding - Backend Starter

Starter template backend modern menggunakan **Bun**, **ElysiaJS**, **Drizzle ORM**, dan **MySQL**.

## 🚀 Tech Stack
- **Runtime**: [Bun](https://bun.sh)
- **Web Framework**: [ElysiaJS](https://elysiajs.com)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team)
- **Database Driver**: `mysql2`
- **Database Tooling**: `drizzle-kit`

## 📁 Struktur Folder
```text
.
├── src/
│   ├── db/
│   │   ├── index.ts          # Inisialisasi pool MySQL & Drizzle instance
│   │   └── schema.ts         # Definisi skema tabel Drizzle
│   └── index.ts              # Entry point server Elysia & REST API
├── drizzle.config.ts         # Konfigurasi Drizzle Kit untuk MySQL
├── .env.example              # Template variabel lingkungan
├── package.json
└── tsconfig.json
```

## 🛠️ Cara Penggunaan

### 1. Instalasi Dependensi
```bash
bun install
```

### 2. Konfigurasi Lingkungan
Salin file `.env.example` menjadi `.env` dan sesuaikan kredensial MySQL Anda:
```bash
cp .env.example .env
```

### 3. Menjalankan Server Development
```bash
bun run dev
```
Server akan berjalan di `http://localhost:3000`.

### 4. Perintah Database (Drizzle Kit)
- **Generate Migrations**: `bun run db:generate`
- **Push Schema ke Database Langsung**: `bun run db:push`
- **Buka Drizzle Studio**: `bun run db:studio`

## 📡 Endpoint API
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/` | API status & version |
| `GET` | `/health` | Health check endpoint |
| `GET` | `/users` | Mengambil semua daftar user |
| `POST` | `/users` | Menambahkan user baru |
| `GET` | `/users/:id` | Mengambil user berdasarkan ID |
