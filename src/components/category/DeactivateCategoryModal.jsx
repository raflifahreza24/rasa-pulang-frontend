import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function DeactivateCategoryModal({
  isOpen,
  onClose,
  onConfirm,
  category,
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
      className="category-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="deactivate-dialog-title"
      aria-describedby="deactivate-dialog-desc"
    >
      <div className="category-dialog-card admin-animate-fade">
        <div className="category-dialog-icon-wrap warning">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D97706"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <div className="category-dialog-content">
          <h3 id="deactivate-dialog-title" className="category-dialog-title">
            Nonaktifkan kategori?
          </h3>
          <p id="deactivate-dialog-desc" className="category-dialog-desc">
            Seluruh produk dalam kategori <strong>{category?.name}</strong> akan disembunyikan dari website publik. Data tetap tersedia di dashboard.
          </p>
        </div>

        <div className="category-dialog-actions">
          <button
            type="button"
            className="category-btn-secondary"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            type="button"
            className="category-btn-warning"
            onClick={onConfirm}
          >
            Nonaktifkan Kategori
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}
