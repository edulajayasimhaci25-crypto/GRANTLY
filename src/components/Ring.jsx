import { useEffect, useState } from 'react'

export default function Ring({ value, tone }) {
  const r = 24, c = 2 * Math.PI * r
  const [v, setV] = useState(0)
  useEffect(() => { const t = setTimeout(() => setV(value), 60); return () => clearTimeout(t) }, [value])
  return (
    <span className={'ring2 ' + tone} role="img" aria-label={`${value}% match`}>
      <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
        <circle cx="28" cy="28" r={r} fill="none" stroke="var(--line)" strokeWidth="5" />
        <circle cx="28" cy="28" r={r} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - v / 100)} transform="rotate(-90 28 28)" style={{ transition: 'stroke-dashoffset .8s ease' }} />
      </svg>
      <b>{value}%</b>
    </span>
  )
}
