import { contactSimulationNoticeData } from '../../data/contactData';

export default function ContactSimulationNotice() {
  return (
    <div className="contact-simulation-banner" role="note" aria-label="Catatan status simulasi portofolio">
      <div className="simulation-banner-inner">
        <svg
          className="simulation-info-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <p className="simulation-banner-text">
          {contactSimulationNoticeData.text}
        </p>
      </div>
    </div>
  );
}
