/**
 * Data akun simulasi terpusat dan konfigurasi autentikasi frontend Rasa Pulang.
 * Sesuai panduan Brief Klien dan ketentuan akun portofolio.
 *
 * PERHATIAN:
 * Data ini semata-mata untuk simulasi interaksi frontend portofolio.
 * Jangan menyimpan kredensial nyata atau menggunakan data ini untuk keamanan server.
 */

import { verifySessionLogin } from './usersStore';

export const demoAccounts = [
  {
    id: 'acc-owner-01',
    name: 'Dina Prameswari',
    email: 'pemilik@rasapulang.example',
    password: 'DemoPemilik123!',
    role: 'owner',
    roleLabel: 'Pemilik Usaha',
    status: 'aktif',
  },
  {
    id: 'acc-staff-01',
    name: 'Staf Rasa Pulang',
    email: 'staf@rasapulang.example',
    password: 'DemoStaf123!',
    role: 'staff',
    roleLabel: 'Staf Toko',
    status: 'aktif',
  },
  {
    id: 'acc-staff-02',
    name: 'Staf Nonaktif',
    email: 'nonaktif@rasapulang.example',
    password: 'DemoNonaktif123!',
    role: 'staff',
    roleLabel: 'Staf Toko (Nonaktif)',
    status: 'nonaktif',
  },
];

export const loginVisualConfig = {
  imagePath: '/images/rasa-pulang/auth/login-rasa-pulang.webp',
  alt: 'Suasana interior toko Rasa Pulang dengan display camilan dan paket hampers cantik',
  placeholderLabel: 'Foto interior toko',
  title: 'Kelola katalog, sambut lebih banyak cerita.',
  description: 'Ruang kerja pemilik dan staf untuk memperbarui produk Rasa Pulang.',
  objectPosition: 'center',
};

/**
 * Fungsi simulasi login frontend tanpa penyimpanan credential ke storage.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export async function simulateLogin(email, password) {
  // Simulasi latensi jaringan singkat (400-500ms) untuk feedback visual loading
  await new Promise((resolve) => setTimeout(resolve, 450));

  // Cek terlebih dahulu ke usersStore terpadu
  try {
    const sessionResult = verifySessionLogin(email, password);
    if (sessionResult.success) {
      return sessionResult;
    }
  } catch {
    // Lanjutkan ke fallback
  }

  const cleanEmail = (email || '').trim().toLowerCase();
  const rawPassword = password || '';

  if (!cleanEmail) {
    return { success: false, error: 'Email wajib diisi.' };
  }

  // Regex sederhana format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { success: false, error: 'Masukkan alamat email yang valid.' };
  }

  if (!rawPassword) {
    return { success: false, error: 'Password wajib diisi.' };
  }

  // Cari akun yang cocok
  const matched = demoAccounts.find((acc) => acc.email.toLowerCase() === cleanEmail);

  if (!matched || matched.password !== rawPassword) {
    return { success: false, error: 'Email atau password tidak sesuai.' };
  }

  // Periksa status akun aktif / nonaktif
  if (matched.status !== 'aktif') {
    return { success: false, error: 'Akun tidak dapat digunakan. Hubungi pemilik.' };
  }

  // Kembalikan objek user tanpa menyertakan password
  const safeUser = {
    id: matched.id,
    name: matched.name,
    email: matched.email,
    role: matched.role,
    roleLabel: matched.roleLabel,
    status: matched.status,
  };
  return { success: true, user: safeUser };
}
