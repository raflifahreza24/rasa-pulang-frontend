import { useMemo, useState, useEffect } from 'react';
import { productsData, categoriesData, findProductBySlug } from '../data/productsData';
import { siteConfig } from '../data/homeData';
import SimulationNotice from '../components/layout/SimulationNotice';
import SiteHeader from '../components/layout/SiteHeader';
import SiteFooter from '../components/layout/SiteFooter';
import FloatingWhatsAppButton from '../components/layout/FloatingWhatsAppButton';
import ToastNotice from '../components/ui/ToastNotice';
import ProductBreadcrumb from '../components/detail/ProductBreadcrumb';
import ProductGallery from '../components/detail/ProductGallery';
import ProductSummary from '../components/detail/ProductSummary';
import ProductInformation from '../components/detail/ProductInformation';
import RelatedProductsSection from '../components/detail/RelatedProductsSection';
import ProductNotFound from '../components/detail/ProductNotFound';

export default function ProductDetailPage({ slug, onNavigate }) {
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message) => {
    setToastMessage(message);
  };

  // Cari produk berdasarkan slug
  const product = useMemo(() => {
    return findProductBySlug(slug);
  }, [slug]);

  // Cari kategori produk
  const category = useMemo(() => {
    if (!product) return null;
    return categoriesData.find((c) => c.id === product.categoryId) || null;
  }, [product]);

  // Validasi ketersediaan publikasi produk & status aktif kategori
  const isProductValid = useMemo(() => {
    if (!product) return false;
    if (!product.isPublished || product.deletedAt) return false;
    if (category && !category.isActive) return false;
    return true;
  }, [product, category]);

  // Produk terkait dari kategori yang sama (maksimal 4, tidak termasuk produk yang dibuka)
  const relatedProducts = useMemo(() => {
    if (!product || !isProductValid) return [];
    return productsData
      .filter(
        (p) =>
          p.categoryId === product.categoryId &&
          p.id !== product.id &&
          p.isPublished &&
          !p.deletedAt
      )
      .slice(0, 4);
  }, [product, isProductValid]);

  // Scroll ke atas setiap kali produk berganti
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Handler WhatsApp dengan format pesan resmi sesuai status ketersediaan
  const handleWhatsAppAction = (targetProduct = product) => {
    const phone = siteConfig.contact.whatsAppNumber;
    if (!phone) {
      showToast('Kontak masih berupa simulasi portofolio.');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const message =
      targetProduct.availability === 'Tersedia'
        ? `Halo Rasa Pulang, saya ingin menanyakan ketersediaan ${targetProduct.name}.\nTautan produk: ${currentUrl}\nApakah produk ini tersedia?`
        : `Halo Rasa Pulang, saya melihat ${targetProduct.name} berstatus habis.\nTautan produk: ${currentUrl}\nApakah produk ini sudah tersedia kembali?`;

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

  const handleRelatedProductClick = (prod) => {
    if (onNavigate) {
      onNavigate(`/produk/${prod.slug}`);
    }
  };

  return (
    <div className="product-detail-page-root">
      {/* A. Strip Simulasi */}
      <SimulationNotice />

      {/* B. Header Publik */}
      <SiteHeader
        activeNav="katalog"
        onNavigate={onNavigate}
        onContactClick={() => handleWhatsAppAction(product)}
      />

      <main className="product-detail-main">
        <div className="section-container">
          {!isProductValid ? (
            <ProductNotFound onNavigate={onNavigate} />
          ) : (
            <>
              {/* C. Breadcrumb */}
              <ProductBreadcrumb
                product={product}
                category={category}
                onNavigate={onNavigate}
              />

              {/* D. Bagian Utama Produk: 2 Kolom (Galeri & Informasi) */}
              <div className="product-primary-layout">
                {/* Kolom Kiri: Galeri */}
                <div className="product-gallery-column">
                  <ProductGallery
                    key={product.id}
                    images={product.images || [
                      {
                        id: `img-${product.id}-0`,
                        path: `/images/rasa-pulang/products/${product.imageKey}.webp`,
                        alt: product.name,
                        position: 0,
                        label: 'Foto produk',
                      },
                    ]}
                    productName={product.name}
                  />
                </div>

                {/* Kolom Kanan: Ringkasan & Aksi Pesan */}
                <div className="product-summary-column">
                  <ProductSummary
                    product={product}
                    category={category}
                    onWhatsAppClick={handleWhatsAppAction}
                  />
                </div>
              </div>

              {/* E. Panel Informasi Produk (Deskripsi, Komposisi, Daya Simpan) */}
              <ProductInformation product={product} />

              {/* F. Produk Terkait */}
              <RelatedProductsSection
                category={category}
                relatedProducts={relatedProducts}
                onNavigate={onNavigate}
                onProductClick={handleRelatedProductClick}
              />
            </>
          )}
        </div>
      </main>

      {/* G. Footer */}
      <SiteFooter
        onNavigate={onNavigate}
        onContactClick={() => handleWhatsAppAction(product)}
        onInstagramClick={handleInstagramAction}
      />

      {/* H. Tombol WhatsApp Mengambang */}
      <FloatingWhatsAppButton onClick={() => handleWhatsAppAction(product)} />

      {/* Notifikasi Toast Demo */}
      <ToastNotice
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
