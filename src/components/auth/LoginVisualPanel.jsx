import { loginVisualConfig } from '../../data/demoAccounts';
import ImageWithFallback from '../ui/ImageWithFallback';

export default function LoginVisualPanel() {
  return (
    <aside className="login-visual-panel" aria-label="Visual Toko Rasa Pulang">
      {/* Area Gambar Interior Toko */}
      <div className="login-image-frame">
        <ImageWithFallback
          src={loginVisualConfig.imagePath}
          alt={loginVisualConfig.alt}
          aspectRatio="4 / 3"
          placeholderLabel={loginVisualConfig.placeholderLabel}
          priority={true}
          objectFit="cover"
        />
      </div>

      {/* Panel Teks Penjelasan di Bawah Gambar */}
      <div className="login-visual-caption">
        <h2 className="login-caption-title">
          {loginVisualConfig.title}
        </h2>
        <p className="login-caption-desc">
          {loginVisualConfig.description}
        </p>
      </div>
    </aside>
  );
}
