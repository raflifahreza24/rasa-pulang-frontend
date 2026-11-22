import { useState, useEffect, useMemo } from 'react';
import {
  getOwnerAccount,
  getStaffUsers,
  addStaffUser,
  deactivateStaffUser,
  subscribeUsers,
} from '../../data/usersStore';
import DashboardSimulationNotice from '../dashboard/DashboardSimulationNotice';
import UsersHeader from './UsersHeader';
import OwnerAccountSummary from './OwnerAccountSummary';
import StaffUsersToolbar from './StaffUsersToolbar';
import StaffUsersTable from './StaffUsersTable';
import StaffAccessInformation from './StaffAccessInformation';
import StaffUsersEmptyState from './StaffUsersEmptyState';
import CreateStaffDialog from './CreateStaffDialog';
import DeactivateStaffDialog from './DeactivateStaffDialog';
import UsersRestrictedView from './UsersRestrictedView';

export default function UsersView({
  currentUser,
  onShowToast,
  onNavigate,
}) {
  const isOwner = currentUser?.role === 'owner';

  const [owner] = useState(() => getOwnerAccount());
  const [staffList, setStaffList] = useState(() => getStaffUsers());

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');

  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [staffToDeactivate, setStaffToDeactivate] = useState(null);

  // Subscribe ke perubahan store
  useEffect(() => {
    const unsubscribe = subscribeUsers((latestStaff) => {
      setStaffList(latestStaff);
    });
    return unsubscribe;
  }, []);

  // Filter daftar staf
  const filteredStaff = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return staffList.filter((staf) => {
      // Filter status
      if (statusFilter === 'aktif' && !staf.isActive) return false;
      if (statusFilter === 'nonaktif' && staf.isActive) return false;

      // Filter pencarian nama/email
      if (q) {
        const matchName = (staf.name || '').toLowerCase().includes(q);
        const matchEmail = (staf.email || '').toLowerCase().includes(q);
        if (!matchName && !matchEmail) return false;
      }

      return true;
    });
  }, [staffList, searchQuery, statusFilter]);

  // Kumpulan seluruh email yang sudah ada (untuk validasi duplikat email)
  const existingEmails = useMemo(() => {
    return [owner.email, ...staffList.map((s) => s.email)];
  }, [owner.email, staffList]);

  // Handler Tambah Staf
  const handleCreateStaffSubmit = ({ name, email, password }) => {
    addStaffUser({ name, email, password });
    setIsCreateModalOpen(false);

    // Cek apakah filter status saat ini menyembunyikan staf baru yang aktif
    if (statusFilter === 'nonaktif') {
      onShowToast(
        'Akun staf baru ditambahkan, namun tersembunyi oleh filter Nonaktif.'
      );
    } else {
      onShowToast(
        'Akun staf ditambahkan untuk sesi demo ini. Data akan kembali ke kondisi awal setelah halaman dimuat ulang.'
      );
    }
  };

  // Handler Konfirmasi Nonaktifkan Staf
  const handleConfirmDeactivate = (staf) => {
    deactivateStaffUser(staf.id);
    setStaffToDeactivate(null);
    onShowToast('Akun staf dinonaktifkan untuk sesi demo ini.');
  };

  // Handler Kelola Profil Saya
  const handleManageProfile = () => {
    onShowToast('Modul Profil Saya belum tersedia pada demo ini.');
  };

  // Handler Reset Filter
  const handleResetFilter = () => {
    setSearchQuery('');
    setStatusFilter('semua');
  };

  // Jika bukan pemilik, tampilkan layar akses tidak tersedia
  if (!isOwner) {
    return (
      <UsersRestrictedView
        onBackToDashboard={() => onNavigate && onNavigate('/dashboard')}
      />
    );
  }

  const isFiltered = Boolean(searchQuery.trim() || statusFilter !== 'semua');

  return (
    <div className="users-page-view">
      {/* Banner Simulasi Portofolio */}
      <div className="anim-enter anim-stagger-1">
        <DashboardSimulationNotice customText="Simulasi portofolio — nama, email, dan akun pada halaman ini merupakan contoh." />
      </div>

      {/* Header Halaman Pengguna & Tombol Tambah Staf */}
      <div className="anim-enter anim-stagger-2">
        <UsersHeader onAddStaff={() => setIsCreateModalOpen(true)} />
      </div>

      {/* Panel Identitas Pemilik */}
      <div className="anim-enter anim-stagger-3">
        <OwnerAccountSummary
          owner={owner}
          onManageProfile={handleManageProfile}
        />
      </div>

      {/* Panel Daftar Akun Staf */}
      <section className="staff-users-card anim-enter anim-stagger-4" aria-labelledby="staff-list-heading">
        <div className="staff-users-card-header">
          <h2 id="staff-list-heading" className="staff-users-card-title">
            Daftar Akun Staf
          </h2>
          <p className="staff-users-card-desc">
            Setiap staf menggunakan akun masing-masing.
          </p>
        </div>

        {/* Toolbar Pencarian & Filter */}
        <StaffUsersToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          resultCount={filteredStaff.length}
        />

        {/* Tabel Staf atau Tampilan Kosong */}
        {filteredStaff.length > 0 ? (
          <StaffUsersTable
            staffList={filteredStaff}
            onDeactivateClick={(staf) => setStaffToDeactivate(staf)}
            totalStaffCount={staffList.length}
          />
        ) : (
          <StaffUsersEmptyState
            isFiltered={isFiltered}
            onResetFilter={handleResetFilter}
            onAddStaff={() => setIsCreateModalOpen(true)}
          />
        )}
      </section>

      {/* Panel Aturan Akses Akun Staf */}
      <div className="anim-enter anim-stagger-5">
        <StaffAccessInformation />
      </div>

      {/* Modal Tambah Akun Staf */}
      <CreateStaffDialog
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateStaffSubmit}
        existingEmails={existingEmails}
      />

      {/* Modal Konfirmasi Penonaktifan */}
      <DeactivateStaffDialog
        isOpen={Boolean(staffToDeactivate)}
        staff={staffToDeactivate}
        onClose={() => setStaffToDeactivate(null)}
        onConfirmDeactivate={handleConfirmDeactivate}
      />
    </div>
  );
}
