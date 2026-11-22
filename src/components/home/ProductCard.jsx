import ImageWithFallback from '../ui/ImageWithFallback';
import { formatRupiah } from '../../data/homeData';

export default function ProductCard({ product, index = 0, onDetailClick }) {
  const status = product.availability || product.status || 'Tersedia';
  const isAvailable = status === 'Tersedia';
  const imageSrc = product.image || `/images/rasa-pulang/products/${product.imageKey}.webp`;

  return (
    <article
      className={`product-card hover-card-lift catalog-product-card`}
      style={{
        animationDelay: `${Math.min(index * 0.04, 0.45)}s`,
      }}
      aria-label={`${product.name} — ${formatRupiah(product.price)}`}
    >
      {/* Area Gambar Produk */}
      <div className="product-image-container">
        <ImageWithFallback
          src={imageSrc}
          alt={product.alt || product.name}
          aspectRatio="1 / 1"
          placeholderLabel={product.name}
        />
      </div>

      {/* Konten Kartu */}
      <div className="product-info-wrapper">
        {/* Status Badge */}
        <div className="product-status-row">
          <span
            className={`status-badge ${isAvailable ? 'status-available' : 'status-empty'}`}
          >
            {status}
          </span>
        </div>

        {/* Nama Produk */}
        <h3 className="product-title">
          {product.name}
        </h3>

        {/* Harga Produk */}
        <p className="product-price">
          {formatRupiah(product.price)}
        </p>

        {/* Tindakan Lihat Detail */}
        <div className="product-action-row">
          <button
            type="button"
            onClick={() => onDetailClick(product.name)}
            className="product-detail-btn hover-link-orange"
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </article>
  );
}
