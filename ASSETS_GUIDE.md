# Panduan Penambahan Aset Gambar — Rasa Pulang

Dokumen ini menjelaskan struktur folder, konvensi penamaan file seluruh 40 produk, aset galeri detail produk, rasio aspek yang direkomendasikan, serta cara memperbarui konfigurasi gambar untuk website **Rasa Pulang**.

---

## 1. Lokasi Folder Gambar Produk & Galeri

### A. Foto Utama Seluruh Produk (40 Produk)
Disimpan di dalam:
```
public/images/rasa-pulang/products/
```

### B. Foto Tambahan / Galeri Detail Produk
Disimpan pada subfolder masing-masing produk di:
```
public/images/rasa-pulang/products/details/[slug-produk]/
```
Contoh untuk produk referensi utama `keripik-pisang-original`:
```
public/images/rasa-pulang/products/details/keripik-pisang-original/
├── front.webp        # Foto tampak depan kemasan
├── close-up.webp     # Detail tekstur kerenyahan produk
├── serving.webp      # Saran penyajian di wadah / mangkok
└── back.webp         # Foto tampak belakang kemasan (nutrisi/informasi)
```

Rekomendasi spesifikasi foto:
- **Rasio:** Persegi 1:1
- **Dimensi minimal:** 800 × 800 px (optimal: 1000 × 1000 px)
- **Format:** WebP (sangat direkomendasikan), JPG, atau PNG
- **Ukuran file maksimal:** 2 MB per gambar

---

## 2. Mapping Galeri Detail Produk Utama (`keripik-pisang-original`)

| Posisi | Slot Galeri | Path File | Label Placeholder Jika Belum Ada |
|:---:|---|---|---|
| **0** | Foto Utama | `/images/rasa-pulang/products/keripik-pisang-original.webp` | `Foto produk` |
| **1** | Tambahan 1 | `/images/rasa-pulang/products/details/keripik-pisang-original/front.webp` | `Foto depan` |
| **2** | Tambahan 2 | `/images/rasa-pulang/products/details/keripik-pisang-original/close-up.webp` | `Detail produk` |
| **3** | Tambahan 3 | `/images/rasa-pulang/products/details/keripik-pisang-original/serving.webp` | `Penyajian` |
| **4** | Tambahan 4 | `/images/rasa-pulang/products/details/keripik-pisang-original/back.webp` | `Foto belakang` |

---

## 3. Daftar Nama File Seluruh 40 Produk Katalog

