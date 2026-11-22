import { useState, useEffect, useRef, useCallback } from 'react';
import DashboardSimulationNotice from '../dashboard/DashboardSimulationNotice';
import EditProductHeader from './EditProductHeader';
import ProductIdentitySection from '../createProduct/ProductIdentitySection';
import ProductPricingSection from '../createProduct/ProductPricingSection';
import ProductInformationSection from '../createProduct/ProductInformationSection';
import EditProductImagesSection from './EditProductImagesSection';
import EditProductDisplaySettingsSection from './EditProductDisplaySettingsSection';
import EditProductFormActions from './EditProductFormActions';
import UnsavedChangesDialog from '../createProduct/UnsavedChangesDialog';
import {
  getProductById,
  updateSessionProduct,
  isSkuDuplicate,
  getFeaturedSlotUsageForProduct,
  subscribeSessionProducts,
} from '../../data/productsStore';

/**
 * Format tanggal dan waktu pembaruan produk dalam Bahasa Indonesia (WIB)
 * Contoh: 17 November 2026, 09.20 WIB
 */
function formatProductUpdatedAt(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-';

  const d = date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  });

  const time = date
    .toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Jakarta',
    })
    .replace(':', '.');

  return `${d}, ${time} WIB`;
}

export default function EditProductView({
  productId = 1,
  onNavigate,
  onShowToast,
}) {
  // Ambil baseline data produk dari store
  const [product, setProduct] = useState(() => getProductById(productId));

  // Dengarkan perubahan store produk
  useEffect(() => {
    const unsubscribe = subscribeSessionProducts(() => {
      const latest = getProductById(productId);
      setProduct(latest);
    });
    return unsubscribe;
  }, [productId]);

  // Ekstrak foto utama dan tambahan awal dari baseline produk
  const initialPhotos = (() => {
    if (!product) return { primary: null, additional: [] };

    if (Array.isArray(product.images) && product.images.length > 0) {
      const sorted = [...product.images].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
      const main = sorted.find((img) => img.position === 0) || sorted[0];
      const primary = {
        id: main.id || 'initial-primary',
        path: main.path,
        alt: main.alt || `${product.name} - Foto Utama`,
        label: main.label || 'Foto produk',
        isBlob: false,
      };

      const additional = sorted
        .filter((img) => img !== main)
        .slice(0, 4)
        .map((img, i) => ({
          id: img.id || `initial-add-${i + 1}`,
          path: img.path,
          alt: img.alt || `${product.name} - Foto Tambahan ${i + 1}`,
          label: img.label || `Foto ${i + 1}`,
          isBlob: false,
        }));

      return { primary, additional };
    }

    const primary = {
      id: 'initial-primary',
      path: product.imageKey
        ? `/images/rasa-pulang/products/${product.imageKey}.webp`
        : '',
      alt: `${product.name} - Foto Utama`,
      label: 'Foto produk',
      isBlob: false,
    };

    return { primary, additional: [] };
  })();

  // State Draft Formulir Edit
  const [name, setName] = useState(product?.name || '');
  const [sku, setSku] = useState(product?.sku || '');
  const [categoryId, setCategoryId] = useState(product?.categoryId || '');
  const [price, setPrice] = useState(product?.price !== undefined ? String(product.price) : '');
  const [weight, setWeight] = useState(
    product?.netWeightGrams !== undefined ? String(product.netWeightGrams) : ''
  );
  const [description, setDescription] = useState(product?.description || '');
  const [ingredients, setIngredients] = useState(product?.ingredients || '');
  const [shelfLifeInfo, setShelfLifeInfo] = useState(product?.shelfLifeInfo || '');
  const [availability, setAvailability] = useState(product?.availability || 'Tersedia');
  const [publication, setPublication] = useState(
    product?.isPublished ? 'Ditampilkan' : 'Disembunyikan'
  );
  const [isFeatured, setIsFeatured] = useState(Boolean(product?.isFeatured));

  // Galeri foto dalam draft
  const [primaryImage, setPrimaryImage] = useState(initialPhotos.primary);
  const [additionalImages, setAdditionalImages] = useState(initialPhotos.additional);

  // Lacak object URL lokal yang dibuat selama sesi draft untuk dibersihkan jika batal
  const createdBlobUrlsRef = useRef(new Set());

  // Error validasi
  const [errors, setErrors] = useState({});
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hitung penggunaan kapasitas slot unggulan khusus produk ini
  const slotUsage = getFeaturedSlotUsageForProduct(product?.id);

  // Status kotor (dirty state) - bandingkan dengan baseline awal
  const isDirty = (() => {
    if (!product) return false;
    const initialPrice = product.price !== undefined ? String(product.price) : '';
    const initialWeight =
      product.netWeightGrams !== undefined ? String(product.netWeightGrams) : '';
    const initialPub = product.isPublished ? 'Ditampilkan' : 'Disembunyikan';
    const initialFeat = Boolean(product.isFeatured);

    if (name !== (product.name || '')) return true;
    if (sku !== (product.sku || '')) return true;
    if (categoryId !== (product.categoryId || '')) return true;
    if (price !== initialPrice) return true;
    if (weight !== initialWeight) return true;
    if (description !== (product.description || '')) return true;
    if (ingredients !== (product.ingredients || '')) return true;
    if (shelfLifeInfo !== (product.shelfLifeInfo || '')) return true;
    if (availability !== (product.availability || 'Tersedia')) return true;
    if (publication !== initialPub) return true;
    if (isFeatured !== initialFeat) return true;

    // Periksa apakah foto utama berubah
    if (primaryImage?.path !== initialPhotos.primary?.path) return true;

    // Periksa apakah foto tambahan berubah
    if (additionalImages.length !== initialPhotos.additional.length) return true;
    for (let i = 0; i < additionalImages.length; i++) {
      if (additionalImages[i]?.path !== initialPhotos.additional[i]?.path) return true;
    }

    return false;
  })();

  // Navigation guard browser window sebelum unload jika dirty
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Bersihkan blob URLs yang dibatalkan saat unmount jika tidak disimpan
  useEffect(() => {
    const blobSet = createdBlobUrlsRef.current;
    return () => {
      blobSet.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // Abaikan
        }
      });
    };
  }, []);

  // Handler pergantian foto utama
  const handlePrimaryImageChange = useCallback((newImg) => {
    if (newImg.isBlob) {
      createdBlobUrlsRef.current.add(newImg.path);
    }
    setPrimaryImage(newImg);
    setErrors((prev) => ({ ...prev, primaryImage: undefined }));
  }, []);

  // Handler penambahan foto tambahan
  const handleAddAdditionalImage = useCallback((newImg) => {
    if (newImg.isBlob) {
      createdBlobUrlsRef.current.add(newImg.path);
    }
    setAdditionalImages((prev) => [...prev, newImg]);
  }, []);

  // Handler penghapusan foto tambahan
  const handleRemoveAdditionalImage = useCallback((index) => {
    setAdditionalImages((prev) => {
      const removed = prev[index];
      if (removed?.isBlob) {
        try {
          URL.revokeObjectURL(removed.path);
          createdBlobUrlsRef.current.delete(removed.path);
        } catch {
          // Abaikan
        }
      }
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  // Handler pertukaran (swap) foto tambahan terpilih menjadi foto utama
  const handleSwapWithPrimary = useCallback((additionalIndex) => {
    setPrimaryImage((currentPrimary) => {
      setAdditionalImages((currentAdditional) => {
        const targetPhoto = currentAdditional[additionalIndex];
        if (!targetPhoto) return currentAdditional;

        // Foto tambahan baru mengambil slot yang ditinggalkan
        const updatedAdditional = [...currentAdditional];
        updatedAdditional[additionalIndex] = currentPrimary;
        return updatedAdditional;
      });
      return additionalImages[additionalIndex];
    });
  }, [additionalImages]);

  // Handler tombol Kembali ke Daftar atau Batal
  const handleBackOrCancel = () => {
    if (isDirty) {
      setShowUnsavedDialog(true);
    } else {
      if (onNavigate) onNavigate('/dashboard/produk');
    }
  };

  // Konfirmasi buang perubahan dari dialog
  const handleConfirmDiscard = () => {
    setShowUnsavedDialog(false);
    // Revoke semua blob URL lokal yang dibuat selama sesi draft ini
    createdBlobUrlsRef.current.forEach((url) => {
      try {
        URL.revokeObjectURL(url);
      } catch {
        // Abaikan
      }
    });
    createdBlobUrlsRef.current.clear();
    if (onNavigate) onNavigate('/dashboard/produk');
  };

  // Validasi seluruh input formulir sebelum menyimpan
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Nama produk wajib diisi.';
    }

    if (!sku.trim()) {
      newErrors.sku = 'SKU / kode produk wajib diisi.';
    } else if (isSkuDuplicate(sku, product.id)) {
      newErrors.sku = 'Kode produk (SKU) sudah digunakan oleh produk lain.';
    }

    if (!categoryId) {
      newErrors.categoryId = 'Harap pilih kategori produk.';
    }

    const numPrice = Number(String(price).replace(/\D/g, ''));
    if (!price || isNaN(numPrice) || numPrice <= 0) {
      newErrors.price = 'Harga harus lebih besar dari 0.';
    }

    const numWeight = Number(String(weight).replace(/\D/g, ''));
    if (!weight || isNaN(numWeight) || numWeight <= 0) {
      newErrors.weight = 'Masukkan berat bersih dalam gram (lebih besar dari 0).';
    }

    if (!description.trim()) {
      newErrors.description = 'Deskripsi produk wajib diisi.';
    }

    if (!primaryImage || !primaryImage.path) {
      newErrors.primaryImage = 'Foto utama wajib tersedia.';
    }

    // Periksa kapasitas slot unggulan
    if (isFeatured && !slotUsage.canEnable && !product.isFeatured) {
      newErrors.isFeatured = 'Kapasitas slot produk unggulan sudah penuh (8 dari 8).';
    }

    setErrors(newErrors);

    // Fokus ke elemen error pertama
    if (Object.keys(newErrors).length > 0) {
      const firstKey = Object.keys(newErrors)[0];
      const el =
        document.getElementById(`input-product-${firstKey}`) ||
        document.getElementById(`textarea-product-${firstKey}`) ||
        document.getElementById(`select-product-${firstKey}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
      return false;
    }

    return true;
  };

  // Handler Simpan Perubahan
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!product) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    const updatedImages = [
      {
        id: primaryImage.id || 'img-primary',
        path: primaryImage.path,
        alt: `${name.trim()} - Foto Utama`,
        position: 0,
        label: 'Foto produk',
      },
      ...additionalImages.map((img, i) => ({
        id: img.id || `img-additional-${i + 1}`,
        path: img.path,
        alt: img.alt || `${name.trim()} - Foto Tambahan ${i + 1}`,
        position: i + 1,
        label: img.label || `Foto ${i + 1}`,
      })),
    ];

    const updatedData = {
      name: name.trim(),
      sku: sku.trim().toUpperCase(),
      categoryId,
      price: Number(String(price).replace(/\D/g, '')),
      netWeightGrams: Number(String(weight).replace(/\D/g, '')),
      description: description.trim(),
      ingredients: ingredients.trim(),
      shelfLifeInfo: shelfLifeInfo.trim(),
      availability,
      isPublished: publication === 'Ditampilkan',
      isFeatured,
      imageKey: primaryImage.path,
      images: updatedImages,
    };

    // Simpan ke in-memory store demo
    updateSessionProduct(product.id, updatedData);

    // Kosongkan referensi blob agar tidak di-revoke saat unmount
    createdBlobUrlsRef.current.clear();

    if (onShowToast) {
      onShowToast(
        'Perubahan produk tersimpan untuk sesi demo ini. Data akan kembali ke kondisi awal setelah halaman dimuat ulang.'
      );
    }

    // Navigasi kembali ke Daftar Produk
    if (onNavigate) {
      onNavigate('/dashboard/produk');
    }
  };

  // Tampilan jika produk tidak ditemukan atau sudah dihapus
  if (!product || product.deletedAt) {
    return (
      <div className="create-product-container admin-animate-fade">
        <DashboardSimulationNotice />
        <div className="edit-product-not-found-card">
          <div className="edit-product-not-found-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="edit-product-not-found-title">Produk tidak tersedia untuk diedit</h2>
          <p className="edit-product-not-found-desc">
            Produk dengan ID ini tidak ditemukan atau sudah dipindahkan ke tempat sampah.
          </p>
          <button
            type="button"
            className="create-product-btn-back"
            onClick={() => onNavigate && onNavigate('/dashboard/produk')}
          >
            <span aria-hidden="true">&larr;</span>
            <span>Kembali ke Daftar Produk</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="create-product-container admin-animate-fade">
      {/* Banner Simulasi Portofolio */}
      <DashboardSimulationNotice />

      {/* Header Halaman Edit Produk */}
      <EditProductHeader
        productName={product.name}
        updatedAtText={formatProductUpdatedAt(product.updatedAt)}
        onBackClick={handleBackOrCancel}
      />

      {/* Formulir Edit Produk 5 Panel */}
      <form className="create-product-form" onSubmit={handleSubmit} noValidate>
        {/* Panel 1: Identitas Produk */}
        <ProductIdentitySection
          name={name}
          sku={sku}
          categoryId={categoryId}
          errors={errors}
          onNameChange={(val) => {
            setName(val);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          onSkuChange={(val) => {
            setSku(val);
            if (errors.sku) setErrors((prev) => ({ ...prev, sku: undefined }));
          }}
          onCategoryChange={(val) => {
            setCategoryId(val);
            if (errors.categoryId) setErrors((prev) => ({ ...prev, categoryId: undefined }));
          }}
        />

        {/* Panel 2: Harga dan Berat */}
        <ProductPricingSection
          price={price}
          weight={weight}
          errors={errors}
          onPriceChange={(val) => {
            setPrice(val);
            if (errors.price) setErrors((prev) => ({ ...prev, price: undefined }));
          }}
          onWeightChange={(val) => {
            setWeight(val);
            if (errors.weight) setErrors((prev) => ({ ...prev, weight: undefined }));
          }}
        />

        {/* Panel 3: Informasi Produk */}
        <ProductInformationSection
          description={description}
          ingredients={ingredients}
          shelfLife={shelfLifeInfo}
          errors={errors}
          onDescriptionChange={(val) => {
            setDescription(val);
            if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
          }}
          onIngredientsChange={setIngredients}
          onShelfLifeChange={setShelfLifeInfo}
        />

        {/* Panel 4: Foto Produk (Edit Foto Utama, Ganti, Swap Utama, & Hapus Tambahan) */}
        <EditProductImagesSection
          primaryImage={primaryImage}
          additionalImages={additionalImages}
          errors={errors}
          onPrimaryImageChange={handlePrimaryImageChange}
          onAddAdditionalImage={handleAddAdditionalImage}
          onRemoveAdditionalImage={handleRemoveAdditionalImage}
          onSwapWithPrimary={handleSwapWithPrimary}
        />

        {/* Panel 5: Pengaturan Tampilan */}
        <EditProductDisplaySettingsSection
          availability={availability}
          publication={publication}
          isFeatured={isFeatured}
          slotUsage={slotUsage}
          onAvailabilityChange={setAvailability}
          onPublicationChange={setPublication}
          onFeaturedChange={setIsFeatured}
        />

        {/* Bottom Actions Bar (Batal & Simpan Perubahan) */}
        <EditProductFormActions
          onCancel={handleBackOrCancel}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </form>

      {/* Dialog Konfirmasi Perubahan Belum Disimpan */}
      <UnsavedChangesDialog
        isOpen={showUnsavedDialog}
        onStay={() => setShowUnsavedDialog(false)}
        onLeave={handleConfirmDiscard}
      />
    </div>
  );
}
