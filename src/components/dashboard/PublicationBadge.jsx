export default function PublicationBadge({ status }) {
  const isPublished = status === 'Ditampilkan';

  return (
    <span className={`admin-badge ${isPublished ? 'badge-success' : 'badge-neutral'}`}>
      {status}
    </span>
  );
}
