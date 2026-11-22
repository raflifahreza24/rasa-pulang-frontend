export default function WebsiteContentFormActions({
  onCancel,
  isDirty,
  isSubmitting,
}) {
  return (
    <div className="website-content-bottom-bar" role="region" aria-label="Tindakan formulir konten website">
      <div className="website-content-bottom-inner">
        <div className="website-content-bottom-left">
          <p className="website-content-bottom-reminder">
            {isDirty
              ? 'Ada perubahan yang belum disimpan. Periksa kembali sebelum menyimpan.'
              : 'Periksa kembali konten sebelum menyimpan.'}
          </p>
        </div>

        <div className="website-content-bottom-right">
          <button
            type="button"
            onClick={onCancel}
            className="website-content-btn-cancel"
            disabled={isSubmitting}
          >
            Batal
          </button>

          <button
            type="submit"
            className="website-content-btn-save"
            disabled={isSubmitting}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
