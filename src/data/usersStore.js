/**
 * In-Memory Shared Store untuk Pengguna & Akun Staf Dashboard Rasa Pulang.
 * Menyimpan akun pemilik, staf awal, serta kredensial simulasi login selama sesi aplikasi.
 *
 * PERHATIAN:
 * Data ini murni simulasi interaksi portofolio frontend.
 * Tidak ada kredensial nyata atau penyimpanan ke localStorage/sessionStorage.
 */

// Data Pemilik Awal
const INITIAL_OWNER_ACCOUNT = {
  id: 'usr-owner-01',
  name: 'Dina Prameswari',
  shortName: 'Dina',
  initials: 'DP',
  email: 'pemilik@rasapulang.example',
  role: 'owner',
  roleLabel: 'Pemilik',
  isActive: true,
  status: 'aktif',
};

// Data Staf Awal (Satu Staf Sesuai Gambar Referensi)
const INITIAL_STAFF_USERS = [
  {
    id: 'usr-staff-01',
    name: 'Staf Toko',
    shortName: 'Staf',
    initials: 'ST',
    email: 'staf@rasapulang.example',
    role: 'staff',
    roleLabel: 'Staf',
    isActive: true,
    status: 'aktif',
  },
];

// Kredensial demo lokal dalam memori sesi (terisolasi dari objek presentasi)
const sessionCredentials = new Map([
  ['pemilik@rasapulang.example', 'DemoPemilik123!'],
  ['staf@rasapulang.example', 'DemoStaf123!'],
]);

let ownerAccount = JSON.parse(JSON.stringify(INITIAL_OWNER_ACCOUNT));
let staffUsers = JSON.parse(JSON.stringify(INITIAL_STAFF_USERS));
const listeners = new Set();

/**
 * Generate inisial 2 huruf dari nama lengkap
 * Contoh: "Staf Toko" -> "ST", "Dina Prameswari" -> "DP", "Budi" -> "BU"
 */
export function getInitialsFromName(name) {
  if (!name || typeof name !== 'string') return '??';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getOwnerAccount() {
  return JSON.parse(JSON.stringify(ownerAccount));
}

export function getStaffUsers() {
  return JSON.parse(JSON.stringify(staffUsers));
}

export function getAllAccounts() {
  return [getOwnerAccount(), ...getStaffUsers()];
}

/**
 * Perbarui nama profil pengguna (pemilik atau staf)
 */
export function updateUserProfile(userIdOrEmail, newName) {
  const cleanName = (newName || '').trim();
  if (!cleanName) return null;

  const initials = getInitialsFromName(cleanName);
  const shortName = cleanName.split(' ')[0];

  // Cek apakah pemilik
  if (
    userIdOrEmail === ownerAccount.id ||
    userIdOrEmail.toLowerCase() === ownerAccount.email.toLowerCase()
  ) {
    ownerAccount = {
      ...ownerAccount,
      name: cleanName,
      shortName,
      initials,
    };
    notifyListeners();
    return getOwnerAccount();
  }

  // Cek staf
  let updatedStaff = null;
  staffUsers = staffUsers.map((staf) => {
    if (
      staf.id === userIdOrEmail ||
      staf.email.toLowerCase() === userIdOrEmail.toLowerCase()
    ) {
      updatedStaff = {
        ...staf,
        name: cleanName,
        shortName,
        initials,
      };
      return updatedStaff;
    }
    return staf;
  });

  notifyListeners();
  return updatedStaff || getOwnerAccount();
}

/**
 * Periksa keabsahan password saat ini
 */
export function checkUserPassword(email, currentPassword) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const saved = sessionCredentials.get(cleanEmail);
  return Boolean(saved && saved === currentPassword);
}

/**
 * Perbarui password pengguna
 */
export function updateUserPassword(email, currentPassword, newPassword) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const saved = sessionCredentials.get(cleanEmail);

  if (!saved || saved !== currentPassword) {
    return { success: false, error: 'Password saat ini tidak sesuai.' };
  }

  if (currentPassword === newPassword) {
    return {
      success: false,
      error: 'Password baru harus berbeda dari password saat ini.',
    };
  }

  if (!newPassword || newPassword.length < 8) {
    return {
      success: false,
      error: 'Password baru minimal delapan karakter.',
    };
  }

  sessionCredentials.set(cleanEmail, newPassword);
  return { success: true };
}

/**
 * Tambah akun staf baru
 */
export function addStaffUser({ name, email, password }) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();

  const newStaff = {
    id: `usr-staff-${Date.now()}`,
    name: cleanName,
    shortName: cleanName.split(' ')[0],
    initials: getInitialsFromName(cleanName),
    email: cleanEmail,
    role: 'staff',
    roleLabel: 'Staf',
    isActive: true,
    status: 'aktif',
  };

  staffUsers = [newStaff, ...staffUsers];

  // Simpan kredensial demo dalam map memori sesi
  if (password) {
    sessionCredentials.set(cleanEmail, password);
  }

  notifyListeners();
  return JSON.parse(JSON.stringify(newStaff));
}

/**
 * Nonaktifkan akun staf (hanya staff, tidak bisa owner)
 */
export function deactivateStaffUser(staffId) {
  staffUsers = staffUsers.map((staf) => {
    if (staf.id === staffId && staf.role === 'staff') {
      return {
        ...staf,
        isActive: false,
        status: 'nonaktif',
      };
    }
    return staf;
  });

  notifyListeners();
  return getStaffUsers();
}

/**
 * Verifikasi kredensial untuk Login demo yang tersinkronisasi
 */
export function verifySessionLogin(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const rawPassword = password || '';

  // Cek apakah email terdaftar di pemilik atau staf
  const all = getAllAccounts();
  const matched = all.find((acc) => acc.email.toLowerCase() === cleanEmail);

  if (!matched) {
    return { success: false, error: 'Email atau password tidak sesuai.' };
  }

  // Cek password dari session credentials map
  const expectedPassword = sessionCredentials.get(cleanEmail);
  if (!expectedPassword || expectedPassword !== rawPassword) {
    return { success: false, error: 'Email atau password tidak sesuai.' };
  }

  // Cek status aktif
  if (!matched.isActive || matched.status !== 'aktif') {
    return { success: false, error: 'Akun tidak dapat digunakan. Hubungi pemilik.' };
  }

  return {
    success: true,
    user: {
      id: matched.id,
      name: matched.name,
      shortName: matched.shortName,
      initials: matched.initials,
      email: matched.email,
      role: matched.role,
      roleLabel: matched.roleLabel,
      status: matched.status,
    },
  };
}

export function subscribeUsers(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners() {
  const currentStaff = getStaffUsers();
  listeners.forEach((listener) => {
    try {
      listener(currentStaff);
    } catch {
      // Ignore listener error
    }
  });
}

export function resetUsers() {
  staffUsers = JSON.parse(JSON.stringify(INITIAL_STAFF_USERS));
  sessionCredentials.clear();
  sessionCredentials.set('pemilik@rasapulang.example', 'DemoPemilik123!');
  sessionCredentials.set('staf@rasapulang.example', 'DemoStaf123!');
  notifyListeners();
  return getStaffUsers();
}
