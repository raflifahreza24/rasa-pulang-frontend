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
```

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

---

*Dokumen ini merupakan sumber kebenaran tunggal (*Single Source of Truth*) arsitektur frontend website Rasa Pulang.*
