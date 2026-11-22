import { aboutStoryData } from '../../data/homeData';
import ImageWithFallback from '../ui/ImageWithFallback';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function AboutPreviewSection({ onAboutClick }) {
  const sectionRef = useScrollReveal();

  return (
    <section id="tentang-kami" className="about-section" aria-labelledby="about-heading" ref={sectionRef}>
      <div className="section-container">
        <div className="about-grid">
          {/* Kolom Kiri: Foto Interior Toko */}
          <div className="about-image-wrapper reveal-init">
            <div className="about-image-frame">
              <ImageWithFallback
                src={aboutStoryData.image}
                alt={aboutStoryData.imageAlt}
                aspectRatio="16 / 11"
                placeholderLabel="Foto interior toko Rasa Pulang"
              />
            </div>
          </div>

          {/* Kolom Kanan: Teks Cerita Toko */}
          <div className="about-content reveal-init">
            <p className="about-eyebrow">
              {aboutStoryData.eyebrow}
            </p>
            <h2 id="about-heading" className="about-title">
              {aboutStoryData.title}
            </h2>
            <p className="about-description">
              {aboutStoryData.description}
            </p>
            <div className="about-action">
              <button
                type="button"
                onClick={onAboutClick}
                className="about-link hover-link-orange"
              >
                {aboutStoryData.ctaText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
