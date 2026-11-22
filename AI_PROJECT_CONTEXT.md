# DOKUMEN MASTER KONTEKS & PANDUAN PENGEMBANGAN AI (AI PROJECT CONTEXT)
**Website "Rasa Pulang" — Toko Camilan & Oleh-Oleh Khas Sidoarjo**

> **Tujuan Dokumen:**  
> File ini dirancang khusus sebagai *System Prompt / Master Context* untuk model AI / LLM (Claude, ChatGPT, DeepSeek, Gemini, dll.) agar memahami arsitektur, alur navigasi, design system, palet warna, tipografi, struktur data, komponen UI, dan batasan teknis proyek secara menyeluruh. Setiap perubahan tampilan atau penambahan fitur baru **wajib mengikuti pola, gaya visual, dan konvensi yang telah ditetapkan di dokumen ini**.

---

## 1. Identitas Brand & Batasan Proyek (Scope of Work)

| Aspek | Deskripsi & Nilai |
|---|---|
| **Nama Brand** | **Rasa Pulang** |
| **Klien / Pemilik** | Dina Prameswari |
| **Bidang Usaha** | Toko oleh-oleh dan camilan kemasan UMKM di Sidoarjo, Jawa Timur |
| **Tagline** | *"Camilan pilihan, hangatnya kebersamaan."* |
| **Nuansa / Karakter Visual** | Hangat, ramah, rapi, bernuansa lokal, modern UMKM, bersih, dan konsisten |
| **Jenis Proyek** | **Frontend Single Page Application (SPA) Portofolio Simulasi** |
| **Batasan Mutlak (DO NOT BUILD)** | **TIDAK ADA** backend, Laravel, database SQL/NoSQL, REST API eksternal, otentikasi/login/register, keranjang belanja (cart), checkout/payment gateway, dashboard admin, atau penyimpanan `localStorage`. Seluruh data 100% lokal dummy data. |

---

## 2. Tech Stack & Dependensi

- **Core:** React 19 (`^19.3.1`) + Vite (`^8.3.6`)
- **Bahasa:** JavaScript modern (ESM, JSX)
- **Styling:** **Pure Modular CSS** + CSS Custom Properties (Design Tokens di `variables.css`).  
  *(Catatan: Proyek TIDAK menggunakan Tailwind atau UI framework eksternal seperti Bootstrap/MUI/Chakra. Semua styling ditulis dengan CSS murni yang terstruktur).*