| No | SKU | Nama Produk | Kategori | Nama File WebP Utama |
|:---:|:---:|---|---|---|
| 1 | RP-001 | Keripik Pisang Original 250 g | Camilan Manis | `keripik-pisang-original.webp` |
| 2 | RP-002 | Kerupuk Udang 200 g | Keripik & Kerupuk | `kerupuk-udang.webp` |
| 3 | RP-003 | Bandeng Crispy 150 g | Oleh-oleh Daerah | `bandeng-crispy.webp` |
| 4 | RP-004 | Stik Bawang 250 g | Camilan Gurih | `stik-bawang.webp` |
| 5 | RP-005 | Keripik Pisang Cokelat 250 g | Camilan Manis | `keripik-pisang-cokelat.webp` |
| 6 | RP-006 | Kue Semprit 250 g | Camilan Manis | `kue-semprit.webp` |
| 7 | RP-007 | Paket Oleh-oleh Keluarga | Paket & Hampers | `paket-oleh-oleh-keluarga.webp` |
| 8 | RP-008 | Hampers Rasa Pulang | Paket & Hampers | `hampers-rasa-pulang.webp` |
| 9 | RP-009 | Keripik Singkong Balado 250 g | Camilan Gurih | `keripik-singkong-balado.webp` |
| 10 | RP-010 | Kacang Bawang 250 g | Camilan Gurih | `kacang-bawang.webp` |
| 11 | RP-011 | Kerupuk Ikan 200 g | Keripik & Kerupuk | `kerupuk-ikan.webp` |
| 12 | RP-012 | Bagelen Mentega 200 g | Camilan Manis | `bagelen-mentega.webp` |
| 13 | RP-013 | Kue Kacang 250 g | Camilan Manis | `kue-kacang.webp` |
| 14 | RP-014 | Kerupuk Tengiri Spesial 200 g | Keripik & Kerupuk | `kerupuk-tengiri.webp` |
| 15 | RP-015 | Keripik Tempe Renyah 200 g | Keripik & Kerupuk | `keripik-tempe-renyah.webp` |
| 16 | RP-016 | Kerupuk Puli Sidoarjo 250 g | Keripik & Kerupuk | `kerupuk-puli-sidoarjo.webp` |
| 17 | RP-017 | Keripik Sukun Gurih 200 g | Keripik & Kerupuk | `keripik-sukun-gurih.webp` |
| 18 | RP-018 | Rempeyek Kacang Daun Jeruk 200 g | Keripik & Kerupuk | `rempeyek-kacang.webp` |
| 19 | RP-019 | Kerupuk Kulit Sapi Asli 150 g | Keripik & Kerupuk | `kerupuk-kulit-sapi.webp` |
| 20 | RP-020 | Madumongso Khas Jatim 250 g | Camilan Manis | `madumongso-khas-jatim.webp` |
| 21 | RP-021 | Roti Sisir Mentega Gula 250 g | Camilan Manis | `roti-sisir-mentega.webp` |
| 22 | RP-022 | Jenang Wijen Manis Legit 250 g | Camilan Manis | `jenang-kudus-wijen.webp` |
| 23 | RP-023 | Pia Basah Cokelat Keju 300 g | Camilan Manis | `pia-basah-cokelat-keju.webp` |
| 24 | RP-024 | Ladu Manis Ketan 200 g | Camilan Manis | `ladu-manis-ketan.webp` |
| 25 | RP-025 | Bolu Kering Mini Renyah 200 g | Camilan Manis | `bolu-kering-mini.webp` |
| 26 | RP-026 | Kacang Telur Spesial 250 g | Camilan Gurih | `kacang-telur-spesial.webp` |
| 27 | RP-027 | Pastel Kering Abon Sapi 200 g | Camilan Gurih | `pastel-kering-abon-sapi.webp` |
| 28 | RP-028 | Pangsit Goreng Renyah 200 g | Camilan Gurih | `pangsit-goreng-renyah.webp` |
| 29 | RP-029 | Emping Melinjo Manis Pedas 200 g | Camilan Gurih | `emping-melinjo-manis-pedas.webp` |
| 30 | RP-030 | Marning Jagung Gurih 250 g | Camilan Gurih | `marning-jagung-gurih.webp` |
| 31 | RP-031 | Kacang Mede Asin Bawang 200 g | Camilan Gurih | `kacang-mede-asin-bawang.webp` |
| 32 | RP-032 | Bandeng Asap Khas Sidoarjo 300 g | Oleh-oleh Daerah | `bandeng-asap-khas-sidoarjo.webp` |
| 33 | RP-033 | Petis Udang Super Sidoarjo 250 g | Oleh-oleh Daerah | `petis-udang-super-sidoarjo.webp` |
| 34 | RP-034 | Sambal Petis Asli Sidoarjo 200 g | Oleh-oleh Daerah | `sambal-petis-asli-sidoarjo.webp` |
| 35 | RP-035 | Terasi Udang Matang 150 g | Oleh-oleh Daerah | `terasi-udang-matang.webp` |
| 36 | RP-036 | Otak-otak Bandeng Siap Saji 250 g | Oleh-oleh Daerah | `otak-otak-bandeng-siap-saji.webp` |
| 37 | RP-037 | Krupuk Kupang Khas Sidoarjo 200 g | Oleh-oleh Daerah | `krupuk-kupang-khas-sidoarjo.webp` |
| 38 | RP-038 | Paket Camilan Sore Berdua | Paket & Hampers | `paket-camilan-sore-berdua.webp` |
| 39 | RP-039 | Paket Oleh-oleh Gurih Renyah | Paket & Hampers | `paket-oleh-oleh-gurih-renyah.webp` |
| 40 | RP-040 | Hampers Premium Khas Delta | Paket & Hampers | `hampers-premium-khas-delta.webp` |

---

## 4. Cara Membuka Halaman Detail Produk

- **Dari Halaman Web:** Klik kartu produk atau tombol *"Lihat Detail"* di Beranda maupun Katalog Produk.
- **Melalui URL Langsung:**
  - `http://localhost:5173/produk/keripik-pisang-original-250-g`
  - `http://localhost:5173/produk/kerupuk-udang-200-g`
  - (Atau gunakan slug produk lain sesuai tabel di atas).

---

## 5. Aset Halaman Tentang Kami (About Us)

