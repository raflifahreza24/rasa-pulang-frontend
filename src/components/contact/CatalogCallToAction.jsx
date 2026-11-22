import { catalogCtaData } from '../../data/contactData';

export default function CatalogCallToAction({ onNavigate }) {
  const handleCatalogClick = () => {
    if (onNavigate) {
      onNavigate(catalogCtaData.href);
    }
  };

  return (
    <section className="contact-cta-section" aria-labelledby="contact-cta-title">
      <div className="contact-cta-card">
        <div className="contact-cta-text-wrapper">
          <h2 id="contact-cta-title" className="contact-cta-title">
            {catalogCtaData.title}
          </h2>
          <p className="contact-cta-description">
            {catalogCtaData.description}
          </p>
        </div>

        <div className="contact-cta-btn-wrapper">
          <button
            type="button"
            onClick={handleCatalogClick}
            className="contact-cta-btn hover-button-solid"
          >
            {catalogCtaData.buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
