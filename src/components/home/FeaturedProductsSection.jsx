import { featuredProductsData } from '../../data/homeData';
import ProductCard from './ProductCard';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function FeaturedProductsSection({ onProductClick, onSeeAllClick }) {
  const sectionRef = useScrollReveal();

  return (
    <section id="katalog" className="featured-section" aria-labelledby="featured-heading" ref={sectionRef}>
      <div className="section-container">
        {/* Header Section dengan tombol Lihat Semua Produk */}
        <div className="featured-header reveal-init">
          <h2 id="featured-heading" className="section-title">
            Pilihan Favorit Rasa Pulang
          </h2>
          <button
            type="button"
            onClick={onSeeAllClick}
            className="see-all-link hover-link-orange"
            aria-label="Lihat seluruh daftar produk"
          >
            Lihat Semua Produk →
          </button>
        </div>

        {/* 4 Kolom x 2 Baris Grid */}
        <div className="product-grid">
          {featuredProductsData.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onDetailClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
