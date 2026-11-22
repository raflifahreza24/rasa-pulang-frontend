import AnimatedNumber from '../ui/AnimatedNumber';

export default function AdminProductPagination({
  currentPage,
  totalPages,
  totalFilteredCount,
  rangeStart,
  rangeEnd,
  onPageChange,
}) {
  if (totalFilteredCount === 0) return null;

  // Generate pagination items dengan ellipsis jika halaman banyak
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Selalu sertakan halaman 1
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Selalu sertakan halaman terakhir
      pages.push(totalPages);
    }

    return pages.map((p, idx) => {
      if (p === '...') {
        return (
          <span key={`ellipsis-${idx}`} className="product-admin-pagination-ellipsis" aria-hidden="true">
            …
          </span>
        );
      }

      const isActive = p === currentPage;
      return (
        <button
          key={p}
          type="button"
          className={`product-admin-pagination-btn number ${isActive ? 'active' : ''}`}
          onClick={() => onPageChange(p)}
          aria-label={`Buka halaman ${p}`}
          aria-current={isActive ? 'page' : undefined}
        >
          {p}
        </button>
      );
    });
  };

  return (
    <nav className="product-admin-pagination-nav" aria-label="Navigasi Halaman Daftar Produk">
      <div className="product-admin-pagination-summary">
        Menampilkan{' '}
        <AnimatedNumber value={rangeStart} duration={350} />–
        <AnimatedNumber value={rangeEnd} duration={350} /> dari{' '}
        <AnimatedNumber value={totalFilteredCount} duration={400} /> produk
      </div>

      <div className="product-admin-pagination-controls">
        {/* Tombol Sebelumnya */}
        <button
          type="button"
          className="product-admin-pagination-btn nav"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Halaman sebelumnya"
        >
          ‹
        </button>

        {/* Nomor Halaman */}
        <div className="product-admin-pagination-numbers">
          {renderPageNumbers()}
        </div>

        {/* Tombol Berikutnya */}
        <button
          type="button"
          className="product-admin-pagination-btn nav"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Halaman berikutnya"
        >
          ›
        </button>
      </div>
    </nav>
  );
}
