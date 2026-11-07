export default function Cap() {
  return (
    <svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true" style={{ display: 'block', margin: '0 auto 8px' }}>
      <polygon points="60,10 112,32 60,54 8,32" fill="var(--brand)" />
      <path d="M30 44v18c0 8 60 8 60 0V44l-30 14z" fill="var(--brand)" opacity=".75" />
      <line x1="108" y1="34" x2="108" y2="62" stroke="var(--gold)" strokeWidth="3" />
      <circle cx="108" cy="68" r="7" fill="var(--gold)" />
    </svg>
  )
}
