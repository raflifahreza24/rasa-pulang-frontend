/**
 * Konfigurasi Pengguna Demo Dashboard Rasa Pulang.
 * Digunakan untuk mensimulasikan tampilan peran Pemilik (Dina Prameswari) dan Staf (Staf Rasa Pulang).
 */

export const defaultOwnerUser = {
  id: 'usr-owner-01',
  name: 'Dina Prameswari',
  shortName: 'Dina',
  initials: 'DP',
  role: 'owner',
  label: 'Pemilik',
  email: 'pemilik@rasapulang.example',
};

export const defaultStaffUser = {
  id: 'usr-staff-01',
  name: 'Staf Rasa Pulang',
  shortName: 'Staf',
  initials: 'SR',
  role: 'staff',
  label: 'Staf',
  email: 'staf@rasapulang.example',
};

export const demoUsersList = [defaultOwnerUser, defaultStaffUser];
