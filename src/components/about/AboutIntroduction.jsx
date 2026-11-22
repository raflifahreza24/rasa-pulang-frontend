import { aboutIntroData } from '../../data/aboutData';

export default function AboutIntroduction({ onNavigate }) {
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/', 'beranda');
    }
  };

  return (
    <div className="about-intro-section about-animate-header">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="about-breadcrumb-nav">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <a
              href="/"
              onClick={handleHomeClick}
              className="breadcrumb-link"
            >
              Beranda
            </a>
          </li>
          <li className="breadcrumb-separator" aria-hidden="true">/</li>
          <li className="breadcrumb-item breadcrumb-current" aria-current="page">
            Tentang Kami
          </li>
        </ol>
      </nav>

      {/* Eyebrow, Judul H1 & Deskripsi */}
      <div className="about-intro-content">
        <p className="about-intro-eyebrow">
          {aboutIntroData.eyebrow}
        </p>
        <h1 className="about-page-title">
          Camilan Pilihan, Hangatnya<br />Kebersamaan.
        </h1>
        <p className="about-page-description">
          Dari Sidoarjo, kami menghadirkan pilihan camilan dan <strong>oleh-oleh</strong> untuk menemani waktu santai, perjalanan, dan momen berbagi.
        </p>
      </div>
    </div>
  );
}