- **Linter & Standar Kode:** ESLint 9/10 flat config (`eslint .`). Setiap kode baru **wajib lolos 0 error dan 0 warning**.
- **Routing:** Lightweight SPA Router berbasis HTML5 History API di [src/App.jsx](file:///c:/Projects/rasa-pulang/src/App.jsx) (`window.history.pushState` & `popstate`).
- **Penanganan Gambar:** Komponen pintar [src/components/ui/ImageWithFallback.jsx](file:///c:/Projects/rasa-pulang/src/components/ui/ImageWithFallback.jsx) yang mendeteksi file fisik dengan `import.meta.glob` Vite eager globbing. Jika gambar belum diunggah, otomatis merender placeholder krem elegan dengan icon dan label tanpa broken image browser / error 404.

---

## 3. Design System & Token Desain (`src/styles/variables.css`)

Semua komponen baru atau pembaruan tampilan **wajib** menggunakan variabel CSS ini dan tidak boleh menggunakan hardcoded hex warna acak:

### A. Palet Warna (Color Palette)
```css
:root {
  /* Palet Latar & Teks */
  --color-bg-primary: #FAF6EF;      /* Background utama seluruh halaman (krem lembut hangat) */
  --color-text-dark: #493024;       /* Teks judul & teks pekat utama (cokelat tua) */
  --color-text-muted: #6B5344;      /* Teks paragraf & deskripsi (cokelat sedang) */
  --color-text-subtle: #8A7365;     /* Teks keterangan sekunder / placeholder */

  /* Aksen Utama (Oranye Brand) */
  --color-orange: #DC722C;          /* Oranye utama untuk tombol CTA, badge aktif, link */
  --color-orange-hover: #C6611F;    /* Oranye saat tombol di-hover */
  --color-orange-light: #FBF0E8;    /* Latar oranye lembut / transparan */

  /* Permukaan & Panel Krem */
  --color-cream-surface: #F0E6D7;   /* Background panel info, counter, CTA banner */
  --color-cream-border: #E4D5C2;    /* Border panel krem */
  --color-cream-notice: #F4EDE3;    /* Strip banner simulasi atas */

  /* Kartu Produk & Konten Putih */
  --color-card-bg: #FFFFFF;         /* Background kartu putih */
  --color-card-border: #EADDCF;     /* Border kartu & divider halus */
  --color-card-border-hover: #DBC7B2;

  /* Footer Gelap */
  --color-footer-bg: #3C2415;       /* Cokelat gelap pekat untuk footer */
  --color-footer-text: #FAF6EF;     /* Teks putih gading terang pada footer */
  --color-footer-muted: #D5C7B8;    /* Teks sekunder footer */
  --color-footer-border: #523B2E;

  /* Tombol WhatsApp Mengambang */
  --color-whatsapp: #25D366;
  --color-whatsapp-hover: #1EBE5D;

  /* Status Ketersediaan (Stock Badges) */
  --color-badge-avail-bg: #EAF8EF;
  --color-badge-avail-text: #167C3E;
  --color-badge-avail-border: #C2ECCF;

  --color-badge-empty-bg: #EDE6DF;  /* Abu-abu hangat untuk status 'Habis' */
  --color-badge-empty-text: #594235;
  --color-badge-empty-border: #DDD2C5;
}
```

### B. Tipografi & Font
- **Font Utama:** `Inter` (`font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;`)
- **Aturan Ketat:** Seluruh teks (Wordmark, Navigasi, Breadcrumb, Judul H1/H2/H3, Paragraf, Label, Tombol, Badges, Footer) **wajib menggunakan Inter**. Dilarang keras menggunakan font serif, font tulisan tangan, atau sans-serif selain Inter.

### C. Radius Sudut (Border Radius) & Bayangan (Shadows)
- `--container-max-width: 1180px;` (Gunakan `.section-container` untuk pembungkus lebar desktop).
- `--border-radius-sm: 6px;` (Badge ketersediaan, tag kecil)
- `--border-radius-md: 10px;` (Tombol, input pencarian, dropdown)
- `--border-radius-lg: 14px;` (Kartu produk, galeri thumbnail)
- `--border-radius-xl: 18px;` (Kartu panel utama, foto toko, CTA banner)
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`: Bayangan bernuansa hangat berbasis `rgba(73, 48, 36, ...)`.

---

## 4. Struktur Routing & Navigasi Aplikasi

Routing dikelola di [src/App.jsx](file:///c:/Projects/rasa-pulang/src/App.jsx) menggunakan HTML5 History API:

| Route Path | Komponen Halaman | File Halaman | Keterangan |
|---|---|---|---|
| `/` | `<HomePage />` | `src/pages/HomePage.jsx` | Halaman Beranda publik lengkap |
| `/katalog` | `<CatalogPage />` | `src/pages/CatalogPage.jsx` | Halaman Katalog Produk (Filter, Search, Sort, Pagination) |
| `/produk/:slug` | `<ProductDetailPage />` | `src/pages/ProductDetailPage.jsx` | Halaman Detail Produk + Galeri + Pesan WA |
| `/tentang-kami` | `<AboutPage />` | `src/pages/AboutPage.jsx` | Halaman Profil Usaha, Cerita Usaha & Pilihan Pembelian |
| `/kontak` | `<ContactPage />` | `src/pages/ContactPage.jsx` | Halaman Kontak, Jam Operasional, Maps, & Foto Depan Toko |
| `/login` | `<LoginPage />` | `src/pages/LoginPage.jsx` | Halaman Login Dashboard Pemilik & Staf (Simulasi Kredensial) |
| `/admin` atau `/dashboard` | `<DashboardPage />` | `src/pages/DashboardPage.jsx` | Dashboard Admin Pemilik & Staf (Role-Based Access Control) |

Setiap perpindahan halaman dipicu melalui prop handler `onNavigate(targetPath)` yang melakukan `window.history.pushState(null, '', targetPath)` dan `window.scrollTo({ top: 0, behavior: 'smooth' })`.

---

## 5. Komponen Global Bersama (Shared Components)

Semua halaman menggunakan komponen-komponen bersama ini untuk memastikan konsistensi visual:

1. **`SimulationNotice` ([src/components/layout/SimulationNotice.jsx](file:///c:/Projects/rasa-pulang/src/components/layout/SimulationNotice.jsx)):**  
   Strip atas berwarna krem lembut: *"Website simulasi portofolio — bisnis, produk, dan kontak merupakan data contoh."*
2. **`SiteHeader` ([src/components/layout/SiteHeader.jsx](file:///c:/Projects/rasa-pulang/src/components/layout/SiteHeader.jsx)):**  
   Header publik dengan Logo rumah lokal Rasa Pulang, menu navigasi (`activeNav` prop: `'beranda'`, `'katalog'`, `'tentang-kami'`, `'kontak'`), dan tombol outline "Hubungi Kami" berikon WhatsApp. Mendukung responsive drawer menu di mobile.
3. **`SiteFooter` ([src/components/layout/SiteFooter.jsx](file:///c:/Projects/rasa-pulang/src/components/layout/SiteFooter.jsx)):**  
   Footer 3 kolom gelap: (1) Brand & Tagline, (2) Navigasi tautan, (3) Kontak & Jam operasional. Bagian bawah memuat copyright simulasi.
4. **`FloatingWhatsAppButton` ([src/components/layout/FloatingWhatsAppButton.jsx](file:///c:/Projects/rasa-pulang/src/components/layout/FloatingWhatsAppButton.jsx)):**  
   Tombol lingkaran hijau mengambang di kanan bawah viewport.
5. **`ToastNotice` ([src/components/ui/ToastNotice.jsx](file:///c:/Projects/rasa-pulang/src/components/ui/ToastNotice.jsx)):**  
   Pemberitahuan toast melayang ketika pengguna mengklik fitur simulasi (seperti nomor WA dummy yang masih null).
6. **`ImageWithFallback` ([src/components/ui/ImageWithFallback.jsx](file:///c:/Projects/rasa-pulang/src/components/ui/ImageWithFallback.jsx)):**  
   Wrapper gambar pintar pencegah error 404.

---

## 6. Spesifikasi & Blueprint Setiap Halaman

### Halaman 1: Beranda (`/`)
- **Section 1 (Hero):** Eyebrow "OLEH-OLEH & CAMILAN KHAS SIDOARJO", Judul H1 "Bawa Pulang Camilan, Bagikan Kehangatan.", 2 Tombol CTA ("Lihat Katalog" solid oranye & "Hubungi via WhatsApp" text link), Foto hero rasio 16:11.
- **Section 2 (Kategori):** Judul "Temukan Camilan Favoritmu", 5 kartu kategori horizontal (Keripik & Kerupuk, Camilan Manis, Camilan Gurih, Oleh-oleh Daerah, Paket & Hampers).
- **Section 3 (Produk Unggulan):** Judul "Pilihan Favorit Rasa Pulang" + Link "Lihat Semua Produk ->". Grid 4 kolom menampilkan 8 kartu produk unggulan.
- **Section 4 (Keunggulan Toko):** Judul "Kenapa Rasa Pulang?", 3 kolom keunggulan (Banyak Pilihan Camilan, Paket untuk Berbagi, Mudah Dipesan).
- **Section 5 (Cerita Singkat):** Label "CERITA KAMI", Judul "Ada Cerita di Setiap Rasa", cuplikan cerita toko Dina Prameswari, tautan "Kenali Rasa Pulang ->", dan foto display toko.
- **Section 6 (Lokasi & Kontak):** Judul "Mampir dan Temukan Favoritmu", info kota, alamat, jam, 2 tombol ("Lihat Kontak & Lokasi" & "Buka di Google Maps"), dan foto depan toko.

### Halaman 2: Katalog Produk (`/katalog`)
- **Breadcrumb:** `Beranda / Katalog`.
- **Judul & Pengantar:** H1 "Katalog Produk" + deskripsi.
- **Panel Pencarian & Filter:**
  - Input teks pencarian produk dengan ikon kaca pembesar.
  - Dropdown pengurutan: *Terbaru*, *Harga Terendah*, *Harga Tertinggi*, *Nama: A–Z*.
  - Barisan tombol pil (Filter Pills): `Semua Produk`, `Keripik & Kerupuk`, `Camilan Manis`, `Camilan Gurih`, `Oleh-oleh Daerah`, `Paket & Hampers`.
- **Counter & Grid Produk:** Teks info *"Menampilkan X–Y dari 40 produk"*. Grid 4 kolom kartu produk yang berisi foto 1:1, badge ketersediaan (`Tersedia` hijau / `Habis` abu-abu), nama produk, berat, harga format `RpXX.000` tebal oranye, dan link `Lihat Detail`.
- **Pagination:** Tombol navigasi angka halaman `1`, `2`, `3`, `4` serta tombol `<` (Prev) dan `>` (Next).

### Halaman 3: Detail Produk (`/produk/:slug`)
- **Breadcrumb:** `Beranda / Katalog / [Kategori] / [Nama Produk]`.
- **Galeri Foto (Kolom Kiri):** Foto utama besar persegi 1:1 dengan rasio stabil + carousel 5 thumbnail di bawahnya (Foto Utama, Tampak Depan, Detail Tekstur, Saran Penyajian, Tampak Belakang). Thumbnail aktif memiliki ring border oranye.
- **Informasi Produk (Kolom Kanan):** Kategori oranye, Judul H1, Harga format `RpXX.000` / `per kemasan`, Berat bersih, Badge ketersediaan, Deskripsi singkat, Tombol besar WhatsApp ("Tanyakan / Pesan via WhatsApp").
- **Accordion / Panel Informasi:** 3 tab detail (Deskripsi Produk, Komposisi Bahan, Daya Simpan & Cara Penyimpanan) serta info box kadaluwarsa per kemasan.
- **Produk Terkait:** Grid 4 kartu produk dari kategori yang sama dengan tautan "Lihat Kategori ->".

### Halaman 4: Tentang Kami (`/tentang-kami`)
- **Breadcrumb:** `Beranda / Tentang Kami`.
- **Pengantar:** Eyebrow `MENGENAL RASA PULANG`, H1 `Camilan Pilihan, Hangatnya Kebersamaan.`, dan paragraf filosofi toko.
- **Foto Toko Landscape Besar:** Bingkai foto rasio lebar **~2.1 : 1** menampilkan suasana display interior toko.
- **Cerita Usaha 2 Kolom (40% : 60%):** Kolom kiri memuat label `CERITA KAMI`, judul `Berawal dari Rasa, Tumbuh Lewat Kebersamaan.`, dan pil status simulasi portofolio. Kolom kanan memuat 2 paragraf narasi usaha UMKM Dina Prameswari di Sidoarjo.
- **Keunggulan Toko:** 3 kolom keunggulan dengan judul kontekstual: *"Yang Membuat Kami Dekat"*.
- **Pilihan Pembelian:** Judul *"Untuk Dinikmati Sendiri atau Dibagikan"* dengan 2 kartu horizontal rasio ~1.8:1: (1) *Pembelian Satuan*, (2) *Paket Oleh-oleh & Hampers*.
- **CTA Penutup:** Panel krem terpusat *"Temukan Rasa Favoritmu"* dengan tombol [ Lihat Katalog ] dan [ Hubungi Kami ].

### Halaman 5: Kontak dan Lokasi (`/kontak`)
- **Breadcrumb:** `Beranda / Kontak`.
- **Pengantar:** Eyebrow `KAMI SIAP MEMBANTU`, H1 `Kontak dan Lokasi`, dan deskripsi bantuan pelanggan.
- **Grid Konten Utama Desktop (~47% : 53%):**
  - **Panel Informasi (Kiri):** Kartu putih 5 bagian dengan ikon lingkaran outline oranye 44px:
    1. *Alamat Toko:* `Jl. Contoh No. 12, Sidoarjo, Jawa Timur` (Catatan: Alamat simulasi).
    2. *Jam Operasional:* Baris tunggal desktop `Senin–Minggu` & `08.00–20.00 WIB` (Catatan: Jam simulasi).
    3. *WhatsApp:* Deskripsi pemesanan + Tombol solid oranye [ Hubungi via WhatsApp ].
    4. *Instagram:* Deskripsi kabar terbaru + Tombol outline oranye [ Lihat Instagram ].
    5. *Google Maps:* Deskripsi rute + Tombol outline oranye [ Buka di Google Maps ] (Tautan demo ke pencarian Sidoarjo).
  - **Kartu Foto Depan Toko (Kanan):** Foto portrait tampak depan toko (`store-front.webp`) dengan bar caption krem di bawah: *"Ilustrasi toko untuk proyek portofolio."*
- **Catatan Simulasi:** Banner tipis selebar kontainer dengan ikon `(i)`.
- **CTA Katalog:** Panel horizontal ringkas: *"Sudah menemukan camilan favoritmu?"* + Tombol [ Lihat Katalog ].

### Halaman 6: Dashboard Ringkasan Katalog (`/dashboard` & `/admin`)
- **Struktur Layout:** Sidebar kiri (~250px), Topbar atas (62px), Area Konten Utama, dan Footer sederhana.
- **Sidebar Navigasi:**
  - Brand header: Logo Rasa Pulang + "Panel Pengelolaan".
  - Kelompok KATALOG: Ringkasan (aktif), Kategori, Produk, Sampah Produk *(khusus pemilik)*.
  - Kelompok PENGELOLAAN *(khusus pemilik)*: Konten Website, Pengaturan Toko, Pengguna.
  - Kelompok AKUN: Profil Saya.
  - Bottom: Badge `SIMULASI PORTOFOLIO`, garis pemisah, dan tombol `Keluar`.
  - Tampilan Staf: Menu Sampah Produk, Konten Website, Pengaturan Toko, dan Pengguna disembunyikan otomatis, beserta header kelompok yang kosong.
- **Topbar:**
  - Kiri: Breadcrumb `Dashboard / Ringkasan`.
  - Kanan: Tombol outline oranye `Lihat Website`, divider, avatar inisial (`DP` / `SR`), nama user, badge peran (`Pemilik` / `Staf`), dan dropdown menu (Profil Saya, Keluar).
- **Konten Ringkasan:**
  - Banner simulasi: *"Simulasi portofolio — data katalog dan akun pada halaman ini merupakan contoh."*
  - Eyebrow `DASHBOARD`, Judul H1 `Ringkasan Katalog`, deskripsi sapaan dinamis, dan tombol solid oranye `+ Tambah Produk`.
  - **Lima Kartu Statistik:**
    1. Kategori Aktif: `5` (Kategori yang diaktifkan)
    2. Total Produk: `40` (Produk belum dihapus)
    3. Produk Ditampilkan: `34` (Status publikasi ditampilkan)
    4. Produk Disembunyikan: `6` (Status publikasi disembunyikan)
    5. Produk Habis: `4` (Ketersediaan habis)
  - Catatan visibilitas: *"Produk hanya terlihat pelanggan jika dipublikasikan dan kategorinya aktif."*
  - **Tabel 5 Produk Terakhir Diperbarui:**
    - Header: `Produk Terakhir Diperbarui`, subtitle, tautan `Lihat Semua Produk →`.
    - Kolom: Produk (Thumbnail 44px + Nama + SKU), Kategori, Harga, Publikasi (`Ditampilkan` hijau / `Disembunyikan` abu-abu), Ketersediaan (`Tersedia` hijau / `Habis` abu-abu), Diperbarui (`Hari ini, 09.20`, `Kemarin, 16.10`, dsb.), Aksi (Tombol edit pensil).
    - Menampilkan produk terbaru berurutan: Keripik Pisang Original (RP-001), Kerupuk Udang (RP-002), Kue Semprit (RP-006), Bandeng Crispy (RP-003), Paket Oleh-oleh Keluarga (RP-007).

---

## 7. Struktur Data Dummy Terpusat

Seluruh data konten dipisahkan rapi di folder `src/data/`:

| File Data | Deskripsi Isi |
|---|---|
| [src/data/homeData.js](file:///c:/Projects/rasa-pulang/src/data/homeData.js) | `siteConfig` (nama toko, alamat, jam, nomor WA simulasi, URL IG/Maps), `navigationLinks`, `heroContent`, `benefitsData`, `aboutPreviewData`, `storeLocationData`. |
| [src/data/productsData.js](file:///c:/Projects/rasa-pulang/src/data/productsData.js) | Master data 40 produk (`productsData`) & 5 kategori (`categoriesData`). Setiap produk memiliki field: `id`, `name`, `slug`, `price`, `formattedPrice`, `weight`, `availability` ('Tersedia'/'Habis'), `categoryId`, `imageKey`, `alt`, `description`, `composition`, `shelfLife`, `storageAdvice`, `gallery`. |
| [src/data/aboutData.js](file:///c:/Projects/rasa-pulang/src/data/aboutData.js) | `aboutIntroData`, `storePhotoData`, `brandStoryData`, `purchaseOptionsData`, `aboutCtaData`. |
| [src/data/contactData.js](file:///c:/Projects/rasa-pulang/src/data/contactData.js) | `contactIntroData`, `storeFrontPhotoData`, `contactInformationData`, `contactSimulationNoticeData`, `catalogCtaData`. |

---

## 8. Struktur & Konvensi Folder Gambar (`public/`)

Folder gambar terorganisir di `public/images/rasa-pulang/`:

```text
public/images/rasa-pulang/
├── hero/
│   └── hero-snacks.webp                # Rasio 16:11 (Hero beranda)
├── categories/
│   ├── keripik-kerupuk.webp            # Rasio 1:1
│   ├── camilan-manis.webp              # Rasio 1:1
│   ├── camilan-gurih.webp              # Rasio 1:1
│   ├── oleh-oleh-daerah.webp           # Rasio 1:1
│   └── paket-hampers.webp              # Rasio 1:1
├── products/
│   ├── [imageKey].webp                 # 40 foto produk utama (rasio 1:1)
│   └── details/
│       └── [product-slug]/             # Galeri detail (front, close-up, serving, back)
├── store/
│   ├── store-front.webp                # Rasio portrait ~0.75:1 (Foto depan toko)
│   └── store-interior.webp             # Rasio landscape ~2.1:1 (Foto interior toko)
└── about/
    ├── pembelian-satuan.webp           # Rasio ~1.8:1
    └── paket-hampers.webp              # Rasio ~1.8:1
└── auth/
    └── login-rasa-pulang.webp          # Rasio ~4:3 (Foto interior login)
```

### G. Halaman Dashboard Pengelolaan Kategori (`/dashboard/kategori` atau `/admin/kategori`)
- **Tujuan:** Antarmuka pengelompokan produk toko Rasa Pulang bagi Pemilik dan Staf.
- **Acuan Desain:** `media_1795318298352_7eeff27f.jpg`
- **Fitur & Komponen:**
  - **Topbar Breadcrumb:** `Dashboard / Kategori`.
  - **Heading:** Eyebrow `KATALOG`, judul `Kategori Produk`, deskripsi ringkas, dan tombol utama solid `+ Tambah Kategori`.
  - **Card Panel "Daftar Kategori":**
    - Toolbar filter pencarian realtime (`Cari nama kategori...`) dengan tombol reset pencarian `✕` dan counter `X kategori`.
    - Tabel 5 kolom:
      1. `Kategori`: Thumbnail (~52px, `ImageWithFallback`), nama tebal, dan deskripsi muted.
      2. `Jumlah Produk`: Dihitung dinamis dari relasi produk (12, 10, 8, 6, 4 produk).
      3. `Urutan Tampil`: Angka bulat urutan (1, 2, 3, 4, 5).
      4. `Status`: Badge status pill `Aktif` (hijau `#EAF8EF`/`#167C3E`) atau `Nonaktif` (abu-abu `#EDE6DF`/`#594235`).
      5. `Aksi`: Tombol edit (ikon pensil oranye) dan tombol hapus (ikon tempat sampah).
  - **Aturan Bisnis Kategori:**
    - Nama kategori harus unik (case-insensitive & trimmed).
    - Kategori yang masih memiliki produk (> 0) tidak dapat dihapus (tombol hapus nonaktif dengan label *"Masih digunakan"*).
    - Kategori kosong (0 produk) dapat dihapus dengan konfirmasi dialog.
    - Menonaktifkan kategori memicu dialog konfirmasi peringatan publikasi.
  - **Panel "Aturan Pengelolaan Kategori":** Menampilkan 3 butir aturan bisnis dan format gambar `JPG, PNG, atau WebP · Maks. 2 MB`.
  - **Modal Formulir (Tambah & Edit):** Mendukung pemilihan foto lokal dari komputer dengan live preview blob URL (`URL.createObjectURL`), validasi ukuran (maks 2MB), input urutan tampil, dan toggle status aktif.

### H. Halaman Dashboard Daftar Produk (`/dashboard/produk` atau `/admin/produk`)
- **Tujuan:** Pengelolaan daftar seluruh produk, harga, ketersediaan, status publikasi, dan unggulan toko Rasa Pulang.
- **Acuan Desain:** `media_1795320716122_9576014d.jpg`
- **Fitur & Komponen:**
  - **Topbar Breadcrumb:** `Dashboard / Produk`.
  - **Heading:** Eyebrow `KATALOG`, judul `Daftar Produk`, deskripsi ringkas, dan tombol utama solid `+ Tambah Produk`.
  - **Panel Pencarian & Filter:**
    - Baris 1: Input pencarian nama dan SKU (`Cari nama produk atau SKU...`) dengan total produk aktual di kanan (`40 produk`).
    - Baris 2: 4 Dropdown filter (`Kategori`, `Publikasi`, `Ketersediaan`, `Unggulan`) + tombol `🔄 Reset Filter`. Kategori nonaktif memiliki penanda `(Nonaktif)`.
  - **Tabel 7 Kolom:**
    1. `Produk`: Thumbnail (~48-52px, `ImageWithFallback`), nama tebal, SKU muted.
    2. `Kategori`: Nama kategori + tag merah `Kategori nonaktif` jika dinonaktifkan.
    3. `Harga`: Format mata uang Rupiah via `Intl.NumberFormat('id-ID')` tanpa desimal (e.g. `Rp25.000`).
    4. `Ketersediaan`: Badge pill `Tersedia` (hijau) atau `Habis` (abu-abu).
    5. `Publikasi`: Badge pill `Ditampilkan` (hijau) atau `Disembunyikan` (abu-abu).
    6. `Unggulan`: Bintang oranye ⭐ `Ya` atau tanda `— Tidak`.
    7. `Aksi`: Tombol Edit (tersedia untuk pemilik dan staf) & Tombol Hapus merah (khusus pemilik).
  - **Pagination:**
    - Teks ringkasan: `Menampilkan 1–8 dari 40 produk` (8 produk per halaman).
    - Tombol `‹` Sebelumnya, nomor halaman (`1, 2, 3, 4, 5`), dan tombol `›` Berikutnya.
    - Sinkronisasi state pencarian, filter, dan pagination ke URL query string (`?q=&category=&publication=&availability=&featured=&page=`).
  - **Simulasi Soft Delete Khusus Pemilik:**
    - Modal dialog konfirmasi: *"Hapus produk? Produk ‘[nama]’ akan dipindahkan ke Sampah Produk dan tidak ditampilkan di website publik. Produk dapat dipulihkan oleh pemilik."*
    - Pengisian `deletedAt` pada state lokal, produk terhapus keluar dari daftar utama, pagination diperbarui otomatis, dan muncul notifikasi toast.
    - Staf tidak melihat tombol hapus dan tidak dapat mengeksekusi handler penghapusan.
  - **Panel Catatan Aturan Pengelolaan Produk:** Menampilkan 2 butir aturan ketersediaan dan pemulihan produk di bawah tabel.

### I. Halaman Dashboard Tambah Produk (`/dashboard/produk/tambah` atau `/admin/produk/tambah`)
- **Tujuan:** Formulir terstruktur untuk menambahkan produk baru ke dalam katalog toko Rasa Pulang.
- **Acuan Desain:** `media_1795321407267_86f65063.jpg`
- **Fitur & Komponen:**
  - **Topbar Breadcrumb:** `Dashboard / Produk / Tambah Produk`.
  - **Heading:** Eyebrow `KATALOG`, judul `Tambah Produk`, deskripsi ringkas *"Lengkapi informasi produk untuk ditampilkan di katalog Rasa Pulang."*, legenda `Kolom bertanda * wajib diisi.`, dan tombol outline `← Kembali ke Daftar`.
  - **5 Panel Formulir Bernomor (Nomor tebal 20px, judul panel, border halus, latar putih):**
    1. **1. Identitas Produk:**
       - Nama Produk (`*`, placeholder `Contoh: Keripik Pisang Original 250 g`).
       - SKU / Kode Produk (`*`, placeholder `Contoh: RP-041`, helper text `Kode harus unik untuk setiap produk.`, validasi keunikan terhadap database produk aktif maupun terhapus).
       - Kategori (`*`, dropdown `Pilih kategori`, helper text `Satu produk hanya memiliki satu kategori. Setiap rasa dan ukuran dibuat sebagai produk terpisah.`, notifikasi peringatan jika kategori yang dipilih berstatus nonaktif).
    2. **2. Harga dan Berat:**
       - Harga per Kemasan (`*`, input prefix mata uang `Rp`, nilai default `0`, helper text `Harga harus lebih besar dari 0.`).
       - Berat Bersih (`*`, input suffix satuan `gram`, nilai default `0`, helper text `Masukkan berat bersih dalam gram.`).
    3. **3. Informasi Produk:**
       - Deskripsi Produk (`*`, textarea 4 baris, placeholder `Jelaskan produk, rasa, dan karakteristiknya...`).
       - Komposisi (textarea 3 baris, placeholder `Contoh: Pisang, minyak nabati, gula`).
       - Daya Simpan & Penyimpanan (textarea 3 baris, placeholder `Tuliskan perkiraan daya simpan dan cara penyimpanan...`).
       - Catatan kaki: `Komposisi dan daya simpan dapat dikosongkan jika belum tersedia.`
    4. **4. Foto Produk:**
       - Slot Foto Utama (`*`): Kotak rasio 1:1 garis putus-putus (*dashed*), ikon kamera plus, upload file lokal dengan live blob URL preview (`URL.createObjectURL`), tombol ganti foto, dan tombol hapus foto.
       - Slot Foto Tambahan (Opsional): 4 slot kartu persegi (`Foto 1` s/d `Foto 4`) dengan ikon `+`, dapat diunggah hingga 4 foto pendukung.
       - Info badge krem: `JPG, PNG, atau WebP · Maksimal 2 MB per gambar.`
       - Catatan kaki: `Foto utama wajib tersedia. Foto tambahan membantu pelanggan melihat detail produk.`
    5. **5. Pengaturan Tampilan:**
       - Ketersediaan (`*`): Dropdown `Tersedia` (default) atau `Habis`, helper text `Status manual, tanpa pencatatan jumlah stok.`
       - Publikasi (`*`): Dropdown `Disembunyikan` (default) atau `Ditampilkan`, helper text `Produk ditampilkan setelah dipublikasikan dan kategorinya aktif.`
       - Produk Unggulan: Toggle switch interaktif (default: OFF), label status dinamis `Tidak` / `Ya`, helper text `Tampilkan sebagai pilihan unggulan di Beranda.`
       - Counter Kuota Unggulan: Menampilkan `7 dari 8 slot digunakan` secara akurat (toggle otomatis disable jika kuota 8/8 tercapai).
       - Info Box Peringatan: `Produk habis tetap dapat dipublikasikan. Produk dalam kategori nonaktif tidak terlihat di website publik.`
  - **Bottom Action Bar:**
    - Teks petunjuk: `Periksa kembali informasi sebelum menyimpan.`
    - Tombol Batal: Memicu dialog konfirmasi jika form kotor (*dirty*).
    - Tombol Simpan Produk: Tombol solid oranye dengan ikon disket `💾 Simpan Produk`, melakukan validasi seluruh field wajib, menyimpan ke reactive session store `productsStore.js`, dan mengarahkan kembali ke tabel Daftar Produk dengan notifikasi sukses.
  - **Unsaved Changes Dialog:**
    - Modal peringatan ramah aksesibilitas jika pengguna menekan `Batal` atau `Kembali ke Daftar` saat form memiliki perubahan belum tersimpan.
    - Listener `beforeunload` untuk mencegah navigasi browser / refresh tanpa sengaja.
  - **Shared Session Store (`productsStore.js`):**
    - State reaktif in-memory yang menyinkronkan data produk di seluruh dashboard (Daftar Produk, Ringkasan Statistik, dan Tambah Produk) tanpa reload halaman.

### J. Halaman Dashboard Edit Produk (`/dashboard/produk/:id/edit` atau `/admin/produk/:id/edit`)
- **Tujuan:** Formulir terstruktur pembaruan informasi produk yang sudah terdaftar di katalog toko Rasa Pulang.
- **Acuan Desain:** `media_1795324087966_3a33f3a7.jpg`
- **Fitur & Komponen:**
  - **Topbar Breadcrumb:** `Dashboard / Produk / Edit Produk`.
  - **Heading:** Eyebrow `KATALOG`, judul `Edit Produk`, deskripsi dinamis `Perbarui informasi [nama produk].`, waktu pembaruan `Terakhir diperbarui: [tanggal dan waktu WIB]` (dari `product.updatedAt`, timezone `Asia/Jakarta`), legenda `Kolom bertanda * wajib diisi.`, dan tombol outline `← Kembali ke Daftar`.
  - **5 Panel Formulir Bernomor (Terisi otomatis dari data baseline produk terpilih):**
    1. **1. Identitas Produk:** Nama Produk (`*`), SKU / Kode Produk (`*`, helper: `Kode harus unik untuk setiap produk.`, validasi keunikan mengecualikan ID produk saat ini), Kategori (`*`, dropdown dari `categoriesData` dengan peringatan jika kategori yang dipilih berstatus nonaktif).
    2. **2. Harga dan Berat:** Harga per Kemasan (`*`, prefix `Rp`, pemisah ribuan visual `25.000`, validasi numerik > 0), Berat Bersih (`*`, suffix `gram`, nilai `250`, validasi numerik > 0).
    3. **3. Informasi Produk:** Deskripsi Produk (`*`, textarea), Komposisi (textarea), Daya Simpan & Penyimpanan (textarea), dan catatan kaki helper.
    4. **4. Foto Produk (Manajemen Galeri):**
       - Sisi Kiri: Foto Utama dengan badge oranye `Utama`, render `ImageWithFallback`, dan tombol outline `📷 Ganti Foto Utama`.
       - Sisi Kanan: 4 slot Foto Tambahan. Slot terisi memiliki tombol hapus `✕` dan tombol `Jadikan Utama` (melakukan pertukaran/swap dengan foto utama lama secara simetris tanpa menduplikasi atau menghilangkan foto). Slot kosong berbingkai garis putus-putus dengan tombol `+ Tambah Foto` (maksimal 4 foto tambahan).
       - Indikator kuota dinamis: `[n] dari 4 foto tambahan digunakan.`
       - Info badge krem: `JPG, PNG, atau WebP · Maksimal 2 MB per gambar.`
       - Catatan kaki: `Perubahan foto diterapkan setelah Anda menyimpan. Produk wajib memiliki satu foto utama.`
    5. **5. Pengaturan Tampilan:**
       - Ketersediaan (`*`): Dropdown `Tersedia` atau `Habis`.
       - Publikasi (`*`): Dropdown `Ditampilkan` atau `Disembunyikan`.
       - Produk Unggulan: Toggle switch interaktif (`Ya` / `Tidak`) dengan kalkulasi kapasitas slot khusus produk (`7 dari 8 slot digunakan, termasuk produk ini.`). Jika slot penuh 8/8 dan produk belum unggulan, switch dinonaktifkan.
       - Info Box Peringatan: Status ketersediaan habis dan visibilitas kategori nonaktif.
  - **Bottom Sticky Action Bar:**
    - Teks petunjuk: `Periksa kembali perubahan sebelum menyimpan.`
    - Tombol `Batal` dan `💾 Simpan Perubahan`.
  - **State Draft vs Baseline:**
    - Mengetik dan mengganti foto hanya mengubah draft lokal tanpa memutasi master store sebelum Simpan.
    - Tombol `Batal` atau `Kembali ke Daftar` memeriksa status kotor (`isDirty`). Jika ada perubahan, memicu `UnsavedChangesDialog` yang dirender via portal ke `document.body` 1 layar penuh.
    - Simpan memvalidasi seluruh kolom wajib, memperbarui produk di `productsStore.js` berdasarkan ID, mempertahankan `createdAt` & `id`, memperbarui `updatedAt`, membersihkan blob URL draft yang tidak dipakai, dan menavigasi kembali ke `/dashboard/produk` dengan toast sukses.
  - **State Produk Tidak Ditemukan:**
    - Jika ID produk tidak ditemukan atau sudah dihapus (`deletedAt`), menampilkan antarmuka informatif `Produk tidak tersedia untuk diedit` dengan tombol `← Kembali ke Daftar Produk`.

### K. Halaman Dashboard Sampah Produk (`/dashboard/produk/sampah` atau `/admin/produk/sampah`)
- **Tujuan:** Antarmuka pemulihan produk yang telah dihapus (*soft deleted*) dari katalog toko Rasa Pulang.
- **Acuan Desain:** `media_1795325396620_593c0ace.jpg`
- **Hak Akses & Otorisasi Demo:**
  - Khusus peran Pemilik (`role === 'owner'`).
  - Menu `Sampah Produk` disembunyikan dari sidebar untuk peran Staf (`role === 'staff'`).
  - Jika staf mengakses URL secara langsung, sistem menampilkan kartu batasan ramah aksesibilitas `Akses tidak tersedia: Halaman Sampah Produk hanya dapat diakses oleh pemilik toko` beserta tombol kembali ke Dashboard.
- **Fitur & Komponen:**
  - **Topbar Breadcrumb:** `Dashboard / Sampah Produk`.
  - **Heading:** Eyebrow `KATALOG`, judul H1 `Sampah Produk`, deskripsi *"Lihat produk yang dihapus dan pulihkan jika masih diperlukan."*, badge akses pill dengan ikon gembok `Khusus pemilik`, dan tombol outline `← Kembali ke Daftar Produk`.
  - **Panel "Produk Terhapus":**
    - Toolbar: Input pencarian responsif (`Cari nama produk atau SKU...`) dan jumlah hasil terhapus (`[n] produk terhapus`).
    - Tabel 4 Kolom:
      1. `Produk`: Thumbnail (~52px, `ImageWithFallback`), nama tebal, SKU muted (`SKU: RP-021`).
      2. `Kategori`: Nama kategori produk.
      3. `Dihapus Pada`: Format tanggal & waktu Indonesia zona WIB (`16 November 2026, 15.30 WIB`).
      4. `Aksi`: Tombol outline oranye `Pulihkan` dengan ikon panah melingkar / undo.
    - Footer Tabel: Teks ringkasan dinamis `Menampilkan [n] dari [total] produk terhapus`.
  - **Panel Informasi Bawah "Tentang Pemulihan Produk":**
    - Panel beige hangat dengan ikon pemulihan oranye, berisi 3 butir aturan:
      - Pemulihan mengembalikan produk ke Daftar Produk beserta informasi dan fotonya.
      - Produk hanya terlihat pelanggan jika dipublikasikan dan kategorinya aktif.
      - Produk yang dipulihkan tidak otomatis menjadi unggulan (harus diatur kembali melalui Edit Produk).
      - Catatan: Tindakan pemulihan hanya dapat dilakukan oleh pemilik.
  - **Dialog Konfirmasi Pemulihan ("Pulihkan produk?"):**
    - Modal dialog menggunakan `createPortal(..., document.body)` dengan backdrop layar penuh 100% dan body scroll lock.
    - Judul: `Pulihkan produk?`, pesan konfirmasi, tombol `Batal`, dan tombol solid oranye `Pulihkan Produk`.
    - Setelah konfirmasi: Produk dipulihkan melalui `restoreSessionProduct(id)` (mengubah `deletedAt: null`, `isFeatured: false`, memperbarui `updatedAt`), keluar seketika dari daftar Sampah Produk, kembali muncul di Daftar Produk aktif, dan memunculkan toast sukses.
  - **Kondisi Kosong (Empty States):**
    - Jika tempat sampah kosong (semua produk sudah dipulihkan): Menampilkan ilustrasi tempat sampah bersih `Belum ada produk di sampah` dengan tombol `Kembali ke Daftar Produk`.
    - Jika pencarian tidak menemukan hasil: Menampilkan `Produk tidak ditemukan: Coba gunakan kata kunci lain` dengan tombol `Reset Pencarian`.

### L. Halaman Dashboard Pengelolaan Konten Website (`/dashboard/konten-website` atau `/admin/konten-website`)
- **Tujuan Halaman:** Memberikan antarmuka khusus Pemilik untuk memperbarui banner utama, cerita usaha toko, dan 3 poin keunggulan usaha Rasa Pulang.
- **Batasan Akses Peran:**
  - Eksklusif untuk **Pemilik** (`role === 'owner'`).
  - Menu `Konten Website` di sidebar disembunyikan otomatis untuk staf melalui konfigurasi hak akses `adminNavigationGroups`.
  - Jika staf mencoba membuka rute URL secara langsung, sistem menampilkan komponen `WebsiteContentRestrictedView` dengan ilustrasi gembok, pemberitahuan akses khusus pemilik, dan tombol kembali ke ringkasan.
- **Struktur Komponen:**
  - `WebsiteContentHeader`: Menampilkan eyebrow `PENGELOLAAN`, judul `Konten Website`, deskripsi, pill badge `🔒 Khusus pemilik`, catatan bantuan `Perubahan ditampilkan di website publik setelah disimpan.`, dan tombol navigasi langsung `Lihat Website` (menuju `/`).
  - `BannerContentSection` (1. Banner Utama):
    - Input teks untuk Judul Banner.
    - Textarea untuk Kalimat Pengantar.
    - Kolom kanan pratinjau gambar landscape dengan fallback `<ImageWithFallback />`.
    - Tombol `Ganti Gambar Banner` dengan dialog file lokal (JPG, PNG, WebP <= 2 MB), pratinjau instan (Object URL), dan opsi `Batalkan Penggantian`.
    - Kotak catatan informasi: `ⓘ Versi pertama menggunakan satu banner utama.`
  - `BusinessStorySection` (2. Cerita Usaha):
    - Textarea multi-paragraf untuk Cerita Usaha dengan helper `Gunakan paragraf singkat yang mudah dibaca.`
    - Kolom kanan pratinjau foto interior toko dengan fallback `<ImageWithFallback />`.
    - Tombol `Ganti Foto Toko` dengan dialog file lokal (JPG, PNG, WebP <= 2 MB), pratinjau instan, dan opsi `Batalkan Penggantian`.
  - `BusinessAdvantagesSection` (3. Keunggulan Usaha):
    - Menampilkan persis 3 kartu keunggulan dalam satu baris horizontal (grid 3 kolom desktop, responsif mobile):
      1. Keunggulan 1: Ikon camilan tetap, input judul, textarea deskripsi.
      2. Keunggulan 2: Ikon hampers/hadiah tetap, input judul, textarea deskripsi.
      3. Keunggulan 3: Ikon chat/WhatsApp tetap, input judul, textarea deskripsi.
    - Kotak catatan informasi: `ⓘ Jumlah keunggulan tetap tiga untuk menjaga konsistensi tampilan.`
  - `WebsiteContentFormActions`: Sticky bar di bagian bawah layar:
    - Sisi kiri: Peringatan status perubahan form (`isDirty`).
    - Sisi kanan: Tombol `Batal` (membuka dialog konfirmasi jika kotor) dan tombol solid oranye `Simpan Perubahan`.
  - `WebsiteContentDiscardDialog`: Dialog modal konfirmasi pembatalan perubahan menggunakan `createPortal(..., document.body)` dengan backdrop layar penuh 100% dan body scroll lock.
- **State & Data Store (`websiteContentStore.js`):**
  - Menggunakan in-memory reactive store (pub-sub) untuk menyimpan perubahan selama sesi simulasi.
  - Halaman Beranda (`HeroSection`, `BenefitsSection`, `AboutPreviewSection`) berlangganan ke store secara reaktif sehingga pembaruan yang disimpan di dashboard langsung tercermin saat pengguna mengklik `Lihat Website`.
  - Menampilkan notifikasi toast: `Konten diperbarui untuk sesi demo ini. Perubahan akan kembali ke data awal setelah halaman dimuat ulang.`

### M. Halaman Dashboard Pengaturan Toko (`/dashboard/pengaturan-toko` atau `/admin/pengaturan-toko`)
- **Tujuan Halaman:** Memberikan antarmuka khusus Pemilik untuk mengelola identitas toko, logo, alamat operasional, jam layanan, dan kontak/tautan (WhatsApp, Instagram, Google Maps).
- **Batasan Akses Peran:**
  - Eksklusif untuk **Pemilik** (`role === 'owner'`).
  - Menu `Pengaturan Toko` di sidebar tersembunyi secara otomatis untuk peran Staf (`role === 'staff'`).
  - Jika staf mencoba membuka rute URL secara langsung, sistem menampilkan komponen `StoreSettingsRestrictedView` dengan judul `Akses tidak tersedia`, deskripsi bahwa halaman hanya dapat diakses oleh Pemilik (Dina Prameswari), dan tombol `Kembali ke Dashboard`.
- **Struktur Komponen:**
  - `StoreSettingsHeader`: Menampilkan eyebrow `PENGELOLAAN`, judul `Pengaturan Toko`, deskripsi, pill badge `🔒 Khusus pemilik`, pembatas `|`, dan catatan bantuan `Informasi tersimpan digunakan pada seluruh website publik.`
  - `StoreIdentitySection` (1. Identitas Toko):
    - Kolom kiri (~60%): Input teks `Nama Toko` (wajib).
    - Kolom kanan (~40%): Pratinjau logo dengan `<ImageWithFallback />` (`object-fit: contain`, fallback background krem), tombol `Ganti Logo Toko` (pemilihan berkas lokal JPG, PNG, WebP $\le$ 2 MB), tombol `Batalkan Penggantian` jika ada berkas lokal yang dipilih, serta helper format & resolusi.
  - `StoreAddressSection` (2. Alamat Toko):
    - Textarea `Alamat Lengkap` (wajib) dengan nilai awal `Jl. Contoh No. 12, Sidoarjo, Jawa Timur`.
    - Kotak catatan informasi beige: `ⓘ Alamat simulasi, bukan lokasi usaha sebenarnya.`
  - `StoreOperatingHoursSection` (3. Jam Operasional):
    - Input teks `Jam Operasional` (wajib) dengan nilai awal `Senin–Minggu · 08.00–20.00 WIB`.
    - Helper: `Gunakan format yang mudah dipahami pelanggan.`
  - `StoreContactLinksSection` (4. Kontak dan Tautan):
    - **Nomor WhatsApp:** Ikon WhatsApp, label, badge dinamis (`Belum diisi · kontak simulasi` vs `Nomor disetel · kontak simulasi`), input numerik dengan format internasional diawali 628 tanpa tanda `+`/spasi, serta kotak catatan `ⓘ Perubahan nomor WhatsApp berlaku pada seluruh tombol WhatsApp di website.`
    - **Tautan Instagram:** Ikon Instagram, label, badge dinamis (`Belum diisi · akun simulasi` vs `Tautan disetel · akun simulasi`), input URL HTTPS instagram.com, dan helper profil.
    - **Tautan Google Maps:** Ikon Pin Maps, label, input URL HTTPS, helper dinamis (mendeteksi query wilayah Sidoarjo), serta tombol `↗ Buka Tautan Maps` yang membuka tab baru secara aman (`target="_blank" rel="noopener noreferrer"`) setelah validasi URL.
  - Kotak Catatan Simulasi Bawah: `ⓘ Mode portofolio: gunakan data contoh dan hindari nomor atau akun milik pihak lain.`
  - `StoreSettingsActions`: Sticky bar di bagian bawah layar:
    - Sisi kiri: Peringatan status perubahan form (`isDirty`).
    - Sisi kanan: Tombol `Batal` dan tombol solid oranye `Simpan Perubahan`.
  - `StoreSettingsDiscardDialog`: Dialog modal konfirmasi pembatalan perubahan menggunakan `createPortal(..., document.body)` dengan backdrop layar penuh 100% dan body scroll lock.
- **State & Data Store (`storeSettingsStore.js`):**
  - Menggunakan in-memory reactive store (pub-sub) untuk menyimpan konfigurasi toko selama sesi simulasi.
  - Tersinkronisasi secara otomatis dengan `siteConfig` di `homeData.js`, sehingga tombol kontak WhatsApp, tautan Instagram, alamat, dan jam buka pada website publik (Beranda, Kontak, Detail Produk, Floating WhatsApp) langsung menggunakan nilai yang disimpan.
  - Menampilkan notifikasi toast: `Pengaturan diperbarui untuk sesi demo ini. Perubahan akan kembali ke data awal setelah halaman dimuat ulang.`

### N. Halaman Dashboard Pengguna (`/dashboard/pengguna` atau `/admin/pengguna`)
- **Tujuan Halaman:** Memberikan antarmuka khusus Pemilik untuk melihat akun pemilik, mengelola daftar akun staf, mencari/memfilter staf, menambahkan akun staf baru melalui modal, dan menonaktifkan akun staf yang ada.
- **Batasan Akses Peran:**
  - Eksklusif untuk **Pemilik** (`role === 'owner'`).
  - Menu `Pengguna` di sidebar tersembunyi secara otomatis untuk peran Staf (`role === 'staff'`).
  - Jika staf mencoba membuka rute URL secara langsung, sistem menampilkan komponen `UsersRestrictedView` dengan judul `Akses tidak tersedia`, deskripsi bahwa pengelolaan pengguna adalah hak khusus Pemilik (Dina Prameswari), dan tombol `Kembali ke Dashboard`.
- **Struktur Komponen:**
  - `UsersHeader`: Menampilkan eyebrow `PENGELOLAAN`, judul `Pengguna`, pill badge `🔒 Khusus pemilik` di sebelah judul, deskripsi `Kelola akun staf yang membantu memperbarui katalog Rasa Pulang.`, serta tombol aksi oranye `+ Tambah Staf`.
  - `OwnerAccountSummary`: Kartu ringkasan identitas pemilik terpisah dari tabel staf:
    - Avatar bulat inisial krem `DP`, nama tebal `Dina Prameswari`, email `pemilik@rasapulang.example`.
    - Pemisah vertikal `|`, badge krem `Pemilik`, label `Akun Anda`.
    - Tombol aksi kanan `[👤 Kelola melalui Profil Saya]`.
  - `StaffUsersToolbar`:
    - Input pencarian real-time nama/email dengan ikon kaca pembesar.
    - Dropdown filter status: `Semua status`, `Aktif`, `Nonaktif`.
    - Counter hasil pencarian (misal `1 akun staf`).
  - `StaffUsersTable`:
    - Kolom tabel: `Nama`, `Email`, `Peran`, `Status`, `Aksi`.
    - Kolom Nama: Avatar inisial bulat krem/abu-abu `ST` + nama tebal.
    - Kolom Peran: Badge `Staf`.
    - Kolom Status: Badge hijau `Aktif` atau abu-abu `Nonaktif`.
    - Kolom Aksi: Tombol outline oranye `[👤x Nonaktifkan]` untuk akun aktif, atau teks `Sudah nonaktif` untuk akun nonaktif.
    - Footer tabel: `Menampilkan {filtered} dari {total} akun staf`.
  - `StaffUsersEmptyState`: Tampilan kosong dengan tombol `Reset Filter` jika pencarian/filter tidak menemukan hasil, atau ilustrasi bersih dengan tombol `Tambah Staf` jika belum ada staf.
  - `StaffAccessInformation`: Panel beige dengan ikon gembok `Aturan Akses Akun Staf` yang menjelaskan batas wewenang staf dan catatan bahwa akun staf dibuat oleh pemilik tanpa pendaftaran publik.
  - `CreateStaffDialog`: Modal portal (`createPortal(..., document.body)`) untuk input Nama, Email, Password Awal, dan Konfirmasi Password dengan toggle eye show/hide password, validasi lengkap, pembersihan password dari state, dan toast sukses.
  - `DeactivateStaffDialog`: Modal portal konfirmasi penonaktifan akun staf `Nonaktifkan akun staf?` dengan tombol Batal dan Nonaktifkan Akun.
- **State & Data Store (`usersStore.js`):**
  - Mengelola data akun pemilik, staf awal, dan akun staf baru dalam memori sesi (pub-sub).
  - Kredensial password demo disimpan terpisah di memory map lokal tanpa pernah diekspos ke tabel atau objek presentasi.
  - Tersinkronisasi dengan fungsi `simulateLogin` di `demoAccounts.js`, sehingga akun staf baru yang ditambahkan dapat langsung diuji untuk login, dan akun staf nonaktif ditolak login.
  - Menampilkan notifikasi toast: `Akun staf ditambahkan untuk sesi demo ini. Data akan kembali ke kondisi awal setelah halaman dimuat ulang.` dan `Akun staf dinonaktifkan untuk sesi demo ini.`

### O. Halaman Dashboard Profil Saya (`/dashboard/profil` atau `/admin/profil`)
- **Tujuan Halaman:** Memberikan antarmuka bagi pengguna aktif (baik Pemilik maupun Staf) untuk melihat ringkasan identitas akun mereka sendiri, memperbarui nama lengkap mereka, dan mengubah password akun pribadi dalam simulasi frontend.
- **Akses Pengguna:**
  - Dapat diakses oleh **Pemilik** (`owner`) dan **Staf** (`staff`) untuk akun mereka masing-masing.
  - Tidak memiliki badge "Khusus pemilik".
- **Struktur Komponen:**
  - `ProfileHeader`: Eyebrow `AKUN`, judul H1 `Profil Saya`, dan deskripsi `Perbarui nama dan password akun yang Anda gunakan.`
  - `AccountIdentitySummary`: Kartu ringkasan profil aktif:
    - Avatar bulat dengan inisial pengguna aktif (`DP` untuk Pemilik, `ST` untuk Staf).
    - Pemisah vertikal `|`, teks nama lengkap, email, badge peran (`Pemilik` atau `Staf`), pemisah `|`, dan teks `Akun Anda`.
  - `ProfileInformationForm` (1. Informasi Profil):
    - Input `Nama Lengkap` yang dapat diedit (wajib diisi, trim spasi).
    - Input `Email` readonly dengan latar belakang lembut dan ikon gembok, serta helper bahwa email digunakan untuk login dan tidak dapat diubah di halaman ini.
    - Teks info peran di bawah input: `Peran akun: Pemilik` atau `Peran akun: Staf`.
    - Tombol simpan kanan bawah: `[💾 Simpan Profil]`. Dinonaktifkan jika nama tidak mengalami perubahan.
    - Setelah disimpan: Avatar inisial, nama pada topbar, ringkasan, dan store `usersStore.js` terbarui seketika, disertai notifikasi toast.
  - `ChangePasswordForm` (2. Ubah Password):
    - Field 1 (lebar penuh): `Password Saat Ini` dengan ikon gembok di kiri, placeholder `Masukkan password saat ini`, tombol toggle mata (Show/Hide), dan `autocomplete="current-password"`.
    - Baris dua kolom:
      - Kolom kiri: `Password Baru` dengan ikon gembok, helper `Gunakan password yang kuat dan mudah Anda ingat.`, tombol toggle mata, dan `autocomplete="new-password"`.
      - Kolom kanan: `Konfirmasi Password Baru` dengan ikon gembok, placeholder `Ulangi password baru`, tombol toggle mata, dan `autocomplete="new-password"`.
    - Kotak catatan informasi beige dengan ikon perisai: `Jangan bagikan password kepada siapa pun. Perubahan password hanya berlaku untuk akun Anda sendiri.`
    - Tombol simpan kanan bawah: `[🔑 Simpan Password]`.
    - Validasi: Password saat ini wajib dan sesuai akun aktif, password baru minimal 8 karakter dan berbeda dari password saat ini, konfirmasi password harus cocok.
    - Setelah berhasil: Seluruh field password dibersihkan dari state memori, toggle mata di-reset ke tersembunyi, kredensial demo diperbarui di `usersStore.js` untuk simulasi login, dan notifikasi toast ditampilkan.
  - `ProfileLeaveDialog`: Dialog modal konfirmasi peringatan perubahan belum disimpan (`createPortal(..., document.body)`).
  - Catatan informasi di bawah form: `Pemilik dan staf dapat memperbarui nama serta password akun masing-masing.`
- **Pemisahan Form:**
  - Dua elemen `<form>` terpisah tanpa nested form.
  - Form Nama dan Form Password bekerja secara independen: menyimpan nama tidak memengaruhi isian password, dan menyimpan password tidak memengaruhi draft nama.

---

## 9. Aturan & Panduan Menulis Kode untuk AI Lain (Strict AI Prompting Rules)

Jika Anda (model AI selain Gemini) diminta melakukan perubahan, penambahan halaman baru, atau modifikasi komponen:

1. **Ikuti Token Desain yang Sudah Ada:**
   - Gunakan variabel CSS `var(--color-...)` dari `src/styles/variables.css`. Jangan pernah memakai arbitrary color codes seperti `#1a202c`, `#3b82f6`, dsb.
   - Gunakan selalu font `Inter`. Jangan memasukkan font serif atau script.
2. **Pertahankan Gaya Tombol & Kartu:**
   - Tombol utama solid: background `--color-orange`, teks putih, padding ~10–12px 22–26px, border-radius 8–10px, shadow halus, hover warna `--color-orange-hover` dengan slight translate `-1px`.
   - Tombol sekunder outline: border `1.5px solid var(--color-orange)`, warna teks `--color-orange`, background transparan, hover `--color-orange-light`.
3. **Patuhi Batasan Arsitektur:**
   - Jangan pernah menambahkan backend, database, library AJAX axios, auth/login, atau library router berat seperti `react-router-dom` (routing proyek sudah bersih dan cepat dengan SPA custom router di `App.jsx`).
   - Jangan simpan data di `localStorage` atau `sessionStorage`. Gunakan file di `src/data/`.
4. **Keamanan Gambar & Aksesibilitas:**
   - Selalu gunakan `<ImageWithFallback />` untuk merender foto agar tidak terjadi broken image atau layout shift saat gambar belum diunggah.
   - Seluruh tag gambar wajib memiliki atribut `alt` deskriptif.
   - Seluruh elemen ikon interaktif / SVG wajib memiliki `aria-hidden="true"`.
5. **Kebersihan Kode (Lint & Build):**
   - Kode harus lulus ESLint tanpa peringatan (`npm run lint`).
   - Jangan membuat state update di dalam effect tanpa dependency yang benar.
   - Build Vite (`npm run build`) harus selalu berhasil tanpa error.
6. **Modal Dialog & Full-Screen Overlay (Portal):**
   - Seluruh modal konfirmasi dan dialog wajib menggunakan `createPortal(modalJSX, document.body)` dari `react-dom`.
   - Backdrop modal wajib memiliki properti `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 1000;` dan mengunci scrolling body (`document.body.style.overflow = 'hidden'`) saat terbuka agar backdrop menutupi 1 layar penuh (termasuk sidebar, topbar, dan footer) tanpa terkurung oleh animasi/transformasi container induk.
7. **Sistem Animasi Entrance & Angka/Nominal (Finishing 8 Menu Dashboard):**
   - **Staggered Cascade Entrance (`src/styles/animations.css`):**
     - Setiap section/komponen di 8 menu dashboard (Ringkasan, Kategori, Produk, Sampah Produk, Konten Website, Pengaturan Toko, Pengguna, Profil Saya) dibungkus dengan kelas `.anim-enter` dan `.anim-stagger-1` sampai `.anim-stagger-8` (interval delay 40–80ms).
     - Menggunakan keyframe `@keyframes adminFadeSlideUp` dengan durasi 380ms dan timing function cubic-bezier `cubic-bezier(0.16, 1, 0.3, 1)`.
   - **Animasi Angka & Nominal Rupiah (`src/components/ui/AnimatedNumber.jsx`):**
     - Komponen count-up/roll-up menggunakan `requestAnimationFrame` + easing `easeOutExpo` untuk kenaikan angka yang dinamis dan halus.
     - Menggunakan font tabular numbers (`font-variant-numeric: tabular-nums`) untuk mencegah layout jitter selama animasi berjalan.
     - Mendukung format integer (`format="number"`) maupun mata uang Rupiah (`format="currency"` yang menghasilkan format baku `Rp25.000` tanpa spasi).
     - Mendukung prefix, suffix (contoh: `" produk"`, `" kategori"`, `" akun staf"`), dan durasi kustom.
     - Penuh kepatuhan aksesibilitas: otomatis menonaktifkan animasi roll-up jika user mengaktifkan `prefers-reduced-motion: reduce`.

---

## 10. Daftar Menu Dashboard & Implementasi Animasi

| Menu | Rute | Komponen Utama | Animasi Stagger | Animasi Angka/Nominal (`AnimatedNumber`) |
|---|---|---|---|---|
| **Ringkasan** | `/dashboard` | `DashboardPage.jsx` | Notice (1), Greeting & Date (2), Stat Cards (3), Recent Products Table (4) | Stat Count (Semua Produk, Ditampilkan, Stok Habis, Di Sampah) & Kolom Harga Rupiah Produk Terbaru |
| **Kategori** | `/dashboard/kategori` | `CategoryManagementView.jsx` | Notice (1), Header (2), Toolbar & Table (3), Rules Panel (4) | Counter badge `totalCount kategori`, kolom urutan `sortOrder`, dan kolom jumlah produk |
| **Produk** | `/dashboard/produk` | `AdminProductManagementView.jsx` | Notice (1), Header (2), Filters, Table & Pagination (3), Rules Panel (4) | Counter badge `totalFilteredCount produk`, kolom harga tabel `RpX.000`, dan rangkuman pagination `rangeStart–rangeEnd dari total` |
| **Sampah Produk** | `/dashboard/produk/sampah` | `ProductTrashView.jsx` | Notice (1), Header (2), Trash Table (3), Info Panel (4) | Counter badge `products.length produk terhapus` dan summary footer `Menampilkan X dari Y produk terhapus` |
| **Konten Website** | `/dashboard/konten` | `WebsiteContentView.jsx` | Notice (1), Header (2), Banner Form (3), Cerita Usaha (4), Keunggulan Usaha (5), Actions (6) | Transisi kartu keunggulan dan micro-interactions form |
| **Pengaturan Toko** | `/dashboard/pengaturan` | `StoreSettingsView.jsx` | Notice (1), Header (2), Identitas (3), Alamat (4), Jam Operasional (5), Kontak (6), Catatan & Actions (7) | Transisi panel formulir berurutan |
| **Pengguna** | `/dashboard/pengguna` | `UsersView.jsx` | Notice (1), Header (2), Ringkasan Pemilik (3), Kartu Staf (4), Aturan Akses (5) | Counter toolbar `resultCount akun staf` dan summary footer tabel `Menampilkan X dari Y akun staf` |
| **Profil Saya** | `/dashboard/profil` | `MyProfileView.jsx` | Notice (1), Header (2), Ringkasan Akun (3), Form Profil (4), Form Password (5), Catatan (6) | Transisi smooth cascading per formulir independen |

---

*Dokumen ini merupakan sumber kebenaran tunggal (*Single Source of Truth*) arsitektur frontend website Rasa Pulang.*