Halaman Tentang Kami (`/tentang-kami`) memiliki 3 slot gambar utama yang telah dikonfigurasi:

| No | Komponen / Slot | Path File Rekomendasi | Rasio Aspek | Rekomendasi Dimensi | Label Fallback Jika Kosong |
|:---:|---|---|:---:|:---:|---|
| 1 | **Foto Toko Landscape Besar** | `public/images/rasa-pulang/store/store-interior.webp` | `2.1 / 1` | 1600 × 760 px (min. 1200 × 570 px) | `Foto interior toko` |
| 2 | **Kartu Pembelian Satuan** | `public/images/rasa-pulang/about/pembelian-satuan.webp` | `1.8 / 1` | 1000 × 560 px (min. 800 × 440 px) | `Foto camilan satuan` |
| 3 | **Kartu Paket Oleh-oleh & Hampers** | `public/images/rasa-pulang/about/paket-hampers.webp` | `1.8 / 1` | 1000 × 560 px (min. 800 × 440 px) | `Foto paket oleh-oleh & hampers` |

> **Catatan:**
> - File `store-interior.webp` sudah tersedia di dalam folder toko.
> - Folder `public/images/rasa-pulang/about/` telah disiapkan untuk menampung `pembelian-satuan.webp` dan `paket-hampers.webp`.
> - Apabila file belum dimasukkan oleh Anda, komponen `ImageWithFallback` secara otomatis menampilkan placeholder kartu elegan warna krem bernuansa hangat dengan label deskriptif tanpa memicu error 404 pada konsol browser.

---

## 6. Cara Membuka Halaman Tentang Kami

- **Dari Menu Navigasi Header/Footer:** Klik link **"Tentang Kami"** pada navbar maupun footer di setiap halaman.
- **Melalui URL Langsung:**
  - `http://localhost:5173/tentang-kami`

---

## 7. Aset & Konfigurasi Halaman Kontak dan Lokasi (`/kontak`)

Halaman Kontak dan Lokasi menampilkan panel informasi toko serta foto tampak depan toko berorientasi portrait:

### A. Spesifikasi Foto Depan Toko
- **Path File Rekomendasi:** `public/images/rasa-pulang/store/store-front.webp`
- **URL Path pada Komponen:** `/images/rasa-pulang/store/store-front.webp`
- **Orientasi:** Portrait (tegak)
- **Rasio Aspek Rekomendasi:** `0.75 / 1` (3:4) atau `0.7 / 1` agar sejajar dengan tinggi panel informasi di sebelah kiri pada desktop.
- **Dimensi Rekomendasi:** 1000 × 1400 px hingga 1200 × 1600 px (minimal 800 × 1100 px).
- **Format:** WebP (sangat direkomendasikan), JPG, atau PNG.

### B. Konfigurasi Path, Alt Text, dan Object Position
Seluruh konfigurasi foto depan toko diatur secara terpusat di `src/data/contactData.js`:
```javascript
export const storeFrontPhotoData = {
  path: '/images/rasa-pulang/store/store-front.webp',
  alt: 'Tampak depan toko Rasa Pulang di Sidoarjo dengan plang nama dan etalase camilan',
  placeholderLabel: 'Foto depan toko',
  caption: 'Ilustrasi toko untuk proyek portofolio.',
  aspectRatio: '0.75 / 1',
  objectPosition: 'center', // Dapat disesuaikan ke 'top', 'bottom', atau koordinat persentase (misal: '50% 30%')
};
```

### C. Lokasi Konfigurasi Kontak & Informasi Toko
- **Data Kontak Utama:** Dikelola terpusat di `src/data/homeData.js` (`siteConfig.contact`).
  - `whatsAppNumber`: Nomor WhatsApp toko format internasional (contoh: `'6281234567890'`). Default `null` (mode simulasi aman).
  - `instagramUrl`: Tautan profil Instagram resmi. Default `null`.
  - `googleMapsUrl`: Tautan pencarian Google Maps wilayah Sidoarjo (`https://www.google.com/maps/search/?api=1&query=Sidoarjo%2C%20Jawa%20Timur`).
- **Data Teks & Detail Halaman Kontak:** Dikelola di `src/data/contactData.js` (`contactInformationData`, `contactSimulationNoticeData`, `catalogCtaData`).

### D. Langkah Agar Foto Baru Terdeteksi
1. Masukkan file gambar Anda ke dalam folder:
   ```
   public/images/rasa-pulang/store/store-front.webp
   ```
