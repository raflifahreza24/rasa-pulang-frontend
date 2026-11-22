# Rasa Pulang — Frontend & Store Management Dashboard

A responsive website and catalog management dashboard for **Rasa Pulang**, an artisanal snack and souvenir shop based in Sidoarjo, East Java, Indonesia.

This project is an independent **Frontend Single Page Application (SPA)** portfolio built with **React** and **Vite**. It translates reference designs with high visual fidelity (pixel-perfect), a modular design token system, reactive in-memory state stores, smooth staggered entrance animations, and dedicated numeric/currency roll-up counters.

---

## 🌟 Key Features

### 1. Public Website (Storefront & Product Catalog)
- **Homepage:**
  - Interactive hero banner with warm, authentic local branding.
  - Dynamic featured products showcase (*Produk Unggulan*).
  - Business narrative preview (*Cerita Usaha*) and store value propositions.
  - Customer testimonials and physical store location preview.
- **Product Catalog:**
  - Real-time search by product name and SKU.
  - Dynamic category filters and multi-criteria sorting (lowest price, highest price, most popular, alphabetical A–Z).
  - Responsive pagination controls.
  - Availability badges (*Tersedia* / *Habis*) and featured item indicators.
- **Product Details:**
  - Multi-image gallery with main photo and optional extra thumbnails.
  - Detailed product specs: net weight, description, ingredients, and shelf life/storage instructions.
  - Direct WhatsApp order CTA button with prefilled product message.
- **About Us & Contact / Location:**
  - Story behind the Rasa Pulang brand and business journey.
  - Physical store address with interactive Google Maps link, operational hours, and official contacts.

---

### 2. Admin Management Dashboard (8 Core Modules)

A responsive admin dashboard featuring simulated Role-Based Access Control (RBAC):

| Module | Access Level | Description & Capabilities |
|---|:---:|---|
| **Ringkasan (Overview)** | Owner & Staff | High-level catalog statistics (Total Products, Published, Out of Stock, In Trash) with animated counters and a table of the 5 most recently updated products. |
| **Kategori (Categories)** | Owner & Staff | Category management, custom sort ordering (`sortOrder`), active/inactive toggle, and modal dialogs for creating/editing categories. |
| **Produk (Products)** | Owner & Staff | 7-column product table, multi-criteria filters (category, publication status, stock condition, featured status), pagination, and trash confirmation modal. |
| **Tambah & Edit Produk (Product Form)** | Owner & Staff | Comprehensive form for product identity, pricing, net weight, descriptions, ingredients, shelf life, local image selection (instant preview without backend upload), and featured product toggle (8-slot limit tracker). |
| **Sampah Produk (Product Trash)** | Owner Only | View soft-deleted items, search trashed products, and restore them back to the active catalog. *(Staff access is restricted with a polite fallback screen)*. |
| **Konten Website (Website Content)** | Owner Only | Manage homepage hero banner copy, business story, store photo, and 3 value proposition cards with local file previews. |
| **Pengaturan Toko (Store Settings)** | Owner Only | Manage brand identity, store logo preview, physical address, business operating hours, WhatsApp ordering number, Instagram profile, and Google Maps URL. |
| **Pengguna (User Management)** | Owner Only | Owner account summary, staff account list, add new staff accounts, and deactivate existing staff credentials. |
| **Profil Saya (My Profile)** | Owner & Staff | Update account display name and change password with real-time security validation. |

---

### 3. Animation System & Micro-Interactions

- **Staggered Cascade Entrance:**
  Every panel, metric card, form section, and table across all 8 dashboard modules features a staggered entrance transition (40–80ms delay intervals) on initial page load or browser refresh.
- **Dedicated Animated Numbers & Currency (`AnimatedNumber.jsx`):**
  - Smooth count-up and roll-up animations powered by `requestAnimationFrame` and an `easeOutExpo` easing curve.
  - Formats standard integers as well as Indonesian Rupiah currency (`Rp25.000` without spaces).
  - Uses `font-variant-numeric: tabular-nums` to eliminate layout jitter during number transitions.
  - Integrated into dashboard overview cards, Rupiah price columns, category sort orders, item count badges, pagination summaries, and trash/staff counters.
- **Accessibility First (A11y):**
  Full compliance with `prefers-reduced-motion: reduce`. The animation system gracefully disables roll-up effects and immediately renders target values for users who prefer reduced motion.
- **Full-Screen Modal Portals:**
  Confirmation dialogs (delete product, restore product, deactivate staff, form modals) are rendered using React Portals directly into `document.body` with full viewport coverage (`100vw` × `100vh`, `z-index: 1000`) and automatic background scroll-locking.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework:** React 19 (`^19.3.1`)
- **Build Tool & Bundler:** Vite (`^8.3.6`)
- **Language:** Modern JavaScript (ESM, JSX)
- **Styling:** **Pure Modular CSS** + CSS Custom Properties (`src/styles/variables.css`).  
  *(No external CSS frameworks like Tailwind or Bootstrap; built with clean, maintainable, vanilla CSS tokens).*
- **Typography:** Google Fonts `Inter` (sans-serif)
- **State Management:** Reactive in-memory session stores (`productsStore`, `storeSettingsStore`, `usersStore`, `websiteContentStore`) implementing the observer/listener pattern.
- **Image Handling:** `ImageWithFallback.jsx` with Vite eager globbing (`import.meta.glob`). Automatically renders elegant cream/orange placeholder cards if photos are missing, preventing broken image icons or browser 404 errors.
- **Linter & Code Quality:** ESLint 9/10 flat config (`eslint .`) maintained at **0 errors and 0 warnings**.

---

## 🎨 Design Tokens & Color Palette

| CSS Token | Color Hex | Description & Usage |
|---|:---:|---|
| `--color-bg-primary` | `#FAF6EF` | Primary page background (warm soft cream) |
| `--color-text-dark` | `#493024` | Main headings and high-contrast text (deep warm brown) |
| `--color-text-muted` | `#6B5344` | Paragraph descriptions and body copy (medium brown) |
| `--color-orange` | `#DC722C` | Brand accent for primary CTA buttons, active tabs, and links |
| `--color-orange-hover` | `#C6611F` | Hover state for primary buttons |
| `--color-orange-light` | `#FDF4ED` | Soft tinted background for active badges and highlights |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18+ recommended)
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

### 3. Run Lint Verification
```bash
npm run lint
```

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🔐 Demo Dashboard Credentials

The dashboard login page is accessible via the **Masuk** navigation link or directly at `/login`:

| Role | Demo Email | Demo Password | Permitted Access |
|---|---|---|---|
| **Owner (Pemilik)** | `pemilik@rasapulang.example` | `DemoPemilik123!` | Unrestricted access to all 8 modules (including Product Trash, Store Settings, Website Content, and User Management). |
| **Staff (Staf)** | `staf@rasapulang.example` | `DemoStaf123!` | Operational catalog access (Overview, Categories, Products, My Profile). Owner-only pages are restricted with a polite access notice. |

> **Portfolio Simulation Notice:**  
> All authentication states, catalog changes, and settings operate entirely within in-memory mock stores. Any data updates made during the demo session will safely reset to initial baseline values upon a full browser page reload.

---

## 👤 Author

**Rafli Fahreza**  
*Senior Frontend & UI Engineer*
