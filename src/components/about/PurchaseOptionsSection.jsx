import { purchaseOptionsData } from '../../data/aboutData';
import ImageWithFallback from '../ui/ImageWithFallback';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function PurchaseOptionsSection() {
  const sectionRef = useScrollReveal();

  return (
    <section className="about-purchase-options-section" aria-labelledby="purchase-heading" ref={sectionRef}>
      <div className="purchase-options-header reveal-init">
        <h2 id="purchase-heading" className="purchase-options-title">
          {purchaseOptionsData.title}
        </h2>
        <p className="purchase-options-description">
          {purchaseOptionsData.description}
        </p>
      </div>

      <div className="purchase-options-grid">
        {purchaseOptionsData.cards.map((card, idx) => (
          <div
            key={card.id}
            className={`purchase-option-card reveal-init stagger-${idx + 1}`}
          >
            {/* Area Foto Kartu */}
            <div className="purchase-card-image-box">
              <ImageWithFallback
                src={card.image}
                alt={card.alt}
                aspectRatio={card.aspectRatio || '1.8 / 1'}
                placeholderLabel={card.placeholderLabel}
              />
            </div>

            {/* Konten Kartu */}
            <div className="purchase-card-content">
              <h3 className="purchase-card-title">
                {card.title}
              </h3>
              <p className="purchase-card-description">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
