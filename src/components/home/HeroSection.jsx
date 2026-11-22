import { heroContent } from '../../data/homeData';
import ImageWithFallback from '../ui/ImageWithFallback';

export default function HeroSection({ onContactClick }) {
  const handleScrollToKatalog = (e) => {
    e.preventDefault();
    const target = document.querySelector('#katalog');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="beranda" className="hero-section" aria-label="Pengenalan Rasa Pulang">
      <div className="hero-container">
        {/* Kolom Kiri: Teks & Aksi */}
        <div className="hero-content">
          <p className="hero-eyebrow hero-animate-eyebrow">
            {heroContent.eyebrow}
          </p>
          <h1 className="hero-title hero-animate-title">
            Bawa Pulang<br />
            Camilan, Bagikan<br />
            Kehangatan.
          </h1>
          <p className="hero-description hero-animate-desc">
            {heroContent.description}
          </p>
          <div className="hero-actions hero-animate-actions">
            <a
              href="#katalog"
              onClick={handleScrollToKatalog}
              className="hero-btn-primary hover-button-solid"
            >
              {heroContent.primaryCta.label}
            </a>
            <button
              type="button"
              onClick={onContactClick}
              className="hero-btn-secondary hover-link-orange"
            >
              {heroContent.secondaryCta.label}
            </button>
          </div>
        </div>

        {/* Kolom Kanan: Area Gambar Hero */}
        <div className="hero-image-wrapper hero-animate-image">
          <div className="hero-image-frame">
            <ImageWithFallback
              src={heroContent.image}
              alt={heroContent.imageAlt}
              aspectRatio="16 / 11"
              placeholderLabel="Foto produk utama & hampers"
              priority={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
