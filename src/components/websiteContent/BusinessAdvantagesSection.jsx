export default function BusinessAdvantagesSection({
  advantages,
  onItemChange,
}) {
  const renderIcon = (type) => {
    switch (type) {
      case 'snack':
        return (
          <div className="website-content-adv-icon-badge" aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DC722C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 11C4 16 7.5 19 12 19C16.5 19 20 16 20 11H4Z" />
              <path d="M9 19L8 21H16L15 19" />
              <path d="M8 8C8 6 9.5 5 12 5C14.5 5 16 6 16 8" />
              <circle cx="8" cy="7" r="1.5" />
              <circle cx="16" cy="7" r="1.5" />
              <circle cx="12" cy="4" r="1.5" />
            </svg>
          </div>
        );
      case 'gift':
        return (
          <div className="website-content-adv-icon-badge" aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DC722C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 12 20 22 4 22 4 12" />
              <rect width="20" height="5" x="2" y="7" rx="1" />
              <line x1="12" y1="22" x2="12" y2="7" />
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
          </div>
        );
      case 'chat':
        return (
          <div className="website-content-adv-icon-badge" aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DC722C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="website-content-card" aria-labelledby="advantages-section-title">
      <div className="website-content-card-header">
        <h2 id="advantages-section-title" className="website-content-card-title">
          3. Keunggulan Usaha
        </h2>
        <p className="website-content-card-desc">
          Tiga poin keunggulan yang ditampilkan pada website publik.
        </p>
      </div>

      <div className="website-content-advantages-grid">
        {advantages.map((item, index) => (
          <div key={item.id || index} className="website-content-advantage-card">
            <div className="website-content-advantage-card-header">
              {renderIcon(item.icon)}
              <span className="website-content-advantage-title-badge">
                Keunggulan {index + 1}
              </span>
            </div>

            <div className="website-content-form-group">
              <label
                htmlFor={`adv-title-${index}`}
                className="website-content-label"
              >
                Judul
              </label>
              <input
                id={`adv-title-${index}`}
                type="text"
                className="website-content-input"
                value={item.title}
                onChange={(e) => onItemChange(index, 'title', e.target.value)}
                placeholder="Judul keunggulan..."
              />
            </div>

            <div className="website-content-form-group">
              <label
                htmlFor={`adv-desc-${index}`}
                className="website-content-label"
              >
                Deskripsi
              </label>
              <textarea
                id={`adv-desc-${index}`}
                rows={3}
                className="website-content-textarea website-content-textarea-adv"
                value={item.description}
                onChange={(e) =>
                  onItemChange(index, 'description', e.target.value)
                }
                placeholder="Deskripsi keunggulan..."
              />
            </div>
          </div>
        ))}
      </div>

      {/* Catatan Bawah Panel 3 */}
      <div className="website-content-notice-box">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#A64B17"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span>Jumlah keunggulan tetap tiga untuk menjaga konsistensi tampilan.</span>
      </div>
    </section>
  );
}
