import AnimatedNumber from '../ui/AnimatedNumber';

export default function StaffUsersToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  resultCount,
}) {
  return (
    <div className="staff-users-toolbar">
      <div className="staff-toolbar-left">
        {/* Input Pencarian */}
        <div className="staff-search-wrapper">
          <svg
            className="staff-search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7A6F64"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="staff-search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nama atau email staf..."
            aria-label="Cari staf berdasarkan nama atau email"
          />
        </div>

        {/* Filter Status */}
        <div className="staff-filter-wrapper">
          <label htmlFor="staff-status-select" className="staff-filter-label">
            Status
          </label>
          <div className="staff-select-container">
            <select
              id="staff-status-select"
              className="staff-select-input"
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              aria-label="Filter berdasarkan status akun staf"
            >
              <option value="semua">Semua status</option>
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Nonaktif</option>
            </select>
          </div>
        </div>
      </div>

      <div className="staff-toolbar-right">
        <span className="staff-counter-text">
          <AnimatedNumber value={resultCount} suffix=" akun staf" duration={500} />
        </span>
      </div>
    </div>
  );
}
