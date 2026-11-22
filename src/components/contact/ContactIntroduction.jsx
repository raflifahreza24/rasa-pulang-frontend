import { contactIntroData } from '../../data/contactData';

export default function ContactIntroduction({ onNavigate }) {
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/', 'beranda');
    }
  };

  return (
    <div className="contact-intro-section contact-animate-header">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="contact-breadcrumb-nav">
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
            Kontak
          </li>
        </ol>
      </nav>

      {/* Eyebrow, Judul H1 & Deskripsi */}
      <div className="contact-intro-content">
        <p className="contact-intro-eyebrow">
          {contactIntroData.eyebrow}
        </p>
        <h1 className="contact-page-title">
          {contactIntroData.title}
        </h1>
        <p className="contact-page-description">
          {contactIntroData.description}
        </p>
      </div>
    </div>
  );
}
