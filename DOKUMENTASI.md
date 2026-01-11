# ZZZ Character Analyzer - Dokumentasi

## 📋 Deskripsi
Website untuk analisis tier list karakter game Zenless Zone Zero dengan sistem login dan role-based access control.

## 🚀 Cara Menjalankan

### Install Dependencies
```bash
npm install
cd backend
npm install
cd ..
```

### Jalankan Server (Backend + Frontend)
```bash
npm run dev:all
```

### Akses Website
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## 🔐 Login Credentials

### Admin (bisa edit tier list)
- Username: `admin`
- Password: `Admin123`
- Email: `admin@zzz.com`

### User Biasa (hanya bisa lihat)
Daftar melalui Sign Up dengan:
- Username: bebas (unik)
- Email: harus ada @, ., dan com
- Password: min 6 karakter, ada huruf BESAR dan kecil

## ✨ Fitur

### Untuk Semua User
- ✅ Lihat tier list karakter
- ✅ Lihat detail karakter
- ✅ Sign up & login

### Khusus Admin
- ✅ Tambah karakter baru
- ✅ Edit tier karakter
- ✅ Hapus karakter

## 📂 Database

### auth.db
- Data user (username, email, password, role)
- Tidak hilang saat reset karakter

### zzz_characters.db  
- Data karakter (nama, tier, role, image)
- Data tier list
- Data rating

## 🎮 Karakter Default (11 karakter)

**T0 Tier:**
- Jane Doe (Attacker)
- Yixuan (Attacker)
- Astra Yao (Support)
- Yuzuha (Support)
- Lucia (Support)
- Trigger (Stun)
- Ju fufu (Stun)
- Dialyn (Stun)

**T0.5 Tier:**
- Miyabi (Attacker)
- Seed (Attacker)
- Alice (Attacker)

## 📝 API Endpoints

### Auth
- POST `/api/auth/signup` - Daftar user baru
- POST `/api/auth/login` - Login user

### Characters (Public)
- GET `/api/characters` - List semua karakter
- GET `/api/characters/:id` - Detail karakter

### Characters (Admin Only)
- POST `/api/characters` - Tambah karakter
- PUT `/api/characters/:id` - Edit karakter
- DELETE `/api/characters/:id` - Hapus karakter

## ⚙️ Tech Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: SQLite (sql.js)
- **Auth**: Simple username/password (plain text)

## 📁 Struktur Project
```
ZZZ-character-analyzer/
├── backend/
│   ├── database/
│   │   ├── auth.db              # Database user
│   │   ├── zzz_characters.db    # Database karakter
│   │   ├── auth_schema.sql      # Schema auth
│   │   └── schema.sql           # Schema karakter
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   └── server.js
├── src/
│   ├── components/
│   │   ├── LoginModal.jsx       # Login/Signup
│   │   ├── AdminPanel.jsx       # Panel admin
│   │   ├── Header.jsx
│   │   └── tierlist.jsx
│   └── App.jsx
└── package.json
```

## 🛠️ Reset Database

### Reset Karakter (User tetap ada)
```bash
cd backend/database
del zzz_characters.db
cd ../..
npm run dev:all
```

### Reset Semua (termasuk user)
```bash
cd backend/database
del auth.db
del zzz_characters.db
cd ../..
npm run dev:all
```

## 📌 Catatan
- Password disimpan plain text (untuk production gunakan bcrypt)
- Gunakan JWT token untuk auth yang lebih aman
- Database SQLite untuk development, gunakan PostgreSQL/MySQL untuk production
