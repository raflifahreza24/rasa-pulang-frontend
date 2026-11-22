/**
 * Data terpusat untuk halaman Tentang Kami Rasa Pulang.
 */

import { benefitsData } from './homeData';

export const aboutIntroData = {
  eyebrow: 'MENGENAL RASA PULANG',
  title: 'Camilan Pilihan, Hangatnya\nKebersamaan.',
  description: 'Dari Sidoarjo, kami menghadirkan pilihan camilan dan oleh-oleh untuk menemani waktu santai, perjalanan, dan momen berbagi.',
};

export const storePhotoData = {
  path: '/images/rasa-pulang/store/store-interior.webp',
  alt: 'Suasana rak display dan interior toko Rasa Pulang di Sidoarjo',
  aspectRatio: '2.1 / 1',
  placeholderLabel: 'Foto interior toko',
  objectPosition: 'center',
};

export const brandStoryData = {
  label: 'CERITA KAMI',
  title: 'Berawal dari Rasa,\nTumbuh Lewat\nKebersamaan.',
  simulationBadge: 'Cerita usaha simulasi untuk proyek portofolio.',
  paragraphs: [
    'Rasa Pulang hadir dari keinginan sederhana: membantu orang menemukan camilan yang enak untuk dinikmati sendiri maupun dibagikan kepada orang tersayang.',
    'Dikelola oleh Dina Prameswari di Sidoarjo, toko ini menghadirkan pilihan keripik, kerupuk, camilan manis dan gurih, hingga paket oleh-oleh. Kami ingin setiap kunjungan terasa ramah, dan setiap pilihan mudah ditemukan.',
  ],
};

export const aboutBenefitsData = {
  title: 'Yang Membuat Kami Dekat',
  items: benefitsData,
};

export const purchaseOptionsData = {
  title: 'Untuk Dinikmati Sendiri atau Dibagikan',
  description: 'Kami melayani pembelian satuan serta paket oleh-oleh dan hampers. Pilih produk melalui katalog, lalu diskusikan kebutuhan Anda bersama staf melalui WhatsApp.',
  cards: [
    {
      id: 'pembelian-satuan',
      title: 'Pembelian Satuan',
      description: 'Temukan camilan favorit untuk teman santai dan kebutuhan sehari-hari.',
      image: '/images/rasa-pulang/about/pembelian-satuan.webp',
      alt: 'Aneka kemasan camilan pembelian satuan Rasa Pulang',
      placeholderLabel: 'Foto camilan satuan',
      aspectRatio: '1.8 / 1',
    },
    {
      id: 'paket-hampers',
      title: 'Paket Oleh-oleh & Hampers',
      description: 'Pilihan untuk keluarga, teman, dan berbagai momen kebersamaan.',
      image: '/images/rasa-pulang/about/paket-hampers.webp',
      alt: 'Paket oleh-oleh dan hampers cantik Rasa Pulang',
      placeholderLabel: 'Foto paket oleh-oleh & hampers',
      aspectRatio: '1.8 / 1',
    },
  ],
};

export const aboutCtaData = {
  title: 'Temukan Rasa Favoritmu',
  description: 'Jelajahi pilihan camilan kami atau tanyakan kebutuhan Anda langsung kepada toko.',
  catalogButtonText: 'Lihat Katalog',
  contactButtonText: 'Hubungi Kami',
};
