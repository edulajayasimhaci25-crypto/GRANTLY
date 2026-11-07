import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Match, Docs, Cal, Cmp } from './Art'
import { SCHOLARSHIPS } from '../data'
import { SAMPLE, inr, short, withEval, useCountUp } from '../lib'

function Graphic({ items }) {
  const cx = 200, cy = 170, R = 125
  return (
    <svg viewBox="0 0 400 340" className="gfx" role="img" aria-label="You at the centre, connected to the scholarships you match">
      {items.map((s, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / items.length
        const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a)
        return (
          <g key={s.id}>
            <line x1={cx} y1={cy} x2={x} y2={y} className="ln" style={{ animationDelay: i * 0.12 + 's' }} />
            <circle cx={x} cy={y} r="30" className="nd" style={{ animationDelay: 0.5 + i * 0.12 + 's' }}><title>{s.name}</title></circle>
            <text x={x} y={y + 5} textAnchor="middle" className="nt" style={{ animationDelay: 0.5 + i * 0.12 + 's' }}>{short(s.amount)}</text>
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r="38" className="me" />
      <text x={cx} y={cy + 6} textAnchor="middle" className="mt">You</text>
    </svg>
  )
}

export default function Landing({ profile, list }) {
  const demo = useMemo(() => withEval(SCHOLARSHIPS, SAMPLE), [])
  const el = (profile ? list : demo).filter((s) => s.eligible && s.days >= 0)
  const total = el.reduce((a, s) => a + s.amount, 0)
  const shown = useCountUp(total)
  const top = el.slice().sort((a, b) => b.amount - a.amount).slice(0, 5)
  return (
    <section className="hero">
      <div className="herogrid">
        <div>
          <h1>Find the money you already qualify for.</h1>
          <p>Scholarships are scattered across dozens of portals with different rules. GRANTLY matches you in seconds, explains every rule, and builds a plan for the documents and deadlines.</p>
          <div className="card stat big" style={{ maxWidth: 520, margin: '20px 0' }}>
            <b aria-hidden="true">{inr(shown)}</b><span className="sr">{inr(total)}</span>
            {profile ? `across ${el.length} scholarships you qualify for right now` : `across ${el.length} scholarships for a sample student (OBC, 78% marks, ₹3 lakh income, Karnataka)`}
          </div>
          <Link className="btn primary" to={profile ? '/discover' : '/profile'}>{profile ? 'See my scholarships' : 'Find my scholarships'}</Link>
          {' '}<Link className="btn" to="/demo">Watch the 40-second demo</Link>
        </div>
        <Graphic items={top} />
      </div>
      <h2 style={{ margin: '40px 0 14px' }}>Everything in one place</h2>
      <div className="feat">
        {[[<Match />, 'Smart matching', 'Six questions, then a match % with every rule explained.'], [<Docs />, 'Action plan', 'See which documents unlock the most scholarships.'], [<Cal />, 'Deadline radar', 'Colour-coded urgency so nothing slips.'], [<Cmp />, 'Side-by-side compare', 'Weigh up to three scholarships at once.']].map(([ic, t, d]) => (
          <div key={t} className="card feat-i">{ic}<h3>{t}</h3><p className="mute small" style={{ margin: 0 }}>{d}</p></div>
        ))}
      </div>
      <Link to="/demo" className="video" aria-label="Watch the demo video">
        <span className="play" aria-hidden="true">▶</span>
        <span><b style={{ fontSize: '1.15rem' }}>See how it works</b><br /><span className="small">A 30-second walkthrough. No sign-up needed.</span></span>
      </Link>
      <ol className="steps">
        <li><b>Tell us about you.</b> Six questions, stored only on your device.</li>
        <li><b>See why you match.</b> Every rule is marked met or missed, with what would fix it.</li>
        <li><b>Follow your plan.</b> See which documents unlock the most scholarships, then track each application.</li>
      </ol>
    </section>
  )
}
