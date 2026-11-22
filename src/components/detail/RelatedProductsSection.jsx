import ProductCard from '../home/ProductCard';

export default function RelatedProductsSection({
  category,
  relatedProducts = [],
  onNavigate,
  onProductClick,
}) {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  const categoryTitle = category ? `${category.name} Lainnya` : 'Produk Terkait Lainnya';

  const handleSeeCategory = (e) => {
    e.preventDefault();
    if (onNavigate && category) {
      onNavigate(`/katalog?category=${category.slug}`);
    }
  };

  return (
    <section className="related-products-section detail-animate-related" aria-labelledby="related-heading">
      <div className="related-header-row">
        <div>
          <h2 id="related-heading" className="related-section-title">
            {categoryTitle}
          </h2>
          <p className="related-section-subtitle">
            Pilihan lain dari kategori yang sama.
          </p>
        </div>

        {category && (
          <a
            href={`/katalog?category=${category.slug}`}
            onClick={handleSeeCategory}
            className="related-see-all-link hover-link-orange"
          >
            Lihat Kategori →
          </a>
        )}
      </div>

      <div className="related-product-grid">
        {relatedProducts.map((prod, index) => (
          <ProductCard
            key={prod.id}
            product={prod}
            index={index}
            onDetailClick={() => onProductClick(prod)}
          />
        ))}
      </div>
    </section>
  );
}
