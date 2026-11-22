import ImageWithFallback from '../ui/ImageWithFallback';

export default function CategoryCard({ category, index, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(category.name)}
      className={`category-card hover-card-lift reveal-init stagger-${index + 1}`}
      aria-label={`Lihat kategori ${category.name}`}
    >
      <div className="category-image-container">
        <ImageWithFallback
          src={category.image}
          alt={category.alt}
          aspectRatio="1 / 1"
          placeholderLabel={category.name}
        />
      </div>
      <div className="category-name-bar">
        <span>{category.name}</span>
      </div>
    </button>
  );
}
