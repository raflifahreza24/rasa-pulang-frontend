export default function DashboardSimulationNotice() {
  return (
    <div className="admin-simulation-banner" role="region" aria-label="Catatan status data simulasi">
      <svg
        className="admin-banner-icon"
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
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
      <span className="admin-banner-text">
        Simulasi portofolio — data katalog dan akun pada halaman ini merupakan contoh.
      </span>
    </div>
  );
}
