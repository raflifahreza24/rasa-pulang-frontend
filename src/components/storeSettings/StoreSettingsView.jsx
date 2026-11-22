import { useState, useEffect, useMemo, useRef } from 'react';
import {
  getStoreSettings,
  updateStoreSettings,
} from '../../data/storeSettingsStore';
import DashboardSimulationNotice from '../dashboard/DashboardSimulationNotice';
import StoreSettingsHeader from './StoreSettingsHeader';
import StoreIdentitySection from './StoreIdentitySection';
import StoreAddressSection from './StoreAddressSection';
import StoreOperatingHoursSection from './StoreOperatingHoursSection';
import StoreContactLinksSection from './StoreContactLinksSection';
import StoreSettingsActions from './StoreSettingsActions';
import StoreSettingsDiscardDialog from './StoreSettingsDiscardDialog';
import StoreSettingsRestrictedView from './StoreSettingsRestrictedView';

export default function StoreSettingsView({
  currentUser,
  onShowToast,
  onNavigate,
}) {
  const isOwner = currentUser?.role === 'owner';

  // Baseline pengaturan tersimpan dari store
  const [savedSettings, setSavedSettings] = useState(() => getStoreSettings());

  // Form State / Draft
  const [formData, setFormData] = useState(() => getStoreSettings());

  // Error Validasi Per Field
  const [errors, setErrors] = useState({});

  // Tracking File Object URLs untuk dibersihkan saat unmount
  const createdBlobUrlsRef = useRef([]);

  // Flag apakah logo saat ini adalah berkas lokal baru yang dipilih
  const [hasCustomLogo, setHasCustomLogo] = useState(false);

  // Dialog batal
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bersihkan object URLs saat unmount
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

  // Cek apakah form mengalami perubahan dibanding saved baseline
  const isDirty = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(savedSettings);
  }, [formData, savedSettings]);

  // Handler Field
  const handleStoreNameChange = (val) => {
    setFormData((prev) => ({ ...prev, storeName: val }));
    if (errors.storeName) {
      setErrors((prev) => ({ ...prev, storeName: undefined }));
    }
  };

  const handleAddressChange = (val) => {
    setFormData((prev) => ({ ...prev, address: val }));
    if (errors.address) {
      setErrors((prev) => ({ ...prev, address: undefined }));
    }
  };

  const handleOpeningHoursChange = (val) => {
    setFormData((prev) => ({ ...prev, openingHours: val }));
    if (errors.openingHours) {
      setErrors((prev) => ({ ...prev, openingHours: undefined }));
    }
  };

  const handleWhatsAppChange = (val) => {
    setFormData((prev) => ({ ...prev, whatsappNumber: val }));
    if (errors.whatsappNumber) {
      setErrors((prev) => ({ ...prev, whatsappNumber: undefined }));
    }
  };

  const handleInstagramChange = (val) => {
    setFormData((prev) => ({ ...prev, instagramUrl: val }));
    if (errors.instagramUrl) {
      setErrors((prev) => ({ ...prev, instagramUrl: undefined }));
    }
  };

  const handleGoogleMapsChange = (val) => {
    setFormData((prev) => ({ ...prev, googleMapsUrl: val }));
    if (errors.googleMapsUrl) {
      setErrors((prev) => ({ ...prev, googleMapsUrl: undefined }));
    }
  };

  // Handler Upload Logo Lokal
  const handleLogoUpload = (file) => {
    // Validasi tipe berkas
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      onShowToast('Format logo harus JPG, PNG, atau WebP.');
      return;
    }

    // Validasi ukuran <= 2 MB
    if (file.size > 2 * 1024 * 1024) {
      onShowToast('Ukuran logo maksimal 2 MB.');
      return;
    }

    const blobUrl = URL.createObjectURL(file);
    createdBlobUrlsRef.current.push(blobUrl);
    setFormData((prev) => ({ ...prev, logo: blobUrl }));
    setHasCustomLogo(true);
  };

  // Batalkan Logo Lokal
  const handleLogoReset = () => {
    setFormData((prev) => ({ ...prev, logo: savedSettings.logo }));
    setHasCustomLogo(false);
  };

  // Handler Buka Tautan Maps
  const handleOpenMaps = () => {
    const rawUrl = (formData.googleMapsUrl || '').trim();
    if (!rawUrl) {
      onShowToast('Tautan Google Maps masih kosong.');
      return;
    }

    try {
      const parsed = new URL(rawUrl);
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
        onShowToast('Tautan Google Maps harus menggunakan protokol HTTP/HTTPS.');
        return;
      }
      window.open(parsed.href, '_blank', 'noopener,noreferrer');
    } catch {
      onShowToast('Tautan Google Maps tidak valid.');
    }
  };

  // Validasi Keseluruhan Form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.storeName || !formData.storeName.trim()) {
      newErrors.storeName = 'Nama toko wajib diisi.';
    }

    if (!formData.address || !formData.address.trim()) {
      newErrors.address = 'Alamat toko wajib diisi.';
    }

    if (!formData.openingHours || !formData.openingHours.trim()) {
      newErrors.openingHours = 'Jam operasional wajib diisi.';
    }

    // Validasi WhatsApp jika diisi
    if (formData.whatsappNumber && formData.whatsappNumber.trim() !== '') {
      const cleanWa = formData.whatsappNumber.trim();
      const waRegex = /^628\d{7,13}$/;
      if (!waRegex.test(cleanWa)) {
        newErrors.whatsappNumber =
          'Gunakan format nomor WhatsApp yang sesuai (contoh: 628xxxxxxxxxx).';
      }
    }

    // Validasi Instagram jika diisi
    if (formData.instagramUrl && formData.instagramUrl.trim() !== '') {
      const cleanIg = formData.instagramUrl.trim();
      try {
        const parsed = new URL(cleanIg);
        if (parsed.protocol !== 'https:') {
          newErrors.instagramUrl = 'Masukkan tautan Instagram HTTPS yang valid.';
        } else if (
          parsed.hostname !== 'instagram.com' &&
          parsed.hostname !== 'www.instagram.com'
        ) {
          newErrors.instagramUrl =
            'Tautan harus mengarah ke instagram.com (contoh: https://www.instagram.com/namaakun/).';
        }
      } catch {
        newErrors.instagramUrl =
          'Masukkan tautan Instagram yang valid (contoh: https://www.instagram.com/namaakun/).';
      }
    }

    // Validasi Google Maps jika diisi
    if (formData.googleMapsUrl && formData.googleMapsUrl.trim() !== '') {
      const cleanMaps = formData.googleMapsUrl.trim();
      try {
        const parsed = new URL(cleanMaps);
        if (parsed.protocol !== 'https:') {
          newErrors.googleMapsUrl = 'Masukkan tautan Google Maps HTTPS yang valid.';
        }
      } catch {
        newErrors.googleMapsUrl = 'Masukkan tautan Google Maps yang valid.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handler Submit Simpan
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isOwner) {
      onShowToast('Hanya akun Pemilik yang dapat menyimpan perubahan.');
      return;
    }

    if (!validateForm()) {
      onShowToast('Silakan periksa kembali isian formulir yang ditandai merah.');
      return;
    }

    setIsSubmitting(true);
    try {
      const normalizedData = {
        storeName: formData.storeName.trim(),
        logo: formData.logo,
        address: formData.address.trim(),
        openingHours: formData.openingHours.trim(),
        whatsappNumber: formData.whatsappNumber && formData.whatsappNumber.trim() !== ''
          ? formData.whatsappNumber.trim()
          : null,
        instagramUrl: formData.instagramUrl && formData.instagramUrl.trim() !== ''
          ? formData.instagramUrl.trim()
          : null,
        googleMapsUrl: formData.googleMapsUrl && formData.googleMapsUrl.trim() !== ''
          ? formData.googleMapsUrl.trim()
          : null,
        isSimulation: true,
      };

      const updated = updateStoreSettings(normalizedData);
      setSavedSettings(updated);
      setFormData(updated);
      setHasCustomLogo(false);
      onShowToast(
        'Pengaturan diperbarui untuk sesi demo ini. Perubahan akan kembali ke data awal setelah halaman dimuat ulang.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler Tombol Batal
  const handleCancelClick = () => {
    if (isDirty) {
      setShowDiscardDialog(true);
    } else {
      onShowToast('Tidak ada perubahan yang dibatalkan.');
    }
  };

  // Konfirmasi Batal Perubahan
  const handleConfirmDiscard = () => {
    setFormData(JSON.parse(JSON.stringify(savedSettings)));
    setErrors({});
    setHasCustomLogo(false);
    setShowDiscardDialog(false);
    onShowToast('Perubahan dibatalkan dan dikembalikan ke pengaturan tersimpan.');
  };

  // Jika bukan pemilik, render layar restricted
  if (!isOwner) {
    return (
      <StoreSettingsRestrictedView
        onBackToDashboard={() => onNavigate && onNavigate('/dashboard')}
      />
    );
  }

  return (
    <div className="store-settings-view">
      {/* Banner Simulasi Portofolio */}
      <div className="anim-enter anim-stagger-1">
        <DashboardSimulationNotice customText="Simulasi portofolio — identitas, alamat, dan kontak pada halaman ini merupakan contoh." />
      </div>

      {/* Header Halaman Pengaturan Toko */}
      <div className="anim-enter anim-stagger-2">
        <StoreSettingsHeader />
      </div>

      {/* Form Utama Pengaturan Toko */}
      <form onSubmit={handleSubmit} className="store-settings-form" noValidate>
        {/* Panel 1: Identitas Toko */}
        <div className="anim-enter anim-stagger-3">
          <StoreIdentitySection
            storeName={formData.storeName}
            logo={formData.logo}
            onChangeStoreName={handleStoreNameChange}
            onLogoChange={handleLogoUpload}
            onLogoReset={handleLogoReset}
            hasCustomLogo={hasCustomLogo}
            errors={errors}
          />
        </div>

        {/* Panel 2: Alamat Toko */}
        <div className="anim-enter anim-stagger-4">
          <StoreAddressSection
            address={formData.address}
            onChangeAddress={handleAddressChange}
            errors={errors}
          />
        </div>

        {/* Panel 3: Jam Operasional */}
        <div className="anim-enter anim-stagger-5">
          <StoreOperatingHoursSection
            openingHours={formData.openingHours}
            onChangeOpeningHours={handleOpeningHoursChange}
            errors={errors}
          />
        </div>

        {/* Panel 4: Kontak dan Tautan */}
        <div className="anim-enter anim-stagger-6">
          <StoreContactLinksSection
            whatsappNumber={formData.whatsappNumber}
            onChangeWhatsApp={handleWhatsAppChange}
            instagramUrl={formData.instagramUrl}
            onChangeInstagram={handleInstagramChange}
            googleMapsUrl={formData.googleMapsUrl}
            onChangeGoogleMaps={handleGoogleMapsChange}
            onOpenMaps={handleOpenMaps}
            errors={errors}
          />
        </div>

        {/* Catatan Simulasi Portofolio Bawah & Sticky Bottom Actions */}
        <div className="anim-enter anim-stagger-7">
          <div className="store-settings-portfolio-note">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#A64B17"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>
              Mode portofolio: gunakan data contoh dan hindari nomor atau akun milik pihak lain.
            </span>
          </div>

          <StoreSettingsActions
            onCancel={handleCancelClick}
            isDirty={isDirty}
            isSubmitting={isSubmitting}
          />
        </div>
      </form>

      {/* Modal Dialog Konfirmasi Batal */}
      <StoreSettingsDiscardDialog
        isOpen={showDiscardDialog}
        onClose={() => setShowDiscardDialog(false)}
        onConfirmDiscard={handleConfirmDiscard}
      />
    </div>
  );
}
