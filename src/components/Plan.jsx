import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { inr, urgency, dueText } from '../lib'

// Turns the match list into an action plan: which documents unlock the most scholarships.
export default function Plan({ list, have, onHave }) {
  const open = useMemo(() => list.filter((s) => s.eligible && s.days >= 0).sort((a, b) => a.days - b.days), [list])
  const docs = useMemo(() => {
    const m = {}
    open.forEach((s) => s.docs.forEach((d) => { (m[d] ??= { n: 0, amt: 0 }); m[d].n++; m[d].amt += s.amount }))
    return Object.entries(m).map(([name, v]) => ({ name, ...v })).sort((a, b) => b.n - a.n || b.amt - a.amt)
  }, [open])
  if (!open.length) return <div className="card empty"><h2>No full matches yet</h2><p>Update your profile or look at near misses on the Discover page.</p><Link className="btn primary" to="/discover">Browse scholarships</Link></div>
  const missing = (s) => s.docs.filter((d) => !have[d])
  const ready = open.filter((s) => !missing(s).length)
  const got = docs.filter((d) => have[d.name]).length
  return (
    <>
      <div className="stats">
        <div className="card stat big"><b>{ready.length} of {open.length}</b>scholarships you can apply to right now</div>
        <div className="card stat"><b>{got}/{docs.length}</b>documents collected</div>
      </div>
      <h3 style={{ margin: '8px 0' }}>Collect these first</h3>
      <p className="mute" style={{ marginTop: 0 }}>Sorted by how many of your matches need each document.</p>
      <div className="tl">
        {docs.map((d) => (
          <div key={d.name} className="card">
            <label style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <input type="checkbox" checked={!!have[d.name]} onChange={() => onHave(d.name)} />
              <span><b>{d.name}</b><br /><span className="mute small">Needed for {d.n} scholarship{d.n === 1 ? '' : 's'} worth {inr(d.amt)} a year</span></span>
            </label>
            <span className={'pill ' + (have[d.name] ? 'ok' : 'warn')}>{have[d.name] ? 'Have it' : 'To collect'}</span>
          </div>
        ))}
      </div>
      <h3 style={{ margin: '24px 0 8px' }}>Apply in this order</h3>
      <div className="tl">
        {open.map((s) => (
          <div key={s.id} className="card">
            <div className={'when ' + urgency(s.days)}><b>{s.days}</b>{s.days === 1 ? 'day' : 'days'}</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <Link className="link" to={'/s/' + s.id}>{s.name}</Link>
              <div className="mute small">{inr(s.amount)} · {dueText(s.days)}</div>
            </div>
            <span className={'pill ' + (missing(s).length ? 'warn' : 'ok')}>{missing(s).length ? `Missing ${missing(s).length} document${missing(s).length === 1 ? '' : 's'}` : 'Ready to apply'}</span>
          </div>
        ))}
      </div>
    </>
  )
}
