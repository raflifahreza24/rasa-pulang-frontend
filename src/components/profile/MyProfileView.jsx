import { useState, useCallback } from 'react';
import {
  updateUserProfile,
  updateUserPassword,
} from '../../data/usersStore';
import DashboardSimulationNotice from '../dashboard/DashboardSimulationNotice';
import ProfileHeader from './ProfileHeader';
import AccountIdentitySummary from './AccountIdentitySummary';
import ProfileInformationForm from './ProfileInformationForm';
import ChangePasswordForm from './ChangePasswordForm';

export default function MyProfileView({
  currentUser,
  onUpdateUser,
  onShowToast,
}) {
  const [profileUser, setProfileUser] = useState(currentUser);
  const [, setIsNameDirty] = useState(false);
  const [, setIsPasswordDirty] = useState(false);

  // Simpan Perubahan Nama Profil
  const handleSaveProfile = useCallback((newName) => {
    const updated = updateUserProfile(profileUser.id || profileUser.email, newName);
    if (updated) {
      setProfileUser(updated);
      if (onUpdateUser) {
        onUpdateUser(updated);
      }
      setIsNameDirty(false);
      onShowToast(
        'Profil diperbarui untuk sesi demo ini. Perubahan akan kembali ke data awal setelah halaman dimuat ulang.'
      );
    }
  }, [profileUser.id, profileUser.email, onUpdateUser, onShowToast]);

  // Simpan Perubahan Password
  const handleSavePassword = useCallback((currentPw, newPw) => {
    const res = updateUserPassword(profileUser.email, currentPw, newPw);
    if (res.success) {
      setIsPasswordDirty(false);
      onShowToast(
        'Password diperbarui untuk sesi demo ini. Perubahan akan kembali ke data awal setelah halaman dimuat ulang.'
      );
    }
    return res;
  }, [profileUser.email, onShowToast]);

  return (
    <div className="profile-view-wrapper">
      {/* Banner Simulasi Portofolio */}
      <div className="anim-enter anim-stagger-1">
        <DashboardSimulationNotice customText="Simulasi portofolio — identitas dan akun pada halaman ini merupakan contoh." />
      </div>

      {/* Header Halaman Profil Saya */}
      <div className="anim-enter anim-stagger-2">
        <ProfileHeader />
      </div>

      {/* Panel Ringkasan Identitas Akun */}
      <div className="anim-enter anim-stagger-3">
        <AccountIdentitySummary user={profileUser} />
      </div>

      {/* Form 1: Informasi Profil */}
      <div className="anim-enter anim-stagger-4">
        <ProfileInformationForm
          key={profileUser?.id || profileUser?.email}
          user={profileUser}
          onSaveProfile={handleSaveProfile}
          onDirtyChange={setIsNameDirty}
        />
      </div>

      {/* Form 2: Ubah Password */}
      <div className="anim-enter anim-stagger-5">
        <ChangePasswordForm
          user={profileUser}
          onSavePassword={handleSavePassword}
          onDirtyChange={setIsPasswordDirty}
        />
      </div>

      {/* Teks Informasi di Bawah Form */}
      <div className="anim-enter anim-stagger-6">
        <p className="profile-bottom-info-note">
          Pemilik dan staf dapat memperbarui nama serta password akun masing-masing.
        </p>
      </div>
    </div>
  );
}
