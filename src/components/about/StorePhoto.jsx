import { storePhotoData } from '../../data/aboutData';
import ImageWithFallback from '../ui/ImageWithFallback';

export default function StorePhoto() {
  return (
    <div className="about-store-photo-wrapper about-animate-photo" aria-label="Foto interior toko Rasa Pulang">
      <div className="about-store-photo-frame">
        <ImageWithFallback
          src={storePhotoData.path}
          alt={storePhotoData.alt}
          aspectRatio="2.1 / 1"
          placeholderLabel={storePhotoData.placeholderLabel}
          priority={true}
          objectFit="cover"
        />
      </div>
    </div>
  );
}
