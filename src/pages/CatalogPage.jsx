import { useMemo, useState, useEffect } from 'react';
import { productsData } from '../data/productsData';
import { siteConfig, buildWhatsAppUrl } from '../data/homeData';
import { useCatalogParams } from '../hooks/useCatalogParams';
import SimulationNotice from '../components/layout/SimulationNotice';
import SiteHeader from '../components/layout/SiteHeader';
import SiteFooter from '../components/layout/SiteFooter';
import FloatingWhatsAppButton from '../components/layout/FloatingWhatsAppButton';
import ToastNotice from '../components/ui/ToastNotice';
import CatalogBreadcrumb from '../components/catalog/CatalogBreadcrumb';
import CatalogToolbar from '../components/catalog/CatalogToolbar';
import CatalogProductGrid from '../components/catalog/CatalogProductGrid';
import CatalogEmptyState from '../components/catalog/CatalogEmptyState';
import CatalogPagination from '../components/catalog/CatalogPagination';

const PAGE_SIZE = 12;

export default function CatalogPage({ onNavigate }) {
  const {
    params,
    setSearchQuery,
    setCategory,
    setSort,
    setPage,
    resetFilters,
  } = useCatalogParams();

  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message) => {
    setToastMessage(message);
  };

  // 1. Ambil produk yang aktif dipublikasikan dan belum dihapus
  const baseProducts = useMemo(() => {
    return productsData.filter((p) => p.isPublished && !p.deletedAt);
  }, []);

  // 2. Terapkan filter pencarian, kategori, dan pengurutan
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...baseProducts];

    // Filter Pencarian (nama produk, case-insensitive, ignore whitespace)
    const query = params.q.trim().toLowerCase();
    if (query) {
      result = result.filter((p) => p.name.toLowerCase().includes(query));
    }

    // Filter Kategori
    if (params.category && params.category !== 'all') {
      result = result.filter((p) => p.categoryId === params.category);
    }

    // Pengurutan
    result.sort((a, b) => {
      if (params.sort === 'price_asc') {
        const diff = a.price - b.price;
        return diff !== 0 ? diff : a.id - b.id;
      }
      if (params.sort === 'price_desc') {
        const diff = b.price - a.price;
        return diff !== 0 ? diff : a.id - b.id;
      }
      // 'newest' (default: createdAt menurun, secondary id menaik)
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      const dateDiff = dateB - dateA;
      return dateDiff !== 0 ? dateDiff : a.id - b.id;
    });

    return result;
  }, [baseProducts, params.q, params.category, params.sort]);

  const totalResults = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);

  // Koreksi nomor halaman yang aman
  const currentPage = useMemo(() => {
    if (totalPages === 0) return 1;
    if (params.page > totalPages) return totalPages;
    return Math.max(1, params.page);
  }, [params.page, totalPages]);

  // Sinkronisasi jika URL memiliki page di luar batas
  useEffect(() => {
    if (totalPages > 0 && params.page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, params.page, setPage]);

  // Produk terpaginasi untuk halaman saat ini
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredAndSortedProducts.slice(start, start + PAGE_SIZE);
  }, [filteredAndSortedProducts, currentPage]);

  const startIndex = totalResults > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
  const endIndex = totalResults > 0 ? Math.min(currentPage * PAGE_SIZE, totalResults) : 0;

  // Tangani perpindahan halaman dengan scroll halus ke bagian hasil
  const handlePageChange = (newPage) => {
    setPage(newPage);
    const resultsElement = document.querySelector('#catalog-results');
    if (resultsElement) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      resultsElement.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleProductDetailClick = (productName) => {
    const prod = productsData.find((p) => p.name === productName);
    if (prod && onNavigate) {
      onNavigate(`/produk/${prod.slug}`);
      return;
    }
    showToast(`Halaman detail untuk "${productName}" belum tersedia.`);
  };

  const handleWhatsAppAction = () => {
    const phone = siteConfig.contact.whatsAppNumber;
    if (!phone) {
      showToast('Kontak masih berupa simulasi portofolio.');
      return;
    }
    const url = buildWhatsAppUrl(phone);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleInstagramAction = () => {
    const igUrl = siteConfig.contact.instagramUrl;
    if (!igUrl) {
      showToast('Kontak Instagram masih berupa simulasi portofolio.');
      return;
    }
    window.open(igUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="catalog-page-root">
      {/* A. Strip Simulasi */}
      <SimulationNotice />

      {/* B. Header Publik dengan menu aktif Katalog */}
      <SiteHeader
        activeNav="katalog"
        onNavigate={onNavigate}
        onContactClick={handleWhatsAppAction}
      />

      {/* Konten Halaman Katalog */}
      <main className="catalog-main-content">
        <div className="section-container">
          {/* C. Breadcrumb dan Judul */}
          <CatalogBreadcrumb onNavigate={onNavigate} />

          {/* D. Panel Pencarian dan Filter */}
          <CatalogToolbar
            searchQuery={params.q}
            onSearchChange={setSearchQuery}
            activeCategory={params.category}
            onCategoryChange={setCategory}
            activeSort={params.sort}
            onSortChange={setSort}
            totalResults={totalResults}
            startIndex={startIndex}
            endIndex={endIndex}
          />

          {/* E. Grid Produk atau Empty State */}
          {totalResults > 0 ? (
            <>
              <CatalogProductGrid
                products={paginatedProducts}
                onDetailClick={handleProductDetailClick}
              />

              {/* F. Pagination */}
              <CatalogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <CatalogEmptyState onReset={resetFilters} />
          )}
        </div>
      </main>

      {/* G. Footer */}
      <SiteFooter
        onNavigate={onNavigate}
        onContactClick={handleWhatsAppAction}
        onInstagramClick={handleInstagramAction}
      />

      {/* H. Tombol WhatsApp Mengambang */}
      <FloatingWhatsAppButton onClick={handleWhatsAppAction} />

      {/* Notifikasi Demo */}
      <ToastNotice
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
