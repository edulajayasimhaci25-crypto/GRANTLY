import { Link } from 'react-router-dom'
import Cap from './Cap'
import { inr, dueText } from '../lib'

export default function Compare({ list, cmp, onCompare }) {
  const rows = cmp.map((id) => list.find((s) => s.id === id)).filter(Boolean)
  if (rows.length < 2) return <div className="card empty"><Cap /><h2>Pick 2 or 3 to compare</h2><p>Tick “Compare” on scholarship cards, then come back here.</p><Link className="btn primary" to="/discover">Browse scholarships</Link></div>
  const top = Math.max(...rows.map((r) => r.amount))
  const lines = [
    ['Amount per year', (s) => <b>{inr(s.amount)}{s.amount === top ? ' (highest)' : ''}</b>],
    ['Your match', (s) => (s.eligible ? 'You qualify' : `${s.score}% match`)],
    ['Deadline', (s) => dueText(s.days)],
    ['Provider', (s) => s.provider],
    ['Documents needed', (s) => s.docs.length],
    ['What is missing', (s) => (s.checks.filter((c) => !c.ok).map((c) => c.fix).join('; ') || 'Nothing')],
  ]
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="cmp">
        <thead><tr><th scope="col"><span className="sr">Detail</span></th>{rows.map((s) => <th scope="col" key={s.id}><Link to={'/s/' + s.id}>{s.name}</Link><br /><button className="btn sm" onClick={() => onCompare(s.id)}>Remove</button></th>)}</tr></thead>
        <tbody>{lines.map(([k, f]) => <tr key={k}><th scope="row">{k}</th>{rows.map((s) => <td key={s.id}>{f(s)}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}
