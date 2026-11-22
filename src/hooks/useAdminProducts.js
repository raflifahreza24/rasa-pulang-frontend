import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  getSessionProducts,
  subscribeSessionProducts,
  softDeleteSessionProduct,
} from '../data/productsStore';

const ITEMS_PER_PAGE = 8;

/**
 * Membaca parameter query URL awal
 */
function getInitialParamsFromUrl() {
  if (typeof window === 'undefined') {
    return {
      q: '',
      category: 'all',
      publication: 'all',
      availability: 'all',
      featured: 'all',
      page: 1,
    };
  }

  const params = new URLSearchParams(window.location.search);
  const q = params.get('q') || '';
  const category = params.get('category') || 'all';
  const publication = params.get('publication') || 'all';
  const availability = params.get('availability') || 'all';
  const featured = params.get('featured') || 'all';
  const pageParsed = parseInt(params.get('page') || '1', 10);
  const page = isNaN(pageParsed) || pageParsed < 1 ? 1 : pageParsed;

  return { q, category, publication, availability, featured, page };
}

/**
 * Menyinkronkan parameter filter & pagination ke URL query string tanpa reload halaman
 */
function syncParamsToUrl({ q, category, publication, availability, featured, page }) {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams();
  if (q && q.trim()) params.set('q', q.trim());
  if (category && category !== 'all') params.set('category', category);
  if (publication && publication !== 'all') params.set('publication', publication);
  if (availability && availability !== 'all') params.set('availability', availability);
  if (featured && featured !== 'all') params.set('featured', featured);
  if (page && page > 1) params.set('page', String(page));

  const queryString = params.toString();
  const currentPath = window.location.pathname;
  const targetUrl = queryString ? `${currentPath}?${queryString}` : currentPath;

  // Gunakan replaceState agar tidak mengotori riwayat back/forward saat mengetik
  window.history.replaceState(null, '', targetUrl);
}

