import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SCHOLARSHIPS } from '../data'
import { SAMPLE, withEval, inr, urgency, dueText } from '../lib'
import Card from './Card'
import Checks from './Checks'

const noop = () => {}
const DUR = 6000
const URLS = ['profile', 'discover', 'details', 'plan', 'tracker']

// A self-playing "video" built from the real components and a sample student.
export default function Demo() {
  const list = useMemo(() => withEval(SCHOLARSHIPS, SAMPLE).filter((s) => s.days >= 0), [])
  const best = useMemo(() => list.filter((s) => s.eligible).sort((a, b) => b.amount - a.amount), [list])
  const near = list.find((s) => !s.eligible && s.checks.filter((c) => !c.ok).length === 1) || best[0]
  const docs = useMemo(() => {
    const m = {}
    best.forEach((s) => s.docs.forEach((d) => { m[d] = (m[d] || 0) + 1 }))
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 4)
  }, [best])
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  const steps = [
    { title: 'Tell us about you', text: 'Six quick questions. Nothing leaves your device.',
      view: <div className="row" style={{ gap: 8 }}>{[['Level', SAMPLE.level], ['Category', SAMPLE.category], ['Gender', SAMPLE.gender], ['State', SAMPLE.state], ['Income', inr(SAMPLE.income)], ['Marks', SAMPLE.percent + '%']].map(([k, v]) => <span key={k} className="pill ok"><b>{k}:</b> {v}</span>)}</div> },
    { title: 'See your best matches', text: `This sample student qualifies for ${best.length} scholarships worth ${inr(best.reduce((a, s) => a + s.amount, 0))}.`,
      view: <div className="list">{best.slice(0, 2).map((s) => <Card key={s.id} s={s} cmp={false} cmpDisabled onOpen={noop} onToggle={noop} onCompare={noop} />)}</div> },
    { title: 'Know exactly why', text: 'Every rule is marked met or missed, with what would fix a miss.',
      view: <div className="card"><h3 style={{ marginBottom: 8 }}>{near.name}</h3><Checks items={near.checks} all /></div> },
    { title: 'Follow your action plan', text: 'See which documents open the most doors, and collect those first.',
      view: <div className="tl">{docs.map(([d, n]) => <div key={d} className="card"><b style={{ flex: 1 }}>{d}</b><span className="pill warn">Needed for {n} scholarships</span></div>)}</div> },
    { title: 'Track every application', text: 'Move scholarships from Saved to Result and never miss a deadline.',
      view: <div className="board">{['Saved', 'Preparing', 'Applied'].map((st, k) => <div key={st} className="col"><h3>{st}</h3>{best[k] && <div className="card" style={{ padding: 12 }}><b>{best[k].name}</b><br /><span className={'pill ' + urgency(best[k].days)}>{dueText(best[k].days)}</span></div>}</div>)}</div> },
  ]
  const next = () => setI((x) => (x + 1) % steps.length)
  const s = steps[i]
  return (
    <section aria-roledescription="carousel" aria-label="GRANTLY demo video">
      <div className="player">
        <div className="chrome"><i /><i /><i /><span>grantly.app/#/{URLS[i]}</span></div>
        <div key={i} className="stage" aria-live="polite">
          <span className="badge">Scene {i + 1} of {steps.length}</span>
          <h3 style={{ fontSize: '1.4rem' }}>{s.title}</h3>
          <p className="mute" style={{ margin: 0 }}>{s.text}</p>
          <div inert="" aria-hidden="true" style={{ pointerEvents: 'none' }}>{s.view}</div>
          <svg className="cursor" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 2l7 19 3-8 8-3z" fill="#14162b" stroke="#fff" strokeWidth="1.5" /></svg>
        </div>
        <div className="segs">
          {steps.map((_, k) => (
            <button key={k} aria-label={`Go to scene ${k + 1}`} aria-current={k === i} onClick={() => setI(k)}>
              <i className={k < i ? 'full' : k === i ? 'run' : ''} style={k === i ? { animationDuration: DUR + 'ms', animationPlayState: playing ? 'running' : 'paused' } : undefined} onAnimationEnd={k === i ? next : undefined} />
            </button>
          ))}
        </div>
      </div>
      <div className="row between" style={{ marginTop: 14 }}>
        <div className="row">
          <button className="btn sm" onClick={() => setI((i + steps.length - 1) % steps.length)}>Previous</button>
          <button className="btn sm" aria-pressed={playing} onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Play'}</button>
          <button className="btn sm" onClick={next}>Next</button>
        </div>
        <Link className="btn primary" to="/profile">Try it with your details</Link>
      </div>
    </section>
  )
}
