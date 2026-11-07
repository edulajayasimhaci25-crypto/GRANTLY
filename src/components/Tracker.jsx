import { STAGES, urgency, dueText } from '../lib'
import Cap from './Cap'

export default function Tracker({ list, tracked, onOpen, onStage, goDiscover }) {
  const mine = list.filter((s) => tracked[s.id])
  if (!mine.length) return <div className="card empty"><Cap /><h2>Nothing tracked yet</h2><p>Save a scholarship and it lands here, with its documents and deadline.</p><button className="btn primary" onClick={goDiscover}>Browse scholarships</button></div>
  return (
    <div className="board">
      {STAGES.map((st) => (
        <section key={st} className="col" aria-label={st}>
          <h3>{st} ({mine.filter((s) => tracked[s.id].stage === st).length})</h3>
          {mine.filter((s) => tracked[s.id].stage === st).map((s) => {
            const done = s.docs.filter((d) => tracked[s.id].docs?.[d]).length
            return (
              <article key={s.id} className="card" style={{ padding: 12, display: 'grid', gap: 8 }}>
                <button className="link" onClick={() => onOpen(s.id)}>{s.name}</button>
                <span className={'pill ' + urgency(s.days)} style={{ justifySelf: 'start' }}>{dueText(s.days)}</span>
                <div className="bar-track" aria-hidden="true"><i style={{ width: (done / s.docs.length) * 100 + '%' }} /></div>
                <span className="mute small">{done}/{s.docs.length} documents ready</span>
                <label className="small">Move to<select value={st} onChange={(e) => onStage(s.id, e.target.value)}>{STAGES.map((x) => <option key={x}>{x}</option>)}</select></label>
              </article>
            )
          })}
        </section>
      ))}
    </div>
  )
}
