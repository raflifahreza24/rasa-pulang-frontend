import { useState, useMemo, useEffect, useRef } from 'react';
import DashboardSimulationNotice from '../dashboard/DashboardSimulationNotice';
import CreateProductHeader from './CreateProductHeader';
import ProductIdentitySection from './ProductIdentitySection';
import ProductPricingSection from './ProductPricingSection';
import ProductInformationSection from './ProductInformationSection';
import ProductImagesSection from './ProductImagesSection';
import ProductDisplaySettingsSection from './ProductDisplaySettingsSection';
import ProductFormActions from './ProductFormActions';
import UnsavedChangesDialog from './UnsavedChangesDialog';
import {
  addSessionProduct,
  getFeaturedSlotUsage,
  isSkuDuplicate,
} from '../../data/productsStore';

export default function CreateProductView({ onNavigate, onShowToast }) {
  // Form State
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [shelfLife, setShelfLife] = useState('');
  const [primaryImage, setPrimaryImage] = useState(null); // { file, previewUrl }
  const [additionalImages, setAdditionalImages] = useState([]); // [{ file, previewUrl }]
  const [availability, setAvailability] = useState('Tersedia');
  const [isPublished, setIsPublished] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const [errors, setErrors] = useState({});
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  // Lacak seluruh blob URL yang dibuat untuk pembersihan saat form dibatalkan
  const createdBlobUrlsRef = useRef([]);

  // Hitung penggunaan slot unggulan global saat ini
  const featuredSlotUsage = useMemo(() => {
    return getFeaturedSlotUsage();
  }, []);

  // Memeriksa apakah ada perubahan pada form (isDirty)
  const isDirty = useMemo(() => {
    return Boolean(
      name.trim() ||
      sku.trim() ||
      categoryId ||
      price ||
      weight ||
      description.trim() ||
      ingredients.trim() ||
      shelfLife.trim() ||
      primaryImage ||
      additionalImages.length > 0 ||
      isFeatured ||
      isPublished ||
      availability !== 'Tersedia'
    );
  }, [
    name,
    sku,
    categoryId,
    price,
    weight,
    description,
    ingredients,
    shelfLife,
    primaryImage,
    additionalImages.length,
    isFeatured,
    isPublished,
    availability,
  ]);

  // Listener beforeunload browser jika ada perubahan belum disimpan
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty && !isSubmittedSuccess) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, isSubmittedSuccess]);

  // Handler pemilihan foto utama
  const handleSelectPrimaryImage = ({ file, previewUrl }) => {
    createdBlobUrlsRef.current.push(previewUrl);
    setPrimaryImage({ file, previewUrl });
    if (errors.primaryImage) {
      setErrors((prev) => ({ ...prev, primaryImage: null }));
    }
  };

  const handleRemovePrimaryImage = () => {
    setPrimaryImage(null);
  };

  // Handler penambahan foto tambahan
  const handleAddAdditionalImages = (newImages) => {
    newImages.forEach((img) => createdBlobUrlsRef.current.push(img.previewUrl));
    setAdditionalImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveAdditionalImage = (indexToRemove) => {
    setAdditionalImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Navigasi Kembali / Batal
  const handleCancelOrBack = () => {
    if (isDirty) {
      setShowUnsavedDialog(true);
    } else {
      if (onNavigate) onNavigate('/dashboard/produk');
    }
  };

  // Konfirmasi meninggalkan form yang telah diubah
  const handleConfirmLeave = () => {
    // Bersihkan blob URL yang belum tersimpan
    createdBlobUrlsRef.current.forEach((url) => {
      try {
        URL.revokeObjectURL(url);
      } catch {
        // Abaikan error revoke
      }
    });

    setShowUnsavedDialog(false);
    if (onNavigate) onNavigate('/dashboard/produk');
  };

  // Validasi & Simpan Produk
  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const newErrors = {};

    // 1. Validasi Nama Produk
    const trimmedName = name.trim();
    if (!trimmedName) {
      newErrors.name = 'Nama produk wajib diisi.';
    }

    // 2. Validasi SKU
    const trimmedSku = sku.trim().toUpperCase();
    if (!trimmedSku) {
      newErrors.sku = 'SKU wajib diisi.';
    } else if (isSkuDuplicate(trimmedSku)) {
      newErrors.sku = 'SKU sudah digunakan.';
    }

    // 3. Validasi Kategori
    if (!categoryId) {
      newErrors.categoryId = 'Pilih kategori produk.';
    }

    // 4. Validasi Harga
    const parsedPrice = parseInt(price, 10);
    if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
      newErrors.price = 'Harga harus lebih besar dari 0.';
    }

    // 5. Validasi Berat
    const parsedWeight = parseInt(weight, 10);
    if (!weight || isNaN(parsedWeight) || parsedWeight <= 0) {
      newErrors.weight = 'Berat bersih harus lebih besar dari 0.';
    }

    // 6. Validasi Deskripsi
    const trimmedDesc = description.trim();
    if (!trimmedDesc) {
      newErrors.description = 'Deskripsi produk wajib diisi.';
    }

    // 7. Validasi Foto Utama
    if (!primaryImage?.previewUrl) {
      newErrors.primaryImage = 'Foto utama wajib dipilih.';
    }

    // 8. Validasi Kapasitas Slot Unggulan
    if (isFeatured && featuredSlotUsage.isFull) {
      newErrors.isFeatured = 'Slot produk unggulan sudah penuh (maksimal 8 produk).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // Fokuskan elemen invalid pertama secara aksesibel
      if (newErrors.name) {
        document.getElementById('input-product-name')?.focus();
      } else if (newErrors.sku) {
        document.getElementById('input-product-sku')?.focus();
      } else if (newErrors.categoryId) {
        document.getElementById('select-product-category')?.focus();
      } else if (newErrors.price) {
        document.getElementById('input-product-price')?.focus();
      } else if (newErrors.weight) {
        document.getElementById('input-product-weight')?.focus();
      } else if (newErrors.description) {
        document.getElementById('textarea-product-desc')?.focus();
      }

      return;
    }

    // Simpan objek produk baru
    const generatedSlug = trimmedName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || `produk-${Date.now()}`;

    const newProductId = Date.now();

    const newProduct = {
      id: newProductId,
      sku: trimmedSku,
      slug: generatedSlug,
      name: trimmedName,
      categoryId,
      price: parsedPrice,
      netWeightGrams: parsedWeight,
      shortIntro: trimmedDesc.slice(0, 110) + (trimmedDesc.length > 110 ? '...' : ''),
      description: trimmedDesc,
      ingredients: ingredients.trim() || null,
      shelfLifeInfo: shelfLife.trim() || null,
      availability,
      isPublished,
      isFeatured,
      deletedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageKey: generatedSlug,
      alt: trimmedName,
      images: [
        {
          id: `img-${newProductId}-0`,
          path: primaryImage.previewUrl,
          alt: trimmedName,
          position: 0,
          label: 'Foto produk',
        },
        ...additionalImages.map((img, i) => ({
          id: `img-${newProductId}-${i + 1}`,
          path: img.previewUrl,
          alt: `${trimmedName} - Foto Tambahan ${i + 1}`,
          position: i + 1,
          label: `Foto ${i + 1}`,
        })),
      ],
    };

    // Tandai submit sukses agar beforeunload tidak memicu alert
    setIsSubmittedSuccess(true);

    // Tambahkan ke shared store sesi
    addSessionProduct(newProduct);

    if (onShowToast) {
      onShowToast(
        'Produk berhasil ditambahkan untuk sesi demo ini. Data akan kembali ke kondisi awal setelah halaman dimuat ulang.'
      );
    }

    // Arahkan kembali ke daftar produk
    if (onNavigate) {
      onNavigate('/dashboard/produk');
    }
  };

  return (
    <div className="create-product-container admin-animate-fade">
      {/* Banner Simulasi Portofolio */}
      <DashboardSimulationNotice />

      {/* Header Heading & Tombol Kembali */}
      <CreateProductHeader onBackClick={handleCancelOrBack} />

      {/* Form Formulir Tambah Produk */}
      <form onSubmit={handleSubmit} noValidate className="create-product-form">
        {/* Panel 1: Identitas Produk */}
        <ProductIdentitySection
          name={name}
          sku={sku}
          categoryId={categoryId}
          errors={errors}
          onNameChange={(val) => {
            setName(val);
            if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
          }}
          onSkuChange={(val) => {
            setSku(val);
            if (errors.sku) setErrors((prev) => ({ ...prev, sku: null }));
          }}
          onCategoryChange={(val) => {
            setCategoryId(val);
            if (errors.categoryId) setErrors((prev) => ({ ...prev, categoryId: null }));
          }}
        />

        {/* Panel 2: Harga dan Berat */}
        <ProductPricingSection
          price={price}
          weight={weight}
          errors={errors}
          onPriceChange={(val) => {
            setPrice(val);
            if (errors.price) setErrors((prev) => ({ ...prev, price: null }));
          }}
          onWeightChange={(val) => {
            setWeight(val);
            if (errors.weight) setErrors((prev) => ({ ...prev, weight: null }));
          }}
        />

        {/* Panel 3: Informasi Produk */}
        <ProductInformationSection
          description={description}
          ingredients={ingredients}
          shelfLife={shelfLife}
          errors={errors}
          onDescriptionChange={(val) => {
            setDescription(val);
            if (errors.description) setErrors((prev) => ({ ...prev, description: null }));
          }}
          onIngredientsChange={setIngredients}
          onShelfLifeChange={setShelfLife}
        />

        {/* Panel 4: Foto Produk */}
        <ProductImagesSection
          primaryImage={primaryImage}
          additionalImages={additionalImages}
          errors={errors}
          onSelectPrimaryImage={handleSelectPrimaryImage}
          onRemovePrimaryImage={handleRemovePrimaryImage}
          onAddAdditionalImages={handleAddAdditionalImages}
          onRemoveAdditionalImage={handleRemoveAdditionalImage}
        />

        {/* Panel 5: Pengaturan Tampilan */}
        <ProductDisplaySettingsSection
          availability={availability}
          isPublished={isPublished}
          isFeatured={isFeatured}
          featuredSlotUsage={featuredSlotUsage}
          onAvailabilityChange={setAvailability}
          onPublishedChange={setIsPublished}
          onFeaturedChange={setIsFeatured}
        />

        {/* Bar Tombol Aksi Bawah */}
        <ProductFormActions
          onCancel={handleCancelOrBack}
          onSubmit={handleSubmit}
        />
      </form>

      {/* Dialog Konfirmasi Perubahan Belum Disimpan */}
      <UnsavedChangesDialog
        isOpen={showUnsavedDialog}
        onStay={() => setShowUnsavedDialog(false)}
        onLeave={handleConfirmLeave}
      />
    </div>
  );
}
