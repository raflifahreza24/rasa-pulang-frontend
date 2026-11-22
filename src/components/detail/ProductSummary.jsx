import { formatRupiah } from '../../data/homeData';

export default function ProductSummary({
  product,
  category,
  onWhatsAppClick,
}) {
  const isAvailable = product.availability === 'Tersedia';

  return (
    <div className="product-summary-container detail-animate-summary">
      {/* 1. Kategori */}
      <p className="summary-category-badge">
        {category ? category.name : 'Oleh-Oleh Khas Sidoarjo'}
      </p>

      {/* 2. Nama Produk (H1) */}
      <h1 className="summary-product-title">
        {product.name}
      </h1>

      {/* 3 & 4. Harga & Satuan */}
      <div className="summary-price-wrapper">
        <p className="summary-product-price">
          {formatRupiah(product.price)}
        </p>
        <span className="summary-price-unit">per kemasan</span>
      </div>

      {/* 5. Berat Bersih & Badge Ketersediaan */}
      <div className="summary-meta-row">
        <span className="summary-weight-text">
          Berat bersih: {product.netWeightGrams} g
        </span>
        <span className="summary-meta-divider" aria-hidden="true">|</span>
        <span
          className={`status-badge ${isAvailable ? 'status-available' : 'status-empty'}`}
        >
          {product.availability}
        </span>
      </div>

      {/* 6. Pengantar Singkat */}
      <p className="summary-short-intro">
        {product.shortIntro || product.description}
      </p>

      {/* 7. Tombol Pesan WhatsApp */}
      <div className="summary-action-wrapper">
        <button
          type="button"
          onClick={() => onWhatsAppClick(product)}
          className="summary-whatsapp-btn hover-button-solid"
          aria-label={isAvailable ? `Pesan ${product.name} melalui WhatsApp` : `Tanyakan ketersediaan ${product.name} melalui WhatsApp`}
        >
          {/* Ikon WhatsApp Putih */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.956.564 3.784 1.542 5.334L2 22l4.783-1.503a9.98 9.98 0 0 0 5.248 1.488h.004c5.535 0 10.03-4.495 10.03-10.031A9.972 9.972 0 0 0 12.031 2zm0 18.362h-.003a8.318 8.318 0 0 1-4.243-1.161l-.304-.18-2.846.895.91-2.775-.197-.315a8.297 8.297 0 0 1-1.272-4.79c0-4.598 3.743-8.341 8.344-8.341a8.293 8.293 0 0 1 5.9 2.446 8.29 8.29 0 0 1 2.443 5.899c0 4.602-3.743 8.345-8.342 8.345zm4.573-6.242c-.25-.125-1.478-.73-1.708-.813-.23-.083-.397-.125-.563.125-.167.25-.646.813-.792.98-.146.166-.292.187-.542.062-.25-.125-1.055-.389-2.01-1.24-.744-.663-1.246-1.483-1.392-1.733-.146-.25-.016-.385.109-.51.113-.112.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.021-.438s-.563-1.354-.771-1.854c-.203-.487-.41-.421-.563-.429l-.479-.008c-.167 0-.438.063-.667.313-.23.25-.875.854-.875 2.083 0 1.229.896 2.417 1.021 2.583.125.167 1.764 2.695 4.274 3.778.597.258 1.064.412 1.428.528.6.191 1.146.164 1.578.1.481-.072 1.478-.604 1.687-1.188.208-.583.208-1.083.146-1.188-.063-.104-.23-.167-.48-.292z" />
          </svg>
          <span>
            {isAvailable ? 'Tanyakan / Pesan via WhatsApp' : 'Tanyakan Ketersediaan'}
          </span>
        </button>
      </div>

      {/* 8. Keterangan Proses Pemesanan */}
      <p className="summary-order-note">
        Jumlah pembelian, ketersediaan, pengiriman, dan pembayaran dikonfirmasi melalui chat.
      </p>
    </div>
  );
}
