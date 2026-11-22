export default function StaffUsersEmptyState({
  isFiltered,
  onResetFilter,
  onAddStaff,
}) {
  if (isFiltered) {
    return (
      <div className="staff-empty-state">
        <div className="staff-empty-icon-box" aria-hidden="true">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7A6F64"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <h3 className="staff-empty-title">Akun staf tidak ditemukan</h3>
        <p className="staff-empty-desc">
          Coba kata kunci lain atau tampilkan semua status.
        </p>
        <button
          type="button"
          onClick={onResetFilter}
          className="staff-empty-btn-reset"
        >
          Reset Filter
        </button>
      </div>
    );
  }

  return (
    <div className="staff-empty-state">
      <div className="staff-empty-icon-box" aria-hidden="true">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#DC722C"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>
      <h3 className="staff-empty-title">Belum ada akun staf</h3>
      <p className="staff-empty-desc">
        Tambahkan akun staf agar pengelolaan katalog dapat dilakukan menggunakan akun masing-masing.
      </p>
      <button
        type="button"
        onClick={onAddStaff}
        className="staff-empty-btn-add"
      >
        Tambah Staf
      </button>
    </div>
  );
}
