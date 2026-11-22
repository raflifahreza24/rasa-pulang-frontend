export default function DashboardHeading({ currentUser, onAddProductClick }) {
  const displayName = currentUser?.shortName || currentUser?.name?.split(' ')[0] || 'Dina';

  return (
    <div className="admin-page-header">
      <div className="admin-page-title-group">
        <p className="admin-eyebrow">DASHBOARD</p>
        <h1 className="admin-page-title">Ringkasan Katalog</h1>
        <p className="admin-page-description">
          Selamat datang, {displayName}. Pantau dan perbarui katalog Rasa Pulang dari sini.
        </p>
      </div>

      <div className="admin-header-actions">
        <button
          type="button"
          onClick={onAddProductClick}
          className="admin-btn-primary hover-button-solid"
        >
          <span className="admin-btn-icon" aria-hidden="true">+</span>
          <span>Tambah Produk</span>
        </button>
      </div>
    </div>
  );
}
