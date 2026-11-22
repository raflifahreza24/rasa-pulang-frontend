import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ProductDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  product,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="product-admin-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="product-delete-dialog-title"
      aria-describedby="product-delete-dialog-desc"
    >
      <div className="product-admin-dialog-card admin-animate-fade">
        <div className="product-admin-dialog-icon-wrap danger" aria-hidden="true">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#DC2626"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </div>

        <div className="product-admin-dialog-content">
          <h3 id="product-delete-dialog-title" className="product-admin-dialog-title">
            Hapus produk?
          </h3>
          <p id="product-delete-dialog-desc" className="product-admin-dialog-desc">
            Produk &lsquo;{product?.name}&rsquo; akan dipindahkan ke Sampah Produk dan tidak ditampilkan di website publik. Produk dapat dipulihkan oleh pemilik.
          </p>
        </div>

        <div className="product-admin-dialog-actions">
          <button
            type="button"
            className="product-admin-btn-dialog secondary"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            type="button"
            className="product-admin-btn-dialog danger"
            onClick={onConfirm}
          >
            Hapus Produk
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}
