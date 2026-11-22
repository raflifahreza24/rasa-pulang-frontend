/**
 * Data terpusat dan konfigurasi hak akses Dashboard Admin Rasa Pulang.
 * Mengacu langsung pada Brief Klien Dina Prameswari (Bab 6, 7, dan 8).
 */

import { productsData, categoriesData } from './productsData';
import { siteConfig } from './homeData';

// Akun Pengguna Default (Pemilik & Staf)
export const initialAdminUsers = [
  {
    id: 'user-owner-1',
    name: 'Dina Prameswari',
    email: 'dina@rasapulang.com',
    role: 'pemilik',
    roleLabel: 'Pemilik Usaha',
    avatarText: 'DP',
    isActive: true,
    joinedDate: '2026-01-10',
  },
  {
    id: 'user-staff-1',
    name: 'Siti Rahmawati',
    email: 'siti.staff@rasapulang.com',
    role: 'staf',
    roleLabel: 'Staf Toko',
    avatarText: 'SR',
    isActive: true,
    joinedDate: '2026-02-15',
  },
];

// Definisi Menu Dashboard dan Hak Akses (Role-Based Access Control)
export const dashboardNavItems = [
  {
    id: 'ringkasan',
    label: 'Ringkasan',
    description: 'Melihat kondisi katalog secara cepat',
    icon: 'chart',
    allowedRoles: ['pemilik', 'staf'],
  },
  {
    id: 'produk',
    label: 'Kelola Produk',
    description: 'Mengelola informasi, harga, dan foto produk',
    icon: 'box',
    allowedRoles: ['pemilik', 'staf'],
  },
  {
    id: 'kategori',
    label: 'Kategori Produk',
    description: 'Mengelola kategori dan urutan tampilan',
    icon: 'folder',
    allowedRoles: ['pemilik', 'staf'],
  },
  {
    id: 'konten',
    label: 'Konten Website',
    description: 'Mengubah banner, cerita usaha, dan keunggulan',
    icon: 'layout',
    allowedRoles: ['pemilik'], // Khusus Pemilik
  },
  {
    id: 'pengaturan',
    label: 'Pengaturan Toko',
    description: 'Mengubah kontak, jam operasional, dan lokasi',
    icon: 'settings',
    allowedRoles: ['pemilik'], // Khusus Pemilik
  },
  {
    id: 'pengguna',
    label: 'Kelola Staf',
    description: 'Mengelola akses akun staf toko',
    icon: 'users',
    allowedRoles: ['pemilik'], // Khusus Pemilik
  },
  {
    id: 'sampah',
    label: 'Sampah Produk',
    description: 'Memulihkan produk yang dihapus',
    icon: 'trash',
    allowedRoles: ['pemilik'], // Khusus Pemilik
  },
  {
    id: 'profil',
    label: 'Profil Saya',
    description: 'Mengubah nama dan password akun sendiri',
    icon: 'user',
    allowedRoles: ['pemilik', 'staf'],
  },
];

// Helper untuk menghitung statistik Ringkasan Dashboard (Brief Bab 6.A)
export function calculateDashboardMetrics(products = productsData, categories = categoriesData) {
  const activeCategoriesCount = categories.filter((c) => c.isActive).length;
  const nonDeletedProducts = products.filter((p) => !p.deletedAt);
  const displayedProductsCount = nonDeletedProducts.filter((p) => p.isPublished).length;
  const hiddenProductsCount = nonDeletedProducts.filter((p) => !p.isPublished).length;
  const outOfStockCount = nonDeletedProducts.filter((p) => p.availability === 'Habis').length;
  const featuredCount = nonDeletedProducts.filter((p) => p.isFeatured).length;
  const trashCount = products.filter((p) => Boolean(p.deletedAt)).length;

  // 5 Produk Terakhir Diperbarui
  const recentProducts = [...nonDeletedProducts]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5);

  return {
    activeCategoriesCount,
    totalProductsCount: nonDeletedProducts.length,
    displayedProductsCount,
    hiddenProductsCount,
    outOfStockCount,
    featuredCount,
    trashCount,
    recentProducts,
  };
}

// Data Awal Konten Website yang Dapat Diubah Pemilik (Brief Bab 6.D)
export const initialWebsiteContent = {
  heroBanner: {
    eyebrow: 'OLEH-OLEH & CAMILAN KHAS SIDOARJO',
    title: 'Bawa Pulang Camilan, Bagikan Kehangatan.',
    description: 'Temukan camilan favorit dan paket oleh-oleh untuk orang tersayang. Lihat pilihan kami, lalu pesan mudah melalui WhatsApp.',
    image: '/images/rasa-pulang/hero/hero-snacks.webp',
  },
  brandStory: {
    label: 'CERITA KAMI',
    title: 'Ada Cerita di Setiap Rasa',
    paragraph: 'Dari Sidoarjo, Rasa Pulang menghadirkan pilihan camilan dan oleh-oleh untuk menemani kebersamaan. Kami melayani pembelian satuan hingga paket untuk dibagikan.',
    storePhoto: '/images/rasa-pulang/store/store-interior.webp',
  },
  benefits: [
    { id: 1, title: 'Banyak Pilihan Camilan', desc: 'Manis, gurih, hingga oleh-oleh khas daerah.' },
    { id: 2, title: 'Paket untuk Berbagi', desc: 'Pilihan oleh-oleh dan hampers untuk orang tersayang.' },
    { id: 3, title: 'Mudah Dipesan', desc: 'Tanyakan produk dan pesan langsung melalui WhatsApp.' },
  ],
};

// Data Awal Pengaturan Toko (Brief Bab 6.E)
export const initialStoreSettings = {
  storeName: siteConfig.storeName,
  tagline: siteConfig.tagline,
  address: 'Jl. Contoh No. 12, Sidoarjo, Jawa Timur',
  operatingDays: 'Senin–Minggu',
  operatingHours: '08.00–20.00 WIB',
  whatsAppNumber: siteConfig.contact.whatsAppNumber || '6281234567890',
  instagramUrl: 'https://instagram.com/rasapulang.sidoarjo',
  googleMapsUrl: siteConfig.contact.googleMapsUrl,
};
