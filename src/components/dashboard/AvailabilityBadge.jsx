export default function AvailabilityBadge({ status }) {
  const isAvailable = status === 'Tersedia';

  return (
    <span className={`admin-badge ${isAvailable ? 'badge-success' : 'badge-neutral'}`}>
      {status}
    </span>
  );
}
