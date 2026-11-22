import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import ImageWithFallback from '../ui/ImageWithFallback';

export default function CategoryFormModal({
  isOpen,
  onClose,
  onSave,
  category = null, // null jika Tambah Baru, objek jika Edit
  existingCategories = [],
  onRequestDeactivateConfirm,
}) {
  const isEditMode = Boolean(category);

  const [name, setName] = useState(category?.name || '');
  const [description, setDescription] = useState(category?.description || '');
  const [sortOrder, setSortOrder] = useState(() => {
    if (category?.sortOrder) return category.sortOrder;
    const maxOrder = existingCategories.reduce(
      (max, c) => Math.max(max, Number(c.sortOrder) || 0),
      0
    );
    return maxOrder + 1;
  });
  const [isActive, setIsActive] = useState(category?.isActive !== false);
  const [imagePreview, setImagePreview] = useState(category?.image || '');
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [imageError, setImageError] = useState('');

  const fileInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const blobUrlRef = useRef(null);

  // Auto focus input saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 50);
    }

    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [isOpen]);

  // Dengarkan tombol Escape dan lock scroll body saat modal terbuka
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Tangani pemilihan file gambar lokal
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setImageError('');

    if (!file) return;

    // Validasi tipe format
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setImageError('Format tidak didukung. Harap pilih gambar JPG, PNG, atau WebP.');
      return;
    }

    // Validasi ukuran maks 2 MB
    const maxSize = 2 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setImageError('Ukuran gambar melebihi 2 MB. Harap pilih gambar dengan ukuran lebih kecil.');
      return;
    }

    // Bersihkan blob lama jika ada
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    blobUrlRef.current = objectUrl;
    setSelectedFile(file);
    setImagePreview(objectUrl);
  };

  const handleRemoveImage = () => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
    setSelectedFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Tangani perubahan status aktif
  const handleToggleActive = (e) => {
    const nextStatus = e.target.checked;
    // Jika sedang dalam mode edit dan mengubah dari Aktif ke Nonaktif
    if (isEditMode && category?.isActive && !nextStatus && onRequestDeactivateConfirm) {
      onRequestDeactivateConfirm({
        category,
        onConfirm: () => {
          setIsActive(false);
        },
      });
      return;
    }
    setIsActive(nextStatus);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedName = name.trim();
    if (!trimmedName) {
      setErrorMessage('Nama kategori wajib diisi.');
      return;
    }

    // Validasi keunikan nama
    const currentId = category?.id;
    const isDuplicate = existingCategories.some(
      (c) => c.id !== currentId && c.name.trim().toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      setErrorMessage(`Kategori "${trimmedName}" sudah ada. Gunakan nama yang berbeda.`);
      return;
    }

    // Validasi urutan tampil
    const parsedOrder = parseInt(sortOrder, 10);
    if (isNaN(parsedOrder) || parsedOrder < 1) {
      setErrorMessage('Urutan tampil harus berupa angka bulat positif (minimal 1).');
      return;
    }

    onSave({
      name: trimmedName,
      description: description.trim(),
      sortOrder: parsedOrder,
      isActive,
      image: imagePreview || category?.image || '/images/rasa-pulang/categories/camilan-gurih.webp',
      file: selectedFile,
    });
  };

  const modalContent = (
    <div
      className="category-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-modal-title"
    >
      <div className="category-modal-card admin-animate-fade">
        {/* Header Modal */}
        <div className="category-modal-header">
          <div>
            <h3 id="category-modal-title" className="category-modal-title">
              {isEditMode ? 'Edit Kategori' : 'Tambah Kategori'}
            </h3>
            <p className="category-modal-subtitle">
              {isEditMode
                ? 'Perbarui informasi dan status pengelompokan produk.'
                : 'Tambahkan pengelompokan produk baru ke katalog toko.'}
            </p>
          </div>
          <button
            type="button"
            className="category-modal-close-btn"
            onClick={onClose}
            aria-label="Tutup formulir modal"
          >
            ✕
          </button>
        </div>

        {/* Pesan Kesalahan Validasi Global */}
        {errorMessage && (
          <div className="category-form-error-alert" role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="category-modal-form">
          {/* 1. Nama Kategori */}
          <div className="category-form-group">
            <label htmlFor="category-name-input" className="category-form-label">
              Nama Kategori <span className="category-form-required">*</span>
            </label>
            <input
              id="category-name-input"
              ref={nameInputRef}
              type="text"
              className="category-form-input"
              placeholder="Contoh: Keripik & Kerupuk"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              required
            />
          </div>

          {/* 2. Deskripsi */}
          <div className="category-form-group">
            <label htmlFor="category-desc-input" className="category-form-label">
              Deskripsi Singkat <span className="category-form-optional">(Opsional)</span>
            </label>
            <textarea
              id="category-desc-input"
              rows={2}
              className="category-form-textarea"
              placeholder="Deskripsi singkat kategori produk..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* 3. Upload / Pratinjau Gambar */}
          <div className="category-form-group">
            <label className="category-form-label">
              Gambar Kategori <span className="category-form-optional">(JPG, PNG, WebP · Maks. 2 MB)</span>
            </label>

            <div className="category-image-upload-box">
              {imagePreview ? (
                <div className="category-image-preview-row">
                  <div className="category-image-preview-thumb">
                    <ImageWithFallback
                      src={imagePreview}
                      alt="Pratinjau gambar kategori"
                      className="category-preview-img"
                      fallbackCategory="category"
                    />
                  </div>
                  <div className="category-image-preview-actions">
                    <button
                      type="button"
                      className="category-btn-change-image"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Ganti Gambar
                    </button>
                    <button
                      type="button"
                      className="category-btn-remove-image"
                      onClick={handleRemoveImage}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="category-image-dropzone"
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#DC722C"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span className="category-dropzone-text">
                    Klik untuk memilih gambar kategori dari komputer
                  </span>
                  <span className="category-dropzone-hint">
                    Format: JPG, PNG, atau WebP (Maksimal 2 MB)
                  </span>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                className="category-hidden-file-input"
                onChange={handleFileChange}
                aria-label="Pilih berkas foto kategori"
              />
            </div>

            {imageError && (
              <p className="category-field-error" role="alert">
                {imageError}
              </p>
            )}
          </div>

          {/* 4. Urutan Tampil & Status Aktif */}
          <div className="category-form-row-dual">
            <div className="category-form-group flex-1">
              <label htmlFor="category-order-input" className="category-form-label">
                Urutan Tampil <span className="category-form-required">*</span>
              </label>
              <input
                id="category-order-input"
                type="number"
                min="1"
                step="1"
                className="category-form-input"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                required
              />
              <span className="category-form-help">Angka lebih kecil tampil lebih awal.</span>
            </div>

            <div className="category-form-group flex-1">
              <label className="category-form-label">Status Kategori</label>
              <label className="category-toggle-label">
                <input
                  type="checkbox"
                  className="category-toggle-checkbox"
                  checked={isActive}
                  onChange={handleToggleActive}
                />
                <span className="category-toggle-slider" />
                <span className="category-toggle-text">
                  {isActive ? 'Kategori Aktif' : 'Nonaktif'}
                </span>
              </label>
              <span className="category-form-help">
                {isActive
                  ? 'Ditampilkan di website publik.'
                  : 'Disembunyikan dari publik.'}
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="category-modal-actions">
            <button
              type="button"
              className="category-btn-secondary"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="category-btn-primary"
            >
              {isEditMode ? 'Simpan Perubahan' : 'Tambah Kategori'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}
