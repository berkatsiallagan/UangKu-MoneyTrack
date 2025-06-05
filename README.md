# MoneyTrack - Aplikasi Pengelolaan Keuangan Pribadi

![MoneyTrack Screenshot](https://via.placeholder.com/1200x600.png?text=MoneyTrack+Dashboard+Dark+and+Light+Mode)

MoneyTrack adalah aplikasi web modern untuk mengelola keuangan pribadi dengan antarmuka yang intuitif, fitur lengkap, dan visualisasi data yang powerful.

## ✨ Fitur Utama

### 📊 Dashboard Komprehensif
- **Tampilan Saldo Real-time** dengan animasi
- **Ringkasan Keuangan** (Pemasukan vs Pengeluaran)
- **Grafik Interaktif**:
  - Grafik garis perkembangan saldo (Mingguan/Bulanan/Tahunan)
  - Diagram donat pengeluaran per kategori
- **Mode Gelap/Terang** yang bisa disesuaikan

### 💰 Manajemen Transaksi Canggih
- **Tambah Transaksi** dengan form yang user-friendly
- **Multi-Kategori** (Gaji, Investasi, Makanan, Transportasi, dll)
- **Sistem Pencatatan** yang lengkap:
  - Jenis transaksi (Pemasukan/Pengeluaran)
  - Jumlah, kategori, tanggal, dan deskripsi
- **Filter Cerdas**:
  - Filter berdasarkan jenis (Semua/Pemasukan/Pengeluaran)
  - Filter periode (Hari Ini/Minggu Ini/Bulan Ini)
- **Paginasi** untuk navigasi data yang mudah

### 📈 Visualisasi Data Powerfull
- **Grafik Dinamis** yang diperbarui otomatis
- **Pilihan Periode** untuk analisis trend:
  - 7 hari terakhir
  - Bulan berjalan
  - Tahun berjalan
- **Diagram Kategori** untuk memahami pola pengeluaran

### 🛠️ Fitur Tambahan
- **Pencetakan Laporan** (Print-friendly)
- **Tombol Scroll-to-Top** untuk navigasi mudah
- **Sistem Notifikasi** dengan SweetAlert2
- **Refresh Data** instan
- **Responsive Design** yang bekerja di semua device

## 🚀 Teknologi yang Digunakan

- **Frontend**:
  - HTML5, CSS3, JavaScript ES6+
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [Chart.js](https://www.chartjs.org/) - Visualisasi data interaktif
  - [SweetAlert2](https://sweetalert2.github.io/) - Notifikasi yang elegan
  - [Font Awesome](https://fontawesome.com/) - Ikon modern
  - [Animate.css](https://animate.style/) - Animasi CSS

- **Fitur Browser**:
  - localStorage untuk penyimpanan data
  - Web API untuk manipulasi tanggal dan form
  - Responsive Design dengan CSS Grid dan Flexbox

## 📦 Cara Menggunakan

### Instalasi
1. **Clone repository** atau download source code:
   ```bash
   git clone https://github.com/username/moneytrack.git
   cd moneytrack
   ```

2. **Buka file `index.html`** di browser favorit Anda:
   - Tidak memerlukan instalasi tambahan
   - Bekerja di semua browser modern (Chrome, Firefox, Edge, Safari)

### Penggunaan Dasar
1. **Menambahkan Transaksi**:
   - Isi form di sidebar
   - Pilih jenis transaksi (Pemasukan/Pengeluaran)
   - Masukkan jumlah, pilih kategori, tanggal, dan deskripsi
   - Klik "Tambah Transaksi"

2. **Melihat Grafik**:
   - Grafik akan otomatis terupdate
   - Gunakan tombol periode untuk melihat trend berbeda

3. **Mengelola Data**:
   - Gunakan filter untuk melihat transaksi tertentu
   - Hapus transaksi yang tidak diperlukan
   - Cetak laporan dengan tombol print

### Fitur Lanjutan
- **Mode Gelap**: Klik ikon bulan/matahari di header
- **Ekspor Data**: Tombol ekspor di header (coming soon)
- **Refresh Data**: Klik ikon refresh di card saldo

## 🖥️ Tampilan Antarmuka

| Light Mode | Dark Mode |
|------------|-----------|
| ![Light Mode](https://via.placeholder.com/600x400.png?text=MoneyTrack+Light+Mode) | ![Dark Mode](https://via.placeholder.com/600x400.png?text=MoneyTrack+Dark+Mode) |

| Desktop | Mobile |
|---------|--------|
| ![Desktop](https://via.placeholder.com/600x400.png?text=Desktop+View) | ![Mobile](https://via.placeholder.com/300x500.png?text=Mobile+View) |

## 📂 Struktur File

```
moneytrack/
├── index.html        # File HTML utama
├── app.js            # Logika aplikasi JavaScript
├── README.md         # Dokumentasi ini
└── assets/           # Folder untuk aset tambahan
    ├── css/          # CSS tambahan (jika ada)
    └── images/       # Gambar untuk aplikasi
```

## 🤝 Berkontribusi

Kontribusi sangat diterima! Berikut cara berkontribusi:

1. Fork proyek ini
2. Buat branch fitur (`git checkout -b fitur-baru`)
3. Commit perubahan Anda (`git commit -am 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

**Yang sedang dikembangkan**:
- [ ] Fitur ekspor data (CSV/Excel)
- [ ] Sinkronisasi cloud
- [ ] Multi-user support
- [ ] Budgeting tools

## 📜 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## 📌 Catatan Penting

Aplikasi ini menggunakan **localStorage browser** untuk menyimpan data, yang berarti:
- Data hanya tersedia di browser yang sama
- Data bisa hilang jika cache browser dibersihkan
- Untuk penyimpanan permanen, pertimbangkan untuk menambahkan backend

---

Dikembangkan dengan ❤️ oleh [Nama Anda] | [GitHub Profile](https://github.com/username) | [Twitter](https://twitter.com/username)