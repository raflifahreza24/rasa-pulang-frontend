export default function ProductBreadcrumb({ product, category, onNavigate }) {
  const handleNav = (e, url) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(url);
    }
  };

  return (
    <nav aria-label="Breadcrumb" className="product-breadcrumb-nav detail-animate-header">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <a
            href="/"
            onClick={(e) => handleNav(e, '/')}
            className="breadcrumb-link"
          >
            Beranda
          </a>
        </li>
        <li className="breadcrumb-separator" aria-hidden="true">/</li>
        <li className="breadcrumb-item">
          <a
            href="/katalog"
            onClick={(e) => handleNav(e, '/katalog')}
            className="breadcrumb-link"
          >
            Katalog
          </a>
        </li>
        {category && (
          <>
            <li className="breadcrumb-separator" aria-hidden="true">/</li>
            <li className="breadcrumb-item">
              <a
                href={`/katalog?category=${category.slug}`}
                onClick={(e) => handleNav(e, `/katalog?category=${category.slug}`)}
                className="breadcrumb-link"
              >
                {category.name}
              </a>
            </li>
          </>
        )}
        <li className="breadcrumb-separator" aria-hidden="true">/</li>
        <li className="breadcrumb-item breadcrumb-current" aria-current="page">
          {product.name}
        </li>
      </ol>
    </nav>
  );
}
