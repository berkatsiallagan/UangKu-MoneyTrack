# MoneyTrack - Aplikasi Pengelolaan Keuangan Pribadi

![MoneyTrack Screenshot](https://via.placeholder.com/800x400.png?text=MoneyTrack+Screenshot)

MoneyTrack adalah aplikasi web untuk mengelola keuangan pribadi dengan fitur pencatatan transaksi, perhitungan saldo, dan visualisasi data keuangan dalam bentuk grafik.

## Fitur Utama

- 📊 **Dashboard Keuangan**:
  - Tampilan saldo total
  - Ringkasan pemasukan dan pengeluaran
  - Grafik perkembangan saldo
  - Diagram kategori pengeluaran

- 💰 **Manajemen Transaksi**:
  - Tambah transaksi pemasukan/pengeluaran
  - Kategori transaksi yang dapat disesuaikan
  - Deskripsi transaksi
  - Tanggal transaksi

- 📈 **Visualisasi Data**:
  - Grafik garis perkembangan saldo (7 hari terakhir)
  - Diagram donat pengeluaran per kategori

- 🔒 **Penyimpanan Data**:
  - Data disimpan secara lokal di browser (localStorage)
  - Tidak memerlukan server atau database eksternal

- 🎨 **Antarmuka Pengguna**:
  - Desain responsif (mobile-friendly)
  - Notifikasi interaktif dengan SweetAlert2
  - Tema warna yang nyaman dilihat

## Teknologi yang Digunakan

- **Frontend**:
  - HTML5, CSS3, JavaScript ES6
  - [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
  - [Chart.js](https://www.chartjs.org/) - Library untuk visualisasi data
  - [SweetAlert2](https://sweetalert2.github.io/) - Library untuk notifikasi yang indah
  - [Font Awesome](https://fontawesome.com/) - Ikon yang digunakan di aplikasi

## Cara Menggunakan

1. **Clone repository** atau download source code:
   ```bash
   git clone https://github.com/username/moneytrack.git
   ```

2. **Buka file `index.html`** di browser favorit Anda:
   - Tidak memerlukan instalasi atau dependensi tambahan
   - Bekerja di semua browser modern

3. **Mulai mencatat transaksi**:
   - Isi form di sidebar kiri
   - Pilih jenis transaksi (pemasukan/pengeluaran)
   - Masukkan jumlah, kategori, tanggal, dan deskripsi
   - Klik "Tambah Transaksi"

4. **Lihat grafik dan statistik**:
   - Grafik akan diperbarui otomatis setelah menambah transaksi
   - Gunakan filter untuk melihat jenis transaksi tertentu

## Struktur File

```
moneytrack/
├── index.html        # File HTML utama
├── app.js            # Logika aplikasi JavaScript
├── README.md         # Dokumentasi ini
└── assets/           # Folder untuk aset tambahan (jika ada)
```

## Kontribusi

Kontribusi selalu diterima! Berikut cara berkontribusi:

1. Fork proyek ini
2. Buat branch fitur (`git checkout -b fitur-baru`)
3. Commit perubahan Anda (`git commit -am 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## Screenshot

![Dashboard](https://via.placeholder.com/400x300.png?text=Dashboard)
![Form Transaksi](https://via.placeholder.com/400x300.png?text=Form+Transaksi)
![Grafik](https://via.placeholder.com/400x300.png?text=Grafik+Keuangan)

## Catatan

Aplikasi ini menyimpan data di localStorage browser, artinya:
- Data hanya tersedia di browser yang sama
- Data bisa hilang jika cache browser dibersihkan
- Untuk penyimpanan permanen, pertimbangkan untuk menambahkan backend

---

Dibuat dengan ❤️ untuk membantu mengelola keuangan pribadi dengan lebih baik.