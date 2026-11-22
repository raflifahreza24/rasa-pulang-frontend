/**
 * In-Memory Shared Store untuk Pengaturan Toko Rasa Pulang.
 * Digunakan untuk mengelola identitas, alamat, jam operasional, dan kontak toko.
 * Terhubung dengan siteConfig untuk menyinkronkan data ke website publik selama sesi demo.
 */

import { siteConfig } from './homeData';

const INITIAL_STORE_SETTINGS = {
  storeName: 'Rasa Pulang',
  logo: '/images/rasa-pulang/brand/logo-rasa-pulang.webp',
  address: 'Jl. Contoh No. 12, Sidoarjo, Jawa Timur',
  openingHours: 'Senin–Minggu · 08.00–20.00 WIB',
  whatsappNumber: null, // Default null untuk mode simulasi
  instagramUrl: null,   // Default null untuk mode simulasi
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sidoarjo',
  isSimulation: true,
};

let currentStoreSettings = JSON.parse(JSON.stringify(INITIAL_STORE_SETTINGS));
const listeners = new Set();

/**
 * Sinkronkan perubahan store ke objek global siteConfig di homeData.js
 */
function syncWithSiteConfig(settings) {
  if (!siteConfig) return;
  siteConfig.storeName = settings.storeName;
  siteConfig.address = settings.address;
  siteConfig.operatingHours = settings.openingHours;
  if (siteConfig.contact) {
    siteConfig.contact.whatsAppNumber = settings.whatsappNumber;
    siteConfig.contact.instagramUrl = settings.instagramUrl;
    siteConfig.contact.googleMapsUrl = settings.googleMapsUrl;
  }
}

export function getStoreSettings() {
  return JSON.parse(JSON.stringify(currentStoreSettings));
}

export function updateStoreSettings(newSettings) {
  currentStoreSettings = {
    ...currentStoreSettings,
    ...newSettings,
  };

  syncWithSiteConfig(currentStoreSettings);

  listeners.forEach((listener) => {
    try {
      listener(getStoreSettings());
    } catch {
      // Ignore listener error
    }
  });

  return getStoreSettings();
}

export function subscribeStoreSettings(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function resetStoreSettings() {
  currentStoreSettings = JSON.parse(JSON.stringify(INITIAL_STORE_SETTINGS));
  syncWithSiteConfig(currentStoreSettings);

  listeners.forEach((listener) => {
    try {
      listener(getStoreSettings());
    } catch {
      // Ignore
    }
  });

  return getStoreSettings();
}
