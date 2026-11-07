import Checks from './Checks'
import Ring from './Ring'
import { inr, urgency, dueText } from '../lib'

export default function Card({ s, t, onOpen, onToggle, cmp, cmpDisabled, onCompare }) {
  return (
    <article className="card sch">
      <div className="top">
        <Ring value={s.score} tone={s.eligible ? 'ok' : s.score >= 60 ? 'warn' : 'bad'} />
        <div>
          <h3><button className="link" onClick={() => onOpen(s.id)}>{s.name}</button></h3>
          <p className="mute small" style={{ margin: 0 }}>{s.provider}</p>
        </div>
      </div>
      <p className="amt">{inr(s.amount)}<span className="mute small"> per year</span></p>
      <Checks items={s.checks} />
      {!s.eligible && s.checks.filter((c) => !c.ok).length === 1 && <p className="tip">Almost there: {s.checks.find((c) => !c.ok).fix}</p>}
      <label className="small" style={{ flexDirection: 'row', alignItems: 'center', fontWeight: 500 }}><input type="checkbox" checked={cmp} disabled={cmpDisabled} onChange={() => onCompare(s.id)} />Compare (up to 3)</label>
      <div className="row between">
        <span className={'pill ' + urgency(s.days)}>{dueText(s.days)}</span>
        <button className={'btn sm ' + (t ? '' : 'primary')} aria-pressed={!!t} onClick={() => onToggle(s.id)}>{t ? 'Saved ✓' : 'Save'}</button>
      </div>
    </article>
  )
}
