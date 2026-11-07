import { useState, useMemo } from 'react'
import Card from './Card'
import { inr, useCountUp } from '../lib'

export default function Discover({ list, tracked, onOpen, onToggle, cmp, onCompare }) {
  const [q, setQ] = useState('')
  const [only, setOnly] = useState(false)
  const [sort, setSort] = useState('match')
  const rows = useMemo(() => {
    const r = list.filter((s) => s.days >= 0 && (!only || s.eligible) && (s.name + s.provider).toLowerCase().includes(q.toLowerCase()))
    const by = { match: (a, b) => b.score - a.score || b.amount - a.amount, deadline: (a, b) => a.days - b.days, amount: (a, b) => b.amount - a.amount }
    return r.sort(by[sort])
  }, [list, q, only, sort])
  const elig = list.filter((s) => s.eligible && s.days >= 0)
  const total = elig.reduce((a, s) => a + s.amount, 0)
  const shown = useCountUp(total)
  const next = elig.slice().sort((a, b) => a.days - b.days)[0]
  return (
    <>
      <div className="stats">
        <div className="card stat big"><b aria-hidden="true">{inr(shown)}</b><span className="sr">{inr(total)}</span>in scholarships you qualify for</div>
        <div className="card stat"><b>{elig.length}</b>scholarships you fully match</div>
        <div className="card stat"><b>{next ? next.days : '–'}</b>{next ? `days to the nearest deadline: ${next.name}` : 'no open deadlines'}</div>
      </div>
      <div className="tools">
        <label>Search<input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name or provider" /></label>
        <label>Sort by<select value={sort} onChange={(e) => setSort(e.target.value)}><option value="match">Best match</option><option value="deadline">Closest deadline</option><option value="amount">Highest amount</option></select></label>
        <label className="chk"><input type="checkbox" checked={only} onChange={(e) => setOnly(e.target.checked)} />Only ones I qualify for</label>
      </div>
      {rows.length ? (
        <div className="list">{rows.map((s) => <Card key={s.id} s={s} t={tracked[s.id]} onOpen={onOpen} onToggle={onToggle} cmp={cmp.includes(s.id)} cmpDisabled={!cmp.includes(s.id) && cmp.length >= 3} onCompare={onCompare} />)}</div>
      ) : (
        <div className="card empty">No scholarships match these filters. Clear the search or untick “Only ones I qualify for”.</div>
      )}
    </>
  )
}
