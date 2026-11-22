import AnimatedNumber from '../ui/AnimatedNumber';

export default function CategoryToolbar({
  searchQuery,
  onSearchChange,
  totalCount,
}) {
  return (
    <div className="category-toolbar">
      <div className="category-search-wrapper">
        <svg
          className="category-search-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          className="category-search-input"
          placeholder="Cari nama kategori..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Cari nama kategori"
        />

        {searchQuery && (
          <button
            type="button"
            className="category-search-clear"
            onClick={() => onSearchChange('')}
            aria-label="Hapus kata kunci pencarian"
          >
            ✕
          </button>
        )}
      </div>

      <div className="category-count-badge">
        <span>
          <AnimatedNumber value={totalCount} suffix=" kategori" duration={500} />
        </span>
      </div>
    </div>
  );
}
