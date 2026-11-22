import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function UnsavedChangesDialog({
  isOpen,
  onStay,
  onLeave,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onStay();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onStay]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="create-product-dialog-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onStay();
      }}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="unsaved-dialog-title"
      aria-describedby="unsaved-dialog-desc"
    >
      <div className="create-product-dialog-card admin-animate-fade">
        <div className="create-product-dialog-icon-wrap warning" aria-hidden="true">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D97706"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <div className="create-product-dialog-content">
          <h3 id="unsaved-dialog-title" className="create-product-dialog-title">
            Batalkan penambahan produk?
          </h3>
          <p id="unsaved-dialog-desc" className="create-product-dialog-desc">
            Informasi yang belum disimpan akan hilang.
          </p>
        </div>

        <div className="create-product-dialog-actions">
          <button
            type="button"
            className="create-product-btn-dialog secondary"
            onClick={onStay}
          >
            Lanjutkan Mengisi
          </button>
          <button
            type="button"
            className="create-product-btn-dialog warning"
            onClick={onLeave}
          >
            Tinggalkan Halaman
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}
