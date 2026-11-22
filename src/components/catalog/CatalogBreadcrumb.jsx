export default function CatalogBreadcrumb({ onNavigate }) {
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/', 'beranda');
    }
  };

  return (
    <div className="catalog-header-area catalog-animate-header">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="catalog-breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <a
              href="/"
              onClick={handleHomeClick}
              className="breadcrumb-link"
            >
              Beranda
            </a>
          </li>
          <li className="breadcrumb-separator" aria-hidden="true">/</li>
          <li className="breadcrumb-item breadcrumb-current" aria-current="page">
            Katalog
          </li>
        </ol>
      </nav>

      {/* Judul H1 & Deskripsi */}
      <h1 className="catalog-page-title">
        Katalog Produk
      </h1>
      <p className="catalog-page-description">
        Temukan camilan favorit dan oleh-oleh untuk orang tersayang.
      </p>
    </div>
  );
}
