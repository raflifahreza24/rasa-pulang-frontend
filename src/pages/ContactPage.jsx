import { useState, useEffect } from 'react';
import { siteConfig } from '../data/homeData';
import { contactInformationData } from '../data/contactData';
import SimulationNotice from '../components/layout/SimulationNotice';
import SiteHeader from '../components/layout/SiteHeader';
import SiteFooter from '../components/layout/SiteFooter';
import FloatingWhatsAppButton from '../components/layout/FloatingWhatsAppButton';
import ToastNotice from '../components/ui/ToastNotice';
import ContactIntroduction from '../components/contact/ContactIntroduction';
import ContactInformationPanel from '../components/contact/ContactInformationPanel';
import StoreFrontPhoto from '../components/contact/StoreFrontPhoto';
import ContactSimulationNotice from '../components/contact/ContactSimulationNotice';
import CatalogCallToAction from '../components/contact/CatalogCallToAction';

export default function ContactPage({ onNavigate }) {
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
    const message = contactInformationData.whatsApp.message;
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleInstagramAction = () => {
    const igUrl = siteConfig.contact.instagramUrl;
    if (!igUrl) {
      showToast('Akun Instagram masih berupa simulasi portofolio.');
      return;
    }
    window.open(igUrl, '_blank', 'noopener,noreferrer');
  };

  const handleGoogleMapsAction = () => {
    const mapsUrl = contactInformationData.googleMaps.url;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="contact-page-root">
      {/* A. Strip Simulasi */}
      <SimulationNotice />

      {/* B. Header Publik dengan menu aktif Kontak */}
      <SiteHeader
        activeNav="kontak"
        onNavigate={onNavigate}
        onContactClick={handleWhatsAppAction}
      />

      <main className="contact-main-content">
        <div className="section-container">
          {/* C. Breadcrumb & Pengantar */}
          <ContactIntroduction onNavigate={onNavigate} />

          {/* D. Konten Utama Dua Kolom: Panel Informasi (Kiri) & Foto Depan Toko (Kanan) */}
          <div className="contact-main-grid contact-animate-body">
            <ContactInformationPanel
              onWhatsAppClick={handleWhatsAppAction}
              onInstagramClick={handleInstagramAction}
              onGoogleMapsClick={handleGoogleMapsAction}
            />
            <StoreFrontPhoto />
          </div>

          {/* E. Catatan Simulasi Tipis Selebar Kontainer */}
          <ContactSimulationNotice />

          {/* F. CTA Menuju Katalog */}
          <CatalogCallToAction onNavigate={onNavigate} />
        </div>
      </main>

      {/* G. Footer */}
      <SiteFooter
        onNavigate={onNavigate}
        onContactClick={handleWhatsAppAction}
        onInstagramClick={handleInstagramAction}
      />

      {/* H. Tombol WhatsApp Mengambang */}
      <FloatingWhatsAppButton onClick={handleWhatsAppAction} />

      {/* Notifikasi Demo */}
      <ToastNotice
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
