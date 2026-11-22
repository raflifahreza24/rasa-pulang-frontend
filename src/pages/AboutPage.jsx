import { useState, useEffect } from 'react';
import { siteConfig } from '../data/homeData';
import SimulationNotice from '../components/layout/SimulationNotice';
import SiteHeader from '../components/layout/SiteHeader';
import SiteFooter from '../components/layout/SiteFooter';
import FloatingWhatsAppButton from '../components/layout/FloatingWhatsAppButton';
import ToastNotice from '../components/ui/ToastNotice';
import AboutIntroduction from '../components/about/AboutIntroduction';
import StorePhoto from '../components/about/StorePhoto';
import BrandStorySection from '../components/about/BrandStorySection';
import BenefitsSection from '../components/home/BenefitsSection';
import PurchaseOptionsSection from '../components/about/PurchaseOptionsSection';
import AboutCallToAction from '../components/about/AboutCallToAction';

export default function AboutPage({ onNavigate }) {
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message) => {
    setToastMessage(message);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleWhatsAppAction = () => {
    const phone = siteConfig.contact.whatsAppNumber;
    if (!phone) {
      showToast('Kontak masih berupa simulasi portofolio.');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const message = 'Halo Rasa Pulang, saya ingin menanyakan pilihan camilan dan paket oleh-oleh yang tersedia.';
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleInstagramAction = () => {
    const igUrl = siteConfig.contact.instagramUrl;
    if (!igUrl) {
      showToast('Kontak Instagram masih berupa simulasi portofolio.');
      return;
    }
    window.open(igUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="about-page-root">
      {/* A. Strip Simulasi */}
      <SimulationNotice />

      {/* B. Header Publik dengan menu aktif Tentang Kami */}
      <SiteHeader
        activeNav="tentang-kami"
        onNavigate={onNavigate}
        onContactClick={handleWhatsAppAction}
      />

      <main className="about-main-content">
        <div className="section-container">
          {/* C. Breadcrumb & Pengantar */}
          <AboutIntroduction onNavigate={onNavigate} />

          {/* D. Foto Toko Landscape Besar */}
          <StorePhoto />

          {/* E. Cerita Usaha 2 Kolom */}
          <BrandStorySection />

          {/* F. Tiga Keunggulan Usaha */}
          <BenefitsSection title="Yang Membuat Kami Dekat" />

          {/* G. Pilihan Pembelian: Satuan & Hampers */}
          <PurchaseOptionsSection />

          {/* H. CTA Penutup */}
          <AboutCallToAction
            onNavigate={onNavigate}
            onWhatsAppClick={handleWhatsAppAction}
          />
        </div>
      </main>

      {/* I. Footer */}
      <SiteFooter
        onNavigate={onNavigate}
        onContactClick={handleWhatsAppAction}
        onInstagramClick={handleInstagramAction}
      />

      {/* J. Tombol WhatsApp Mengambang */}
      <FloatingWhatsAppButton onClick={handleWhatsAppAction} />

      {/* Notifikasi Demo */}
      <ToastNotice
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
