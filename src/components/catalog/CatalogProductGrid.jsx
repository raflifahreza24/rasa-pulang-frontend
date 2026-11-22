import ProductCard from '../home/ProductCard';

export default function CatalogProductGrid({ products, onDetailClick }) {
  return (
    <div className="catalog-product-grid" id="catalog-results" role="region" aria-label="Daftar produk katalog">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          onDetailClick={onDetailClick}
        />
      ))}
    </div>
  );
}
