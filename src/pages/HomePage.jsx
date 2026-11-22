import { useState } from 'react';
import { siteConfig, buildWhatsAppUrl } from '../data/homeData';
import { productsData } from '../data/productsData';
import SimulationNotice from '../components/layout/SimulationNotice';
import SiteHeader from '../components/layout/SiteHeader';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import FeaturedProductsSection from '../components/home/FeaturedProductsSection';
import BenefitsSection from '../components/home/BenefitsSection';
import AboutPreviewSection from '../components/home/AboutPreviewSection';
import StoreLocationSection from '../components/home/StoreLocationSection';
import SiteFooter from '../components/layout/SiteFooter';
import FloatingWhatsAppButton from '../components/layout/FloatingWhatsAppButton';
import ToastNotice from '../components/ui/ToastNotice';

export default function HomePage({ onNavigate }) {
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message) => {
    setToastMessage(message);
  };

  const handleWhatsAppAction = (productName = null, isAvailable = true) => {
    const phone = siteConfig.contact.whatsAppNumber;
    if (!phone) {
      showToast('Kontak masih berupa simulasi portofolio.');
      return;
    }
    const url = buildWhatsAppUrl(phone, productName, isAvailable);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleInstagramAction = () => {
    const igUrl = siteConfig.contact.instagramUrl;
    if (!igUrl) {
      showToast('Kontak Instagram masih berupa simulasi portofolio.');
      return;
    }
    window.open(igUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCategoryClick = (categoryName) => {
    if (onNavigate) {
      onNavigate('/katalog');
      return;
    }
    showToast(`Kategori "${categoryName}" akan tersedia pada katalog lengkap.`);
  };

  const handleProductClick = (productName) => {
    const prod = productsData.find((p) => p.name === productName);
    if (prod && onNavigate) {
      onNavigate(`/produk/${prod.slug}`);
      return;
    }
    showToast(`Halaman detail untuk "${productName}" belum tersedia.`);
  };

  const handleSeeAllClick = () => {
    if (onNavigate) {
      onNavigate('/katalog');
      return;
    }
    showToast('Membuka katalog produk lengkap...');
  };

  const handleAboutClick = () => {
    if (onNavigate) {
      onNavigate('/tentang-kami');
      return;
    }
    showToast('Membuka halaman Tentang Kami...');
  };

  const handleLocationClick = () => {
    if (onNavigate) {
      onNavigate('/kontak');
      return;
    }
    showToast('Alamat dan jam operasional merupakan data contoh simulasi.');
  };

  return (
    <div className="home-page-root">
      {/* A. Strip Informasi Simulasi */}
      <SimulationNotice />

      {/* B. Header */}
      <SiteHeader
        activeNav="beranda"
        onNavigate={onNavigate}
        onContactClick={() => handleWhatsAppAction()}
      />

      <main>
        {/* C. Hero Section */}
        <HeroSection onContactClick={() => handleWhatsAppAction()} />

        {/* D. Kategori Produk */}
        <CategorySection onCategoryClick={handleCategoryClick} />

        {/* E. Produk Unggulan */}
        <FeaturedProductsSection
          onProductClick={handleProductClick}
          onSeeAllClick={handleSeeAllClick}
        />

        {/* F. Keunggulan Toko ("Kenapa Rasa Pulang?") */}
        <BenefitsSection />

        {/* G. Cerita Singkat ("CERITA KAMI") */}
        <AboutPreviewSection onAboutClick={handleAboutClick} />

        {/* H. Lokasi & Jam Operasional */}
        <StoreLocationSection onLocationClick={handleLocationClick} />
      </main>

      {/* I. Footer */}
      <SiteFooter
        onNavigate={onNavigate}
        onContactClick={() => handleWhatsAppAction()}
        onInstagramClick={handleInstagramAction}
      />

      {/* J. Tombol WhatsApp Mengambang */}
      <FloatingWhatsAppButton onClick={() => handleWhatsAppAction()} />

      {/* Notifikasi Demo */}
      <ToastNotice
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
