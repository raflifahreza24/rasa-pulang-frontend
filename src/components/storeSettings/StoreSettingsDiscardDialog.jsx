import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function StoreSettingsDiscardDialog({
  isOpen,
  onClose,
  onConfirmDiscard,
}) {
  // Cegah scrolling pada background ketika modal aktif
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalJSX = (
    <div
      className="store-settings-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="discard-settings-title"
      onClick={onClose}
    >
      <div
        className="store-settings-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="store-settings-modal-icon-wrapper">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#DC722C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h3 id="discard-settings-title" className="store-settings-modal-title">
          Batalkan perubahan?
        </h3>

        <p className="store-settings-modal-text">
          Perubahan pengaturan yang belum disimpan akan hilang.
        </p>

        <div className="store-settings-modal-actions">
          <button
            type="button"
            className="store-settings-modal-btn-cancel"
            onClick={onClose}
          >
            Lanjutkan Mengedit
          </button>
          <button
            type="button"
            className="store-settings-modal-btn-confirm"
            onClick={onConfirmDiscard}
          >
            Batalkan Perubahan
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalJSX, document.body)
    : null;
}
