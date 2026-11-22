import AnimatedNumber from '../ui/AnimatedNumber';

export default function StaffUsersTable({
  staffList,
  onDeactivateClick,
  totalStaffCount,
}) {
  return (
    <div className="staff-table-wrapper">
      <table className="staff-users-table">
        <thead>
          <tr>
            <th scope="col" className="staff-th-name">Nama</th>
            <th scope="col" className="staff-th-email">Email</th>
            <th scope="col" className="staff-th-role">Peran</th>
            <th scope="col" className="staff-th-status">Status</th>
            <th scope="col" className="staff-th-action">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staf) => (
            <tr key={staf.id} className="staff-tr-row">
              {/* Kolom Nama dengan Avatar Inisial */}
              <td className="staff-td-name">
                <div className="staff-user-cell">
                  <div className="staff-avatar-circle" aria-hidden="true">
                    {staf.initials || 'ST'}
                  </div>
                  <span className="staff-name-text">{staf.name}</span>
                </div>
              </td>

              {/* Kolom Email */}
              <td className="staff-td-email">
                <span className="staff-email-text">{staf.email}</span>
              </td>

              {/* Kolom Peran */}
              <td className="staff-td-role">
                <span className="staff-role-badge">
                  {staf.roleLabel || 'Staf'}
                </span>
              </td>

              {/* Kolom Status */}
              <td className="staff-td-status">
                {staf.isActive ? (
                  <span className="staff-status-badge staff-status-active">
                    Aktif
                  </span>
                ) : (
                  <span className="staff-status-badge staff-status-inactive">
                    Nonaktif
                  </span>
                )}
              </td>

              {/* Kolom Aksi */}
              <td className="staff-td-action">
                {staf.isActive ? (
                  <button
                    type="button"
                    onClick={() => onDeactivateClick(staf)}
                    className="staff-btn-deactivate"
                    aria-label={`Nonaktifkan akun staf ${staf.name}`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <line x1="18" y1="8" x2="23" y2="13" />
                      <line x1="23" y1="8" x2="18" y2="13" />
                    </svg>
                    Nonaktifkan
                  </button>
                ) : (
                  <span className="staff-action-disabled-text">
                    Sudah nonaktif
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer Tabel */}
      <div className="staff-table-footer">
        <span className="staff-table-footer-text">
          Menampilkan <AnimatedNumber value={staffList.length} duration={400} /> dari{' '}
          <AnimatedNumber value={totalStaffCount} duration={400} /> akun staf
        </span>
      </div>
    </div>
  );
}
