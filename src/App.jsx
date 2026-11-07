import { useEffect, useMemo, useState } from 'react'
import { HashRouter, Routes, Route, NavLink, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { SCHOLARSHIPS } from './data'
import { useLS, withEval } from './lib'
import Landing from './components/Landing'
import Onboarding from './components/Onboarding'
import Discover from './components/Discover'
import Tracker from './components/Tracker'
import Deadlines from './components/Deadlines'
import Compare from './components/Compare'
import Detail from './components/Detail'
import Plan from './components/Plan'
import Demo from './components/Demo'

const Page = ({ title, children }) => <><h2 style={{ margin: '12px 0' }}>{title}</h2>{children}</>

function Shell() {
  const nav = useNavigate()
  const loc = useLocation()
  const [profile, setProfile] = useLS('grantly_profile', null)
  const [tracked, setTracked] = useLS('grantly_tracked', {})
  const [cmp, setCmp] = useLS('grantly_cmp', [])
  const [have, setHave] = useLS('grantly_have', {})
  const [theme, setTheme] = useLS('grantly_theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])

  const list = useMemo(() => (profile ? withEval(SCHOLARSHIPS, profile) : []), [profile])
  const toggle = (id) => setTracked((t) => { const n = { ...t }; n[id] ? delete n[id] : (n[id] = { stage: 'Saved', docs: {} }); return n })
  const stage = (id, st) => setTracked((t) => ({ ...t, [id]: { ...t[id], stage: st } }))
  const doc = (id, d) => setTracked((t) => ({ ...t, [id]: { ...t[id], docs: { ...t[id].docs, [d]: !t[id].docs?.[d] } } }))
  const compare = (id) => setCmp((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length >= 3 ? c : [...c, id]))
  const toggleHave = (d) => setHave((h) => ({ ...h, [d]: !h[d] }))
  const open = (id) => nav('/s/' + id)
  const guard = (el) => (profile ? el : <Navigate to="/profile" replace />)
  const n = Object.keys(tracked).length

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="bar"><div className="in">
        <NavLink to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>GRANT<b>LY</b></NavLink>
        <nav aria-label="Main">
          <NavLink to="/discover">Discover</NavLink>
          <NavLink to="/tracker">Tracker{n ? ` (${n})` : ''}</NavLink>
          <NavLink to="/plan">Plan</NavLink>
          <NavLink to="/deadlines">Deadlines</NavLink>
          <NavLink to="/demo">Demo video</NavLink>
          <NavLink to="/compare">Compare{cmp.length ? ` (${cmp.length})` : ''}</NavLink>
        </nav>
        <NavLink to="/demo" className="btn sm primary">▶ Watch demo</NavLink>
        <button className="btn sm" onClick={() => nav('/profile')}>{profile ? 'Edit profile' : 'Create profile'}</button>
        <button className="btn sm" aria-pressed={theme === 'dark'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</button>
      </div></header>
      <main id="main" className="wrap">
        <div key={loc.pathname} className="page"><Routes>
          <Route path="/" element={<Landing profile={profile} list={list} />} />
          <Route path="/profile" element={<Onboarding initial={profile} onSave={(p) => { setProfile(p); nav('/discover') }} onCancel={profile ? () => nav(-1) : null} />} />
          <Route path="/discover" element={guard(<Page title="Scholarships for you"><Discover list={list} tracked={tracked} onOpen={open} onToggle={toggle} cmp={cmp} onCompare={compare} /></Page>)} />
          <Route path="/tracker" element={guard(<Page title="My applications"><Tracker list={list} tracked={tracked} onOpen={open} onStage={stage} goDiscover={() => nav('/discover')} /></Page>)} />
          <Route path="/deadlines" element={guard(<Page title="Deadlines"><Deadlines list={list} tracked={tracked} onOpen={open} /></Page>)} />
          <Route path="/compare" element={guard(<Page title="Compare scholarships"><Compare list={list} cmp={cmp} onCompare={compare} /></Page>)} />
          <Route path="/plan" element={guard(<Page title="Your action plan"><Plan list={list} have={have} onHave={toggleHave} /></Page>)} />
          <Route path="/s/:id" element={guard(<Detail list={list} tracked={tracked} onToggle={toggle} onDoc={doc} />)} />
          <Route path="/demo" element={<Page title="How GRANTLY works"><Demo /></Page>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes></div>
        <footer>Build v2 with demo video. Demo data is illustrative. Check amounts, rules and dates on the official portal before you apply.</footer>
      </main>
    </>
  )
}

export default function App() {
  return <HashRouter><Shell /></HashRouter>
}
