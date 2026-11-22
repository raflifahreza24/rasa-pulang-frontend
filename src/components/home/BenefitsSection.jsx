import { useState, useEffect } from 'react';
import { benefitsData as initialBenefits } from '../../data/homeData';
import { getWebsiteContent, subscribeWebsiteContent } from '../../data/websiteContentStore';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function BenefitsSection({ title = 'Kenapa Rasa Pulang?' }) {
  const sectionRef = useScrollReveal();
  const [benefits, setBenefits] = useState(() => getWebsiteContent().advantages || initialBenefits);

  useEffect(() => {
    const unsubscribe = subscribeWebsiteContent((latest) => {
      if (latest.advantages) {
        setBenefits(latest.advantages);
      }
    });
    return unsubscribe;
  }, []);

  const renderIcon = (type) => {
    switch (type) {
      case 'snack':
        return (
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#DC722C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {/* Mangkok camilan */}
            <path d="M4 11C4 16 7.5 19 12 19C16.5 19 20 16 20 11H4Z" />
            <path d="M9 19L8 21H16L15 19" />
            <path d="M8 8C8 6 9.5 5 12 5C14.5 5 16 6 16 8" />
            <circle cx="8" cy="7" r="1.5" />
            <circle cx="16" cy="7" r="1.5" />
            <circle cx="12" cy="4" r="1.5" />
          </svg>
        );
      case 'gift':
        return (
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#DC722C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {/* Kotak hampers / hadiah */}
            <polyline points="20 12 20 22 4 22 4 12" />
            <rect width="20" height="5" x="2" y="7" rx="1" />
            <line x1="12" y1="22" x2="12" y2="7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </svg>
        );
      case 'chat':
        return (
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#DC722C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {/* WhatsApp / Pesan mudah */}
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="benefits-section" aria-labelledby="benefits-heading" ref={sectionRef}>
      <div className="section-container">
        <div className="benefits-container reveal-init">
          <h2 id="benefits-heading" className="benefits-title">
            {title}
          </h2>

          <div className="benefits-grid">
            {benefits.map((item, index) => (
              <div
                key={item.id || index}
                className={`benefit-column ${index < benefits.length - 1 ? 'has-divider' : ''}`}
              >
                <div className="benefit-icon-wrapper">
                  {renderIcon(item.icon)}
                </div>
                <h3 className="benefit-item-title">
                  {item.title}
                </h3>
                <p className="benefit-item-description">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