export function useAdminProducts(currentUser) {
  // State produk lokal untuk sesi demo (mendukung soft delete & penambahan produk)
  const [products, setProducts] = useState(() => getSessionProducts());

  useEffect(() => {
    return subscribeSessionProducts((updatedList) => {
      setProducts(updatedList);
    });
  }, []);

  // State filter & pencarian diinisialisasi dari query string URL
  const [searchQuery, setSearchQuery] = useState(() => getInitialParamsFromUrl().q);
  const [categoryFilter, setCategoryFilter] = useState(() => getInitialParamsFromUrl().category);
  const [publicationFilter, setPublicationFilter] = useState(() => getInitialParamsFromUrl().publication);
  const [availabilityFilter, setAvailabilityFilter] = useState(() => getInitialParamsFromUrl().availability);
  const [featuredFilter, setFeaturedFilter] = useState(() => getInitialParamsFromUrl().featured);
  const [currentPage, setCurrentPage] = useState(() => getInitialParamsFromUrl().page);

  // Dengarkan popstate (tombol Back / Forward browser)
  useEffect(() => {
    function handlePopState() {
      const p = getInitialParamsFromUrl();
      setSearchQuery(p.q);
      setCategoryFilter(p.category);
      setPublicationFilter(p.publication);
      setAvailabilityFilter(p.availability);
      setFeaturedFilter(p.featured);
      setCurrentPage(p.page);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sinkronisasi setiap kali state filter berubah
  useEffect(() => {
    syncParamsToUrl({
      q: searchQuery,
      category: categoryFilter,
      publication: publicationFilter,
      availability: availabilityFilter,
      featured: featuredFilter,
      page: currentPage,
    });
  }, [searchQuery, categoryFilter, publicationFilter, availabilityFilter, featuredFilter, currentPage]);

  // 1. Ekstrak produk non-deleted
  const activeProducts = useMemo(() => {
    return products.filter((p) => !p.deletedAt);
  }, [products]);

  // 2. Terapkan filter & pencarian gabungan
  const filteredProducts = useMemo(() => {
    let result = [...activeProducts];

    // Filter Pencarian (Nama & SKU, case-insensitive, trimmed)
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.sku && p.sku.toLowerCase().includes(q))
      );
    }

    // Filter Kategori
    if (categoryFilter && categoryFilter !== 'all') {
      result = result.filter(
        (p) => p.categoryId === categoryFilter || p.categorySlug === categoryFilter
      );
    }

    // Filter Publikasi ('all', 'published', 'hidden')
    if (publicationFilter === 'published') {
      result = result.filter((p) => p.isPublished === true);
    } else if (publicationFilter === 'hidden') {
      result = result.filter((p) => p.isPublished === false);
    }

    // Filter Ketersediaan ('all', 'available', 'out_of_stock')
    if (availabilityFilter === 'available') {
      result = result.filter((p) => p.availability === 'Tersedia');
    } else if (availabilityFilter === 'out_of_stock') {
      result = result.filter((p) => p.availability === 'Habis');
    }

    // Filter Unggulan ('all', 'yes', 'no')
    if (featuredFilter === 'yes') {
      result = result.filter((p) => p.isFeatured === true);
    } else if (featuredFilter === 'no') {
      result = result.filter((p) => !p.isFeatured);
    }

    // Urutan stabil berdasarkan ID menaik
    return result.sort((a, b) => a.id - b.id);
  }, [activeProducts, searchQuery, categoryFilter, publicationFilter, availabilityFilter, featuredFilter]);

  // 3. Kalkulasi Pagination
  const totalFilteredCount = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalFilteredCount / ITEMS_PER_PAGE));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, safePage]);

  const rangeStart = totalFilteredCount > 0 ? (safePage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const rangeEnd = totalFilteredCount > 0 ? Math.min(safePage * ITEMS_PER_PAGE, totalFilteredCount) : 0;

  // Handlers
  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((value) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  }, []);

  const handlePublicationChange = useCallback((value) => {
    setPublicationFilter(value);
    setCurrentPage(1);
  }, []);

  const handleAvailabilityChange = useCallback((value) => {
    setAvailabilityFilter(value);
    setCurrentPage(1);
  }, []);

  const handleFeaturedChange = useCallback((value) => {
    setFeaturedFilter(value);
    setCurrentPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setCategoryFilter('all');
    setPublicationFilter('all');
    setAvailabilityFilter('all');
    setFeaturedFilter('all');
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [totalPages]);

  // Simulasi Soft Delete Khusus Pemilik
  const handleSoftDelete = useCallback((productId) => {
    // Validasi peran demo di handler
    const isOwner = currentUser?.role === 'owner' || !currentUser?.role;
    if (!isOwner) {
      return { success: false, error: 'Hanya pemilik yang dapat menghapus produk.' };
    }

    const target = products.find((p) => p.id === productId);
    const deletedName = target?.name || '';
    softDeleteSessionProduct(productId);

    // Koreksi halaman jika halaman terakhir menjadi kosong
    setCurrentPage((prevPage) => {
      const remainingTotal = totalFilteredCount - 1;
      const newTotalPages = Math.max(1, Math.ceil(remainingTotal / ITEMS_PER_PAGE));
      if (prevPage > newTotalPages) {
        return newTotalPages;
      }
      return prevPage;
    });

    return { success: true, name: deletedName };
  }, [currentUser, products, totalFilteredCount]);

  return {
    products: paginatedProducts,
    allActiveProductsCount: activeProducts.length,
    totalFilteredCount,
    totalPages,
    currentPage: safePage,
    rangeStart,
    rangeEnd,
    searchQuery,
    categoryFilter,
    publicationFilter,
    availabilityFilter,
    featuredFilter,
    onSearchChange: handleSearchChange,
    onCategoryChange: handleCategoryChange,
    onPublicationChange: handlePublicationChange,
    onAvailabilityChange: handleAvailabilityChange,
    onFeaturedChange: handleFeaturedChange,
    onResetFilters: handleResetFilters,
    onPageChange: handlePageChange,
    onSoftDelete: handleSoftDelete,
  };
}
