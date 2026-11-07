import { useState } from 'react'
import { urgency, dueText, inr } from '../lib'

export default function Deadlines({ list, tracked, onOpen }) {
  const [mineOnly, setMine] = useState(false)
  const rows = list.filter((s) => s.days >= 0 && (!mineOnly || tracked[s.id])).sort((a, b) => a.days - b.days)
  return (
    <>
      <label className="row" style={{ display: 'flex', marginBottom: 12 }}><input type="checkbox" checked={mineOnly} onChange={(e) => setMine(e.target.checked)} />Show only my saved scholarships</label>
      {rows.length ? (
        <div className="tl">
          {rows.map((s) => (
            <div key={s.id} className="card">
              <div className={'when ' + urgency(s.days)}><b>{s.days}</b>{s.days === 1 ? 'day' : 'days'}</div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <button className="link" onClick={() => onOpen(s.id)}>{s.name}</button>
                <div className="mute small">{new Date(s.deadline).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} · {inr(s.amount)}{tracked[s.id] ? ' · Saved' : ''}</div>
              </div>
              <span className={'pill ' + (s.eligible ? 'ok' : 'warn')}>{s.eligible ? 'You qualify' : `${s.score}% match`}</span>
            </div>
          ))}
        </div>
      ) : <div className="card empty">No upcoming deadlines to show.</div>}
    </>
  )
}