2. Karena proyek menggunakan Vite dengan `import.meta.glob` otomatis pada `ImageWithFallback`, browser akan langsung mendeteksi file yang baru ditambahkan setelah halaman di-refresh (F5).
3. Jika mengganti ekstensi file (misal dari `.webp` ke `.png` atau `.jpg`), perbarui baris `path` di `src/data/contactData.js`.

---

## 8. Cara Membuka Halaman Kontak dan Lokasi

- **Dari Menu Navigasi Header/Footer:** Klik link **"Kontak"** pada navbar maupun footer di setiap halaman.
- **Dari Tombol di Beranda:** Klik tombol **"Lihat Kontak & Lokasi"** pada section lokasi toko di Beranda.
- **Melalui URL Langsung:**
  - `http://localhost:5173/kontak`

---

## 9. Aset & Akun Demo Halaman Login Dashboard (`/login`)

Halaman Login Dashboard menggunakan panel visual foto interior toko pada sisi kiri:

### A. Spesifikasi Foto Interior Login
- **Path File Rekomendasi:** `public/images/rasa-pulang/auth/login-rasa-pulang.webp`
- **URL Path pada Komponen:** `/images/rasa-pulang/auth/login-rasa-pulang.webp`
- **Orientasi:** Landscape / Foto Suasana Toko
- **Rasio Aspek Rekomendasi:** Sekitar `4:3` (atau rasio landscape ~1.3:1)
- **Dimensi Rekomendasi:** 1200 × 900 px hingga 1600 × 1200 px (minimal 800 × 600 px)
- **Format:** WebP (sangat direkomendasikan), JPG, atau PNG

### B. Konfigurasi Path & Teks Visual
Dikelola di `src/data/demoAccounts.js`:
```javascript
export const loginVisualConfig = {
  imagePath: '/images/rasa-pulang/auth/login-rasa-pulang.webp',
  alt: 'Suasana interior toko Rasa Pulang dengan display camilan dan paket hampers cantik',
  placeholderLabel: 'Foto interior toko',
  title: 'Kelola katalog, sambut lebih banyak cerita.',
  description: 'Ruang kerja pemilik dan staf untuk memperbarui produk Rasa Pulang.',
  objectPosition: 'center',
};
```

### C. Kredensial Akun Dummy untuk Pengujian Login
Data akun pengujian simulasi terpusat di `src/data/demoAccounts.js`:

| Peran | Nama | Email Pengujian | Password Demo | Status |
|---|---|---|---|:---:|
| **Pemilik** | Dina Prameswari | `pemilik@rasapulang.example` | `DemoPemilik123!` | Aktif |
| **Staf** | Staf Rasa Pulang | `staf@rasapulang.example` | `DemoStaf123!` | Aktif |
| **Staf Nonaktif** | Staf Nonaktif | `nonaktif@rasapulang.example` | `DemoNonaktif123!` | Nonaktif (Untuk tes penolakan) |

> **Catatan Pengujian:**
> - Email di-normalisasi secara otomatis (huruf besar/kecil tidak berpengaruh dan spasi depan/belakang di-trim).
> - Password bersifat *case-sensitive*.
> - Tidak ada kredensial atau token yang disimpan ke `localStorage` atau `sessionStorage`.

---

## 10. Cara Membuka Halaman Login

- **Melalui URL Langsung:** [http://localhost:5173/login](http://localhost:5173/login)
- Setelah login berhasil, halaman otomatis mengalihkan ke `/dashboard`.

---

## 11. Kebutuhan Fallback Server untuk Hosting Statis

Aplikasi ini menggunakan Single Page Application (SPA) routing berbasis HTML5 History API. Jika di-deploy ke server hosting statis (seperti Netlify, Vercel, Apache, atau Nginx), pastikan konfigurasi rewrite/fallback mengarahkan semua path (misal: `/login`, `/admin`, `/dashboard`, `/kontak`, `/tentang-kami`, `/produk/*`, dan `/katalog`) kembali ke `index.html` agar direct refresh atau akses URL langsung tidak menghasilkan status HTTP 404 dari web server:
- **Netlify (`_redirects`):** `/* /index.html 200`
- **Vercel (`vercel.json`):** rewrites to `/index.html`
- **Apache (`.htaccess`):** `RewriteRule ^ index.html [L]`
- **Nginx (`nginx.conf`):** `try_files $uri $uri/ /index.html;`
