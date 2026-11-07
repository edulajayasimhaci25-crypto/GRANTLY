import { useParams, useNavigate, Link } from 'react-router-dom'
import Checks from './Checks'
import { inr, urgency, dueText } from '../lib'

export default function Detail({ list, tracked, onToggle, onDoc }) {
  const { id } = useParams()
  const nav = useNavigate()
  const s = list.find((x) => x.id === id)
  if (!s) return <div className="card empty">Scholarship not found. <Link to="/discover">Back to scholarships</Link></div>
  const t = tracked[s.id]
  const done = t ? s.docs.filter((d) => t.docs?.[d]).length : 0
  return (
    <article className="card dialog" style={{ margin: '0 auto', maxHeight: 'none' }} aria-labelledby="dt">
      <button className="btn sm" style={{ justifySelf: 'start' }} onClick={() => (window.history.length > 1 ? nav(-1) : nav('/discover'))}>← Back</button>
      <div><h2 id="dt">{s.name}</h2><p className="mute small" style={{ margin: 0 }}>{s.provider}</p></div>
      <div className="row">
        <span className="amt">{inr(s.amount)}</span>
        <span className={'pill ' + urgency(s.days)}>{dueText(s.days)} · {new Date(s.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
      </div>
      <section>
        <h3>{s.eligible ? 'You are eligible' : `You meet ${s.checks.filter((c) => c.ok).length} of ${s.checks.length} rules`}</h3>
        <Checks items={s.checks} all />
      </section>
      <section>
        <h3>Documents to gather{t ? ` (${done}/${s.docs.length})` : ''}</h3>
        {t ? (
          <>
            <div className="bar-track" role="progressbar" aria-valuenow={done} aria-valuemin="0" aria-valuemax={s.docs.length} aria-label="Documents ready"><i style={{ width: (done / s.docs.length) * 100 + '%' }} /></div>
            <div className="docs" style={{ marginTop: 8 }}>
              {s.docs.map((d) => <label key={d}><input type="checkbox" checked={!!t.docs?.[d]} onChange={() => onDoc(s.id, d)} />{d}</label>)}
            </div>
          </>
        ) : <p className="mute">Save this scholarship to start a checklist: {s.docs.join(', ')}.</p>}
      </section>
      <div className="row">
        <button className={'btn ' + (t ? '' : 'primary')} onClick={() => onToggle(s.id)}>{t ? 'Remove from tracker' : 'Save to tracker'}</button>
        {s.url && <a className="btn" href={s.url} target="_blank" rel="noreferrer">Open official portal</a>}
      </div>
      <p className="mute small" style={{ margin: 0 }}>Sample data for this demo. Confirm rules and dates with the provider before applying.</p>
    </article>
  )
}
