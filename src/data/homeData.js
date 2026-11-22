/**
 * Data terpusat untuk halaman Beranda Rasa Pulang.
 * Mengikuti spesifikasi brief dan menggunakan produk master dari productsData.js
 */

import { categoriesData, productsData } from './productsData';

export { categoriesData };

export const siteConfig = {
  storeName: 'Rasa Pulang',
  tagline: 'Camilan pilihan, hangatnya kebersamaan.',
  businessType: 'Toko oleh-oleh dan camilan kemasan',
  city: 'Sidoarjo, Jawa Timur',
  address: 'Jl. Contoh No. 12, Sidoarjo',
  operatingHours: 'Senin–Minggu · 08.00–20.00 WIB',
  simulationNotice: 'Website simulasi portofolio — bisnis, produk, dan kontak merupakan data contoh.',
  footerDisclaimer: 'Proyek portofolio · Seluruh identitas dan informasi bisnis merupakan simulasi.',
  
  // Konfigurasi kontak terpusat (default null untuk mencegah tautan ke akun orang lain)
  contact: {
    phoneDisplay: 'WhatsApp: Kontak simulasi',
    // Ganti dengan nomor WhatsApp aktif (misal: '6281234567890') jika sudah siap produksi
    whatsAppNumber: null,
    instagramHandle: 'Akun simulasi',
    // Ganti dengan URL Instagram resmi jika sudah siap
    instagramUrl: null,
    // URL pencarian Maps yang valid di wilayah Sidoarjo
    googleMapsUrl: 'https://www.google.com/maps/search/Sidoarjo,+Jawa+Timur',
  },
};

export const navigationLinks = [
  { id: 'beranda', label: 'Beranda', href: '/', active: true },
  { id: 'katalog', label: 'Katalog', href: '/katalog', active: false },
  { id: 'tentang-kami', label: 'Tentang Kami', href: '/tentang-kami', active: false },
  { id: 'kontak', label: 'Kontak', href: '/kontak', active: false },
];

export const heroContent = {
  eyebrow: 'OLEH-OLEH & CAMILAN KHAS SIDOARJO',
  title: 'Bawa Pulang Camilan, Bagikan Kehangatan.',
  description: 'Temukan camilan favorit dan paket oleh-oleh untuk orang tersayang. Lihat pilihan kami, lalu pesan mudah melalui WhatsApp.',
  primaryCta: {
    label: 'Lihat Katalog',
    href: '/katalog',
  },
  secondaryCta: {
    label: 'Hubungi via WhatsApp',
    isWhatsAppAction: true,
  },
  image: '/images/rasa-pulang/hero/hero-snacks.webp',
  imageAlt: 'Aneka camilan kemasan dan paket hampers Rasa Pulang khas Sidoarjo',
};

// 8 Produk Unggulan diambil langsung dari 8 produk pertama productsData
export const featuredProductsData = productsData.slice(0, 8).map((product) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  status: product.availability,
  isAvailable: product.availability === 'Tersedia',
  image: `/images/rasa-pulang/products/${product.imageKey}.webp`,
  alt: product.alt,
  category: product.categoryId,
}));

export const benefitsData = [
  {
    id: 'banyak-pilihan',
    title: 'Banyak Pilihan Camilan',
    description: 'Manis, gurih, hingga oleh-oleh khas daerah.',
    icon: 'snack',
  },
  {
    id: 'paket-berbagi',
    title: 'Paket untuk Berbagi',
    description: 'Pilihan oleh-oleh dan hampers untuk orang tersayang.',
    icon: 'gift',
  },
  {
    id: 'mudah-dipesan',
    title: 'Mudah Dipesan',
    description: 'Tanyakan produk dan pesan langsung melalui WhatsApp.',
    icon: 'chat',
  },
];

export const aboutStoryData = {
  eyebrow: 'CERITA KAMI',
  title: 'Ada Cerita di Setiap Rasa',
  description: 'Dari Sidoarjo, Rasa Pulang menghadirkan pilihan camilan dan oleh-oleh untuk menemani kebersamaan. Kami melayani pembelian satuan hingga paket untuk dibagikan.',
  ctaText: 'Kenali Rasa Pulang →',
  image: '/images/rasa-pulang/store/store-interior.webp',
  imageAlt: 'Interior toko Rasa Pulang yang hangat dan rapi di Sidoarjo',
};

export const storeLocationData = {
  title: 'Mampir dan Temukan Favoritmu',
  city: 'Sidoarjo, Jawa Timur',
  simulationBadge: 'Lokasi & jam operasional simulasi',
  address: 'Jl. Contoh No. 12, Sidoarjo',
  operatingHours: 'Senin–Minggu · 08.00–20.00 WIB',
  image: '/images/rasa-pulang/store/store-front.webp',
  imageAlt: 'Tampak depan toko Rasa Pulang di Sidoarjo',
  ctaPrimary: 'Lihat Kontak & Lokasi',
  ctaSecondary: 'Buka di Google Maps',
};

/**
 * Format angka ke format mata uang Rupiah tanpa desimal (id-ID)
 * Contoh: 25000 -> "Rp25.000"
 */
export const formatRupiah = (number) => {
  if (typeof number !== 'number') return 'Rp0';
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);

  return formatted.replace(/\s+/g, '');
};

/**
 * Helper pembuat URL WhatsApp dengan format pesan otomatis
 */
export const buildWhatsAppUrl = (phone, productName = null, isAvailable = true) => {
  if (!phone) return null;
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  let message = 'Halo Rasa Pulang, saya ingin bertanya tentang produk oleh-oleh.';
  if (productName) {
    if (isAvailable) {
      message = `Halo Rasa Pulang, saya ingin memesan "${productName}". Apakah produk ini tersedia?`;
    } else {
      message = `Halo Rasa Pulang, saya ingin menanyakan ketersediaan produk "${productName}". Kapan produk ini tersedia kembali?`;
    }
  }
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
