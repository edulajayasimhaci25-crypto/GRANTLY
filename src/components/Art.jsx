const W = ({ children }) => <svg viewBox="0 0 96 96" width="72" height="72" aria-hidden="true">{children}</svg>
const B = 'var(--brand)', G = 'var(--gold)'

export const Match = () => (
  <W><circle cx="46" cy="48" r="34" fill="none" stroke={B} strokeWidth="4" opacity=".25" /><circle cx="46" cy="48" r="22" fill="none" stroke={B} strokeWidth="4" opacity=".5" /><circle cx="46" cy="48" r="9" fill={B} /><path d="M46 48L78 16" stroke={G} strokeWidth="5" strokeLinecap="round" /><path d="M66 14h14v14" stroke={G} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></W>
)
export const Docs = () => (
  <W><rect x="20" y="12" width="46" height="62" rx="6" fill={B} opacity=".18" /><rect x="28" y="20" width="46" height="62" rx="6" fill="var(--card)" stroke={B} strokeWidth="3" /><path d="M38 38h26M38 48h26M38 58h16" stroke={B} strokeWidth="3" strokeLinecap="round" /><circle cx="70" cy="72" r="13" fill={G} /><path d="M64 72l5 5 9-10" stroke="#14162b" strokeWidth="3.5" fill="none" strokeLinecap="round" /></W>
)
export const Cal = () => (
  <W><rect x="14" y="20" width="68" height="60" rx="9" fill="var(--card)" stroke={B} strokeWidth="3" /><rect x="14" y="20" width="68" height="18" rx="9" fill={B} /><path d="M32 12v14M64 12v14" stroke={G} strokeWidth="5" strokeLinecap="round" /><circle cx="34" cy="56" r="5" fill={B} opacity=".4" /><circle cx="50" cy="56" r="5" fill={B} opacity=".4" /><circle cx="66" cy="56" r="7" fill={G} /><circle cx="34" cy="70" r="5" fill={B} opacity=".4" /></W>
)
export const Cmp = () => (
  <W><rect x="16" y="38" width="26" height="44" rx="5" fill={B} opacity=".35" /><rect x="52" y="16" width="26" height="66" rx="5" fill={B} /><path d="M58 30h14M58 40h14" stroke={G} strokeWidth="4" strokeLinecap="round" /></W>
)
export const Student = () => (
  <svg viewBox="0 0 200 160" width="170" height="136" aria-hidden="true">
    <circle cx="100" cy="80" r="64" fill={B} opacity=".12" />
    <path d="M52 140c4-34 28-46 48-46s44 12 48 46z" fill={B} />
    <circle cx="100" cy="68" r="22" fill="#f1b98a" />
    <polygon points="100,22 146,40 100,58 54,40" fill="var(--ink)" />
    <path d="M76 48v14c0 8 48 8 48 0V48l-24 10z" fill="var(--ink)" opacity=".85" />
    <line x1="142" y1="42" x2="142" y2="68" stroke={G} strokeWidth="3" /><circle cx="142" cy="72" r="5" fill={G} />
    <circle cx="92" cy="70" r="2.5" fill="var(--ink)" /><circle cx="108" cy="70" r="2.5" fill="var(--ink)" />
    <path d="M92 79q8 7 16 0" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
)
