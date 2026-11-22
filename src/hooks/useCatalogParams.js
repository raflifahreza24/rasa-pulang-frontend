import { useState, useEffect, useCallback, useRef } from 'react';

const VALID_SORTS = ['newest', 'price_asc', 'price_desc'];

/**
 * Membaca URLSearchParams dari window.location
 */
const parseUrlParams = () => {
  if (typeof window === 'undefined') {
    return { q: '', category: 'all', sort: 'newest', page: 1 };
  }
  const params = new URLSearchParams(window.location.search);
  const q = (params.get('q') || '').trim();
  const category = (params.get('category') || 'all').trim();
  const rawSort = params.get('sort');
  const sort = VALID_SORTS.includes(rawSort) ? rawSort : 'newest';
  const rawPage = parseInt(params.get('page'), 10);
  const page = !isNaN(rawPage) && rawPage >= 1 ? rawPage : 1;

  return { q, category, sort, page };
};

/**
 * Menyusun URLSearchParams kembali ke string query
 */
const serializeParams = ({ q, category, sort, page }) => {
  const params = new URLSearchParams();
  if (q && q.trim()) params.set('q', q.trim());
  if (category && category !== 'all') params.set('category', category);
  if (sort && sort !== 'newest') params.set('sort', sort);
  if (page && page > 1) params.set('page', page.toString());

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * Custom hook untuk sinkronisasi state katalog dengan URLSearchParams dan History API.
 */
export function useCatalogParams() {
  const [params, setParams] = useState(parseUrlParams);
  const debounceTimerRef = useRef(null);

  // Sinkronisasi saat pengguna menekan tombol Back / Forward di browser
  useEffect(() => {
    const handlePopState = () => {
      setParams(parseUrlParams());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL ke browser history
  const updateUrl = useCallback((newParams, method = 'push') => {
    const query = serializeParams(newParams);
    const newUrl = `${window.location.pathname}${query}`;
    if (newUrl !== `${window.location.pathname}${window.location.search}`) {
      if (method === 'replace') {
        window.history.replaceState(null, '', newUrl);
      } else {
        window.history.pushState(null, '', newUrl);
      }
    }
  }, []);

  // Handler perubahan kata kunci pencarian (debounced + history.replaceState)
  const setSearchQuery = useCallback((newQuery) => {
    setParams((prev) => {
      const next = { ...prev, q: newQuery, page: 1 };
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        updateUrl(next, 'replace');
      }, 280);
      return next;
    });
  }, [updateUrl]);

  // Handler perubahan kategori (mengembalikan halaman ke 1 + history.pushState)
  const setCategory = useCallback((newCategory) => {
    setParams((prev) => {
      const next = { ...prev, category: newCategory, page: 1 };
      updateUrl(next, 'push');
      return next;
    });
  }, [updateUrl]);

  // Handler perubahan pengurutan (mengembalikan halaman ke 1 + history.pushState)
  const setSort = useCallback((newSort) => {
    setParams((prev) => {
      const next = { ...prev, sort: newSort, page: 1 };
      updateUrl(next, 'push');
      return next;
    });
  }, [updateUrl]);

  // Handler perubahan halaman pagination (history.pushState)
  const setPage = useCallback((newPage) => {
    setParams((prev) => {
      const next = { ...prev, page: Math.max(1, newPage) };
      updateUrl(next, 'push');
      return next;
    });
  }, [updateUrl]);

  // Reset semua filter ke kondisi awal
  const resetFilters = useCallback(() => {
    const defaultParams = { q: '', category: 'all', sort: 'newest', page: 1 };
    setParams(defaultParams);
    updateUrl(defaultParams, 'push');
  }, [updateUrl]);

  return {
    params,
    setSearchQuery,
    setCategory,
    setSort,
    setPage,
    resetFilters,
  };
}
