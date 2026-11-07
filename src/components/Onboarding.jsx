import { useState } from 'react'
import { SAMPLE } from '../lib'
import { Student } from './Art'
import { LEVELS, CATEGORIES, STATES } from '../data'

export default function Onboarding({ initial, onSave, onCancel }) {
  const [f, setF] = useState(initial || SAMPLE)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'number' ? Number(e.target.value) : e.target.value })
  const sel = (k, label, opts) => (
    <label>{label}<select value={f[k]} onChange={set(k)}>{opts.map((o) => <option key={o}>{o}</option>)}</select></label>
  )
  return (
    <div className="narrow" style={{ margin: '0 auto' }}>
      <section className="hero">
        <div className="row between"><h1>Your 30-second profile</h1><Student /></div>
        <p>Answer six quick questions. GRANTLY shows the scholarships that fit you, explains why, and keeps track of every deadline and document.</p>
      </section>
      <form className="card form" onSubmit={(e) => { e.preventDefault(); onSave(f) }}>
        <div className="grid2">
          {sel('level', 'Education level', LEVELS)}
          {sel('category', 'Category', CATEGORIES)}
          {sel('gender', 'Gender', ['Female', 'Male', 'Other'])}
          {sel('state', 'Home state', STATES)}
          <label>Family income per year (₹)<input type="number" min="0" step="10000" required value={f.income} onChange={set('income')} /></label>
          <label>Latest marks (%)<input type="number" min="0" max="100" required value={f.percent} onChange={set('percent')} /></label>
        </div>
        <div className="row">
          <button className="btn primary">Show my scholarships</button>
          {onCancel && <button type="button" className="btn" onClick={onCancel}>Cancel</button>}
        </div>
        <p className="mute small">Your answers stay in this browser. Nothing is uploaded.</p>
      </form>
    </div>
  )
}
