import { brandStoryData } from '../../data/aboutData';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function BrandStorySection() {
  const sectionRef = useScrollReveal();

  return (
    <section className="about-brand-story-section" aria-labelledby="story-heading" ref={sectionRef}>
      <div className="brand-story-grid reveal-init">
        {/* Kolom Kiri (~40%) */}
        <div className="story-left-col">
          <p className="story-label">
            {brandStoryData.label}
          </p>
          <h2 id="story-heading" className="story-title">
            Berawal dari Rasa,<br />
            Tumbuh Lewat<br />
            Kebersamaan.
          </h2>
          <div className="story-simulation-pill">
            <span>{brandStoryData.simulationBadge}</span>
          </div>
        </div>

        {/* Kolom Kanan (~60%) */}
        <div className="story-right-col">
          {brandStoryData.paragraphs.map((p, idx) => (
            <p key={idx} className="story-paragraph">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
