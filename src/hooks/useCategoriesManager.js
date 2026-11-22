import { useState, useMemo, useCallback } from 'react';
import { categoriesData as initialCategories, productsData } from '../data/productsData';

/**
 * Hook kustom untuk mengelola state dan logika bisnis Kategori Produk.
 * Menggunakan memori sesi (tanpa backend/localStorage) sesuai batasan frontend portofolio.
 */
export function useCategoriesManager() {
  const [categories, setCategories] = useState(() => {
    // Inisialisasi dari master data dengan default fallback atribut
    return initialCategories.map((c, index) => ({
      id: c.id || c.slug,
      slug: c.slug || c.id,
      name: c.name,
      description: c.description || '',
      sortOrder: c.sortOrder ?? index + 1,
      isActive: c.isActive !== false,
      image: c.image || `/images/rasa-pulang/categories/${c.slug}.webp`,
      alt: c.alt || `Kategori ${c.name} Rasa Pulang`,
    }));
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Menghitung jumlah produk terhubung ke suatu kategori secara akurat
  const getProductCount = useCallback((category) => {
    if (!category) return 0;
    return productsData.filter(
      (p) => p.categoryId === category.id || p.categoryId === category.slug
    ).length;
  }, []);

  // Memeriksa apakah kategori aman dihapus (hanya jika 0 produk)
  const canDeleteCategory = useCallback((category) => {
    return getProductCount(category) === 0;
  }, [getProductCount]);

  // Validasi keunikan nama kategori (case-insensitive & whitespace-trimmed)
  const isNameUnique = useCallback((name, excludeId = null) => {
    const trimmed = name.trim().toLowerCase();
    return !categories.some(
      (c) => c.id !== excludeId && c.name.trim().toLowerCase() === trimmed
    );
  }, [categories]);

  // Tambah kategori baru
  const addCategory = useCallback((data) => {
    const trimmedName = (data.name || '').trim();
    if (!trimmedName) {
      return { success: false, error: 'Nama kategori wajib diisi.' };
    }

    if (!isNameUnique(trimmedName)) {
      return { success: false, error: `Kategori "${trimmedName}" sudah ada. Gunakan nama yang berbeda.` };
    }

    const slug = trimmedName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || `kategori-${Date.now()}`;

    const newCategory = {
      id: `${slug}-${Date.now()}`,
      slug,
      name: trimmedName,
      description: (data.description || '').trim(),
      sortOrder: Number(data.sortOrder) || categories.length + 1,
      isActive: data.isActive !== false,
      image: data.image || '/images/rasa-pulang/categories/camilan-gurih.webp',
      alt: `Kategori ${trimmedName} Rasa Pulang`,
    };

    setCategories((prev) => [...prev, newCategory]);
    return { success: true, category: newCategory };
  }, [categories.length, isNameUnique]);

  // Perbarui kategori yang sudah ada
  const updateCategory = useCallback((id, data) => {
    const trimmedName = (data.name || '').trim();
    if (!trimmedName) {
      return { success: false, error: 'Nama kategori wajib diisi.' };
    }

    if (!isNameUnique(trimmedName, id)) {
      return { success: false, error: `Nama kategori "${trimmedName}" sudah digunakan oleh kategori lain.` };
    }

    let updatedCat = null;
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          updatedCat = {
            ...c,
            name: trimmedName,
            description: (data.description !== undefined ? data.description : c.description).trim(),
            sortOrder: Number(data.sortOrder) || c.sortOrder,
            isActive: data.isActive !== undefined ? Boolean(data.isActive) : c.isActive,
            image: data.image || c.image,
            alt: `Kategori ${trimmedName} Rasa Pulang`,
          };
          return updatedCat;
        }
        return c;
      })
    );

    return { success: true, category: updatedCat };
  }, [isNameUnique]);

  // Hapus kategori (hanya diizinkan jika productCount === 0)
  const deleteCategory = useCallback((id) => {
    const target = categories.find((c) => c.id === id);
    if (!target) {
      return { success: false, error: 'Kategori tidak ditemukan.' };
    }

    if (!canDeleteCategory(target)) {
      return {
        success: false,
        error: 'Kategori yang masih memiliki produk tidak dapat dihapus. Pindahkan produk terlebih dahulu.',
      };
    }

    setCategories((prev) => prev.filter((c) => c.id !== id));
    return { success: true };
  }, [categories, canDeleteCategory]);

  // Toggle status aktif/nonaktif
  const toggleCategoryStatus = useCallback((id, newStatus) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: Boolean(newStatus) } : c))
    );
  }, []);

  // Filter dan pengurutan (berdasarkan sortOrder menaik, lalu nama)
  const filteredCategories = useMemo(() => {
    let result = [...categories];

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.description && c.description.toLowerCase().includes(q))
      );
    }

    return result.sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) {
        return (a.sortOrder || 0) - (b.sortOrder || 0);
      }
      return a.name.localeCompare(b.name);
    });
  }, [categories, searchQuery]);

  return {
    categories,
    filteredCategories,
    searchQuery,
    setSearchQuery,
    totalCount: categories.length,
    filteredCount: filteredCategories.length,
    getProductCount,
    canDeleteCategory,
    isNameUnique,
    addCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryStatus,
  };
}
