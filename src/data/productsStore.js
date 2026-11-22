import { productsData as initialProducts } from './productsData.js';

/**
 * In-memory Shared Store untuk Produk pada Sesi Demo Frontend.
 * Menghubungkan Daftar Produk, Tambah Produk, Kategori, dan Ringkasan Dashboard
 * tanpa reload atau dependensi eksternal.
 */

let sessionProducts = [...initialProducts];
const listeners = new Set();

export const getSessionProducts = () => sessionProducts;

/**
 * Mencari produk berdasarkan ID numerik atau string, atau slug
 */
export const getProductById = (id) => {
  if (id === null || id === undefined) return null;
  return (
    sessionProducts.find(
      (p) => String(p.id) === String(id) || String(p.slug) === String(id)
    ) || null
  );
};

export const addSessionProduct = (newProduct) => {
  sessionProducts = [newProduct, ...sessionProducts];
  listeners.forEach((listener) => {
    try {
      listener(sessionProducts);
    } catch {
      // Abaikan error pada listener yang sudah unmount
    }
  });
  return newProduct;
};

/**
 * Memperbarui data produk yang ada di dalam session store
 */
export const updateSessionProduct = (productId, updatedFields) => {
  let updatedProduct = null;
  sessionProducts = sessionProducts.map((p) => {
    if (String(p.id) === String(productId)) {
      updatedProduct = {
        ...p,
        ...updatedFields,
        id: p.id, // Pertahankan ID asli
        createdAt: p.createdAt, // Pertahankan tanggal pembuatan
        slug: updatedFields.slug || p.slug, // Pertahankan stabilitas slug
        updatedAt: new Date().toISOString(), // Perbarui timestamp ISO
      };
      return updatedProduct;
    }
    return p;
  });

  listeners.forEach((listener) => {
    try {
      listener(sessionProducts);
    } catch {
      // Abaikan error
    }
  });

  return updatedProduct;
};

export const softDeleteSessionProduct = (productId) => {
  sessionProducts = sessionProducts.map((p) => {
    if (String(p.id) === String(productId)) {
      return {
        ...p,
        deletedAt: new Date().toISOString(),
        isFeatured: false,
      };
    }
    return p;
  });

  listeners.forEach((listener) => {
    try {
      listener(sessionProducts);
    } catch {
      // Abaikan error
    }
  });
};

/**
 * Memulihkan produk dari Sampah Produk kembali ke Daftar Produk aktif
 */
export const restoreSessionProduct = (productId) => {
  let restoredProduct = null;
  sessionProducts = sessionProducts.map((p) => {
    if (String(p.id) === String(productId)) {
      restoredProduct = {
        ...p,
        deletedAt: null,
        isFeatured: false, // Tidak otomatis menjadi produk unggulan
        updatedAt: new Date().toISOString(), // Perbarui timestamp
      };
      return restoredProduct;
    }
    return p;
  });

  listeners.forEach((listener) => {
    try {
      listener(sessionProducts);
    } catch {
      // Abaikan error
    }
  });

  return restoredProduct;
};

/**
 * Mengambil seluruh produk yang berstatus dihapus (deletedAt !== null)
 */
export const getTrashedSessionProducts = () => {
  return sessionProducts.filter((p) => Boolean(p.deletedAt));
};

export const subscribeSessionProducts = (listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/**
 * Menghitung penggunaan slot unggulan global saat ini dari produk yang belum dihapus
 */
export const getFeaturedSlotUsage = () => {
  const activeFeatured = sessionProducts.filter((p) => p.isFeatured && !p.deletedAt);
  return {
    used: activeFeatured.length,
    max: 8,
    isFull: activeFeatured.length >= 8,
  };
};

/**
 * Menghitung penggunaan slot unggulan khusus konteks edit produk
 */
export const getFeaturedSlotUsageForProduct = (productId) => {
  const currentProduct = getProductById(productId);
  const isCurrentlyFeatured = Boolean(currentProduct?.isFeatured && !currentProduct?.deletedAt);
  const activeFeatured = sessionProducts.filter((p) => p.isFeatured && !p.deletedAt);
  const otherFeaturedCount = sessionProducts.filter(
    (p) => p.isFeatured && !p.deletedAt && String(p.id) !== String(productId)
  ).length;

  return {
    totalUsed: activeFeatured.length,
    otherUsed: otherFeaturedCount,
    isCurrentlyFeatured,
    max: 8,
    canEnable: isCurrentlyFeatured || otherFeaturedCount < 8,
  };
};

/**
 * Memeriksa apakah SKU sudah digunakan di produk aktif maupun sampah,
 * dengan opsi mengecualikan ID produk yang sedang diedit.
 */
export const isSkuDuplicate = (sku, excludeProductId = null) => {
  if (!sku) return false;
  const normalized = sku.trim().toUpperCase();
  return sessionProducts.some(
    (p) =>
      (!excludeProductId || String(p.id) !== String(excludeProductId)) &&
      (p.sku || '').trim().toUpperCase() === normalized
  );
};
