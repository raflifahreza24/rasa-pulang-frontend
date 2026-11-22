import { categoriesData } from '../../data/homeData';
import CategoryCard from './CategoryCard';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function CategorySection({ onCategoryClick }) {
  const sectionRef = useScrollReveal();

  return (
    <section id="kategori" className="category-section" aria-labelledby="category-heading" ref={sectionRef}>
      <div className="section-container">
        <div className="section-header reveal-init">
          <h2 id="category-heading" className="section-title">
            Temukan Camilan Favoritmu
          </h2>
          <p className="section-subtitle">
            Pilihan rasa untuk setiap momen.
          </p>
        </div>

        <div className="category-grid">
          {categoriesData.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              onClick={onCategoryClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
