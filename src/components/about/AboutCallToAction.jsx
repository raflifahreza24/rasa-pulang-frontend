import { aboutCtaData } from '../../data/aboutData';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function AboutCallToAction({ onNavigate, onWhatsAppClick }) {
  const sectionRef = useScrollReveal();

  const handleCatalogClick = () => {
    if (onNavigate) {
      onNavigate('/katalog');
    }
  };

  return (
    <section className="about-cta-section" aria-labelledby="about-cta-heading" ref={sectionRef}>
      <div className="about-cta-panel reveal-init">
        <h2 id="about-cta-heading" className="about-cta-title">
          {aboutCtaData.title}
        </h2>
        <p className="about-cta-description">
          {aboutCtaData.description}
        </p>

        <div className="about-cta-actions">
          <button
            type="button"
            onClick={handleCatalogClick}
            className="about-cta-primary-btn hover-button-solid"
          >
            {aboutCtaData.catalogButtonText}
          </button>
          <button
            type="button"
            onClick={onWhatsAppClick}
            className="about-cta-secondary-btn hover-button-outline"
            aria-label="Hubungi toko Rasa Pulang melalui WhatsApp"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>{aboutCtaData.contactButtonText}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
