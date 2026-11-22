import { storeFrontPhotoData } from '../../data/contactData';
import ImageWithFallback from '../ui/ImageWithFallback';

export default function StoreFrontPhoto() {
  return (
    <div className="storefront-card" aria-label="Foto dan ilustrasi tampak depan toko Rasa Pulang">
      {/* Area Gambar Tampak Depan Toko */}
      <div className="storefront-image-container">
        <ImageWithFallback
          src={storeFrontPhotoData.path}
          alt={storeFrontPhotoData.alt}
          aspectRatio="0.75 / 1"
          placeholderLabel={storeFrontPhotoData.placeholderLabel}
          priority={true}
          objectFit="cover"
        />
      </div>

      {/* Caption Keterangan Ilustrasi Proyek Portofolio */}
      <div className="storefront-caption-bar">
        <p className="storefront-caption-text">
          {storeFrontPhotoData.caption}
        </p>
      </div>
    </div>
  );
}
