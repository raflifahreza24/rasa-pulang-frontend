import { siteConfig } from '../../data/homeData';

export default function SimulationNotice() {
  return (
    <div
      role="region"
      aria-label="Pemberitahuan simulasi"
      className="simulation-notice-bar"
      style={{
        backgroundColor: '#F0E6D7',
        borderBottom: '1px solid #E4D5C2',
        color: '#7A6658',
        fontSize: '12px',
        fontWeight: '500',
        padding: '8px 16px',
        textAlign: 'center',
        lineHeight: 1.4,
      }}
    >
      {siteConfig.simulationNotice}
    </div>
  );
}
