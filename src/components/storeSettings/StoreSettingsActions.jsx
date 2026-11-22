export default function StoreSettingsActions({
  onCancel,
  isDirty,
  isSubmitting,
}) {
  return (
    <div className="store-settings-bottom-bar" role="region" aria-label="Tindakan formulir pengaturan toko">
      <div className="store-settings-bottom-inner">
        <div className="store-settings-bottom-left">
          <p className="store-settings-bottom-reminder">
            {isDirty
              ? 'Ada perubahan yang belum disimpan. Periksa kembali informasi sebelum menyimpan.'
              : 'Periksa kembali informasi sebelum menyimpan.'}
          </p>
        </div>

        <div className="store-settings-bottom-right">
          <button
            type="button"
            onClick={onCancel}
            className="store-settings-btn-cancel"
            disabled={isSubmitting}
          >
            Batal
          </button>

          <button
            type="submit"
            className="store-settings-btn-save"
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
