import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function DeactivateStaffDialog({
  isOpen,
  staff,
  onClose,
  onConfirmDeactivate,
}) {
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

  if (!isOpen || !staff) return null;

  const modalJSX = (
    <div
      className="users-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deactivate-dialog-title"
      onClick={onClose}
    >
      <div
        className="users-modal-container users-modal-container-confirm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="users-confirm-icon-box" aria-hidden="true">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#DC722C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="18" y1="8" x2="23" y2="13" />
            <line x1="23" y1="8" x2="18" y2="13" />
          </svg>
        </div>

        <h3 id="deactivate-dialog-title" className="users-confirm-title">
          Nonaktifkan akun staf?
        </h3>

        <p className="users-confirm-text">
          Akun &lsquo;{staff.name}&rsquo; tidak akan dapat mengakses dashboard. Data katalog yang pernah dikelolanya tetap tersedia.
        </p>

        <div className="users-confirm-actions">
          <button
            type="button"
            className="users-btn-cancel"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            type="button"
            className="users-btn-danger"
            onClick={() => onConfirmDeactivate(staff)}
          >
            Nonaktifkan Akun
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalJSX, document.body)
    : null;
}
