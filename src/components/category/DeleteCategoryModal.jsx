import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function DeleteCategoryModal({
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
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-desc"
    >
      <div className="category-dialog-card admin-animate-fade">
        <div className="category-dialog-icon-wrap danger">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#DC2626"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </div>

        <div className="category-dialog-content">
          <h3 id="delete-dialog-title" className="category-dialog-title">
            Hapus kategori?
          </h3>
          <p id="delete-dialog-desc" className="category-dialog-desc">
            Kategori <strong>&ldquo;{category?.name}&rdquo;</strong> akan dihapus dari sesi demo. Tindakan ini tidak dapat dibatalkan.
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
            className="category-btn-danger"
            onClick={onConfirm}
          >
            Hapus Kategori
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}
