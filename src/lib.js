import { useState, useEffect } from 'react'
export const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN')
export const daysLeft = (d) => Math.ceil((new Date(d) - new Date().setHours(0, 0, 0, 0)) / 864e5)
export const STAGES = ['Saved', 'Preparing', 'Applied', 'Result']
export const SAMPLE = { level: 'UG', category: 'OBC', gender: 'Female', state: 'Karnataka', income: 300000, percent: 78 }
export const urgency = (d) => (d <= 14 ? 'bad' : d <= 45 ? 'warn' : 'ok')
export const dueText = (d) => (d < 0 ? 'Closed' : d === 0 ? 'Due today' : `${d} day${d === 1 ? '' : 's'} left`)

export function useLS(key, init) {
  const [v, setV] = useState(() => { try { return JSON.parse(localStorage.getItem(key)) ?? init } catch { return init } })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)) } catch {} }, [key, v])
  return [v, setV]
}

// Explainable matching: each rule is met or not, and unmet rules say what would fix it.
export function evaluate(s, p) {
  const c = []
  const add = (ok, t, fix) => c.push({ ok, t, fix: ok ? null : fix })
  add(s.levels.includes(p.level), `Level: ${s.levels.join(', ')}`, `Not offered for ${p.level} students`)
  if (s.maxIncome < 1e9) add(p.income <= s.maxIncome, `Family income up to ${inr(s.maxIncome)}`, `Your income is ${inr(p.income - s.maxIncome)} over the limit`)
  if (!s.categories.includes('All')) add(s.categories.includes(p.category), `Category: ${s.categories.join(', ')}`, `Only for ${s.categories.join(' / ')} category`)
  if (s.gender === 'Female') add(p.gender === 'Female', 'For women and girls', 'Only for women and girls')
  if (s.minPercent) add(p.percent >= s.minPercent, `At least ${s.minPercent}% marks`, `Raise your marks by ${s.minPercent - p.percent}% to qualify`)
  if (s.states !== 'All') add(s.states.includes(p.state), `Domicile: ${s.states.join(', ')}`, `Only for ${s.states.join(' / ')} residents`)
  const met = c.filter((x) => x.ok).length
  c.sort((a, b) => a.ok - b.ok)
  return { checks: c, score: Math.round((met / c.length) * 100), eligible: met === c.length }
}
export const withEval = (list, p) => list.map((s) => ({ ...s, ...evaluate(s, p), days: daysLeft(s.deadline) }))

export function useCountUp(target, ms = 900) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(target); return }
    let raf, t0
    const step = (t) => { t0 ??= t; const p = Math.min(1, (t - t0) / ms); setV(target * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(step) }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, ms])
  return v
}
export const short = (a) => (a >= 1e5 ? `₹${(a / 1e5).toFixed(a % 1e5 ? 1 : 0)}L` : `₹${Math.round(a / 1000)}K`)
