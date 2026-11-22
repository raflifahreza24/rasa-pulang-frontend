import { useState, useEffect, useMemo, useRef } from 'react';
import {
  getWebsiteContent,
  updateWebsiteContent,
} from '../../data/websiteContentStore';
import DashboardSimulationNotice from '../dashboard/DashboardSimulationNotice';
import WebsiteContentHeader from './WebsiteContentHeader';
import BannerContentSection from './BannerContentSection';
import BusinessStorySection from './BusinessStorySection';
import BusinessAdvantagesSection from './BusinessAdvantagesSection';
import WebsiteContentFormActions from './WebsiteContentFormActions';
import WebsiteContentDiscardDialog from './WebsiteContentDiscardDialog';
import WebsiteContentRestrictedView from './WebsiteContentRestrictedView';

export default function WebsiteContentView({
  currentUser,
  onShowToast,
  onNavigate,
}) {
  const isOwner = currentUser?.role === 'owner';

  // State Konten Tersimpan dari store
  const [savedContent, setSavedContent] = useState(() => getWebsiteContent());

  // Form State / Draft
  const [formData, setFormData] = useState(() => getWebsiteContent());

  // Tracking File Preview URLs untuk dibersihkan saat unmount
  const createdBlobUrlsRef = useRef([]);

  // Flag untuk gambar custom baru yang dipilih
  const [hasCustomBannerImage, setHasCustomBannerImage] = useState(false);
  const [hasCustomStoryImage, setHasCustomStoryImage] = useState(false);

  // Dialog batal
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bersihkan blob URLs saat unmount
  useEffect(() => {
    const urlsToCleanup = createdBlobUrlsRef.current;
    return () => {
      urlsToCleanup.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // Ignore
        }
      });
    };
  }, []);

  // Cek apakah formulir telah mengalami perubahan (isDirty)
  const isDirty = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(savedContent);
  }, [formData, savedContent]);

  // Handler Banner
  const handleBannerChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      banner: {
        ...prev.banner,
        [field]: value,
      },
    }));
  };

  const handleBannerImageUpload = (file) => {
    if (file.size > 2 * 1024 * 1024) {
      onShowToast('Ukuran berkas melebihi 2 MB. Silakan pilih berkas yang lebih kecil.');
      return;
    }
    const blobUrl = URL.createObjectURL(file);
    createdBlobUrlsRef.current.push(blobUrl);
    setFormData((prev) => ({
      ...prev,
      banner: {
        ...prev.banner,
        image: blobUrl,
      },
    }));
    setHasCustomBannerImage(true);
  };

  const handleBannerImageReset = () => {
    setFormData((prev) => ({
      ...prev,
      banner: {
        ...prev.banner,
        image: savedContent.banner.image,
      },
    }));
    setHasCustomBannerImage(false);
  };

  // Handler Cerita Usaha
  const handleStoryChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      story: {
        ...prev.story,
        [field]: value,
      },
    }));
  };

  const handleStoryImageUpload = (file) => {
    if (file.size > 2 * 1024 * 1024) {
      onShowToast('Ukuran berkas melebihi 2 MB. Silakan pilih berkas yang lebih kecil.');
      return;
    }
    const blobUrl = URL.createObjectURL(file);
    createdBlobUrlsRef.current.push(blobUrl);
    setFormData((prev) => ({
      ...prev,
      story: {
        ...prev.story,
        image: blobUrl,
      },
    }));
    setHasCustomStoryImage(true);
  };

  const handleStoryImageReset = () => {
    setFormData((prev) => ({
      ...prev,
      story: {
        ...prev.story,
        image: savedContent.story.image,
      },
    }));
    setHasCustomStoryImage(false);
  };

  // Handler Keunggulan Usaha
  const handleAdvantageItemChange = (index, field, value) => {
    setFormData((prev) => {
      const nextAdvantages = [...prev.advantages];
      nextAdvantages[index] = {
        ...nextAdvantages[index],
        [field]: value,
      };
      return {
        ...prev,
        advantages: nextAdvantages,
      };
    });
  };

  // Handler Tombol Batal
  const handleCancelClick = () => {
    if (isDirty) {
      setShowDiscardDialog(true);
    } else {
      onShowToast('Tidak ada perubahan yang dibatalkan.');
    }
  };

  // Konfirmasi Buang Perubahan
  const handleConfirmDiscard = () => {
    setFormData(JSON.parse(JSON.stringify(savedContent)));
    setHasCustomBannerImage(false);
    setHasCustomStoryImage(false);
    setShowDiscardDialog(false);
    onShowToast('Perubahan dibatalkan dan dikembalikan ke konten awal.');
  };

  // Handler Simpan Perubahan
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi sederhana: judul dan pengantar tidak boleh kosong
    if (!formData.banner.title.trim()) {
      onShowToast('Judul Banner tidak boleh kosong.');
      return;
    }
    if (!formData.story.text.trim()) {
      onShowToast('Cerita Usaha tidak boleh kosong.');
      return;
    }

    setIsSubmitting(true);
    try {
      const updated = updateWebsiteContent(formData);
      setSavedContent(updated);
      setHasCustomBannerImage(false);
      setHasCustomStoryImage(false);
      onShowToast(
        'Konten diperbarui untuk sesi demo ini. Perubahan akan kembali ke data awal setelah halaman dimuat ulang.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigasi ke Website
  const handleViewWebsite = () => {
    if (onNavigate) {
      onNavigate('/');
    }
  };

  // Jika bukan pemilik, render layar restricted
  if (!isOwner) {
    return (
      <WebsiteContentRestrictedView
        onBackToDashboard={() => onNavigate && onNavigate('/dashboard')}
      />
    );
  }

  return (
    <div className="website-content-view">
      {/* Banner Simulasi Portofolio */}
      <div className="anim-enter anim-stagger-1">
        <DashboardSimulationNotice customText="Simulasi portofolio — konten dan informasi bisnis pada halaman ini merupakan contoh." />
      </div>

      {/* Header Halaman Konten Website */}
      <div className="anim-enter anim-stagger-2">
        <WebsiteContentHeader onViewWebsite={handleViewWebsite} />
      </div>

      {/* Form Utama Konten Website */}
      <form onSubmit={handleSubmit} className="website-content-form">
        {/* Panel 1: Banner Utama */}
        <div className="anim-enter anim-stagger-3">
          <BannerContentSection
            bannerData={formData.banner}
            onChange={handleBannerChange}
            onImageChange={handleBannerImageUpload}
            onImageReset={handleBannerImageReset}
            hasCustomImage={hasCustomBannerImage}
          />
        </div>

        {/* Panel 2: Cerita Usaha */}
        <div className="anim-enter anim-stagger-4">
          <BusinessStorySection
            storyData={formData.story}
            onChange={handleStoryChange}
            onImageChange={handleStoryImageUpload}
            onImageReset={handleStoryImageReset}
            hasCustomImage={hasCustomStoryImage}
          />
        </div>

        {/* Panel 3: Keunggulan Usaha */}
        <div className="anim-enter anim-stagger-5">
          <BusinessAdvantagesSection
            advantages={formData.advantages}
            onItemChange={handleAdvantageItemChange}
          />
        </div>

        {/* Sticky Bottom Actions Bar */}
        <div className="anim-enter anim-stagger-6">
          <WebsiteContentFormActions
            onCancel={handleCancelClick}
            isDirty={isDirty}
            isSubmitting={isSubmitting}
          />
        </div>
      </form>

      {/* Modal Dialog Konfirmasi Batal Perubahan */}
      <WebsiteContentDiscardDialog
        isOpen={showDiscardDialog}
        onClose={() => setShowDiscardDialog(false)}
        onConfirmDiscard={handleConfirmDiscard}
      />
    </div>
  );
}
