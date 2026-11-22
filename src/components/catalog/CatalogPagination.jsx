export default function CatalogPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav className="catalog-pagination-nav" aria-label="Navigasi halaman katalog">
      <ul className="pagination-list">
        {/* Tombol Sebelumnya */}
        <li className="pagination-item">
          <button
            type="button"
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage <= 1}
            className="pagination-btn pagination-arrow-btn"
            aria-label="Halaman sebelumnya"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </li>

        {/* Nomor Halaman */}
        {pageNumbers.map((page) => {
          const isActive = page === currentPage;
          return (
            <li key={page} className="pagination-item">
              <button
                type="button"
                onClick={() => handlePageClick(page)}
                className={`pagination-btn pagination-number-btn ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Halaman ${page}`}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Tombol Berikutnya */}
        <li className="pagination-item">
          <button
            type="button"
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="pagination-btn pagination-arrow-btn"
            aria-label="Halaman berikutnya"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}
