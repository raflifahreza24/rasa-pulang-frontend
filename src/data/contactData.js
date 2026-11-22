/**
 * Data terpusat untuk halaman Kontak dan Lokasi Rasa Pulang.
 * Mengacu pada siteConfig bersama di homeData.js untuk menjamin konsistensi informasi toko.
 */

import { siteConfig } from './homeData';

export const contactIntroData = {
  eyebrow: 'KAMI SIAP MEMBANTU',
  title: 'Kontak dan Lokasi',
  description: 'Ingin bertanya tentang camilan, paket oleh-oleh, atau rencana kunjungan? Temukan informasi toko dan hubungi kami di sini.',
};

export const storeFrontPhotoData = {
  path: '/images/rasa-pulang/store/store-front.webp',
  alt: 'Tampak depan toko Rasa Pulang di Sidoarjo dengan plang nama dan etalase camilan',
  placeholderLabel: 'Foto depan toko',
  caption: 'Ilustrasi toko untuk proyek portofolio.',
  aspectRatio: '0.75 / 1', // Rasio portrait yang selaras dengan tinggi panel kontak pada desktop
  objectPosition: 'center',
};

export const contactInformationData = {
  storeName: siteConfig.storeName,
  
  // 1. Alamat Toko
  address: {
    label: 'Alamat Toko',
    value: 'Jl. Contoh No. 12, Sidoarjo, Jawa Timur',
    note: 'Alamat simulasi, bukan lokasi usaha sebenarnya.',
  },

  // 2. Jam Operasional
  operatingHours: {
    label: 'Jam Operasional',
    days: 'Senin–Minggu',
    hours: '08.00–20.00 WIB',
    note: 'Jam operasional simulasi.',
  },

  // 3. WhatsApp
  whatsApp: {
    label: 'WhatsApp',
    description: 'Tanyakan ketersediaan produk dan kebutuhan pemesanan.',
    status: 'Kontak simulasi.',
    buttonText: 'Hubungi via WhatsApp',
    message: 'Halo Rasa Pulang, saya ingin menanyakan informasi produk dan pemesanan.',
    phoneNumber: siteConfig.contact.whatsAppNumber,
  },

  // 4. Instagram
  instagram: {
    label: 'Instagram',
    description: 'Lihat informasi dan kabar terbaru toko.',
    status: 'Akun simulasi.',
    buttonText: 'Lihat Instagram',
    url: siteConfig.contact.instagramUrl,
  },

  // 5. Lokasi di Google Maps
  googleMaps: {
    label: 'Lokasi di Google Maps',
    description: 'Temukan petunjuk lokasi untuk rencana kunjungan.',
    buttonText: 'Buka di Google Maps',
    note: 'Demo mengarah ke pencarian wilayah Sidoarjo.',
    url: 'https://www.google.com/maps/search/?api=1&query=Sidoarjo%2C%20Jawa%20Timur',
  },
};

export const contactSimulationNoticeData = {
  text: 'Halaman ini merupakan simulasi portofolio. Alamat, jam operasional, foto, dan kontak bukan informasi toko sungguhan.',
};

export const catalogCtaData = {
  title: 'Sudah menemukan camilan favoritmu?',
  description: 'Lihat pilihan produk, lalu tanyakan ketersediaannya melalui WhatsApp.',
  buttonText: 'Lihat Katalog',
  href: '/katalog',
};
