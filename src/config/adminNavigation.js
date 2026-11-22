/**
 * Konfigurasi Struktur Menu Sidebar Admin Dashboard Rasa Pulang.
 * Berisi pengelompokan menu dan hak akses peran (owner vs staff).
 */

export const adminNavigationGroups = [
  {
    id: 'katalog',
    label: 'KATALOG',
    items: [
      {
        id: 'ringkasan',
        label: 'Ringkasan',
        icon: 'grid',
        roles: ['owner', 'staff'],
      },
      {
        id: 'kategori',
        label: 'Kategori',
        icon: 'folder',
        roles: ['owner', 'staff'],
      },
      {
        id: 'produk',
        label: 'Produk',
        icon: 'box',
        roles: ['owner', 'staff'],
      },
      {
        id: 'sampah',
        label: 'Sampah Produk',
        icon: 'trash',
        roles: ['owner'], // Hanya Pemilik
      },
    ],
  },
  {
    id: 'pengelolaan',
    label: 'PENGELOLAAN',
    items: [
      {
        id: 'konten',
        label: 'Konten Website',
        icon: 'file-text',
        roles: ['owner'], // Hanya Pemilik
      },
      {
        id: 'pengaturan',
        label: 'Pengaturan Toko',
        icon: 'settings',
        roles: ['owner'], // Hanya Pemilik
      },
      {
        id: 'pengguna',
        label: 'Pengguna',
        icon: 'users',
        roles: ['owner'], // Hanya Pemilik
      },
    ],
  },
  {
    id: 'akun',
    label: 'AKUN',
    items: [
      {
        id: 'profil',
        label: 'Profil Saya',
        icon: 'user',
        roles: ['owner', 'staff'],
      },
    ],
  },
];
